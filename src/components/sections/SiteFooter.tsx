"use client";
import { useRef } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LionMark } from "@/components/brand/LionMark";
import { DripEdge } from "@/components/brand/CoffeeSpill";
import {
  SocialIcon,
  type SocialIconName,
} from "@/components/brand/SocialIcons";

const SOCIALS: [SocialIconName, string, string][] = [
  ["instagram", "Instagram", "https://www.instagram.com/lionsden_coffee/"],
  ["facebook", "Facebook", "https://www.facebook.com/lionsdencoffeeshopCT"],
  [
    "youtube",
    "YouTube",
    "https://www.youtube.com/channel/UC2ybOXg47gGzBELnd_4OwXw/featured",
  ],
  ["tiktok", "TikTok", "https://www.tiktok.com/@lionsdencoffeeshop"],
  [
    "yelp",
    "Yelp",
    "https://www.yelp.com/biz/lions-den-coffee-shop-southington-2",
  ],
];

// "Bottom of the cup": the page drips into a coffee-brown panel.
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-drips .drip-edge-drip", {
          scaleY: 0.4,
          transformOrigin: "50% 0%",
          duration: 1.4,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="site-footer">
      <DripEdge color="var(--color-warm-white)" className="footer-drips" />

      <div className="shell footer-main">
        <div className="footer-sendoff">
          <p className="footer-kicker">Come in. Slow down.</p>
          <p className="footer-line">
            Italian coffee, honest food,
            <br />
            <em>and good company.</em>
          </p>
          <div className="footer-actions">
            <a className="button" href="tel:+18604262809">
              Call to order <Phone size={16} />
            </a>
            <a
              className="button"
              href="https://www.google.com/maps/dir/?api=1&destination=57+W+Main+St+Plantsville+CT+06479"
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <dl className="footer-info">
          <div>
            <dt>Find us</dt>
            <dd>
              57 W Main St
              <br />
              Plantsville, CT 06479
            </dd>
          </div>
          <div>
            <dt>Open daily</dt>
            <dd>6:00 AM – 7:00 PM</dd>
          </div>
          <div>
            <dt>Say hello</dt>
            <dd>
              <a href="tel:+18604262809">(860) 426-2809</a>
              <br />
              <a href="mailto:lionsdencoffeect@gmail.com">
                lionsdencoffeect@gmail.com
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="shell footer-bottom">
        <a
          href="#top"
          className="footer-brand"
          aria-label="Lions Den, back to top"
        >
          <LionMark decorative />
        </a>
        <nav aria-label="Social media" className="footer-socials">
          {SOCIALS.map(([icon, label, url]) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
            >
              <SocialIcon name={icon} />
            </a>
          ))}
        </nav>
        <small>© 2026 Lions Den Coffee LLC</small>
      </div>
    </footer>
  );
}
