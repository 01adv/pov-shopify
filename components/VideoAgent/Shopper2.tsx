'use client';
import { AudioLines } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { ProductLoader } from '../loader';

const VideoAgent = dynamic(() => import('@/components/VideoAgent/VdoAgent2'), { ssr: false });

type Shopper2Props = {
    onSwitchToText: () => void;
};

const Shopper2 = ({ onSwitchToText }: Shopper2Props) => {
    const [loading, setLoading] = useState(false);
    const [showVideoAgent, setShowVideoAgent] = useState(false);
    const [showSwitchToText, setShowSwitchToText] = useState(false);

    return (
        <div className="z-40 w-full flex items-center md:justify-end">
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                <div className="h-full w-full max-h-[105px] md:max-h-[220px] max-w-[90px] md:max-w-[189px] aspect-[189/220] relative bg-primary rounded-md md:rounded-xl p-[1px] md:p-[2px]">
                    {loading ? (
                        <div className="bg-white h-full w-full rounded-xl">
                            <ProductLoader className="text-sm" title="Preparing your assistant" description="" />
                        </div>
                    ) : showVideoAgent ? (
                        <VideoAgent onClose={() => setShowVideoAgent(false)} onLoaded={() => setShowSwitchToText(true)} />
                    ) : (
                        <>
                            <Image
                                src="/shopper.png"
                                alt="Shopper"
                                fill
                                className="object-cover object-center rounded-md md:rounded-xl p-[2px]"
                            />
                            {/* <button className="absolute top-0 right-0 p-1 rounded-full">
                                <X className="h-2.5 w-2.5 md:h-6 md:w-6 text-white" />
                            </button> */}
                            <button
                                onClick={() => setShowVideoAgent(true)}
                                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 px-1.5 py-[1px] md:px-2 md:py-1 rounded md:rounded-lg bg-primary text-white flex items-center gap-0.5 text-[7px] md:text-sm md:font-bold"
                            >
                                <AudioLines className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={2} />
                                Talk
                            </button>
                        </>
                    )}
                </div>

                {showSwitchToText ? (
                    <span
                        onClick={onSwitchToText}
                        className="cursor-pointer max-w-[90px] md:max-w-[190px] text-[7px] md:text-sm text-primary p-[2px] md:px-2 md:py-1.5 rounded-md md:rounded-full"
                    >
                        Switch to text
                    </span>
                ) : (
                    <span className="max-w-[90px] md:max-w-[190px] bg-primary text-[7px] md:text-sm text-white p-[2px] md:px-2 md:py-1.5 rounded-md md:rounded-full">
                        Voice Powered AI Shopper
                    </span>
                )}
            </div>
        </div>
    );
};

export default Shopper2;
