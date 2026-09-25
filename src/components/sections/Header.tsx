"use client";
import Image from "next/image";
import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "motion/react";
import { Menu, ArrowUpRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useLenis } from "@/components/providers/smooth-scroll";

export function Anchor({
  href,
  children,
  className,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const lenis = useLenis();
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (
          lenis?.current &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey
        ) {
          event.preventDefault();
          lenis.current.scrollTo(href, { offset: -90, duration: 1.2 });
          window.history.replaceState(null, "", href);
        }
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 80);
    setHidden(y > 300 && y > (scrollY.getPrevious() ?? 0));
  });
  return (
    <motion.header
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      animate={{ y: hidden && !open && !reduced ? -110 : 0 }}
      transition={{ duration: 0.25 }}
      onFocusCapture={() => setHidden(false)}
    >
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
        <nav className="desktop-nav" aria-label="Main navigation">
          <Anchor href="#menu">Menu</Anchor>
          <Anchor href="#about">Our Story</Anchor>
          <Anchor href="#visit">Visit</Anchor>
        </nav>
        {/* TODO: replace phone ordering with the client's verified Toast URL. */}
        <a className="button header-order" href="tel:+18604262809">
          Call to order <ArrowUpRight size={16} />
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="mobile-menu icon-button"
            aria-label="Open navigation"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetTitle>Lions Den</SheetTitle>
            <SheetDescription>Coffee, food, and good company.</SheetDescription>
            <nav aria-label="Mobile navigation">
              {["Menu", "About", "Gallery", "Visit"].map((label) => (
                <Anchor
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onNavigate={() => setOpen(false)}
                >
                  {label}
                </Anchor>
              ))}
              <a href="tel:+18604262809">
                Call to order <ArrowUpRight />
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
