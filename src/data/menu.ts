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
  /** Shown instead of `price` when the PDF prints more than one price
   *  without saying what each is for (copy it exactly as printed). */
  priceText?: string;
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
          slug: "sausage-or-bacon-egg-and-cheese",
          name: "Sausage or Bacon, Egg, & Cheese",
          price: 6.49,
          description:
            "Your choice of bread: hard roll, English muffin (+$0.50), croissant (+$0.75), or plain, everything, asiago, or sesame bagel. Cheese: American, cheddar, pepperjack, or Swiss.",
          image: {
            src: "/images/menu/bacon-egg-cheese-everything-bagel.webp",
            focus: "40% 70%",
            alt: "Bacon, egg and cheese on an everything bagel, cut in half on a white plate, with a Lions Den Coffee Shop cup behind it",
          },
        },
        {
          slug: "lox-bagel",
          name: "Lox Bagel",
          price: 9,
          priceText: "$9.00 / $17.00",
          description:
            "Homemade dill cream cheese, topped with smoked salmon, capers, and red onions.",
          image: {
            src: "/images/menu/lox-bagel.webp",
            focus: "45% 60%",
            alt: "Two open bagel halves spread with herbed cream cheese and topped with smoked salmon, capers and diced red onion, on a plate with arugula",
          },
        },
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
        {
          slug: "southern-sunrise",
          name: "Southern Sunrise",
          price: 10.5,
          description:
            "Breaded chicken cutlet, egg, pepper jelly, topped with goat cheese.",
          image: {
            src: "/images/menu/southern-sunrise-bagel.webp",
            focus: "50% 55%",
            alt: "Bagel sandwich with a breaded chicken cutlet, red pepper jelly and crumbled white cheese on a white plate",
          },
        },
      ],
    },
    {
      title: "Parfaits (GF)",
      items: [
        {
          slug: "deluxe-yogurt-parfait",
          name: "Deluxe Yogurt Parfait",
          price: 9,
          description:
            "Plain Greek yogurt, fresh strawberries, blueberries, seasonal fruit, and gluten-free honey oat granola.",
          image: {
            src: "/images/menu/deluxe-yogurt-parfait.webp",
            focus: "60% 70%",
            alt: "Two parfait bowls topped with granola, blueberries, sliced banana, strawberries and a drizzle, beside Lions Den Coffee Shop cups on a sunny patio table",
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
        {
          slug: "steak-and-cheese",
          name: "Steak & Cheese",
          price: 14,
          description:
            "Boar’s Head London Broil roast beef steak, with fire-roasted peppers and onions, topped with American cheese.",
          image: {
            src: "/images/menu/steak-and-cheese-panini.webp",
            focus: "55% 70%",
            alt: "Grilled panini cut in half, showing sliced roast beef, red peppers and melted cheese, beside a red iced drink in a Lions Den Coffee Shop cup",
          },
        },
        {
          // Supplied as "Chicken Parm Panini"; published under the printed
          // menu's name and description at the owner's direction.
          slug: "vodka-parmigiana",
          name: "Vodka Parmigiana",
          price: 16.5,
          description:
            "Lightly breaded chicken cutlet, house-made vodka sauce, fresh ricotta, and fresh basil.",
          image: {
            src: "/images/menu/vodka-parmigiana-panini.webp",
            focus: "40% 55%",
            alt: "Chicken parm panini cut in half, showing a breaded chicken cutlet, red sauce, ricotta and basil, on a plate on a Lions Den Coffee Shop table",
          },
        },
      ],
    },
    {
      title: "Toasts",
      items: [
        {
          slug: "classic-avocado-toast",
          name: "Classic",
          price: 7,
          description:
            "Mashed avocado topped with black sesame seeds, lemon zest, and a spritz of lemon juice.",
          image: {
            src: "/images/menu/classic-avocado-toast.webp",
            focus: "50% 75%",
            alt: "Two slices of toasted bread topped with mashed avocado, dark seeds and curls of lemon zest on a white plate",
          },
        },
      ],
    },
  ],
};

// AFTER DARK: TODO: confirm renewed permit with client before adding a cocktail block.
