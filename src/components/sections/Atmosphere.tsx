"use client";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import patio from "../../../public/images/patio.webp";
import latte from "../../../public/images/latte-art.webp";
import pastries from "../../../public/images/pastries.webp";

const photos = [
  {
    src: latte,
    alt: "Lions Den lattes with leaf-shaped latte art in red cups",
    caption: "A little art in every cup",
    number: "01",
  },
  {
    src: pastries,
    alt: "Cannoli and chocolate-topped pastries from the menu",
    caption: "Something sweet on the side",
    number: "02",
  },
  {
    src: patio,
    alt: "The sunny Lions Den storefront and palm-lined patio",
    caption: "Your seat in the sunshine",
    number: "03",
  },
];
// TODO: add additional client photography when supplied.
export function Atmosphere() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () =>
            Math.max(
              0,
              (track.current?.scrollWidth ?? 0) -
                (track.current?.clientWidth ?? 0),
            );
          gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80px",
              end: () => `+=${distance() + 250}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );
      return () => media.revert();
    },
    { scope: ref },
  );
  return (
    <section
      id="gallery"
      ref={ref}
      className="gallery-section"
      aria-labelledby="gallery-title"
    >
      <div className="shell">
        <div className="section-top">
          <div>
            <p className="eyebrow">Life at the Den</p>
            <h2 id="gallery-title">Pull up a chair.</h2>
          </div>
          <a
            href="https://www.instagram.com/lionsden_coffee/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            @lionsden_coffee <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="gallery-window">
          <div ref={track} className="photo-track">
            {photos.map((photo) => (
              <figure key={photo.number}>
                <div className="gallery-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    sizes="(max-width: 767px) 82vw, 560px"
                    placeholder="blur"
                  />
                </div>
                <figcaption>
                  <span>{photo.caption}</span>
                  <span>{photo.number}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
