// The website menu is a photographed selection, not the full menu.
// An item appears here only when it is on the approved printed menu
// (public/lionsden-menu.pdf) AND the shop has supplied a photo that clearly
// shows it. Names, descriptions, sizes and prices are copied from that PDF.
// Everything else stays on the PDF and on PHOTO_SHOT_LIST.md → "Needs Photos".

export type MenuImage = {
  /** Local file in public/images/menu */
  src: string;
  /** What is visible in the photo */
  alt: string;
  /** CSS object-position that keeps the named item in frame when cropped */
  focus?: string;
};

export type MenuItem = {
  slug: string;
  name: string;
  price: number;
  description: string;
  sizes?: Record<string, number>;
  image: MenuImage;
};
export type MenuGroup = { title: string; items: MenuItem[] };

const sizes = (a: number, b: number, c: number) => ({
  "12 oz": a,
  "16 oz": b,
  "20 oz": c,
});

export const menu: Record<string, MenuGroup[]> = {
  Coffee: [
    {
      title: "Lattes",
      items: [
        {
          slug: "classic-latte",
          name: "Classic Latte",
          price: 5.25,
          description: "The classic. Additional flavors available.",
          sizes: sizes(5.25, 6.89, 7.25),
          image: {
            src: "/images/menu/classic-latte-red-cups.webp",
            alt: "Three hot espresso drinks with rosetta latte art in red cups and saucers",
          },
        },
      ],
    },
  ],
  "Not Coffee": [
    {
      title: "Tea & Frozen",
      items: [
        {
          slug: "matcha-latte",
          name: "Matcha Latte",
          price: 5.25,
          description: "Matcha latte, served iced or hot.",
          sizes: sizes(5.25, 6.69, 7.99),
          image: {
            src: "/images/menu/iced-matcha-latte.webp",
            focus: "50% 45%",
            alt: "Hand holding an iced green matcha drink in a Lions Den Coffee cup against green hedges",
          },
        },
        {
          slug: "smoothies",
          name: "Smoothies",
          price: 5.99,
          description: "Strawberry, Mango, Tropical, or Harvest Green.",
          sizes: { ...sizes(5.99, 6.99, 7.99), "24 oz": 8.99 },
          image: {
            src: "/images/menu/strawberry-smoothies.webp",
            alt: "Two pink blended smoothies in Lions Den Coffee Shop cups, each garnished with a fresh strawberry",
          },
        },
      ],
    },
  ],
  Breakfast: [
    {
      title: "Sandwiches",
      items: [
        {
          slug: "the-inferno",
          name: "The Inferno",
          price: 7,
          description:
            "Homemade Calabrian aioli, fresh jalapeños, egg, bacon, and pepperjack cheese.",
          image: {
            src: "/images/menu/the-inferno-breakfast-sandwich.webp",
            focus: "35% 80%",
            alt: "Toasted breakfast sandwich cut in half, showing egg, bacon, sliced jalapeños and melted cheese, with an iced coffee behind it",
          },
        },
        {
          slug: "the-california",
          name: "The California",
          price: 7.5,
          description: "Mashed avocado, sliced tomato, egg, and cheese.",
          image: {
            src: "/images/menu/the-california-breakfast-sandwich.webp",
            focus: "40% 75%",
            alt: "Breakfast sandwich cut in half, showing avocado spread, tomato, egg and melted cheese, with an iced coffee behind it",
          },
        },
      ],
    },
  ],
  Lunch: [
    {
      title: "Paninis",
      items: [
        {
          slug: "chicken-and-pesto",
          name: "Chicken & Pesto",
          price: 13,
          description:
            "Fire-roasted chicken, house-made Italian pesto, roasted red peppers, and fresh mozzarella.",
          image: {
            src: "/images/menu/chicken-pesto-panini.webp",
            focus: "55% 80%",
            alt: "Grilled panini cut in half, showing chicken, pesto, red peppers and mozzarella, beside an iced coffee on the patio",
          },
        },
      ],
    },
  ],
};

// AFTER DARK: TODO: confirm renewed permit with client before adding a cocktail block.
