'use client'
import { Sparkles } from 'lucide-react';
import Shopper2 from '../VideoAgent/Shopper2';
import { useProductContext } from '@/hooks/useProduct';

const ChatBot = () => {
    const { switchToTextAgent, setSwitchToTextAgent } = useProductContext()
    return (
        <>
            {!switchToTextAgent && (
                <div className={`md:fixed right-6 bottom-6  flex md:items-center md:justify-end gap-3 `}>
                    <div className=" w-fit"><Shopper2 onSwitchToText={() => { setSwitchToTextAgent(true) }} /></div>
                    <span className='md:hidden tracking-wide text-wrap inline-block pr-4 gap-2 max-w-60'><Sparkles size={22} className='text-primary inline-block mr-1' />Too much to scroll... just  say, black, non-boring outfit</span>
                </div>)}
        </>
    )
}

export default ChatBot