import { gsap } from "@/lib/gsap";
import { LION_EYE_ORIGIN, LION_HEAD_ORIGIN } from "./LionMark";

/**
 * The logo entrance, for a <LionMark animated /> inside `root`: the shield
 * paints on, the mane flames fill in one by one, then the eye opens. The
 * layered pieces are swapped back for the single static mark at the end.
 */
export function addLionReveal(
  tl: gsap.core.Timeline,
  root: string,
  at: number,
) {
  return tl
    .set(`${root} .lion-static`, { autoAlpha: 0 }, 0)
    .set(`${root} .lion-reveal`, { autoAlpha: 1 }, 0)
    .from(
      `${root} .lion-shield-stroke`,
      { drawSVG: "0%", duration: 1.2, ease: "power2.inOut" },
      at,
    )
    .from(
      `${root} .lion-flame`,
      {
        opacity: 0,
        scale: 0.86,
        svgOrigin: LION_HEAD_ORIGIN,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.6)",
      },
      at + 0.6,
    )
    .from(
      `${root} .lion-eye`,
      {
        scaleY: 0,
        svgOrigin: LION_EYE_ORIGIN,
        duration: 0.4,
        ease: "back.out(3)",
      },
      ">-0.15",
    )
    .set(`${root} .lion-static`, { autoAlpha: 1 }, ">")
    .set(`${root} .lion-reveal`, { autoAlpha: 0 }, ">");
}
