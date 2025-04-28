// next.config.js or next.config.mjs
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**", // Allow all images under /s/files/
      },
    ],
  },
};

export default nextConfig;
