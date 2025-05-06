// import rawProducts from '@/lib/all-workwear.json'
// interface RawVariant {
//   id: number;
//   title: string;
//   option1: string;
//   option2: string;
//   option3: string | null;
//   sku: string;
//   requires_shipping: boolean;
//   taxable: boolean;
//   featured_image?: {
//     id: number;
//     product_id: number;
//     position: number;
//     created_at: string;
//     updated_at: string;
//     alt: string | null;
//     width: number;
//     height: number;
//     src: string;
//     variant_ids: number[];
//   };
//   available: boolean;
//   price: string;
//   grams: number;
//   compare_at_price: string | null;
//   position: number;
//   product_id: number;
//   created_at: string;
//   updated_at: string;
// }

// interface RawProduct {
//   id: number;
//   title: string;
//   handle: string;
//   body_html: string;
//   published_at: string;
//   created_at: string;
//   updated_at: string;
//   vendor: string;
//   product_type: string;
//   tags: string[];
//   variants: RawVariant[];
//   images: Array<{
//     id: number;
//     created_at: string;
//     position: number;
//     updated_at: string;
//     product_id: number;
//     variant_ids: number[];
//     src: string;
//     width: number;
//     height: number;
//   }>;
//   options: Array<{
//     name: string;
//     position: number;
//     values: string[];
//   }>;
// }

// export const extractProducts = (rawData: RawProduct[]) => {
//   return rawData
//     .filter((product) => {
//       if (
//         !product.variants?.length ||
//         !product.options?.length ||
//         !product.handle ||
//         !product.body_html
//       ) {
//         console.warn(`Product ${product.id} missing required fields`);
//         return false;
//       }
//       return true;
//     })
//     .map((product) => {
//       const colors = Array.from(
//         new Set(product.variants.map((variant) => variant.option1))
//       ).filter((color) => color);

//       const firstVariant = product.variants[0];

//       const price = parseFloat(firstVariant.price);
//       const compareAtPrice = firstVariant.compare_at_price
//         ? parseFloat(firstVariant.compare_at_price)
//         : undefined;
//       const discountPercentage = compareAtPrice
//         ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
//         : undefined;

//       const description = product.body_html
//         .replace(/<[^>]+>/g, '')
//         .replace(/\n/g, ' ')
//         .trim();

//       return {
//         id: firstVariant.id.toString(),
//         title: product.title,
//         description,
//         handle: product.handle,
//         price,
//         originalPrice: compareAtPrice,
//         discountPercentage,
//         rating: 5,
//         reviewCount: 3,
//         badge: product.tags.includes('Bestseller')
//           ? { text: 'Bestseller', type: 'selling-fast' }
//           : product.tags.includes('Sale')
//           ? { text: 'Sale', type: 'sale' }
//           : product.tags.includes('Aug2024')
//           ? { text: 'New', type: 'new' }
//           : undefined,
//         image: firstVariant.featured_image?.src || '/placeholder.png',
//         slug: product.handle,
//         colors,
//       };
//     });
// };


import rawProducts from '@/lib/all-workwear.json';

// Define the Product type
export type Product = {
  id: string; // ID of the first variant for linking
  title: string; // Product title (e.g., "Prestige Peplum Jacket with Satin block")
  description: string; // Product description from body_html
  handle: string; // Product handle for URL
  price: number; // Price from the first variant
  originalPrice?: number; // Compare-at price from the first variant, if available
  discountPercentage?: number; // Calculated discount percentage, if applicable
  rating: number; // Placeholder for rating
  reviewCount: number; // Placeholder for review count
  badge?: {
    text: string;
    type: "selling-fast" | "sale" | "new" | "out-of-stock";
  }; // Optional badge
  image: string; // Image from the first variant or fallback
  slug: string; // Slug for URL
  colors: string[]; // Array of available colors
};

// Define the shape of the raw JSON data
interface RawVariant {
  id: number;
  title: string;
  option1: string;
  option2: string;
  option3: string | null;
  sku: string;
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
}

interface RawProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: RawVariant[];
  images: Array<{
    id: number;
    created_at: string;
    position: number;
    updated_at: string;
    product_id: number;
    variant_ids: number[];
    src: string;
    width: number;
    height: number;
  }>;
  options: Array<{
    name: string;
    position: number;
    values: string[];
  }>;
}

// Function to extract and transform products from raw JSON data
export const extractProducts = (): Product[] => {
  const rawData = rawProducts as RawProduct[];

  return rawData
    .filter((product) => {
      if (
        !product.variants?.length ||
        !product.options?.length ||
        !product.handle ||
        !product.body_html
      ) {
        console.warn(`Product ${product.id} missing required fields`);
        return false;
      }
      return true;
    })
    .map((product) => {
      const colors = Array.from(
        new Set(product.variants.map((variant) => variant.option1))
      ).filter((color) => color);

      const firstVariant = product.variants[0];

      const price = parseFloat(firstVariant.price);
      const compareAtPrice = firstVariant.compare_at_price
        ? parseFloat(firstVariant.compare_at_price)
        : undefined;
      const discountPercentage = compareAtPrice
        ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
        : undefined;

      const description = product.body_html
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .trim();

      return {
        id: firstVariant.id.toString(),
        title: product.title,
        description,
        handle: product.handle,
        price,
        originalPrice: compareAtPrice,
        discountPercentage,
        rating: 5,
        reviewCount: 3,
        badge: product.tags.includes('Bestseller')
          ? { text: 'Bestseller', type: 'selling-fast' }
          : product.tags.includes('Sale')
          ? { text: 'Sale', type: 'sale' }
          : product.tags.includes('Aug2024')
          ? { text: 'New', type: 'new' }
          : undefined,
        image: firstVariant.featured_image?.src || '/placeholder.png',
        slug: product.handle,
        colors,
      };
    });
};