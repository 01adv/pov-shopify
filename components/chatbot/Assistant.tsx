"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getNudges } from "@/hooks/getNudges";
import useIsPhone from "@/hooks/usePhone";
import { useProductContext } from "@/hooks/useProduct";
import { extractProducts, Product } from "@/lib/extractedProductsForPopup";
import { getOrCreateSessionId, getWelcomeMessageSeen, setWelcomeMessageSeen } from "@/lib/helpers";
import { logEvent } from "@/lib/logger";
import { matchProducts } from "@/lib/productMatcher";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ProductLoader } from "../loader";
import { ProductCardForPopup } from "../ProductCardForPopup";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import ChatLoader from "./ChatLoader";
import { InputBar } from "./InputBar2";
import { Headings } from "@/lib/data";


export function AssistantChat() {
  const pathname = usePathname();
  const isProductDetailsPage = pathname.startsWith('/products/') && pathname.split('/').length >= 3;
  const isHomePage = pathname === '/';
  const { setMatchedProducts, setTitle, title: contextTitle, setPersonalizedNudge, productName, setProductName } = useProductContext();
  const products: Product[] = extractProducts()
  const isPhone = useIsPhone();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [chatHeight, setChatHeight] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [latestResponse, setLatestResponse] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [nudge, setNudge] = useState("");
  const [lastResponseTime, setLastResponseTime] = useState<number | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeTimeout, setNudgeTimeout] = useState<number>(40000);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  //related to welcome message
  const welcomeSeen = getWelcomeMessageSeen();
  const [currentHeading, setCurrentHeading] = useState(Headings[0]);
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const MIN_CHAT_HEIGHT = 140; // Minimum height including input bar
  const MAX_CHAT_HEIGHT = 560; // Maximum card height
  const HEADER_HEIGHT = 65; // Header + border
  const INPUT_HEIGHT = 72; // Input bar + padding


  // Initialize session ID and welcome message on mount
  useEffect(() => {
    const currentSessionId = getOrCreateSessionId();
    setSessionId(currentSessionId || "");
  }, []);

  // Cycle heading every 1 second
  useEffect(() => {
    if (welcomeSeen || isHomePage) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * Headings.length);
      setCurrentHeading(Headings[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [welcomeSeen, isHomePage]);

  // Clear nudge when not on product details page or productName changes
  useEffect(() => {
    if (!isProductDetailsPage) {
      setNudge(""); // Clear nudge if not on product details page
      setShowNudge(false); // Ensure nudge is not shown
      setProductName(""); // Clear product name
      if (!latestResponse) {
        setIsExpanded(false); // Collapse chat if not on product details page
      }
      return;
    }
  }, [isProductDetailsPage, setIsExpanded, latestResponse, productName, setProductName]);

  useEffect(() => {
    const fetchNudges = async () => {
      if (!isProductDetailsPage || !productName || !sessionId) {
        setNudge(""); // Clear nudge if no productName
        setShowNudge(false); // Ensure nudge is not shown
        return;
      }

      try {
        const nudge = await getNudges({ productName, sessionId });
        console.log('nudge', nudge);
        if (!welcomeSeen) {
          setWelcomeMessageSeen(true);
        }
        setNudge(nudge || "");
        setIsExpanded(true); // Expand chat if nudge is available
        if (nudge && setPersonalizedNudge) {
          setPersonalizedNudge(nudge);
        }
        // Log the nudge to the conversation document
        logEvent("append_conversation", {
          event: "chat_message",
          session_id: sessionId,
          message: {
            role: "nudge",
            content: nudge,
            timestamp: new Date().toISOString(),
          },
          tags: ["chatbot", "nudge", "conversation"],
        });
        // Show nudge immediately if on product details page and no chat interaction
        if (isProductDetailsPage && !latestResponse) {
          setShowNudge(true);
        }
      } catch (error) {
        console.error("Failed to fetch nudges", error);
        setNudge("");
        setShowNudge(false);
      }
    };

    fetchNudges();
  }, [productName, sessionId, latestResponse, setPersonalizedNudge, isProductDetailsPage]);

  useEffect(() => {
    if (!lastResponseTime || !isProductDetailsPage) return;

    const timer = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastResponseTime >= nudgeTimeout) { // 15 seconds
        setShowNudge(true); // Show nudge after 15 seconds
        clearInterval(timer); // Stop checking once 15 seconds is reached
      }
    }, 1000); // Check every second

    return () => clearInterval(timer); // Cleanup on unmount or when lastResponseTime changes
  }, [lastResponseTime, isProductDetailsPage, nudgeTimeout]);


  // 
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }

    // set welcomeSeen to true in session storage
    if (!welcomeSeen) {
      setWelcomeMessageSeen(true);
    }

    // setMessages((prev) => [...prev, userMessage])
    const message = input;
    setInput("");
    // setIsTyping(true)
    setIsFetching(true);

    console.log("message", message);
    // Log the user query to the conversation document
    logEvent("append_conversation", {
      event: "chat_message",
      session_id: sessionId,
      message: {
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      },
      tags: ["chatbot", "conversation"],
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CHAT_SERVER_URL}/chat/${sessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, sessionId }),
        }
      );

      const data = await response.json();
      console.log("data", data);
      const assistantResponse =
        data.response.text || "Sorry, I couldn't process that.";
      const assistantProducts = data?.response?.products;
      const assistantTitle = data?.response?.title;
      console.log('assistant ressss', assistantResponse);

      // Only update if the response is different
      if (assistantResponse !== latestResponse) {
        setLatestResponse(assistantResponse);
        setTitle(assistantTitle);
        setIsFetching(false);
        setIsTyping(true);
        setLastResponseTime(Date.now());
        setShowNudge(false); // Reset nudge visibility

        // Log the assistant response to the conversation document
        logEvent("append_conversation", {
          event: "chat_message",
          session_id: sessionId,
          message: {
            role: "assistant",
            content: assistantResponse,
            timestamp: new Date().toISOString(),
          },
          tags: ["chatbot", "conversation"],
        });
      } else {
        setIsFetching(false); // Stop fetching but don't restart typing
      }

      // Log nudge if present and on product details page
      if (isProductDetailsPage && nudge && showNudge) {
        logEvent("append_conversation", {
          event: "chat_message",
          session_id: sessionId,
          message: {
            role: "nudge",
            content: nudge,
            timestamp: new Date().toISOString(),
          },
          tags: ["chatbot", "nudge", "conversation"],
        });
      }

      // Normalize assistant products (convert to lowercase for case-insensitive match)
      if (assistantProducts && assistantProducts?.length > 0) {
        const matchedProd = matchProducts(assistantProducts, products);
        console.log("matched", matchedProd);

        if (matchProducts?.length > 0) {
          // Store in session storage
          const existing = JSON.parse(sessionStorage.getItem("aiRecommendedProducts") || "[]");

          const combined = [
            ...existing,
            ...matchedProd.filter(p => !existing.some(e => e.id === p.id))
          ];

          sessionStorage.setItem("aiRecommendedProducts", JSON.stringify(combined));
          setRecommendedProducts(matchedProd);
          setMatchedProducts(matchedProd)
          // log the recommendation event
          logEvent("recommendation_displayed", {
            title: assistantTitle || "Recommended Products",
            totalProducts: matchedProd.length,
            products: matchedProd.map(p => ({ id: p.id, name: p.title, price: p.price, })),
            source: "chatbot_interaction",
            tags: ["chatbot", "recommendation"],
          });
          console.log("message and recommendations", recommendedProducts);
          // setRecommendedProducts(mentionedProducts);
          if (isPhone) {
            setNudgeTimeout(50);
            router.push("/recommended");
          } else {
            setTimeout(() => {
              setIsDialogOpen(true);
              setLoader(true);
              setTimeout(() => {
                setLoader(false);
              }, 500);
            }, 300);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setLatestResponse("Sorry, I'm having trouble connecting right now.");
      setIsTyping(true);

    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Update chat height based on content
  useEffect(() => {
    if (!isExpanded || !messagesContainerRef.current) return;

    const updateHeight = () => {
      const messagesHeight = messagesContainerRef.current?.scrollHeight || 0;
      const totalContentHeight = messagesHeight + HEADER_HEIGHT + INPUT_HEIGHT;
      const newHeight = Math.min(
        Math.max(totalContentHeight, MIN_CHAT_HEIGHT),
        MAX_CHAT_HEIGHT
      );
      setChatHeight(newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(messagesContainerRef.current);
    updateHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [isExpanded, isTyping]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping]);

  const shouldScroll = chatHeight === MAX_CHAT_HEIGHT;



  useEffect(() => {
    const handleResize = () => {
      // Detect keyboard on mobile by checking if viewport height changed significantly
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      const windowHeight = window.innerHeight
      const heightDifference = windowHeight - viewportHeight

      // If height difference is significant (> 150px), keyboard is likely open
      if (heightDifference > 100) {
        setKeyboardHeight(heightDifference)
      } else {
        setKeyboardHeight(0)
      }
    }

    // Listen for visual viewport changes (better for keyboard detection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize)
      return () => window.visualViewport?.removeEventListener("resize", handleResize)
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      className={`z-40 fixed px-4 mx-auto lg:px-0 w-full flex items-end justify-center pointer-events-none transition-all duration-150 ease-in-out`}
      // style={{
      //   top: (isExpanded || !welcomeSeen)
      //     ? isPhone
      //       ? keyboardHeight > 0
      //         ? `calc(90% - ${keyboardHeight + (chatHeight * 4 / 5)}px)`
      //         : `calc(90% - ${chatHeight ? (chatHeight * 4 / 5) : 176}px)`
      //       : `calc(100% - ${chatHeight ? (chatHeight * 4 / 5) : 176}px)`
      //     : isPhone
      //       ? keyboardHeight > 0
      //         ? `calc(80% - ${keyboardHeight}px)`
      //         : '80%'
      //       : '90%',
      // }}
      style={{
        top: (!welcomeSeen && !isHomePage)
          ? isPhone
            ? keyboardHeight > 0
              ? `calc(70% - ${keyboardHeight}px)`
              : '70%'
            : '80%'
          : (isExpanded)
            ? isPhone
              ? keyboardHeight > 0
                ? `calc(90% - ${keyboardHeight + (chatHeight * 4 / 5)}px)`
                : `calc(90% - ${chatHeight ? (chatHeight * 4 / 5) : 176}px)`
              : `calc(100% - ${chatHeight ? (chatHeight * 4 / 5) : 176}px)`
            : isPhone
              ? keyboardHeight > 0
                ? `calc(80% - ${keyboardHeight}px)`
                : '80%'
              : '90%',
      }}
    >
      <div className="relative w-full lg:max-w-md pointer-events-auto">
        {/* Product Popup */}
        {!isPhone && (
          <ProductPopup
            title={contextTitle}
            isOpen={isDialogOpen}
            onClose={() => {
              setIsDialogOpen(false);
              setIsExpanded(false);
              setNudge('');
              setLatestResponse('')
            }}
            products={recommendedProducts}
            input={input}
            setInput={setInput}
            handleKeyDown={handleKeyDown}
            handleSendMessage={handleSendMessage}
            loader={loader}
          />
        )}

        {/* would show loading nudges when nudge and response is not there and initial load */}

        {/* Chat Interface */}
        {(!welcomeSeen && !isHomePage) || isExpanded || (isProductDetailsPage && nudge) ? (
          <Card
            className="shadow-lg flex flex-col transition-all duration-300 ease-in-out pt-1 pb-3 px-3 no-scrollbar gap-3"
            // className={`shadow-lg flex flex-col transition-all duration-300 ease-in-out p-4 no-scrollbar gap-4 ${isDialogOpen ? "hidden" : ""}`}
            style={{
              maxHeight: `${MAX_CHAT_HEIGHT}px`,
              // minHeight: `${MIN_CHAT_HEIGHT}px`,
            }}
          >
            <div
              className={`flex-1 no-scrollbar ${shouldScroll ? "overflow-y-auto" : "overflow-visible"
                }`}
              ref={messagesContainerRef}
            >
              <div className="">
                <span className=" flex justify-end w-full">
                  <button className="cursor-pointer" onClick={() => { setIsExpanded(false); setNudge(''); setLatestResponse(''); setWelcomeMessageSeen(true) }}>
                    <X className=" text-muted-foreground/40" size={12} />
                  </button>
                </span>
                <div className="flex justify-start">
                  <div className="w-full rounded-xl p-2 bg-[#F9F9F9] border border-primary">
                    {
                      (!welcomeSeen && !isHomePage) ?
                        <p className="text-sm lg:text-base">
                          {currentHeading}
                        </p> :
                        <>
                          {isFetching ? (
                            <ChatLoader showText={true} />
                          ) : latestResponse.length > 0 && (!isProductDetailsPage || !showNudge || !nudge) ? (
                            <p className="text-sm lg:text-base">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: latestResponse,
                                }}
                              />
                            </p>
                          ) : isProductDetailsPage && showNudge && nudge ? (
                            <p className="text-sm lg:text-base">{nudge}</p>
                          ) : null}
                        </>
                    }

                  </div>

                </div>
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="">
              <InputBar
                className="border-muted-foreground/20"
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                handleSendMessage={handleSendMessage}
                isProductDetailsPage={isProductDetailsPage}
              />
            </div>
          </Card>
        ) : (
          <InputBar
            className="border-primary"
            input={input}
            setInput={setInput}
            handleKeyDown={handleKeyDown}
            handleSendMessage={handleSendMessage}
            isProductDetailsPage={isProductDetailsPage}
          />
        )}


      </div>
    </div>
  );
}

type ProductPopupProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  input?: string;
  setInput?: (value: string) => void;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
  handleSendMessage?: () => void;
  loader?: boolean;
};

export const ProductPopup: React.FC<ProductPopupProps> = ({
  isOpen,
  onClose,
  products,
  loader,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[90px] bg-black/30"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg max-h-[82vh] overflow-y-auto px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        {loader ? (
          <ProductLoader />
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <h2 className=" font-semibold">Recommended Outfits</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full p-0"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="text-center flex flex-col mb-4 space-y-2">
              <span className="font-semibold text-xl">{title}</span>
            </div>
            <div className="relative">
              <Carousel
                className="w-full"
                opts={{
                  align: 'start',
                  loop: false, // Set to true if you want infinite looping
                }}
              >
                <CarouselContent className="-ml-2">
                  {products.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-2 basis-[calc(100%/3)]" // Show ~3 items per view
                    >
                      <ProductCardForPopup product={product} onClick={onClose} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {products.length > 3 && (
                  <>
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
                  </>
                )}
              </Carousel>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

