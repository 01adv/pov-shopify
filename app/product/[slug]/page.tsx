import CustomerReviews from '@/components/CustomerReviews'
import ProductGallery from '@/components/Gallery'
import StickyProductHeader from '@/components/StickyProductHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, Star, Truck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {

    // Sample product data
    const product = {
        name: "Prestige Peplum Jacket with Satin block",
        color: "Iris Black",
        size: "S",
        originalPrice: 15800.0,
        salePrice: 11100.0,
        image: "", // Using one of the images we added earlier
        description:
            "A beautifully tailored peplum jacket with satin block details. Perfect for both formal and semi-formal occasions.",
        features: [
            "Premium quality fabric",
            "Satin block detailing",
            "Peplum style for a flattering silhouette",
            "Fully lined",
            "Dry clean only",
        ],
    }

    return (
        <div className='mt-9 max-w-[1200px] mx-auto px-4 md:px-[50px] relative'>
            <StickyProductHeader product={product} />
            <div className="flex flex-col md:flex-row relative">
                {/* Left side */}
                <ProductGallery />

                {/* Right side */}
                <div className="w-full md:w-1/2 lg:w-[35%] ">
                    <div className="md:sticky md:top-10 md:pl-10 ">
                        <h1 className="text-[40px] mb-4">Prestige Peplum Jacket with Satin block
                        </h1>
                        <div className="space-y-2.5">
                            {/* rating */}
                            <div className="flex gap-1 items-center">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary " />)}
                                <span className='text-muted-foreground/75'>3 review(s)</span>
                            </div>
                            {/* discount */}
                            <Badge className=" w-fit bg-primary rounded-xl text-white py-2 px-7">30% OFF</Badge>
                            {/* price */}
                            <div className="gap-5 flex items-center">
                                <span className='text-lg line-through text-muted-foreground/75'>Rs. 15,800.00</span>
                                <span className='text-lg text-muted-foreground/75'>Rs. 11,000.00</span>
                                <Badge
                                    className={`text-black text-xs px-3 py-0.5 bg-white outline rounded-full`}
                                >
                                    Sale
                                </Badge>
                            </div>
                            {/* color */}
                            <div className="space-y-1 flex flex-col">
                                <label htmlFor="color" className="text-muted-foreground/75 text-[13px] mb-0.5">Color: Tango Red</label>
                                <div className="flex gap-2">
                                    <span className="w-7 h-7 flex items-center justify-center rounded-full border border-black">
                                        <span className="w-6 h-6 bg-red-600 rounded-full"></span>
                                    </span>
                                    <span className="w-7 h-7 bg-black rounded-full">
                                    </span>
                                </div>
                            </div>
                            {/* size */}
                            <div className="space-y-1 flex flex-col">
                                <label htmlFor="size" className="text-muted-foreground/75 text-[13px] mb-1">Size: M</label>
                                <div className="flex gap-3">
                                    <span className="px-5 py-1.5 flex items-center justify-center rounded-full text-sm text-white bg-black">S
                                    </span>
                                    <span className="px-5 py-1.5 flex items-center justify-center rounded-full text-sm text-muted-foreground border border-black/50">M
                                    </span>
                                    <span className="px-5 py-1.5 flex items-center justify-center rounded-full text-sm text-muted-foreground border border-black/50">L
                                    </span>
                                    <span className="px-5 py-1.5 flex items-center justify-center rounded-full text-sm text-muted-foreground border border-black/50">XL
                                    </span>
                                </div>
                            </div>
                            {/* add to cart button */}
                            <Button className="max-w-md my-5 h-11 w-full bg-black text-white text-sm rounded-none">Add to cart</Button>
                        </div>
                        <span id="product-details" className="mb-5 text-muted-foreground/75 flex gap-2 items-center"><Truck className='h-4 w-4 text-muted-foreground' /> Free Shipping</span>
                        <span className="mb-4 text-muted-foreground/75 tracking-wide">
                            <span>Elevate your style with our Prestige</span>
                            <span> Peplum Jacket</span>
                            <span>. Its sleek peplum silhouette and deep pockets offer both functionality and sophistication. The luxurious satin and a unique sleeve nuance add a touch of elegance to your power presence. Suit up and embrace the exclusive feel of this jacket.</span>
                        </span>

                        {/* accordion */}
                        <div className="space-y-4 border-t border-muted-foreground/10 pt-4 mt-6">
                            <div className="border-b border-muted-foreground/10 pb-4 text-muted-foreground">
                                <button className="flex w-full items-center justify-between text-left">
                                    <span className="">Fit and Size Chart</span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                            <div className="border-b border-muted-foreground/10 pb-4">
                                <button className="flex w-full items-center justify-between text-left">
                                    <span className="">Features</span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                            <div className="border-b border-muted-foreground/10 pb-4">
                                <button className="flex w-full items-center justify-between text-left">
                                    <span className="">Fabric</span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                            <div className="my-4 max-w-[340px]  aspect-[340/403]  relative">
                                <Image src='/pledge.png' alt={"pledge"} fill className="object-contain p-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-6">
                <CustomerReviews />
            </div>
        </div>
    )

}

export default page
