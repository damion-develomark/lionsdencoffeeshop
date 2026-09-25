// MapLibre GL v6 loads its web worker as a separate module file, which Next's
// bundler doesn't emit. Copy the worker (and the chunk it imports) into
// public/maplibre/ so VisitMap can point setWorkerUrl() at it.
// Runs automatically after `npm install` (see "postinstall" in package.json).
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let dist;
try {
  dist = dirname(require.resolve("maplibre-gl/dist/maplibre-gl.mjs"));
} catch {
  console.warn("[maplibre] maplibre-gl not installed; skipping worker copy");
  process.exit(0);
}
const out = join(process.cwd(), "public", "maplibre");
mkdirSync(out, { recursive: true });
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  const src = join(dist, file);
  if (existsSync(src)) copyFileSync(src, join(out, file));
}
console.log("[maplibre] worker copied to public/maplibre/");
