'use client';
import { ChevronDown, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
// array of links to map in the nav
const shopLinks = [
    {
        name: 'Dresses',
        href: '#'
    },
    {
        name: 'Jackets',
        href: '#'
    },
    {
        name: 'Pants & Skirts',
        href: '#'
    },
    {
        name: 'Power Suits',
        href: '#'
    },
    {
        name: 'Daily Dopamine Collection',
        href: '#'
    },
    {
        name: 'Work to Wine Collection',
        href: '#'
    },
    {
        name: 'Power Presence Collection',
        href: '#'
    },
    {
        name: 'Shop All Workwear',
        href: '#'
    },
    {
        name: 'Gift Cards',
        href: '#'
    },

]
const aboutUsLinks = [
    {
        name: 'Our Story',
        href: '#'
    },
    {
        name: "POV IN THE NEWS",
        href: '#'
    },
    {
        name: 'FREQUENTLY ASKED QUESTIONS',
        href: '#'
    },
    {
        name: 'POV BLOG',
        href: '#'
    },
    {
        name: 'Contact Us',
        href: '#'
    }
]

const Header = () => {
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    // Refs to track the dropdown elements
    const shopRef = useRef<HTMLButtonElement>(null);
    const aboutRef = useRef<HTMLButtonElement>(null);

    // Handle clicks outside the dropdown to close them
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                shopRef.current &&
                !shopRef.current.contains(target) &&
                aboutRef.current &&
                !aboutRef.current.contains(target)
            ) {
                setIsShopOpen(false);
                setIsAboutOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle Shop dropdown
    const toggleShopDropdown = () => {
        setIsShopOpen((prev) => !prev);
        setIsAboutOpen(false); // Close the other dropdown
    };

    // Toggle About Us dropdown
    const toggleAboutDropdown = () => {
        setIsAboutOpen((prev) => !prev);
        setIsShopOpen(false); // Close the other dropdown
    };
    return (
        <div><div className="bg-primary py-2.5 text-center text-[13px] tracking-wider">FREE SHIPPING ON ALL ORDERS</div>

            {/* Navigation */}
            <header className="  bg-secondary relative">
                <div className="mx-auto flex max-w-6xl px-4 py-7 xl:px-7 items-center justify-between relative">
                    <nav className="hidden lg:flex items-center gap-8 ">
                        <div className="group relative">
                            <button ref={shopRef} className="flex items-center gap-1 text-sm text-white" onClick={toggleShopDropdown}>
                                <span className="border-b hover:underline underline-offset-2">SHOP</span> <ChevronDown className="h-4 w-4" />
                            </button>

                            {/* will add this hover menu later */}

                        </div>
                        <div className="group relative">
                            <button ref={aboutRef} className="flex items-center gap-1 text-sm text-white/75 hover:text-white" onClick={toggleAboutDropdown}>
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
                            <Link href="https://pointofviewlabel.com/cart">
                                <Image src="/cart.svg" alt="Cart" width={100} height={100} />
                            </Link>
                        </button>
                    </div>
                </div>
                {(isShopOpen || isAboutOpen) && (

                    <div className="bg-secondary z-40 py-8 border-t absolute w-full ">
                        <div className="max-w-6xl mx-auto  px-4 lg:px-7">
                            <div className=" flex flex-col items-start gap-2 justify-start">
                                {isShopOpen &&
                                    shopLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="flex w-full text-sm font-medium text-muted/65 hover:text-white hover:underline underline-offset-1 tracking-wide uppercase"
                                            onClick={() => setIsShopOpen(false)} // Close dropdown on link click
                                        >
                                            {link.name}
                                        </Link>
                                    ))}

                            </div>

                            <div className=" flex flex-col items-start gap-2 justify-start">
                                {isAboutOpen && aboutUsLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="flex w-full text-sm font-medium text-muted/65 hover:text-white hover:underline underline-offset-1 tracking-wide uppercase"
                                        onClick={() => setIsAboutOpen(false)} // Close dropdown on link click
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )
                }

            </header>
        </div>
    )
}

export default Header

// 'use client';
// import { ChevronDown, UserRound } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState, useEffect, useRef } from 'react';

// const Header = () => {
//     // State to manage dropdown visibility
//     const [isShopOpen, setIsShopOpen] = useState(false);
//     const [isAboutOpen, setIsAboutOpen] = useState(false);

// // Refs to track the dropdown elements
// const shopRef = useRef(null);
// const aboutRef = useRef(null);

// // Handle clicks outside the dropdown to close them
// useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//         if (
//             shopRef.current &&
//             !shopRef.current.contains(event.target) &&
//             aboutRef.current &&
//             !aboutRef.current.contains(event.target)
//         ) {
//             setIsShopOpen(false);
//             setIsAboutOpen(false);
//         }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//     };
// }, []);

