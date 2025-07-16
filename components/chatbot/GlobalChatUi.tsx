'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AssistantChat } from './Assistant';
import CollectionHeadline from '@/app/collections/[slug]/getHeadlines';
import { useProductContext } from '@/hooks/useProduct';
import { ChevronUp } from 'lucide-react';

const GlobalChatUi = () => {
    const pathname = usePathname();
    const { title } = useProductContext();
    const productsDetailsPage = pathname.startsWith('/products/')

    const [collapse, setCollapse] = useState(false);

    const [topNotVisible, setTopNotVisible] = useState(false);

    const handleScroll = () => {
        const y = window.scrollY;
        // setScrollPosition(y);
        setTopNotVisible(y > 121.1919);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!topNotVisible) setCollapse(false);
    }, [topNotVisible]);



    return (
        <>
            <div className={`z-40 bg-white w-full max-md:fixed max-md:bottom-1 mx-auto max-w-6xl px-4 sm:px-12 xl:px-12 ${productsDetailsPage && 'sticky md:-top-2  transition-all duration-500 ease-in-out '} md:pt-2`}>


                {pathname === '/all-workwear' && <div className="hidden md:block md:space-y-5 ">
                    <h1 className="text-[40px]">All Workwear</h1>
                    {/* <div className="block md:hidden"><ChatBot /></div> */}
                    <p className=" text-muted-foreground/75 max-w-md lg:max-w-3xl md:text-lg tracking-wide">
                        As seen on TV, functional workwear with POCKETS for women! Designer
                        corporate wear without the designer price. #pocketspledge
                    </p>
                </div>}
                {pathname.startsWith('/collections/') && <div className="hidden md:flex">
                    <CollectionHeadline />
                </div>
                }
                {
                    pathname === '/recommended' && <div className="hidden md:block text-center">
                        <div className="space-y-5 mt-8 max-md:z-40 bg-white pb-1">

                            <h1 className="text-xl md:text-2xl text-center">{title}</h1>
                        </div>
                    </div>
                }
                {pathname.startsWith('/products/') && <div className="hidden md:block">

                </div>
                }

                <div >
                    <div className={`transition-all duration-500 ease-in-out ${(collapse) ? 'hidden opacity-0' : 'block mt-4 opacity-100'}`}>
                        <AssistantChat />
                    </div>
                    {productsDetailsPage &&
                        <div onClick={() => setCollapse(!collapse)}
                            className={`hidden md:flex hover:cursor-pointer mx-2 rounded-b-full hover:bg-gray-100 items-center justify-center transition-all duration-500 ease-in-out 
                ${(topNotVisible || collapse) ? 'block pt-0.5 opacity-100' : 'hidden opacity-0'}`}>
                            <ChevronUp className={`transition-all text-gray-600 duration-500 ease-in-out ${collapse ? 'rotate-180 size-6' : 'rotate-0 size-5'}`} strokeWidth={3} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default GlobalChatUi
