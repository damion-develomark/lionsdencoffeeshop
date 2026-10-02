import type { NextConfig } from "next";

// Old Squarespace URLs (live sitemap + nav, checked Oct 2, 2026) → their
// closest page on this site, so links and bookmarks don't 404 at launch.
// Next sends 308 for `permanent: true`; search engines treat it like a 301.
const SQUARESPACE_REDIRECTS = [
  { source: "/home", destination: "/" },
  { source: "/aboutus", destination: "/#about" },
  { source: "/our-vision", destination: "/#about" },
  { source: "/contact", destination: "/#contact" },
  // Unfinished "Contact 3" placeholder page (example email address).
  { source: "/lions-den-hq", destination: "/#contact" },
  // No education or member pages on the new site.
  { source: "/education", destination: "/" },
  { source: "/member-site-homepage-2-2", destination: "/" },
  // Retail bags (Kings Reserve, Black Velvet, Espresso Grande Italia) and the
  // three product pages → the homepage menu. If bags are still sold online,
  // point these at that store instead (owner to confirm).
  { source: "/retail-coffee/:path*", destination: "/#menu" },
  { source: "/cart", destination: "/" },
].map((redirect) => ({ ...redirect, permanent: true }));

// All site imagery is local (public/images, public/brand), so no remote image
// hosts are allow-listed.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    imageSizes: [32, 48, 64, 96, 128, 160, 192, 256, 320, 384],
  },
  async redirects() {
    return [
      ...SQUARESPACE_REDIRECTS,
      // Squarespace currently sends /rewards to Toast's rewards sign-up
      // (a 302). Kept temporary: it is an external page the owner controls.
      {
        source: "/rewards",
        destination:
          "https://www.toasttab.com/lions-den-coffee-shop-simsbury-710-hopmeadow-street/rewardsSignup",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
