'use client';

import { logEvent } from '@/lib/logger';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Headings = [
    "There’s a lot here—I can curate a look that matches your mood?",
    "Scrolling strains the thumb (ouch!) — instead say ‘want a posh look under $150”",
    "You could browse. Or you could say: ‘Black, versatile, not boring dress’",
]

const Page = () => {
    const [pageName, setPageName] = useState('unknown-page');
    const [fullPath, setFullPath] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentHeading, setCurrentHeading] = useState(Headings[0]);
    const router = useRouter();


    // Cycle heading every 1 second
    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * Headings.length);
            setCurrentHeading(Headings[randomIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, [isLoading]);

    // Embedded hook logic to listen for messages
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== "https://testing-pov.myshopify.com") return;

            if (event.data?.type === "PAGE_INFO") {
                const pageName = event.data.payload?.pageName ?? "unknown-page";
                const fullPath = event.data.payload?.fullPath ?? "unknown-path";
                console.log("Received from Shopify:", pageName, event.data.payload?.fullPath);
                setPageName(pageName);
                setFullPath(fullPath);
                setIsLoading(false);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    // Redirect logic after message is received
    useEffect(() => {
        if (isLoading) return;

        if (fullPath === '/') {
            logEvent("agent_loaded", {
                event: "page_load",
                page_path: "all-workwear",
                tags: ["page", "load", "initial"],
                source: "site_entry",
            });
            router.push('/all-workwear');
        } else if (pageName === 'new-collection') {
            logEvent("agent_loaded", {
                event: "page_load",
                page_path: "new-collection",
                tags: ["page", "load", "initial"],
                source: "site_entry",
            });
            router.push('/collections/resilience-tailored');
        }
    }, [isLoading, fullPath, pageName, router]);

    // Optional loading state
    if (isLoading) {
        return (
            // <div className='absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-full px-4'>
            <div className='flex max-w-4xl mx-auto  flex-col min-h-[calc(100vh-200px)]  items-center justify-center md:justify-end max-sm:w-full px-4 '>
                <h1 className='text-xl md:text-3xl text-center max-sm:pt-10'>{currentHeading}</h1>
                <div className='flex justify-center pt-14'>
                    <Image src="/downArrow.svg" alt="Arrow" width={80} height={80} className='animate-bounce' />
                </div>
                <p className='hidden md:block text-center text-lg pt-10'>Just type here, and I&apos;ll do the digging.</p>
            </div>
        );
    }

    // Fallback content
    return (
        // <div className='absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-full px-4'>
        <div className='flex max-w-4xl mx-auto  flex-col min-h-[calc(100vh-200px)]  items-center justify-center md:justify-end max-sm:w-full px-4 '>
            <h1 className='text-xl md:text-3xl text-center max-sm:pt-10'>{currentHeading}</h1>
            <div className='flex justify-center pt-14'>
                <Image src="/downArrow.svg" alt="Arrow" width={80} height={80} className='animate-bounce' />
            </div>
            <p className='hidden md:block text-center text-lg pt-10'>Just type here, and I&apos;ll do the digging.</p>
        </div>
    );

};

export default Page;
