// The full menu for /menu, transcribed from the approved printed menu
// (public/lionsden-menu.pdf). Names, descriptions, sizes and prices are copied
// as printed; only spelling ("Avacado" → "Avocado") and capitalisation are
// tidied. Nothing is added that the PDF doesn't say. When the PDF changes,
// update this file and src/data/menu.ts (the homepage's photographed picks).
//
// Open questions for the owner:
// - Americano 12 oz is printed $3.25 next to $6.89 (16 oz); confirm.
// - The Hash & Roar repeats The Carnivore's description, so its own
//   description is left out until the owner supplies it.
// - Lox Bagel prints two prices ($9.00 / $17.00) without saying what each is.

export type FullMenuItem = {
  name: string;
  description?: string;
  /** A single price, exactly as printed. */
  price?: string;
  /** One price per size in the section's `sizes`; null where the PDF prints
   *  "/" (not offered in that size). */
  prices?: (string | null)[];
  /** Size restriction printed after the name, e.g. "2 oz only". */
  only?: string;
};

export type FullMenuSection = {
  id: string;
  title: string;
  /** Size columns for `prices`, as printed in the section header. */
  sizes?: string[];
  items: FullMenuItem[];
  /** Printed footnotes and option boxes for the section. */
  notes?: string[];
};

export type FullMenuCategory = {
  id: string;
  title: string;
  sections: FullMenuSection[];
  note?: string;
};

const CUPS = ["12 oz", "16 oz", "20 oz"];
const CUPS_24 = [...CUPS, "24 oz"];

