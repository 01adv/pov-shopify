// "use client";
// import ShopifyInfoListener from "@/components/shopify/ShopifyListener";

// export default function ChatbotPage() {
//     const handleShopifyData = (data: { cartToken?: string; trackedSourceId?: string }) => {
//         console.log('Received from Shopify:', data);
//         // Save to state, session, context, etc.
//     };

//     return (
//         <main>
//             <ShopifyInfoListener onData={handleShopifyData} />
//             <h1>Welcome to the chatbot</h1>
//             {/* Rest of chatbot UI */}
//         </main>
//     );
// }


"use client";
import ShopifyInfoListener, { CustomerInfo } from "@/components/shopify/ShopifyListener";// Assuming ShopifyInfo is exported or defined in a way that can be imported

export default function TestPage() { // This is the actual Page Component
    // Handle customer info and update loading state
    const handleCustomerInfo = (data: CustomerInfo) => {
        console.log('Customer Info received in Page:', data);
    };

    return (
        <main style={{ padding: '20px' }}>
            <h1>Test Page for Shopify Info Listener</h1>
            <p>This page uses the ShopifyInfoListener component to listen for messages from Shopify.</p>
            <ShopifyInfoListener onData={handleCustomerInfo} /> {/* Use the component here */}
            {/* You can add more UI elements to this test page */}
        </main>
    );
}

// The ShopifyInfoListener component definition that was previously here should be removed,
// as it's now imported from "@/components/shopify/ShopifyListener.tsx".
// Ensure that the ShopifyInfo type is also accessible, either by exporting it from
// the ShopifyListener.tsx file or defining it in a shared types file.
