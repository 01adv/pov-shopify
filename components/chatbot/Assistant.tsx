


"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import useIsPhone from "@/hooks/usePhone"
import { TestProductType, products } from "@/lib/testProducts"
// import rawProducts from "@/lib/testProducts"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ProductLoader } from "../loader"
import { ProductCardForPopup } from "../ProductCardForPopup"
import ChatLoader from "./ChatLoader"
import { InputBar } from "./InputBar2"


const generateSessionId = () =>
    `session${Math.random().toString(36).substring(2, 15)}`

const getOrCreateSessionId = () => {
    const storedSessionId = localStorage.getItem("chatSessionId")
    if (storedSessionId) return storedSessionId
    const newSessionId = generateSessionId()
    localStorage.setItem("chatSessionId", newSessionId)
    return newSessionId
}



export function AssistantChat() {
    // const products: TestProductType[] = rawProducts
    const isPhone = useIsPhone()
    const router = useRouter()
    const [input, setInput] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const [chatHeight, setChatHeight] = useState(0)
    const [sessionId, setSessionId] = useState("")
    const [recommendedProducts, setRecommendedProducts] = useState<TestProductType[]>([])
    const [latestResponse, setLatestResponse] = useState("");
    const [isFetching, setIsFetching] = useState(false);


    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    const MIN_CHAT_HEIGHT = 140 // Minimum height including input bar
    const MAX_CHAT_HEIGHT = 560 // Maximum card height
    const HEADER_HEIGHT = 65 // Header + border
    const INPUT_HEIGHT = 72 // Input bar + padding

    // Initialize session ID
    useEffect(() => {
        const currentSessionId = getOrCreateSessionId()
        setSessionId(currentSessionId)
    }, [])

    const handleSendMessage = async () => {
        if (!input.trim()) return

        // Expand the chat if it's the first message
        if (!isExpanded) {
            setIsExpanded(true)
        }


        // setMessages((prev) => [...prev, userMessage])
        const message = input
        setInput("")
        // setIsTyping(true)
        setIsFetching(true);

        console.log('message', message)

        try {
            const response = await fetch(
                `https://textagentbaseline-kekj.onrender.com/chat/${sessionId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message, sessionId }),
                }
            )

            const data = await response.json()
            console.log(data)
            const assistantResponse = data.response || "Sorry, I couldn't process that."


            // Only update if the response is different
            if (assistantResponse !== latestResponse) {
                setLatestResponse(assistantResponse);
                setIsFetching(false);
                setIsTyping(true);
            } else {
                setIsFetching(false); // Stop fetching but don't restart typing
            }

            // Filter mentioned products
            const mentionedProducts = products.filter((product) =>
                assistantResponse.toLowerCase().includes(product.name.toLowerCase())
            )

            if (mentionedProducts.length > 0) {
                console.log("message and recommendations", mentionedProducts)
                setRecommendedProducts(mentionedProducts)
                if (isPhone) {
                    router.push("/recommended")
                } else {
                    setTimeout(() => {
                        setIsDialogOpen(true)
                        setLoader(true)
                        setTimeout(() => {
                            setLoader(false)
                        }, 500)
                    }, 300)
                }
            }
        } catch (error) {
            console.error(error)
            setLatestResponse("Sorry, I'm having trouble connecting right now.")
            setIsTyping(true)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }


    // Update chat height based on content
    useEffect(() => {
        if (!isExpanded || !messagesContainerRef.current) return

        const updateHeight = () => {
            const messagesHeight = messagesContainerRef.current?.scrollHeight || 0
            const totalContentHeight = messagesHeight + HEADER_HEIGHT + INPUT_HEIGHT
            const newHeight = Math.min(
                Math.max(totalContentHeight, MIN_CHAT_HEIGHT),
                MAX_CHAT_HEIGHT
            )
            setChatHeight(newHeight)
        }

        const resizeObserver = new ResizeObserver(() => {
            updateHeight()
        })

        resizeObserver.observe(messagesContainerRef.current)
        updateHeight()

        return () => {
            resizeObserver.disconnect()
        }
    }, [isExpanded, isTyping])

    // Auto scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [isTyping])

    const shouldScroll = chatHeight === MAX_CHAT_HEIGHT

    return (
        <div className="fixed bottom-8 px-4 lg:px-0 w-full flex items-center justify-center">
            <div className="relative w-full lg:max-w-md">
                {/* Product Popup */}
                {!isPhone && (
                    <ProductPopup
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
                {isExpanded ? (
                    <Card
                        className="shadow-lg flex flex-col transition-all duration-300 ease-in-out p-4 no-scrollbar gap-4"
                        style={{ maxHeight: `${MAX_CHAT_HEIGHT}px`, minHeight: `${MIN_CHAT_HEIGHT}px` }}
                    >
                        <div
                            className={`flex-1 no-scrollbar ${shouldScroll ? "overflow-y-auto" : "overflow-visible"}`}
                            ref={messagesContainerRef}
                        >
                            <div className="">
                                {/* {(() => {
                                    const lastAssistantMessage = [...messages]
                                        .reverse()
                                        .find((msg) => msg.sender === "assistant")

                                    return lastAssistantMessage ? ( */}
                                <div className="flex justify-start">
                                    <div className="w-full rounded-xl p-2 bg-[#F9F9F9] border border-primary">
                                        {isFetching ? <><ChatLoader /></> : (

                                            <p className="text-sm lg:text-base">
                                                {/* {isTyping && !isTypingDone ? (
                                                    <TypingEffect
                                                        text={latestResponse}
                                                        onDone={handleTypingDone}
                                                    />
                                                )
                                                    : (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: latestResponse,
                                                            }}
                                                        />
                                                    )} */}
                                                <span className=""
                                                    dangerouslySetInnerHTML={{
                                                        __html: latestResponse,
                                                    }}
                                                />
                                            </p>
                                        )}
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
    )
}

type ProductPopupProps = {
    isOpen: boolean
    onClose: () => void
    products: TestProductType[]
    input: string
    setInput: (value: string) => void
    handleKeyDown: (e: React.KeyboardEvent) => void
    handleSendMessage: () => void
    loader?: boolean
}

const ProductPopup: React.FC<ProductPopupProps> = ({
    isOpen,
    onClose,
    products,
    input,
    setInput,
    handleKeyDown,
    handleSendMessage,
    loader,
}) => {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[80px] bg-black/30"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg max-h-[82vh] overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
            >
                {loader ? (
                    <ProductLoader />
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Recommended Outfits</h2>
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
                            <span className="font-semibold text-xl">
                                Your Chic Dinner Outfit Picks Are Ready
                            </span>
                            <span className="text-muted-foreground/75">
                                We&apos;ve curated {products.length} stylish dinner-ready ensembles just
                                for you.
                            </span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {products.map((product) => (
                                <div key={product.id} className="basis-[calc(100%/3)] flex-shrink-0">
                                    <ProductCardForPopup product={product} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
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
    )
}
