// 'use client';
// // AddToCartButton.tsx
// type AddToCartButtonProps = {
//     variantId: number;
//     quantity?: number;
// }
// const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
//     console.log('button clicked')
//     const handleAddToCart = () => {
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
//     console.log('button clicked in next', variantId)

//     return <button className="p-4 bg-black text-white" onClick={handleAddToCart}>Add to Cart</button>;
// };

// export default AddToCartButton;


'use client';

import { useProductContext } from '@/hooks/useProduct';
import { useEffect, useState } from 'react';

type AddToCartButtonProps = {
    variantId: number;
    quantity?: number;
};

const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
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

    return (
        <div className="flex items-center gap-4">
            <button
                className="p-4 bg-black text-white rounded"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};

export default AddToCartButton;
