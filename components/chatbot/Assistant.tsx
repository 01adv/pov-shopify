// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { X, Mic, Send } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { ProductCard } from "./ProductCard"
// import { Input } from "@/components/ui/input"
// import { InputBar } from "./InputBar"

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
//     const chatContainerRef = useRef<HTMLDivElement>(null)
//     const messagesContainerRef = useRef<HTMLDivElement>(null)

//     const MIN_CHAT_HEIGHT = 64 // Just input bar
//     const MAX_CHAT_HEIGHT = 500 // Maximum height
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
//         <Card
//             className={`fixed bottom-8 right-8 w-full max-w-md transition-all duration-300 ease-in-out ${isExpanded ? "" : "shadow-lg"
//                 }`}
//             style={{ height: isExpanded ? `${chatHeight}px` : "auto" }}
//             ref={chatContainerRef}
//         >
//             {isExpanded && (
//                 <div className="flex items-center justify-between border-b p-4">
//                     <h2 className="text-lg font-medium">Style Assistant</h2>
//                     <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 rounded-full p-0">
//                         <X size={18} />
//                     </Button>
//                 </div>
//             )}

//             {isExpanded && (
//                 <div
//                     className={`${shouldScroll ? "overflow-y-auto" : "overflow-visible"}`}
//                     style={{ height: shouldScroll ? `${MAX_CHAT_HEIGHT - HEADER_HEIGHT - INPUT_HEIGHT}px` : "auto" }}
//                     ref={messagesContainerRef}
//                 >
//                     <div className="space-y-4 p-4">
//                         {messages.map((message) => (
//                             <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
//                                 <div
//                                     className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === "user" ? "bg-[#f2f2f2]" : "bg-white shadow-sm"
//                                         }`}
//                                 >
//                                     <p>{message.content}</p>
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Typing indicator */}
//                         {isTyping && (
//                             <div className="flex justify-start">
//                                 <div className="flex max-w-[80%] items-center space-x-1 rounded-lg bg-white px-4 py-3 shadow-sm">
//                                     <span className="animate-pulse">•</span>
//                                     <span className="animate-pulse animation-delay-200">•</span>
//                                     <span className="animate-pulse animation-delay-400">•</span>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Show product cards after 2nd input */}
//                         {showCards && (
//                             <div className="mt-4 space-y-3">
//                                 <ProductCard
//                                     imageUrl="/relaxed-beige-set.png"
//                                     title="Intention Vest & Pant Set for Women"
//                                     rating={5}
//                                     price={105.0}
//                                 />
//                                 <ProductCard
//                                     imageUrl="/emerald-teal-gown.png"
//                                     title="Emerald Teal Evening Gown"
//                                     rating={5}
//                                     price={129.0}
//                                 />
//                             </div>
//                         )}
//                         <div ref={messagesEndRef} />
//                     </div>
//                 </div>
//             )}

//             <div className="">
//                 <div className="flex items-center rounded-full bg-[#f5f5f5] px-4 py-2">
//                     <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 rounded-full p-0">
//                         <Mic size={24} className="text-black" />
//                     </Button>

//                     <Input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                         placeholder="Type anything you interested here..."
//                         className="flex-1 border-none bg-transparent text-sm shadow-none outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
//                     />

//                     <Button variant="ghost" size="icon" onClick={handleSendMessage} className=" bg-gray-400 ml-2 h-13 w-13 rounded-full p-0">
//                         <Send size={20} className="text-black rotate-45" />
//                     </Button>
//                 </div>
//                 {/* <div className={`p-4 ${isExpanded ? "" : "w-full"}`}>
//                     <InputBar onSend={handleSendMessage} placeholder="Type anything you interested here..." />
//                 </div> */}
//             </div>
//         </Card>
//     )
// }


"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductCard } from "./ProductCard"
import { Input } from "@/components/ui/input"

type Message = {
    id: string
    content: string
    sender: "user" | "assistant"
}

