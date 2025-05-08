// 'use client';
// import { ChevronDown } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';
// // array of links to map in the nav
// const shopLinks = [
//     {
//         name: 'Dresses',
//         href: 'https://pointofviewlabel.com/collections/work-dresses-for-women'
//     },
//     {
//         name: 'Jackets',
//         href: '/about'
//     },
//     {
//         name: 'Pants & Skirts',
//         href: '#'
//     },
//     {
//         name: 'Power Suits',
//         href: '#'
//     },
//     {
//         name: 'Daily Dopamine Collection',
//         href: '#'
//     },
//     {
//         name: 'Work to Wine Collection',
//         href: '#'
//     },
//     {
//         name: 'Power Presence Collection',
//         href: '#'
//     },
//     {
//         name: 'Shop All Workwear',
//         href: '#'
//     },
//     {
//         name: 'Gift Cards',
//         href: '#'
//     },

// ]
// const aboutUsLinks = [
//     {
//         name: 'Our Story',
//         href: '#'
//     },
//     {
//         name: "POV IN THE NEWS",
//         href: '#'
//     },
//     {
//         name: 'FREQUENTLY ASKED QUESTIONS',
//         href: '#'
//     },
//     {
//         name: 'POV BLOG',
//         href: '#'
//     },
//     {
//         name: 'Contact Us',
//         href: '#'
//     }
// ]

// const Header = () => {
//     const [isShopOpen, setIsShopOpen] = useState(false);
//     const [isAboutOpen, setIsAboutOpen] = useState(false);
//     // Refs to track the dropdown elements
//     const shopRef = useRef<HTMLButtonElement>(null);
//     const aboutRef = useRef<HTMLButtonElement>(null);

//     // Handle clicks outside the dropdown to close them
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             const target = event.target as Node;
//             if (
//                 shopRef.current &&
//                 !shopRef.current.contains(target) &&
//                 aboutRef.current &&
//                 !aboutRef.current.contains(target)
//             ) {
//                 setIsShopOpen(false);
//                 setIsAboutOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Toggle Shop dropdown
//     const toggleShopDropdown = () => {
//         setIsShopOpen((prev) => !prev);
//         setIsAboutOpen(false); // Close the other dropdown
//     };

//     // Toggle About Us dropdown
//     const toggleAboutDropdown = () => {
//         setIsAboutOpen((prev) => !prev);
//         setIsShopOpen(false); // Close the other dropdown
//     };
//     return (
//         <div><div className="bg-primary py-2.5 text-center text-[13px] tracking-wider">FREE SHIPPING ON ALL ORDERS</div>

//             {/* Navigation */}
//             <header className="  bg-secondary relative">
//                 <div className="mx-auto flex max-w-6xl px-4 py-7 xl:px-7 items-center justify-between relative">
//                     <nav className="hidden lg:flex items-center gap-8 ">
//                         <div className="group relative">
//                             <button ref={shopRef} className="flex items-center gap-1 text-sm text-white" onClick={toggleShopDropdown}>
//                                 <span className="border-b hover:underline underline-offset-2">SHOP</span> <ChevronDown className="h-4 w-4" />
//                             </button>

//                             {/* will add this hover menu later */}

//                         </div>
//                         <div className="group relative">
//                             <button ref={aboutRef} className="flex items-center gap-1 text-sm text-white/75 hover:text-white" onClick={toggleAboutDropdown}>
//                                 <span className="hover:border-b">ABOUT US</span> <ChevronDown className="h-4 w-4" />
//                             </button>
//                         </div>
//                         <Link href="#" className="text-sm text-white/75 hover:text-white hover:border-b">
//                             LOOKBOOKS
//                         </Link>
//                     </nav>
//                     <nav className="flex lg:hidden items-center ">
//                         <button aria-label="Cart" className="h-5 w-5 text-white">
//                             <Image src="/menu.svg" alt="Cart" width={100} height={100} />
//                         </button>
//                     </nav>
//                     <Link href="/" className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//                         <Image src="/logo.png" alt="Logo" width={90} height={60} />
//                     </Link>

//                     <div className="flex items-center gap-4">
//                         {/* <button aria-label="Search" className="w-5 h-5 text-white">
//                             <Image src="/search.svg" alt="Cart" width={100} height={100} />
//                         </button> */}
//                         {/* <button aria-label="Account" className="hidden lg:block text-white">
//                             <UserRound className="h-5 w-5" />
//                         </button> */}
//                         <button aria-label="Cart" className="h-5 w-5 text-gray-200">
//                             <Link href="https://pointofviewlabel.com/cart">
//                                 <Image src="/cart.svg" alt="Cart" width={100} height={100} />
//                             </Link>
//                         </button>
//                     </div>
//                 </div>
//                 {(isShopOpen || isAboutOpen) && (

//                     <div className="bg-secondary z-40 py-8 border-t absolute w-full ">
//                         <div className="max-w-6xl mx-auto  px-4 lg:px-7">
//                             <div className=" flex flex-col items-start gap-2 justify-start">
//                                 {isShopOpen &&
//                                     shopLinks.map((link) => (
//                                         <a
//                                             key={link.name}
//                                             href={link.href}
//                                             className="z-50 flex w-full text-sm font-medium text-muted/65 hover:text-white hover:underline underline-offset-1 tracking-wide uppercase"
//                                             onClick={() => setIsShopOpen(false)} // Close dropdown on link click
//                                         >
//                                             {link.name}
//                                         </a>
//                                     ))}

//                             </div>

