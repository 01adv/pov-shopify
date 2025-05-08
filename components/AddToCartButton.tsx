// AddToCartButton.tsx
type AddToCartButtonProps = {
    variantId: number;
    quantity?: number;
}
const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
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

    return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
