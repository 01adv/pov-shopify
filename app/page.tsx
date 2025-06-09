'use client'
// import React, { useEffect } from 'react'

// const Page = () => {
//     const [pageName, setPageName] = React.useState<string | null>(null);
//     // In your Next.js app (e.g., a component loaded in the iframe)
//     useEffect(() => {
//         const handleMessage = (event: MessageEvent) => {
//             if (event.origin !== window.location.origin) return; // Verify the origin (Shopify store)

//             const { type, payload } = event.data;
//             if (type === 'PAGE_INFO' && payload?.pageName) {
//                 console.log('Received page name:', payload.pageName);
//                 setPageName(payload.pageName);
//                 // Use the pageName to update the UI or navigate
//                 // For example, if using Next.js router:
//                 // router.push(`/chatbot/${payload.pageName}`);
//                 // Or update state to render content specific to "new-collection"
//             }
//         };

//         window.addEventListener('message', handleMessage);
//         return () => window.removeEventListener('message', handleMessage);
//     }, []);
//     return (
//         <div>page name: {pageName}</div>
//     )
// }

// export default Page


import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ChatbotIframe() {
    const [pageName, setPageName] = useState('unknown-page');
    const router = useRouter();

    useEffect(() => {
        // Get the parent page URL using document.referrer
        const parentUrl = document.referrer;

        if (parentUrl) {
            try {
                // Parse the URL and extract the page name
                const url = new URL(parentUrl);
                const pathSegments = url.pathname.split('/').filter(segment => segment); // Split and remove empty segments
                const lastSegment = pathSegments[pathSegments.length - 1]; // Get the last segment (e.g., "new-collection")
                const currentPage = lastSegment || 'unknown-page'; // Fallback if no segment is found

                setPageName(currentPage);
                console.log('Extracted page name:', currentPage);

                // Optionally, navigate or update the iframe content based on the page name
                // For example, redirect to a specific route in the iframe:
                // router.push(`/chatbot/${currentPage}`);
            } catch (error) {
                console.error('Error parsing parent URL:', error);
                setPageName('unknown-page');
            }
        } else {
            console.warn('No referrer found. Unable to determine parent URL.');
        }
    }, [router]);

    return (
        <div>
            <h1>Chatbot Iframe</h1>
            <p>Current Page: {pageName}</p>
            {/* Render content based on pageName */}
        </div>
    );
}