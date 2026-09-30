import type { NextConfig } from "next";

// All site imagery is local (public/images, public/brand), so no remote image
// hosts are allow-listed.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    imageSizes: [32, 48, 64, 96, 128, 160, 192, 256, 320, 384],
  },
};

export default nextConfig;
