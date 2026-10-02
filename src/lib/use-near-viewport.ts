"use client";
import { type RefObject, useEffect, useState } from "react";

/**
 * True once `ref`'s element comes within `margin` of the viewport, and stays
 * true. Used to hold back below-fold video posters so they don't compete with
 * the hero on first load; the element's own size and background hold its
 * space until then.
 */
export function useNearViewport(
  ref: RefObject<Element | null>,
  margin = "200px 0px",
) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin, near]);
  return near;
}
