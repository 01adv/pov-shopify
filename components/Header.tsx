

'use client';
import { ChevronDown, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { logEvent } from '@/lib/logger';
import { useProductContext } from '@/hooks/useProduct';

const shopLinks = [
    { name: 'New Collections', href: '/collections/resilience-tailored' },
    { name: 'Summer Dresses', href: '/collections/dresses' },
    { name: 'Blazers', href: '/collections/jackets' },
    { name: 'Pants & Skirts', href: '/collections/pants' },
    { name: 'Power Suits', href: '/collections/suits' },
    // { name: 'Shop All Workwear', href: '/' },
];

const aboutUsLinks = [
    { name: 'Our Story', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Test', href: '/test2' },
];

const Header = () => {
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const shopRef = useRef<HTMLButtonElement>(null);
    const aboutRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { itemCount } = useProductContext();

    const handleAIGenClicked = () => {
        logEvent("clicks", {
            event: "ai_gen_btn_click",
            tags: ["click", "product", "recommended"],
            source: "chatbot.recommendation",
        });
    }

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

    // New useEffect to handle body scroll locking
    useEffect(() => {
        if (isSidebarOpen) {
            // Lock body scroll
            document.body.style.overflow = 'hidden';
            // Optionally, prevent touchmove on body (for iOS)
            document.body.style.touchAction = 'none';
        } else {
            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isSidebarOpen]);

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
            <div className="bg-primary py-3 text-center text-[13px] tracking-wider">
                FREE SHIPPING ON ALL ORDERS
            </div>

            <header className="bg-secondary relative">
                <div className="mx-auto flex max-w-6xl px-6 py-6 xl:px-7 items-center justify-between relative">
                    <nav className="hidden lg:flex items-center gap-8">
                        <div className="group relative">
                            <Link
                                href="/all-workwear"
                            >
                                <button
                                    className="flex items-center gap-1 text-sm text-white"
                                >
                                    <span className="uppercase underline underline-offset-4">All WorkWear</span>
                                </button>
                            </Link>
                        </div>
                        <div className="group relative">
                            <button
                                ref={shopRef}
                                className="flex items-center gap-1 text-sm text-white"
                                onClick={toggleShopDropdown}
                            >
                                <span className=" group-hover:underline group-hover:underline-offset-4">SHOP</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                        {/* <div className="">
                            <Link
                                href="/"
                                className="text-sm text-white uppercase pointer-events-auto"
                            >
                                All Workwear
                            </Link>
                        </div> */}
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
                    </nav>
                    <nav className="flex lg:hidden items-center">
                        {isSidebarOpen ? <button
                            className="self-end text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="" strokeWidth={1} size={32} />
                        </button> :
                            <button aria-label="Menu" className="h-5 w-5 text-white" onClick={() => setIsSidebarOpen(true)}>
                                <Image src="/menu.svg" alt="Menu" width={24} height={24} />
                            </button>
                        }

                    </nav>
                    <Link
                        href="/all-workwear"
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
                        {/* <div className="text-white" onClick={handleSwitchToText}><Text /></div> */}
                        <div className="group relative" onClick={handleAIGenClicked}>
                            <Link href="/ai-curation">
                                <Button
                                    variant={"outline"}
                                    className="flex items-center gap-1 text-sm bg-[#FEE6EA1A] text-primary border border-[rgba(251,144,162,1)] rounded-full hover:bg-primary/20 hover:text-primary/80 hover:border-[rgba(251,144,162,0.8)] transition-all duration-300"
                                    style={{
                                        boxShadow: "0px 0px 4px 4px rgba(251, 144, 162, 0.3)", // Updated to match Figma
                                    }}
                                >
                                    <Sparkles className="h-6 w-6" />
                                    <span className="hidden md:flex uppercase items-center">Your AI Curated Picks</span>
                                    <span className="flex md:hidden uppercase items-center text-xs"> AI Picks</span>
                                </Button>
                            </Link>
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
            {isSidebarOpen && (
                <>
                    <div className="absolute w-full h-full bg-secondary z-50 shadow-lg p-8 flex flex-col gap-4 md:hidden">


                        <div className="flex flex-col gap-2">
                            <span className="text-white uppercase text-lg">Shop</span>
                            <Link href="/all-workwear" onClick={() => setIsSidebarOpen(false)} >
                                <span className="text-muted/75 text-sm uppercase">All workwear</span>
                            </Link>
                            {shopLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-muted/75 hover:text-white text-sm uppercase"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                        </div>

                        <div className="flex flex-col gap-2 mt-4 ">
                            <span className="text-white uppercase text-lg">About Us</span>
                            {aboutUsLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-muted/75 hover:text-white text-sm uppercase"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;