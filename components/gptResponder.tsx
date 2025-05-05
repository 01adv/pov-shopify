'use client'
import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
// import pdata from "../components/products.json";
import pdata from "@/lib/testProducts";
import { useRouter } from "next/navigation";

const generateSessionId = () =>
    `session${Math.random().toString(36).substring(2, 15)}`;

const getOrCreateSessionId = () => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) return storedSessionId;
    const newSessionId = generateSessionId();
    localStorage.setItem("chatSessionId", newSessionId);
    return newSessionId;
};

const TypingEffect = ({ text, onDone, speed = 30 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const timeoutRef = useRef(null);

    useEffect(() => {
        let currentIndex = 0;
        let currentText = "";

        const type = () => {
            if (currentIndex < text.length) {
                currentText += text.charAt(currentIndex);
                setDisplayedText(currentText);
                currentIndex++;
                timeoutRef.current = setTimeout(type, speed);
            } else {
                onDone?.();
            }
        };

        setDisplayedText("");
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(type, 0);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [text, onDone, speed]);

    return <span dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

const GPTResponder = () => {
    const [userInput, setUserInput] = useState("");
    const [gptOutput, setGptOutput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const textareaRef = useRef(null);
    const router = useRouter()

    useEffect(() => {
        const currentSessionId = getOrCreateSessionId();
        setSessionId(currentSessionId);
    }, []);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const message = userInput;
        setUserInput("");
        setIsTypingDone(false);

        try {
            const response = await fetch(
                `https://textagentbaseline-kekj.onrender.com/chat/${sessionId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message, sessionId }),
                }
            );

            const data = await response.json();
            console.log(data);

            if (data.response !== gptOutput) {
                setGptOutput(data.response);
                setIsTyping(true);
            }

            const mentionedProducts = pdata.filter((product) =>
                data.response.toLowerCase().includes(product.name.toLowerCase())
            );

            if (mentionedProducts.length > 0) {
                console.log('message and recommendations', mentionedProducts);
                console.log('response', data.response);
                // router.push("/recommendations", {
                // state: { message: data.response, recommendations: mentionedProducts },
                // });
            }
        } catch (error) {
            console.log(error);
            setGptOutput("Sorry, I'm having trouble connecting right now.");
            setIsTyping(true);
        }
    };

    const handleTypingDone = () => {
        setIsTyping(false);
        setIsTypingDone(true);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 z-50 w-full max-w-md mx-auto">
            {(isTyping || isTypingDone) && (
                <div className="mb-1 flex justify-start">
                    <div className="w-full rounded-full bg-gradient-to-r from-indigo-300 via-blue-300 to-green-300 p-[2px]">
                        <div className="bg-white rounded-full px-4 py-2">
                            <div className="text-sm text-gray-800 font-medium leading-relaxed break-words">
                                {isTyping ? (
                                    <TypingEffect text={gptOutput} onDone={handleTypingDone} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: gptOutput }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            )}

            <div className="relative bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center">
                <textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    rows={1}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent resize-none text-base font-medium focus:outline-none"
                    style={{ height: "1.25rem", maxHeight: "6rem" }}
                    disabled={isTyping}
                    onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                />
                <button
                    onClick={handleSend}
                    disabled={isTyping}
                    className="ml-2 w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    <Send className="w-5 h-5 text-black" />
                </button>
            </div>
        </div>
    );
};

export default GPTResponder;