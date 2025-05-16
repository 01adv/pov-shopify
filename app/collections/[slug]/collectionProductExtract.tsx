import { Product, Variant } from "@/components/Allworkwear";
import rawProductData from "@/lib/all-workwear.json";


export function getProductsByTags(tagsToFilter: string[]): Product[] {
    const lowerCaseTagsToFilter = tagsToFilter.map(tag => tag.toLowerCase());

    return rawProductData.flatMap((product) => {
        // Ensure variants and options exist
        if (!product.variants || !product.options || !product.handle || !product.tags ||
            !product.tags.some((productTag) => lowerCaseTagsToFilter.includes(productTag.toLowerCase()))
        ) {
            console.warn(`Product ${product.id} (handle: ${product.handle}) missing variants, options, or does not match any of the provided tags (case-insensitive). Tags: ${product.tags?.join(', ')}`);
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
}