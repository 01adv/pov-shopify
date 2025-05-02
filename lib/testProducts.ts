type Reviews = {
  rating: number;
  comment: string;
  reviewer: string;
};
export interface TestProductType {
  id: number;
  name: string;
  collection: string;
  type: string;
  image: string;
  description: string;
  price: string;
  rating?: number;
  reviews?: Reviews[];
  badge?: {
    text: string;
    type: "selling-fast" | "sale" | "new" | "out-of-stock";
  };
  benefits?: string[];
  ingredients?: string[];
  shortened_benefit?: string;
}

export const products: TestProductType[] = [
  {
    id: 1,
    name: "Hydration Serum",
    collection: "daily-essentials",
    type: "serum",
    image:
      "https://plus.unsplash.com/premium_photo-1674739375749-7efe56fc8bbb?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A lightweight, fast-absorbing serum that restores and retains essential moisture for a dewy, plump complexion. Infused with hyaluronic acid and botanical extracts, it boosts skin elasticity and combats dryness, leaving your skin soft and radiant.",
    price: "$45.00",
    benefits: [
      "Boosts hydration with advanced hyaluronic acid technology",
      "Reinforces skin barrier to prevent moisture loss",
      "Visibly plumps and smooths fine lines over time",
    ],
    ingredients: [
      "Hyaluronic Acid: Retains moisture for deep hydration.",
      "Aloe Vera: Soothes and calms skin irritation.",
      "Niacinamide: Strengthens the skin barrier and reduces redness.",
    ],
    reviews: [
      {
        reviewer: "Sophia Lee",
        rating: 5,
        comment:
          "This serum has completely transformed my skin! It feels so lightweight yet provides deep hydration that lasts all day. I’ve been using it for a month, and my skin looks visibly plumper and healthier. Highly recommend for anyone with dry skin.",
      },
      {
        reviewer: "Emma Johnson",
        rating: 4,
        comment:
          "I love the texture and how quickly it absorbs into my skin. It’s perfect under makeup, and I’ve noticed a significant improvement in my skin’s moisture levels. The only downside is the price, but it’s worth it for the results.",
      },
    ],
    shortened_benefit:
      "Boosts hydration, Reinforces skin barrier, Plumps fine lines.",
  },
  {
    id: 2,
    name: "Glow Boost",
    collection: "daily-essentials",
    type: "serum",
    image:
      "https://cdn.pixabay.com/photo/2023/08/21/06/12/cosmetic-product-packaging-8203645_1280.jpg",
    description:
      "Elevate your skin’s natural luminosity with Glow Boost, an antioxidant-packed serum that brightens and evens your skin tone. Featuring a potent blend of vitamin C, niacinamide, and licorice root, it targets dark spots and delivers a healthy, youthful glow.",
    price: "$50.00",
    benefits: [
      "Improves skin clarity and radiance with vitamin C",
      "Reduces dark spots and hyperpigmentation over time",
      "Protects against environmental damage with antioxidants",
    ],
    ingredients: [
      "Vitamin C: Brightens skin and reduces dark spots.",
      "Niacinamide: Balances oil production and strengthens the skin barrier.",
      "Licorice Root Extract: Fades pigmentation and soothes irritation.",
    ],
    reviews: [
      {
        reviewer: "Liam Carter",
        rating: 5,
        comment:
          "The Glow Boost serum is a game-changer for me! My dull skin now has a natural radiance, and the dark spots I had are barely visible. The consistency is perfect, and it smells so refreshing. I will definitely repurchase.",
      },
      {
        reviewer: "Olivia Brown",
        rating: 4,
        comment:
          "This serum has noticeably evened out my skin tone. It feels luxurious, and I’ve received compliments on how bright my complexion looks. I just wish it came in a larger bottle.",
      },
    ],
    shortened_benefit: "Improves radiance, Reduces dark spots, Protects skin.",
  },
  {
    id: 3,
    name: "Rejuvenating Eye Cream",
    collection: "daily-essentials",
    type: "cream",
    image:
      "https://plus.unsplash.com/premium_photo-1674949802338-f94005eb5b0a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A luxurious eye cream that energizes and refreshes tired eyes. Formulated with caffeine, peptides, and hydrating botanicals, it minimizes the appearance of puffiness, fine lines, and dark circles for a smoother, brighter under-eye area.",
    price: "$35.00",
    benefits: [
      "Reduces puffiness with de-puffing caffeine technology",
      "Brightens and revives dull under-eyes",
      "Hydrates and softens the delicate skin around the eyes",
    ],
    ingredients: [
      "Caffeine: Reduces puffiness and tightens skin.",
      "Peptides: Stimulates collagen production for firmer skin.",
      "Chamomile Extract: Calms and soothes the under-eye area.",
    ],
    reviews: [
      {
        reviewer: "Ava Martinez",
        rating: 5,
        comment:
          "I’ve struggled with dark circles for years, and this eye cream has been a lifesaver! Within a week, I noticed the puffiness reducing, and my under-eye area looks so much brighter. It’s now a staple in my skincare routine.",
      },
      {
        reviewer: "Noah Wilson",
        rating: 4,
        comment:
          "The cream is very hydrating and works well for reducing puffiness. While it hasn’t completely eliminated my dark circles, there’s a noticeable improvement. A little goes a long way, so it’s great value for the price.",
      },
    ],
    shortened_benefit:
      "Reduces Puffiness, Brightens under-eyes, Hydrates delicate skin.",
  },
  {
    id: 5,
    name: "Daily Moisturizer",
    collection: "daily-essentials",
    type: "cream",
    image:
      "https://cdn.pixabay.com/photo/2019/12/23/01/16/cream-4713579_1280.jpg",
    description:
      "Our Daily Moisturizer is the perfect companion for soft, smooth, and hydrated skin throughout the day. Infused with ceramides, squalane, and shea butter, it locks in moisture while maintaining a lightweight, non-greasy texture suitable for all skin types.",
    price: "$30.00",
    benefits: [
      "Provides long-lasting hydration for up to 24 hours.",
      "Reinforces the skin barrier to combat environmental stressors.",
      "Absorbs quickly without leaving a greasy finish.",
    ],
    ingredients: [
      "Ceramides: Strengthen the skin barrier and lock in moisture.",
      "Squalane: Provides lightweight hydration without clogging pores.",
      "Shea Butter: Deeply nourishes and softens the skin.",
    ],
    reviews: [
      {
        reviewer: "Lucas Anderson",
        rating: 5,
        comment:
          "This moisturizer is perfect for everyday use. It’s lightweight and non-greasy, which is great for my combination skin. It keeps my skin hydrated all day without feeling heavy. Highly recommend!",
      },
      {
        reviewer: "Amelia Moore",
        rating: 4,
        comment:
          "I’ve been using this for a couple of weeks, and my skin feels much smoother. It absorbs quickly and doesn’t leave a shiny finish. The only drawback is that it doesn’t have SPF.",
      },
    ],
    shortened_benefit:
      "Long-lasting hydration, Reinforces skin barrier, Non-greasy.",
  },
  {
    id: 6,
    name: "Exfoliating Scrub",
    collection: "daily-essentials",
    type: "scrub",
    image:
      "https://cdn.pixabay.com/photo/2020/08/09/15/54/natural-cosmetics-5475877_1280.jpg",
    description:
      "Reveal radiant and refreshed skin with our gentle exfoliating scrub. Formulated with fruit enzymes, jojoba beads, and green tea extract, it removes dead skin cells, unclogs pores, and revitalizes your complexion without irritation.",
    price: "$20.00",
    benefits: [
      "Exfoliates gently without damaging the skin barrier.",
      "Unclogs pores to prevent breakouts and blackheads.",
      "Leaves skin visibly smoother, brighter, and refreshed.",
    ],
    ingredients: [
      "Fruit Enzymes: Naturally dissolve dead skin cells for gentle exfoliation.",
      "Jojoba Beads: Provide a mild physical exfoliation to smooth skin texture.",
      "Green Tea Extract: Rich in antioxidants to soothe and protect the skin.",
    ],
    reviews: [
      {
        reviewer: "Emily Roberts",
        rating: 5,
        comment:
          "This scrub is amazing! It’s gentle but very effective. My skin feels so smooth after using it, and it doesn’t irritate my sensitive skin. I use it twice a week, and I can see a big difference in my complexion.",
      },
      {
        reviewer: "James Clark",
        rating: 4,
        comment:
          "I like how it cleanses deeply without being too harsh. My pores feel cleaner, and my skin looks brighter. I wish it came in a bigger tube, though.",
      },
    ],
    shortened_benefit:
      "Gentle exfoliation, Unclogs pores, Smooths and brightens skin.",
  },
  {
    id: 7,
    name: "Refreshing Facial Toner",
    collection: "refreshing-toners",
    type: "toner",
    image:
      "https://cdn.pixabay.com/photo/2019/06/09/19/57/water-4262793_1280.jpg",
    description:
      "Balance and revitalize your skin with our alcohol-free Refreshing Facial Toner. Powered by rose water, witch hazel, and cucumber extract, this toner tightens pores, balances skin pH, and preps your complexion for a flawless finish.",
    price: "$28.00",
    benefits: [
      "Balances skin pH to maintain a healthy barrier.",
      "Tightens pores and minimizes their appearance.",
      "Gently removes residual impurities for clearer skin.",
    ],
    ingredients: [
      "Rose Water: Hydrates and soothes the skin.",
      "Witch Hazel: Tightens pores and reduces inflammation.",
      "Cucumber Extract: Calms and refreshes tired skin.",
    ],
    reviews: [
      {
        reviewer: "Charlotte Evans",
        rating: 5,
        comment:
          "This toner is a must-have in my skincare routine. It’s refreshing and leaves my skin feeling so clean and smooth. I’ve noticed my pores look smaller, and it doesn’t dry out my skin.",
      },
      {
        reviewer: "William King",
        rating: 4,
        comment:
          "A great toner for everyday use. It’s gentle and does a good job at removing any leftover makeup. My skin feels balanced after using it.",
      },
    ],
    shortened_benefit: "Balances pH, Tightens pores, Removes impurities.",
  },
  {
    id: 8,
    name: "Nourishing Shampoo",
    collection: "gentle-shampoos",
    type: "shampoo",
    image:
      "https://cdn.pixabay.com/photo/2021/11/24/23/19/bathroom-6822245_1280.jpg",
    description:
      "Transform your hair care routine with our Nourishing Shampoo, enriched with argan oil, keratin, and aloe vera. This sulfate-free formula gently cleanses, strengthens, and restores shine, leaving your hair soft, healthy, and manageable.",
    price: "$22.00",
    benefits: [
      "Strengthens and repairs hair from root to tip.",
      "Adds natural shine without weighing hair down.",
      "Sulfate-free formula suitable for daily use and sensitive scalps.",
    ],
    ingredients: [
      "Argan Oil: Deeply nourishes and restores shine.",
      "Keratin: Strengthens and repairs damaged hair fibers.",
      "Aloe Vera: Soothes the scalp and provides lightweight hydration.",
    ],
    reviews: [
      {
        reviewer: "Daniel Hall",
        rating: 5,
        comment:
          "This shampoo has been a game-changer for my hair! It feels stronger and looks shinier than ever. I love that it’s sulfate-free and gentle enough for daily use.",
      },
      {
        reviewer: "Ella Harris",
        rating: 4,
        comment:
          "My hair feels softer and more manageable after using this. The scent is lovely, and it’s great for someone like me with sensitive scalp issues.",
      },
    ],
    shortened_benefit: "Strengthens hair, Adds shine, Sulfate-free.",
  },
  {
    id: 9,
    name: "Jade Roller",
    collection: "daily-essentials",
    type: "Misc",
    image:
      "https://cdn.pixabay.com/photo/2022/07/04/23/59/jade-7302074_1280.jpg",
    description:
      "Elevate your skincare routine with our luxurious Jade Roller, crafted from 100% natural jade stone. This skincare tool improves circulation, reduces puffiness, and promotes lymphatic drainage, leaving your skin refreshed and radiant.",
    price: "$75.00",
    benefits: [
      "Stimulates blood circulation for a natural glow.",
      "Reduces puffiness and soothes facial tension.",
      "Enhances product absorption and improves skin texture.",
    ],
    ingredients: [
      "100% Natural Jade: Known for its cooling properties and ability to promote lymphatic drainage.",
    ],
    reviews: [
      {
        reviewer: "Lily Wright",
        rating: 5,
        comment:
          "I love using this Jade Roller as part of my morning routine. It feels so soothing and helps reduce puffiness around my eyes. My skin has a healthy glow after using it.",
      },
      {
        reviewer: "Ethan Scott",
        rating: 4,
        comment:
          "This roller is a great addition to my skincare routine. It’s relaxing to use, and I’ve noticed an improvement in my skin texture. It’s a bit pricey, but the quality is excellent.",
      },
    ],
    shortened_benefit:
      "Improves circulation, Reduces puffiness, Enhances absorption.",
  },
  {
    id: 10,
    name: "Clarifying Shampoo",
    collection: "gentle-shampoos",
    type: "shampoo",
    image:
      "https://cdn.pixabay.com/photo/2019/05/19/07/46/shampoo-4213395_1280.jpg",
    description:
      "Achieve a fresh, clean scalp with our Clarifying Shampoo, designed to remove product buildup and impurities without stripping moisture. Enriched with tea tree oil and aloe vera, it refreshes and balances your hair and scalp.",
    price: "$24.00",
    benefits: [
      "Deeply cleanses scalp and removes stubborn buildup.",
      "Balances moisture levels to prevent dryness.",
      "Safe for color-treated hair and gentle on the scalp.",
    ],
    ingredients: [
      "Tea Tree Oil: Provides deep cleansing and a refreshing feel.",
      "Aloe Vera: Soothes and hydrates the scalp.",
      "Panthenol: Strengthens hair and improves elasticity.",
    ],
    reviews: [
      {
        reviewer: "Zoe Adams",
        rating: 5,
        comment:
          "This shampoo has made such a difference in my hair care routine! My scalp feels cleaner, and it’s great for removing buildup from styling products. Perfect for occasional deep cleaning.",
      },
      {
        reviewer: "Jack Roberts",
        rating: 4,
        comment:
          "I like how it deeply cleanses without stripping my hair of moisture. My hair feels fresh and light after using it. I’ll definitely keep using this.",
      },
    ],
    shortened_benefit:
      "Deeply cleanses, Balances moisture, Safe for color-treated hair.",
  },
  {
    id: 11,
    name: "Brightening Toner",
    collection: "refreshing-toners",
    type: "toner",
    image:
      "https://cdn.pixabay.com/photo/2015/08/25/03/51/toner-906142_1280.jpg",
    description:
      "Transform your skincare routine with our Brightening Toner. Infused with vitamin C, licorice root, and witch hazel, this toner evens out skin tone, reduces the appearance of dark spots, and leaves your skin glowing with vitality.",
    price: "$30.00",
    benefits: [
      "Brightens and evens skin tone for a radiant complexion.",
      "Reduces dark spots and hyperpigmentation.",
      "Hydrates and balances skin pH for a healthy glow.",
    ],
    ingredients: [
      "Vitamin C: Brightens skin and fights free radicals.",
      "Licorice Root: Reduces discoloration and soothes irritation.",
      "Witch Hazel: Minimizes pores and refines skin texture.",
    ],
    reviews: [
      {
        reviewer: "Chloe Watson",
        rating: 5,
        comment:
          "This toner has significantly brightened my complexion. It’s gentle yet effective, and I’ve noticed a visible reduction in dark spots. Highly recommend!",
      },
      {
        reviewer: "Benjamin Walker",
        rating: 4,
        comment:
          "I’ve been using this toner for a few weeks, and my skin tone looks more even. It’s lightweight and absorbs quickly. It’s a great addition to my skincare routine.",
      },
    ],
    shortened_benefit: "Brightens skin tone, Reduces dark spots, Hydrates.",
  },
  {
    id: 12,
    name: "Herbal Shampoo",
    collection: "gentle-shampoos",
    type: "shampoo",
    image:
      "https://cdn.pixabay.com/photo/2023/12/04/15/14/bottle-8429706_1280.jpg",
    description:
      "Nourish and cleanse your hair with our Herbal Shampoo, infused with botanical extracts and essential oils. This gentle formula strengthens roots, restores shine, and leaves your hair feeling naturally refreshed.",
    price: "$19.00",
    benefits: [
      "Strengthens hair from the roots to reduce breakage.",
      "Restores natural shine for healthier-looking hair.",
      "Gentle formula suitable for sensitive scalps.",
    ],
    ingredients: [
      "Botanical Extracts: Provide essential nutrients for hair health.",
      "Coconut Oil: Deeply nourishes and adds shine.",
      "Aloe Vera: Hydrates and soothes the scalp.",
    ],
    reviews: [
      {
        reviewer: "Grace Young",
        rating: 5,
        comment:
          "This herbal shampoo is amazing! My hair feels softer and healthier after every wash. The natural scent is a bonus. It’s now my go-to shampoo.",
      },
      {
        reviewer: "Michael Turner",
        rating: 4,
        comment:
          "I like how gentle this shampoo is on my hair. It lathers well and leaves my scalp feeling clean. It’s a great value for the price.",
      },
    ],
    shortened_benefit: "Strengthens roots, Restores shine, Gentle formula.",
  },
  {
    id: 13,
    name: "Gentle Hair Mask",
    collection: "gentle-shampoos",
    type: "shampoo",
    image:
      "https://cdn.pixabay.com/photo/2017/09/28/06/50/oil-discharge-2794477_1280.jpg",
    description:
      "Replenish and rejuvenate your hair with our Gentle Hair Mask. This deeply hydrating mask reduces frizz, repairs damage, and restores shine, leaving your hair smooth, silky, and healthy-looking.",
    price: "$35.00",
    benefits: [
      "Provides deep hydration to combat dryness and frizz.",
      "Repairs and strengthens hair for improved elasticity.",
      "Restores natural shine for a polished finish.",
    ],
    ingredients: [
      "Argan Oil: Deeply moisturizes and tames frizz.",
      "Keratin: Repairs damage and strengthens hair strands.",
      "Shea Butter: Provides intense hydration and nourishment.",
    ],
    reviews: [
      {
        reviewer: "Hannah Wright",
        rating: 5,
        comment:
          "This hair mask is a lifesaver for my dry, frizzy hair. It leaves my hair feeling so soft and manageable. I use it once a week, and the results are fantastic.",
      },
      {
        reviewer: "Matthew Carter",
        rating: 4,
        comment:
          "The mask works well for reducing frizz and adding shine to my hair. It’s very hydrating and smells great. I just wish the jar was a bit larger.",
      },
    ],
    shortened_benefit: "Deep hydration, Repairs damage, Restores shine.",
  },
  {
    id: 14,
    name: "Herbal Body Wash",
    collection: "daily-essentials",
    type: "Body wash",
    image:
      "https://cdn.pixabay.com/photo/2019/06/30/10/02/soap-4307709_1280.jpg",
    description:
      "Begin your day with the invigorating scent of our Herbal Body Wash. Formulated with plant-based cleansers and essential oils, it gently cleanses, hydrates, and revitalizes your skin, leaving it soft, fresh, and glowing.",
    price: "$18.00",
    benefits: [
      "Provides a gentle yet thorough cleanse for all skin types.",
      "Infused with natural botanicals to hydrate and refresh.",
      "Leaves a lingering herbal aroma for an energizing start to your day.",
    ],
    ingredients: [
      "Aloe Vera: Hydrates and soothes the skin.",
      "Coconut-Based Cleansers: Provide a gentle and effective cleanse.",
      "Essential Oils: Add a refreshing scent and nourish the skin.",
    ],
    reviews: [
      {
        reviewer: "Harper Bell",
        rating: 5,
        comment:
          "I absolutely love this body wash! It leaves my skin feeling clean and moisturized without any residue. The herbal scent is so refreshing and energizing.",
      },
      {
        reviewer: "Alexander Davis",
        rating: 4,
        comment:
          "This body wash is great for daily use. It’s gentle on my skin and perfect for keeping my skin hydrated all day.",
      },
    ],
    shortened_benefit: "Gentle cleanse, Hydrates, Refreshing herbal aroma.",
  },
  {
    id: 15,
    name: "Repairing Night Cream",
    collection: "daily-essentials",
    type: "cream",
    image:
      "https://cdn.pixabay.com/photo/2018/06/25/13/00/cream-3496778_1280.jpg",
    description:
      "Wake up to radiant and healthier skin with our Repairing Night Cream. Enriched with peptides, hyaluronic acid, and ceramides, it works overnight to repair damage, deeply hydrate, and enhance skin elasticity for a smoother, younger-looking complexion.",
    price: "$40.00",
    benefits: [
      "Repairs skin overnight for a rejuvenated appearance.",
      "Locks in moisture to keep skin hydrated through the night.",
      "Non-greasy formula ensures comfort for all skin types.",
    ],
    ingredients: [
      "Peptides: Stimulate collagen production for firmer skin.",
      "Hyaluronic Acid: Provides deep hydration and plumps skin.",
      "Ceramides: Strengthen the skin barrier to retain moisture.",
    ],
    reviews: [
      {
        reviewer: "Alexa Green",
        rating: 5,
        comment:
          "This night cream has been a game-changer for my skin. I wake up every morning with hydrated, plump, and glowing skin. It has significantly lightened my acne scars and improved my skin texture over time. The non-greasy formula is perfect for someone like me with combination skin.",
      },
      {
        reviewer: "Serena White",
        rating: 2,
        comment:
          "Unfortunately, this cream didn’t work well for my sensitive skin. It caused redness and irritation after a few nights of use. While it feels nice initially, the fragrance is too strong for my liking. I had to discontinue using it.",
      },
    ],
    shortened_benefit: "Repairs skin overnight, Locks in moisture, Non-greasy.",
  },
  {
    id: 16,
    name: "Vitamin C Serum",
    collection: "daily-essentials",
    type: "serum",
    image:
      "https://cdn.pixabay.com/photo/2018/02/19/10/20/cosmetic-oil-3164684_1280.jpg",
    description:
      "Illuminate your complexion with our potent Vitamin C Serum. Powered by a blend of vitamin C, ferulic acid, and hyaluronic acid, it brightens dark spots, evens skin tone, and protects against environmental stressors for visibly radiant skin.",
    price: "$55.00",
    benefits: [
      "Brightens the complexion and reduces dark spots.",
      "Provides antioxidant protection against free radicals.",
      "Boosts hydration and promotes an even skin tone.",
    ],
    ingredients: [
      "Vitamin C: Brightens skin and fades pigmentation.",
      "Ferulic Acid: Enhances antioxidant efficacy to protect skin.",
      "Hyaluronic Acid: Hydrates and plumps skin for a smoother texture.",
    ],
    reviews: [
      {
        reviewer: "Anushri Patel",
        rating: 5,
        comment:
          "The Vitamin C Serum is by far the best I’ve used! My dark spots have lightened visibly within three weeks of use. The serum absorbs quickly, and my skin looks radiant and healthier. I also appreciate the antioxidant properties that keep my skin protected throughout the day.",
      },
      {
        reviewer: "Edward Jones",
        rating: 3,
        comment:
          "While the serum does brighten my skin slightly, I haven’t noticed significant improvement in my dark spots. It’s a bit sticky, which makes it hard to layer with other products. For the price, I expected better results.",
      },
    ],
    shortened_benefit:
      "Brightens complexion, Antioxidant protection, Boosts hydration.",
  },
];
