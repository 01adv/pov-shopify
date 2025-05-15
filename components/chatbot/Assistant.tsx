"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useIsPhone from "@/hooks/usePhone";
import { extractProducts, Product } from "@/lib/extractedProductsForPopup";
import { matchProducts } from "@/lib/productMatcher";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ProductLoader } from "../loader";
import { ProductCardForPopup } from "../ProductCardForPopup";
import ChatLoader from "./ChatLoader";
import { InputBar } from "./InputBar2";
import { useProductContext } from "@/hooks/useProduct";
import { getOrCreateSessionId } from "@/lib/helpers";
import { getNudges } from "@/hooks/getNudges";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";



export function AssistantChat() {
  const { setMatchedProducts, setTitle, title: contextTitle, switchToTextAgent, setPersonalizedNudge, productName } = useProductContext();
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const MIN_CHAT_HEIGHT = 140; // Minimum height including input bar
  const MAX_CHAT_HEIGHT = 560; // Maximum card height
  const HEADER_HEIGHT = 65; // Header + border
  const INPUT_HEIGHT = 72; // Input bar + padding

  // Initialize session ID
  useEffect(() => {
    const currentSessionId = getOrCreateSessionId();
    setSessionId(currentSessionId);
  }, []);
  useEffect(() => {
    const fetchNudges = async () => {
      console.log('title n nudgeess', productName, sessionId);
      if (!productName || !sessionId) return;

      try {
        const nudge = await getNudges({ productName, sessionId });
        console.log('nudge', nudge);
        setNudge(nudge || "");
        if (nudge && setPersonalizedNudge) {
          setPersonalizedNudge(nudge);
        }
      } catch (error) {
        console.error("Failed to fetch nudges", error);
      }
    };

    fetchNudges();
  }, [productName, sessionId]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Expand the chat if it's the first message
    if (!isExpanded) {
      setIsExpanded(true);
    }

    // setMessages((prev) => [...prev, userMessage])
    const message = input;
    setInput("");
    // setIsTyping(true)
    setIsFetching(true);

    console.log("message", message);

    try {
      const response = await fetch(
        `https://textagentpov.onrender.com/chat/${sessionId}`,
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
      } else {
        setIsFetching(false); // Stop fetching but don't restart typing
      }

      console.log("products", products);
      console.log("assistantResponse", assistantResponse);
      // Normalize assistant products (convert to lowercase for case-insensitive match)
      if (assistantProducts && assistantProducts?.length > 0) {
        console.log("assistantProducts", assistantProducts);
        const matchedProd = matchProducts(assistantProducts, products);
        console.log("matched", matchedProd);

        if (matchProducts?.length > 0) {
          setRecommendedProducts(matchedProd);
          setMatchedProducts(matchedProd)
          console.log("message and recommendations", recommendedProducts);
          // setRecommendedProducts(mentionedProducts);
          if (isPhone) {
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

  return (
    <div>
      {switchToTextAgent && (
        <div className=" z-40 fixed bottom-8 px-4 mx-auto lg:px-0 w-full flex items-center justify-center">
          <div className="relative w-full lg:max-w-md">
            {/* Product Popup */}
            {!isPhone && (
              <ProductPopup
                title={contextTitle}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                products={recommendedProducts}
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                handleSendMessage={handleSendMessage}
                loader={loader}
              />
            )}

            {/* Chat Interface */}
            {isExpanded || nudge ? (
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
                      <button onClick={() => { setIsExpanded(false); setNudge(''); setLatestResponse('') }}>
                        <X className=" text-muted-foreground/40" size={12} />
                      </button>
                    </span>
                    <div className="flex justify-start">
                      <div className="w-full rounded-xl p-2 bg-[#F9F9F9] border border-primary">
                        {/* {isFetching ? (
                      <>
                        <ChatLoader />
                      </>
                    ) : (
                      <p className="text-sm lg:text-base">
                    
                        <span
                          className=""
                          dangerouslySetInnerHTML={{
                            __html: latestResponse,
                          }}
                        />
                      </p>
                    )}
                    {nudge && latestResponse.length < 1 && (
                      isFetching ?
                        <ChatLoader /> :
                        <p className="text-sm lg:text-base">{nudge}</p>
                    )} */}
                        {isFetching ? (
                          <ChatLoader />
                        ) : latestResponse.length > 0 ? (
                          <p className="text-sm lg:text-base">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: latestResponse,
                              }}
                            />
                          </p>
                        ) : nudge ? (
                          <p className="text-sm lg:text-base">{nudge}</p>
                        ) : null}
                      </div>

                    </div>
                    {/* ) : null
                                })()} */}
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
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type ProductPopupProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSendMessage: () => void;
  loader?: boolean;
};

const ProductPopup: React.FC<ProductPopupProps> = ({
  isOpen,
  onClose,
  products,
  input,
  setInput,
  handleKeyDown,
  handleSendMessage,
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
            <div className="mt-3">
              <InputBar
                className="border-primary w-full"
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                handleSendMessage={handleSendMessage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

