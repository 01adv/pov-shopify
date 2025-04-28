// import { ChevronDown, Settings2, Star } from "lucide-react"
// import Image from "next/image"

// import { Badge } from "@/components/ui/badge"
// import SellingLabel from "./SellingLabel"
// import Link from "next/link"

// // Product type definition
// type Product = {
//     id: string
//     title: string
//     price: number
//     originalPrice: number
//     discountPercentage?: number
//     rating: number
//     reviewCount: number
//     badge?: {
//         text: string
//         type: "selling-fast" | "sale" | "new" | "out-of-stock"
//     }
//     image: string
//     slug: string
// }

// // Sample product data - replace this with your fetched data
// const products: Product[] = [
//     {
//         id: "1",
//         title: "Prestige Peplum Jacket with Satin block - Tango Red",
//         price: 11100.00,
//         originalPrice: 15800.00,
//         discountPercentage: 30,
//         rating: 5,
//         reviewCount: 3,
//         badge: {
//             text: "SELLING FAST",
//             type: "selling-fast",
//         },
//         image: "/placeholder.png",
//         slug: "prestige-peplum-jacket-red",
//     },
//     {
//         id: "2",
//         title: "Prestige Peplum Jacket with Satin block - Iris Black",
//         price: 11100.00,
//         originalPrice: 15800.00,
//         discountPercentage: 30,
//         rating: 5,
//         reviewCount: 3,
//         badge: {
//             text: "SELLING FAST",
//             type: "selling-fast",
//         },
//         image: "",
//         slug: "prestige-peplum-jacket-black",
//     },
//     {
//         id: "3",
//         title: "Resilience Sheath Dress - Tango Red",
//         price: 5500.00,
//         originalPrice: 11000.00,
//         rating: 5,
//         reviewCount: 3,
//         badge: {
//             text: "Sale",
//             type: "sale",
//         },
//         image: "",
//         slug: "resilience-sheath-dress-red",
//     },
//     {
//         id: "4",
//         title: "Resilience Sheath Dress - Jute Black",
//         price: 4700.00,
//         originalPrice: 9400.00,
//         rating: 5,
//         reviewCount: 3,
//         badge: {
//             text: "Sale",
//             type: "sale",
//         },
//         image: "",
//         slug: "resilience-sheath-dress-black",
//     },
//     {
//         id: "5",
//         title: "Resilience Sheath Dress - Jute Black",
//         price: 4700.00,
//         originalPrice: 9400.00,
//         rating: 5,
//         reviewCount: 3,
//         badge: {
//             text: "Sale",
//             type: "sale",
//         },
//         image: "",
//         slug: "resilience-sheath-dress-black",
//     },
// ]

// // Helper function to format price
// const formatPrice = (price: number) => {
//     return `Rs. ${price.toFixed(2).toLocaleString()}`
// }

// // Product Card Component
// function ProductCard({ product }: { product: Product }) {
//     return (
//         <Link href={`/product/${product.slug}`}>
//             <div className="group relative flex flex-col">
//                 <div className="relative aspect-[5/7.2] w-full overflow-hidden bg-slate-100">
//                     {product.badge && (
//                         <div className="absolute inset-0 z-10">
//                             {product.badge.type === "selling-fast" ? (
//                                 <SellingLabel label={product.badge.text} />
//                             ) : (
//                                 <Badge
//                                     className={`mt-3 ml-3 bg-slate-100 text-muted-foreground px-3 py-1 tracking-widest rounded-full  
//                                     }`}
//                                 >
//                                     {product.badge.text}
//                                 </Badge>
//                             )}
//                         </div>
//                     )}
//                     <Image
//                         src={product.image || "/placeholder.png"}
//                         alt={product.title}
//                         fill
//                         loading="lazy"
//                         className="object-cover transition-transform duration-300 group-hover:scale-[102%]"
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                     />
//                 </div>
//                 <div className="py-4 space-y-2">
//                     <h3 className=" text-[13px] text-muted-foreground group-hover:underline ">{product.title}</h3>
//                     <div className=" flex gap-2 items-center ">
//                         {[...Array(5)].map((_, i) => (
//                             <Star key={i} className="h-3 w-3 text-muted-foreground fill-muted-foreground" />
//                         ))}
//                         <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
//                     </div>
//                     {product.discountPercentage && (
//                         <Badge className=" w-fit bg-primary text-white py-2 px-7">{product.discountPercentage}% OFF</Badge>
//                     )}
//                     <div className="mt-auto flex flex-col md:flex-row items-baseline gap-2  lg:gap-3">
//                         <span className="text-sm text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
//                         <span className="text-lg text-muted-foreground">{formatPrice(product.price)}</span>
//                     </div>

//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default function AllWorkWear() {
//     return (
//         <div className="flex min-h-screen flex-col ">
//             {/* Announcement Bar */}


