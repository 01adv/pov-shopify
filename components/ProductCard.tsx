import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SellingLabel from "./SellingLabel";


// Product type definition
type Product = {
    id: string;
    title: string;
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




// Product Card Component
export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <div className="group relative flex flex-col">
                <div className="relative aspect-[5/7.2] w-full overflow-hidden bg-slate-100">
                    {product.badge && (
                        <div className="absolute inset-0 z-10">
                            {product.badge.type === "selling-fast" ? (
                                <SellingLabel label={product.badge.text} />
                            ) : (
                                <Badge
                                    className={`mt-3 ml-3 bg-slate-100 text-muted-foreground px-3 py-1 tracking-widest rounded-full`}
                                >
                                    {product.badge.text}
                                </Badge>
                            )}
                        </div>
                    )}
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
                    <div className="mt-auto flex flex-col md:flex-row items-baseline gap-2 lg:gap-3">
                        {product.originalPrice && (product?.originalPrice > product.price) && (
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