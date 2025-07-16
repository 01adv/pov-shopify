import { usePathname } from 'next/navigation';

// Define a type for our collection metadata
type CollectionMetadata = {
    title: string;
    description: string;
    tags: string[];
};

// Map slugs to their metadata
const collectionsData: Record<string, CollectionMetadata> = {
    'dresses': {
        title: 'Work Dresses for Women',
        description: 'Browse Point of View Label’s stunning Work Dresses for Women, perfect for casual outings, workdays, or special events. From timeless classics to modern silhouettes, find styles that suit your unique taste. Redefine your wardrobe with effortlessly chic options—shop now!',
        tags: ['Dress', 'Dresses'],
    },
    'jackets': {
        title: 'Womens Workwear Blazers',
        description: "Explore our collection of designer Women's Workwear Blazers at Point of View Label. From chic casual designs to elegant statement pieces, find the perfect fit for your wardrobe.",
        tags: ['Jacket', 'Jackets'],
    },
    'pants': {
        title: 'Dress Pants for Women',
        description: 'Explore Point of View Label’s collection of versatile Dress Pants for Women, designed to elevate your wardrobe. From tailored trousers to relaxed fits, find pieces that blend comfort and sophistication. Perfect for any occasion—shop your favorites today!',
        tags: ['Pant', 'Pants', 'skirt', 'skirts'],
    },
    'suits': {
        title: 'WOMENS POWER SUIT',
        description: 'Discover Point of View Label’s curated womens power suit combining chic style with unbeatable value. These versatile combos are perfect for effortless outfits and smart savings. Refresh your wardrobe while staying on budget!',
        tags: ['bundles'],
    },
    'resilience-tailored': {
        title: 'Resilience, Tailored',
        description: 'We dress not just to show up. but to take up space. We rise, in pressed suits and steady shoes, not despite the storm, but through it. This is for the women who don’t flinch. Who tighten their belts, square their shoulders, and walk on. Resilient.',
        tags: ['wbs2025'],
    },
};

export default function CollectionHeadline() {
    const pathname = usePathname();
    const collectionInfo = collectionsData[pathname.split('/').pop() ?? ''];

    if (!collectionInfo) {
        return <div>Not found</div>; // Or redirect to a generic collections page or 404
    }

    return (
        <div className="space-y-5 my-4 max-md:sticky top-0 max-md:z-40 bg-white pb-1">
            {/* <h1 className="text-[30px] lg:text-[40px]">{collectionInfo.title}</h1> */}
            <h1 className="text-[40px]">{collectionInfo.title}</h1>
            <p className=" text-muted-foreground/75 max-w-lg xl:max-w-3xl xl:pr-12 md:text-lg tracking-wide ">
                {collectionInfo.description}
            </p>
        </div>

    );
}