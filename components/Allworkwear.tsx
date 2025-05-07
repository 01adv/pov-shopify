import { ChevronDown, Settings2 } from "lucide-react";

// import rawProductData from "@/app/products.json";
import rawProductData from "@/lib/all-workwear.json";
import { ProductCard } from "./ProductCard";


type Variant = {
    id: number;
    title: string;
    option1: string;
    // option2: string;
    // option3: string;
    // sku: string;
    requires_shipping: boolean;
    taxable: boolean;
    featured_image?: {
        id: number;
        product_id: number;
        position: number;
        created_at: string;
        updated_at: string;
        alt: string | null;
        width: number;
        height: number;
        src: string;
        variant_ids: number[];
    };
    available: boolean;
    price: string;
    grams: number;
    compare_at_price: string | null;
    position: number;
    product_id: number;
    created_at: string;
    updated_at: string;
};



export type Product = {
    id: string;
    title: string;
    handle: string; // Product handle (for /products/[handle])
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    rating: number;
    reviewCount: number;
    badge?: {
        text: string;
        type: "selling-fast" | "sale" | "new" | "out-of-stock";
    };
    image: string;
    slug: string;
};



export const products: Product[] = rawProductData.flatMap((product) => {
    // Ensure variants and options exist
    if (!product.variants || !product.options || !product.handle) {
        console.warn(`Product ${product.id} missing variants or options`);
        return [];
    }

    // Check if the product has a color option
    const hasColorOption = product.options.some(
        (option) => option.name.toLowerCase() === "color"
    );

    if (hasColorOption) {
        // Group variants by color (option1 is color)
        const variantsByColor = product.variants.reduce((acc, variant) => {
            const color = variant.option1;
            if (!acc[color]) {
                acc[color] = [];
            }
            acc[color].push(variant);
            return acc;
        }, {} as Record<string, Variant[]>);

        // Create one product per color
        return Object.keys(variantsByColor).map((color) => {
            const firstVariant = variantsByColor[color][0]; // Use first variant for data
            return {
                id: firstVariant.id.toString(),
                title: `${product.title} - ${color}`,
                handle: product.handle, // Product handle for URL
                price: parseFloat(firstVariant.price),
                originalPrice: firstVariant.compare_at_price
                    ? parseFloat(firstVariant.compare_at_price)
                    : undefined,
                rating: 5, // Placeholder (not in JSON)
                reviewCount: 3, // Placeholder (not in JSON)
                image: firstVariant.featured_image?.src || "/placeholder.png",
                slug: `${product.handle}-${color.toLowerCase().replace(/\s+/g, "-")}`,
            };
        });
    } else {
        // No color option: Treat as a single product (option1 is size)
        const firstVariant = product.variants[0]; // Use the first variant for data
        return [
            {
                id: firstVariant.id.toString(),
                title: product.title, // No color suffix
                handle: product.handle, // Product handle for URL
                price: parseFloat(firstVariant.price),
                originalPrice: firstVariant.compare_at_price
                    ? parseFloat(firstVariant.compare_at_price)
                    : undefined,
                rating: 5, // Placeholder (not in JSON)
                reviewCount: 3, // Placeholder (not in JSON)
                image: firstVariant.featured_image?.src || "/placeholder.png",
                slug: product.handle, // No color in slug
            },
        ];
    }
});

export default function AllWorkWear() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <div className="mx-auto max-w-6xl px-4 xl:px-6">
                    <div className="space-y-5 my-6">
                        <h1 className="text-[30px] lg:text-[40px]">All Workwear</h1>
                        <p className="text-muted-foreground/75 max-w-3xl text-base lg:text-lg tracking-wide">
                            As seen on TV, functional workwear with POCKETS for women! Designer
                            corporate wear without the designer price. #pocketspledge
                        </p>
                    </div>

                    {/* Filter and Sort */}
                    <div className="mt-12 md:mt-14 lg:mt-16 mb-4 md:mb-6 lg:mb-9 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="md:hidden flex items-center gap-2 text-muted-foreground text-sm">
                                <Settings2 className="text-muted-foreground/95 h-4 w-4" /> Filter
                                and sort
                            </span>
                            <span className="hidden md:block text-sm text-muted-foreground/85">
                                Filter:
                            </span>
                            <button className="hidden md:flex items-center gap-2 text-muted-foreground/95 text-sm">
                                Availability{" "}
                                <ChevronDown className="text-muted-foreground/95 h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden md:block text-sm text-muted-foreground/85">
                                Sort by:
                            </span>
                            <button className="hidden md:flex items-center gap-16 text-muted-foreground/75 text-sm">
                                Featured <ChevronDown className="h-4 w-4" />
                            </button>
                            <span className="ml-4 text-sm text-muted-foreground">
                                {products.length} products
                            </span>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </main>
            <div className="h-60"></div>
        </div>
    );
}