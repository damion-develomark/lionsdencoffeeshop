# Performance and media optimization

September 30, 2026. Lighthouse 13.5.0; production build at http://localhost:3418. Mobile uses the default simulated mobile/slow-network settings; desktop uses the desktop preset. These are single-run local lab results, not field Core Web Vitals or a production CDN assessment.

| Metric                           | Mobile before            | Mobile after           | Desktop after          |
| -------------------------------- | ------------------------ | ---------------------- | ---------------------- |
| Performance score                | 47                       | 78                     | 99                     |
| First Contentful Paint           | 5.2 s                    | 2.0 s                  | 0.5 s                  |
| Largest Contentful Paint         | 7.9 s                    | 5.2 s                  | 1.0 s                  |
| Total Blocking Time              | 480 ms                   | 60 ms                  | 10 ms                  |
| Cumulative Layout Shift          | 0                        | 0                      | 0.001                  |
| Speed Index                      | 7.3 s                    | 3.4 s                  | 0.7 s                  |
| Avoids enormous network payloads | Total size was 2,393 KiB | Total size was 714 KiB | Total size was 699 KiB |

Mobile transferred hero images: 102,157 → 28,945 bytes. This measures initial Lighthouse transfers, not the total size of every asset a visitor could load while scrolling.

## Implemented

- Installed Lighthouse as a development dependency, with an npm script for repeatable local testing.
- AVIF-first image negotiation with WebP fallback through Next Image; verified an actual image/avif response, Vary: Accept, and an optimizer cache hit. Original WebP files are retained.
- Delivery quality 60 for photo components and more accurate per-image hero sizes, plus intermediate responsive widths. Small branding images retain quality 75.
- Prioritized the smoothie image identified as mobile LCP; retained eager loading for visible hero photos. Removed opacity-based hiding of hero photos and copy; expensive hero entrance animation runs only on desktop/tablet with motion enabled.
- Replaced the external Google Fonts stylesheet with next/font self-hosted fonts. Removed unused Pinyon Script and restricted Poppins weights to those used.
- Deferred Elfsight and Typeform scripts until their reserved widget areas approach the viewport, retaining original functionality and layout space.
- Video uses preload=none and starts when visible. Avoided starting the decorative backdrop video on stacked/mobile layouts.
- Generated a 540px-wide H.264 MP4 with fast-start metadata: 9,839,667 → 5,135,088 bytes (48% smaller). Audio is retained. The original remains available.
- Generated a WebP poster: 195,238 → 45,802 bytes (77% smaller).
- A VP9 WebM trial at 540px/CRF 36 was larger than the optimized MP4; the trial was discarded. This is a result for these settings and this clip, not a claim that MP4 is universally smaller.

## Format recommendation

Use AVIF with WebP fallback for delivered photographs, keeping original sources for future exports. AVIF costs more CPU on the first uncached encode; cached delivery is substantially smaller in the measured images. Keep small logos as vectors where supplied and retain the JPEG social preview for compatibility. For video, WebM and MP4 are appropriate containers; WebP and AVIF are image formats. Keep the measured smaller MP4 here. [Next.js image-format guidance](https://nextjs.org/docs/app/api-reference/components/image#formats).

## Verification

Production build, TypeScript, ESLint, and whitespace checks pass. Browser inspection confirmed loaded hero images, one H1, four server-rendered menu panels, no horizontal overflow at 390px, deferred scripts absent initially, reviews rendering after scrolling, contact iframe mounting, and optimized video reaching readyState 4. No browser console errors were captured. The mobile hero and desktop photo presentation were inspected visually.

## Remaining limits

Mobile LCP is still 5.2 seconds in this simulated run, above the good threshold of 2.5 seconds. Further work should target first-party JavaScript, hydration/render work, and critical rendering rather than further degrading image quality. Lighthouse estimates another roughly 45 KiB of image savings, much smaller than before. The reduced 540px video trades some fullscreen sharpness for bandwidth. No deployment or live-domain test was performed. Validate on production and use repeated runs/field data before treating scores as stable. [Lighthouse scoring and variability](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

## Repeat the checks

1. Run npm run build.
2. Run npm run start -- --port 3418.
3. In another terminal, run npm run lighthouse.
4. Add --preset=desktop to the Lighthouse CLI command for desktop.

Reports are written to reports/lighthouse (gitignored). The saved baseline is before-mobile.report.html; final reports are final-mobile.report.html and final-desktop.report.html. npm run media:optimize regenerates the two optimized video assets from the preserved originals using the checked-in script.
