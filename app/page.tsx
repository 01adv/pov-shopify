'use client'
import React, { useEffect } from 'react'

const Page = () => {
    const [pageName, setPageName] = React.useState<string | null>(null);
    // In your Next.js app (e.g., a component loaded in the iframe)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return; // Verify the origin (Shopify store)

            const { type, payload } = event.data;
            if (type === 'PAGE_INFO' && payload?.pageName) {
                console.log('Received page name:', payload.pageName);
                setPageName(payload.pageName);
                // Use the pageName to update the UI or navigate
                // For example, if using Next.js router:
                // router.push(`/chatbot/${payload.pageName}`);
                // Or update state to render content specific to "new-collection"
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);
    return (
        <div>page name: {pageName}</div>
    )
}

export default Page