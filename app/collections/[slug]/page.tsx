
// import { ProductCard } from '@/components/ProductCard';
// import { notFound } from 'next/navigation';
// import { getProductsByTags } from './collectionProductExtract';

// // Define a type for our collection metadata
// type CollectionMetadata = {
//     title: string;
//     description: string;
//     tags: string[];
// };

// // Map slugs to their metadata
// const collectionsData: Record<string, CollectionMetadata> = {
//     'dresses': {
//         title: 'Work Dresses for Women',
//         description: 'Browse Point of View Label’s stunning Work Dresses for Women, perfect for casual outings, workdays, or special events. From timeless classics to modern silhouettes, find styles that suit your unique taste. Redefine your wardrobe with effortlessly chic options—shop now!',
//         tags: ['Dress', 'Dresses'],
//     },
//     'jackets': {
//         title: 'Womens Workwear Blouses',
//         description: 'Explore our collection of designer Womens Workwear Blouses at Point of View Label. From chic casual designs to elegant statement pieces, find the perfect fit for your wardrobe.',
//         tags: ['Jacket', 'Jackets'],
//     },
//     'pants': {
//         title: 'Dress Pants for Women',
//         description: 'Explore Point of View Label’s collection of versatile Dress Pants for Women, designed to elevate your wardrobe. From tailored trousers to relaxed fits, find pieces that blend comfort and sophistication. Perfect for any occasion—shop your favorites today!',
//         tags: ['Pant', 'Pants', 'skirt', 'skirts'],
//     },
//     'suits': {
//         title: 'WOMENS POWER SUIT',
//         description: 'Discover Point of View Label’s curated womens power suit combining chic style with unbeatable value. These versatile combos are perfect for effortless outfits and smart savings. Refresh your wardrobe while staying on budget!',
//         tags: ['bundles'],
//     },
// };

// type CollectionPageProps = {
//     params: {
//         slug: string;
//     };
// };

// export default function CollectionPage({ params }: CollectionPageProps) {
//     const { slug } = params;
//     const collectionInfo = collectionsData[slug];

//     if (!collectionInfo) {
//         notFound(); // Or redirect to a generic collections page or 404
//     }

//     const products = getProductsByTags(collectionInfo.tags);
//     // const products = productsByTags

//     return (
//         <div className="flex min-h-screen flex-col relative">
//             <main className="flex-1">
//                 <div className="mx-auto max-w-6xl px-4 sm:px-12 xl:px-6">
//                     <div className="space-y-5 my-4 max-md:sticky top-0 max-md:z-40 bg-white pb-1">
//                         {/* <h1 className="text-[30px] lg:text-[40px]">{collectionInfo.title}</h1> */}
//                         <h1 className="text-[40px]">{collectionInfo.title}</h1>
//                         <p className="hidden md:block text-muted-foreground/75 max-w-lg xl:max-w-3xl xl:pr-12 text-lg tracking-wide ">
//                             {collectionInfo.description}
//                         </p>
//                     </div>

//                     {/* Filter and Sort (Simplified for now) */}
//                     <div className="-mt-4 md:mt-9 mb-4 md:mb-6 flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex items-center justify-end w-full gap-4">
//                             <span className="ml-4 text-sm text-muted-foreground">
//                                 {products.length} products
//                             </span>
//                         </div>
//                     </div>

//                     {/* Product Grid */}
//                     {products.length > 0 ? (
//                         <div className="grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-4">
//                             {products.map((product) => (
//                                 <ProductCard key={product.id} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-10">
//                             <p className="text-lg text-muted-foreground">No products found in this collection.</p>
//                         </div>
//                     )}
//                 </div>
//             </main>
//             <div className="h-32 lg:h-60"></div> {/* Spacer for potential fixed elements */}
//         </div>
//     );
// }

// // Optional: Generate static paths if you know all your slugs beforehand
// // export async function generateStaticParams() {
// //   return Object.keys(collectionsData).map((slug) => ({
// //     slug,
// //   }));
// // }


import React from 'react'

const page = () => {
    return (
        <div>page hello</div>
    )
}

export default page