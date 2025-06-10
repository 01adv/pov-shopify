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
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Page = () => {
    const [pageName, setPageName] = useState('unknown-page');
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();

    usePageInfoListener((data) => setPageName(data.pageName));

    useEffect(() => {
        // Add redirect logic only while loading
        if (loading) {
            if (pathname === '/') {
                router.replace('/all-workwear');
            } else if (pathname.includes('new-collection')) {
                router.replace('/new-collection');
            } else {
                setLoading(false); // no redirect needed
            }
        }
    }, [pathname, loading, router]);

    if (loading) {
        return <p>Loading...</p>; // or a spinner if you prefer
    }

    return (
        <div>
            <h1>Chatbot Iframe</h1>
            <p>Current Page: {pageName}</p>
            {/* Render content based on pageName */}
        </div>
    );
};

export default Page;
