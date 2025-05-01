import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductCardProps {
    imageUrl: string
    title: string
    rating: number
    price: number
}

export function ProductCard({ imageUrl, title, rating, price }: ProductCardProps) {
    return (
        <Card className="flex gap-3 p-0">

            <div className="flex-1 flex gap-2 ">
                <Image width={100} height={100} src={imageUrl || "/placeholder.svg"} alt={title} className="w-24 aspect-square rounded-md object-cover" />

                <div className="p-1">
                    <h3 className="text-sm font-medium">{title}</h3>

                    <div className="mt-1 flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < rating ? "fill-current text-black" : "text-gray-300"}
                                fill={i < rating ? "currentColor" : "none"}
                            />
                        ))}
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <p className="mt-1 text-sm font-medium">${price.toFixed(2)}</p>
                        <Button className="rounded-full px-4 py-1 text-xs font-medium text-white ">
                            View Details
                        </Button>
                    </div>
                </div>
            </div>


        </Card>
    )
}
