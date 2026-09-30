"use client";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import icedCoffees from "../../../public/images/gallery/iced-coffees-on-the-counter.webp";
import bagels from "../../../public/images/gallery/bagel-sandwiches-tray.webp";
import cannoli from "../../../public/images/gallery/cannoli-chocolate-pistachio.webp";
import sfogliatelle from "../../../public/images/gallery/sfogliatelle-cream-tray.webp";
import tarts from "../../../public/images/gallery/berry-cream-tarts.webp";
import matchaFoam from "../../../public/images/gallery/matcha-strawberry-foam-storefront.webp";
import fallCoffee from "../../../public/images/gallery/fall-iced-coffee.webp";
import snowCoffee from "../../../public/images/gallery/winter-coffee-in-snow.webp";

// The shop's own photos. Pastries and seasonal drinks live here rather than
// in the menu; captions describe the moment, not a specific menu item.
const photos = [
  {
    src: icedCoffees,
    alt: "Two iced coffees in Lions Den Coffee Shop cups, one with cream swirled through, one black",
    caption: "Iced, your way",
  },
  {
    src: bagels,
    alt: "A tray of four bagel breakfast sandwiches carried by a Lions Den staff member",
    caption: "Breakfast, on its way out",
  },
  {
    src: cannoli,
    alt: "Cannoli dipped in chocolate chips and crushed pistachios",
    caption: "Something sweet on the side",
  },
  {
    src: sfogliatelle,
    alt: "A tray of flaky shell-shaped pastries topped with piped cream and powdered sugar",
    caption: "Fresh from the pastry case",
  },
  {
    src: tarts,
    alt: "Cream tarts topped with raspberries and chocolate-dipped strawberries",
    caption: "Check the pastry display",
  },
  {
    src: matchaFoam,
    alt: "Iced matcha drink with pink foam held up outside the Lions Den storefront",
    caption: "Specials under the sign",
  },
  {
    src: fallCoffee,
    alt: "Iced coffee dusted with cinnamon among pumpkins and autumn leaves",
    caption: "Fall, by the cup",
  },
  {
    src: snowCoffee,
    alt: "A Lions Den Coffee Shop hot cup resting in fresh snow beside a holly bush",
    caption: "Warm on a winter morning",
  },
].map((photo, i) => ({ ...photo, number: String(i + 1).padStart(2, "0") }));

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
