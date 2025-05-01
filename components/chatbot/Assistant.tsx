


// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { X, Mic, Send } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { ProductCard } from "./ProductCard"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"

// type Message = {
//     id: string
//     content: string
//     sender: "user" | "assistant"
// }

// export function AssistantChat() {
//     const [messages, setMessages] = useState<Message[]>([])
//     const [inputCount, setInputCount] = useState(0)
//     const [isExpanded, setIsExpanded] = useState(false)
//     const [isTyping, setIsTyping] = useState(false)
//     const [showCards, setShowCards] = useState(false)
//     const [input, setInput] = useState("")
//     const [chatHeight, setChatHeight] = useState(0)

//     const messagesEndRef = useRef<HTMLDivElement>(null)
//     const messagesContainerRef = useRef<HTMLDivElement>(null)

//     const MIN_CHAT_HEIGHT = 150 // Minimum height including input bar
//     const MAX_CHAT_HEIGHT = 560 // Maximum card height
//     const HEADER_HEIGHT = 65 // Header + border
//     const INPUT_HEIGHT = 72 // Input bar + padding

//     // Predefined responses based on input count
//     const getResponse = (inputCount: number, userMessage: string): string => {
//         switch (inputCount) {
//             case 1:
//                 return "Do you have any specifications, colour, outfit type?"
//             case 2:
//                 return "Based on your request, I've selected some elegant options for a chic dinner outfit. Here are my recommendations:"
//             default:
//                 return "Is there anything else you'd like to know about these outfits?"
//         }
//     }

//     const handleSendMessage = () => {
//         if (!input.trim()) return

//         // Expand the chat if it's the first message
//         if (!isExpanded) {
//             setIsExpanded(true)
//         }

//         // Add user message
//         const userMessage: Message = {
//             id: Date.now().toString(),
//             content: input,
//             sender: "user",
//         }

//         setMessages((prev) => [...prev, userMessage])
//         setInput("")

//         // Increment input count
//         const newInputCount = inputCount + 1
//         setInputCount(newInputCount)

//         // Show typing indicator
//         setIsTyping(true)

//         // For the second input, show typing for 2 seconds then show cards
//         if (newInputCount === 2) {
//             setTimeout(() => {
//                 setIsTyping(false)

//                 // Add assistant response
//                 const assistantMessage: Message = {
//                     id: (Date.now() + 1).toString(),
//                     content: getResponse(newInputCount, input),
//                     sender: "assistant",
//                 }
//                 setMessages((prev) => [...prev, assistantMessage])

//                 // Show cards after a brief delay
//                 setTimeout(() => {
//                     setShowCards(true)
//                 }, 300)
//             }, 2000)
//         } else {
//             // For other inputs, show typing for a shorter time
//             setTimeout(() => {
//                 setIsTyping(false)

//                 // Add assistant response
//                 const assistantMessage: Message = {
//                     id: (Date.now() + 1).toString(),
//                     content: getResponse(newInputCount, input),
//                     sender: "assistant",
//                 }
//                 setMessages((prev) => [...prev, assistantMessage])
//             }, 800)
//         }
//     }

//     const handleKeyDown = (e: React.KeyboardEvent) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault()
//             handleSendMessage()
//         }
//     }

//     // Handle close button click
//     const handleClose = () => {
//         setIsExpanded(false)
//         setMessages([])
//         setInputCount(0)
//         setShowCards(false)
//     }

//     // Update chat height based on content
//     useEffect(() => {
//         if (!isExpanded || !messagesContainerRef.current) return

//         const updateHeight = () => {
//             const messagesHeight = messagesContainerRef.current?.scrollHeight || 0
//             const totalContentHeight = messagesHeight + HEADER_HEIGHT + INPUT_HEIGHT
//             const newHeight = Math.min(Math.max(totalContentHeight, MIN_CHAT_HEIGHT), MAX_CHAT_HEIGHT)
//             setChatHeight(newHeight)
//         }

//         // Use ResizeObserver to detect content changes
//         const resizeObserver = new ResizeObserver(() => {
//             updateHeight()
//         })

