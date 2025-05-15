import React from 'react'
import { BeatLoader } from 'react-spinners'

const ChatLoader = () => {
    return (
        <div className='flex items-center justify-start gap-1'>
            <p className='text-sm'>Just a sec </p> <BeatLoader size={10} color="#fb90a2" />
        </div>
    )
}

export default ChatLoader