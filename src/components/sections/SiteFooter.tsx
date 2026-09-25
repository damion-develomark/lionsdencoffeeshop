import { ArrowUpRight } from "lucide-react";
import { LionMark } from "@/components/brand/LionMark";
const socials = [
  ["Instagram", "https://www.instagram.com/lionsden_coffee/"],
  ["Facebook", "https://www.facebook.com/lionsdencoffeeshopCT"],
  [
    "YouTube",
    "https://www.youtube.com/channel/UC2ybOXg47gGzBELnd_4OwXw/featured",
  ],
  ["TikTok", "https://www.tiktok.com/@lionsdencoffeeshop"],
  ["Yelp", "https://www.yelp.com/biz/lions-den-coffee-shop-southington-2"],
];
export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <p>
          Italian coffee, honest food,
          <br />
          and good company.
        </p>
        <p>
          57 W Main St
          <br />
          Plantsville, CT 06479
        </p>
      </div>
      <div className="footer-bottom">
        <a
          href="#top"
          className="footer-brand"
          aria-label="Lions Den, back to top"
        >
          <LionMark variant="head" decorative />
          <span>LIONS DEN</span>
        </a>
        <nav aria-label="Social media">
          {socials.map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noreferrer">
              {label}
              <ArrowUpRight size={12} />
            </a>
          ))}
        </nav>
        <small>© 2026 Lions Den Coffee LLC</small>
      </div>
    </footer>
  );
}
