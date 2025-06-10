import Image from "next/image"
import Link from "next/link"

export default function OurStoryPage() {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <section className="py-8 pb-16 text-center">
                <h1 className="text-[30px] lg:text-[40px] tracking-tight mb-6">
                    Join the Pockets Pledge™ Movement
                </h1>
                <div className="max-w-3xl px-12 mx-auto">
                    <p className=" text-muted-foreground ">
                        Point Of View has started a movement that stands for non-negotiable equality starting with pockets and
                        paychecks. With functional, feminine and fearless workwear for women we have smartphone pockets in every
                        piece we make.
                    </p>
                </div>
            </section>

            {/* Pockets Pledge Section */}
            <section className="grid md:grid-cols-2 items-center py-4 md:py-2">
                <div className="relative aspect-video md:h-full w-full">
                    <Image
                        src="/story/1.png"
                        alt="Pockets Pledge Movement"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="flex flex-col justify-center space-y-6 px-4 md:px-8 md:py-10">
                    <h2 className="text-[30px] lg:text-[40px]">Why Pockets?</h2>
                    <div className="">
                        <p className="">
                            We&apos;re on a mission to end &quot;pockets inequality&quot; for women. The statistics are staggering: only 5% of
                            women&apos;s pockets can fit a smartphone, compared to 85% of men&apos;s pockets.
                        </p>
                        <p className="">
                            &#34;If you need to step out today, all you need is a phone and card to get anything done. Pockets can enable
                            that.&#34;
                        </p>
                        <p className="">
                            Point of View has launched a movement, known as the &apos;Pockets Pledge&apos; by creating pieces that combine
                            designer style with the practicality of pockets (and more).
                        </p>
                    </div>
                    <div>
                        <Link
                            href="https://www.change.org/p/pockets-pledge-demanding-functional-pockets-for-women-s-apparel"
                            className="inline-block border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                        >
                            Sign the Petition
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Dream Section */}
            <section className="grid md:grid-cols-2  items-center py-4 md:py-2">
                <div className="flex flex-col justify-center space-y-6 px-4 md:px-8 md:order-1 order-2 md:py-10">
                    <h2 className="text-[30px] lg:text-[40px]">Our Dream</h2>
                    <p className="">Functional. Feminine. Fearless</p>
                    <div className="">
                        <p className="">
                            Studies have found that a woman&apos;s ability to make a strong sartorial statement impacts her confidence, her
                            professional progress and ultimately her earnings.
                        </p>
                        <p className="">
                            We believe that great ideas come to life when women bring their authentic selves to the world. For working
                            women everywhere, POV aims to create a powerful form of self- presentation that helps women to show up,
                            feel confident, and perform as their best selves at work.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="https://pointofviewlabel.com/pages/pov-in-the-media"
                            className="inline-block border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                        >
                            See More
                        </Link>
                    </div>
                </div>
                <div className="relative aspect-video md:h-full w-full md:order-2 order-1">
                    <Image
                        src="/story/2.png"
                        alt="Woman in pink professional attire"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </section>

            {/* Our Clothes Section */}
            <section className="grid md:grid-cols-2 items-center py-4 md:py-2">
                <div className="relative aspect-video md:h-full w-full">
                    <Image
                        src="/story/3.png"
                        alt="Woman in black dress with feature callouts"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="flex flex-col justify-center space-y-6 px-4 md:px-8 md:py-10">
                    <h2 className="text-[30px] lg:text-[40px]">Our Clothes</h2>
                    <div className="">
                        <p className="">
                            Women put their professional attire through a lot: hustling to and from their desks, balancing various
                            gadgets with filled-to-the-brim coffee cups, and keeping their outfit as crisp for that 6 pm happy hour as
                            the 9 am board meeting or the 3 p.m. parent-teacher meet.
                        </p>
                        <p className="">
                            We are committed to providing our customers with &apos;purpose dressing&apos; options-stylish yet functional,
                            movement-friendly pieces that project confidence and competence. When POV creates a piece of clothing, we
                            make sure it encompasses three things: functional details (think: adjustable hems and bra-strap holders);
                            comfort (and not just comfortable-for-a- blazer comfort—we strive for I-could-nap-in-this comfort); and
                            style—so you can be the most chic, polished person in every room you enter.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/collections/workwear"
                            className="inline-block border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                        >
                            Shop Workwear
                        </Link>
                    </div>
                </div>
            </section>

            {/* our team */}
            <section className="grid md:grid-cols-2 items-center py-4 md:py-2">
                <div className="flex flex-col justify-center space-y-6 px-4 md:px-8 md:order-1 order-2 md:py-10">
                    <h2 className="text-[30px] lg:text-[40px]">Our Team</h2>
                    {/* <p className="text-lg font-medium text-gray-700">Functional. Feminine. Fearless</p> */}
                    <div className="">
                        <p className="">
                            POV is a story by Aditi Sinha and Sakina Adeeb - friends, global citizens and creators. Aditi&apos;s first love is making deep connections with people. The seeds of a workwear brand that fuses substance with style were sown through infinite 1-o-1&apos;s with her women friends and colleagues over the years across continents.
                        </p>
                        <br />
                        <p className="">
                            Sakina sewed her first ever garment when she was 9. While her career took flight in big tech, she&apos;s always dreamt of being an entrepreneur and creating magic. She rekindles her original passion through POV.


                        </p>
                    </div>
                    <div>
                        <Link
                            href="https://pointofviewlabel.com/blogs/pov-promises-the-ultimate-power-move-pockets"
                            className="inline-block border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
                <div className="relative aspect-video md:h-full w-full md:order-2 order-1">
                    <Image
                        src="/story/4.png"
                        alt="Woman in pink professional attire"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </section>
        </div>
    )
}
