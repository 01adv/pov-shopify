import fs from "fs";
// import rawProductData from "../pov-shopify/app/products.json" with { type: "json" }; // Add import attribute
import rawProductData from "./data/all_workwear_products2.json" with { type: "json" }; // Add import attribute

const products = rawProductData.flatMap((product) => {
  // Ensure variants and options exist
  if (!product.variants || !product.options || !product.handle) {
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
  }, {}); // Initialize with empty object

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
});

// Write the transformed products to a new JSON file
fs.writeFileSync(
  "./transformedProducts2.json",
  JSON.stringify(products, null, 2),
  "utf-8"
);

console.log("Transformed products saved to transformedProducts.json");