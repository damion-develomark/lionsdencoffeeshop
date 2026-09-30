"use client";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Anchor } from "@/components/sections/Header";

// A supplied cutout with a baked-in cream die-cut border (public/images/
// features), a gold offset shadow and a caption. It pops in when it reaches
// the screen, then drifts against the scroll for depth.
export function StickerFeature({
  src,
  alt,
  sizes,
  title,
  text,
  link,
  className,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  title: string;
  text: string;
  link: { href: string; label: string };
  className: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const onScreen = { trigger: ref.current, start: "top 85%" };
        // 1. Pop: the sticker springs in with a spin, then the caption follows.
        gsap.from(".sticker-art", {
          scale: 0.4,
          rotate: -18,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(2.2)",
          scrollTrigger: onScreen,
        });
        gsap.from(".sticker-caption > *", {
          y: 16,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: onScreen,
        });
        // 2. Parallax: the sticker rises past its caption as the page scrolls.
        gsap.fromTo(
          ".sticker-float",
          { yPercent: 8 },
          {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className={`sticker-feature ${className}`}>
      <figcaption className="sticker-caption">
        <span className="sticker-title">{title}</span>
        <p>{text}</p>
        <Anchor href={link.href} className="sticker-link">
          {link.label} <ArrowUpRight size={15} />
        </Anchor>
      </figcaption>
      <div className="sticker-float">
        <Image className="sticker-art" src={src} alt={alt} sizes={sizes} />
      </div>
    </figure>
  );
}