//             <main className="flex-1">
//                 <div className="mx-auto max-w-6xl px-4 xl:px-6">
//                     <div className="space-y-5 my-6">
//                         <h1 className=" text-[30px] lg:text-[40px] ">All Workwear</h1>
//                         <p className="text-muted-foreground/75 max-w-3xl text-base lg:text-lg tracking-wide">
//                             As seen on TV, functional workwear with POCKETS for women! Designer corporate wear without the designer
//                             price. #pocketspledge
//                         </p>
//                     </div>

//                     {/* Filter and Sort */}
//                     <div className="mt-12 md:mt-14 lg:mt-16 mb-4 md:mb-6 lg:mb-9 flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex items-center gap-4">
//                             <span className="md:hidden flex items-center gap-2 text-muted-foreground text-sm"><Settings2 className=" text-muted-foreground/95 h-4 w-4" /> Filter and sort</span>
//                             <span className="hidden md:block text-sm text-muted-foreground/85">Filter:</span>
//                             <button className="hidden md:flex items-center gap-2 text-muted-foreground/95 text-sm">
//                                 Availability <ChevronDown className="text-muted-foreground/95 h-4 w-4" />
//                             </button>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <span className="hidden md:block text-sm text-muted-foreground/85">Sort by:</span>
//                             < button className="hidden md:flex items-center gap-16 text-muted-foreground/75 text-sm">
//                                 Featured <ChevronDown className="h-4 w-4" />
//                             </button>
//                             <span className="ml-4 text-sm text-muted-foreground">{products.length} products</span>
//                         </div>
//                     </div>

//                     {/* Product Grid */}
//                     <div className="grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-4">
//                         {products.map((product) => (
//                             <ProductCard key={product.id} product={product} />
//                         ))}
//                     </div>
//                 </div>
//             </main>
//             <div className="h-60"></div>
//         </div>
//     )
// }



// import { Badge } from "@/components/ui/badge";
// import { ChevronDown, Settings2, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import SellingLabel from "./SellingLabel";

// // Product type definition
// type Product = {
//     id: string;
//     title: string;
//     price: number;
//     originalPrice?: number;
//     discountPercentage?: number;
//     rating: number;
//     reviewCount: number;
//     badge?: {
//         text: string;
//         type: "selling-fast" | "sale" | "new" | "out-of-stock";
//     };
//     image: string;
//     slug: string;
// };

// // Sample product data from JSON (single product with variants)
// const rawProductData = [
//     {
//         id: 10160953884975,
//         title: "Forever Dress Pants for Women with Satin Piping",
//         handle: "forever-dress-pants-for-women-with-satin-piping",
//         variants: [
//             {
//                 id: 50006522036527,
//                 title: "Tango Red / XS",
//                 option1: "Tango Red",
//                 option2: "XS",
//                 sku: "POVBARDXS",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/Redpants_2.jpg?v=1725003035",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522069295,
//                 title: "Tango Red / S",
//                 option1: "Tango Red",
//                 option2: "S",
//                 sku: "POVBARDS",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/Redpants_2.jpg?v=1725003035",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522102063,
//                 title: "Tango Red / M",
//                 option1: "Tango Red",
//                 option2: "M",
//                 sku: "POVBARDM",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/Redpants_2.jpg?v=1725003035",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522134831,
//                 title: "Tango Red / L",
//                 option1: "Tango Red",
//                 option2: "L",
//                 sku: "POVBARDL",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/Redpants_2.jpg?v=1725003035",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522167599,
//                 title: "Tango Red / XL",
//                 option1: "Tango Red",
//                 option2: "XL",
//                 sku: "POVBARDXL",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/Redpants_2.jpg?v=1725003035",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522364207,
//                 title: "Winter White / XS",
//                 option1: "Winter White",
//                 option2: "XS",
//                 sku: "POVBAWHXS",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-385758.jpg?v=1728868069",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522396975,
//                 title: "Winter White / S",
//                 option1: "Winter White",
//                 option2: "S",
//                 sku: "POVBAWHS",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-385758.jpg?v=1728868069",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522429743,
//                 title: "Winter White / M",
//                 option1: "Winter White",
//                 option2: "M",
//                 sku: "POVBAWHM",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-385758.jpg?v=1728868069",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522462511,
//                 title: "Winter White / L",
//                 option1: "Winter White",
//                 option2: "L",
//                 sku: "POVBAWHL",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-385758.jpg?v=1728868069",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50006522495279,
//                 title: "Winter White / XL",
//                 option1: "Winter White",
//                 option2: "XL",
//                 sku: "POVBAWHXL",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-385758.jpg?v=1728868069",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50308465754415,
//                 title: "Iris Black / XS",
//                 option1: "Iris Black",
//                 option2: "XS",
//                 sku: "POVBABKXS",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-713046.jpg?v=1728868068",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50308465787183,
//                 title: "Iris Black / S",
//                 option1: "Iris Black",
//                 option2: "S",
//                 sku: "POVBABKS",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-713046.jpg?v=1728868068",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50308465819951,
//                 title: "Iris Black / M",
//                 option1: "Iris Black",
//                 option2: "M",
//                 sku: "POVBABKM",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-713046.jpg?v=1728868068",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50308465852719,
//                 title: "Iris Black / L",
//                 option1: "Iris Black",
//                 option2: "L",
//                 sku: "POVBABKL",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-713046.jpg?v=1728868068",
//                 },
//                 available: true,
//             },
//             {
//                 id: 50308465885487,
//                 title: "Iris Black / XL",
//                 option1: "Iris Black",
//                 option2: "XL",
//                 sku: "POVBABKXL",
//                 price: "120.00",
//                 compare_at_price: null,
//                 featured_image: {
//                     src: "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/forever-dress-pants-with-satin-piping-pant-713046.jpg?v=1728868068",
//                 },
//                 available: true,
//             },
//         ],
//         published_at: "2024-08-29T00:16:47-07:00",
//         options: [
//             {
//                 name: "Color",
//                 position: 1,
//                 values: ["Tango Red", "Winter White", "Iris Black"],
//             },
//             {
//                 name: "Size",
//                 position: 2,
//                 values: ["XS", "S", "M", "L", "XL"],
//             },
//         ],
//     },
//     // Add other 36 products here with similar structure
// ];

