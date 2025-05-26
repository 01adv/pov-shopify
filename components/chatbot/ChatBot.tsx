
'use client'
import { useProductContext } from '@/hooks/useProduct'
import { Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Shopper2 from '../VideoAgent/Shopper2'
import ChatLoader from './ChatLoader'

const prompts = [
    "Something work-ish but not boring!",
    "Dress – cute and casual – that I can wear to work and brunch",
    "Classy outfit for a Friday night",
    "I can help if your brain’s already tired of tracking 12 tabs.",
    "You could browse. Or you could say: ‘Black, versatile, not boring dress’",
    "Start with a vibe, I’ll do the digging.",
    "There’s a lot here—I can curate a look that matches your mood?",
    "Skip the scrolling—just tell me one must-have and I’ll do the hunting.",
    "Wish you could shout ‘no sleeveless!’? Go for it—I’ll listen.",
    "Everything but straight fit dresses – I got you",
    "Try me with ‘Long sleeves, desk-to-dinner, no blah colors’",
    "Say: “something work-ish but not boring!”",
    "Scrolling strains the thumb (ouch!) — instead say ‘want a posh look under $150’",
    "Relaxed work dresses in quarter sleeves",
    "Work Jackets that are not boring"
]

const ChatBot = () => {
    const { switchToTextAgent, personalizedNudge, setHideVideoAgent, hideVideoAgent, transcriptOnMobile } = useProductContext()
    const [promptIndex, setPromptIndex] = useState(0)
    // const [fade, setFade] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    console.log("Transcript on mobile:", transcriptOnMobile)



    useEffect(() => {
        // Initial check
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()

        // Optional: Watch for resize
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (!isMobile || personalizedNudge) return

        const interval = setInterval(() => {
            // setFade(false)
            setTimeout(() => {
                setPromptIndex((prev) => (prev + 1) % prompts.length)
                // setFade(true)
            }, 300)
        }, 3000)

        return () => clearInterval(interval)
    }, [isMobile, personalizedNudge])

    return (
        <>
            {!switchToTextAgent && (!isMobile || !hideVideoAgent) && (
                <div className="md:fixed right-6 md:bottom-6 flex md:items-center md:justify-end gap-3 max-md:p-4 z-50 max-md:bg-white max-md:px-8  max-md:sticky max-md:top-0">
                    <div className="w-fit">
                        <Shopper2 />
                    </div>
                    {isMobile && (
                        <div className=' w-full flex justify-between'>
                            <span
                                // className={`tracking-wide text-wrap inline-block pr-4 gap-2 max-w-60 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'
                                className={`tracking-wide text-wrap inline-block pr-4 gap-2 max-w-60 transition-opacity duration-300 `}
                            >
                                {!transcriptOnMobile || transcriptOnMobile === '' && <Sparkles size={22} className="text-primary inline-block mr-1" />}
                                {transcriptOnMobile ? (transcriptOnMobile === "123-loading" ? <ChatLoader showText={false} /> : transcriptOnMobile) : (personalizedNudge || prompts[promptIndex])}
                            </span>
                            <X
                                onClick={() => setHideVideoAgent(true)}
                                size={18}
                                className="text-primary ml-1 shrink-0" />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ChatBot
