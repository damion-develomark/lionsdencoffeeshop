# Lions Den Coffee Shop — semantic HTML and SEO audit

Date: September 30, 2026. Scope: current repository, server-rendered HTML at `http://localhost:3417/`, browser DOM/accessibility inspection, and local resource responses. This is an audit; application code has not been changed.

The site has a good semantic foundation. Its biggest opportunity is exposing the full menu as crawlable HTML, followed by more descriptive headings. There is no demonstrated keyword cannibalization between content pages in this repository: it contains one homepage route. Production indexing, legacy URLs, search demand, rankings, Google Business Profile consistency, and field Core Web Vitals remain unverified.

## Prioritized findings

| Priority | Finding                                                                   | Evidence                                                                                                                                                                                    | Recommended action                                                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High     | Most menu content requires selecting a tab                                | `src/components/sections/MenuBoard.tsx:395` initializes Coffee; line 514 renders only `menu[tab]`. Initial HTML contains the Classic Latte item but not the other categories' item details. | Server-render all approved menu content, retaining accessible tabs if desired, or provide a linked HTML menu page containing every category. Do not rely on Google clicking tabs.                               |
| Medium   | H1 identifies the brand but not the location; visible heading is a slogan | `Hero.tsx:195`: accessible H1 is “Lions Den Coffee Shop®. Sip and stay.” Visible text is “SIP & STAY.” Plantsville appears nearby, outside the H1.                                          | Use a descriptive visible H1 such as “Lions Den Coffee Shop in Plantsville, CT”; retain the slogan as supporting display text. This improves clarity, not compliance with a mandatory exact-match keyword rule. |
| Medium   | Important H2s do not describe their sections clearly in isolation         | Menu: “Your daily ritual.” Visit: “The coffee’s on. Come on over.” Reviews: “Don’t take our word for it. Take theirs.”                                                                      | Prioritize “Coffee, Breakfast & Lunch Menu”, “Visit Lions Den in Plantsville”, and “Lions Den Customer Reviews”. Keep brand language as supporting copy.                                                        |
| Medium   | No explicit canonical URL                                                 | No canonical link in served HTML; `src/app/layout.tsx:12` sets `metadataBase` but not `alternates.canonical`.                                                                               | Add a self-referencing canonical for the chosen production homepage. Verify HTTPS and preferred-host redirects on the live domain. Missing canonical does not itself prove duplicate indexing.                  |
| Low      | Meta description is verbose                                               | Description in `src/app/layout.tsx:14` measures 187 characters and includes the full weekly hours.                                                                                          | Front-load the location and offering. Suggested copy below. Hours already appear on-page and in schema.                                                                                                         |
| Low      | No sitemap or robots file                                                 | Local `/sitemap.xml` and `/robots.txt` both return 404; no corresponding app/public files.                                                                                                  | Add a sitemap containing canonical indexable URLs and a robots file pointing to it. These are useful housekeeping, not evidence that this one-page site cannot be indexed.                                      |
| Low      | Full menu depends on a PDF                                                | Menu copy explicitly describes the HTML as only a photographed selection. PDF returns 200.                                                                                                  | Publish the approved full menu as text even when product photos are unavailable. Keep the PDF as a download.                                                                                                    |

