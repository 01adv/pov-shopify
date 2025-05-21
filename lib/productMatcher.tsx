// src/lib/productMatcher.ts
import Fuse from 'fuse.js';
import { Product } from './extractedProductsForPopup';

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
    threshold: 0.28, // Fuzziness threshold (0.0 = exact match, 1.0 = very loose)
    includeScore: true, // Optional: include score for debugging
    isCaseSensitive: false, // Optional: case sensitivity
  });

  // Perform fuzzy search for each assistant product
  const matched = assistantProducts.flatMap((query) => {
    console.log('Searching for:', query,); // Debugging
    fuse.search(query).forEach(result => {
      console.log(`Query: ${query} - Match: ${result.item.title} - Score: ${result.score}`);
    });

    return fuse.search(query).map((result) => result.item);
  });

  // Deduplicate by product ID
  const uniqueMatches = Array.from(
    new Map(matched.map((product) => [product.id, product])).values()
  );

  console.log('Matched products:', uniqueMatches); // Debugging
  return uniqueMatches;
};