"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { menu, type MenuGroup } from "@/data/menu";
import { EspressoSaucer } from "@/components/brand/EspressoSaucer";

function MenuBlock({ group }: { group: MenuGroup }) {
  return (
    <div className="menu-block">
      <h3>{group.title}</h3>
      <div className="gold-rule" />
      <ul>
        {group.items.map((item) => (
          <li key={item.name}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuBoard() {
  const [tab, setTab] = useState("Coffee");
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
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
  return (
    <section
      id="menu"
      ref={ref}
      className="menu-section shell"
      aria-labelledby="menu-title"
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
        <Tabs value={tab} onValueChange={setTab}>
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
                  <MenuBlock key={group.title} group={group} />
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
      </div>
    </section>
  );
}
