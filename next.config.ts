import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'erpqaimage.smartscore.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
