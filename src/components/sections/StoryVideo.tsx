"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import storefront from "../../../public/images/shop/storefront-patio-cannoli-espresso.webp";

const VIDEO_ID = "cqyCc_02bAY";
const TITLE = "Lions Den Coffee Shop story video";

// Click-to-play facade. Until the visitor presses play, the page loads only a
// local poster image: no YouTube iframe, scripts, cookies or video data. The
// player then comes from youtube-nocookie.com and starts because the visitor
// asked for it (autoplay=1 after the click), so nothing ever plays on its own.
export function StoryVideo() {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  // The play button disappears on click; hand keyboard focus to the player.
  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing]);

  if (playing) {
    return (
      <iframe
        ref={frame}
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&rel=0`}
        title={TITLE}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="story-play"
      onClick={() => setPlaying(true)}
    >
      <Image
        quality={60}
        src={storefront}
        alt=""
        sizes="(max-width: 767px) 90vw, 45vw"
        placeholder="blur"
      />
      <span className="story-play-icon" aria-hidden>
        <Play size={30} fill="currentColor" />
      </span>
      {/* The visible label starts the accessible name (WCAG 2.5.3). */}
      <span className="story-play-label">
        Watch our story
        <span className="sr-only">: play the {TITLE} (loads YouTube)</span>
      </span>
    </button>
  );
}
