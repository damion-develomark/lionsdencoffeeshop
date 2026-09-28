"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Anchor } from "./Header";

// Stock footage (Pexels #29719125, free to use) until the shop's own is shot.
// Re-encoded to 720p with macOS avconvert to keep it light.
const VIDEO = "/videos/cafe-culture.mp4";
const POSTER = "/videos/cafe-culture-poster.jpg";

// Full-bleed video card: headline + button bottom-left, a rule across, and a
// short note bottom-right, over the café in motion.
export function Culture() {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // Only play while on screen, and never for reduced-motion visitors.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section className="culture-section" aria-labelledby="culture-title">
      <div className="shell">
        <div className="culture-card">
          <video
            ref={video}
            className="culture-video"
            src={VIDEO}
            poster={POSTER}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
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
                  as friends. This is what a Lions Den morning sounds like.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
