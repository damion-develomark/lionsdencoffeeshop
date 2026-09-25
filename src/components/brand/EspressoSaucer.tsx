"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function EspressoSaucer() {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".steam-curl",
          { drawSVG: "0% 0%", y: 5, opacity: 0 },
          {
            drawSVG: "0% 100%",
            y: -8,
            opacity: 1,
            duration: 2,
            stagger: 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
        );
      });
      return () => media.revert();
    },
    { scope: ref },
  );
  return (
    <svg
      ref={ref}
      viewBox="0 0 400 300"
      className="saucer"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g stroke="var(--color-latte)">
        <path className="steam-curl" d="M150 107c-35-35 32-42 3-77" />
        <path className="steam-curl" d="M198 96c-35-35 32-42 3-77" />
        <path className="steam-curl" d="M242 107c-35-35 32-42 3-77" />
      </g>
      <ellipse cx="194" cy="245" rx="148" ry="27" />
      <path d="M70 249c33 40 216 42 250 0" />
      <path d="M281 150c64-15 70 75-12 68m15-50c35-8 35 37-11 33" />
      <path
        fill="var(--color-warm-white)"
        d="M99 145l15 73c13 45 132 45 148 0l20-73Z"
      />
      <ellipse cx="190" cy="143" rx="92" ry="26" />
      <ellipse cx="190" cy="143" rx="76" ry="16" />
      <path stroke="var(--color-gold)" d="M123 211c29 23 97 25 127 0" />
    </svg>
  );
}
