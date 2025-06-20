

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SellingLabel from "./SellingLabel";
import { getProductTag } from "@/lib/proudcts-tags";

interface Image {
    id: number;
    src: string;
    variant_ids: number[];
}

interface ProductGalleryProps {
    images: Image[];
    selectedVariantId: number;
    name?: string;
}

export default function ProductGallery({ images, selectedVariantId, name }: ProductGalleryProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const tag = getProductTag(name || "");

    // Filter images to prioritize variant-specific ones
    const variantImages = images.filter((img) => img.variant_ids.includes(selectedVariantId));
    const generalImages = images.filter((img) => img.variant_ids.length === 0);
    const galleryImages = [
        ...(variantImages.length > 0 ? variantImages : generalImages.slice(0, 1)),
        ...generalImages,
    ].map((img) => ({
        id: img.id,
        src: img.src,
        label: tag === "selling-fast"
            ? "SELLING FAST"
            : tag === "almost-gone"
                ? "ALMOST GONE"
                : undefined,
    }));

    const totalSlides = galleryImages.length || 1;

    // Carousel navigation
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    return (
        <div className="w-full md:w-1/2 lg:w-[65%]">
            {/* Mobile Carousel View */}
            <div className="md:hidden relative">
                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {galleryImages.map((image, index) => (
                            <div
                                key={`mobile-${image.id}`}
                                className="w-full flex-shrink-0 relative flex justify-center items-center p-1 pt-4"
                            >
                                <div className="relative aspect-[255/380] w-[255px]">
                                    <Image
                                        fill
                                        src={image.src}
                                        alt={`Product image ${index + 1}`}
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                    {image.label && <SellingLabel label={image.label} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Carousel Controls */}
                <div className="mt-2 sm:mt-3 flex justify-center items-center gap-6">
                    <button onClick={prevSlide} className="p-4" aria-label="Previous image">
                        <ChevronLeft className="h-3 w-3 text-muted-foreground/85" />
                    </button>
                    <div className="text-[10px]">
                        {currentSlide + 1}/{totalSlides}
                    </div>
                    <button onClick={nextSlide} className="p-4" aria-label="Next image">
                        <ChevronRight className="h-3 w-3 text-muted-foreground/85" />
                    </button>
                </div>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:block">
                <div className="flex items-center justify-center">
                    <div className="h-[600px] w-[412px] relative">
                        <Image
                            fill
                            src={galleryImages[0]?.src || "/placeholder.png"}
                            alt="Main product image"
                            className="h-full w-full object-cover"
                        />
                        {galleryImages[0]?.label && <SellingLabel label={galleryImages[0].label} />}
                    </div>
                </div>
                <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 p-[15px] gap-x-4 xl:gap-x-5 gap-y-2">
                    {galleryImages.slice(1).map((image, index) => (
                        <div
                            key={`desktop-${image.id}`}
                            className="h-[500px] w-[333px] lg:w-full relative"
                        >
                            <Image
                                fill
                                src={image.src}
                                alt={`Product image ${index + 2}`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                            {image.label && <SellingLabel label={image.label} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}