"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { StickerFeature } from "@/components/brand/StickerFeature";
import storefront from "../../../public/images/shop/storefront-patio-cannoli-espresso.webp";
import toGoCup from "../../../public/images/features/to-go-cup-sticker.webp";

export function SlowDownBand() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".story-photo img", {
          scale: 1.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        const split = SplitText.create("blockquote", { type: "words" });
        gsap.from(split.words, {
          opacity: 0.25,
          stagger: 0.1,
          scrollTrigger: {
            trigger: "blockquote",
            start: "top 90%",
            end: "bottom 60%",
            scrub: true,
          },
        });
        return () => split.revert();
      });
      return () => media.revert();
    },
    { scope: ref },
  );
  return (
    <section
      id="about"
      ref={ref}
      className="story-section"
      aria-labelledby="story-title"
    >
      <div className="shell story-grid">
        <div className="story-photo">
          <Image
            quality={60}
            src={storefront}
            alt="A cannoli and a small coffee in a red cup on a patio table in front of the Lions Den Coffee Shop storefront"
            sizes="(max-width: 767px) 90vw, 45vw"
            placeholder="blur"
          />
          <span>OUR LITTLE CORNER OF PLANTSVILLE</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">An Italian welcome</p>
          <h2 id="story-title">
            The Lions Den story.
            <br />
            <em>A sense of belonging.</em>
          </h2>
          <p>
            Established in 2020 by Vincenzo and Anisa Infante, Lions Den brings
            people together over coffee in a warm, Italian environment.
          </p>
          <p>Come in, slow down, and stay a while. Our patio is waiting.</p>
          <blockquote>
            “To enrich the American culture where people enjoy life, family, and
            friends.”
          </blockquote>
          <div className="values">
            {["Service", "Quality", "Community"].map((value) => (
              <Badge key={value} variant="outline">
                {value}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      {/* Straddles the seam into the gallery below. */}
      <StickerFeature
        className="story-sticker"
        src={toGoCup}
        alt="Black Lions Den Coffee Shop to-go cup with the gold lion shield logo"
        sizes="(max-width: 767px) 110px, 180px"
        title="The Lions Den cup"
        text="Espresso, lattes and cold brew, poured to go. Take a little Italian soul with you."
        link={{ href: "#menu", label: "See the coffee menu" }}
      />
    </section>
  );
}
