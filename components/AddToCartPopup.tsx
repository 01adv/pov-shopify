"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Check } from "lucide-react"
import Image from "next/image"

interface CartPopupProps {
    isOpen: boolean
    onClose: () => void
    title: string
    color: string
    size: string
    imageUrl: string

}

export function CartPopup({ isOpen, onClose, title = "Innovation Zipper Slit Crepe Sheath Dress", color = "Iris Black", size = "XS", imageUrl }: CartPopupProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="
         p-0 gap-0 w-xs
        bg-secondary text-white border-none
        data-[state=open]:animate-in data-[state=open]:slide-in-from-right-4
        data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-4
        data-[state=open]:duration-300 data-[state=closed]:duration-200
        top-28 translate-y-0
        sm:left-auto sm:right-4 md:right-8 lg:right-16
        border-t-2 border-t-primary
      "
            >
                <DialogHeader className="p-4  pb-3">


                    {/* Success Message */}
                    <div className="flex items-center gap-3 ">
                        {/* <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"> */}
                        <Check className="w-4 h-4 text-white" />
                        {/* </div> */}
                        <span className="text-lg font-medium">Item added to your cart</span>
                    </div>
                </DialogHeader>

                <div className="px-6 pb-4">
                    {/* Product Details */}
                    <div className="flex gap-3 mb-4">
                        <div className="w-16 h-24 bg-white rounded overflow-hidden flex-shrink-0">
                            <Image
                                src={imageUrl}
                                alt="Innovation Zipper Slit Crepe Sheath Dress"
                                width={64}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-300/70 uppercase tracking-wide mb-1">POINT OF VIEW LABEL</p>
                            <h3 className="text-white mb-2 leading-tight text-sm">{title}</h3>
                            <div className="space-y-1 text-xs text-gray-300">
                                <p>Color: {color}</p>
                                <p>Size: {size}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full rounded-none border-white text-white hover:bg-white/10 hover:text-white bg-transparent border-2"
                        >
                            View cart (1)
                        </Button>

                        <Button className="w-full rounded-none bg-white text-black hover:bg-gray-100">Check out</Button>

                        <button
                            onClick={onClose}
                            className="w-full text-sm text-center text-white underline hover:no-underline transition-all py-1"
                        >
                            Continue shopping
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
