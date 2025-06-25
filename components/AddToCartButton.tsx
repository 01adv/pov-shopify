


'use client';

import useCartPolling from '@/app/test2/useCartPolling';
import { logEvent } from '@/lib/logger';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CartPopup } from './AddToCartPopup';

type AddToCartButtonProps = {
    variantId: number;
    quantity?: number;
    title: string;
    color: string;
    size: string;
    imageUrl: string;
    variantAvailable: boolean
};

const AddToCartButton = ({ variantId, quantity = 1, title, color, size, imageUrl, variantAvailable }: AddToCartButtonProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    // const { setItemCount, } = useProductContext();
    // const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    useCartPolling(5000); // Poll every 6 seconds
    console.log('passed variatId', variantId)
    const parentOrigin = `${process.env.NEXT_PUBLIC_SHOPIFY_URL}`; // Replace with your Shopify store's domain (e.g., 'https://your-store.myshopify.com')

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

    const logAddToCartEvent = () => {
        logEvent("clicks", {
            event: "add_to_cart_btn_click",
            product_name: title,
            product_Id: variantId,
            tags: ["click", "product", "recommended"],
            source: "chatbot.recommendation",
        });
    }

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Verify the message origin
            if (event.origin !== parentOrigin) return;

            const { type, payload } = event.data;
            console.log('Message received:', { type, payload }); // Debug log

            if (type === 'CART_INFO') {
                const { itemCount } = payload;
                // setItemCount(cartCount + itemCount);
                console.log('Updated cart count:', itemCount);
            } else if (type === 'CART_ERROR') {
                const { error } = payload;
                setError(error);
                console.error('Cart error:', error);
            }
        };

        window.addEventListener('message', handleMessage);

        // Request initial cart count on load
        // window.parent.postMessage({ type: 'GET_CART' }, parentOrigin);

        return () => window.removeEventListener('message', handleMessage);
    }, [parentOrigin]);


    // Auto-close the popup after a delay
    // useEffect(() => {
    //     if (isCartOpen) {
    //         const timer = setTimeout(() => setIsCartOpen(false), 10000); // auto-close in 3s
    //         return () => clearTimeout(timer);
    //     }
    // }, [isCartOpen]);
    // const handleBuyWithShopPay = () => {
    //     console.log('Buy with Shop Pay clicked', { variantId, quantity });
    //     handleAddToCart(); // Ensure the item is added to cart first
    //     logAddToCartEvent(); // Log the event

    // }


    return (
        <div className="flex flex-col items-center gap-2">
            {variantAvailable ? (
                <button
                    className="max-w-md mt-5 h-11 w-full text-black text-sm rounded-none border border-black bg-white hover:border-2 transition-colors duration-200 px-4 py-2"
                    onClick={() => {
                        handleAddToCart();
                        logAddToCartEvent();
                        console.log('Add to Cart button clicked', { variantId, quantity });
                    }}
                >
                    Add to Cart
                </button>
            ) : (
                <button
                    className="max-w-md mt-5 h-11 w-full text-black text-sm rounded-none px-4 py-2 border border-black bg-gray-200/30"
                    disabled
                >
                    Sold Out
                </button>
            )}
            {/* 
            {variantAvailable && (
                <a
                    href={`https://pointofviewlabel.com/cart?${variantId}`}
                    aria-label="Cart"
                    target="_top"
                    rel="noopener noreferrer"
                    className="w-full block"
                    onClick={handleBuyWithShopPay}
                >

                    <button
                        className="bg-[#5433eb] mb-5 max-w-md h-11 w-full text-white text-sm rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <span className="flex items-center gap-0.5">
                            Buy with
                            <Image
                                src="/shop-pay.svg"
                                alt="ShopPay"
                                width={60}
                                height={20}
                                className="h-5 w-auto"
                            />
                        </span>
                    </button>
                </a>
            )} */}
            {variantAvailable && (
                <button
                    onClick={async () => {
                        // Log event
                        logAddToCartEvent();

                        // Add to cart
                        handleAddToCart();

                        // Wait a bit for the parent iframe/cart to process the add-to-cart postMessage
                        await new Promise((resolve) => setTimeout(resolve, 1000));

                        // Then safely redirect
                        window.top?.location.replace(`https://pointofviewlabel.com/checkout`);
                    }}
                    className="bg-[#5433eb] mb-5 max-w-md h-11 w-full text-white text-sm rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <span className="flex items-center gap-0.5">
                        Buy with
                        <Image
                            src="/shop-pay.svg"
                            alt="ShopPay"
                            width={60}
                            height={20}
                            className="h-5 w-auto"
                        />
                    </span>
                </button>
            )}

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