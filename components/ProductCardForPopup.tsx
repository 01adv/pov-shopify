import { Card, CardContent, CardFooter } from "./ui/card";
// import SellingLabel from "./SellingLabel"
import Image from "next/image";
import Link from "next/link";
// import { Product } from "./Allworkwear";
import { Product } from "@/lib/extractedProductsForPopup";
import { Badge } from "./ui/badge";

export const ProductCardForPopup = ({ product }: { product: Product }) => {
  return (
    <div>
      {/* static link for now */}
      <Link
        href={`/products/${product.handle}?variant=${product.id}`}
      >
        <Card className="border-0 shadow-none  p-0 gap-2 rounded-none">
          <CardContent className="relative p-0 mb-auto">
            {/* {product.badge && (
                            <SellingLabel label={product.badge} />
                        )}
                        {product.isOnSale && (
                            <Badge className="absolute top-2 left-2 z-10 bg-white text-black rounded-full">Sale</Badge>
                        )} */}
            <div className="overflow-hidden">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.title}
                width={300}
                height={400}
                className="object-cover transition-all hover:scale-105 max-h-64 aspect-auto w-full"
              />
            </div>
            <div className="mt-3">
              <h3 className="font-medium text-muted-foreground text-xs line-clamp-2">
                {product.title}
              </h3>

              {/* color */}
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <span
                    key={color}
                    className={`w-4 h-4 flex items-center justify-center rounded-full border ${i === 0 ? "border-black" : "border-gray-300"
                      }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: "fafafa" }}
                    // style={{ backgroundColor: getColorHex(color) }}
                    ></span>
                  </span>
                ))}
              </div>


              {/* <p className="text-muted-foreground text-xs line-clamp-1">{product.description}</p> */}
              <p className="text-muted-foreground text-xs line-clamp-1">
                {product.description}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-0 mt-auto">
            <Badge
              variant="default"
              className=" max-w-[80%] w-full text-xs py-0.5 rounded-full"
            >
              {/* {product.discount}% OFF */}
              50% OFF
            </Badge>
            <div className="flex flex-col mt-2">
              {product?.originalPrice && (
                <span className="text-muted-foreground/85 text-xs line-through">
                  ${product.originalPrice.toFixed(2)} USD
                </span>
              )}
              <span className="text-muted-foreground">
                ${product?.price.toFixed(2)} USD
              </span>
              {/* <span className="text-muted-foreground">$100 USD</span> */}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
