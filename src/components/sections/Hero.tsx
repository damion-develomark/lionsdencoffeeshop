"use client";
import { Fragment, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, pauseLoopsOffscreen, useGSAP } from "@/lib/gsap";
import { RingBadge } from "@/components/brand/RingBadge";
import { addLionReveal } from "@/components/brand/lionReveal";
import {
  CoffeeBean,
  CoffeeSpill,
  morphSpillIdle,
} from "@/components/brand/CoffeeSpill";
import { Anchor } from "./Header";

// The shop's own background-removed product photos (supplied cutouts; do not
// re-process). For a framed, non-transparent photo instead, set `cutout: false`.
const HERO_DRINKS = [
  {
    id: "iced",
    sizes: "(max-width: 767px) 39vw, (max-width: 1100px) 234px, 18vw",
    src: "/images/hero/iced-coffee-cold-foam-cutout.webp",
    alt: "Iced coffee topped with cold foam in a Lions Den Coffee Shop cup",
    cutout: true,
  },
  {
    id: "smoothie",
    sizes: "(max-width: 767px) 43vw, (max-width: 1100px) 258px, 20vw",
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

// Each letter sits in its own clipping mask so it can rise into place. The
// split is in the markup (no SplitText); screen readers get the sr-only text.
function HeroWord({ word }: { word: string }) {
  return (
    <span className="hero-word" aria-hidden>
      {[...word].map((char, i) => (
        <span key={i} className="char-mask">
          <span className="hero-char">{char}</span>
        </span>
      ))}
    </span>
  );
}

// The coffee pours down to flood the section, then the drips run and
// droplets splash off the edge.
function addSpillPour(tl: gsap.core.Timeline) {
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
    );
}

// Idle: the spill keeps shifting and the drips keep stretching, paused while
// the hero is off screen. Returns the matchMedia cleanup.
function addSpillIdle(context: gsap.Context, hero: HTMLElement | null) {
  const stopIdle = morphSpillIdle(context, 1.4);
  gsap.to(".spill-drip", {
    scaleY: 1.12,
    transformOrigin: "50% 0%",
    duration: 3.5,
    delay: 2,
    stagger: { each: 0.6, repeat: -1, yoyo: true },
    ease: "sine.inOut",
  });
  // Only the top-level loops; the pour lives in its own timeline.
  const stopPausing = pauseLoopsOffscreen(hero, () =>
    gsap
      .getTweensOf(hero?.querySelectorAll(".spill-sheet, .spill-drip") ?? [])
      .filter((tween) => tween.parent === gsap.globalTimeline),
  );
  return () => {
    stopIdle();
    stopPausing();
  };
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        (context) => {
          // Clip only while the letters rise, so the resting text keeps its
          // offset shadow.
          const masks = gsap.utils.toArray<HTMLElement>(".char-mask");
          gsap.set(masks, { overflow: "clip" });
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          // 1. Spill: coffee pours down to flood the section.
          addSpillPour(tl);
          tl
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
              ".hero-char",
              {
                yPercent: 110,
                duration: 1,
                stagger: 0.045,
                onComplete: () => {
                  gsap.set(masks, { clearProps: "overflow" });
                },
              },
              0.2,
            )
            .from(
              ".ampersand",
              { clipPath: "inset(0 100% 0 0)", rotate: -14, duration: 0.9 },
              0.55,
            )
            .from(".hero-intro", { y: 15, stagger: 0.1, duration: 0.7 }, 0.6);

          const stopIdle = addSpillIdle(context, ref.current);

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
          return stopIdle;
        },
      );
      // Phones get only the spill (pour, drips, idle ripple). It is decorative
      // and transform-only, so the drinks and headline, including the
      // smoothie that is the mobile LCP image, are visible from first paint.
      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        (context) => {
          addSpillPour(gsap.timeline());
          return addSpillIdle(context, ref.current);
        },
      );
      return () => media.revert();
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      id="top"
      className="hero"
      aria-labelledby="hero-title"
      data-pause-offscreen
    >
      <CoffeeSpill className="hero-spill" />
      <div className="shell hero-stage">
        <div className="hero-title">
          <h1 id="hero-title" className="hero-heading hero-intro">
            Lions Den Coffee Shop <span>in Plantsville, CT</span>
          </h1>
          <p className="hero-type">
            <span className="sr-only">Sip and stay.</span>
            <HeroWord word="SIP" />
            <span className="ampersand" aria-hidden>
              &amp;
            </span>
            <HeroWord word="STAY." />
          </p>
        </div>

        <div className="hero-badge-wrap">
          {/* Bobs gently via CSS (.hero-badge). */}
          <div className="hero-badge">
            <RingBadge animated text="Lions Den · Coffee Shop · Est. 2020 ·" />
          </div>
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
                // Only the smoothie (the largest drink on phones) is preloaded;
                // the rest load eagerly from the markup without a head preload.
                preload={drink.id === "smoothie"}
                loading={drink.id === "smoothie" ? undefined : "eager"}
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
