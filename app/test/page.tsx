'use client'
import Shopper from '@/components/VideoAgent/Shopper'
import Shopper2 from '@/components/VideoAgent/Shopper2'
import { Sparkles } from 'lucide-react'

const page = () => {
    return (
        <div className="min-h-screen bg-orange-200 w-full">
            <div className='md:fixed bottom-6 px-4 py-4 md:px-6 flex md:items-center md:justify-end bg-white w-full gap-3'>
                <div className="bg-orange-200 w-fit"><Shopper2 onSwitchToText={() => { }} /></div>
                <span className='tracking-wide md:hidden text-wrap inline-block pr-4 gap-2 max-w-60'><Sparkles size={22} className='text-primary inline-block mr-1' />Too much to scroll... just  say, black, non-boring outfit</span></div>
        </div>
    )
}

export default page