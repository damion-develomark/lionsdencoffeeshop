import { useId } from "react";

// Coffee spill that floods the whole hero background, in two layers:
// - .spill-flood: a CSS gradient filling the section (any height, so phones
//   work), light at the top so the headline stays readable.
// - .spill-edge: an SVG strip below it (fixed proportions, full width) with
//   the wavy liquid edge, drips and droplets. Its fill matches the flood's
//   bottom colour so the two read as one sheet.
// The hero timeline slides the spill down ("pour"), runs the drips, then
// slowly morphs the edge between SHEET and SPILL_SHEET_ALT.

const W = 1440;
const H = 150; // strip height in viewBox units
const EDGE = 34; // resting height of the wavy edge inside the strip
const EDGE_COLOR = "#dab478"; // must match the end of .spill-flood's gradient

/** y of the wavy edge at x (a couple of sine harmonics). */
function edgeY(x: number, phase: number) {
  const t = (x / W) * Math.PI * 2;
  return (
    EDGE +
    16 * Math.sin(2 * t + phase) +
    8 * Math.sin(5 * t + 1.7 + phase * 1.4)
  );
}

/** Top of the strip down to a smooth wavy edge, overhanging both sides. */
function sheet(phase = 0, points = 24) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const x = W + 80 - (i / points) * (W + 160); // right to left
    pts.push([x, edgeY(x, phase)]);
  }
  const f = (n: number) => n.toFixed(1);
  let d = `M-80 -2L${W + 80} -2L${f(pts[0][0])} ${f(pts[0][1])}`;
  // Catmull-Rom through the edge points -> cubic beziers.
  for (let i = 0; i < points; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, points)];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

/** A drip hanging from the edge at x: flared join, narrow neck, round bulb. */
function drip(x: number, length: number, width: number) {
  const y0 = edgeY(x, 0) - 4;
  const h = width / 2;
  const bulb = width * 0.62;
  const flare = h + 14;
  const end = y0 + length;
  // The top reaches well above the edge so it stays joined while the edge moves.
  return [
    `M${x - flare} ${y0 - 30}`,
    `L${x - flare} ${y0 - 4}`,
    `C${x - flare} ${y0 + 4} ${x - h} ${y0 + 4} ${x - h} ${y0 + 18}`,
    `L${x - h} ${end - bulb * 1.2}`,
    `C${x - h} ${end - bulb * 0.4} ${x - bulb} ${end - bulb * 0.6} ${x - bulb} ${end}`,
    `A${bulb} ${bulb} 0 0 0 ${x + bulb} ${end}`,
    `C${x + bulb} ${end - bulb * 0.6} ${x + h} ${end - bulb * 0.4} ${x + h} ${end - bulb * 1.2}`,
    `L${x + h} ${y0 + 18}`,
    `C${x + h} ${y0 + 4} ${x + flare} ${y0 + 4} ${x + flare} ${y0 - 4}`,
    `L${x + flare} ${y0 - 30}Z`,
  ].join("");
}

const SHEET = sheet();
export const SPILL_SHEET_ALT = sheet(0.7);

// Spread across the width, but clear of the buttons at bottom-left.
const DRIPS = [
  drip(560, 92, 34),
  drip(700, 56, 24),
  drip(880, 80, 30),
  drip(1080, 62, 26),
  drip(1260, 88, 32),
  drip(1390, 50, 22),
];
// Splash droplets just below the edge.
const DROPLETS: [number, number, number][] = [
  [480, 96, 7],
  [630, 120, 5],
  [790, 104, 8],
  [980, 128, 6],
  [1170, 110, 7],
  [1330, 132, 5],
];

export function CoffeeSpill({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div className={"coffee-spill " + className} aria-hidden>
      <div className="spill-flood" />
      <svg className="spill-edge" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient
            id={id + "-drip"}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={H}
          >
            <stop offset="0" stopColor={EDGE_COLOR} />
            <stop offset="1" stopColor="#b3834a" />
          </linearGradient>
        </defs>
        <g fill={`url(#${id}-drip)`}>
          {DRIPS.map((d, i) => (
            <path key={i} className="spill-drip" d={d} />
          ))}
          {DROPLETS.map(([cx, cy, r], i) => (
            <circle key={i} className="spill-drop" cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <path className="spill-sheet" d={SHEET} fill={EDGE_COLOR} />
      </svg>
    </div>
  );
}

/** Flat roasted coffee bean with its centre crease. */
export function CoffeeBean({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 52" className={"coffee-bean " + className} aria-hidden>
      <ellipse cx="20" cy="26" rx="17" ry="23" fill="#5b3a1d" />
      <path
        d="M21 5C13 16 27 34 19 47"
        fill="none"
        stroke="#2e1d0e"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
