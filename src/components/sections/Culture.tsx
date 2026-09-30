import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Anchor } from "./Header";
import { CultureVideo } from "./CultureVideo";

// Video card: the shop's vertical Instagram reel on the right, over a blurred
// copy of itself. Headline + button, a rule, and a short note on the left.
export function Culture() {
  return (
    <section className="culture-section" aria-labelledby="culture-title">
      <div className="shell">
        <div className="culture-card">
          <CultureVideo />
          <div className="culture-content">
            <p className="eyebrow">The Lions Den way</p>
            <h2 id="culture-title">
              Italian coffee.
              <br />
              <em>Stay for the people.</em>
            </h2>
            <Anchor href="#about" className="button">
              Our story <ArrowUpRight size={17} />
            </Anchor>

            <div className="culture-foot">
              <Anchor
                href="#menu"
                className="culture-round"
                aria-label="Skip to the menu"
              >
                <ArrowDown size={18} />
              </Anchor>
              <div className="culture-note">
                <p className="culture-note-title">Behind the bar</p>
                <p>
                  Espresso pulled <strong>the Italian way</strong>, and a
                  counter full of regulars, neighbors and first-timers who leave
                  as friends. This is what a Lions Den morning looks like.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
