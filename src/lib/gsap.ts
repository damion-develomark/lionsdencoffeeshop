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
