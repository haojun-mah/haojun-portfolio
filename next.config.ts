import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The homepage is a hand-written static file (public/index.html).
  // The previous portfolio still serves at /home.
  async rewrites() {
    return [{ source: "/", destination: "/index.html" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