//         resizeObserver.observe(messagesContainerRef.current)
//         updateHeight() // Initial calculation

//         return () => {
//             resizeObserver.disconnect()
//         }
//     }, [isExpanded, messages, isTyping, showCards])

//     // Auto scroll to bottom when messages change
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//     }, [messages, isTyping, showCards])

//     const shouldScroll = chatHeight === MAX_CHAT_HEIGHT


//     return (
//         <div className="fixed bottom-8 right-8 w-full max-w-xs sm:max-w-sm lg:max-w-md">
//             {isExpanded ? (
//                 <Card
//                     className="shadow-lg flex flex-col transition-all duration-300 ease-in-out p-4 no-scrollbar"
//                     style={{ maxHeight: `${MAX_CHAT_HEIGHT}px`, minHeight: `${MIN_CHAT_HEIGHT}px` }}
//                 >

//                     {/* <div className="flex items-center justify-end">
//                         <h2 className="text-lg font-bold">Style Assistant</h2>
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleClose}
//                             className="h-8 w-8 rounded-full p-0"
//                         >
//                             <X size={18} />
//                         </Button>
//                     </div> */}

//                     <div
//                         className={`flex-1 no-scrollbar ${shouldScroll ? "overflow-y-auto" : "overflow-visible"}`}
//                         ref={messagesContainerRef}
//                     >
//                         <div className="space-y-4 ">
//                             {messages.map((message) => (
//                                 <div
//                                     key={message.id}
//                                     className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
//                                         }`}
//                                 >
//                                     <div
//                                         className={`max-w-[80%] rounded-xl p-2 ${message.sender === "user"
//                                             ? "bg-[#F9F9F9]/50 shadow-sm"
//                                             : "bg-[#F9F9F9] border border-primary"
//                                             }`}
//                                     >
//                                         <p className="text-sm lg:text-base">{message.content}</p>
//                                     </div>
//                                 </div>
//                             ))}

//                             {isTyping && (
//                                 <div className="flex justify-start">
//                                     <div className="flex max-w-[80%] items-center space-x-1 rounded-lg bg-[#F9F9F9] border border-primary px-4 py-3 shadow-sm">
//                                         <span>Just a sec</span>
//                                         <span className="animate-pulse">•</span>
//                                         <span className="animate-pulse animation-delay-200">•</span>
//                                         <span className="animate-pulse animation-delay-400">•</span>
//                                     </div>
//                                 </div>
//                             )}

//                             {showCards && (
//                                 <div className="mt-4 space-y-3">
//                                     <ProductCard
//                                         imageUrl="/placeholder.png"
//                                         title="Intention Vest & Pant Set for Women"
//                                         rating={5}
//                                         price={105.0}
//                                     />
//                                     <ProductCard
//                                         imageUrl="/placeholder.png"
//                                         title="Emerald Teal Evening Gown"
//                                         rating={5}
//                                         price={129.0}
//                                     />
//                                 </div>
//                             )}
//                             <div ref={messagesEndRef} />
//                         </div>
//                     </div>

//                     <div className="mt-auto ">
//                         <InputBar
//                             className="border-muted-foreground/20"
//                             input={input}
//                             setInput={setInput}
//                             handleKeyDown={handleKeyDown}
//                             handleSendMessage={handleSendMessage}
//                         />
//                     </div>
//                 </Card>
//             ) : (
//                 <InputBar
//                     className="border-primary"
//                     input={input}
//                     setInput={setInput}
//                     handleKeyDown={handleKeyDown}
//                     handleSendMessage={handleSendMessage}
//                 />
//             )}
//         </div>
//     )
// }


// // 🆕 Move InputBar outside of AssistantChat and update it to accept props

// type InputBarProps = {
//     input: string
//     setInput: (value: string) => void
//     handleKeyDown: (e: React.KeyboardEvent) => void
//     handleSendMessage: () => void
//     className?: string
// }

