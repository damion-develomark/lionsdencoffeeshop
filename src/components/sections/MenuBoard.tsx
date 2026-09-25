"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { ArrowUpRight, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { menu, type MenuGroup, type MenuImage } from "@/data/menu";
import { EspressoSaucer } from "@/components/brand/EspressoSaucer";

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

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
function subscribeFinePointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

type PreviewHandler = (image: MenuImage | null) => void;

function MenuBlock({
  group,
  onPreview,
}: {
  group: MenuGroup;
  onPreview: PreviewHandler;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const feature = group.items[0];

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
            stagger: 0.08,
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
            stagger: 0.08,
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
              trigger: ".menu-feature",
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
      <h3>{group.title}</h3>
      <div className="gold-rule" />

      <figure className="menu-feature">
        <div className="menu-feature-frame reveal-clip">
          <div className="menu-feature-parallax">
            <div className="menu-photo reveal-zoom">
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                fill
                sizes="(min-width: 1100px) 520px, (min-width: 768px) 42vw, 1px"
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
        {group.items.map((item) => (
          <motion.li
            key={item.slug}
            className="menu-item"
            variants={reduced ? undefined : itemVariants}
            initial={reduced ? false : undefined}
            whileHover="hover"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") onPreview(item.image);
            }}
            onPointerLeave={() => onPreview(null)}
          >
            <motion.div
              className="menu-thumb"
              variants={thumbVariants}
              transition={hoverSpring}
            >
              <div className="menu-thumb-clip reveal-clip">
                <div className="menu-photo reveal-zoom">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 768px) 88px, 64px"
                    className="menu-photo-img"
                  />
                </div>
              </div>
              {SHOW_PLACEHOLDER_TAGS && item.image.placeholder && (
                <span className="sample-tag">Sample</span>
              )}
            </motion.div>

            <div className="menu-item-body">
              <div className="item-line">
                <h4>{item.name}</h4>
                <span className="item-price">
                  {(item.sizes || item.note) && (
                    <span className="from">from </span>
                  )}
                  ${item.price.toFixed(2)}
                  {(item.sizes || item.note) && (
                    <Tooltip>
                      <TooltipTrigger
                        className="price-info"
                        aria-label={`${item.name} sizes and pricing`}
                      >
                        <Info size={13} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {item.note ??
                            Object.entries(item.sizes!)
                              .map(
                                ([size, price]) =>
                                  `${size}: $${price.toFixed(2)}`,
                              )
                              .join(" · ")}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </span>
              </div>
              <p>{item.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/** Larger photo that follows the cursor over menu items (desktop mouse only). */
function CursorPreview({
  image,
  x,
  y,
}: {
  image: MenuImage | null;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  // Only rendered on the client (after the pointer check), so document exists.
  return createPortal(
    <motion.div className="cursor-preview" style={{ x, y }} aria-hidden>
      <AnimatePresence>
        {image && (
          <motion.div
            key={image.src}
            className="cursor-preview-card"
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, scale: 0.9, rotate: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <Image src={image.src} alt="" fill sizes="220px" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
}

export function MenuBoard() {
  const [tab, setTab] = useState("Coffee");
  const [preview, setPreview] = useState<MenuImage | null>(null);
  const canPreview = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const previewY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  const showPreview = canPreview && !reduced;
  const handlePreview: PreviewHandler = (image) =>
    setPreview(showPreview ? image : null);

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
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  const allItems = Object.values(menu).flatMap((groups) =>
    groups.flatMap((g) => g.items),
  );

  return (
    <section
      id="menu"
      ref={ref}
      className="menu-section shell"
      aria-labelledby="menu-title"
      onPointerMove={(e) => {
        if (!showPreview) return;
        mouseX.set(e.clientX + 24);
        mouseY.set(e.clientY + 24);
      }}
    >
      <div className="section-top menu-intro">
        <div>
          <p className="eyebrow">Made with care. Served with heart.</p>
          <h2 id="menu-title">Your daily ritual.</h2>
        </div>
        <a
          href="/lionsden-menu.pdf"
          className="text-link"
          target="_blank"
          rel="noreferrer"
        >
          Full menu <ArrowUpRight size={18} />
        </a>
      </div>
      <TooltipProvider>
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setPreview(null);
            setTab(value);
          }}
        >
          <TabsList className="menu-tabs" aria-label="Menu categories">
            {Object.keys(menu).map((name) => (
              <TabsTrigger key={name} value={name} className="menu-tab">
                {name}
                {tab === name && (
                  <motion.span
                    className="tab-line"
                    layoutId="menu-tab-line"
                    transition={{ duration: reduced ? 0 : 0.25 }}
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
                {menu[tab].map((group) => (
                  <MenuBlock
                    key={group.title}
                    group={group}
                    onPreview={handlePreview}
                  />
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
      {showPreview && (
        <CursorPreview image={preview} x={previewX} y={previewY} />
      )}
    </section>
  );
}
