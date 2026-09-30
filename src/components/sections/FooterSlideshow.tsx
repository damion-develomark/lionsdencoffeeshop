"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import christmasLatte from "../../../public/images/holiday/christmas-latte.webp";
import peppermintMocha from "../../../public/images/holiday/peppermint-mocha.webp";
import christmasMuffin from "../../../public/images/holiday/christmas-muffin.webp";
import coffeeInSnow from "../../../public/images/holiday/coffee-in-snow.webp";
import stPatricksDay from "../../../public/images/holiday/st-patricks-day.webp";
import moscowMule from "../../../public/images/holiday/moscow-mule.webp";

const SLIDES = [
  christmasLatte,
  peppermintMocha,
  christmasMuffin,
  coffeeInSnow,
  stPatricksDay,
  moscowMule,
];
const INTERVAL_MS = 3000;

// Decorative crossfading backdrop of the holiday photos, sitting under the
// footer's latte tint. It only advances while the footer is on screen, and
// holds on the first photo for reduced-motion users.
export function FooterSlideshow() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    const stop = () => window.clearInterval(timer);
    const observer = new IntersectionObserver(([entry]) => {
      stop();
      if (entry.isIntersecting) {
        timer = window.setInterval(
          () => setActive((i) => (i + 1) % SLIDES.length),
          INTERVAL_MS,
        );
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <div ref={ref} className="footer-slideshow" aria-hidden>
      {SLIDES.map((src, i) => (
        <Image
          key={src.src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className={i === active ? "is-active" : undefined}
        />
      ))}
    </div>
  );
}
