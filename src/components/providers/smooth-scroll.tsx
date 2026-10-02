"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger
 * animations stay in sync with the smoothed scroll position. Lenis is only
 * downloaded for mouse/trackpad users without reduced motion: touch screens
 * already scroll smoothly, so phones skip the library entirely.
 */
const LenisContext = createContext<React.RefObject<Lenis | null> | null>(null);
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * How long an anchor jump is held in place while the layout settles. Pinned
 * sections (the gallery) add ~1500px of scroll space once GSAP runs, which
 * pushes every section below them down after a jump has already landed.
 */
const HOLD_MS = 5000;
let held: { id: string; until: number } | null = null;

/**
 * Scroll to `#id` (smoothly when Lenis is running) and keep it in view if the
 * page shifts underneath it. Without Lenis the browser does the jump itself.
 */
export function scrollToAnchor(lenis: Lenis | null, hash: string) {
  held = { id: hash.slice(1), until: performance.now() + HOLD_MS };
  // The header offset comes from `scroll-padding-top` on <html>, which
  // Lenis and native anchor jumps both honor.
  lenis?.scrollTo(hash, {
    duration: 1.2,
    onComplete: () => settleAnchor(lenis),
  });
}

/** Re-aim at the held anchor if the layout moved it since the jump. */
function settleAnchor(lenis: Lenis | null) {
  if (!held) return;
  if (performance.now() > held.until) {
    held = null;
    return;
  }
  const el = document.getElementById(held.id);
  if (!el) return;
  const padding = parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop,
  );
  if (!lenis) {
    if (Math.abs(el.getBoundingClientRect().top - (padding || 0)) > 2)
      el.scrollIntoView();
    return;
  }
  lenis.resize();
  if (lenis.isScrolling === "smooth") {
    // Mid-flight: retarget so the glide ends on the section's new position.
    lenis.scrollTo(el, {
      duration: 0.6,
      onComplete: () => settleAnchor(lenis),
    });
  } else if (Math.abs(el.getBoundingClientRect().top - (padding || 0)) > 2) {
    lenis.scrollTo(el, { immediate: true, force: true });
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const instance = useRef<Lenis | null>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)");
    let cleanup = () => {};
    // Bumped on every setup, so a late import can't start a stale Lenis.
    let version = 0;
    const setup = () => {
      cleanup();
      cleanup = () => {};
      const current = ++version;
      if (media.matches || touch.matches) return;
      import("lenis").then(({ default: LenisClass }) => {
        if (current !== version) return;
        const lenis = new LenisClass({ autoRaf: false });
        instance.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          instance.current = null;
        };
      });
    };
    setup();
    media.addEventListener("change", setup);
    touch.addEventListener("change", setup);
    return () => {
      version++;
      cleanup();
      media.removeEventListener("change", setup);
      touch.removeEventListener("change", setup);
    };
  }, []);

  // Keep anchor jumps on target while pins, images, and fonts shift layout.
  useEffect(() => {
    const settle = () => settleAnchor(instance.current);
    const release = () => (held = null);

    // A hash already in the URL at hydration means the browser jumped there
    // before GSAP pinned anything, so hold it too (but not on a reload,
    // where the browser restores the reader's own scroll position).
    const nav = performance.getEntriesByType("navigation")[0] as
      PerformanceNavigationTiming | undefined;
    if (location.hash.length > 1 && nav?.type !== "reload") {
      held = { id: location.hash.slice(1), until: performance.now() + HOLD_MS };
      requestAnimationFrame(settle);
    }

    const resize = new ResizeObserver(settle);
    resize.observe(document.body);
    ScrollTrigger.addEventListener("refresh", settle);
    window.addEventListener("load", settle);
    // The reader taking over the scroll ends the hold.
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      window.removeEventListener("keydown", release);
      resize.disconnect();
      ScrollTrigger.removeEventListener("refresh", settle);
      window.removeEventListener("load", settle);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
    };
  }, []);

  return (
    <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
  );
}
