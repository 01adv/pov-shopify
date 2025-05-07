'use client'
import { ProductCardForPopup } from '@/components/ProductCardForPopup'
import { useEffect, useState } from 'react'
import { ProductLoader } from '../../components/loader'
import { InputBar } from '@/components/chatbot/InputBar2'
import { useProductContext } from '@/hooks/useProduct'

const Page = () => {
    // it'll be rendered when agent suggest products in mobile screen
    const { matchedProducts, title } = useProductContext()

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
                <h2 aria-label='title' className="text-lg text-center font-semibold">{title}</h2>
                {/* <p className="text-sm font-medium text-muted-foreground/75 text-center">We&apos;ve curated 5 stylish dinner-ready ensembles just for you.</p> */}
            </div>
            <div className="flex gap-2 pt-6  overflow-x-auto no-scrollbar">
                {matchedProducts.map((product) => (
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

