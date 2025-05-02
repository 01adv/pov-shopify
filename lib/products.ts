export interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  badge?: string;
  isOnSale?: boolean;
}

export interface TestProductType {
  id: number;
  name: string;
  collection: string;
  type: string;
  image: string;
  description: string;
  price: number;
  rating?: number;
  reviews?: number;
  badge?: {
    text: string;
    type: "selling-fast" | "sale" | "new" | "out-of-stock";
  };
}
export const products: Product[] = [
  {
    id: 1,
    name: "Iconic Asymmetric Colorblock Sheath Dress",
    description: "Green-Grey",
    originalPrice: 120.0,
    salePrice: 60.0,
    discount: 50,
    image: "/elegant-green-dress-model.png",
    badge: "SELLING FAST",
  },
  {
    id: 2,
    name: "Aspire Flounce Dress with Piping Detail",
    description: "Misty Blue",
    originalPrice: 118.0,
    salePrice: 59.0,
    discount: 50,
    image: "/blue-flounce-dress-model.png",
    isOnSale: true,
  },
  {
    id: 3,
    name: "Aspire Flounce Dress with Piping Detail",
    description: "Dusty Pink",
    originalPrice: 118.0,
    salePrice: 59.0,
    discount: 50,
    image: "/pink-flounce-dress-model.png",
    isOnSale: true,
  },
  {
    id: 4,
    name: "Structured Blazer Dress",
    description: "Black",
    originalPrice: 145.0,
    salePrice: 87.0,
    discount: 40,
    image: "/placeholder.svg?key=2em93",
    isOnSale: true,
  },
  {
    id: 5,
    name: "Elegant Evening Gown",
    description: "Emerald",
    originalPrice: 199.0,
    salePrice: 159.2,
    discount: 20,
    image: "/emerald-gown-model.png",
    isOnSale: true,
  },
];
