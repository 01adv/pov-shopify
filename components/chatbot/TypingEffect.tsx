// components/TypingEffect.tsx
import { useEffect, useState } from "react";

type Props = {
    text: string;
    speed?: number; // milliseconds per character
    onDone?: () => void;
};

export default function TypingEffect({ text, speed = 30, onDone }: Props) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                onDone?.();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, onDone]);

    return (
        <p className="whitespace-pre-wrap text-sm lg:text-base">
            {displayedText}
            <span className="animate-pulse">▌</span> {/* blinking cursor */}
        </p>
    );
}
