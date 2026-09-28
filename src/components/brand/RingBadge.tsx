import { useId } from "react";
import { LionMark } from "@/components/brand/LionMark";

// Round cream sticker: the lion inside a slowly spinning ring of text.
// Keep `text` around 36 characters so it fills the ring at textLength 486.
export function RingBadge({
  text,
  animated = false,
}: {
  text: string;
  animated?: boolean;
}) {
  const ringId = useId().replace(/[^a-zA-Z0-9_-]/g, "") + "-ring";
  return (
    <div className="badge-inner">
      <svg className="badge-ring" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <path
            id={ringId}
            d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"
          />
        </defs>
        <text>
          <textPath href={`#${ringId}`} textLength={486}>
            {text}
          </textPath>
        </text>
      </svg>
      <LionMark animated={animated} className="badge-lion" />
    </div>
  );
}
