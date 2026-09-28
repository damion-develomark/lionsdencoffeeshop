"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { menu, type MenuGroup, type MenuItem } from "@/data/menu";
import { EspressoSaucer } from "@/components/brand/EspressoSaucer";
import { RingBadge } from "@/components/brand/RingBadge";
import { CoffeeBean } from "@/components/brand/CoffeeSpill";

const BEANS = ["a", "b", "c"];

const SHOW_PLACEHOLDER_TAGS = process.env.NODE_ENV !== "production";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
// "show" is the resting state (inherited from the list); "hover" comes from the row.
const thumbVariants: Variants = {
  show: { rotate: 0, "--thumb-shadow": "4px" },
  hover: { rotate: -3, "--thumb-shadow": "6px" },
};
const hoverSpring = { type: "spring", stiffness: 300, damping: 22 } as const;

// Big photo slides in from the side it's travelling toward.
const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
};
const pad = (n: number) => String(n).padStart(2, "0");
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

function sizesLine(item: MenuItem) {
  if (item.note) return item.note;
  if (!item.sizes) return null;
  return Object.entries(item.sizes)
    .map(([size, price]) => `${size} $${price.toFixed(2)}`)
    .join(" · ");
}

// Tablet + phone: one big swipeable card, with every item in a thumbnail row.
function MenuCarousel({ group }: { group: MenuGroup }) {
  const thumbsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [[active, dir], setSlide] = useState([0, 0]);
  const items = group.items;
  const item = items[active];
  const count = items.length;

  const goTo = (next: number, direction: number) => {
    const i = (next + count) % count;
    if (i === active) return;
    setSlide([i, direction]);
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
          <div className="menu-slides reveal-zoom">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={item.slug}
                className="menu-slide"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 32 }
                }
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, { offset, velocity }) => {
                  if (
                    offset.x < -SWIPE_DISTANCE ||
                    velocity.x < -SWIPE_VELOCITY
                  )
                    step(1);
                  else if (
                    offset.x > SWIPE_DISTANCE ||
                    velocity.x > SWIPE_VELOCITY
                  )
                    step(-1);
                }}
                aria-roledescription="slide"
                aria-label={`${active + 1} of ${count}`}
              >
                <div className="menu-photo">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    draggable={false}
                    sizes="(min-width: 1101px) 560px, calc(100vw - 40px)"
                    className="menu-photo-img"
                  />
                </div>
                {SHOW_PLACEHOLDER_TAGS && item.image.placeholder && (
                  <span className="sample-tag">Sample</span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {item.pick && (
          <figcaption className="feature-pill">{item.pick}</figcaption>
        )}
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
                  {sizes && <span className="from">from </span>}$
                  {it.price.toFixed(2)}
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
                        src={it.image.src}
                        alt=""
                        fill
                        sizes="104px"
                        className="menu-photo-img"
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
  const reduced = useReducedMotion();
  const feature = group.items[0];

  return (
    <div className="menu-list-view">
      <figure className="menu-feature">
        <div className="menu-feature-frame reveal-clip">
          <div className="menu-feature-parallax">
            <div className="menu-photo reveal-zoom">
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                fill
                sizes="(min-width: 1101px) 560px, 1px"
                className="menu-photo-img"
              />
            </div>
          </div>
          {SHOW_PLACEHOLDER_TAGS && feature.image.placeholder && (
            <span className="sample-tag">Sample</span>
          )}
        </div>
        <figcaption className="feature-pill">{feature.name}</figcaption>
      </figure>

      <motion.ul
        variants={listVariants}
        initial={reduced ? false : "hidden"}
        animate="show"
      >
        {group.items.map((item) => {
          const sizes = sizesLine(item);
          return (
            <motion.li
              key={item.slug}
              className="menu-item"
              variants={reduced ? undefined : itemVariants}
              initial={reduced ? false : undefined}
              whileHover="hover"
            >
              <motion.div
                className="menu-thumb"
                variants={thumbVariants}
                transition={hoverSpring}
              >
                <div className="menu-thumb-clip reveal-clip">
                  <div className="menu-photo">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="88px"
                      className="menu-photo-img"
                    />
                  </div>
                </div>
                {SHOW_PLACEHOLDER_TAGS && item.image.placeholder && (
                  <span className="sample-tag">Sample</span>
                )}
                {item.pick && <span className="pick-tag">{item.pick}</span>}
              </motion.div>

              <div className="menu-item-body">
                <div className="item-line">
                  <h4>{item.name}</h4>
                  <span className="item-leader" aria-hidden />
                  <span className="item-price">
                    {sizes && <span className="from">from </span>}$
                    {item.price.toFixed(2)}
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
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

function MenuBlock({ group, index }: { group: MenuGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll reveals live in each block, so they re-run whenever a tab mounts new blocks.
  useGSAP(
    () => {
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
    { scope: ref },
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
  const reduced = useReducedMotion();

  const allItems = Object.values(menu).flatMap((groups) =>
    groups.flatMap((g) => g.items),
  );

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
      <div className="section-top menu-intro">
        {BEANS.map((b) => (
          <CoffeeBean key={b} className={`menu-bean menu-bean--${b}`} />
        ))}
        <div>
          <p className="eyebrow">The Lions Den menu</p>
          <h2 id="menu-title" className="menu-title">
            <span>Your daily</span>{" "}
            <span className="menu-title-pop">ritual.</span>
          </h2>
        </div>
        <div className="menu-intro-side">
          <motion.div
            className="menu-badge"
            animate={reduced ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={reduced ? {} : { rotate: 6 }}
          >
            <RingBadge text="Made with care · Served with heart ·" />
          </motion.div>
          <a
            href="/lionsden-menu.pdf"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Full menu <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <TooltipProvider>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="menu-tabs" aria-label="Menu categories">
            {Object.keys(menu).map((name) => (
              <TabsTrigger key={name} value={name} className="menu-tab">
                <span className="tab-label">{name}</span>
                {tab === name && (
                  <motion.span
                    className="tab-pill"
                    layoutId="menu-tab-pill"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 32 }
                    }
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => ScrollTrigger.refresh()}
          >
            <TabsContent key={tab} value={tab} forceMount asChild>
              <motion.div
                className={`menu-grid ${tab === "Coffee" ? "coffee-grid" : ""}`}
                initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -12 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                onAnimationComplete={() => ScrollTrigger.refresh()}
              >
                {menu[tab].map((group, i) => (
                  <MenuBlock key={group.title} group={group} index={i} />
                ))}
                {tab === "Coffee" && (
                  <div className="menu-vignette">
                    <motion.div
                      className="slow-badge"
                      initial={false}
                      animate={{ rotate: -10 }}
                      whileHover={reduced ? {} : { rotate: -5 }}
                    >
                      <span>Come in</span>
                      <span>Slow down</span>
                    </motion.div>
                    <EspressoSaucer />
                    <p>There&apos;s always time for one more cup.</p>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
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
        <details className="photo-credits">
          <summary>Photo credits</summary>
          <p>
            Menu photos are illustrative, via{" "}
            {allItems.map((item, i) => (
              <span key={item.slug}>
                <a href={item.image.source} target="_blank" rel="noreferrer">
                  {item.name} (
                  {item.image.photographer
                    ? `${item.image.photographer}, `
                    : ""}
                  {item.image.credit})
                </a>
                {i < allItems.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </details>
      </div>
    </section>
  );
}
