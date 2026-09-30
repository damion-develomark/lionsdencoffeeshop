"use client";
import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";

const SRC = "/videos/restaurant-week.mp4";
const POSTER = "/videos/restaurant-week-poster.jpg";
// Matches the tablet breakpoint in globals.css, where the reel becomes the
// card's background and the native control bar would sit under the copy.
const STACKED = "(max-width: 1100px)";

// The shop's vertical Instagram reel. Desktop: shown whole (9:16) with native
// controls, over a blurred copy of itself under a warm tint. Tablet + phone:
// the reel fills the card behind the copy, with round pause, sound and
// fullscreen buttons.
// It starts muted when the card scrolls into view and pauses when it leaves,
// unless the viewer has paused it themselves. Reduced-motion users get the
// poster frame and press play when they want.
export function CultureVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [stacked, setStacked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(STACKED);
    const update = () => setStacked(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onChange = () =>
      setFullscreen(document.fullscreenElement === videoRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const backdrop = backdropRef.current;
    if (!video || !backdrop) return;

    let userPaused = false;
    let autoPausing = false;

    // The backdrop follows the main video: play, pause and seeks.
    const onPlay = () => {
      userPaused = false;
      setPaused(false);
      backdrop.currentTime = video.currentTime;
      backdrop.play().catch(() => {});
    };
    const onPause = () => {
      if (!autoPausing) userPaused = true;
      autoPausing = false;
      setPaused(true);
      backdrop.pause();
    };
    const onSeeked = () => {
      backdrop.currentTime = video.currentTime;
    };
    const onVolume = () => setMuted(video.muted);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("volumechange", onVolume);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced && !userPaused) video.play().catch(() => {});
        } else if (!video.paused) {
          autoPausing = true;
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("volumechange", onVolume);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };
  const toggleMute = () => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  };
  // iPhone Safari has no element fullscreen, only its own video player.
  const enterFullscreen = () => {
    const video = videoRef.current as
      (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
    else video.webkitEnterFullscreen?.();
  };

  return (
    <>
      <video
        ref={backdropRef}
        className="culture-video-backdrop"
        src={SRC}
        poster={POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="culture-video-frame">
        <video
          ref={videoRef}
          className="culture-video"
          src={SRC}
          poster={POSTER}
          muted
          loop
          playsInline
          controls={!stacked || fullscreen}
          preload="metadata"
          aria-label="Lions Den Coffee Shop Instagram reel: drinks, food and the patio in Plantsville"
        />
      </div>
      <div className="culture-video-buttons">
        <button
          type="button"
          className="culture-round"
          onClick={togglePlay}
          aria-label={paused ? "Play video" : "Pause video"}
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>
        <button
          type="button"
          className="culture-round"
          onClick={toggleMute}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <button
          type="button"
          className="culture-round"
          onClick={enterFullscreen}
          aria-label="Watch fullscreen"
        >
          <Maximize size={18} />
        </button>
      </div>
    </>
  );
}
