'use client';
import { ProductLoader } from '@/components/loader';
import { ProductCard } from '@/components/ProductCard';
import { useProductContext } from '@/hooks/useProduct';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductGridSkeleton } from './Loading';

const Page = () => {
    const { matchedProducts, title } = useProductContext();
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    console.log('re com page', matchedProducts)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [matchedProducts]);



    useEffect(() => {
        // Redirect if matchedProducts is empty
        if (!matchedProducts || matchedProducts.length === 0) {
            router.push('/all-workwear');
        }
    }, [matchedProducts, router]);

    if (!matchedProducts || matchedProducts.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ProductLoader />
            </div>
        );
    }

    if (!loaded) {
        return (
            <div>
                <div className="flex min-h-screen flex-col relative">
                    <main className="flex-1">
                        <div className="mx-auto max-w-6xl px-4 sm:px-12 xl:px-6">
                            <div className=" my-6 max-md:sticky top-0 max-md:z-40 bg-white pb-1 flex items-center justify-center">

                                {/* <h1 className="text-2xl text-center">hi</h1> */}
                                <div className=" h-6 md:h-10 w-[40%] bg-slate-200 rounded animate-pulse" />

                            </div>

                            <ProductGridSkeleton count={8} />
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <>

            {/* desktop and mobile */}
            <div className="flex min-h-screen flex-col relative">
                <main className="flex-1">
                    <div className="mx-auto max-w-6xl px-4 sm:px-12 xl:px-6">
                        <div className="space-y-5 mt-8 max-md:z-40 bg-white pb-1">

                            <h1 className="text-xl md:text-2xl text-center">{title}</h1>
                        </div>

                        {/* Filter and Sort (Simplified for now) */}
                        <div className="  mb-4 md:mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center justify-end w-full gap-4">
                                <span className="ml-4 text-sm text-muted-foreground">
                                    {matchedProducts.length} products
                                </span>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {matchedProducts.length > 0 ? (
                            <div className="grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-4">
                                {matchedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-lg text-muted-foreground">No products found in this collection.</p>
                            </div>
                        )}
                    </div>
                </main>
                <div className="h-32 lg:h-60"></div> {/* Spacer for potential fixed elements */}
            </div>
        </>
    )
};

export default Page;