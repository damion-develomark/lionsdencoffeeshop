"use client";

import { useEffect, useRef } from "react";

const POSTER = "/videos/drone-poster.webp";
const WEBM = "/videos/drone-720p.webm";
const MP4 = "/videos/drone-720p.mp4";

// Muted drone loop behind the Coming Soon section. Nothing (not even the
// poster) is requested until the section nears the viewport; until then the
// section's latte background shows through the tint. The loop pauses when it
// scrolls away and stays on the poster under reduced motion.
export function SoonBackdrop() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          return;
        }
        if (!el.poster) el.poster = POSTER;
        if (reduceMotion) {
          observer.disconnect();
          return;
        }
        if (!el.src) el.src = el.canPlayType("video/webm") ? WEBM : MP4;
        el.play().catch(() => {});
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="soon-backdrop" aria-hidden="true">
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
      />
    </div>
  );
}
