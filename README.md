# Lions Den Coffee Shop — Website

The marketing website for **Lions Den Coffee Shop**, an Italian-style neighborhood coffee house at 57 W Main St in Plantsville, Connecticut. It's a single, scroll-driven page that introduces the shop, shows the full menu, tells the family story, and gets people through the door (call, directions, socials).

- **Production URL:** https://www.lionsdencoffeeshop.com (set as `metadataBase` in `src/app/layout.tsx`)
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Motion · MapLibre
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
| **Hours**        | Open daily, 6:00 AM – 7:00 PM                                                   |
| **Phone**        | (860) 426-2809                                                                  |
| **Email**        | lionsdencoffeect@gmail.com                                                      |
| **Service area** | Plantsville / Southington, plus a short trip from Cheshire, Bristol and Wolcott |

**Positioning.** An Italian coffee house with a neighborhood feel: _"Italian coffee, honest food, and good company."_ The recurring message is that "every order is an interaction, not a transaction" — the site sells the experience of slowing down and staying, not just the drinks.

**Mission (quoted on the site).** _"To enrich the American culture where people enjoy life, family, and friends."_ Values shown on the site: **Service · Quality · Community**.

**What they sell** (all in `src/data/menu.ts`):

| Tab            | Groups                                                                                                                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Coffee**     | Signature Lattes (Caramel Biscotti, Nutella, Honey Bee Cortado) · Espresso Bar (Espresso, Italian Cappuccino, Ameridomo) · House Coffee (Lions Blend Cold Brew, Hot Black Velvet, Brown Sugar Shaken Espresso) |
| **Not Coffee** | Tea & Company (Matcha, Chai, London Fog) · Something Cool (Refreshers, Frappes, Smoothies)                                                                                                                     |
| **Breakfast**  | Morning Favorites (The Carnivore, The Inferno, Southern Sunrise) · A Brighter Start (Lox Bagel, The California, Yogurt Parfait)                                                                                |
| **Lunch**      | From the Panini Press (Chicken & Pesto, Vodka Parmigiana, Chipotle Club) · A Little Lighter (Smoked Salmon Avocado Toast, Caprese Panini, Classic Avocado Toast)                                               |

The full printable menu is also available as a PDF at `public/lionsden-menu.pdf` (linked from the menu section as "Full menu").

**Goals of the site.**

1. Make the shop feel warm and personal before anyone visits.
2. Make the menu easy to browse on a phone, with prices and sizes.
3. Drive visits and orders: **Call to order** (tap-to-call) and **Get directions** (Google Maps) appear in the header, hero, visit section and footer.
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
| Spill gradient       | `#f8e8c4 → #ecd09e → #dab478` | Hero "coffee spill" and the footer's latte tint   |

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