// const InputBar: React.FC<InputBarProps> = ({ input, setInput, handleKeyDown, handleSendMessage, className }) => (
//     <div className={cn("flex items-center rounded-full bg-white px-4 py-2 border-[1.5px]", className)}>
//         <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 rounded-full p-0">
//             <Mic size={24} className="text-black" />
//         </Button>
//         <Input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type anything you interested here..."
//             className="flex-1 border-none bg-transparent text-sm shadow-none outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
//         />
//         <Button
//             variant="ghost"
//             size="icon"
//             onClick={handleSendMessage}
//             className="bg-gray-200 ml-2 h-8 w-8 lg:h-11 lg:w-11 rounded-full p-0"
//         >
//             <Send size={20} className="text-black rotate-45" />
//         </Button>
//     </div>
// )


"use client"

import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useIsPhone from "@/hooks/usePhone"
import { Product, products } from "@/lib/products"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ProductLoader } from "../loader"
import { ProductCardForPopup } from "../ProductCardForPopup"
import { InputBar } from "./InputBar2"

type Message = {
    id: string
    content: string
    sender: "user" | "assistant"
}



export function AssistantChat() {
    const isPhone = useIsPhone()
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [inputCount, setInputCount] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    // const [showCards, setShowCards] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [input, setInput] = useState("")
    const [chatHeight, setChatHeight] = useState(0)
    const [loader, setLoader] = useState(false)


    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    const MIN_CHAT_HEIGHT = 140 // Minimum height including input bar
    const MAX_CHAT_HEIGHT = 560 // Maximum card height
    const HEADER_HEIGHT = 65 // Header + border
    const INPUT_HEIGHT = 72 // Input bar + padding


    // Predefined responses based on input count
    const getResponse = (inputCount: number, userMessage: string): string => {
        switch (inputCount) {
            case 1:
                return "Do you have any specifications, colour, outfit type?"
            case 2:
                return "Based on your request, I've selected some elegant options for a chic dinner outfit. Here are my recommendations:"
            default:
                return "Is there anything else you'd like to know about these outfits?"
        }
    }

    const handleSendMessage = () => {
        if (!input.trim()) return

        // Expand the chat if it's the first message
        if (!isExpanded) {
            setIsExpanded(true)
        }

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
        }

        setMessages((prev) => [...prev, userMessage])
        // Increment input count
        const newInputCount = inputCount + 1
        setInputCount(newInputCount)

        setInput("")
        // Show typing indicator
        setIsTyping(true)
        const placeholderId = `assistant-${Date.now()}`
        const placeholderMessage: Message = {
            id: placeholderId,
            content: "Just a sec...",
            sender: "assistant",
        }
        setMessages((prev) => [...prev, placeholderMessage])

        // For the second input, show typing for 2 seconds then show cards
        if (newInputCount === 2) {
            if (isPhone) {
                router.push("/recommended")
            } else {
                setTimeout(() => {
                    setIsTyping(false)

                    const updatedMessage: Message = {
                        id: placeholderId,
                        content: getResponse(newInputCount, input),
                        sender: "assistant",
                    }
                    setMessages((prev) =>
                        prev.map((msg) => msg.id === placeholderId ? updatedMessage : msg)
                    )


                    // Show cards in popup after a brief delay
                    setTimeout(() => {
                        // setShowCards(true)
                        setIsDialogOpen(true)
                        setLoader(true)
                    }, 300)
                    setTimeout(() => {
                        setLoader(false)
                    }, 1500);
                }, 2000)
            }
        } else {
            // For other inputs, show typing for a shorter time
            setTimeout(() => {
                setIsTyping(false)

                // Add assistant response
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: getResponse(newInputCount, input),
                    sender: "assistant",
                }
                setMessages((prev) => [...prev, assistantMessage])
            }, 800)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // Handle close button click for chat
    const handleClose = () => {
        setIsExpanded(false)
        setMessages([])
        setInputCount(0)
        // setShowCards(false)
        setIsDialogOpen(false)
    }

    // Update chat height based on content
    useEffect(() => {
        if (!isExpanded || !messagesContainerRef.current) return

        const updateHeight = () => {
            const messagesHeight = messagesContainerRef.current?.scrollHeight || 0
            const totalContentHeight = messagesHeight + HEADER_HEIGHT + INPUT_HEIGHT
            const newHeight = Math.min(Math.max(totalContentHeight, MIN_CHAT_HEIGHT), MAX_CHAT_HEIGHT)
            setChatHeight(newHeight)
        }

        // Use ResizeObserver to detect content changes
        const resizeObserver = new ResizeObserver(() => {
            updateHeight()
        })

        resizeObserver.observe(messagesContainerRef.current)
        updateHeight() // Initial calculation

        return () => {
            resizeObserver.disconnect()
        }
    }, [isExpanded, messages, isTyping])

    // Auto scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    const shouldScroll = chatHeight === MAX_CHAT_HEIGHT

    return (
        <div className="fixed bottom-8 px-4 lg:px-0 w-full flex items-center justify-center">
            <div className="w-full lg:max-w-md">
                {/* Product Popup */}
                {
                    !isPhone &&
                    <ProductPopup
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        products={products}
                        input={input}
                        setInput={setInput}
                        handleKeyDown={handleKeyDown}
                        handleSendMessage={handleSendMessage}
                        loader={loader}
                    />
                }

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
                                {/* {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-xl p-2 ${message.sender === "user" ? "bg-[#F9F9F9]/50 shadow-sm" : "bg-[#F9F9F9] border border-primary"
                                                }`}
                                        >
                                            <p className="text-sm lg:text-base">{message.content}</p>
                                        </div>
                                    </div>
                                ))} */}
                                {(() => {
                                    const lastAssistantMessage = [...messages]
                                        .reverse()
                                        .find((msg) => msg.sender === "assistant");

                                    return lastAssistantMessage ? (
                                        <div className="flex justify-start">
                                            <div className="w-full rounded-xl p-2 bg-[#F9F9F9] border border-primary">
                                                <p className="text-sm lg:text-base">{lastAssistantMessage.content}</p>
                                            </div>
                                        </div>
                                    ) : null;
                                })()}


                                {/* {isTyping && (
                                    <div className="flex justify-start mt-4">
                                        <div className="flex w-full items-center space-x-1 rounded-lg bg-[#F9F9F9] border border-primary p-2 shadow-sm text-sm">
                                            <span>Just a sec</span>
                                            <span className="animate-pulse">•</span>
                                            <span className="animate-pulse animation-delay-200">•</span>
                                            <span className="animate-pulse animation-delay-400">•</span>
                                        </div>
                                    </div>
                                )} */}

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
    products: Product[]
    input: string
    setInput: (value: string) => void
    handleKeyDown: (e: React.KeyboardEvent) => void
    handleSendMessage: () => void
    loader?: React.ReactNode
}

const ProductPopup: React.FC<ProductPopupProps> = ({ isOpen, onClose, products, input, setInput, handleKeyDown, handleSendMessage, loader }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md md:max-w-lg max-h-[85vh] overflow-y-auto">
            {loader ? <ProductLoader /> :
                <>
                    <DialogHeader>
                        <div className="flex justify-between items-center">
                            <DialogTitle>Recommended Outfits</DialogTitle>
                        </div>
                        {/* <div className=" flex justify-between items-center"> */}
                        <DialogDescription className="text-center flex flex-col mt-4 space-y-2"><span className="font-semibold text-xl">Your Chic Dinner Outfit Picks Are Ready</span>
                            <span className="text-muted-foreground/75"> We&apos;ve curated 5 stylish dinner-ready ensembles just for you.</span>
                        </DialogDescription>
                        {/* </div> */}
                    </DialogHeader>
                    {/* <div className="space-y-4">
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                imageUrl={product.imageUrl}
                                title={product.title}
                                rating={product.rating}
                                price={product.price}
                            />
                        ))}
                    </div> */}

                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {products.map((product) => (
                            <div key={product.id} className="basis-[calc(100%/3)] flex-shrink-0">
                                <ProductCardForPopup product={product} />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <div className="w-full flex justify-between items-center">
                            <InputBar
                                className="border-primary w-full"
                                input={input}
                                setInput={setInput}
                                handleKeyDown={handleKeyDown}
                                handleSendMessage={handleSendMessage}
                            />
                        </div>
                    </DialogFooter>
                </>
            }
        </DialogContent>
    </Dialog>
)


