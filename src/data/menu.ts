export type MenuImage = {
  /** Image URL on the Pexels / Unsplash CDN */
  src: string;
  /** What is in the photo */
  alt: string;
  /** Where the photo came from (free license, no attribution required) */
  credit: "Pexels" | "Unsplash";
  /** Photographer, when known */
  photographer?: string;
  /** Source page for the photo */
  source: string;
  /** True for stand-in photos until the shop supplies its own */
  placeholder?: boolean;
};

type BaseMenuItem = {
  name: string;
  price: number;
  description: string;
  sizes?: Record<string, number>;
  note?: string;
};

export type MenuItem = BaseMenuItem & { slug: string; image: MenuImage };
export type MenuGroup = { title: string; items: MenuItem[] };
type BaseMenuGroup = { title: string; items: BaseMenuItem[] };

const sizes = (a: number, b: number, c: number) => ({
  "12 oz": a,
  "16 oz": b,
  "20 oz": c,
});
const baseMenu: Record<string, BaseMenuGroup[]> = {
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
// ---------------------------------------------------------------------------
// Menu photos, served from the Pexels / Unsplash CDNs (free licenses).
// Allowed hosts are listed in next.config.ts → images.remotePatterns.
// ---------------------------------------------------------------------------
const pexels = (id: number, slug: string) => ({
  src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`,
  source: `https://www.pexels.com/photo/${slug}-${id}/`,
});
const unsplash = (photoId: string, pageId: string) => ({
  src: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&q=80`,
  source: `https://unsplash.com/photos/${pageId}`,
});

const photos: Record<string, MenuImage> = {
  "caramel-biscotti-latte": { alt: "Latte with foam art beside a biscotti on a wicker table", credit: "Pexels", ...pexels(34848145, "latte-art-and-biscotti-on-a-wicker-table-outdoors") },
  "nutella-latte": { alt: "Creamy coffee topped with foam and scattered hazelnuts", credit: "Pexels", ...pexels(143645, "flat-lay-photography-of-dessert-inside-of-glass-cup") },
  "honey-bee-cortado": { alt: "Cortado with latte art in a small green ceramic cup", credit: "Pexels", ...pexels(14704662, "a-cortado-drink-with-latte-art-on-green-ceramic-cup") },
  espresso: { alt: "Close-up of a fresh shot of espresso with golden crema", credit: "Pexels", ...pexels(9050518, "close-up-of-a-shot-of-espresso") },
  "italian-cappuccino": { alt: "Cappuccino with latte art in a cup and saucer at a cafe", credit: "Pexels", ...pexels(30707443, "elegant-cappuccino-with-latte-art-in-a-cozy-cafe") },
  ameridomo: { alt: "Hot coffee in a red ceramic mug on a wooden table", credit: "Pexels", ...pexels(36179783, "red-ceramic-mug-with-hot-coffee-on-wooden-table") },
  "lions-blend-cold-brew": { alt: "Cold brew coffee over ice in a mason jar", credit: "Unsplash", photographer: "Nadia Valko", ...unsplash("1759259639356-6eee63241869", "WCmMU38zg1c") },
  "hot-black-velvet": { alt: "Cup of black coffee in soft light", credit: "Pexels", ...pexels(1233528, "selective-focus-photography-of-a-cup-of-black-coffee") },
  "brown-sugar-shaken-espresso": { alt: "Frothy iced espresso drink in a glass with coffee beans", credit: "Pexels", ...pexels(4869336, "creamy-coffee-drink-in-a-drinking-glass") },
  "matcha-latte": { alt: "Matcha latte with creamy foam art", credit: "Unsplash", photographer: "Lee Milo", ...unsplash("1768203630324-4a456ef7148f", "3MiakfkKOLc") },
  "chai-latte": { alt: "Warm spiced latte in a cup", credit: "Unsplash", photographer: "Toa Heftiba", ...unsplash("1481455473976-c280ae7c10f9", "1CAFw4Yz_4w"), placeholder: true },
  "london-fog": { alt: "Creamy tea latte in a white mug", credit: "Pexels", ...pexels(2262832, "white-coffee-mug"), placeholder: true },
  refreshers: { alt: "Iced strawberry drink in a glass with fresh strawberries", credit: "Pexels", ...pexels(17648333, "a-strawberry-drink-in-a-glass") },
  frappes: { alt: "Blended coffee drink topped with whipped cream and chocolate", credit: "Unsplash", photographer: "Circle Digital Marketing Agency", ...unsplash("1718267050202-9b1b6bfb8545", "OeG0_YsoFgk") },
  smoothies: { alt: "Strawberry smoothie in a glass jar", credit: "Pexels", ...pexels(775032, "strawberry-smoothie-on-glass-jar") },
  "the-carnivore": { alt: "Bacon, egg, and cheese breakfast sandwich on an English muffin", credit: "Pexels", ...pexels(6529815, "hamburger-sandwich-with-bacon-and-egg") },
  "the-inferno": { alt: "Breakfast sandwich with egg, cheese, and bacon beside a dip", credit: "Pexels", ...pexels(12261092, "a-sandwich-and-dip-on-a-ceramic-plate"), placeholder: true },
  "southern-sunrise": { alt: "Crispy chicken sandwich topped with a fried egg", credit: "Pexels", ...pexels(31176105, "delicious-chicken-sandwich-with-fried-egg") },
  "lox-bagel": { alt: "Smoked salmon bagels served with coffee and orange juice", credit: "Unsplash", photographer: "Leonardo Ziaja", ...unsplash("1774988552970-dea71ae90f5a", "D5Zlml6vxyc") },
  "the-california": { alt: "Toast topped with egg and fresh vegetables", credit: "Unsplash", photographer: "David B Townsend", ...unsplash("1613769049987-b31b641f25b1", "IQSDSFO9UuI") },
  "deluxe-yogurt-parfait": { alt: "Yogurt parfaits layered with strawberries and granola in jars", credit: "Unsplash", photographer: "Monika Grabkowska", ...unsplash("1654584240523-6b8d3f6c33b4", "6O_sZNv_7lA") },
  "chicken-and-pesto": { alt: "Grilled sandwich with pesto, mozzarella, tomato, and greens", credit: "Pexels", ...pexels(33755326, "gourmet-sandwich-with-fresh-greens-and-pesto"), placeholder: true },
  "vodka-parmigiana": { alt: "Crispy breaded chicken parmesan with tomato sauce", credit: "Pexels", ...pexels(38902135, "close-up-of-chicken-parmesan-on-blue-plate"), placeholder: true },
  "chipotle-club": { alt: "Stacked club sandwich served with fries", credit: "Pexels", ...pexels(12469931, "club-sandwich-with-bowl-of-fries") },
  "caprese-panini": { alt: "Caprese sandwich with mozzarella, tomato, and basil on a board", credit: "Pexels", ...pexels(30301906, "fresh-caprese-sandwich-on-cutting-board") },
  "smoked-salmon-avocado-toast": { alt: "Smoked salmon toast served with coffee", credit: "Unsplash", photographer: "Konstantinos Papadopoulos", ...unsplash("1771698253819-9569b1739aea", "lvAv2uT65cg") },
  "classic-avocado-toast": { alt: "Toast spread with smashed avocado", credit: "Unsplash", photographer: "Caroline Green", ...unsplash("1631311915775-e8f4250a7d4e", "C4nT6Ulm0ao") },
};

export const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const menu: Record<string, MenuGroup[]> = Object.fromEntries(
  Object.entries(baseMenu).map(([tab, groups]) => [
    tab,
    groups.map((group) => ({
      ...group,
      items: group.items.map((item) => {
        const slug = toSlug(item.name);
        const photo = photos[slug];
        if (!photo) throw new Error(`Missing menu photo for "${item.name}" (${slug})`);
        return { ...item, slug, image: photo };
      }),
    })),
  ]),
);

/** Every photo, for the credits line. */
export const menuPhotoCredits = Object.entries(photos).map(([slug, p]) => ({
  slug,
  ...p,
}));

// AFTER DARK: TODO: confirm renewed permit with client before adding a cocktail block.
