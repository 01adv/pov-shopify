'use client';

import useIsPhone from '@/hooks/usePhone';
import { logEvent } from '@/lib/logger';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';

const ListenerLoading = () => {
    const [pageName, setPageName] = useState('unknown-page');
    const [fullPath, setFullPath] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasRedirected, setHasRedirected] = useState(false);

    // const [isIframeReady, setIsIframeReady] = useState(false);
    const router = useRouter();
    const isPhone = useIsPhone();
    console.log('isPhone:', isPhone);

    // Centralized function for logging page load events
    const logPageLoad = (pagePath: string, isFallback: boolean = false) => {
        if (typeof window === "undefined") return; // SSR-safe fallback
        logEvent("agent_loaded", {
            event: "page_load",
            page_path: pagePath,
            tags: ["page", "load", "initial"].concat(isFallback ? ["fallback_redirection"] : []),
            source: "site_entry",
            device: isPhone ? "mobile" : "desktop",
        });
    };

    // Listen for both PAGE_INFO and CUSTOMER_INFO
    useEffect(() => {
        // if (!isIframeReady) return;
        if (typeof window === "undefined") return; // SSR-safe fallback
        console.log('Setting up message listener for Shopify iframe...');

        const handleMessage = (event: MessageEvent) => {
            console.log('Message received from origin:', event.origin);
            if (event.origin !== `${process.env.NEXT_PUBLIC_SHOPIFY_URL}`) {
                console.log(`Invalid origin, expected ${process.env.NEXT_PUBLIC_SHOPIFY_URL}`, event.origin);
                return;
            }

            const { type, payload } = event.data || {};
            console.log('Message data:', { type, payload });

            if (type === 'CUSTOMER_INFO' && payload) {
                console.log('Received CUSTOMER_INFO:', payload);
                // setCustomerInfo(payload);
                // Log customer info to Firestore
                logEvent('agent_loaded', {
                    event: 'customer_info',
                    customer_email: payload.customer.email || 'anonymous',
                    customer_id: payload.customer.id || 'anonymous',
                    source: 'shopify_iframe',
                });
            }
            if (type === 'PAGE_INFO' && payload) {
                const pageName = payload.pageName ?? 'unknown-page';
                const fullPath = payload.fullPath ?? 'unknown-path';
                console.log('Received PAGE_INFO:', pageName, fullPath);
                setPageName(pageName);
                setFullPath(fullPath);
                setTimeout(() => setIsLoading(false), 800);
            }

        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Redirect logic after message is received
    useEffect(() => {
        if (isLoading || hasRedirected) return;

        setHasRedirected(true);

        if (fullPath === '/') {
            logPageLoad("all-workwear");
            router.push('/all-workwear');
        } else if (pageName === "resilience-tailored") {
            logPageLoad("resilience-tailored");
            router.push('/collections/resilience-tailored');
        }
        else if (pageName === "work-dresses-for-women") {
            logPageLoad("work-dresses-for-women");
            router.push('/collections/dresses');
        }
        else if (pageName === "womens-workwear-blouses") {
            logPageLoad("womens-workwear-blouses");
            router.push('/collections/jackets');
        }
        else if (pageName === "womens-power-suit") {
            logPageLoad("womens-power-suit");
            router.push('/collections/suits');
        }
        else if (pageName === "dress-pants-for-women") {
            logPageLoad("dress-pants-for-women");
            router.push('/collections/pants');
        }
        else if (pageName === 'cart') {
            logPageLoad("cart");
            router.push('/ai-curation');
        }
        else {
            logPageLoad(fullPath);
            router.push('/all-workwear'); // Default redirect if no specific match
        }
    }, [isLoading, fullPath, pageName, router, hasRedirected]); // Removed logPageLoad from deps as it's defined in the component scope and doesn't change


    // loading fallback
    useEffect(() => {
        if (typeof window === "undefined") return; // SSR-safe fallback

        const fallbackTimer = setTimeout(() => {
            if (!hasRedirected) {
                console.warn("Fallback timeout triggered, redirecting to default");
                logPageLoad(fullPath, true); // Use the centralized logger with fallback indication
                router.push('/all-workwear');
            }
        }, 2000); // 2s max wait, was 4s

        return () => clearTimeout(fallbackTimer);
    }, [hasRedirected, router, fullPath]); // Removed logPageLoad from deps


    // Optional loading state
    if (isLoading) {
        return (
            // <div className='absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-full px-4'>
            <div className='flex max-w-2xl mx-auto  flex-col min-h-[calc(100vh-200px)]  items-center justify-center  max-sm:w-full px-4 '>
                <Sparkles size={60} className='text-primary inline-block mr-1 pb-3' />
                <h1 className='text-xl md:text-3xl text-center max-sm:pt-10'>Your AI Personal Shopper is Loading...</h1>
                <div className='flex justify-center pt-14'>
                    <RingLoader color="#fb90a2" size={isPhone ? 100 : 150} />
                </div>
                {/* <p className='hidden md:block text-center text-lg pt-10 pb-3'>Just type here, and I&apos;ll do the digging.</p> */}

            </div>
        );
    }

    // Fallback content
    return (
        // <div className='absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-full px-4'>
        <div className='flex max-w-2xl mx-auto  flex-col min-h-[calc(100vh-200px)]  items-center justify-center max-sm:w-full px-4 '>

            <Sparkles size={60} className='text-primary inline-block mr-1 pb-3' />
            <h1 className='text-xl md:text-3xl text-center max-sm:pt-10'>Your AI Personal Shopper is Loading...</h1>
            <div className='flex justify-center pt-14'>
                <RingLoader color="#fb90a2" size={isPhone ? 100 : 150} />


            </div>
            {/* <p className='hidden md:block text-center text-lg pt-10 pb-3'>Just type here, and I&apos;ll do the digging.</p> */}

        </div>
    );

};

export default ListenerLoading;