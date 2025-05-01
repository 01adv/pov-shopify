import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Mic, Send } from "lucide-react"

type InputBarProps = {
    input?: string
    setInput: (value: string) => void
    handleKeyDown?: (e: React.KeyboardEvent) => void
    handleSendMessage?: () => void
    className?: string
}

export const InputBar: React.FC<InputBarProps> = ({ input, setInput, handleKeyDown, handleSendMessage, className }) => (
    <div className={cn("flex items-center rounded-full bg-white py-1.5 border-[1.5px]", className)}>
        <Button variant="ghost" size="icon" className="ml-2 h-12 w-12 rounded-full p-0">
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
            className="bg-gray-200 mr-2 h-12 w-12 lg:h-11 lg:w-11 rounded-full p-0"
        >
            <Send size={24} className="text-black rotate-45" />
        </Button>
    </div>
)