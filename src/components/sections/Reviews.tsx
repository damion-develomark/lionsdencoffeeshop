import { DeferredEmbed } from "@/components/ui/deferred-embed";

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
    </section>
  );
}
