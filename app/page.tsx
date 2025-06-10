// 'use client'
// import { usePageInfoListener } from '@/components/chatbot/usePageInfoListener';
// import { useState } from 'react';

// const Page = () => {
//     const [pageName, setPageName] = useState('unknown-page');

//     usePageInfoListener((data) => setPageName(data.pageName));


//     return (
//         <div>
//             <h1>Chatbot Iframe</h1>
//             <p>Current Page: {pageName}</p>
//             {/* Render content based on pageName */}
//         </div>
//     );
// }

// export default Page


'use client';
import { usePageInfoListener } from '@/components/chatbot/usePageInfoListener';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogPageLoad } from '@/hooks/useLogLoadHook';

const Page = () => {
    const [pageName, setPageName] = useState('unknown-page');
    // const [fullPath, setFullPath] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const router = useRouter();

    // Use the page info listener to get the page name and full path
    usePageInfoListener((data) => {
        setPageName(data.pageName);
        // setFullPath(data.fullPath || ''); // Ensure fullPath is set
        setIsLoading(false); // Stop loading once data is received
    });


    useLogPageLoad(pageName)
    // Redirect based on the fullPath after loading
    useEffect(() => {
        if (isLoading) return; // Wait until loading is complete

        if (pageName === '/') {
            ;
            router.push('/all-workwear');
        } else if (pageName === 'new-collection') {
            router.push('/collections/resilience-tailored');
        }
    }, [isLoading, pageName, router]);

    // Show a loading state while processing
    if (isLoading) {
        return (
            <div>
                <h1>Chatbot Iframe</h1>
                <p>Loading...</p>
            </div>
        );
    }

    // Render the page if no redirect is needed (fallback)
    return (
        <div>
            <h1>Chatbot Iframe</h1>
            <p>Current Page: {pageName}</p>
            {/* Render content based on pageName */}
        </div>
    );
};

export default Page;