export const FULL_MENU: FullMenuCategory[] = [
  {
    id: "coffee",
    title: "Coffee",
    sections: [
      {
        id: "espresso-drinks",
        title: "Espresso Drinks",
        sizes: CUPS,
        items: [
          { name: "Espresso", only: "2 oz only", price: "$2.75" },
          { name: "Italian Cappuccino", only: "8 oz only", price: "$4.25" },
          {
            name: "Americano (Hot or Iced)",
            prices: ["$3.25", "$6.89", "$7.99"],
          },
          {
            name: "Ameridomo",
            description:
              "An Americano with honey, steamed cream, topped with cinnamon powder.",
            prices: ["$3.75", "$7.79", "$7.99"],
          },
          {
            name: "Brown Sugar Shaken Espresso",
            prices: [null, null, "$6.25"],
          },
          {
            name: "Honey Bee Cortado",
            only: "4 oz only",
            description:
              "Classic cortado sweetened with honey & French vanilla.",
            price: "$3.99",
          },
        ],
      },
      {
        id: "lattes",
        title: "Lattes",
        sizes: CUPS,
        items: [
          { name: "Classic Latte", prices: ["$5.25", "$6.89", "$7.25"] },
          {
            name: "Caramel Biscotti Latte",
            prices: ["$6.15", "$6.89", "$7.99"],
          },
          { name: "White Mocha Latte", prices: ["$6.15", "$6.89", "$7.99"] },
          { name: "Nutella Latte", prices: ["$6.49", "$7.79", "$8.99"] },
          { name: "Biscoff Cookie Latte", prices: ["$6.15", "$6.89", "$7.99"] },
          {
            name: "French Madeline Latte",
            prices: ["$6.15", "$6.89", "$7.99"],
          },
        ],
        notes: ["Additional flavors available!"],
      },
      {
        id: "drip-coffee",
        title: "Drip Coffee",
        sizes: CUPS,
        items: [
          {
            name: "Hot Lions Blend Medium Roast",
            prices: ["$3.00", "$3.50", "$4.00"],
          },
          {
            name: "Hot Black Velvet Dark Roast",
            prices: ["$3.00", "$3.50", "$4.00"],
          },
          {
            name: "Iced Lions Blend Coffee",
            prices: ["$3.20", "$3.99", "$4.65"],
          },
          {
            name: "Iced Black Velvet Coffee",
            prices: ["$3.20", "$3.99", "$4.65"],
          },
          {
            name: "Lions Blend Cold Brew",
            prices: ["$4.35", "$4.99", "$5.75"],
          },
        ],
        notes: [
          "Iced also available in 24 oz!",
          "Milks available: Whole, 2%, Skim, Oat, Almond, Coconut, Half & Half, Heavy Cream.",
          "Cold foams: Sweet Cream, Coffee, Seasonal $1.25.",
        ],
      },
    ],
  },
  {
    id: "not-coffee",
    title: "Not Coffee",
    sections: [
      {
        id: "tea",
        title: "Tea",
        sizes: CUPS,
        items: [
          {
            name: "Hot Tea Sachets",
            description:
              "English Breakfast, Earl Grey, Jade Cloud Green, Matcha Green, Blueberry Hibiscus.",
            prices: ["$2.49", "$2.99", "$3.49"],
          },
          {
            name: "Iced Tea",
            description: "Hibiscus Lime, Peach Black, Green Citrus.",
            prices: ["$3.00", "$3.50", "$4.00"],
          },
          {
            name: "Matcha Latte (Iced or Hot)",
            prices: ["$5.25", "$6.69", "$7.99"],
          },
          {
            name: "Chai Latte (Iced or Hot)",
            prices: ["$5.25", "$5.99", "$6.99"],
          },
          {
            name: "London Fog",
            description:
              "Earl Grey tea, honey or French vanilla syrup, & steamed milk.",
            prices: ["$3.25", "$3.99", "$4.75"],
          },
          {
            name: "Refreshers",
            description: "Strawberry Acai or Mango Passionfruit.",
            prices: ["$5.49", "$6.75", "$7.50"],
          },
        ],
      },
      {
        id: "frozen",
        title: "Frozen",
        sizes: CUPS_24,
        items: [
          {
            name: "Frappes",
            description:
              "Caramel, Mocha, Java Chip, Pistachio, Cookies & Cream, Double Espresso, or Vanilla.",
            prices: ["$5.59", "$6.99", "$7.99", "$8.69"],
          },
          {
            name: "Smoothies",
            description: "Strawberry, Mango, Tropical, Harvest Green.",
            prices: ["$5.99", "$6.99", "$7.99", "$8.99"],
          },
        ],
      },
      {
        id: "kids",
        title: "Kids",
        sizes: ["8 oz", ...CUPS_24],
        items: [
          {
            name: "Babycino",
            description: "Steamed milk, whipped cream, cocoa powder.",
            prices: ["$2.50", null, null, null, null],
          },
          {
            name: "Hot Chocolate",
            prices: ["$3.25", "$4.25", "$4.75", "$5.35", null],
          },
          {
            name: "Chocolate Milk",
            prices: ["$2.75", "$3.39", "$3.99", "$4.49", "$5.59"],
          },
          {
            name: "Lemonade",
            description: "Classic, Raspberry, Strawberry, or Lavender.",
            prices: ["$2.49", "$3.49", "$3.99", "$4.49", "$4.99"],
          },
        ],
      },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    sections: [
      {
        id: "sandwiches",
        title: "Sandwiches",
        items: [
          { name: "Sausage or Bacon, Egg, & Cheese", price: "$6.49" },
          {
            name: "Lox Bagel",
            description:
              "Homemade dill cream cheese, topped with smoked salmon, capers, & red onions.",
            price: "$9.00 / $17.00",
          },
          {
            name: "The Carnivore",
            description: "Double egg, bacon, sausage, & cheese.",
            price: "$9.50",
          },
          { name: "The Hash & Roar", price: "$7.00" },
          {
            name: "The Inferno",
            description:
              "Homemade Calabrian aioli, fresh jalapeños, egg, bacon, & pepperjack cheese.",
            price: "$7.00",
          },
          {
            name: "The California",
            description: "Mashed avocado, sliced tomato, egg & cheese.",
            price: "$7.50",
          },
          {
            name: "Egg Lovers",
            description: "Double egg with your choice of cheese.",
            price: "$6.00",
          },
          {
            name: "Southern Sunrise",
            description:
              "Breaded chicken cutlet, egg, pepper jelly, topped with goat cheese.",
            price: "$10.50",
          },
          {
            name: "Bagel w/ Cream Cheese",
            description: "Plain or house-made dill & scallion cream cheese.",
            price: "$3.99",
          },
          {
            name: "Bagel w/ Butter",
            description: "Plain or cinnamon butter.",
            price: "$2.79",
          },
          { name: "Bagel w/ Peanut Butter", price: "$3.19" },
          { name: "Bagel w/ Nutella", price: "$4.59" },
        ],
        notes: [
          "Breads: Hard Roll, English Muffin (+0.50), Croissant (+0.75), Plain Bagel, Everything Bagel, Asiago Bagel, Sesame Bagel.",
          "Cheese: American, Cheddar, Pepperjack, Swiss.",
        ],
      },
      {
        id: "parfaits",
        title: "Parfaits (GF)",
        items: [
          {
            name: "Deluxe Yogurt Parfait",
            description:
              "Plain Greek yogurt, fresh strawberries, blueberries, seasonal fruit, & gluten-free honey oat granola.",
            price: "$9.00",
          },
          {
            name: "Strawberry Yogurt Parfait",
            description:
              "Plain Greek yogurt, fresh strawberries, & gluten-free honey oat granola.",
            price: "$6.50",
          },
          {
            name: "Blueberry Yogurt Parfait",
            description:
              "Plain Greek yogurt, fresh blueberries, & gluten-free honey oat granola.",
            price: "$6.50",
          },
        ],
        notes: [
          "Add-ons: Raw Honey, Peanut Butter, Nutella ($2), Chocolate Chips ($1).",
        ],
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch & Small Bites",
    note: "Check our pastry display for baked goods & sweets!",
    sections: [
      {
        id: "paninis",
        title: "Paninis",
        items: [
          {
            name: "Caprese",
            description:
              "Sliced tomatoes, fresh mozzarella, balsamic glaze and fresh basil.",
            price: "$11.00",
          },
          {
            name: "Chicken & Pesto",
            description:
              "Fire-roasted chicken, house-made Italian pesto, topped with roasted red peppers, and fresh mozzarella.",
            price: "$13.00",
          },
          {
            name: "Steak & Cheese",
            description:
              "Boar’s Head London Broil roast beef steak, with fire-roasted peppers & onions, topped with American cheese.",
            price: "$14.00",
          },
          {
            name: "Vodka Parmigiana",
            description:
              "Lightly breaded chicken cutlet, house-made vodka sauce, fresh ricotta, fresh basil.",
            price: "$16.50",
          },
          {
            name: "Chipotle Club Panini",
            description:
              "Avocado mash, Boar’s Head Chipotle Chicken, chipotle mayo, Smithfield bacon, & Boar’s Head Colby Jack cheese.",
            price: "$15.00",
          },
        ],
      },
      {
        id: "toasts",
        title: "Toasts",
        items: [
          {
            name: "Breakfast Avocado",
            description: "Classic avocado toast topped with two eggs.",
            price: "$9.75",
          },
          {
            name: "Smoked Salmon Avocado",
            description:
              "Smoked Scottish salmon atop avocado & topped with goat cheese.",
            price: "$13.00",
          },
          {
            name: "Bacon & Goat Cheese",
            description:
              "Crispy bacon on avocado mash & topped with goat cheese.",
            price: "$9.00",
          },
          {
            name: "Veggie",
            description:
              "Homemade pico mix made with fresh tomatoes, red onions, & goat cheese.",
            price: "$8.00",
          },
          {
            name: "Classic",
            description:
              "Mashed avocado topped with black sesame seeds, lemon zest, & a spritz of lemon juice.",
            price: "$7.00",
          },
        ],
      },
    ],
  },
];
