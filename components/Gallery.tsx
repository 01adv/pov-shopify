// "use client"

// import { useState } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import Image from "next/image"
// import SellingLabel from "./SellingLabel"

// export default function ProductGallery() {
//     // State for carousel
//     const [currentSlide, setCurrentSlide] = useState(0)
//     const totalSlides = 10 // Main image + 9 grid images

//     // Sample product images
//     const images = [
//         { id: 1, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 2, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 3, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 4, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 5, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 6, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 7, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 8, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 9, src: '/placeholder.png', label: "SELLING FAST" },
//         { id: 10, src: '/placeholder.png', label: "SELLING FAST" },
//     ]

//     // Carousel navigation
//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
//     }

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
//     }

//     return (
//         <div className="w-full md:w-1/2 lg:w-[65%]">
//             {/* Mobile Carousel View - Only visible on small screens */}
//             <div className="md:hidden relative">
//                 <div className="relative overflow-hidden">
//                     <div
//                         className="flex transition-transform duration-300 ease-in-out"
//                         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//                     >
//                         {images.map((image, index) => (
//                             <div
//                                 key={`mobile-${image.id}`}
//                                 className="w-full flex-shrink-0 relative flex justify-center items-center"
//                             >
//                                 {/* Set aspect ratio container */}
//                                 <div className="relative aspect-[208/308] sm:aspect-[250/375] w-[208px] sm:w-[250px]">
//                                     <Image
//                                         fill
//                                         src={image.src || "/placeholder.png"}
//                                         alt={`Product image ${index + 1}`}
//                                         className="object-contain"
//                                         loading="lazy"
//                                     />
//                                     {image.label && (
//                                         <SellingLabel label={image.label} />

//                                     )}
//                                 </div>
//                             </div>

//                         ))}
//                     </div>
//                 </div>

//                 {/* Carousel Controls */}
//                 <div className="mt-2 sm:mt-3 flex justify-center items-center gap-6">
//                     <button
//                         onClick={prevSlide}
//                         className="p-4"
//                         aria-label="Previous image"
//                     >
//                         <ChevronLeft className="h-3 w-3 text-muted-foreground/85" />
//                     </button>

//                     <div className="text-[10px]">
//                         {currentSlide + 1}/{totalSlides}
//                     </div>

//                     <button onClick={nextSlide} className="p-4" aria-label="Next image">
//                         <ChevronRight className="h-3 w-3 text-muted-foreground/85" />
//                     </button>
//                 </div>
//             </div>

//             {/* Desktop Grid View - Only visible on medium screens and up */}
//             <div className="hidden md:block">
//                 <div className="flex items-center justify-center">
//                     <div className="h-[600px] w-[412px] relative">
//                         <Image
//                             fill
//                             src={images[0].src || "/placeholder.png"}
//                             alt="Main product image"
//                             className="h-full w-full object-cover"
//                         />
//                         {images[0].label && (
//                             <SellingLabel label={images[0].label} />

//                         )}
//                     </div>
//                 </div>
//                 <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 p-[15px] gap-x-4 xl:gap-x-5 gap-y-2">
//                     {images.slice(1).map((image, index) => (
//                         <div key={`desktop-${image.id}`} className="h-[500px] w-[333px] lg:w-full relative">
//                             <Image
//                                 fill
//                                 src={image.src || "/placeholder.png"}
//                                 alt={`Product image ${index + 2}`}
//                                 className="h-full w-full object-cover"
//                                 loading="lazy"
//                             />
//                             {image.label && (
//                                 <SellingLabel label={image.label} />

//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SellingLabel from "./SellingLabel";

interface Image {
    id: number;
    src: string;
    variant_ids: number[];
}

interface ProductGalleryProps {
    images: Image[];
    tags: string[];
    selectedVariantId: number;
}

export default function ProductGallery({ images, tags, selectedVariantId }: ProductGalleryProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Filter images to prioritize variant-specific ones
    const variantImages = images.filter((img) => img.variant_ids.includes(selectedVariantId));
    const generalImages = images.filter((img) => img.variant_ids.length === 0);
    const galleryImages = [
        ...(variantImages.length > 0 ? variantImages : generalImages.slice(0, 1)),
        ...generalImages,
    ].map((img) => ({
        id: img.id,
        src: img.src,
        label: tags.includes("Bestseller")
            ? "SELLING FAST"
            : img.variant_ids.length > 0 && images.some((i) => i.variant_ids.includes(selectedVariantId))
                ? "SALE"
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
                                className="w-full flex-shrink-0 relative flex justify-center items-center"
                            >
                                <div className="relative aspect-[208/308] sm:aspect-[250/375] w-[208px] sm:w-[250px]">
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