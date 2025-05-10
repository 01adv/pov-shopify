'use client'
import React, { useState } from 'react'
import { AssistantChat } from './Assistant';
import Shopper2 from '../VideoAgent/Shopper2';
import { Sparkles } from 'lucide-react';

const ChatBot = () => {
    const [switchToTextAgent, setSwitchToTextAgent] = useState(false);
    return (
        <div>
            {switchToTextAgent ? <div className="w-full bg-green-200">  <AssistantChat /> </div> :
                <div className='md:fixed right-6 bottom-6  flex md:items-center md:justify-end gap-3'>
                    <div className=" w-fit"><Shopper2 onSwitchToText={() => { setSwitchToTextAgent(true) }} /></div>
                    <span className='tracking-wide md:hidden text-wrap inline-block pr-4 gap-2 max-w-60'><Sparkles size={22} className='text-primary inline-block mr-1' />Too much to scroll... just  say, black, non-boring outfit</span>
                </div>
            }
        </div >
    )
}

export default ChatBot