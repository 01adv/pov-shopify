'use client'
import { useProductContext } from '@/hooks/useProduct'
import Image from 'next/image'
import Link from 'next/link'

const AiCuratedStuff = ({ handle }: { handle: string }) => {
    const { matchedProducts } = useProductContext()
    console.log('matchedProducts', matchedProducts)
    console.log('handle', handle)

    if (!matchedProducts || matchedProducts.length === 0)
        return null

    if (!matchedProducts.some(product => product.handle === handle))
        return null

    return (
        <div className=" w-full lg:ml-36">
            <div className=" max-w-sm lg:w-[412px] py-2 px-4 bg-primary  lg:ml-2">
                <p className="text-white text-center font-semibold">AI Curated Outfits</p>
            </div>
            <div className="pt-3 pb-2.5 lg:pb-10 lg:ml-2 max-w-5xl">
                <div className="flex justify-start space-x-4 overflow-x-scroll no-scrollbar ">
                    {/* {aiCuratedProducts.filter(aiProduct => aiProduct.name !== selectedVariant.id.toString()).map((product, index) => ( */}
                    {matchedProducts.filter(aiProduct => aiProduct.handle !== handle).map((product, index) => (
                        <Link
                            key={index}
                            href={`/products/${product.handle}?variant=${product.id}`}>
                            <div className="w-[88px] lg:w-[100px] flex flex-col items-center shrink-0">
                                <div className="w-full aspect-square relative rounded-xl">
                                    <Image
                                        fill
                                        src={product.image || "/placeholder.png"}
                                        alt={`Placeholder image ${index + 1}`}
                                        className="object-cover rounded-xl object-top"
                                    />
                                </div>
                                <p className="text-xs mt-1 line-clamp-1 px-3">{product.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default AiCuratedStuff