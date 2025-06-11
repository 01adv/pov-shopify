// // 'use client';
// // // AddToCartButton.tsx
// // type AddToCartButtonProps = {
// //     variantId: number;
// //     quantity?: number;
// // }
// // const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
// //     console.log('button clicked')
// //     const handleAddToCart = () => {
// //         window.parent.postMessage(
// //             {
// //                 type: "ADD_TO_CART",
// //                 payload: {
// //                     variantId,
// //                     quantity,
// //                 },
// //             },
// //             "*"
// //         );
// //     };
// //     console.log('button clicked in next', variantId)

// //     return <button className="p-4 bg-black text-white" onClick={handleAddToCart}>Add to Cart</button>;
// // };

// // export default AddToCartButton;


// 'use client';

// import { useProductContext } from '@/hooks/useProduct';
// import { useEffect } from 'react';

// type AddToCartButtonProps = {
//     variantId: number;
//     quantity?: number;
// };

// const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
//     // const [cartCount, setCartCount] = useState<number | null>(null);
//     const { setItemCount } = useProductContext()

//     const handleAddToCart = () => {
//         console.log('Add to Cart clicked', variantId);
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
//     };

//     useEffect(() => {
//         const handleMessage = (event: MessageEvent) => {
//             if (event.data?.type === "CART_INFO") {
//                 const { itemCount } = event.data.payload;
//                 // setCartCount(itemCount);
//                 setItemCount(itemCount)
//                 console.log("Updated cart count:", itemCount);
//             }
//         };

//         window.addEventListener("message", handleMessage);

//         // Request cart on load (optional)
//         window.parent.postMessage({ type: "GET_CART" }, "*");

//         return () => window.removeEventListener("message", handleMessage);
//     }, []);

//     return (
//         <div className="flex items-center gap-4">
//             <button
//                 className="p-4 bg-black text-white rounded"
//                 onClick={handleAddToCart}
//             >
//                 Add to Cart
//             </button>
//         </div>
//     );
// };

// export default AddToCartButton;


'use client';

import { useProductContext } from '@/hooks/useProduct';
import { useEffect, useState } from 'react';
import { CartPopup } from './AddToCartPopup';

type AddToCartButtonProps = {
    variantId: number;
    quantity?: number;
    title: string;
    color: string;
    size: string;
    imageUrl: string;



};

const AddToCartButton = ({ variantId, quantity = 1, title, color, size, imageUrl }: AddToCartButtonProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { setItemCount } = useProductContext();
    const [error, setError] = useState<string | null>(null);

    const parentOrigin = 'https://testing-pov.myshopify.com/'; // Replace with your Shopify store's domain (e.g., 'https://your-store.myshopify.com')

    const handleAddToCart = () => {
        console.log('Add to Cart clicked', { variantId, quantity });
        setError(null); // Clear any previous errors
        window.parent.postMessage(
            {
                type: 'ADD_TO_CART',
                payload: {
                    variantId,
                    quantity,
                },
            },
            parentOrigin
        );
        setIsCartOpen(true);
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Verify the message origin
            if (event.origin !== parentOrigin) return;

            const { type, payload } = event.data;

            if (type === 'CART_INFO') {
                const { itemCount } = payload;
                setItemCount(itemCount);
                console.log('Updated cart count:', itemCount);
            } else if (type === 'CART_ERROR') {
                const { error } = payload;
                setError(error);
                console.error('Cart error:', error);
            }
        };

        window.addEventListener('message', handleMessage);

        // Request initial cart count on load
        window.parent.postMessage({ type: 'GET_CART' }, parentOrigin);

        return () => window.removeEventListener('message', handleMessage);
    }, [setItemCount, parentOrigin]);


    // Auto-close the popup after a delay
    // useEffect(() => {
    //     if (isCartOpen) {
    //         const timer = setTimeout(() => setIsCartOpen(false), 10000); // auto-close in 3s
    //         return () => clearTimeout(timer);
    //     }
    // }, [isCartOpen]);


    return (
        <div className="flex items-center gap-4">
            <button
                className="max-w-md mt-5 h-11 w-full text-black text-sm rounded-none border border-black bg-white hover:border-2 transition-colors duration-200 px-4 py-2"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}
            <CartPopup title={title} color={color} size={size} imageUrl={imageUrl} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        </div>
    );
};

export default AddToCartButton;