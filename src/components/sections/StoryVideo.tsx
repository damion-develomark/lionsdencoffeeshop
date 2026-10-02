"use client";
import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useNearViewport } from "@/lib/use-near-viewport";

const POSTER = "/videos/story-poster.webp";
const TITLE = "Lions Den Coffee Shop story video";

// Click-to-play. Until the visitor presses play, the page loads only the
// poster (preload="none"); the vertical shoot video then streams from this
// site (WebM, with an MP4 fallback for older Safari). Once playing it gets
// the culture reel's round pause, sound and fullscreen buttons instead of the
// native bar, and returns to the poster when it ends. Nothing plays on its own.
export function StoryVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  // The frame's black background stands in until the poster is close.
  const showPoster = useNearViewport(video);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    const onVolume = () => setMuted(el.muted);
    // Back to the poster and the big play button.
    const onEnded = () => {
      setStarted(false);
      el.load();
    };
    const onFullscreen = () => setFullscreen(document.fullscreenElement === el);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("volumechange", onVolume);
    el.addEventListener("ended", onEnded);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("volumechange", onVolume);
      el.removeEventListener("ended", onEnded);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  // The big play button disappears on click; hand keyboard focus to pause.
  useEffect(() => {
    if (started) pauseButton.current?.focus();
  }, [started]);

  const start = () => {
    setStarted(true);
    video.current?.play().catch(() => {});
  };
  const togglePlay = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };
  const toggleMute = () => {
    const el = video.current;
    if (el) el.muted = !el.muted;
  };
  // iPhone Safari has no element fullscreen, only its own video player.
  const enterFullscreen = () => {
    const el = video.current as
      (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else el.webkitEnterFullscreen?.();
  };

  return (
    <>
      <video
        ref={video}
        className="story-video"
        poster={showPoster ? POSTER : undefined}
        preload="none"
        playsInline
        controls={fullscreen}
        aria-label={TITLE}
        onClick={started ? togglePlay : undefined}
      >
        <source src="/videos/story-720p.webm" type="video/webm" />
        <source src="/videos/story-720p.mp4" type="video/mp4" />
      </video>
      {started ? (
        <div className="story-video-buttons">
          <button
            ref={pauseButton}
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
      ) : (
        <button type="button" className="story-play" onClick={start}>
          <span className="story-play-icon" aria-hidden>
            <Play size={30} fill="currentColor" />
          </span>
          {/* The visible label starts the accessible name (WCAG 2.5.3). */}
          <span className="story-play-label">
            Watch our story
            <span className="sr-only">: play the {TITLE}</span>
          </span>
        </button>
      )}
    </>
  );
}
