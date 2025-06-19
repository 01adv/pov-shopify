
'use client'
import React from 'react'

const Test = () => {
    const handleAddToCart = ({ variantId, quantity }) => {
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
        console.log('button clicked in next', variantId)
    };
    return (
        <div>Test
            <div className="h-screen w-full i text-center justify-center">
                <button className="p-4 bg-black text-white" onClick={() => handleAddToCart({ variantId: 46327431659732, quantity: 1 })}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Test