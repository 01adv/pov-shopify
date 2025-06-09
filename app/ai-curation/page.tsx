"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard"; // Adjust the import path based on your file structure
import { Product } from "@/lib/extractedProductsForPopup"; // Adjust the import path to match your Product type definition

export default function AIRecommendedProductsPage() {
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch recommended products from session storage on mount
    useEffect(() => {
        const storedProducts = sessionStorage.getItem("aiRecommendedProducts");
        if (storedProducts) {
            try {
                const parsedProducts: Product[] = JSON.parse(storedProducts);
                setRecommendedProducts(parsedProducts);
            } catch (error) {
                console.error("Failed to parse recommended products from session storage", error);
                setRecommendedProducts([]);
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <div className="flex min-h-screen flex-col relative">
            <main className="flex-1">
                <div className="mx-auto max-w-6xl px-4 sm:px-12 xl:px-12">
                    <div className="space-y-5 md:mt-4 pb-6 md:pb-8 xl:pb-10 ">
                        <h1 className="text-[30px] md:text-[40px]">AI Recommendations</h1>
                    </div>

                    {isLoading ? (
                        <div className="text-center text-gray-600">
                            <p>Loading recommended products...</p>
                        </div>
                    ) : recommendedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {recommendedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No AI-recommended products found.</p>
                            <p className="mt-2">
                                Chat with the AI assistant to get personalized product recommendations!
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}