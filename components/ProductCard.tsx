import { Badge } from "@/components/ui/badge";
import { getProductTag } from "@/lib/proudcts-tags";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SellingLabel from "./SellingLabel";


// Product type definition
type Product = {
    id: string;
    parentTitle?: string; // Parent title for grouping
    title: string;
    handle: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    rating: number;
    reviewCount: number;
    image: string;
    slug: string;
};




// Product Card Component
export const ProductCard = ({ product }: { product: Product }) => {
    // Calculate discount percentage
    const discountPercentage = product.originalPrice != null && product.originalPrice > 1 && product.originalPrice !== product.price
        ? product.originalPrice - product.price > 0
            ? Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
            )
            : 0
        : undefined;

    // get tags 
    const tag = getProductTag(product.parentTitle || product.title);

    return (
        <Link href={`/products/${product.handle}?variant=${product.id}`}>
            <div className="group relative flex flex-col">
                <div className="relative aspect-[5/7.2] w-full overflow-hidden bg-slate-100">
                    {tag && (
                        <div className="absolute inset-0 z-10">
                            {tag === "selling-fast" ? (
                                <SellingLabel label={"Selling Fast"} />
                            ) :
                                tag === "almost-gone" ? (
                                    <SellingLabel
                                        label={"Almost Gone"} />
                                ) : null

                            }


                        </div>
                    )}
                    {
                        discountPercentage && !tag && discountPercentage > 0 ? (
                            <Badge className="absolute top-2 left-2 z-10 bg-white text-black rounded-full">
                                Sale
                            </Badge>
                        ) : null
                    }
                    <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-[102%]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </div>
                <div className="py-4 space-y-2">
                    <h3 className="text-[13px] text-muted-foreground group-hover:underline">
                        {product.title}
                    </h3>
                    <div className="flex gap-2 items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="h-3 w-3 text-muted-foreground fill-muted-foreground"
                            />
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">
                            ({product.reviewCount})
                        </span>
                    </div>
                    {/* Discount */}
                    {discountPercentage && discountPercentage > 0 && (
                        <Badge className="w-fit bg-primary rounded-xl text-white py-1.5 px-6">
                            {discountPercentage}% OFF
                        </Badge>
                    )}
                    <div className="mt-auto flex flex-col md:flex-row items-baseline gap-2 lg:gap-3">
                        {product.originalPrice && product.originalPrice > 0 && product.originalPrice > product.price && (
                            <span className="text-sm text-slate-500 line-through">
                                $ {product.originalPrice?.toFixed(2)}
                            </span>
                        )}
                        <span className="text-lg text-muted-foreground">
                            $ {product.price?.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}