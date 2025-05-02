import { TestProductType } from "@/lib/testProducts"
import { Card, CardContent, CardFooter } from "./ui/card"
// import SellingLabel from "./SellingLabel"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "./ui/badge"

export const ProductCardForPopup = ({ product }: { product: TestProductType }) => {
    return (
        <div>
            {/* static link for now */}
            <Link href={`/products/focus-fit-and-flare-dress-with-cross-belt?variant=50006518759727`}>
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
                                src={"/placeholder.png"}
                                alt={product.name}
                                width={300}
                                height={400}
                                className="object-cover transition-all hover:scale-105 h-64 w-full"
                            />
                        </div>
                        <div className="mt-3">
                            <h3 className="font-medium text-muted-foreground text-xs line-clamp-2 min-h-[2.5rem]">
                                {product.name}
                            </h3>
                            <p className="text-muted-foreground text-xs line-clamp-1">{product.description}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start p-0 mt-auto">
                        <Badge
                            variant="default"
                            className=" max-w-[80%] w-full text-sm px-1 py-0.5 rounded-full"
                        >
                            {/* {product.discount}% OFF */}
                            50% OFF
                        </Badge>
                        <div className="flex flex-col mt-3">
                            {/* <span className="text-muted-foreground/85 text-xs line-through">
                                ${product.originalPrice.toFixed(2)} USD
                            </span> */}
                            {/* <span className="text-muted-foreground">${product?.price.toFixed(2)} USD</span> */}
                            <span className="text-muted-foreground">$100 USD</span>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    )
}