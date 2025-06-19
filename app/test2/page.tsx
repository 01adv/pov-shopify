
// 'use client'
// import React from 'react'

// const Test = () => {
//     const handleAddToCart = ({ variantId, quantity }) => {
//         window.parent.postMessage(
//             {
//                 type: "ADD_TO_CART",
//                 payload: {
//                     variantId,
//                     quantity,
//                 },
//             },
//             "*"
//         );
//         console.log('button clicked in next', variantId)
//     };
//     return (
//         <div>Test
//             <div className="h-screen w-full i text-center justify-center">
//                 <button className="p-4 bg-black text-white" onClick={() => handleAddToCart({ variantId: 46327431659732, quantity: 1 })}>
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Test


'use client'
import React, { useEffect } from 'react'
import useCartPolling from './useCartPolling';

const Test = () => {
    useCartPolling(2000); // Poll every 2 seconds
    const handleAddToCart = ({ variantId, quantity }) => {
        window.parent.postMessage(
            {
                type: "ADD_TO_CART",
                payload: {
                    variantId,
                    quantity,
                },
            },
            "https://testing-pov.myshopify.com" // ✅ better than '*'
        );
        console.log('button clicked in next', variantId);
    };

    useEffect(() => {
        const handleMessage = (event) => {
            // ✅ Verify origin
            if (event.origin !== 'https://testing-pov.myshopify.com') return;

            const { type, payload } = event.data || {};
            console.log('Message received:', { type, payload }); // Debug log
            // ✅ Process only relevant messages
            if (type === 'CART_INFO' && payload?.quantity !== undefined) {
                console.log('[Next.js] Cart item count:', payload.itemCount);
            }

            if (type === 'CART_ERROR') {
                console.error('[Next.js] Cart error:', payload?.error);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div>Test
            <div className="h-screen w-full i text-center justify-center">
                <button
                    className="p-4 bg-black text-white"
                    onClick={() => handleAddToCart({ variantId: 46327431659732, quantity: 1 })}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Test;
