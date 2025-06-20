// create a list of products tags with their corresponding product IDs

export const productsTags = [
  {
    tag: "almost-gone",
    products: [
      "Charisma Fit and Flare Dress",
      "Eternal Double Breasted Jacket - Limited Edition",
      "Impact Double Breasted Jacket",
      "Trendsetter Modal Satin Shirt",
    ],
  },
  {
    tag: "selling-fast",
    products: [
      "Iconic Asymmetric Colorblock Sheath Dress",
      "Forever Dress Pants for Women with Satin Piping",
      "Intention Colorblock Dress Pants for Women",
      "Intention Colorblock Vest for Women",
      "Prestige Peplum Jacket with Satin block",
    ],
  },
];

// create a function that will take a product name and return the corresponding tag
export const getProductTag = (productName: string): string | undefined => {
  for (const { tag, products } of productsTags) {
    if (products.includes(productName)) {
      return tag;
    }
  }
  return undefined; // Return undefined if no tag is found
};
