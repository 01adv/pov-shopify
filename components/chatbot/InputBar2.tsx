'use client'
import { cn } from "@/lib/utils";
import { Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { mobilePlaceholderTexts, placeholderTexts, productPagePlaceholderTexts } from "@/lib/data";
import useIsPhone from "@/hooks/usePhone";
import { useProductContext } from "@/hooks/useProduct";

type InputBarProps = {
    input?: string;
    setInput: (value: string) => void;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
    handleSendMessage?: () => void;
    className?: string;
    isProductDetailsPage?: boolean;
};



export const InputBar: React.FC<InputBarProps> = ({
    input,
    setInput,
    handleKeyDown,
    handleSendMessage,
    className,
    isProductDetailsPage,
}) => {
    const { shopifyPlaceholder, setShopifyPlaceholder } = useProductContext()
    const [currentPlaceholder, setCurrentPlaceholder] = useState("");
    const [isInteracting, setIsInteracting] = useState(false);
    const lastInteractionRef = useRef(Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isPhone = useIsPhone();
    const [simplePlaceholderTexts, setSimplePlaceholderTexts] = useState<string[]>(mobilePlaceholderTexts);

    // initalize isphone in useeffect
    useEffect(() => {
        if (isPhone) {
            setSimplePlaceholderTexts(mobilePlaceholderTexts);
        } else {
            setSimplePlaceholderTexts(placeholderTexts);
        }
    }, [isPhone]);
    // Function to get a random placeholder
    const getRandomPlaceholder = () => {
        // const simplePlaceholderTexts = isPhone ? mobilePlaceholderTexts : placeholderTexts
        const texts = isProductDetailsPage ? productPagePlaceholderTexts : simplePlaceholderTexts;
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
        setCurrentPlaceholder("Say a vibe or mood, and I'll pick");
    };

    // Initialize placeholder and start cycling on mount
    useEffect(() => {
        setCurrentPlaceholder(getRandomPlaceholder());
        startCycling();

        return () => stopCycling(); // Cleanup on unmount
    }, [isProductDetailsPage, isPhone, simplePlaceholderTexts]); // Add isProductDetailsPage, getRandomPlaceholder, and startCycling to dependency array

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
    }, [isInteracting]); // Add startCycling to dependency array

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
        setShopifyPlaceholder('')
        lastInteractionRef.current = Date.now();
        if (!isInteracting) {
            setIsInteracting(true);
            stopCycling();
        }
    };


    return (
        <div className={cn("flex items-center rounded-full bg-white border-[1.5px] py-[2px]", className)}>
            <Button variant="ghost" size="icon" className="ml-2 h-9 w-9 rounded-full p-0">
                <Sparkles size={20} className="text-primary" />
            </Button>
            <Input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={`"${shopifyPlaceholder || currentPlaceholder}...`}
                className="flex-1 border-none bg-transparent shadow-none outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sm max-md:placeholder:tracking-tighter placeholder:font-medium placeholder:italic"
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