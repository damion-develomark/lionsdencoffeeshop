"use client";
import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// The words are split in the markup (no SplitText) and brighten as the quote
// scrolls through. They start at 0.6 opacity, so even before any scrolling
// the gold text keeps ≥ 3:1 contrast on espresso (WCAG large text).
export function StoryQuote({ text }: { text: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".quote-word", {
          opacity: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "bottom 60%",
            scrub: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope: ref },
  );
  const words = text.split(" ");
  return (
    <blockquote ref={ref}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="quote-word">{word}</span>
        </Fragment>
      ))}
    </blockquote>
  );
}
