"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import patio from "../../../public/images/patio.webp";

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
            src={patio}
            alt="Guests enjoying coffee on the Lions Den patio in Plantsville"
            sizes="(max-width: 767px) 90vw, 45vw"
            placeholder="blur"
          />
          <span>OUR LITTLE CORNER OF PLANTSVILLE</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">An Italian welcome</p>
          <h2 id="story-title">
            More than coffee.
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
    </section>
  );
}
