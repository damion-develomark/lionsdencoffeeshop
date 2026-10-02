"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Register GSAP plugins once, client-side only.
gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

// MorphSVG only drives the coffee spill's decorative idle loop (desktop hero,
// mobile nav sheet), so it is fetched on first use instead of up front.
let morphSVG: Promise<void> | undefined;
export function loadMorphSVG() {
  morphSVG ??= import("gsap/MorphSVGPlugin").then(({ MorphSVGPlugin }) => {
    gsap.registerPlugin(MorphSVGPlugin);
  });
  return morphSVG;
}

export { gsap, ScrollTrigger, DrawSVGPlugin, useGSAP };

/**
 * Pause endless loops while `root` is off screen and resume them where they
 * left off when it returns, so they look the same whenever they're visible.
 * `loops` is re-read on every toggle, so tweens created later are included.
 * Returns the cleanup.
 */
export function pauseLoopsOffscreen(
  root: Element | null,
  loops: () => gsap.core.Animation[],
) {
  if (!root) return () => {};
  const observer = new IntersectionObserver(([entry]) => {
    for (const loop of loops()) loop.paused(!entry.isIntersecting);
  });
  observer.observe(root);
  return () => observer.disconnect();
}
