# Lions Den Coffee Shop® — Website

The marketing website for **Lions Den Coffee Shop®**, an Italian-style neighborhood coffee house at 57 W Main St in Plantsville, Connecticut. It's a single, scroll-driven page that introduces the shop, shows a photographed selection of the menu (with the full menu as a PDF), tells the family story, and gets people through the door (online ordering, call, directions, reviews, contact form, socials).

- **Production URL:** https://www.lionsdencoffeeshop.com (set as `metadataBase` in `src/app/layout.tsx`)
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Motion
- **Hosting:** Vercel (`vercel.json`)

---

## Contents

1. [The business](#1-the-business)
2. [Brand & design system](#2-brand--design-system)
3. [Page walkthrough](#3-page-walkthrough)
4. [Tech stack & packages](#4-tech-stack--packages)
5. [Project structure](#5-project-structure)
6. [Getting started](#6-getting-started)
7. [How things work](#7-how-things-work)
8. [Assets & sources](#8-assets--sources)
9. [Content editing guide](#9-content-editing-guide)
10. [SEO, accessibility & performance](#10-seo-accessibility--performance)
11. [Deployment](#11-deployment)
12. [Open items / TODOs](#12-open-items--todos)

---

## 1. The business

|                  |                                                                                 |
| ---------------- | ------------------------------------------------------------------------------- |
| **Name**         | Lions Den Coffee Shop (Lions Den Coffee LLC)                                    |
| **Founded**      | 2020, by Vincenzo and Anisa Infante                                             |
| **Address**      | 57 W Main St, Plantsville, CT 06479                                             |
| **Hours**        | Mon–Fri 6:00 AM – 7:00 PM; Sat & Sun 7:00 AM – 7:00 PM                          |
| **Phone**        | (860) 426-2809                                                                  |
| **Email**        | lionsdencoffeect@gmail.com                                                      |
| **Service area** | Plantsville / Southington, plus a short trip from Cheshire, Bristol and Wolcott |

**Positioning.** An Italian coffee house with a neighborhood feel: _"Italian coffee, honest food, and good company."_ The recurring message is that "every order is an interaction, not a transaction" — the site sells the experience of slowing down and staying, not just the drinks.

**Mission (quoted on the site).** _"To enrich the American culture where people enjoy life, family, and friends."_ Values shown on the site: **Service · Quality · Community**.

**What they sell.** The approved, complete menu is the printable PDF at `public/lionsden-menu.pdf` (coffee, tea, frozen drinks, kids' drinks, breakfast sandwiches, bagels, parfaits, paninis and toasts). The menu section's "Download menu" link saves it as `lions-den-coffee-shop-menu.pdf`, and a "see the full menu (PDF)" link above the tabs opens it.

**The website menu is a photographed selection, not the full menu.** An item is shown on the site only when (1) it is on the PDF, (2) the shop has supplied a photo that clearly shows that item, and (3) its name, description, sizes and price can be copied from the PDF. Items without a matching photo stay off the website (they're still on the PDF and still sold) and are listed under **Needs Photos** in [`PHOTO_SHOT_LIST.md`](PHOTO_SHOT_LIST.md). Currently on the site (`src/data/menu.ts`):

| Tab            | Group         | Items                                                                                     |
| -------------- | ------------- | ----------------------------------------------------------------------------------------- |
| **Coffee**     | Lattes        | Classic Latte                                                                             |
| **Not Coffee** | Tea & Frozen  | Matcha Latte, Smoothies                                                                   |
| **Breakfast**  | Sandwiches    | Sausage or Bacon, Egg, & Cheese; Lox Bagel; The Inferno; The California; Southern Sunrise |
|                | Parfaits (GF) | Deluxe Yogurt Parfait                                                                     |
| **Lunch**      | Paninis       | Chicken & Pesto, Steak & Cheese                                                           |
|                | Toasts        | Classic                                                                                   |

**Goals of the site.**

1. Make the shop feel warm and personal before anyone visits.
2. Make the menu easy to browse on a phone, with real photos, prices and sizes, and the full PDF one tap away.
3. Drive visits and orders: **Order online** (Toast) and **Call to order** (tap-to-call) sit side by side in the header, mobile menu and footer; **Get directions** (Google Maps) is in the visit section and footer. **Join Lions Den** (Toast marketing sign-up) is in the contact section.
4. Grow social following (Instagram, Facebook, YouTube, TikTok, Yelp).
5. Rank locally ("coffee shop Plantsville / Southington") via structured data and good metadata.

**Social profiles.**

- Instagram — https://www.instagram.com/lionsden_coffee/
- Facebook — https://www.facebook.com/lionsdencoffeeshopCT
- YouTube — https://www.youtube.com/channel/UC2ybOXg47gGzBELnd_4OwXw/featured
- TikTok — https://www.tiktok.com/@lionsdencoffeeshop
- Yelp — https://www.yelp.com/biz/lions-den-coffee-shop-southington-2

---

## 2. Brand & design system

The look is "a café menu board come to life": warm latte creams, espresso-black ink, lion gold, and chunky sticker-style UI with hard offset shadows. All tokens live at the top of `src/app/globals.css` in the Tailwind `@theme` block, so they're usable as utilities (`bg-gold`, `text-espresso`, `font-display`…) and as CSS variables.

### Colors

| Token                | Hex                           | Use                                               |
| -------------------- | ----------------------------- | ------------------------------------------------- |
| `--color-gold`       | `#faba2d`                     | Lion gold — primary brand color, buttons, accents |
| `--color-gold-rule`  | `#fdb71a`                     | Thin heading rules                                |
| `--color-espresso`   | `#231f20`                     | Text, outlines, offset shadows, dark panels       |
| `--color-warm-white` | `#fffdf9`                     | Page background                                   |
| `--color-cream`      | `#eeebe3`                     | Section tint                                      |
| `--color-bronze`     | `#7d5c18`                     | Deep gold for small labels                        |
| `--color-latte`      | `#b8a584`                     | Muted accent (steam, dividers)                    |
| `--color-terracotta` | `#c4623a`                     | Secondary accent                                  |
| Spill gradient       | `#f8e8c4 → #ecd09e → #dab478` | Hero "coffee spill"; the footer's latte panel     |

### Type (Google Fonts, loaded in `src/app/layout.tsx`)

| Token             | Font                 | Use                                       |
| ----------------- | -------------------- | ----------------------------------------- |
| `--font-headline` | **Anton**            | Hero headline, buttons, pills, nav links  |
| `--font-display`  | **Playfair Display** | Section headings, italic accents, the "&" |
| `--font-serif`    | **Crimson Pro**      | Body copy                                 |
| `--font-sans`     | **Poppins**          | Small labels, eyebrows, UI text           |
| `--font-script`   | **Pinyon Script**    | Accent script lines                       |

### UI language

- **Buttons & pills** (`.button`, `.feature-pill`, `.slow-badge`, `.map-pin-card`, …): gold fill, 2px espresso border, fully rounded, `4px 4px` espresso offset shadow, Anton caps. On hover they "press into" their shadow.
- **Frames:** photos and cards use the same espresso border + offset shadow (sticker look).
- **Icons:** [Lucide](https://lucide.dev) for UI icons; brand logos from Simple Icons (see §8).
- **Coffee motifs:** the hero spill and drips, flat SVG coffee beans, steam curls, the espresso saucer doodle, and the lion shield mark.

---

## 3. Page walkthrough

The whole site is one page (`src/app/page.tsx`). Sections, top to bottom:

| #   | Section                  | Component                   | What it does                                                                                                                                                                                                                                                                                                                                                                              |
| --- | ------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| —   | **Header**               | `sections/Header.tsx`       | Floating pill nav, fixed to the top and visible at all times. Address and hours line above the pill (folds away on scroll). Logo, Menu / Our Story / Visit links, "Call to order" and "Order online" buttons. Below 1100px the links move into a slide-out sheet (which also has both buttons, address and hours); below 768px the buttons move there too. Turns frosted once you scroll. |
| 1   | **Hero**                 | `sections/Hero.tsx`         | "SIP & STAY." headline (white Anton with espresso outline, gold "&"). A coffee spill pours down the section, drips run, four of the shop's own product cut-outs (iced coffee, smoothie, breakfast sandwich, latte) and beans land, and the lion badge draws itself. Stats (2020 · 6AM · 57), stacked CTAs, and a tilted gold marquee.                                                     |
| 2   | **Culture**              | `sections/Culture.tsx`      | Full-width photo card (the shop's iced coffee in front of the patio), espresso-tinted, with "Come for the coffee. Stay for the people." and an "Our story" button.                                                                                                                                                                                                                        |
| 3   | **Menu** (`#menu`)       | `sections/MenuBoard.tsx`    | "Your daily ritual." Tabs for Coffee / Not Coffee / Breakfast / Lunch; each group has a feature photo, and each item has a thumbnail, price, and a size/price tooltip. A note above the tabs says this is a photographed selection and links to the full PDF. Includes the "Come in / Slow down" sticker and animated espresso saucer.                                                    |
| 4   | **Our Story** (`#about`) | `sections/SlowDownBand.tsx` | Dark panel with the storefront/patio photo: "More than coffee. A sense of belonging.", the founders, the mission quote and the values pills.                                                                                                                                                                                                                                              |
| 5   | **Gallery** (`#gallery`) | `sections/Atmosphere.tsx`   | "Pull up a chair." A horizontal strip of the shop's own photos (iced coffees, bagel sandwiches, cannoli, pastries, tarts, a matcha special, fall and winter drinks) that's pinned and scrubbed sideways as you scroll on desktop.                                                                                                                                                         |
| 6   | **Reviews** (`#reviews`) | `sections/Reviews.tsx`      | Black stage for the Elfsight "All-in-One Reviews" carousel (styled in the Elfsight dashboard). `platform.js` loads via `next/script`.                                                                                                                                                                                                                                                     |
| 7   | **Visit** (`#visit`)     | `sections/Visit.tsx`        | Address, hours, phone, email, "Get directions", and the Google Maps embed for the shop.                                                                                                                                                                                                                                                                                                   |
| 8   | **Contact** (`#contact`) | `sections/Contact.tsx`      | "Contact us": Typeform live embed (`embed.js` via `next/script`), email and phone as alternatives, and the "Join Lions Den" sign-up card.                                                                                                                                                                                                                                                 |
| 9   | **Footer**               | `sections/SiteFooter.tsx`   | Plain latte-colored panel (no photo). Lion logo (replays the hero's draw-on animation when scrolled into view) with rising steam, tagline, address & hours, nav links, the two CTAs, social icons, copyright, and a small "Website by Develomark" logo credit.                                                                                                                            |

---

## 4. Tech stack & packages

### Runtime dependencies

| Package                    | Version     | Why it's here                                                                                                                                                                                                                                               |
| -------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next`                     | 16.3.6      | Framework: App Router, image optimization, static rendering. **Note:** Next 16 differs from older versions — see `AGENTS.md` and `node_modules/next/dist/docs/` before changing framework-level code.                                                       |
| `react`, `react-dom`       | 19.2.8      | UI library                                                                                                                                                                                                                                                  |
| `gsap`                     | ^3.15       | Timeline animation: hero spill/pour, lion reveal, scroll-triggered effects. Uses the **ScrollTrigger, SplitText, DrawSVGPlugin and MorphSVGPlugin** plugins (all free and included in the `gsap` package since 3.13). Registered once in `src/lib/gsap.ts`. |
| `@gsap/react`              | ^2.1        | `useGSAP()` hook — scoped, auto-cleaned GSAP in React                                                                                                                                                                                                       |
| `lenis`                    | ^1.3        | Smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync (`src/components/providers/smooth-scroll.tsx`)                                                                                                                                     |
| `motion`                   | ^13.4       | (Framer Motion) Component-level animation: menu list staggers, hover springs, badge float, tab transitions                                                                                                                                                  |
| `radix-ui`                 | ^1.6        | Accessible primitives behind the shadcn/ui components (tabs, sheet, tooltip)                                                                                                                                                                                |
| `lucide-react`             | ^1.48       | UI icons (arrows, phone, map pin, clock, menu…). Note: v1 no longer ships brand/social icons.                                                                                                                                                               |
| `class-variance-authority` | ^0.7        | Variant styling for shadcn/ui components                                                                                                                                                                                                                    |
| `clsx`, `tailwind-merge`   | ^2.1 / ^3.7 | Class-name helpers behind the local `cn()` in `src/lib/utils.ts`                                                                                                                                                                                            |
| `cn`                       | ^0.4        | Third-party class-name helper imported by `ui/tabs.tsx` and `ui/tooltip.tsx`. The rest of the code uses the local `cn()` in `src/lib/utils.ts`; switching those two imports over would let this package be removed.                                         |

### Dev dependencies

| Package                                     | Why                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `tailwindcss` ^4, `@tailwindcss/postcss` ^4 | Styling. Tailwind 4 is configured in CSS (`@theme` in `globals.css`); there is no `tailwind.config.js`. |
| `tw-animate-css`                            | Animation utilities used by the shadcn/ui components                                                    |
| `typescript` ^5, `@types/*`                 | Type checking                                                                                           |
| `eslint` ^9, `eslint-config-next`           | Linting (`npm run lint`)                                                                                |
| `prettier`                                  | Formatting (`npm run format`)                                                                           |

### UI component source

`src/components/ui/*` (badge, button, separator, sheet, tabs, tooltip) were generated with **shadcn/ui** (`components.json`: "new-york" style, lucide icons) and are owned by this repo — edit them freely.

### External services (no API keys needed)

| Service                             | Used for                                                       |
| ----------------------------------- | -------------------------------------------------------------- |
| **Google Fonts**                    | The five web fonts                                             |
| **Google Maps embed**               | The map in the Visit section                                   |
| **Elfsight** (`elfsightcdn.com`)    | Reviews carousel (widget configured in the Elfsight dashboard) |
| **Typeform** (`embed.typeform.com`) | Contact form (form configured in Typeform)                     |
| **Toast** (`toasttab.com`)          | Online ordering and the "Join Lions Den" marketing sign-up     |
| **Google Maps**                     | "Get directions" links (opens in a new tab)                    |
| **Vercel**                          | Hosting                                                        |

---

## 5. Project structure

```
.
├── public/
│   ├── brand/                 # lions-den-logo.jpg (header), lions-den-mark.svg,
│   │                          # develomark-logo-black.png (footer credit)
│   ├── images/
│   │   ├── hero/              # 4 supplied product cut-outs (.webp, transparent)
│   │   ├── features/          # 2 cut-outs with a baked-in cream die-cut border (StickerFeature)
│   │   ├── menu/              # one supplied photo per website menu item
│   │   ├── gallery/           # supplied photos for the gallery strip
│   │   ├── shop/              # culture-section and story-section photos
│   │   └── og-lions-den-storefront.jpg  # Open Graph share image (1200×630)
│   └── lionsden-menu.pdf      # printable menu
├── src/
│   ├── app/
│   │   ├── layout.tsx         # fonts, metadata, Open Graph, JSON-LD, smooth scroll
│   │   ├── page.tsx           # section order
│   │   ├── globals.css        # design tokens + all section styles
│   │   ├── icon.svg, favicon.ico, apple-icon.png
│   ├── components/
│   │   ├── brand/             # LionMark, lionReveal, CoffeeSpill (+ CoffeeBean),
│   │   │                      # EspressoSaucer, SocialIcons
│   │   ├── providers/         # smooth-scroll (Lenis)
│   │   ├── sections/          # one file per page section (see §3)
│   │   └── ui/                # shadcn/ui primitives
│   ├── data/menu.ts           # photographed website menu: items, prices, sizes, photos
│   └── lib/                   # gsap.ts (plugin registration), utils.ts (cn)
├── next.config.ts             # Next config (no remote image hosts; all images are local)
├── PHOTO_SHOT_LIST.md         # live menu photos + menu items that still need photos
├── vercel.json
├── components.json            # shadcn/ui config
└── AGENTS.md / CLAUDE.md      # notes for AI coding agents
```

---

## 6. Getting started

**Requirements:** Node.js 20.9 or newer (Next 16's minimum), npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script                            | What it does               |
| --------------------------------- | -------------------------- |
| `npm run dev`                     | Dev server with hot reload |
| `npm run build`                   | Production build           |
| `npm start`                       | Serve the production build |
| `npm run lint`                    | ESLint                     |
| `npm run format` / `format:check` | Prettier write / check     |

No environment variables are required.

---

## 7. How things work

### Animation architecture

- **GSAP** owns choreographed, timeline and scroll-linked motion. Plugins are registered once in `src/lib/gsap.ts`; components import `gsap`, `ScrollTrigger`, etc. from there and use `useGSAP()` with a `scope` ref so selectors stay local and everything cleans up on unmount.
- **Motion** owns small component states: list entrances, hover springs, the floating badge, tab changes.
- **Lenis** smooths scrolling and drives ScrollTrigger from GSAP's ticker, so pinned/scrubbed sections stay in sync.

### Hero choreography (`Hero.tsx`)

One GSAP timeline, roughly in this order:

1. The coffee **spill** (`CoffeeSpill.tsx`) slides down to flood the section; **droplets** pop and **drips** run.
2. **Drinks** land with a small bounce; **beans** spin in.
3. The **lion badge** pops in and the logo draws itself (see below).
4. The headline letters rise (SplitText), the "&" wipes in, and the intro copy fades up.
5. Idle: the spill's edge slowly morphs between two shapes (MorphSVG) and the drips stretch, like settling liquid. On scroll, the iced coffee, smoothie, latte and beans drift at different speeds (parallax).

The four products are the shop's own transparent PNGs, trimmed to the product and converted to WebP. Tall drinks stand at the back and the sandwich and latte sit in front; each has its own `.hero-drink--*` rule in `globals.css` with an `aspect-ratio` matching its file. On phones the front row shifts left so the lion badge can sit in the bottom-right corner.

The spill is two layers: a CSS gradient "flood" that fills any height, and an SVG strip for the wavy edge and drips. Its shapes are generated in code (sine waves + Catmull-Rom curves), so they scale to any width. It runs to the bottom of the section behind the marquee, and its drips hang over the top of the Culture section.

### The lion mark (`LionMark.tsx`, `lionReveal.ts`)

The logo is a vector rebuild of the shield lion. With `animated`, it renders extra hidden layers: a shield stroke and the interior split into wedges around the head. `addLionReveal(timeline, rootSelector, startTime)` paints the shield on (DrawSVG), fills the mane flames one by one, opens the eye, then swaps back to the single static mark. The **hero badge** and the **footer** both use this helper, so they animate identically. The footer version replays each time it scrolls into view.

### Menu (`MenuBoard.tsx` + `src/data/menu.ts`)

`src/data/menu.ts` lists each tab's groups and items. Every item carries its own local `image` (`src`, factual `alt`, and an optional `focus` object-position that keeps the named item in frame when the photo is cropped), so an item can't exist without a photo. Size pricing appears in a tooltip (desktop) or under the item (carousel). A tab with a single group spans the full width on desktop (photo left, items right). The Coffee tab keeps the "Come in / Slow down" vignette beside its group.

### Third-party embeds (`Visit.tsx`, `Reviews.tsx`, `Contact.tsx`)

- **Map:** the client's Google Maps embed, as a lazy-loaded `<iframe>` that fills the map frame (485px desktop, 350px mobile). Google's embed asks for two fingers to pan on touch screens, so it doesn't trap page scrolling.
- **Reviews:** the Elfsight widget `div` plus `<Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload">`. `next/script` guarantees the script is added once. The widget's look is set in the Elfsight dashboard, not in this repo.
- **Contact form:** the Typeform `data-tf-live` `div` plus `<Script src="https://embed.typeform.com/next/embed.js">`. Typeform mounts a 500px iframe; the frame reserves that height to avoid layout shift.
- Elfsight and Typeform may restrict which domains their widgets render on. If one shows blank on a new domain, check the allowed domains in that service's dashboard.

### Culture photo (`Culture.tsx`)

A statically imported `next/image` (blur placeholder) filling the card behind an espresso gradient, so the white type stays legible. There is no video.

### Social icons (`SocialIcons.tsx`)

Brand glyphs inlined as SVG paths from Simple Icons, since lucide-react v1 dropped brand icons. This avoids an extra dependency.

---

## 8. Assets & sources

> **Image rule.** Every photo on the site is the shop's own, supplied by the client (the "Lions Den Photos" and "Lions Den Transparent Cutout" folders), plus the Develomark logo. No stock, remote or placeholder imagery is used, and there is no photo-credits section. Brand icons are **CC0**. Fonts are under the **SIL Open Font License**. Map tiles and data come from the Google Maps embed, which shows its own attribution.

### Brand assets (the shop's own)

| File                                                | What                       | Notes                                                      |
| --------------------------------------------------- | -------------------------- | ---------------------------------------------------------- |
| `public/brand/lions-den-logo.jpg`                   | Official shield-lion logo  | Used in the header                                         |
| `public/brand/lions-den-mark.svg`                   | Vector lion mark           |                                                            |
| `src/components/brand/LionMark.tsx`                 | Vector rebuild of the logo | Transparent, animatable; used in the hero badge and footer |
| `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | Site icons                 |                                                            |
| `public/lionsden-menu.pdf`                          | Printable menu             | The approved full menu and the source of all menu data     |
| `public/brand/develomark-logo-black.png`            | Develomark logo            | Footer credit; trimmed from the supplied transparent PNG   |

### Photography

All photos are local and were converted from the supplied originals with `sharp` (WebP, max ~1200px; the culture photo 1800px). The originals are kept outside the repo.

| Asset                                                   | Where it's used                  | Supplied original                                    |
| ------------------------------------------------------- | -------------------------------- | ---------------------------------------------------- |
| `images/hero/iced-coffee-cold-foam-cutout.webp`         | Hero                             | `Lions Den Transparent Cutout/1.png`                 |
| `images/hero/breakfast-sandwich-cutout.webp`            | Hero                             | `Lions Den Transparent Cutout/3.png`                 |
| `images/hero/strawberry-smoothie-cutout.webp`           | Hero                             | `Lions Den Transparent Cutout/4.png`                 |
| `images/hero/latte-red-cup-cutout.webp`                 | Hero                             | `Lions Den Transparent Cutout/6.png`                 |
| `images/features/to-go-cup-sticker.webp`                | Our Story sticker                | `Lions Den Transparent Cutout/2.png` + cream border  |
| `images/features/sfogliatella-sticker.webp`             | Reviews sticker                  | `Lions Den Transparent Cutout/5.png` + cream border  |
| `images/menu/*.webp` (12)                               | Menu thumbnails & feature photos | See `PHOTO_SHOT_LIST.md` → Live With Supplied Photos |
| `images/shop/iced-coffee-by-the-patio.webp`             | Unused (Culture is a video)      | `coffee front.jpg`                                   |
| `images/shop/storefront-patio-cannoli-espresso.webp`    | Our Story section                | `outside.jpeg`                                       |
| `images/og-lions-den-storefront.jpg`                    | Open Graph / JSON-LD image       | `outside.jpeg`, cropped to 1200×630                  |
| `images/gallery/iced-coffees-on-the-counter.webp`       | Gallery                          | `coffees.png`                                        |
| `images/gallery/bagel-sandwiches-tray.webp`             | Gallery                          | `bagels.png`                                         |
| `images/gallery/cannoli-chocolate-pistachio.webp`       | Gallery                          | `cannolis.png`                                       |
| `images/gallery/sfogliatelle-cream-tray.webp`           | Gallery                          | `pastry.png`                                         |
| `images/gallery/berry-cream-tarts.webp`                 | Gallery                          | `cream pastrys.png`                                  |
| `images/gallery/matcha-strawberry-foam-storefront.webp` | Gallery                          | `strawberry matcha.png`                              |
| `images/gallery/fall-iced-coffee.webp`                  | Gallery (seasonal)               | `fall coffee.jpeg`                                   |
| `images/gallery/winter-coffee-in-snow.webp`             | Gallery (seasonal)               | `Holiday/coffee in snow.png`                         |

Supplied cut-outs `2.png` and `5.png` are intentionally not in the hero. Photos from the later `Lion Den menu items` folder that aren't on the website (held for confirmation, not on the PDF, or duplicates) are listed in `PHOTO_SHOT_LIST.md`. Alcohol photos (`alcoholic drinks.jpg`, `Food & wine.png`, `Holiday/Mule.jpg`, `Holiday/xmas.jpg`) are not used while the after-dark permit is unconfirmed.

### Illustrations (made in code)

| Component            | What                                                  |
| -------------------- | ----------------------------------------------------- |
| `CoffeeSpill.tsx`    | Hero spill, drips, droplets, and the `CoffeeBean` SVG |
| `EspressoSaucer.tsx` | Line-drawn cup and saucer with steam (menu section)   |
| Footer steam         | Inline SVG in `SiteFooter.tsx`                        |

### Icons & fonts

| Asset                                                        | Source                                                                             | License                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| UI icons                                                     | [Lucide](https://lucide.dev) via `lucide-react`                                    | ISC                                                         |
| Social icons (Instagram, Facebook, YouTube, TikTok, Yelp)    | [Simple Icons](https://simpleicons.org) v16.33, paths inlined in `SocialIcons.tsx` | CC0-1.0 (the logos themselves are their owners' trademarks) |
| Anton, Playfair Display, Crimson Pro, Poppins, Pinyon Script | [Google Fonts](https://fonts.google.com)                                           | SIL Open Font License                                       |

---

## 9. Content editing guide

| To change…                           | Edit                                                                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Menu items, prices, sizes            | `src/data/menu.ts`. Copy names, descriptions, sizes and prices from the approved PDF; never infer them from a photo.                       |
| Add a newly photographed menu item   | See **Adding a menu photo** below                                                                                                          |
| Hours, address, phone                | `Visit.tsx`, `SiteFooter.tsx`, `Hero.tsx` (stats), and the JSON-LD in `layout.tsx`. These are **not centralized yet**, so update all four. |
| Social links                         | `SiteFooter.tsx` (`SOCIALS`) and `sameAs` in `layout.tsx`                                                                                  |
| Page title, description, share image | `metadata` in `src/app/layout.tsx`                                                                                                         |
| Hero drinks                          | `HERO_DRINKS` in `Hero.tsx`. For a framed photo instead of a cut-out, set `cutout: false`.                                                 |
| Gallery photos                       | `photos` in `Atmosphere.tsx` (captions describe the moment, not a specific menu item)                                                      |
| Culture photo                        | The static import at the top of `Culture.tsx`                                                                                              |
| Footer background                    | `.site-footer` in `globals.css` (a plain latte gradient)                                                                                   |
| Footer credit logo                   | `public/brand/develomark-logo-black.png`, sized by `.footer-credit-logo` in `globals.css`                                                  |
| Colors / fonts                       | The `@theme` block at the top of `globals.css` (fonts are also loaded by the URL in `layout.tsx`)                                          |
| Section order                        | `src/app/page.tsx`                                                                                                                         |

### Adding a menu photo

1. Confirm the item is on the approved menu (`public/lionsden-menu.pdf`) and that the photo clearly shows **that** item. If it's ambiguous, don't publish it; add it to the review notes in `PHOTO_SHOT_LIST.md`.
2. Convert the photo to WebP (about 1200px on the long side) with a descriptive filename, e.g. `public/images/menu/chai-latte-iced.webp`. `sharp` is already installed as a Next dependency.
3. In `src/data/menu.ts`, add the item to the right tab and group (in PDF order; the group's first item is its desktop feature photo), copying name, description, sizes and price from the PDF. If the PDF prints more than one price without saying what each is for, copy it verbatim into `priceText`. Give it `image.src`, a factual `alt` (what's visible, with no unverified ingredients) and, if the crop hides the item, a `focus` object-position.
4. Move the item from **Needs Photos** to **Live With Supplied Photos** in `PHOTO_SHOT_LIST.md`.
5. Run `npm run lint` and `npm run build`, then check the tab on desktop and mobile.

---

## 10. SEO, accessibility & performance

**SEO**

- Title and description tuned for "Italian coffee in Plantsville, CT"; Open Graph with a 1200×630 crop of the storefront photo.
- `CafeOrCoffeeShop` **JSON-LD** (schema.org) in `layout.tsx`: address, phone, email, hours (`Mo-Fr 06:00-19:00`, `Sa-Su 07:00-19:00`) and social profiles, for Google's local results.
- One `<h1>` ("Sip and stay" plus the shop name, via screen-reader text); sections are labeled landmarks with `aria-labelledby`.

**Accessibility**

- A skip link to the main content, visible focus rings (gold outline), and labeled icon-only buttons (socials, round arrow) and titled iframes (map).
- **Reduced motion is respected everywhere:** GSAP work runs inside `matchMedia("(prefers-reduced-motion: no-preference)")`, Lenis is disabled, and a global CSS rule turns off CSS animations and transitions. Everything renders in its finished state.
- Decorative art (spill, beans, steam, marquee) is `aria-hidden`.

**Performance**

- `next/image` for all photos (responsive `sizes`, lazy by default; hero products load eagerly, the iced coffee with high fetch priority). Source files are pre-sized WebP.
- The map iframe is lazy-loaded; the Elfsight script loads at idle time (`lazyOnload`) and its widget is lazy (`data-elfsight-app-lazy`).

---

## 11. Deployment

Deployed on **Vercel** as a standard Next.js project (`vercel.json`: `npm install` → `next build`). Push to the connected branch to deploy.

---

## 12. Open items / TODOs

- **More menu photos:** most of the PDF menu isn't on the website yet because no supplied photo matches it. See **Needs Photos** in `PHOTO_SHOT_LIST.md`.
- **After-dark menu:** a cocktail block is on hold until the client confirms their renewed permit (`src/data/menu.ts`).
- **Centralize business info:** address, hours and the Toast URL are exported from `Header.tsx` and reused by the footer; the Visit section, hero stats and `layout.tsx` still repeat them. Move them to one data file.
- **Menu PDF:** confirm `public/lionsden-menu.pdf` is the current menu once the client's media package is in hand.
- **Copyright year** in the footer is hard-coded (2026).
- **Duplicate helper:** `ui/tabs.tsx` and `ui/tooltip.tsx` import `cn` from the `cn` npm package instead of `@/lib/utils`. Point them at the local helper and drop the package.
- **Default Next.js files** in `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) are unused starter assets and can be deleted.
