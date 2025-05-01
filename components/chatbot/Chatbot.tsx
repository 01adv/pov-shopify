'use client'
import React from 'react'
import { AssistantChat } from "@/components/chatbot/Assistant";
import Image from "next/image";

const Chatbot = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <>
            <div className="hidden lg:block fixed bottom-8 right-8 ">
                {!isExpanded && <button
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white shadow-lg"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Image src="/bot.svg" width={24} height={24} alt="Chat" />
                </button>}
                {isExpanded && <AssistantChat />}
            </div>
            <div className="block lg:hidden">
                <AssistantChat />
            </div>
        </>
    )
}

export default Chatbot