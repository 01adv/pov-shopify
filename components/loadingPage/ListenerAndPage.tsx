
'use client';

import { logEvent } from '@/lib/logger';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Headings = [
    "There’s a lot here—I can curate a look that matches your mood?",
    "Scrolling strains the thumb (ouch!) — instead say ‘want a posh look under $150’",
    "You could browse. Or you could say: ‘Black, versatile, not boring dress’",
];

const ListenerLoading = () => {
    const [pageName, setPageName] = useState('unknown-page');
    const [fullPath, setFullPath] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isIframeReady, setIsIframeReady] = useState(false);
    const [currentHeading, setCurrentHeading] = useState(Headings[0]);
    const router = useRouter();

    // Send IFRAME_READY and reset state
    useEffect(() => {
        console.log('Sending IFRAME_READY to parent');
        window.parent.postMessage(
            { type: 'IFRAME_READY' },
            process.env.NEXT_PUBLIC_SHOPIFY_URL || 'https://testing-pov.myshopify.com'
        );
        setIsIframeReady(true);
        // Reset state to clear stale data
        setPageName('unknown-page');
        setFullPath('');
        setIsLoading(true);
    }, []);

    // Cycle heading every 2 seconds
    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * Headings.length);
            setCurrentHeading(Headings[randomIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, [isLoading]);

    // Listen for both PAGE_INFO and CUSTOMER_INFO
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log('Message received from origin:', event.origin);
            if (event.origin !== process.env.NEXT_PUBLIC_SHOPIFY_URL) {
                console.log(`Invalid origin, expected ${process.env.NEXT_PUBLIC_SHOPIFY_URL}, got:`, event.origin);
                return;
            }

            if (!isIframeReady) {
                console.log('Ignoring message: Iframe not ready');
                return;
            }

            const { type, payload } = event.data || {};
            console.log('Message data:', { type, payload });

            if (type === 'PAGE_INFO' && payload) {
                const pageName = payload.pageName ?? 'unknown-page';
                const fullPath = payload.fullPath ?? 'unknown-path';
                console.log('Received PAGE_INFO:', pageName, fullPath);
                setPageName(pageName);
                setFullPath(fullPath);
            }

            if (type === 'CUSTOMER_INFO' && payload) {
                console.log('Received CUSTOMER_INFO:', payload);
                // Log customer info to Firestore
                logEvent('agent_loaded', {
                    event: 'customer_info',
                    customer_email: payload.customer.email || 'anonymous',
                    customer_id: payload.customer.id || 'anonymous',
                    source: 'shopify_iframe',
                });
            }

            setIsLoading(false);
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [isIframeReady, pageName, fullPath]);

    // Redirect logic after message is received
    useEffect(() => {
        if (isLoading) return;

        if (fullPath === '/') {
            logEvent('agent_loaded', {
                event: 'page_load',
                page_path: 'all-workwear',
                tags: ['page', 'load', 'initial'],
                source: 'site_entry',
            });
            router.push('/all-workwear');
        } else if (pageName === 'new-collection') {
            logEvent('agent_loaded', {
                event: 'page_load',
                page_path: 'new-collection',
                tags: ['page', 'load', 'initial'],
                source: 'site_entry',
            });
            router.push('/collections/resilience-tailored');
        } else {
            logEvent('agent_loaded', {
                event: 'page_load',
                page_path: fullPath,
                tags: ['page', 'load', 'initial'],
                source: 'site_entry',
            });
            router.push('/all-workwear');
        }
    }, [isLoading, fullPath, pageName, router]);

    // Optional loading state
    if (isLoading) {
        return (
            <div className="flex max-w-2xl mx-auto flex-col min-h-[calc(100vh-200px)] items-center justify-center max-sm:w-full px-4">
                <Sparkles size={60} className="text-primary inline-block mr-1 pb-3" />
                <h1 className="text-xl md:text-3xl text-center max-sm:pt-10">{currentHeading}</h1>
                <div className="flex justify-center pt-14">
                    <Image src="/arrow.svg" alt="Arrow" width={80} height={80} className="animate-bounce" />
                </div>
                <p className="hidden md:block text-center text-lg pt-10 pb-3">Just type here, and I will do the digging.</p>
            </div>
        );
    }

    // Fallback content
    return (
        <div className="flex max-w-2xl mx-auto flex-col min-h-[calc(100vh-200px)] items-center justify-center max-sm:w-full px-4">
            <Sparkles size={60} className="text-primary inline-block mr-1 pb-3" />
            <h1 className="text-xl md:text-3xl text-center max-sm:pt-10">{currentHeading}</h1>
            <div className="flex justify-center pt-14">
                <Image src="/arrow.svg" alt="Arrow" width={80} height={80} className="animate-bounce" />
            </div>
            <p className="hidden md:block text-center text-lg pt-10 pb-3">Just type here, and I will do the digging.</p>
        </div>
    );
};

export default ListenerLoading;