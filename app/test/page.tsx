"use client";
import ShopifyInfoListener from "@/components/shopify/ShopifyListener";

export default function ChatbotPage() {
    const handleShopifyData = (data: { cartToken?: string; trackedSourceId?: string }) => {
        console.log('Received from Shopify:', data);
        // Save to state, session, context, etc.
    };

    return (
        <main>
            <ShopifyInfoListener onData={handleShopifyData} />
            <h1>Welcome to the chatbot</h1>
            {/* Rest of chatbot UI */}
        </main>
    );
}