// // Transform raw product data into Product type array (one product per color)
// const products: Product[] = rawProductData.flatMap((product) => {
//     // Group variants by color (option1)
//     const variantsByColor = product.variants.reduce((acc, variant) => {
//         const color = variant.option1;
//         if (!acc[color]) {
//             acc[color] = [];
//         }
//         acc[color].push(variant);
//         return acc;
//     }, {} as Record<string, typeof product.variants>);

//     // Create one product per color
//     return Object.keys(variantsByColor).map((color) => {
//         const firstVariant = variantsByColor[color][0]; // Use first variant for data
//         return {
//             id: firstVariant.id.toString(),
//             title: `${product.title} - ${color}`,
//             price: parseFloat(firstVariant.price) * 100, // Convert to cents for Rs.
//             originalPrice: firstVariant.compare_at_price
//                 ? parseFloat(firstVariant.compare_at_price) * 100
//                 : undefined,
//             discountPercentage: firstVariant.compare_at_price
//                 ? Math.round(
//                     ((parseFloat(firstVariant.compare_at_price) -
//                         parseFloat(firstVariant.price)) /
//                         parseFloat(firstVariant.compare_at_price)) *
//                     100
//                 )
//                 : undefined,
//             rating: 5, // Placeholder (not in JSON)
//             reviewCount: 3, // Placeholder (not in JSON)
//             badge: {
//                 text: "SELLING FAST",
//                 type: "selling-fast" as const, // Based on your question
//             },
//             image: firstVariant.featured_image?.src || "/placeholder.png",
//             slug: `${product.handle}-${color.toLowerCase().replace(/\s+/g, "-")}`,
//         };
//     });
// });

// // Helper function to format price
// const formatPrice = (price: number) => {
//     return `Rs. ${price.toFixed(0).toLocaleString()}`;
// };

// // Product Card Component
// function ProductCard({ product }: { product: Product }) {
//     return (
//         <Link href={`/product/${product.slug}`}>
//             <div className="group relative flex flex-col">
//                 <div className="relative aspect-[5/7.2] w-full overflow-hidden bg-slate-100">
//                     {product.badge && (
//                         <div className="absolute inset-0 z-10">
//                             {product.badge.type === "selling-fast" ? (
//                                 <SellingLabel label={product.badge.text} />
//                             ) : (
//                                 <Badge
//                                     className={`mt-3 ml-3 bg-slate-100 text-muted-foreground px-3 py-1 tracking-widest rounded-full`}
//                                 >
//                                     {product.badge.text}
//                                 </Badge>
//                             )}
//                         </div>
//                     )}
//                     <Image
//                         src={product.image || "/placeholder.png"}
//                         alt={product.title}
//                         fill
//                         loading="lazy"
//                         className="object-cover transition-transform duration-300 group-hover:scale-[102%]"
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                     />
//                 </div>
//                 <div className="py-4 space-y-2">
//                     <h3 className="text-[13px] text-muted-foreground group-hover:underline">
//                         {product.title}
//                     </h3>
//                     <div className="flex gap-2 items-center">
//                         {[...Array(5)].map((_, i) => (
//                             <Star
//                                 key={i}
//                                 className="h-3 w-3 text-muted-foreground fill-muted-foreground"
//                             />
//                         ))}
//                         <span className="ml-1 text-xs text-muted-foreground">
//                             ({product.reviewCount})
//                         </span>
//                     </div>
//                     {product.discountPercentage && (
//                         <Badge className="w-fit bg-primary text-white py-2 px-7">
//                             {product.discountPercentage}% OFF
//                         </Badge>
//                     )}
//                     <div className="mt-auto flex flex-col md:flex-row items-baseline gap-2 lg:gap-3">
//                         {product.originalPrice && (
//                             <span className="text-sm text-slate-500 line-through">
//                                 {formatPrice(product.originalPrice)}
//                             </span>
//                         )}
//                         <span className="text-lg text-muted-foreground">
//                             {formatPrice(product.price)}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// export default function AllWorkWear() {
//     return (
//         <div className="flex min-h-screen flex-col">
//             <main className="flex-1">
//                 <div className="mx-auto max-w-6xl px-4 xl:px-6">
//                     <div className="space-y-5 my-6">
//                         <h1 className="text-[30px] lg:text-[40px]">All Workwear</h1>
//                         <p className="text-muted-foreground/75 max-w-3xl text-base lg:text-lg tracking-wide">
//                             As seen on TV, functional workwear with POCKETS for women! Designer
//                             corporate wear without the designer price. #pocketspledge
//                         </p>
//                     </div>

