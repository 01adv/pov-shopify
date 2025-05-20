'use client'
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Mic, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { logEvent } from "@/lib/logger";

type InputBarProps = {
    input?: string;
    setInput: (value: string) => void;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
    handleSendMessage?: () => void;
    className?: string;
    isProductDetailsPage?: boolean;
};

// Array of placeholder texts
const placeholderTexts = [
    "Classy outfit for a Friday night",
    "Something work-ish but not boring!",
    "Relaxed work dresses in quarter sleeves",
    "Work Jackets, but versatile",
    "Only straight fit dresses, no sleeveless",
    "Cute brunch outfits, no bold colors",
    "Work outfit that makes a statement",
];

const productPagePlaceholderTexts = [
    "How can I make it more casual?",
    "What color earrings would go with this?",
    "How to style it more professionally?",
    "Style it for an evening glam outing!!",
]

export const InputBar: React.FC<InputBarProps> = ({
    input,
    setInput,
    handleKeyDown,
    handleSendMessage,
    className,
    isProductDetailsPage,
}) => {
    const [currentPlaceholder, setCurrentPlaceholder] = useState("");
    const [isInteracting, setIsInteracting] = useState(false);
    const lastInteractionRef = useRef(Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Function to get a random placeholder
    const getRandomPlaceholder = () => {
        const texts = isProductDetailsPage ? productPagePlaceholderTexts : placeholderTexts;
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    };

    // Function to start cycling placeholders
    const startCycling = () => {
        if (intervalRef.current) return; // Prevent multiple intervals

        intervalRef.current = setInterval(() => {
            setCurrentPlaceholder(getRandomPlaceholder());
        }, 3000); // Change every 3 seconds
    };

    // Function to stop cycling placeholders
    const stopCycling = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCurrentPlaceholder('Type anything you interested here...');
    };

    // Initialize placeholder and start cycling on mount
    useEffect(() => {
        setCurrentPlaceholder(getRandomPlaceholder());
        startCycling();

        return () => stopCycling(); // Cleanup on unmount
    }, [isProductDetailsPage, getRandomPlaceholder, startCycling]); // Add isProductDetailsPage, getRandomPlaceholder, and startCycling to dependency array

    // Handle user interaction (focus, typing, or blur)
    useEffect(() => {
        const checkInactivity = () => {
            const timeSinceLastInteraction = (Date.now() - lastInteractionRef.current) / 1000;
            if (timeSinceLastInteraction >= 420 && !isInteracting) {
                // Resume cycling after 7 minutes (420 seconds) of inactivity
                startCycling();
            }
        };

        const inactivityInterval = setInterval(checkInactivity, 1000); // Check every second

        return () => clearInterval(inactivityInterval); // Cleanup on unmount
    }, [isInteracting, startCycling]); // Add startCycling to dependency array

    // Handle focus event
    const handleFocus = () => {
        setIsInteracting(true);
        lastInteractionRef.current = Date.now();
        stopCycling();
    };

    // Handle blur event
    const handleBlur = () => {
        setIsInteracting(false);
        lastInteractionRef.current = Date.now();
        // Don't immediately start cycling; wait for inactivity timeout
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        lastInteractionRef.current = Date.now();
        if (!isInteracting) {
            setIsInteracting(true);
            stopCycling();
        }
    };
    // Handle click on the entire InputBar
    const handleInputBarClick = async () => {
        console.log("Input bar clicked");
        try {
            await logEvent("stats", {
                event: "input_bar_click",
                source: "chatbot.input",
                tags: ["click", "input_bar"],
            });
        } catch (error) {
            console.error("Error logging input bar click:", error);
        }
    };

    return (
        <div className={cn("flex items-center rounded-full bg-white border-[1.5px] py-[2px]", className)} onClick={handleInputBarClick}>
            <Button variant="ghost" size="icon" className="ml-2 h-9 w-9 rounded-full p-0">
                <Mic size={20} className="text-black" />
            </Button>
            <Input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={`"${currentPlaceholder}...`}
                className="flex-1 border-none bg-transparent shadow-none outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:italic"
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={handleSendMessage}
                className="bg-gray-200 mr-1 h-9 w-9 rounded-full p-0"
            >
                <Send size={20} className="text-black rotate-45" />
            </Button>
        </div>
    );
};