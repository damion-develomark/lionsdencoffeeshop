import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Anchor } from "./Header";
import patioCoffee from "../../../public/images/shop/iced-coffee-by-the-patio.webp";

// Full-bleed photo card: headline + button bottom-left, a rule across, and a
// short note bottom-right, over an iced coffee in front of the shop's patio.
export function Culture() {
  return (
    <section className="culture-section" aria-labelledby="culture-title">
      <div className="shell">
        <div className="culture-card">
          <Image
            src={patioCoffee}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 1200px"
            placeholder="blur"
            className="culture-photo"
          />
          <div className="culture-content">
            <p className="eyebrow">The Lions Den way</p>
            <h2 id="culture-title">
              Come for the coffee.
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
