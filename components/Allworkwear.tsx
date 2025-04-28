import { ChevronDown, Settings2, Star } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import SellingLabel from "./SellingLabel"

// Product type definition
type Product = {
    id: string
    title: string
    price: number
    originalPrice: number
    discountPercentage?: number
    rating: number
    reviewCount: number
    badge?: {
        text: string
        type: "selling-fast" | "sale" | "new" | "out-of-stock"
    }
    image: string
    slug: string
}

// Sample product data - replace this with your fetched data
const products: Product[] = [
    {
        id: "1",
        title: "Prestige Peplum Jacket with Satin block - Tango Red",
        price: 11100.00,
        originalPrice: 15800.00,
        discountPercentage: 30,
        rating: 5,
        reviewCount: 3,
        badge: {
            text: "SELLING FAST",
            type: "selling-fast",
        },
        image: "/placeholder.png",
        slug: "prestige-peplum-jacket-red",
    },
    {
        id: "2",
        title: "Prestige Peplum Jacket with Satin block - Iris Black",
        price: 11100.00,
        originalPrice: 15800.00,
        discountPercentage: 30,
        rating: 5,
        reviewCount: 3,
        badge: {
            text: "SELLING FAST",
            type: "selling-fast",
        },
        image: "",
        slug: "prestige-peplum-jacket-black",
    },
    {
        id: "3",
        title: "Resilience Sheath Dress - Tango Red",
        price: 5500.00,
        originalPrice: 11000.00,
        rating: 5,
        reviewCount: 3,
        badge: {
            text: "Sale",
            type: "sale",
        },
        image: "",
        slug: "resilience-sheath-dress-red",
    },
    {
        id: "4",
        title: "Resilience Sheath Dress - Jute Black",
        price: 4700.00,
        originalPrice: 9400.00,
        rating: 5,
        reviewCount: 3,
        badge: {
            text: "Sale",
            type: "sale",
        },
        image: "",
        slug: "resilience-sheath-dress-black",
    },
    {
        id: "5",
        title: "Resilience Sheath Dress - Jute Black",
        price: 4700.00,
        originalPrice: 9400.00,
        rating: 5,
        reviewCount: 3,
        badge: {
            text: "Sale",
            type: "sale",
        },
        image: "",
        slug: "resilience-sheath-dress-black",
    },
]

// Helper function to format price
const formatPrice = (price: number) => {
    return `Rs. ${price.toFixed(2).toLocaleString()}`
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group relative flex flex-col">
            <div className="relative aspect-[5/7.2] w-full overflow-hidden bg-slate-100">
                {/* {product.badge && (
                    product.badge.type === "selling-fast" ? (
                        <SellingLabel label={"Selling Fast"} />
                    ) : (

                        <Badge
                            className={`absolute left-3 top-3 bg-slate-100 text-black
                                }`}
                        >
                            {product.badge.text}
                        </Badge>
                    )
                )} */}
                {product.badge && (
                    <div className="absolute inset-0 z-10">
                        {product.badge.type === "selling-fast" ? (
                            <SellingLabel label={product.badge.text} />
                        ) : (
                            <Badge
                                className={`mt-3 ml-3 bg-slate-100 text-muted-foreground px-3 py-1 tracking-widest rounded-full  
                                    }`}
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
                    className="object-cover transition-transform duration-300 group-hover:scale-[102%]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>
            <div className="py-4 space-y-2">
                <h3 className=" text-[13px] text-muted-foreground group-hover:underline ">{product.title}</h3>
                <div className=" flex gap-2 items-center ">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-muted-foreground fill-muted-foreground" />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
                </div>
                {product.discountPercentage && (
                    <Badge className=" w-fit bg-primary text-white py-2 px-7">{product.discountPercentage}% OFF</Badge>
                )}
                <div className="mt-auto flex flex-col md:flex-row items-baseline gap-2  lg:gap-3">
                    <span className="text-sm text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="text-lg text-muted-foreground">{formatPrice(product.price)}</span>
                </div>

            </div>
        </div>
    )
}

export default function AllWorkWear() {
    return (
        <div className="flex min-h-screen flex-col ">
            {/* Announcement Bar */}


            <main className="flex-1">
                <div className="mx-auto max-w-6xl px-4 xl:px-6">
                    <div className="space-y-5 my-6">
                        <h1 className=" text-[30px] lg:text-[40px] ">All Workwear</h1>
                        <p className="text-muted-foreground/75 max-w-3xl text-base lg:text-lg tracking-wide">
                            As seen on TV, functional workwear with POCKETS for women! Designer corporate wear without the designer
                            price. #pocketspledge
                        </p>
                    </div>

                    {/* Filter and Sort */}
                    <div className="mt-12 md:mt-14 lg:mt-16 mb-4 md:mb-6 lg:mb-9 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="md:hidden flex items-center gap-2 text-muted-foreground text-sm"><Settings2 className=" text-muted-foreground/95 h-4 w-4" /> Filter and sort</span>
                            <span className="hidden md:block text-sm text-muted-foreground/85">Filter:</span>
                            <button className="hidden md:flex items-center gap-2 text-muted-foreground/95 text-sm">
                                Availability <ChevronDown className="text-muted-foreground/95 h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden md:block text-sm text-muted-foreground/85">Sort by:</span>
                            < button className="hidden md:flex items-center gap-16 text-muted-foreground/75 text-sm">
                                Featured <ChevronDown className="h-4 w-4" />
                            </button>
                            <span className="ml-4 text-sm text-muted-foreground">{products.length} products</span>
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
    )
}
