'use client';

import { logEvent } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const [pageName, setPageName] = useState('unknown-page');
    const [fullPath, setFullPath] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

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
            <div>
                <h1>Chatbot Iframe</h1>
                <p>Loading...</p>
            </div>
        );
    }

    // Fallback content
    return (
        <div>
            <h1>Chatbot Iframe</h1>
            <p>Current Page: {pageName}</p>
        </div>
    );
};

export default Page;
