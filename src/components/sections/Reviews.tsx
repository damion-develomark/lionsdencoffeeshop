import Script from "next/script";

// Elfsight "All-in-One Reviews" carousel. The widget's own look (transparent
// background, cards, stars) is configured in the Elfsight dashboard; the
// section just gives it a matching dark stage. next/script loads platform.js
// once per page, however often this section re-renders.
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
          Don&apos;t take our word for it.
          <br />
          <em>Take theirs.</em>
        </h2>
      </div>
      <div className="reviews-widget">
        <div
          className="elfsight-app-1e152b4b-fda3-4bef-81b3-aeb32f9af3e4"
          data-elfsight-app-lazy
        />
      </div>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </section>
  );
}
