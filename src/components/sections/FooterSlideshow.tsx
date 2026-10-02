"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import hotLatte from "../../../public/images/footer/hot-latte.webp";
import cannolis from "../../../public/images/footer/cannolis.webp";
import fruitTarts from "../../../public/images/footer/fresh-fruit-tarts.webp";
import croissants from "../../../public/images/footer/chocolate-hazelnut-croissants.webp";
import antipastoBoard from "../../../public/images/footer/antipasto-board.webp";
import prosciuttoFigPanini from "../../../public/images/footer/prosciutto-fig-panini.webp";

const SLIDES = [
  hotLatte,
  cannolis,
  fruitTarts,
  croissants,
  antipastoBoard,
  prosciuttoFigPanini,
];
const INTERVAL_MS = 3000;

// Decorative crossfading backdrop of menu photos (year-round, not seasonal), sitting under the
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
          quality={60}
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
