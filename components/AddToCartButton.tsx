'use client';
// AddToCartButton.tsx
type AddToCartButtonProps = {
    variantId: number;
    quantity?: number;
}
const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
    console.log('button clicked')
    const handleAddToCart = () => {
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
    console.log('button clicked in next', variantId)

    return <button className="p-4 bg-black text-white" onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