Google explains that its crawlers do not click buttons to load content: [JavaScript lazy-loading guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading). Canonical links are a preference signal, not a guarantee: [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Heading and semantic inventory

Initial HTML has one H1, seven H2s, two H3s, and two H4s. The hierarchy follows H1 → section H2 → menu-group H3 → item H4, without skipped levels in the inspected content. “Classic Latte” occurs twice because desktop and mobile representations both render; responsive CSS controls which presentation appears. This duplication is not page-level keyword cannibalization.

| Current H2                                 | Suggested treatment                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| Come for the coffee. Stay for the people.  | Optional: “Italian Coffee & Community”                                           |
| Your daily ritual.                         | “Coffee, Breakfast & Lunch Menu”                                                 |
| More than coffee. A sense of belonging.    | “The Lions Den Story”                                                            |
| Pull up a chair.                           | “Inside Lions Den: Coffee, Food & Patio”                                         |
| Don’t take our word for it. Take theirs.   | “Lions Den Customer Reviews”                                                     |
| The coffee’s on. Come on over.             | “Visit Lions Den in Plantsville”                                                 |
| Questions, catering, or just saying hello? | “Contact Lions Den” — confirm catering availability before developing that topic |

Not every heading needs a location or exact-match keyword. There is no required H1/H2 character count or useful universal keyword-density target. Keep one clear page topic and use descriptive subsection headings. Google recommends a distinct main title and concise, descriptive title text: [title-link guidance](https://developers.google.com/search/docs/appearance/title-link).

Passing semantic checks: one main landmark, header, footer, labeled navigation, a skip link targeting `#main`, named sections using `aria-labelledby`, `lang="en"`, descriptive map iframe title, real anchor links, and telephone/email links. Using `<address>` for shop contact information would be an optional semantic refinement, not a material ranking fix.

## Metadata and alt text

- Current title: “Lions Den Coffee Shop® | Italian Coffee in Plantsville, CT” — 58 characters as measured from source and browser. It already includes brand, category, and locality; no urgent rewrite needed.
- Current description: 187 characters. Suggested replacement: “Visit Lions Den Coffee Shop in Plantsville, CT for Italian-style coffee, breakfast and paninis. Explore our menu and find us at 57 W Main St.”
- Google does not impose a fixed title or description character limit; display is truncated according to available width. Conventional length targets are editorial heuristics. [Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet).
- Initial HTML contains 25 `<img>` elements, zero missing alt attributes, and eight empty alt attributes. Empty attributes serve decorative/redundant images: the logo beside brand text, menu thumbnails with labeled controls, and the decorative footer slideshow.
- Nonempty alt text measures 10–107 characters in the inspected initial output. Product and gallery descriptions are specific and show no obvious keyword stuffing. Do not pad them with “coffee shop Plantsville CT.”
- There is no universal SEO requirement to keep alt text below 125 characters. Use the shortest useful description for the image's purpose. [Google image guidance](https://developers.google.com/search/docs/appearance/google-images).
- These alt checks establish attribute presence, wording, and length; they are not a complete visual comparison of every image against its description or a complete audit of all interactive states.
- Open Graph image and Twitter card metadata are present in served HTML. The OG image returns 200. Twitter metadata is generated even though there is no explicit Twitter object in the source.

## Keyword targeting and cannibalization

Suggested intent map, based on the business and current content rather than measured search volume:

| URL or section                         | Primary intent                                           | Supporting topics                                               |
| -------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| Homepage `/`                           | Coffee shop in Plantsville, CT; Lions Den brand searches | Italian-style coffee, espresso, breakfast, paninis, patio       |
| Homepage visit section                 | Address, hours, directions                               | Plantsville location; nearby Southington context where accurate |
| Future `/menu`, if created             | Lions Den menu and prices                                | Coffee, non-coffee drinks, breakfast, lunch                     |
| Future catering page, only if verified | Actual catering offering                                 | Options, ordering, lead times, service area                     |

Anchor destinations such as `/#menu` and `/#visit` are sections of the same document, not competing landing pages. Repeating “coffee” naturally in those sections is not cannibalization.

The PDF is a separate potentially indexable document, but there is no evidence it is harming rankings. Do not canonicalize the full-menu PDF to a homepage that contains only a selection. If an equivalent full HTML menu is created, evaluate a PDF HTTP canonical pointing to that page. Avoid producing near-identical town pages with only the city name swapped.

To establish actual cannibalization, inspect Search Console queries against landing pages over time, identify multiple URLs serving the same intent, and assess whether the overlap is harmful. Also inventory legacy production URLs and any migration redirects. None of that data was available in this audit.

## Local SEO, performance, and remaining validation

`CafeOrCoffeeShop` JSON-LD is already present with name, URL, image, phone, email, address, opening hours, and social profiles. The supplied phone, address, and hours agree with visible page content. External business accuracy has not been independently verified. Validate deployed markup with Google's Rich Results Test; consider a stable entity `@id` and full menu URL. Do not invent coordinates, prices, review counts, or ratings.

Reviews and the contact form rely on third-party embeds. They are absent from initial HTML; don't rely on review-widget text as primary indexable copy. The site uses several font families, animation libraries, hero images, and third-party scripts. Measure production mobile LCP, INP, and CLS before attributing any ranking issue to performance; no Lighthouse or field performance score was collected.

The preferred browser CLI was unavailable, so the in-app browser was used. Browser inspection confirmed the initial headings and metadata. A Breakfast-tab click did not produce a changed panel during inspection; no browser errors were captured. Successful tab interaction was not established, so investigate that separately before launch. The crawlability finding is independently supported by source and initial HTML.

## Recommended implementation order

1. Make all approved menu text available without requiring interaction; investigate the tab behavior.
2. Improve the H1 and key H2s while preserving the site's visual design.
3. Add the canonical, sitemap, and robots file; tighten the description.
4. Verify production host redirects, indexability, structured data, mobile performance, and business details.
5. Use Search Console query/page data to decide whether any additional landing pages or consolidation are warranted.

## Implementation update — September 30, 2026

Implemented the first remediation pass: visible business/location H1; descriptive section headings; shorter description; homepage canonical; Open Graph URL/site name; stable business schema ID; sitemap and robots routes; and all four existing menu categories rendered into the initial HTML. Inactive categories remain hidden from layout and accessibility navigation until selected. Animations initialize only for active menu blocks.

Validation: production build (including TypeScript) and ESLint pass; initial HTML confirms one H1, four menu panels, all menu-data item names, canonical, and no missing image alt attributes. Robots and sitemap return 200. Browser checks confirm all four tabs select correctly with one visible panel, no captured console errors, and no horizontal overflow at desktop or 390px mobile width. The earlier unverified tab behavior was not reproduced with the new production build.

Remaining: PDF-only items have not been transcribed; production redirects/indexing, Search Console cannibalization analysis, field performance, and externally verified business information require separate validation. No deployment was performed.
