// 'use client';
// import { Product } from '@/lib/extractedProductsForPopup';
// import { createContext, useContext, useState, ReactNode } from 'react';

// // Define the shape of the context
// interface ProductContextType {
//   matchedProducts: Product[];
//   setMatchedProducts: (products: Product[]) => void;
// }

// // Create the context with a default value
// const ProductContext = createContext<ProductContextType | undefined>(undefined);

// // Define the provider component
// export const ProductProvider = ({ children }: { children: ReactNode }) => {
//   const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

//   return (
//     <ProductContext.Provider value={{ matchedProducts, setMatchedProducts }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// // Custom hook to access the context
// export const useProductContext = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error('useProductContext must be used within a ProductProvider');
//   }
//   return context;
// };


'use client';
import { Product } from '@/lib/extractedProductsForPopup';
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface ProductContextType {
  matchedProducts: Product[];
  setMatchedProducts: (products: Product[]) => void;
  title: string;
  setTitle: (title: string) => void;
  text: string;
  setText: (text: string) => void;
}

// Create the context with a default value
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Define the provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  return (
    <ProductContext.Provider
      value={{
        matchedProducts,
        setMatchedProducts,
        title,
        setTitle,
        text,
        setText,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to access the context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};