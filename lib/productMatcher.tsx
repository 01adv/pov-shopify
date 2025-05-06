// src/lib/productMatcher.ts
import Fuse from 'fuse.js';
import { Product } from '@/components/Allworkwear';

export const matchProducts = (
  assistantProducts: string[],
  products: Product[]
): Product[] => {
  // Return empty array if inputs are invalid
  if (!assistantProducts?.length || !products?.length) {
    console.log('No assistantProducts or products provided');
    return [];
  }

  // Initialize Fuse.js with products and search options
  const fuse = new Fuse(products, {
    keys: ['title'], // Adjust if your product property is different (e.g., 'name')
    threshold: 0.3, // Fuzziness threshold (0.0 = exact match, 1.0 = very loose)
  });

  // Perform fuzzy search for each assistant product
  const matched = assistantProducts.flatMap((query) => {
    console.log('Searching for:', query); // Debugging
    return fuse.search(query).map((result) => result.item);
  });

  // Deduplicate by product ID
  const uniqueMatches = Array.from(
    new Map(matched.map((product) => [product.id, product])).values()
  );

  console.log('Matched products:', uniqueMatches); // Debugging
  return uniqueMatches;
};