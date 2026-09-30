"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LionMark } from "@/components/brand/LionMark";
import { addLionReveal } from "@/components/brand/lionReveal";
import { Anchor, HOURS, ORDER_ONLINE_URL } from "./Header";
import {
  SocialIcon,
  type SocialIconName,
} from "@/components/brand/SocialIcons";
import develomarkLogo from "../../../public/brand/develomark-logo-black.png";

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

const NAV = [
  ["Menu", "#menu"],
  ["Our Story", "#about"],
  ["Gallery", "#gallery"],
  ["Visit", "#visit"],
  ["Contact", "#contact"],
];

// "Latte": a flat, soft latte panel with everything in one centred column,
// and a curl of steam rising off the lion. The lion replays the hero's
// entrance each time the footer scrolls into view.
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: ".footer-brand",
            start: "top 90%",
            toggleActions: "restart none none reset",
          },
        });
        addLionReveal(tl, ".footer-brand", 0);
        tl.from(".footer-steam path", { opacity: 0, y: 8, stagger: 0.15 }, 1.6);
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="site-footer">
      <div className="footer-inner">
        <a
          href="#top"
          className="footer-brand"
          aria-label="Lions Den Coffee Shop®, back to top"
        >
          <svg className="footer-steam" viewBox="0 0 60 44" aria-hidden>
            <path d="M18 40c-6-7 6-12 0-20s6-12 2-18" />
            <path d="M30 40c-6-7 6-12 0-20s6-12 2-18" />
            <path d="M42 40c-6-7 6-12 0-20s6-12 2-18" />
          </svg>
          <LionMark animated decorative />
        </a>

        <p className="footer-line">
          Italian coffee, honest food,
          <br />
          <em>and good company.</em>
        </p>
        <p className="footer-meta">
          <span>57 W Main St, Plantsville, CT</span>
          {HOURS.map(({ days, time }) => (
            <span key={days}>
              {days} {time}
            </span>
          ))}
        </p>

        <nav aria-label="Footer navigation" className="footer-nav">
          {NAV.map(([label, href]) => (
            <Anchor key={href} href={href}>
              {label}
            </Anchor>
          ))}
        </nav>

        <div className="footer-actions">
          <a className="button" href="tel:+18604262809">
            Call to order <Phone size={16} />
          </a>
          <a
            className="button"
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Order online <ArrowUpRight size={17} />
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
              <SocialIcon name={icon} size={18} />
            </a>
          ))}
        </nav>

        <small>Lions Den Coffee Shop® · © 2026 Lions Den Coffee LLC</small>
        <p className="footer-credit">
          <span>Website by</span>
          <Image
            src={develomarkLogo}
            alt="Develomark"
            sizes="120px"
            className="footer-credit-logo"
          />
        </p>
      </div>
    </footer>
  );
}
