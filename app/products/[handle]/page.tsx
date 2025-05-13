import AddToCartButton from "@/components/AddToCartButton";
import { AssistantChat } from "@/components/chatbot/Assistant";
import ChatBot from "@/components/chatbot/ChatBot";
import CustomerReviews from "@/components/CustomerReviews";
import ProductGallery from "@/components/Gallery";
import { Badge } from "@/components/ui/badge";
import rawProductData from "@/lib/all-workwear.json";
import { getHexCode } from "@/lib/colorHexMap";
import { ChevronDown, Circle, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AiCuratedStuff from "./AiCuratedStuff";
import ClientBackHandler from "./ClientBackHandler";

interface Product {
    name: string;
    color: string;
    size: string;
    originalPrice?: number;
    salePrice: number;
    image: string;
    description: string;
    features: string[];
    fabric: string;
    rating: number;
    reviewCount: number;
    availableColors: { name: string; hex?: string | undefined; variantId: string }[];
    availableSizes: { size: string; available: boolean; variantId: string }[];
    variantId: string;
    handle: string;
}

interface ProductPageProps {
    params: Promise<{ handle: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // Updated to Promise
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
    const { handle } = await params;
    const resolvedSearchParams = await searchParams; // Resolve searchParams Promise
    const variantId = resolvedSearchParams.variant && typeof resolvedSearchParams.variant === "string" ? resolvedSearchParams.variant : undefined;



    // Find the product by handle
    const productData = rawProductData.find((p) => p.handle === handle);
    if (!productData) {
        notFound();
    }

    // Get the selected variant or default to the first available variant
    const selectedVariant = productData.variants.find(
        (v) => v.id.toString() === variantId && v.available
    ) || productData.variants.find((v) => v.available) || productData.variants[0];


    // Extract colors and sizes from options
    const colors = productData.options.find((o) => o.name === "Color")?.values || [];
    const sizes = productData.options.find((o) => o.name === "Size")?.values || [];

    // Map available colors with variant IDs (first available variant per color)
    const availableColors = colors.map((color) => {
        const variant = productData.variants.find((v) => v.option1 === color && v.available);
        return {
            name: color,
            hex: getHexCode(color) || undefined,
            variantId: variant?.id.toString() || "",
        };
    }).filter((c) => c.variantId); // Only include colors with available variants

    // Map available sizes with availability
    const availableSizes = sizes.map((size) => {
        const sizeVariant = productData.variants.find(
            (v) => v.option1 === selectedVariant.option1 && v.option2 === size
        );
        return {
            size,
            available: sizeVariant ? sizeVariant.available : false,
            variantId: sizeVariant?.id.toString() || "",
        };
    });

    // Extract features from body_html or define based on product type
    const features = extractFeatures(productData.body_html, productData.product_type);

    // Determine fabric
    const fabric = extractFabric(productData.body_html, productData.product_type);

    // Construct product object
    const product: Product = {
        name: productData.title,
        color: selectedVariant.option1,
        size: selectedVariant.option2 || sizes[0],
        originalPrice: selectedVariant.compare_at_price
            ? parseFloat(selectedVariant.compare_at_price)
            : undefined,
        salePrice: parseFloat(selectedVariant.price),
        image: selectedVariant.featured_image?.src || productData.images[0]?.src || "/placeholder.png",
        description: productData.body_html.replace(/<[^>]+>/g, ""),
        features,
        fabric,
        rating: 5, // Placeholder
        reviewCount: 3, // Placeholder
        availableColors,
        availableSizes,
        variantId: selectedVariant.id.toString(),
        handle: productData.handle,
    };

    // Transform product for StickyProductHeader
    // const stickyProduct = {
    //     name: product.name,
    //     color: product.color,
    //     size: product.size,
    //     originalPrice: product.originalPrice,
    //     salePrice: product.salePrice,
    //     image: product.image,
    // };


    // Calculate discount percentage
    // const discountPercentage = product.originalPrice
    //     ? product.originalPrice - product.salePrice > 0
    //         ? Math.round(
    //             ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
    //         )
    //         : 0
    //     : undefined;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientBackHandler />
            <div className="mt-3 md:mt-8 max-w-[1200px] mx-auto px-4 md:px-[50px] relative">
                {/* <StickyProductHeader product={stickyProduct} /> */}
                <div className="max-md:sticky top-0 max-md:z-40 bg-white py-2">
                    <ChatBot />
                </div>

                <AiCuratedStuff handle={handle} />

                <div className="flex flex-col md:flex-row relative">
                    {/* Left side */}
                    <ProductGallery
                        images={productData.images || []}
                        tags={productData.tags}
                        selectedVariantId={selectedVariant.id}
                    />

                    {/* Right side */}
                    <div className="w-full md:w-1/2 lg:w-[35%]">
                        <div className="md:sticky md:top-10 md:pl-10">
                            <h1 className="text-[30px] md:text-[40px] mb-4 leading-tight text-muted-foreground">{product.name}</h1>
                            <div className="space-y-2.5">
                                {/* Rating */}
                                <div className="flex gap-1 items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                    <span className="text-muted-foreground/75">
                                        {product.reviewCount} review(s)
                                    </span>
                                </div>
                                {/* Discount */}
                                {/* {discountPercentage && discountPercentage > 0 && (
                                    <Badge className="w-fit bg-primary rounded-xl text-white py-2 px-7">
                                        {discountPercentage}% OFF
                                    </Badge>
                                )} */}
                                {/* Price */}
                                <div className="gap-5 flex items-center">
                                    {product.originalPrice && (product?.originalPrice > product.salePrice) && product.originalPrice > 0 && (
                                        <span className="text-lg text-muted-foreground/75 line-through">
                                            $ {product.originalPrice?.toFixed(2)} hh
                                        </span>
                                    )}
                                    <span className="text-lg text-muted-foreground">
                                        $ {product.salePrice.toFixed(2)}
                                    </span>
                                    {productData.tags.includes("Bestseller") ? (
                                        <Badge className="text-black text-xs px-3 py-0.5 bg-white outline rounded-full">
                                            Bestseller
                                        </Badge>
                                    ) : product.originalPrice ? (
                                        <Badge className="text-black text-xs px-3 py-0.5 bg-white outline rounded-full">
                                            Sale
                                        </Badge>
                                    ) : null}
                                </div>
                                {/* Color */}
                                <div className="space-y-1 flex flex-col">
                                    <label
                                        htmlFor="color"
                                        className="text-muted-foreground/75 text-[13px] mb-0.5"
                                    >
                                        Color: {product.color}
                                    </label>
                                    <div className="flex gap-2">
                                        {product.availableColors
                                            .filter((color) => !!color.hex) // Only show if hex exists
                                            .map((color) => (
                                                <Link
                                                    key={color.name}
                                                    href={`/products/${product.handle}?variant=${color.variantId}`}
                                                >
                                                    <span
                                                        className={`w-7 h-7 flex items-center justify-center rounded-full border 
          ${color.name === product.color ? "border-black" : "border-gray-300"}`}
                                                    >
                                                        <Circle
                                                            fill={color.hex!}
                                                            stroke="none"
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                    </span>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                                {/* Size */}
                                <div className="space-y-1 flex flex-col">
                                    <label
                                        htmlFor="size"
                                        className="text-muted-foreground/75 text-[13px] mb-1"
                                    >
                                        Size: {product.size}
                                    </label>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.availableSizes.map(({ size, available, variantId }) => (
                                            <Link
                                                key={size}
                                                href={`/products/${product.handle}?variant=${variantId}`}
                                                className={available ? "" : "pointer-events-none opacity-50"}
                                            >
                                                <span
                                                    className={`px-5 py-1.5 flex items-center justify-center rounded-full text-sm ${size === product.size && available
                                                        ? "text-white bg-black"
                                                        : available
                                                            ? "text-muted-foreground border border-black/50"
                                                            : "text-muted-foreground border border-gray-300"
                                                        }`}
                                                >
                                                    {size}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {/* Add to Cart Button */}
                                {/* <Button
                                    variant={'secondary'}
                                    className="max-w-md my-5 h-11 w-full text-white text-sm rounded-none"
                                    disabled={!selectedVariant.available}
                                >
                                    {selectedVariant.available ? "Add to Cart" : "Out of Stock"}
                                </Button> */}
                                <AddToCartButton variantId={44482757066805} />
                            </div>
                            <span
                                id="product-details"
                                className="mb-5 text-muted-foreground/75 flex gap-2 items-center"
                            >
                                <Truck className="h-4 w-4 text-muted-foreground" /> Free Shipping
                            </span>
                            <span className="mb-4 text-muted-foreground/75 tracking-wide">
                                {product.description}
                            </span>

                            {/* 🔥🔥 Accordion will improve this stuff later */}
                            <div className="space-y-4 border-t border-muted-foreground/10 pt-4 mt-6">
                                <div className="border-b border-muted-foreground/10 pb-4 text-muted-foreground">
                                    <button className="flex w-full items-center justify-between text-left">
                                        <span>Fit and Size Chart</span>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                </div>
                                <div className="border-b border-muted-foreground/10 pb-4">
                                    <button className="flex w-full items-center justify-between text-left">
                                        <span>Features</span>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                    {/* <ul className="mt-2 text-muted-foreground/75">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="list-disc ml-4">
                                                {feature}
                                            </li>
                                        ))}
                                    </ul> */}
                                </div>
                                <div className="border-b border-muted-foreground/10 pb-4">
                                    <button className="flex w-full items-center justify-between text-left">
                                        <span>Fabric</span>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                    {/* <p className="mt-2 text-muted-foreground/75">{product.fabric}</p> */}
                                </div>
                                <div className="my-4 max-w-[340px] aspect-[340/403] relative">
                                    <Image
                                        src="/pledge.png"
                                        alt="Pledge"
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-6">
                    <CustomerReviews />
                </div>

            </div>
            <AssistantChat title={product.name.toString()} />
        </Suspense>
    );
}




// for later use in accordion
function extractFeatures(body_html: string, product_type: string): string[] {
    const features: string[] = [];
    const lowerHtml = body_html.toLowerCase();

    // Common features based on product type
    if (product_type === "Jackets") {
        features.push("Structured silhouette", "Premium fabric");
        if (lowerHtml.includes("pockets")) features.push("Deep pockets");
        if (lowerHtml.includes("frill")) features.push("Frill detailing");
        if (lowerHtml.includes("satin")) features.push("Satin accents");
    } else if (product_type === "Dress") {
        features.push("Flattering silhouette", "Versatile design");
        if (lowerHtml.includes("pockets")) features.push("Functional pockets");
        if (lowerHtml.includes("belt")) features.push("Belted detail");
        if (lowerHtml.includes("sleeves")) features.push("Comfortable sleeves");
    } else if (product_type === "Tops") {
        features.push("Lightweight fabric", "Modern fit");
        if (lowerHtml.includes("flounce")) features.push("Flounce detailing");
        if (lowerHtml.includes("satin")) features.push("Satin finish");
        if (lowerHtml.includes("crease resistant")) features.push("Crease resistant");
    }

    return features.length > 0 ? features : ["Premium quality", "Comfortable fit"];
}


// gonna use this in accordion
function extractFabric(body_html: string, product_type: string): string {
    const lowerHtml = body_html.toLowerCase();
    if (lowerHtml.includes("crepe")) return "Crepe";
    if (lowerHtml.includes("satin")) return "Modal Satin";
    if (lowerHtml.includes("viscose")) return "Viscose";
    if (lowerHtml.includes("houndstooth")) return "Houndstooth Wool Blend";

    // Default fabrics by product type
    if (product_type === "Jackets") return "Polyester Blend";
    if (product_type === "Dress") return "Polyester/Lycra";
    if (product_type === "Tops") return "Viscose Blend";
    return "Premium Fabric";
}