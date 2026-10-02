import { ArrowUpRight, Phone } from "lucide-react";
import { LionMark } from "@/components/brand/LionMark";
import { Anchor } from "./Header";
import { SoonBackdrop } from "./SoonBackdrop";

// Where "Shop the King's Reserve" points. The pre-order / sign-up route
// (likely the planned Shopify store) is not confirmed yet, so for now it
// goes to the contact form. Swap in the store or sign-up URL once approved.
const KINGS_RESERVE_CTA = {
  href: "#contact",
  label: "Ask about King's Reserve",
};

// Server-rendered teaser for what's next. Only confirmed facts: King's
// Reserve is the shop's light-medium roast whole bean (sold on the old
// site), and the brief lists expansion. No dates, towns or prices.
export function ComingSoon() {
  return (
    <section
      id="coming-soon"
      className="soon-section"
      aria-labelledby="soon-title"
    >
      <SoonBackdrop />
      <div className="shell">
        <p className="eyebrow">What&apos;s brewing</p>
        <h2 id="soon-title">
          Coming soon.
          <br />
          <em>From the Den.</em>
        </h2>
        <div className="soon-grid">
          <article className="soon-card soon-card--reserve">
            <LionMark className="soon-lion" decorative />
            <span className="soon-pill">Whole bean</span>
            <h3>Shop the King&apos;s Reserve</h3>
            <p>
              Our King&apos;s Reserve light-medium roast whole bean coffee is
              getting a new online home, so you can brew Lions Den at home. Ask
              at the counter or send us a note to hear more.
            </p>
            <div className="soon-actions">
              <Anchor className="button" href={KINGS_RESERVE_CTA.href}>
                {KINGS_RESERVE_CTA.label} <ArrowUpRight size={16} />
              </Anchor>
              <a className="soon-link" href="tel:+18604262809">
                <Phone size={15} /> 860-426-2809
              </a>
            </div>
          </article>
          <article className="soon-card soon-card--places">
            <span className="soon-pill">On the way</span>
            <h3>More locations on the way.</h3>
            <p>
              Lions Den is growing beyond Plantsville. Follow along for news as
              new shops get closer.
            </p>
            <a
              className="text-link"
              href="https://www.instagram.com/lionsden_coffee/"
              target="_blank"
              rel="noreferrer"
            >
              Follow @lionsden_coffee <ArrowUpRight size={17} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