export function AssistantChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputCount, setInputCount] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [showCards, setShowCards] = useState(false)
    const [input, setInput] = useState("")
    const [chatHeight, setChatHeight] = useState(0)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    const MIN_CHAT_HEIGHT = 150 // Minimum height including input bar
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
        setInput("")

        // Increment input count
        const newInputCount = inputCount + 1
        setInputCount(newInputCount)

        // Show typing indicator
        setIsTyping(true)

        // For the second input, show typing for 2 seconds then show cards
        if (newInputCount === 2) {
            setTimeout(() => {
                setIsTyping(false)

                // Add assistant response
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: getResponse(newInputCount, input),
                    sender: "assistant",
                }
                setMessages((prev) => [...prev, assistantMessage])

                // Show cards after a brief delay
                setTimeout(() => {
                    setShowCards(true)
                }, 300)
            }, 2000)
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

    // Handle close button click
    const handleClose = () => {
        setIsExpanded(false)
        setMessages([])
        setInputCount(0)
        setShowCards(false)
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
    }, [isExpanded, messages, isTyping, showCards])

    // Auto scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping, showCards])

    const shouldScroll = chatHeight === MAX_CHAT_HEIGHT


    return (
        <div className="fixed bottom-8 right-8 w-full max-w-xs sm:max-w-sm lg:max-w-md">
            {isExpanded ? (
                <Card
                    className="shadow-lg flex flex-col transition-all duration-300 ease-in-out p-4 no-scrollbar"
                    style={{ maxHeight: `${MAX_CHAT_HEIGHT}px`, minHeight: `${MIN_CHAT_HEIGHT}px` }}
                >

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Style Assistant</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClose}
                            className="h-8 w-8 rounded-full p-0"
                        >
                            <X size={18} />
                        </Button>
                    </div>

                    <div
                        className={`flex-1 no-scrollbar ${shouldScroll ? "overflow-y-auto" : "overflow-visible"}`}
                        ref={messagesContainerRef}
                    >
                        <div className="space-y-4 ">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === "user"
                                            ? "bg-[#f2f2f2]"
                                            : "bg-white shadow-sm"
                                            }`}
                                    >
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex max-w-[80%] items-center space-x-1 rounded-lg bg-white px-4 py-3 shadow-sm">
                                        <span className="animate-pulse">•</span>
                                        <span className="animate-pulse animation-delay-200">•</span>
                                        <span className="animate-pulse animation-delay-400">•</span>
                                    </div>
                                </div>
                            )}

                            {showCards && (
                                <div className="mt-4 space-y-3">
                                    <ProductCard
                                        imageUrl="/placeholder.png"
                                        title="Intention Vest & Pant Set for Women"
                                        rating={5}
                                        price={105.0}
                                    />
                                    <ProductCard
                                        imageUrl="/placeholder.png"
                                        title="Emerald Teal Evening Gown"
                                        rating={5}
                                        price={129.0}
                                    />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="mt-auto ">
                        <InputBar
                            input={input}
                            setInput={setInput}
                            handleKeyDown={handleKeyDown}
                            handleSendMessage={handleSendMessage}
                        />
                    </div>
                </Card>
            ) : (
                <InputBar
                    input={input}
                    setInput={setInput}
                    handleKeyDown={handleKeyDown}
                    handleSendMessage={handleSendMessage}
                />
            )}
        </div>
    )
}


// 🆕 Move InputBar outside of AssistantChat and update it to accept props

type InputBarProps = {
    input: string
    setInput: (value: string) => void
    handleKeyDown: (e: React.KeyboardEvent) => void
    handleSendMessage: () => void
}

const InputBar: React.FC<InputBarProps> = ({ input, setInput, handleKeyDown, handleSendMessage }) => (
    <div className="flex items-center rounded-full bg-white px-4 py-2 border border-muted-foreground/20">
        <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 rounded-full p-0">
            <Mic size={24} className="text-black" />
        </Button>
        <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type anything you interested here..."
            className="flex-1 border-none bg-transparent text-sm shadow-none outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
            variant="ghost"
            size="icon"
            onClick={handleSendMessage}
            className="bg-gray-200 ml-2 h-8 w-8 lg:h-11 lg:w-11 rounded-full p-0"
        >
            <Send size={20} className="text-black rotate-45" />
        </Button>
    </div>
)
