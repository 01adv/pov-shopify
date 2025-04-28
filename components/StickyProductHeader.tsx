"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface StickyProductHeaderProps {
    product: {
        name: string
        color: string
        size: string
        originalPrice: number
        salePrice: number
        image: string
    }
}

export default function StickyProductHeader({ product }: StickyProductHeaderProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            // Get the product details section position
            const detailsSection = document.getElementById("product-details")

            if (detailsSection) {
                const detailsPosition = detailsSection.getBoundingClientRect().top

                // Show sticky header when scrolling past the details section
                if (detailsPosition < 0) {
                    setIsVisible(true)
                } else {
                    setIsVisible(false)
                }
            }
        }

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll)

        // Clean up
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div
            className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            {/* Desktop layout - hidden on small screens */}
            <div className="hidden sm:flex container mx-auto px-4 py-3 items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Product thumbnail */}
                    <div className="h-16 w-16 flex-shrink-0">
                        <Image height={100} width={100} src={product.image || "/placeholder.png"} alt={product.name} className="h-full w-full object-cover" />
                    </div>

                    {/* Product info */}
                    <div>
                        <h2 className="font-medium text-gray-900">{product.name}</h2>
                        <div className="flex gap-6 text-sm text-gray-600">
                            <p>Color: {product.color}</p>
                            <p>Size: {product.size}</p>
                        </div>
                    </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-sm text-gray-500 line-through">Rs. {product.originalPrice.toLocaleString()}</p>
                        <p className="font-medium text-gray-900">Rs. {product.salePrice.toLocaleString()}</p>
                    </div>

                    <button className="bg-black text-white px-6 py-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                        Add to cart
                    </button>
                </div>
            </div>

            {/* Mobile layout - visible only on small screens */}
            <div className="sm:hidden container mx-auto px-4 py-3">
                {/* Product name */}
                <h2 className="font-medium text-gray-900 mb-3">{product.name}</h2>

                <div className="flex items-start gap-3 mb-3">
                    {/* Product thumbnail */}
                    <div className="h-16 w-16 flex-shrink-0">
                        <Image height={100} width={100} src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
                    </div>

                    {/* Product details */}
                    <div className="flex-1">
                        <p className="text-sm text-gray-600">Color: {product.color}</p>
                        <p className="text-sm text-gray-600">Size: {product.size}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-500 line-through">Rs. {product.originalPrice.toLocaleString()}</p>
                            <p className="font-medium text-gray-900">Rs. {product.salePrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Add to cart button */}
                <button className="w-full bg-black text-white py-3 flex items-center justify-center hover:bg-gray-800 transition-colors">
                    Add to cart
                </button>
            </div>
        </div>
    )
}
