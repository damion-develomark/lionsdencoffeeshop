import { Badge } from "@/components/ui/badge";
import { StickerFeature } from "@/components/brand/StickerFeature";
import { StoryQuote } from "./StoryQuote";
import { StoryVideo } from "./StoryVideo";
import toGoCup from "../../../public/images/features/to-go-cup-sticker.webp";

// Server-rendered copy; only the video facade and the quote's scroll fade
// are client islands.
export function SlowDownBand() {
  return (
    <section id="about" className="story-section" aria-labelledby="story-title">
      <div className="shell story-grid">
        <div className="story-photo">
          <StoryVideo />
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
          <StoryQuote text="“To enrich the American culture where people enjoy life, family, and friends.”" />
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