//                     {/* Filter and Sort */}
//                     <div className="mt-12 md:mt-14 lg:mt-16 mb-4 md:mb-6 lg:mb-9 flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex items-center gap-4">
//                             <span className="md:hidden flex items-center gap-2 text-muted-foreground text-sm">
//                                 <Settings2 className="text-muted-foreground/95 h-4 w-4" /> Filter
//                                 and sort
//                             </span>
//                             <span className="hidden md:block text-sm text-muted-foreground/85">
//                                 Filter:
//                             </span>
//                             <button className="hidden md:flex items-center gap-2 text-muted-foreground/95 text-sm">
//                                 Availability{" "}
//                                 <ChevronDown className="text-muted-foreground/95 h-4 w-4" />
//                             </button>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <span className="hidden md:block text-sm text-muted-foreground/85">
//                                 Sort by:
//                             </span>
//                             <button className="hidden md:flex items-center gap-16 text-muted-foreground/75 text-sm">
//                                 Featured <ChevronDown className="h-4 w-4" />
//                             </button>
//                             <span className="ml-4 text-sm text-muted-foreground">
//                                 {products.length} products
//                             </span>
//                         </div>
//                     </div>

//                     {/* Product Grid */}
//                     <div className="grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-4">
//                         {products.map((product) => (
//                             <ProductCard key={product.id} product={product} />
//                         ))}
//                     </div>
//                 </div>
//             </main>
//             <div className="h-60"></div>
//         </div>
//     );
// }


import { ChevronDown, Settings2 } from "lucide-react";

import rawProductData from "@/app/products.json";
import { ProductCard } from "./ProductCard";


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

// Transform raw product data into Product type array (one product per color)
const products: Product[] = rawProductData.flatMap((product) => {
    // Ensure variants and options exist
    if (!product.variants || !product.options) {
        console.warn(`Product ${product.id} missing variants or options`);
        return [];
    }

    // Group variants by color (option1)
    const variantsByColor = product?.variants?.reduce((acc, variant) => {
        const color = variant?.option1;
        if (!acc[color]) {
            acc[color] = [];
        }
        acc[color].push(variant);
        return acc;
    }, {} as Record<string, typeof product.variants>);

    // Create one product per color
    return Object.keys(variantsByColor).map((color) => {
        const firstVariant = variantsByColor[color][0]; // Use first variant for data
        return {
            id: firstVariant.id.toString(),
            title: `${product.title} - ${color}`,
            price: parseFloat(firstVariant.price),
            originalPrice: firstVariant.compare_at_price
                ? parseFloat(firstVariant.compare_at_price)
                : undefined,
            // discountPercentage: firstVariant.compare_at_price
            //     ? Math.round(
            //         ((parseFloat(firstVariant.compare_at_price) -
            //             parseFloat(firstVariant.price)) /
            //             parseFloat(firstVariant.compare_at_price)) *
            //         100
            //     )
            //     : undefined,
            rating: 5, // Placeholder (not in JSON)
            reviewCount: 3, // Placeholder (not in JSON)
            // badge:
            //     product.id === 10160953884975
            //         ? {
            //             text: "SELLING FAST",
            //             type: "selling-fast" as const, // Based on your question for this product
            //         }
            //         : firstVariant.compare_at_price
            //             ? { text: "SALE", type: "sale" as const } // Apply SALE badge if discounted
            //             : undefined,
            image: firstVariant.featured_image?.src || "/placeholder.png",
            slug: `${product.handle}-${color.toLowerCase().replace(/\s+/g, "-")}`,
        };
    });
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