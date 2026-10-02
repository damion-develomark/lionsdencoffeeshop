"use client";
import { useLayoutEffect, useRef } from "react";

/**
 * One pill that sits under the child of a bar matching `target` and slides
 * between targets with a CSS transition (see `.sliding-pill` in globals.css).
 * Returns refs for the bar (the pill's positioned parent) and the pill.
 * A null or missing target hides the pill.
 */
export function useSlidingPill<Bar extends HTMLElement>(target: string | null) {
  const bar = useRef<Bar>(null);
  const pill = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const box = bar.current;
    const el = pill.current;
    if (!box || !el) return;
    const place = () => {
      const t = target ? box.querySelector<HTMLElement>(target) : null;
      el.style.opacity = t ? "1" : "0";
      if (!t) return;
      el.style.width = `${t.offsetWidth}px`;
      el.style.height = `${t.offsetHeight}px`;
      el.style.transform = `translate(${t.offsetLeft}px, ${t.offsetTop}px)`;
    };
    place();
    // Slide only after the first placement, so the pill doesn't fly in.
    const frame = requestAnimationFrame(() => (el.dataset.ready = ""));
    // Web fonts and breakpoints change the targets' size and position.
    const resize = new ResizeObserver(place);
    resize.observe(box);
    for (const child of box.children) resize.observe(child);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [target]);
  return [bar, pill] as const;
}
