"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSlidingPill } from "@/lib/use-sliding-pill";
import { menu, type MenuGroup, type MenuItem } from "@/data/menu";
import { EspressoSaucer } from "@/components/brand/EspressoSaucer";
import { RingBadge } from "@/components/brand/RingBadge";
import { CoffeeBean } from "@/components/brand/CoffeeSpill";

const BEANS = ["a", "b", "c"];
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pad = (n: number) => String(n).padStart(2, "0");
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;
// The photo follows the finger at half speed, like a rubber band.
const DRAG_ELASTIC = 0.5;

function priceLabel(item: MenuItem) {
  return item.priceText ?? `$${item.price.toFixed(2)}`;
}

function sizesLine(item: MenuItem) {
  if (!item.sizes) return null;
  return Object.entries(item.sizes)
    .map(([size, price]) => `${size} $${price.toFixed(2)}`)
    .join(" · ");
}

// Tablet + phone: one big swipeable card, with every item in a thumbnail row.
// The big photo slides in from the side it's travelling toward (GSAP); only
// the current photo and, mid-slide, the outgoing one are in the DOM.
function MenuCarousel({ group }: { group: MenuGroup }) {
  const thumbsRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; t: number } | null>(null);
  const [{ active, prev, dir }, setSlide] = useState({
    active: 0,
    prev: -1,
    dir: 0,
  });
  const items = group.items;
  const count = items.length;

  const goTo = (next: number, direction: number) => {
    const i = (next + count) % count;
    if (i === active) return;
    const reduced = prefersReducedMotion();
    setSlide({ active: i, prev: reduced ? -1 : active, dir: direction });
    // Keep the active thumbnail in view without moving the page.
    const row = thumbsRef.current;
    const thumb = row?.children[i] as HTMLElement | undefined;
    if (row && thumb) {
      row.scrollTo({
        left: thumb.offsetLeft - (row.clientWidth - thumb.offsetWidth) / 2,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  };
  const step = (d: number) => goTo(active + d, d);

  useLayoutEffect(() => {
    if (prev < 0) return;
    const slides = slidesRef.current;
    const incoming = slides?.querySelector('[data-slide="active"]') ?? [];
    const outgoing = slides?.querySelector('[data-slide="prev"]') ?? [];
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
      onComplete: () => setSlide((s) => ({ ...s, prev: -1 })),
    });
    tl.fromTo(incoming, { xPercent: dir * 100, x: 0 }, { xPercent: 0 }, 0);
    tl.to(outgoing, { xPercent: -dir * 100, x: 0 }, 0);
    return () => {
      tl.kill();
    };
  }, [active, prev, dir]);

  const activeSlide = () =>
    slidesRef.current?.querySelector('[data-slide="active"]');
  const endDrag = (event: React.PointerEvent) => {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const velocity = (dx / Math.max(1, event.timeStamp - start.t)) * 1000;
    if (dx < -SWIPE_DISTANCE || velocity < -SWIPE_VELOCITY) step(1);
    else if (dx > SWIPE_DISTANCE || velocity > SWIPE_VELOCITY) step(-1);
    else
      gsap.to(activeSlide() ?? [], {
        x: 0,
        duration: 0.4,
        ease: "back.out(2)",
      });
  };

  const slide = (index: number, role: "active" | "prev") => {
    const it = items[index];
    return (
      <div
        key={it.slug}
        className="menu-slide"
        data-slide={role}
        aria-roledescription={role === "active" ? "slide" : undefined}
        aria-label={role === "active" ? `${index + 1} of ${count}` : undefined}
        aria-hidden={role === "prev" || undefined}
      >
        <div className="menu-photo">
          <Image
            quality={60}
            src={it.image.src}
            alt={it.image.alt}
            fill
            draggable={false}
            sizes="(min-width: 1101px) 560px, calc(100vw - 40px)"
            className="menu-photo-img"
            style={{ objectPosition: it.image.focus }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="menu-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={group.title}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
    >
      <figure className="menu-feature">
        <div className="menu-feature-frame reveal-clip">
          <div
            ref={slidesRef}
            className="menu-slides reveal-zoom"
            onPointerDown={(e) => {
              if (count < 2) return;
              drag.current = { x: e.clientX, t: e.timeStamp };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!drag.current) return;
              const dx = e.clientX - drag.current.x;
              gsap.set(activeSlide() ?? [], { x: dx * DRAG_ELASTIC });
            }}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {prev >= 0 && slide(prev, "prev")}
            {slide(active, "active")}
          </div>
        </div>
      </figure>

      {/* Every item's details share one grid cell, so the panel keeps the
            tallest one's height and nothing jumps while they cross-fade. */}
      <div className="carousel-info" aria-live="polite">
        {items.map((it, i) => {
          const sizes = sizesLine(it);
          return (
            <div
              key={it.slug}
              className="carousel-panel"
              data-active={i === active}
              aria-hidden={i !== active}
            >
              <div className="item-line">
                <h4>{it.name}</h4>
                <span className="item-leader" aria-hidden />
                <span className="item-price">
                  {sizes && <span className="from">from </span>}
                  {priceLabel(it)}
                </span>
              </div>
              <p className="item-desc">{it.description}</p>
              {sizes && <p className="item-sizes">{sizes}</p>}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <div className="carousel-controls">
            <span className="carousel-count" aria-hidden>
              {pad(active + 1)} <span>/ {pad(count)}</span>
            </span>
            <div className="carousel-arrows">
              <button
                type="button"
                className="carousel-arrow"
                onClick={() => step(-1)}
                aria-label={`Previous ${group.title} item`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="carousel-arrow"
                onClick={() => step(1)}
                aria-label={`Next ${group.title} item`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="carousel-thumbs" ref={thumbsRef}>
            {items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                className="carousel-thumb"
                data-active={i === active}
                aria-current={i === active}
                aria-label={`${it.name}, item ${i + 1} of ${count}`}
                onClick={() => goTo(i, i > active ? 1 : -1)}
              >
                <span className="carousel-thumb-img">
                  <span className="menu-thumb-clip reveal-clip">
                    <span className="menu-photo">
                      <Image
                        quality={60}
                        src={it.image.src}
                        alt=""
                        fill
                        sizes="104px"
                        className="menu-photo-img"
                        style={{ objectPosition: it.image.focus }}
                      />
                    </span>
                  </span>
                </span>
                <span className="carousel-thumb-name">{it.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Desktop: feature photo, then every item as a row with its price.
function MenuList({ group }: { group: MenuGroup }) {
  const feature = group.items[0];

  return (
    <div className="menu-list-view">
      <figure className="menu-feature">
        <div className="menu-feature-frame reveal-clip">
          <div className="menu-feature-parallax">
            <div className="menu-photo reveal-zoom">
              <Image
                quality={60}
                src={feature.image.src}
                alt={feature.image.alt}
                fill
                sizes="(min-width: 1101px) 560px, 1px"
                className="menu-photo-img"
                style={{ objectPosition: feature.image.focus }}
              />
            </div>
          </div>
        </div>
        <figcaption className="feature-pill">{feature.name}</figcaption>
      </figure>

      {/* Rows stagger in (CSS, via --i) each time their tab is shown. */}
      <ul>
        {group.items.map((item, i) => {
          const sizes = sizesLine(item);
          return (
            <li
              key={item.slug}
              className="menu-item"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="menu-thumb">
                <div className="menu-thumb-clip reveal-clip">
                  <div className="menu-photo">
                    <Image
                      quality={60}
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="88px"
                      className="menu-photo-img"
                      style={{ objectPosition: item.image.focus }}
                    />
                  </div>
                </div>
              </div>

              <div className="menu-item-body">
                <div className="item-line">
                  <h4>{item.name}</h4>
                  <span className="item-leader" aria-hidden />
                  <span className="item-price">
                    {sizes && <span className="from">from </span>}
                    {priceLabel(item)}
                  </span>
                  {sizes && (
                    <Tooltip>
                      <TooltipTrigger
                        className="price-info"
                        aria-label={`${item.name} sizes and pricing`}
                      >
                        <Info size={13} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{sizes}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <p>{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MenuBlock({
  group,
  index,
  active,
}: {
  group: MenuGroup;
  index: number;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Only measure and animate visible panels; all categories stay in the HTML.
  useGSAP(
    () => {
      if (!active) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: ref.current, start: "top 80%" };
        gsap.fromTo(
          ".reveal-clip",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          ".reveal-zoom",
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          ".menu-feature-parallax",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".menu-list-view .menu-feature",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: ref, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <div className="menu-block" ref={ref}>
      <h3>
        <span className="block-num" aria-hidden>
          {pad(index + 1)}
        </span>
        {group.title}
      </h3>
      <div className="gold-rule" />
      <MenuList group={group} />
      <MenuCarousel group={group} />
    </div>
  );
}

export function MenuBoard() {
  const [tab, setTab] = useState("Coffee");
  const ref = useRef<HTMLElement>(null);
  const [tabsRef, tabPillRef] = useSlidingPill<HTMLDivElement>(
    `[data-tab="${tab}"]`,
  );
  // A newly shown tab changes the section's height; re-measure the triggers.
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [tab]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".menu-intro", {
          y: 25,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
        // Beans drift up at different speeds as the section scrolls past.
        gsap.utils.toArray<Element>(".menu-bean").forEach((bean, i) => {
          gsap.to(bean, {
            y: -50 - i * 35,
            rotate: `+=${i % 2 ? -40 : 40}`,
            ease: "none",
            scrollTrigger: {
              trigger: ".menu-intro",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <section
      id="menu"
      ref={ref}
      className="menu-section shell"
      aria-labelledby="menu-title"
    >
      <div className="section-top menu-intro" data-pause-offscreen>
        {BEANS.map((b) => (
          <CoffeeBean key={b} className={`menu-bean menu-bean--${b}`} />
        ))}
        <div>
          <p className="eyebrow">Menu favorites</p>
          <h2 id="menu-title" className="menu-title">
            <span>Coffee, breakfast</span>{" "}
            <span className="menu-title-pop">&amp; lunch menu.</span>
          </h2>
        </div>
        <div className="menu-intro-side">
          <div className="menu-badge">
            <RingBadge text="Made with care · Served with heart ·" />
          </div>
          <a
            href="/lionsden-menu.pdf"
            className="text-link"
            download="lions-den-coffee-shop-menu.pdf"
            type="application/pdf"
          >
            Download menu <Download size={18} />
          </a>
        </div>
      </div>
      {/* Photographed picks here; the PDF is the full menu with prices. */}
      <p className="menu-selection-note">
        A photographed selection of our menu. There&apos;s plenty more at the
        counter:{" "}
        <a href="/lionsden-menu.pdf" target="_blank" rel="noreferrer">
          see the full menu with prices (PDF)
        </a>
        .
      </p>
      <TooltipProvider>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList
            ref={tabsRef}
            className="menu-tabs"
            aria-label="Menu categories"
          >
            <span
              ref={tabPillRef}
              className="tab-pill sliding-pill"
              aria-hidden
            />
            {Object.keys(menu).map((name) => (
              <TabsTrigger
                key={name}
                value={name}
                className="menu-tab"
                data-tab={name}
              >
                <span className="tab-label">{name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(menu).map(([name, groups]) => (
            <TabsContent key={name} value={name} forceMount asChild>
              <div
                hidden={tab !== name}
                className={`menu-grid ${
                  name === "Coffee"
                    ? "coffee-grid"
                    : groups.length === 1
                      ? "menu-grid--single"
                      : ""
                }`}
              >
                {groups.map((group, i) => (
                  <MenuBlock
                    key={group.title}
                    group={group}
                    index={i}
                    active={tab === name}
                  />
                ))}
                {name === "Coffee" && (
                  <div className="menu-vignette">
                    <div className="slow-badge">
                      <span>Come in</span>
                      <span>Slow down</span>
                    </div>
                    <EspressoSaucer />
                    <p>There&apos;s always time for one more cup.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </TooltipProvider>
      <div className="menu-footnote">
        <p>
          Milks: Whole, 2%, Skim, Oat, Almond, Coconut, Half &amp; Half, Heavy
          Cream. Cold foams +$1.25.
        </p>
        <p>
          Please alert staff of any allergies. Prices and items subject to
          change.
        </p>
        <a
          href="/lionsden-menu.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-link menu-full-link"
        >
          View the full menu &amp; prices (PDF) <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