//                             <div className=" flex flex-col items-start gap-2 justify-start">
//                                 {isAboutOpen && aboutUsLinks.map((link) => (
//                                     <Link
//                                         key={link.name}
//                                         href={link.href}
//                                         className="flex w-full text-sm font-medium text-muted/65 hover:text-white hover:underline underline-offset-1 tracking-wide uppercase"
//                                         onClick={() => setIsAboutOpen(false)} // Close dropdown on link click
//                                     >
//                                         {link.name}
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )
//                 }

//             </header>
//         </div>
//     )
// }

// export default Header


'use client';
import { useProductContext } from '@/hooks/useProduct';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const shopLinks = [
    { name: 'Dresses', href: 'https://pointofviewlabel.com/collections/work-dresses-for-women' },
    { name: 'Jackets', href: 'https://pointofviewlabel.com/collections/jackets' },
    { name: 'Pants & Skirts', href: 'https://pointofviewlabel.com/collections/pants-skirts' },
    { name: 'Power Suits', href: 'https://pointofviewlabel.com/collections/power-suits' },
    { name: 'Daily Dopamine Collection', href: 'https://pointofviewlabel.com/collections/daily-dopamine' },
    { name: 'Work to Wine Collection', href: 'https://pointofviewlabel.com/collections/work-to-wine' },
    { name: 'Power Presence Collection', href: 'https://pointofviewlabel.com/collections/power-presence' },
    { name: 'Shop All Workwear', href: 'https://pointofviewlabel.com/collections/all-workwear' },
    { name: 'Gift Cards', href: 'https://pointofviewlabel.com/products/gift-cards' },
];

const aboutUsLinks = [
    { name: 'Our Story', href: 'https://pointofviewlabel.com/pages/our-story' },
    { name: 'POV IN THE NEWS', href: 'https://pointofviewlabel.com/pages/pov-in-the-media' },
    { name: 'FREQUENTLY ASKED QUESTIONS', href: 'https://pointofviewlabel.com/pages/faq' },
    { name: 'POV BLOG', href: 'https://pointofviewlabel.com/blogs/pov' },
    { name: 'Contact Us', href: 'https://pointofviewlabel.com/pages/contact' },
];

const Header = () => {
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const shopRef = useRef<HTMLButtonElement>(null);
    const aboutRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { itemCount } = useProductContext();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                shopRef.current &&
                !shopRef.current.contains(target) &&
                aboutRef.current &&
                !aboutRef.current.contains(target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(target)
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

    const toggleShopDropdown = () => {
        setIsShopOpen((prev) => !prev);
        setIsAboutOpen(false);
    };

    const toggleAboutDropdown = () => {
        setIsAboutOpen((prev) => !prev);
        setIsShopOpen(false);
    };

    return (
        <div>
            <div className="bg-primary py-2.5 text-center text-[13px] tracking-wider">
                FREE SHIPPING ON ALL ORDERS
            </div>

            <header className="bg-secondary relative">
                <div className="mx-auto flex max-w-6xl px-4 py-6 xl:px-7 items-center justify-between relative">
                    <nav className="hidden lg:flex items-center gap-8">
                        <div className="group relative">
                            <button
                                ref={shopRef}
                                className="flex items-center gap-1 text-sm text-white"
                                onClick={toggleShopDropdown}
                            >
                                <span className="border-b hover:underline underline-offset-2">SHOP</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="group relative">
                            <button
                                ref={aboutRef}
                                className="flex items-center gap-1 text-sm text-white/75 hover:text-white"
                                onClick={toggleAboutDropdown}
                            >
                                <span className="hover:border-b">ABOUT US</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                        <Link
                            href="https://pointofviewlabel.com/pages/lookbooks"

                            className="text-sm text-white/75 hover:text-white hover:border-b pointer-events-auto"
                        >
                            LOOKBOOKS
                        </Link>
                    </nav>
                    <nav className="flex lg:hidden items-center">
                        <button aria-label="Menu" className="h-5 w-5 text-white">
                            <Image src="/menu.svg" alt="Menu" width={24} height={24} />
                        </button>
                    </nav>
                    <Link
                        href="https://pointofviewlabel.com"
                        className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    >
                        <Image src="/logo.png" alt="Logo" width={90} height={60} />
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <a
                                href="https://pointofviewlabel.com/cart"
                                aria-label="Cart"
                                className="h-5 w-5 text-gray-200 pointer-events-auto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image src="/cart.svg" alt="Cart" width={24} height={24} />
                            </a>
                            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-primary rounded-full">
                                {itemCount > 0 && itemCount || 0}
                            </span>
                        </div>
                    </div>
                </div>
                {(isShopOpen || isAboutOpen) && (
                    <div
                        ref={dropdownRef}
                        className="bg-secondary z-50 py-8 border-t absolute w-full pointer-events-auto"
                    >
                        <div className="max-w-6xl mx-auto px-4 lg:px-7">
                            {isShopOpen && (
                                <div className="flex flex-col items-start gap-2 justify-start">
                                    {shopLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="flex w-full text-sm font-medium text-muted/65 hover:text-white hover:underline underline-offset-1 tracking-wide uppercase pointer-events-auto"
                                            onClick={() => setIsShopOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {isAboutOpen && (
                                <div className="flex flex-col items-start gap-2 justify-start">
                                    {aboutUsLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            // target="_blank"
                                            // rel="noopener noreferrer"
                                            className="flex w-full text-sm font-medium text-muted/65 hover:text-white hover:underline underline-offset-1 tracking-wide uppercase pointer-events-auto"
                                            onClick={() => setIsAboutOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;