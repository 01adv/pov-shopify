'use client';
import { AudioLines } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const VideoAgent = dynamic(() => import('@/components/VideoAgent/VdoAgent2'), { ssr: false });

type Shopper2Props = {
    onSwitchToText: () => void;
};

const Shopper2 = ({ onSwitchToText }: Shopper2Props) => {
    const [showVideoAgent, setShowVideoAgent] = useState(false);
    const [showSwitchToText, setShowSwitchToText] = useState(false);

    return (
        <div className="z-40 w-full flex items-center md:justify-end">
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                {/* <div className="h-full w-full max-h-[105px] md:max-h-44 max-w-[90px] md:max-w-32 aspect-[128/176] relative border-2 border-primary rounded-md md:rounded-xl"> */}
                <div className="h-full w-full max-h-32 md:max-h-44 max-w-32 aspect-[128/176] relative border-2 border-primary rounded-md min-h-[128px] md:min-h-[176px] bg-white">
                    {showVideoAgent ? (
                        <VideoAgent onClose={() => setShowVideoAgent(false)} onLoaded={() => setShowSwitchToText(true)} />
                    ) : (
                        <>
                            <video
                                src="/june.mp4" // Path to your video in the public folder
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover object-center rounded-md"
                            // poster="/shopper.png" // Optional: Add a poster image
                            />
                            {/* <button className="absolute top-0 right-0 p-1 rounded-full">
                                <X className="h-2.5 w-2.5 md:h-6 md:w-6 text-white" />
                            </button> */}
                            <button
                                onClick={() => setShowVideoAgent(true)}
                                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 px-1.5 py-[1px] md:px-2 md:py-1 rounded md:rounded-lg bg-primary text-white flex items-center gap-0.5 text-[7px] md:text-xs md:font-bold"
                            >
                                <AudioLines className="w-2 h-2 md:w-4 md:h-4 text-white" strokeWidth={2} />
                                Talk
                            </button>
                        </>
                    )}
                </div>

                {showSwitchToText ? (
                    <button
                        onClick={onSwitchToText}
                        className="max-w-[90px] md:max-w-32 bg-primary text-[7px] md:text-sm text-white p-[2px] md:px-2 md:py-1.5 rounded-md md:rounded-full"
                    >
                        Switch to text
                    </button>
                ) : (
                    <span className="max-w-[90px] md:max-w-32 bg-primary text-[7px] md:text-xs  text-center text-white p-[2px] md:px-2 md:py-1.5 rounded-md md:rounded-full">
                        Voice Powered AI Shopper
                    </span>
                )}
            </div>
        </div>
    );
};

export default Shopper2;
