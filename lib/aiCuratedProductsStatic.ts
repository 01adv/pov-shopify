export type AiProducts = {
  href: string;
  name: string;
  image: string;
  variantId: string;
};

export type StaticNudges = {
  variantId: string;
  product_name: string;
  styling_tips: string[];
  why_youll_love_it: string[];
};

export const aiCuratedProducts: AiProducts[] = [
  {
    variantId: "50006520922415",
    href: "/prestige-peplum-jacket-with-satin-block?variant=50006520922415",
    name: "Prestige Peplum Jacket with Satin block",
    image:
      "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/prestige-peplum-jacket-with-satin-block-jackets-361484.jpg?v=1728868256",
  },
  {
    variantId: "50006518759727",
    href: "/focus-fit-and-flare-dress-with-cross-belt?variant=50006518759727",
    name: "Focus Fit and Flare Dress with Cross Belt",
    image:
      "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/focus-fit-and-flare-with-cross-belt-dress-dress-289552.jpg?v=1728868018",
  },
  {
    variantId: "48557010059567",
    href: "/resilience-sheath-dress?variant=48557010059567",
    name: "Resilience Sheath Dress",
    image:
      "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/resilience-sheath-dress-dress-958230.jpg?v=1728868249",
  },
  {
    variantId: "48166993527087",
    name: "Vision Flare Crepe Midi Dress",
    href: "/vision-flare-crepe-midi-dress?variant=48166993527087",
    image:
      "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/vision-flare-crepe-midi-dress-dress-783062.jpg?v=1728868392",
  },
  {
    variantId: "50448118448431",
    href: "/eternal-double-breasted-jacket-limited-edition?variant=50448118448431",
    name: "Eternal Double Breasted Jacket - Limited Edition",
    image:
      "https://cdn.shopify.com/s/files/1/0777/2556/5231/files/eternal-double-breasted-tweed-jacket-limited-edition-jackets-443844.jpg?v=1728868012",
  },
];

export const staticNudges: StaticNudges[] = [
  {
    variantId: "50006520922415",
    product_name: "Prestige Peplum Jacket",
    styling_tips: [
      "Pair with tailored satin pants and pointy pumps for CEO glow 👠",
      "Layer over a slip dress to pinch that waist ✨",
      "Team with distressed jeans for fancy-casual brunch drama 🥂",
    ],
    why_youll_love_it: [
      "Satin peplum nips the waist, serving hourglass",
      "Soft yet structured fabric keeps you comfy through marathon days",
    ],
  },
  {
    variantId: "50006518759727",
    product_name: "Focus Fit & Flare Dress",
    styling_tips: [
      "Team with white sneakers and a denim jacket 🎡",
      "Swap in a fitted blazer and pumps for office polish 🏢",
      "Add metallic heels and statement jewels for night sparkle 🌙",
    ],
    why_youll_love_it: [],
  },
  {
    variantId: "48557010059567",
    product_name: "Resilience Sheath Dress",
    styling_tips: [
      "Layer a sharp blazer for CEO glow 💼",
      "Belt the red and white for city photo-ready 💃",
      "Slip on sneakers and dance 'til late 🚶",
    ],
    why_youll_love_it: [
      "Sculpted cut skims curves and boosts confidence",
      "Crease-resistant knit keeps you in place",
    ],
  },
  {
    variantId: "48166993527087",
    product_name: "Vision Flare Crepe Midi Dress",
    styling_tips: [
      "Pair with strappy heels for wedding-guest twirls 💃",
      "Add a cropped denim jacket for market strolls 🧺",
      "Belt it and slip on ankle boots for fall festivals 🍂",
    ],
    why_youll_love_it: [
      "Flared skirt floats as you walk—picture-perfect movement",
      "Wrinkle-resistant crepe keeps you flawless all day",
    ],
  },
  {
    variantId: "50448118448431",
    product_name: "Eternal Double-Breasted Jacket",
    styling_tips: [
      "Pair with tailored slacks and polished loafers 🏆",
      "Team with high-waist jeans and a white tee 😎",
      "Drape over a satin slip dress for like vibes ✨",
    ],
    why_youll_love_it: [
      "Sharp lapels frame your silhouette like a boss",
      "Quality tweed keeps you cozy and racking up compliments",
    ],
  },
];
