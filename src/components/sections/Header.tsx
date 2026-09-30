"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, ArrowUpRight, Phone, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { scrollToAnchor, useLenis } from "@/components/providers/smooth-scroll";
import { CoffeeSpill, SPILL_SHEET_ALT } from "@/components/brand/CoffeeSpill";
import { gsap, useGSAP } from "@/lib/gsap";

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#about" },
  { label: "Visit", href: "#visit" },
];
const MOBILE_NAV = [
  ...NAV.slice(0, 2),
  { label: "Gallery", href: "#gallery" },
  NAV[2],
  { label: "Contact", href: "#contact" },
];
export const ORDER_ONLINE_URL = "https://toasttab.com/lions-den-coffee-shop";
export const ADDRESS = "57 West Main Street, Plantsville, CT 06479";
export const HOURS = [
  { days: "Mon–Fri", time: "6am–7pm" },
  { days: "Sat & Sun", time: "7am–7pm" },
];

export function Anchor({
  href,
  children,
  className,
  onNavigate,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
  "aria-label"?: string;
}) {
  const lenis = useLenis();
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        if (!event.metaKey && !event.ctrlKey && !event.shiftKey) {
          const smooth = lenis?.current ?? null;
          if (smooth) {
            event.preventDefault();
            window.history.replaceState(null, "", href);
          }
          scrollToAnchor(smooth, href);
        }
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

// Mobile sheet body. The first time the sheet opens on a page load, the
// hero's spill pours in: flood slides down, drips run, droplets splash, and
// the links follow. `poured` lives in Header, so reopening the sheet skips
// the pour; a new page load resets it. The edge always keeps gently shifting.
function MobileSheetBody({
  onNavigate,
  poured,
}: {
  onNavigate: () => void;
  poured: React.RefObject<boolean>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".spill-sheet", {
          morphSVG: SPILL_SHEET_ALT,
          duration: 6,
          delay: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        if (poured.current) return;
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            // Marked on start, not creation: in dev, Strict Mode mounts twice
            // and the first timeline is reverted before it ever runs.
            onStart: () => {
              poured.current = true;
            },
          })
          .from(
            ".coffee-spill",
            { yPercent: -100, duration: 0.9, ease: "power2.inOut" },
            0.1,
          )
          .from(
            ".spill-drip",
            {
              scaleY: 0,
              transformOrigin: "50% 0%",
              duration: 0.8,
              stagger: 0.1,
              ease: "power1.in",
            },
            0.8,
          )
          .from(
            ".spill-drop",
            {
              scale: 0,
              transformOrigin: "50% 50%",
              duration: 0.4,
              stagger: 0.05,
              ease: "back.out(3)",
            },
            0.9,
          )
          .from(
            ".sheet-reveal",
            { y: 24, opacity: 0, duration: 0.6, stagger: 0.07 },
            0.35,
          );
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div className="sheet-body" ref={ref}>
      <CoffeeSpill className="sheet-spill" />
      <SheetClose className="sheet-close" aria-label="Close navigation">
        <X size={20} />
      </SheetClose>
      <div className="sheet-head sheet-reveal">
        <SheetTitle>Lions Den</SheetTitle>
        <SheetDescription>Coffee, food, and good company.</SheetDescription>
      </div>
      <nav aria-label="Mobile navigation">
        {MOBILE_NAV.map(({ label, href }, i) => (
          <Anchor
            key={label}
            href={href}
            onNavigate={onNavigate}
            className="sheet-link sheet-reveal"
          >
            <span className="sheet-num" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            {label}
          </Anchor>
        ))}
      </nav>
      <div className="sheet-actions sheet-reveal">
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
      </div>
      <p className="sheet-info sheet-reveal">
        {ADDRESS}
        {HOURS.map(({ days, time }) => (
          <span key={days}>
            {days}: {time}
          </span>
        ))}
      </p>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const poured = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 80);
  });
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      {/* Address and hours ride above the pill, then fold away on scroll. */}
      <div className="header-info">
        <p className="shell">
          <span>{ADDRESS}</span>
          {HOURS.map(({ days, time }) => (
            <span key={days}>
              {days}: {time}
            </span>
          ))}
        </p>
      </div>
      <div className="shell header-inner">
        <Anchor href="#top" className="wordmark">
          <Image
            src="/brand/lions-den-logo.jpg"
            width={43}
            height={50}
            alt=""
            priority
          />
          <span>
            LIONS DEN<small>Coffee Shop</small>
          </span>
        </Anchor>
        {/* A gold sticker pill slides to whichever link is hovered or focused. */}
        <nav
          className="desktop-nav"
          aria-label="Main navigation"
          onMouseLeave={() => setHovered(null)}
          onBlur={() => setHovered(null)}
        >
          {NAV.map(({ label, href }) => (
            <span
              key={label}
              className="nav-item"
              onMouseEnter={() => setHovered(label)}
              onFocus={() => setHovered(label)}
            >
              <Anchor href={href}>{label}</Anchor>
              {hovered === label && (
                <motion.span
                  className="nav-pill"
                  layoutId="nav-pill"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 32 }
                  }
                />
              )}
            </span>
          ))}
        </nav>
        <div className="header-actions">
          <a className="button header-order" href="tel:+18604262809">
            Call to order <Phone size={16} />
          </a>
          <a
            className="button header-order"
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Order online <ArrowUpRight size={16} />
          </a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="mobile-menu icon-button"
            aria-label="Open navigation"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent className="mobile-sheet" showCloseButton={false}>
            <MobileSheetBody
              onNavigate={() => setOpen(false)}
              poured={poured}
            />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
