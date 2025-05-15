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
import { useEffect } from 'react';

type AddToCartButtonProps = {
    variantId: number;
    quantity?: number;
};

const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
    // const [cartCount, setCartCount] = useState<number | null>(null);
    const { setItemCount } = useProductContext()

    const handleAddToCart = () => {
        console.log('Add to Cart clicked', variantId);
        window.parent.postMessage(
            {
                type: "ADD_TO_CART",
                payload: {
                    variantId,
                    quantity,
                },
            },
            "*"
        );
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === "CART_INFO") {
                const { itemCount } = event.data.payload;
                // setCartCount(itemCount);
                setItemCount(itemCount)
                console.log("Updated cart count:", itemCount);
            }
        };

        window.addEventListener("message", handleMessage);

        // Request cart on load (optional)
        window.parent.postMessage({ type: "GET_CART" }, "*");

        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <div className="flex items-center gap-4">
            <button
                className="p-4 bg-black text-white rounded"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;
