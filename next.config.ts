import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.meeshocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.meesho.com',
      },
    ],
  },
};

export default nextConfig;
