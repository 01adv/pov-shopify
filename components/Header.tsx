import { ChevronDown, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div><div className="bg-primary py-2.5 text-center text-[13px] tracking-wider">FREE SHIPPING ON ALL ORDERS</div>

            {/* Navigation */}
            <header className=" px-4 py-7 relative bg-secondary">
                <div className="mx-auto flex max-w-6xl px-4 xl:px-7 items-center justify-between ">
                    <nav className="hidden lg:flex items-center gap-8 ">
                        <div className="group relative">
                            <button className="flex items-center gap-1 text-sm text-white ">
                                <span className="border-b hover:border-b-2">SHOP</span> <ChevronDown className="h-4 w-4" />
                            </button>

                            {/* will add this hover menu later */}

                        </div>
                        <div className="group relative">
                            <button className="flex items-center gap-1 text-sm text-white/75 hover:text-white">
                                <span className="hover:border-b">ABOUT US</span> <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                        <Link href="#" className="text-sm text-white/75 hover:text-white hover:border-b">
                            LOOKBOOKS
                        </Link>
                    </nav>
                    <nav className="flex lg:hidden items-center ">
                        <button aria-label="Cart" className="h-5 w-5 text-white">
                            <Image src="/menu.svg" alt="Cart" width={100} height={100} />
                        </button>
                    </nav>
                    <Link href="/" className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image src="/logo.png" alt="Logo" width={90} height={60} />
                    </Link>

                    <div className="flex items-center gap-4">
                        <button aria-label="Search" className="w-5 h-5 text-white">
                            <Image src="/search.svg" alt="Cart" width={100} height={100} />
                        </button>
                        <button aria-label="Account" className="hidden lg:block text-white">
                            <UserRound className="h-5 w-5" />
                        </button>
                        <button aria-label="Cart" className="h-5 w-5 text-gray-200">
                            <Image src="/cart.svg" alt="Cart" width={100} height={100} />
                        </button>
                    </div>
                </div>
            </header></div>
    )
}

export default Header