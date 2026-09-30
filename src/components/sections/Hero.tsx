"use client";
import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { RingBadge } from "@/components/brand/RingBadge";
import { addLionReveal } from "@/components/brand/lionReveal";
import {
  CoffeeBean,
  CoffeeSpill,
  SPILL_SHEET_ALT,
} from "@/components/brand/CoffeeSpill";
import { Anchor } from "./Header";

// The shop's own background-removed product photos (supplied cutouts; do not
// re-process). For a framed, non-transparent photo instead, set `cutout: false`.
const HERO_DRINKS = [
  {
    id: "iced",
    sizes: "(max-width: 767px) 33vw, (max-width: 1100px) 198px, 15vw",
    src: "/images/hero/iced-coffee-cold-foam-cutout.webp",
    alt: "Iced coffee topped with cold foam in a Lions Den Coffee Shop cup",
    cutout: true,
  },
  {
    id: "smoothie",
    sizes: "(max-width: 767px) 37vw, (max-width: 1100px) 222px, 17vw",
    src: "/images/hero/strawberry-smoothie-cutout.webp",
    alt: "Pink blended smoothie with a strawberry on the rim in a Lions Den Coffee Shop cup",
    cutout: true,
  },
  {
    id: "sandwich",
    sizes: "(max-width: 767px) 48vw, (max-width: 1100px) 300px, 22vw",
    src: "/images/hero/breakfast-sandwich-cutout.webp",
    alt: "Breakfast sandwich cut in half to show egg, tomato and melted cheese",
    cutout: true,
  },
  {
    id: "latte",
    sizes: "(max-width: 767px) 38vw, (max-width: 1100px) 264px, 20vw",
    src: "/images/hero/latte-red-cup-cutout.webp",
    alt: "Hot latte with rosetta latte art in a red cup and saucer",
    cutout: true,
  },
];
const BEANS = ["a", "b", "c", "d", "e"];
const STATS = [
  { value: "2020", label: "Established" },
  { value: "6AM", label: "Doors open weekdays" },
  { value: "57", label: "W Main St, Plantsville" },
];
const BAND_WORDS = [
  "Espresso",
  "Cappuccino",
  "Iced lattes",
  "Paninis",
  "Sip & stay",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const split = SplitText.create(".hero-word", {
            type: "chars",
            mask: "chars",
          });
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          // 1. Spill: coffee pours down to flood the section, then the drips
          // run and droplets splash off the edge.
          tl.from(
            ".coffee-spill",
            { yPercent: -100, duration: 1.2, ease: "power2.inOut" },
            0,
          )
            .from(
              ".spill-drop",
              {
                scale: 0,
                transformOrigin: "50% 50%",
                duration: 0.4,
                stagger: 0.06,
                ease: "back.out(3)",
              },
              1.05,
            )
            .from(
              ".spill-drip",
              {
                scaleY: 0,
                transformOrigin: "50% 0%",
                duration: 0.9,
                stagger: 0.12,
                ease: "power1.in",
              },
              0.95,
            )
            // 2. Drinks and beans land on the spill.
            .from(
              ".hero-drink",
              {
                y: 70,
                duration: 0.9,
                stagger: 0.15,
                ease: "back.out(1.4)",
              },
              0.6,
            )
            .from(
              ".hero-bean",
              {
                scale: 0,
                rotate: -120,
                duration: 0.5,
                stagger: 0.06,
                ease: "back.out(2.5)",
              },
              1.1,
            )
            // 3. Logo badge: shield paints on, mane flames fill in one by one,
            // then the eye opens. The layered pieces are swapped back for the
            // single static mark at the end.
            .from(
              ".badge-inner",
              { scale: 0.6, opacity: 0, duration: 0.6, ease: "back.out(1.8)" },
              1.0,
            );
          addLionReveal(tl, ".hero-badge", 1.1);
          tl
            // Copy runs alongside.
            .from(
              split.chars,
              { yPercent: 110, duration: 1, stagger: 0.045 },
              0.2,
            )
            .from(
              ".ampersand",
              { clipPath: "inset(0 100% 0 0)", rotate: -14, duration: 0.9 },
              0.55,
            )
            .from(".hero-intro", { y: 15, stagger: 0.1, duration: 0.7 }, 0.6);

          // Idle: the spill keeps gently shifting like settling liquid.
          gsap.to(".spill-sheet", {
            morphSVG: SPILL_SHEET_ALT,
            duration: 6,
            delay: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.to(".spill-drip", {
            scaleY: 1.12,
            transformOrigin: "50% 0%",
            duration: 3.5,
            delay: 2,
            stagger: { each: 0.6, repeat: -1, yoyo: true },
            ease: "sine.inOut",
          });

          // Scroll: layers drift at different speeds for depth.
          const scrub = {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          };
          gsap.to(".hero-drink--iced", { yPercent: -14, scrollTrigger: scrub });
          gsap.to(".hero-drink--smoothie", {
            yPercent: -22,
            scrollTrigger: scrub,
          });
          gsap.to(".hero-drink--latte", { yPercent: -8, scrollTrigger: scrub });
          gsap.to(".hero-bean", {
            y: -90,
            stagger: 0.05,
            scrollTrigger: scrub,
          });
          return () => split.revert();
        },
      );
      return () => media.revert();
    },
    { scope: ref },
  );
  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <CoffeeSpill className="hero-spill" />
      <div className="shell hero-stage">
        <div className="hero-title">
          <h1 id="hero-title" className="hero-heading hero-intro">
            Lions Den Coffee Shop <span>in Plantsville, CT</span>
          </h1>
          <p className="hero-type" aria-label="Sip and stay">
            <span className="hero-word">SIP</span>
            <span className="ampersand">&amp;</span>
            <span className="hero-word">STAY.</span>
          </p>
        </div>

        <div className="hero-badge-wrap">
          <motion.div
            className="hero-badge"
            animate={reduced ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={reduced ? {} : { rotate: 4 }}
          >
            <RingBadge animated text="Lions Den · Coffee Shop · Est. 2020 ·" />
          </motion.div>
          <p className="art-note hero-intro">Good coffee. Better company.</p>
        </div>

        <div className="hero-copy hero-intro">
          <p className="hero-description">
            A little Italian soul.
            <br />A place to call your own.
          </p>
          <p className="hero-detail">
            In the heart of Plantsville, every order is an interaction, not a
            transaction.
          </p>
          <div className="hero-actions">
            <Anchor href="#menu" className="button">
              View the menu <ArrowDown size={16} />
            </Anchor>
            <Anchor href="#visit" className="text-link">
              Find your way here <ArrowUpRight size={17} />
            </Anchor>
          </div>
        </div>

        <div className="hero-art">
          {HERO_DRINKS.map((drink) => (
            <figure
              key={drink.id}
              className={`hero-drink hero-drink--${drink.id}${drink.cutout ? " is-cutout" : ""}`}
            >
              <Image
                src={drink.src}
                alt={drink.alt}
                fill
                sizes={drink.sizes}
                quality={60}
                loading="eager"
                fetchPriority={drink.id === "smoothie" ? "high" : "auto"}
              />
            </figure>
          ))}
          {BEANS.map((b) => (
            <CoffeeBean key={b} className={`hero-bean hero-bean--${b}`} />
          ))}
        </div>

        <dl className="hero-stats hero-intro">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-band" aria-hidden>
        <div className="hero-band-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="hero-band-group">
              {BAND_WORDS.map((word) => (
                <Fragment key={word}>
                  <span>{word}</span>
                  <CoffeeBean className="band-bean" />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
