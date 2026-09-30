import { execFileSync } from "node:child_process";
import { stat } from "node:fs/promises";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

// Retain the supplied originals; generate only the named delivery variants.
await sharp("public/videos/restaurant-week-poster.jpg")
  .resize({ width: 540, withoutEnlargement: true })
  .webp({ quality: 72, effort: 6 })
  .toFile("public/videos/restaurant-week-poster.webp");

execFileSync(
  ffmpeg,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    "public/videos/restaurant-week.mp4",
    "-vf",
    "scale=540:-2",
    "-c:v",
    "libx264",
    "-crf",
    "27",
    "-preset",
    "slow",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "64k",
    "-movflags",
    "+faststart",
    "public/videos/restaurant-week-540p.mp4",
  ],
  { stdio: "inherit" },
);

for (const file of [
  "restaurant-week-540p.mp4",
  "restaurant-week-poster.webp",
]) {
  console.log(`${file}: ${(await stat(`public/videos/${file}`)).size} bytes`);
}