// // Toggle Shop dropdown
// const toggleShopDropdown = () => {
//     setIsShopOpen((prev) => !prev);
//     setIsAboutOpen(false); // Close the other dropdown
// };

// // Toggle About Us dropdown
// const toggleAboutDropdown = () => {
//     setIsAboutOpen((prev) => !prev);
//     setIsShopOpen(false); // Close the other dropdown
// };

//     return (
//         <div>
//             <div className="bg-pink-400 py-2.5 text-center text-[13px] tracking-wider text-white">
//                 FREE SHIPPING ON ALL ORDERS
//             </div>

//             {/* Navigation */}
//             <header className="  bg-gray-900">
//                 <div className="mx-auto relative flex max-w-6xl px-4 xl:px-7 items-center justify-between">
//                     <nav className="hidden lg:flex items-center gap-8">
//                         {/* Shop Dropdown */}
//                         <div ref={shopRef} className="relative">
//                             <button
//                                 onClick={toggleShopDropdown}
//                                 className="flex items-center gap-1 text-sm text-white"
//                             >
//                                 <span className="border-b hover:border-b-2">SHOP</span>{' '}
//                                 <ChevronDown className="h-4 w-4" />
//                             </button>

//                             {/* Shop Dropdown Menu */}
//                             {/* {isShopOpen && (
//                                 // <div className="absolute w-screen bg-gray-800 text-white rounded-md shadow-lg z-10">
//                                 //     <Link
//                                 //         href="#dresses"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)} // Close dropdown on link click
//                                 //     >
//                                 //         DRESSES
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#jackets"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         JACKETS
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#pants-skirts"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         PANTS & SKIRTS
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#power-suits"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         POWER SUITS
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#daily-dopamine"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         DAILY DOPAMINE COLLECTION
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#work-to-wine"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         WORK TO WINE COLLECTION
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#power-presence"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         POWER PRESENCE COLLECTION
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#shop-all"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         SHOP ALL WORKWEAR
//                                 //     </Link>
//                                 //     <Link
//                                 //         href="#gift-cards"
//                                 //         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                 //         onClick={() => setIsShopOpen(false)}
//                                 //     >
//                                 //         GIFT CARDS
//                                 //     </Link>
//                                 // </div>
//                             )} */}
//                         </div>

//                         {/* About Us Dropdown */}
//                         <div ref={aboutRef} className="relative">
//                             <button
//                                 onClick={toggleAboutDropdown}
//                                 className="flex items-center gap-1 text-sm text-white/75 hover:text-white"
//                             >
//                                 <span className="hover:border-b">ABOUT US</span>{' '}
//                                 <ChevronDown className="h-4 w-4" />
//                             </button>

//                             {/* About Us Dropdown Menu */}
//                             {isAboutOpen && (
//                                 <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
//                                     <Link
//                                         href="#our-story"
//                                         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                         onClick={() => setIsAboutOpen(false)} // Close dropdown on link click
//                                     >
//                                         OUR STORY
//                                     </Link>
//                                     <Link
//                                         href="#our-mission"
//                                         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                         onClick={() => setIsAboutOpen(false)}
//                                     >
//                                         OUR MISSION
//                                     </Link>
//                                     <Link
//                                         href="#contact-us"
//                                         className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                         onClick={() => setIsAboutOpen(false)}
//                                     >
//                                         CONTACT US
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>

//                         <Link
//                             href="#lookbooks"
//                             className="text-sm text-white/75 hover:text-white hover:border-b"
//                         >
//                             LOOKBOOKS
//                         </Link>
//                     </nav>

//                     <nav className="flex lg:hidden items-center">
//                         <button aria-label="Cart" className="h-5 w-5 text-white">
//                             <Image src="/menu.svg" alt="Cart" width={100} height={100} />
//                         </button>
//                     </nav>

//                     <Link
//                         href="/"
//                         className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//                     >
//                         <Image src="/logo.png" alt="Logo" width={90} height={60} />
//                     </Link>

//                     <div className="flex items-center gap-4">
//                         <button aria-label="Search" className="w-5 h-5 text-white">
//                             <Image src="/search.svg" alt="Cart" width={100} height={100} />
//                         </button>
//                         <button
//                             aria-label="Account"
//                             className="hidden lg:block text-white"
//                         >
//                             <UserRound className="h-5 w-5" />
//                         </button>
//                         <button aria-label="Cart" className="h-5 w-5 text-gray-200">
//                             <Link href="https://pointofviewlabel.com/cart">
//                                 <Image src="/cart.svg" alt="Cart" width={100} height={100} />
//                             </Link>
//                         </button>
//                     </div>
//                 </div>
//                 {/* <div className="bg-gray-900 py-20 border-t"></div> */}
//             </header>
//         </div>
//     );
// };

// export default Header;