export type MenuItem = {
  name: string;
  price: number;
  description: string;
  sizes?: Record<string, number>;
  note?: string;
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
      title: "Signature Lattes",
      items: [
        {
          name: "Caramel Biscotti Latte",
          price: 6.15,
          description:
            "Caramel, chocolate cookie, and espresso: a house favorite.",
          sizes: sizes(6.15, 6.89, 7.99),
        },
        {
          name: "Nutella Latte",
          price: 6.49,
          description:
            "Hazelnut-cocoa sweetness folded into espresso and steamed milk.",
          sizes: sizes(6.49, 7.79, 8.99),
        },
        {
          name: "Honey Bee Cortado",
          price: 3.99,
          description:
            "A classic cortado, sweetened with honey and French vanilla. 4 oz.",
        },
      ],
    },
    {
      title: "Espresso Bar",
      items: [
        {
          name: "Espresso",
          price: 2.75,
          description: "Small cup. Full character. A classic 2 oz espresso.",
        },
        {
          name: "Italian Cappuccino",
          price: 4.25,
          description: "Espresso beneath a creamy crown of steamed milk. 8 oz.",
        },
        {
          name: "Ameridomo",
          price: 3.75,
          description:
            "An Americano with honey, steamed cream, and a dusting of cinnamon.",
          sizes: sizes(3.75, 7.79, 7.99),
        },
      ],
    },
    {
      title: "House Coffee",
      items: [
        {
          name: "Lions Blend Cold Brew",
          price: 4.35,
          description: "Our Lions Blend, cold brewed for your daily ritual.",
          sizes: sizes(4.35, 4.99, 5.75),
        },
        {
          name: "Hot Black Velvet",
          price: 3,
          description: "Deep, dark, and velvety. Our signature dark roast.",
          sizes: sizes(3, 3.5, 4),
        },
        {
          name: "Brown Sugar Shaken Espresso",
          price: 6.25,
          description: "Espresso shaken with brown sugar over ice. 20 oz.",
        },
      ],
    },
  ],
  "Not Coffee": [
    {
      title: "Tea & Company",
      items: [
        {
          name: "Matcha Latte",
          price: 5.25,
          description: "Matcha with milk, served hot or iced.",
          sizes: sizes(5.25, 6.69, 7.99),
        },
        {
          name: "Chai Latte",
          price: 5.25,
          description: "A little spice, a little comfort. Hot or iced.",
          sizes: sizes(5.25, 5.99, 6.99),
        },
        {
          name: "London Fog",
          price: 3.25,
          description:
            "Earl Grey, honey or French vanilla syrup, and steamed milk.",
          sizes: sizes(3.25, 3.99, 4.75),
        },
      ],
    },
    {
      title: "Something Cool",
      items: [
        {
          name: "Refreshers",
          price: 5.49,
          description: "Strawberry Acai or Mango Passionfruit.",
          sizes: sizes(5.49, 6.75, 7.5),
        },
        {
          name: "Frappes",
          price: 5.59,
          description:
            "Caramel, Mocha, Java Chip, Pistachio, Cookies & Cream, Double Espresso, or Vanilla.",
          sizes: { ...sizes(5.59, 6.99, 7.99), "24 oz": 8.69 },
        },
        {
          name: "Smoothies",
          price: 5.99,
          description: "Strawberry, Mango, Tropical, or Harvest Green.",
          sizes: { ...sizes(5.99, 6.99, 7.99), "24 oz": 8.99 },
        },
      ],
    },
  ],
  Breakfast: [
    {
      title: "Morning Favorites",
      items: [
        {
          name: "The Carnivore",
          price: 9.5,
          description: "Double egg, bacon, sausage, and cheese.",
        },
        {
          name: "The Inferno",
          price: 7,
          description:
            "Calabrian aioli, fresh jalapenos, egg, bacon, and pepperjack.",
        },
        {
          name: "Southern Sunrise",
          price: 10.5,
          description:
            "Breaded chicken cutlet, egg, pepper jelly, and goat cheese.",
        },
      ],
    },
    {
      title: "A Brighter Start",
      items: [
        {
          name: "Lox Bagel",
          price: 9,
          description:
            "House-made dill cream cheese, smoked salmon, capers, and red onions.",
          note: "Printed menu lists $9 / $17. Please ask the shop about options.",
        },
        {
          name: "The California",
          price: 7.5,
          description: "Mashed avocado, sliced tomato, egg, and cheese.",
        },
        {
          name: "Deluxe Yogurt Parfait",
          price: 9,
          description:
            "Greek yogurt, strawberries, blueberries, seasonal fruit, and gluten-free honey oat granola.",
        },
      ],
    },
  ],
  Lunch: [
    {
      title: "From the Panini Press",
      items: [
        {
          name: "Chicken & Pesto",
          price: 13,
          description:
            "Fire-roasted chicken, house-made Italian pesto, roasted red peppers, and fresh mozzarella.",
        },
        {
          name: "Vodka Parmigiana",
          price: 16.5,
          description:
            "Breaded chicken cutlet, house-made vodka sauce, fresh ricotta, and basil.",
        },
        {
          name: "Chipotle Club",
          price: 15,
          description:
            "Avocado, chipotle chicken and mayo, bacon, and Colby Jack.",
        },
      ],
    },
    {
      title: "A Little Lighter",
      items: [
        {
          name: "Smoked Salmon Avocado Toast",
          price: 13,
          description:
            "Smoked Scottish salmon over avocado, topped with goat cheese.",
        },
        {
          name: "Caprese Panini",
          price: 11,
          description:
            "Sliced tomatoes, fresh mozzarella, balsamic glaze, and fresh basil.",
        },
        {
          name: "Classic Avocado Toast",
          price: 7,
          description:
            "Mashed avocado, black sesame seeds, lemon zest, and lemon juice.",
        },
      ],
    },
  ],
};
// AFTER DARK: TODO: confirm renewed permit with client before adding a cocktail block.
