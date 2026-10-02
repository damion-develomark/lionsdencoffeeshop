# Photo shot list

The website menu (`src/data/menu.ts`) shows only items from the approved menu (`public/lionsden-menu.pdf`) that have a supplied photo clearly showing that item. Everything else is still on the PDF menu and still sold; it just needs a photo before it goes on the website. See the README, **Adding a menu photo**.

## Live With Supplied Photos

| Tab        | Item                            | Supplied image                                                    | Basis for the match                                                              |
| ---------- | ------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Coffee     | Classic Latte                   | `hot lattes.png`                                                  | Hot lattes with latte art (supplied as "hot lattes")                             |
| Not Coffee | Matcha Latte                    | `matcha.jpeg`                                                     | Iced matcha latte in a Lions Den cup                                             |
| Not Coffee | Smoothies                       | `smoothies.jpeg`                                                  | Strawberry-garnished smoothies (Strawberry is one of the listed flavors)         |
| Breakfast  | The Inferno                     | `breakfast spread.png`                                            | Visible jalapeños, bacon, egg, cheese and orange sauce; only item with jalapeños |
| Breakfast  | The California                  | `Sandwhich & coffee.png`                                          | Visible avocado spread, sliced tomato, egg and cheese                            |
| Lunch      | Chicken & Pesto                 | `Panini.jpeg`                                                     | Visible chicken, pesto, roasted red peppers and mozzarella on a panini           |
| Breakfast  | Sausage or Bacon, Egg, & Cheese | `Lion Den menu items/Bacon, Egg & Cheese on everything bagel.png` | Supplied by name; bacon, egg and cheese on an everything bagel (a listed bread)  |
| Breakfast  | Lox Bagel                       | `Lion Den menu items/Lox Bagel.png`                               | Supplied by name; herbed cream cheese, smoked salmon, capers and red onion       |
| Breakfast  | Southern Sunrise                | `Lion Den menu items/Southern Sunrise.png`                        | Supplied by name; breaded chicken cutlet, pepper jelly and crumbled goat cheese  |
| Breakfast  | Deluxe Yogurt Parfait           | `Lion Den menu items/Deluxe Yogurt Parfait.jpeg`                  | Supplied by name; granola, strawberries, blueberries and banana (seasonal fruit) |
| Lunch      | Steak & Cheese                  | `Lion Den menu items/Steak & Cheese Panini.png`                   | Supplied by name; roast beef, peppers and melted cheese on a panini              |
| Lunch      | Classic (toast)                 | `Lion Den menu items/classic avocado toast.png`                   | Supplied by name; mashed avocado, dark seeds and lemon zest                      |
| Lunch      | Chicken Parm Panini             | `Lion Den menu items/Chicken Parm Panini..png`                    | Client-requested name (Oct 2); the PDF calls it "Vodka Parmigiana"               |

The Inferno and The California were matched from visible ingredients. Please have the shop confirm both before launch.

Notes on the newer photos:

- **Sausage or Bacon, Egg, & Cheese** is one PDF item with a choice of bread, so it uses one photo. The alternates `Bacon, Egg & Cheese breakfast sandwich on hard roll.png` and `Sausage, Egg & Cheese Croissant.png` show the same item and aren't used.
- **Deluxe Yogurt Parfait** uses `Deluxe Yogurt Parfait.jpeg`; `Deluxe Yogurt Parfait 2.png` is an alternate (one of its two bowls looks like a Blueberry Parfait). The chosen photo has a drizzle, which is probably a Nutella or peanut butter add-on.
- **Lox Bagel** shows as "$9.00 / $17.00", exactly as the PDF prints it. The PDF doesn't say what the two prices are for; ask the shop so the site can label them.

## Needs Photos

These items are on the PDF menu but not on the website, because no supplied photo clearly shows them.

### Coffee

- Espresso
- Italian Cappuccino
- Americano (hot or iced)
- Ameridomo
- Brown Sugar Shaken Espresso
- Honey Bee Cortado
- Caramel Biscotti Latte
- White Mocha Latte
- Nutella Latte
- Biscoff Cookie Latte
- French Madeline Latte
- Hot Lions Blend Medium Roast
- Hot Black Velvet Dark Roast
- Iced Lions Blend Coffee
- Iced Black Velvet Coffee
- Lions Blend Cold Brew

### Not Coffee

- Hot Tea Sachets
- Iced Tea
- Chai Latte
- London Fog
- Refreshers
- Frappes
- Babycino
- Hot Chocolate
- Chocolate Milk
- Lemonade

### Breakfast

