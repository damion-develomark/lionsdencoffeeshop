import { DeferredEmbed } from "@/components/ui/deferred-embed";
import { StickerFeature } from "@/components/brand/StickerFeature";
import sfogliatella from "../../../public/images/features/sfogliatella-sticker.webp";

// Elfsight "All-in-One Reviews" carousel. The widget's own look (transparent
// background, cards, stars) is configured in the Elfsight dashboard; the
// section gives it a matching dark stage. DeferredEmbed loads platform.js
// once the widget approaches the viewport.
export function Reviews() {
  return (
    <section
      id="reviews"
      className="reviews-section"
      aria-labelledby="reviews-title"
    >
      <div className="shell">
        <p className="eyebrow">Word around the Den</p>
        <h2 id="reviews-title">
          Lions Den reviews.
          <br />
          <em>From our community.</em>
        </h2>
      </div>
      <DeferredEmbed
        className="reviews-widget"
        src="https://elfsightcdn.com/platform.js"
      >
        <div
          className="elfsight-app-1e152b4b-fda3-4bef-81b3-aeb32f9af3e4"
          data-elfsight-app-lazy
        />
      </DeferredEmbed>
      {/* Straddles the seam into the Visit section below. */}
      <StickerFeature
        className="reviews-sticker"
        src={sfogliatella}
        alt="A sfogliatella with crisp, flaky layers, a swirl of piped cream and a dusting of powdered sugar"
        sizes="(max-width: 767px) 120px, 240px"
        title="Sfogliatella"
        text="Paper-thin, crackly layers, a swirl of cream and a snowfall of powdered sugar. Ask what's in the pastry case today."
        link={{ href: "#visit", label: "Come grab one" }}
      />
    </section>
  );
}
