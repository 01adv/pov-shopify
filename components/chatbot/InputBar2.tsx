// import { cn } from "@/lib/utils"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Mic, Send } from "lucide-react"

// type InputBarProps = {
//     input?: string
//     setInput: (value: string) => void
//     handleKeyDown?: (e: React.KeyboardEvent) => void
//     handleSendMessage?: () => void
//     className?: string
// }

// export const InputBar: React.FC<InputBarProps> = ({ input, setInput, handleKeyDown, handleSendMessage, className }) => (
//     <div className={cn("flex items-center rounded-full bg-white py-1.5 border-[1.5px]", className)}>
//         <Button variant="ghost" size="icon" className="ml-2 h-12 w-12 rounded-full p-0">
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
//             className="bg-gray-200 mr-2 h-12 w-12 lg:h-11 lg:w-11 rounded-full p-0"
//         >
//             <Send size={24} className="text-black rotate-45" />
//         </Button>
//     </div>
// )


'use client'
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Mic, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type InputBarProps = {
    input?: string;
    setInput: (value: string) => void;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
    handleSendMessage?: () => void;
    className?: string;
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

export const InputBar: React.FC<InputBarProps> = ({
    input,
    setInput,
    handleKeyDown,
    handleSendMessage,
    className,
}) => {
    const [currentPlaceholder, setCurrentPlaceholder] = useState("");
    const [isInteracting, setIsInteracting] = useState(false);
    const lastInteractionRef = useRef(Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Function to get a random placeholder
    const getRandomPlaceholder = () => {
        const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
        return placeholderTexts[randomIndex];
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
    }, []);

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
    }, [isInteracting]);

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

    return (
        <div className={cn("flex items-center rounded-full bg-white border-[1.5px] py-[2px]", className)}>
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
                className="flex-1 border-none bg-transparent text-sm shadow-none outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:italic"
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