- The Carnivore
- The Hash & Roar
- Egg Lovers
- Bagel w/ Cream Cheese
- Bagel w/ Butter
- Bagel w/ Peanut Butter
- Bagel w/ Nutella
- Strawberry Yogurt Parfait
- Blueberry Yogurt Parfait

### Lunch

- Caprese Panini
- Chipotle Club Panini
- Breakfast Avocado Toast
- Smoked Salmon Avocado Toast
- Bacon & Goat Cheese Toast
- Veggie Toast

### Flagged for human review (not published)

- **`coffees.png`**: shows an iced coffee with cream and a black iced coffee. They could be Iced Lions Blend, Iced Black Velvet or Lions Blend Cold Brew, but the roast and brew method can't be told from the photo. Used in the gallery only.
- **`coffee front.jpg`** and hero cut-out **`1.png`**: an iced coffee with cold foam; the specific drink can't be identified. Used in the culture section and hero only.
- **`bagels.png`**: four bagel sandwiches with egg, cheese, greens and red peppers or tomatoes. They don't clearly match any single named item (greens aren't listed on any breakfast sandwich). Used in the gallery only.
- **`outside.jpeg`**: the small drink in a red cup looks like an espresso, which the shop could confirm for **Espresso**. Used for the Our Story section and share image.
- **`Holiday/xmas peppermint.jpg`**: a hot drink with whipped cream and peppermint. It could be Hot Chocolate or a seasonal special; confirm before using.
- **`strawberry matcha.png`**: matcha with pink/strawberry foam. This isn't a PDF item as pictured (possibly a Matcha Latte with a seasonal cold foam). Used in the gallery only.
- **PDF note:** The Hash & Roar has the same description as The Carnivore ("Double egg, bacon, sausage, & cheese") on the PDF. It's likely a typo, so confirm before either is photographed.

### Needs Confirmation (supplied photos, not published)

From `Lion Den menu items/`. Each could match a PDF item, but the photo doesn't prove it. Publish only after the shop confirms.

- **`The Carnivore.png`** → The Carnivore. The photo clearly shows sausage, egg and cheese on an asiago bagel, but bacon and the second egg can't be seen. Confirm it's The Carnivore as served.
- **`vegetarian avocado toast.png`** → possibly Veggie Toast. The photo shows avocado, tomato, red onion and crumbled white cheese. The PDF's Veggie Toast is "pico mix … tomatoes, red onions, & goat cheese" with no mention of avocado. Confirm it's the Veggie Toast and that the cheese is goat cheese.
- The Carnivore and Veggie photos are not in the repo yet. Compress them from the originals (see the README) once the shop confirms.
- **Published Oct 2:** `Chicken Parm Panini..png` as **Chicken Parm Panini** (`public/images/menu/chicken-parm-panini.webp`), with the PDF's Vodka Parmigiana description and $16.50 price.

### Supplied photos not used

From `Lion Den menu items/`:

- **Not on the PDF menu** (no approved name, price or category): `Cake pop.jpg`, `Chocolate Hazelnut Croissants.png`, `Fresh Fruit Tarts.png`, `Prosciutto and Fig Panini.png`, `Pumpkin Cheese Muffin.png`, `Pumpkin Spice Chai Latte (seasonal).png`, `Pumpkin cheescake (seasonal).png`, `bruschetta crostini.png`, `charcuterie:antipasto board.png`, `classic ricotta crostini.png`, `prosciutto wrapped cantaloupe.png`. The pumpkin items are seasonal.
- **Gallery (Oct 2):** `Italian cream puffs.png` is now the gallery's only pastry photo (`public/images/gallery/italian-cream-puffs.webp`), replacing the cannoli, sfogliatelle and berry tart shots.
- **Alcohol:** `Espresso Martini with Tiramisu.png` is published under Menu → Not Coffee → Cocktails (`public/images/menu/espresso-martini-tiramisu.webp`) with general copy and "Ask us" in place of a price. Add prices and any other drinks once the owner confirms them.
- **Doesn't match its PDF item:** `Caprese salad.png` is a salad, not the Caprese Panini.
- **No distinct menu item:** `Hot Latte.png`. Classic Latte already has a photo.
- **Alternates of published items:** `Bacon, Egg & Cheese breakfast sandwich on hard roll.png`, `Sausage, Egg & Cheese Croissant.png`, `Deluxe Yogurt Parfait 2.png`.
- **Byte-for-byte duplicates of photos already on the site:** `cannolis.png` (= `cannolis.png`), `cream pastrys.png` (= `cream pastrys.png`) and `Cream-Filled Croissants.png` (= `pastry.png`), all in the gallery.
