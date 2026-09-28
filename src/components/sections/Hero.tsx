"use client";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import {
  LionMark,
  LION_EYE_ORIGIN,
  LION_HEAD_ORIGIN,
} from "@/components/brand/LionMark";
import { Anchor } from "./Header";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-word", {
          type: "chars",
          mask: "chars",
        });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        // Lion: shield paints on, mane flames fill in one by one, then the eye opens.
        // The layered pieces are swapped back for the single static mark at the end.
        tl.set(".hero-art .lion-static", { autoAlpha: 0 }, 0)
          .set(".hero-art .lion-reveal", { autoAlpha: 1 }, 0)
          .from(
            ".hero-art .lion-shield-stroke",
            { drawSVG: "0%", duration: 1.3, ease: "power2.inOut" },
            0.1,
          )
          .from(
            ".hero-art .lion-flame",
            {
              opacity: 0,
              scale: 0.86,
              svgOrigin: LION_HEAD_ORIGIN,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.6)",
            },
            0.8,
          )
          .from(
            ".hero-art .lion-eye",
            {
              scaleY: 0,
              svgOrigin: LION_EYE_ORIGIN,
              duration: 0.4,
              ease: "back.out(3)",
            },
            ">-0.15",
          )
          .set(".hero-art .lion-static", { autoAlpha: 1 })
          .set(".hero-art .lion-reveal", { autoAlpha: 0 })
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
          .from(
            ".hero-intro",
            { y: 15, opacity: 0, stagger: 0.12, duration: 0.7 },
            0.6,
          );
        gsap.to(".hero-art", {
          yPercent: 8,
          rotate: -3,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        return () => split.revert();
      });
      return () => media.revert();
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      id="top"
      className="hero shell"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="eyebrow hero-intro">
          Lions Den Coffee Shop <span>Est. 2020</span>
        </p>
        <h1 id="hero-title">
          <span className="sr-only">Lions Den Coffee Shop. Sip and stay.</span>
          <span aria-hidden="true" className="hero-type">
            <span className="hero-word">SIP</span>
            <span className="ampersand">&amp;</span>
            <span className="hero-word">STAY</span>
          </span>
        </h1>
        <p className="hero-description hero-intro">
          A little Italian soul.
          <br />A place to call your own.
        </p>
        <p className="hero-detail hero-intro">
          In the heart of Plantsville, every order is an interaction, not a
          transaction.
        </p>
        <div className="hero-actions hero-intro">
          <Anchor href="#menu" className="button">
            View the menu <ArrowDown size={16} />
          </Anchor>
          <Anchor href="#visit" className="text-link">
            Find your way here <ArrowUpRight size={17} />
          </Anchor>
        </div>
      </div>
      <div className="hero-art">
        <div className="art-note">Good coffee. Better company.</div>
        <motion.div
          animate={reduced ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={reduced ? {} : { rotate: 2 }}
        >
          <LionMark animated />
        </motion.div>
        <div className="art-caption">
          <span>ITALIAN ROOTS</span>
          <span>CONNECTICUT HEART</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>57 W MAIN ST · PLANTSVILLE, CT</span>
        <Anchor href="#menu">
          Something good is brewing <ArrowDown size={14} />
        </Anchor>
        <span>DAILY · 6 AM – 7 PM</span>
      </div>
    </section>
  );
}
