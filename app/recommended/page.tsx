'use client'
import { ProductCardForPopup } from '@/components/ProductCardForPopup'
// import { InputBar } from '@/components/chatbot/Assistant'
import { products } from '@/lib/products'
import { useEffect, useState } from 'react'
import { ProductLoader } from '../../components/loader'
import { InputBar } from '@/components/chatbot/InputBar2'

const Page = () => {
    // it'll be rendered when agent suggest products in mobile screen

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!loaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ProductLoader />
            </div>
        );
    }
    return (

        <div className="max-w-2xl mx-auto px-4 py-8 relative min-h-(calc(100vh - 116px)) flex flex-col mb-16">
            <div>
                <h2 aria-label='title' className="text-lg text-center font-semibold">Your Chic Dinner Outfit Picks Are Ready</h2>
                <p className="text-sm font-medium text-muted-foreground/75 text-center">We&apos;ve curated 5 stylish dinner-ready ensembles just for you.</p>
            </div>
            <div className="flex gap-2 pt-6  overflow-x-auto no-scrollbar">
                {products.map((product) => (
                    <div key={product.id} className="basis-[calc(100%/2.21)] flex-shrink-0">
                        <ProductCardForPopup product={product} />
                    </div>
                ))}
            </div>
            {/* Fixed input bar */}
            <div className="fixed bottom-4 left-0 right-0 px-4 max-w-2xl mx-auto z-50">
                <InputBar setInput={() => { }} />
            </div>
        </div>
    )
}

export default Page


// const products: Product[] = [
//     {
//         id: 1,
//         name: "Iconic Asymmetric Colorblock Sheath Dress",
//         description: "Green-Grey",
//         originalPrice: 120.0,
//         salePrice: 60.0,
//         discount: 50,
//         image: "/elegant-green-dress-model.png",
//         badge: "SELLING FAST",
//     },
//     {
//         id: 2,
//         name: "Aspire Flounce Dress with Piping Detail",
//         description: "Misty Blue",
//         originalPrice: 118.0,
//         salePrice: 59.0,
//         discount: 50,
//         image: "/blue-flounce-dress-model.png",
//         isOnSale: true,
//     },
//     {
//         id: 3,
//         name: "Aspire Flounce Dress with Piping Detail",
//         description: "Dusty Pink",
//         originalPrice: 118.0,
//         salePrice: 59.0,
//         discount: 50,
//         image: "/pink-flounce-dress-model.png",
//         isOnSale: true,
//     },
//     {
//         id: 4,
//         name: "Structured Blazer Dress",
//         description: "Black",
//         originalPrice: 145.0,
//         salePrice: 87.0,
//         discount: 40,
//         image: "/placeholder.svg?key=2em93",
//         isOnSale: true,
//     },
//     {
//         id: 5,
//         name: "Elegant Evening Gown",
//         description: "Emerald",
//         originalPrice: 199.0,
//         salePrice: 159.2,
//         discount: 20,
//         image: "/emerald-gown-model.png",
//         isOnSale: true,
//     },
// ]

// interface Product {
//     id: number
//     name: string
//     description: string
//     originalPrice: number
//     salePrice: number
//     discount: number
//     image: string
//     badge?: string
//     isOnSale?: boolean
// }


