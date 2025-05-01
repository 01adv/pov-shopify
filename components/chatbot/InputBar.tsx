"use client"

import type React from "react"
import { useState } from "react"
import { Mic, Send } from "lucide-react"
import { Button } from "../ui/button"

interface InputBarProps {
    placeholder?: string
    onSend?: (message: string) => void
}

export function InputBar({ placeholder = "Type a message...", onSend }: InputBarProps) {
    const [input, setInput] = useState("")

    const handleSend = () => {
        if (input.trim() && onSend) {
            onSend(input)
            setInput("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex items-center rounded-full border border-muted-foreground/20 px-4 py-2">
            <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 rounded-full p-0">
                <Mic size={24} className="text-black" />
            </Button>

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />

            <Button
                variant="ghost"
                size="icon"
                onClick={handleSend}
                className="ml-2 h-13 w-13 rounded-full bg-gray-100 p-0"
            >
                <Send size={20} className="text-black rotate-45" />
            </Button>
        </div>
    )
}