| #   | Section                  | Component                             | What it does                                                                                                                                                                                                                                                                 |
| --- | ------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| —   | **Header**               | `sections/Header.tsx`                 | Floating pill nav, fixed to the top and visible at all times. Logo, Menu / Our Story / Visit links, "Call to order" button; a slide-out sheet on mobile. Turns frosted once you scroll.                                                                                      |
| 1   | **Hero**                 | `sections/Hero.tsx`                   | "SIP & STAY." headline (white Anton with espresso outline, gold "&"). A coffee spill pours down the section, drips run, cut-out drinks and beans land, and the lion badge draws itself. Stats (2020 · 6AM · 57), stacked CTAs, and a tilted gold marquee.                    |
| 2   | **Culture**              | `sections/Culture.tsx`                | Full-width video card of a busy café bar, espresso-tinted, with "Come for the coffee. Stay for the people." and an "Our story" button.                                                                                                                                       |
| 3   | **Menu** (`#menu`)       | `sections/MenuBoard.tsx`              | "Your daily ritual." Tabs for Coffee / Not Coffee / Breakfast / Lunch; each group has a feature photo, and each item has a thumbnail, price, and a size/price tooltip. Includes the "Come in / Slow down" sticker, animated espresso saucer, and a photo-credits disclosure. |
| 4   | **Our Story** (`#about`) | `sections/SlowDownBand.tsx`           | Dark panel: "More than coffee. A sense of belonging.", the founders, the mission quote and the values pills.                                                                                                                                                                 |
| 5   | **Gallery** (`#gallery`) | `sections/Atmosphere.tsx`             | "Pull up a chair." A horizontal photo strip that's pinned and scrubbed sideways as you scroll on desktop.                                                                                                                                                                    |
| 6   | **Visit** (`#visit`)     | `sections/Visit.tsx` + `VisitMap.tsx` | Address, hours, phone, email, "Get directions", and an interactive map with a custom lion pin, recolored to the brand palette.                                                                                                                                               |
| 7   | **Footer**               | `sections/SiteFooter.tsx`             | Latte-tinted coffee photo background. Lion logo (replays the hero's draw-on animation when scrolled into view) with rising steam, tagline, address & hours, nav links, the two CTAs, social icons and copyright.                                                             |

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
| `maplibre-gl`              | ^6.11       | Open-source WebGL map renderer for the Visit map                                                                                                                                                                                                            |
| `react-map-gl`             | ^8.1        | React bindings for MapLibre (`react-map-gl/maplibre`)                                                                                                                                                                                                       |
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

| Service                                                   | Used for                                                               |
| --------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Google Fonts**                                          | The five web fonts                                                     |
| **OpenFreeMap** (`tiles.openfreemap.org`, Positron style) | Free vector map tiles for the Visit map                                |
| **OpenStreetMap**                                         | Map data behind the tiles (attribution shown on the map, required)     |
| **Pexels / Unsplash CDNs**                                | Menu photos and the footer background, served straight from their CDNs |
| **Google Maps**                                           | "Get directions" links (opens in a new tab)                            |
| **Vercel**                                                | Hosting                                                                |

---

## 5. Project structure

```
.
├── public/
│   ├── brand/                 # lions-den-logo.jpg (header), lions-den-mark.svg
│   ├── images/
│   │   ├── hero/              # background-removed drink cut-outs (.webp)
│   │   ├── latte-art.webp     # gallery
│   │   ├── pastries.webp      # gallery
│   │   └── patio.webp         # gallery, story section, Open Graph image
│   ├── videos/                # cafe-culture.mp4 + poster (Culture section)
│   ├── maplibre/              # MapLibre worker, copied here on install (generated)
│   └── lionsden-menu.pdf      # printable menu
├── scripts/
│   └── copy-maplibre-worker.mjs
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
│   ├── data/menu.ts           # the menu: items, prices, sizes, photos, credits
│   └── lib/                   # gsap.ts (plugin registration), utils.ts (cn)
├── next.config.ts             # allowed remote image hosts
├── vercel.json
├── components.json            # shadcn/ui config
└── AGENTS.md / CLAUDE.md      # notes for AI coding agents
```

---

## 6. Getting started

**Requirements:** Node.js 20.9 or newer (Next 16's minimum), npm.

```bash
npm install          # also runs the postinstall step that copies the MapLibre worker
npm run dev          # http://localhost:3000
```

| Script                            | What it does                                |
| --------------------------------- | ------------------------------------------- |
| `npm run dev`                     | Dev server with hot reload                  |
| `npm run build`                   | Production build                            |
| `npm start`                       | Serve the production build                  |
| `npm run lint`                    | ESLint                                      |
| `npm run format` / `format:check` | Prettier write / check                      |
| `postinstall` (automatic)         | `scripts/copy-maplibre-worker.mjs` — see §7 |

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
5. Idle: the spill's edge slowly morphs between two shapes (MorphSVG) and the drips stretch, like settling liquid. On scroll, the drinks and beans drift at different speeds (parallax).

The spill is two layers: a CSS gradient "flood" that fills any height, and an SVG strip for the wavy edge and drips. Its shapes are generated in code (sine waves + Catmull-Rom curves), so they scale to any width. It runs to the bottom of the section behind the marquee, and its drips hang over the top of the Culture section.

### The lion mark (`LionMark.tsx`, `lionReveal.ts`)

The logo is a vector rebuild of the shield lion. With `animated`, it renders extra hidden layers: a shield stroke and the interior split into wedges around the head. `addLionReveal(timeline, rootSelector, startTime)` paints the shield on (DrawSVG), fills the mane flames one by one, opens the eye, then swaps back to the single static mark. The **hero badge** and the **footer** both use this helper, so they animate identically. The footer version replays each time it scrolls into view.

### Menu (`MenuBoard.tsx` + `src/data/menu.ts`)

The data file defines items per tab and group, then a separate `photos` map keyed by item slug. At build time each item is joined to its photo, and a **missing photo throws an error**, so the menu can't ship with a broken image. Photos flagged `placeholder: true` show a "Sample" tag in development only. Size pricing appears in a tooltip.

### Map (`VisitMap.tsx`)

MapLibre + react-map-gl with the free OpenFreeMap "Positron" style, recolored at runtime from the CSS brand tokens, so the map never hard-codes colors. The shop is pinned with a custom lion marker and a gold label. MapLibre 6 loads its web worker as a separate file that Next's bundler doesn't emit, so the **postinstall script copies the worker into `public/maplibre/`** and the map points `setWorkerUrl()` at it. The map needs WebGL2; without it (e.g. some headless browsers) it shows an empty panel.

### Culture video (`Culture.tsx`)

A muted, looping, inline `<video>` with a poster image. It **only plays while on screen** (IntersectionObserver) and never plays for visitors who prefer reduced motion.

### Social icons (`SocialIcons.tsx`)

Brand glyphs inlined as SVG paths from Simple Icons, since lucide-react v1 dropped brand icons. This avoids an extra dependency.

---

## 8. Assets & sources

> **Licensing summary.** Stock photos and video come from **Pexels** and **Unsplash**. Both licenses allow free commercial use with no attribution required; the site credits them anyway, in the menu's "Photo credits" disclosure. Brand icons are **CC0**. Fonts are under the **SIL Open Font License**. Map data is **© OpenStreetMap contributors (ODbL)**, which _requires_ the on-map attribution — don't hide it.

### Brand assets (the shop's own)

| File                                                | What                       | Notes                                                               |
| --------------------------------------------------- | -------------------------- | ------------------------------------------------------------------- |
| `public/brand/lions-den-logo.jpg`                   | Official shield-lion logo  | Used in the header                                                  |
| `public/brand/lions-den-mark.svg`                   | Vector lion mark           |                                                                     |
| `src/components/brand/LionMark.tsx`                 | Vector rebuild of the logo | Transparent, animatable; used in the hero badge, footer and map pin |
| `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | Site icons                 |                                                                     |
| `public/lionsden-menu.pdf`                          | Printable menu             |                                                                     |

### Photography & video

| Asset                                        | Where it's used                                | Source                                                                                                                                                                                                                                            |
| -------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/latte-art.webp`               | Gallery                                        | Shop photo — lattes in the Lions Den red cups (source not recorded in the repo)                                                                                                                                                                   |
| `public/images/pastries.webp`                | Gallery                                        | Shop photo — cannoli and pastries (source not recorded in the repo)                                                                                                                                                                               |
| `public/images/patio.webp`                   | Gallery, story section, Open Graph share image | Shop photo — storefront and patio (source not recorded in the repo)                                                                                                                                                                               |
| `public/images/hero/*-cutout.webp` (3 files) | Hero drinks                                    | Background-removed stand-in drink photos, **placeholders** until the shop's own drinks are shot. Original source not recorded in the repo.                                                                                                        |
| `public/videos/cafe-culture.mp4`             | Culture section                                | [Pexels video #29719125](https://www.pexels.com/video/29719125/), re-encoded to 720p (39 MB → 7.6 MB) with macOS `avconvert`. **Stock footage of a different café** — replace with footage of Lions Den when available.                           |
| `public/videos/cafe-culture-poster.jpg`      | Culture section poster                         | Frame taken from the video above                                                                                                                                                                                                                  |
| Footer background                            | `SiteFooter` (CSS in `globals.css`)            | [Pexels photo #37034118](https://www.pexels.com/photo/37034118/), hot-linked from the Pexels CDN (not downloaded) at 1920px wide, under an 88% latte tint                                                                                         |
| Menu photos (28)                             | Menu thumbnails and feature photos             | **19 from Pexels, 9 from Unsplash**, hot-linked from their CDNs. Each entry in `src/data/menu.ts` records its source page and, for Unsplash, the photographer. **5 are marked `placeholder`** (stand-ins that don't match the real item closely). |

Credited Unsplash photographers: Nadia Valko, Lee Milo, Toa Heftiba, Circle Digital Marketing Agency, Leonardo Ziaja, David B Townsend, Monika Grabkowska, Konstantinos Papadopoulos, Caroline Green.

Remote image hosts are allow-listed in `next.config.ts` (`images.pexels.com`, `images.unsplash.com`) so `next/image` can optimize them.

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

| To change…                           | Edit                                                                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Menu items, prices, sizes, notes     | `src/data/menu.ts` → `baseMenu`                                                                                                                              |
| A menu photo                         | `src/data/menu.ts` → `photos[slug]` (use the `pexels()` / `unsplash()` helpers; every item needs one, or the build fails)                                    |
| Hours, address, phone                | `Visit.tsx`, `SiteFooter.tsx`, `Hero.tsx` (stats), and the JSON-LD in `layout.tsx`. These are **not centralized yet**, so update all four.                   |
| Social links                         | `SiteFooter.tsx` (`SOCIALS`) and `sameAs` in `layout.tsx`                                                                                                    |
| Page title, description, share image | `metadata` in `src/app/layout.tsx`                                                                                                                           |
| Hero drinks                          | `HERO_DRINKS` in `Hero.tsx`. For a framed photo instead of a cut-out, set `cutout: false`.                                                                   |
| Gallery photos                       | `photos` in `Atmosphere.tsx`                                                                                                                                 |
| Culture video                        | Replace `public/videos/cafe-culture.mp4` and the poster, and update the `VIDEO` / `POSTER` constants in `Culture.tsx`. Keep it short, muted and under ~8 MB. |
| Footer background                    | The `url(...)` in `.site-footer` in `globals.css`; the tint is the `rgb(248 232 196 / 88%)` layer above it                                                   |
| Colors / fonts                       | The `@theme` block at the top of `globals.css` (fonts are also loaded by the URL in `layout.tsx`)                                                            |
| Section order                        | `src/app/page.tsx`                                                                                                                                           |

---

## 10. SEO, accessibility & performance

**SEO**

- Title and description tuned for "Italian coffee in Plantsville, CT"; Open Graph with the patio photo.
- `CafeOrCoffeeShop` **JSON-LD** (schema.org) in `layout.tsx`: address, phone, email, hours (`Mo-Su 06:00-19:00`) and social profiles, for Google's local results.
- One `<h1>` ("Sip and stay" plus the shop name, via screen-reader text); sections are labeled landmarks with `aria-labelledby`.

**Accessibility**

- A skip link to the main content, visible focus rings (gold outline), and labeled icon-only buttons (socials, map, round arrow).
- **Reduced motion is respected everywhere:** GSAP work runs inside `matchMedia("(prefers-reduced-motion: no-preference)")`, Lenis is disabled, the video doesn't play, and a global CSS rule turns off CSS animations and transitions. Everything renders in its finished state.
- Decorative art (spill, beans, steam, marquee) is `aria-hidden`.

**Performance**

- `next/image` for photos (responsive `sizes`, lazy by default; hero drinks load eagerly, the main one with high fetch priority).
- The background video is compressed, `preload="metadata"`, and pauses off-screen.
- The MapLibre library is lazy-loaded.
- Remote stock photos are requested pre-sized from the CDN (`w=1600` / `w=1920`, compressed).

---

## 11. Deployment

Deployed on **Vercel** as a standard Next.js project (`vercel.json`: `npm install` → `next build`). Push to the connected branch to deploy. The `postinstall` step runs on Vercel too, so the MapLibre worker is always present in the build.

---

## 12. Open items / TODOs

- **Online ordering:** "Call to order" is a `tel:` link. Replace it with the client's verified Toast ordering URL (`Header.tsx`).
- **Real photography:** replace the hero drink cut-outs, the 5 placeholder menu photos and the stock café video with shots of the actual shop and drinks; add more client photos to the gallery (`Atmosphere.tsx`).
- **Record image sources:** the origin of the hero cut-outs and the three gallery photos isn't documented. Confirm and note them here.
- **After-dark menu:** a cocktail block is on hold until the client confirms their renewed permit (`src/data/menu.ts`).
- **Centralize business info:** hours, address and phone are repeated in several components. Move them to one data file.
- **Copyright year** in the footer is hard-coded (2026).
- **Duplicate helper:** `ui/tabs.tsx` and `ui/tooltip.tsx` import `cn` from the `cn` npm package instead of `@/lib/utils`. Point them at the local helper and drop the package.
- **Default Next.js files** in `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) are unused starter assets and can be deleted.
