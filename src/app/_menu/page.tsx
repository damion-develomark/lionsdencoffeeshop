// DISABLED: the site is a single page for now. The leading underscore in
// `_menu` makes this a private folder, so Next.js serves no /menu route.
// To bring the full menu page back, rename the folder to `menu`, then
// restore the /menu links (header/footer NAV `page`, MenuBoard, FAQ,
// sitemap, schema `hasMenu`, retail redirect).
import type { Metadata } from "next";
import { ArrowUpRight, Download, Phone } from "lucide-react";
import { Anchor, Header, ORDER_ONLINE_URL } from "@/components/sections/Header";
import { SiteFooter } from "@/components/sections/SiteFooter";
import {
  FULL_MENU,
  type FullMenuItem,
  type FullMenuSection,
} from "@/data/full-menu";

const PAGE_URL = "https://www.lionsdencoffeeshop.com/menu";
const TITLE = "Menu & Prices | Lions Den Coffee Shop, Plantsville, CT";
const DESCRIPTION =
  "The full Lions Den Coffee Shop menu with prices: espresso drinks, lattes, drip coffee, tea, smoothies, kids' drinks, breakfast sandwiches, parfaits, paninis and toasts.";

// Menu/price intent lives here; the homepage keeps the local-shop overview
// and a photographed selection that links to this page.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  // Replaces the layout's openGraph object (metadata merges shallowly), so
  // the image is repeated here.
  openGraph: {
    url: PAGE_URL,
    siteName: "Lions Den Coffee Shop",
    title: "Lions Den Coffee Shop Menu & Prices",
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-lions-den-storefront.jpg",
        width: 1200,
        height: 630,
        alt: "A cannoli and a coffee on the patio in front of the Lions Den Coffee Shop storefront",
      },
    ],
    type: "website",
  },
};

const JUMP = [
  { label: "Coffee", href: "#coffee" },
  { label: "Not Coffee", href: "#not-coffee" },
  { label: "Breakfast", href: "#breakfast" },
  { label: "Lunch", href: "#lunch" },
];

function MenuItemRow({
  item,
  sizes,
}: {
  item: FullMenuItem;
  sizes?: string[];
}) {
  const sized = (item.prices ?? [])
    .map((price, i) => (price ? { size: sizes?.[i], price } : null))
    .filter((entry) => entry !== null);
  const tag =
    item.price ??
    (sized.length > 1 ? `from ${sized[0].price}` : sized[0]?.price);
  return (
    <li className="full-item">
      <div className="item-line">
        <span className="full-item-name">
          {item.name}
          {item.only && <small> ({item.only})</small>}
        </span>
        <span className="item-leader" aria-hidden />
        {tag && <span className="item-price">{tag}</span>}
      </div>
      {item.description && <p className="full-item-desc">{item.description}</p>}
      {sized.length > 0 && (
        <dl className="full-item-sizes">
          {sized.map(({ size, price }) => (
            <div key={size}>
              <dt>{size}</dt>
              <dd>{price}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}

function MenuSectionBlock({ section }: { section: FullMenuSection }) {
  return (
    <div className="full-menu-block" id={section.id}>
      <h3>{section.title}</h3>
      <div className="gold-rule" />
      <ul>
        {section.items.map((item) => (
          <MenuItemRow key={item.name} item={item} sizes={section.sizes} />
        ))}
      </ul>
      {section.notes && (
        <div className="full-menu-notes">
          {section.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header base="/" current="/menu" />
      <main id="main">
        <section
          id="top"
          className="full-menu-hero"
          aria-labelledby="menu-page-title"
        >
          <div className="shell">
            <p className="eyebrow">57 W Main St · Plantsville, CT</p>
            <h1 id="menu-page-title" className="full-menu-title">
              <span className="full-menu-kicker">Lions Den Coffee Shop</span>{" "}
              <span className="menu-title-pop">Menu &amp; prices</span>
            </h1>
            <p className="full-menu-lede">
              Everything on our printed menu, from espresso and lattes to
              breakfast sandwiches, paninis and avocado toasts. Prices and items
              are subject to change without notice.
            </p>
            <div className="full-menu-actions">
              <a
                className="button"
                href={ORDER_ONLINE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Order online <ArrowUpRight size={16} />
              </a>
              <a className="button" href="tel:+18604262809">
                Call to order <Phone size={16} />
              </a>
              <a
                href="/lionsden-menu.pdf"
                className="text-link"
                download="lions-den-coffee-shop-menu.pdf"
                type="application/pdf"
              >
                Download the menu (PDF) <Download size={18} />
              </a>
            </div>
            <nav
              className="menu-tabs full-menu-jump"
              aria-label="Menu categories"
            >
              {JUMP.map(({ label, href }) => (
                <Anchor key={href} href={href} className="menu-tab">
                  {label}
                </Anchor>
              ))}
            </nav>
          </div>
        </section>

        {FULL_MENU.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="full-menu-category"
            aria-labelledby={`${category.id}-title`}
          >
            <div className="shell">
              <h2 id={`${category.id}-title`} className="full-menu-cat-title">
                {category.title}
              </h2>
              {category.note && (
                <p className="full-menu-cat-note">{category.note}</p>
              )}
              <div className="full-menu-grid">
                {category.sections.map((section) => (
                  <MenuSectionBlock key={section.id} section={section} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="full-menu-foot" aria-label="Allergies and prices">
          <div className="shell">
            <p>
              <strong>Please alert staff of any allergies!</strong> Prices and
              items are subject to change without notice.
            </p>
            <Anchor href="/" className="text-link">
              Back to the Lions Den homepage <ArrowUpRight size={17} />
            </Anchor>
          </div>
        </section>
      </main>
      <SiteFooter base="/" />
    </>
  );
}
