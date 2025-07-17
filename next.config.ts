import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: 'media.trekbikes.com' },
      { hostname: 'embed.widencdn.net' },
    ],
  },
};

export default nextConfig;
