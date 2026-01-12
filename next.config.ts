import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/hp/api/:path*',
        destination: 'http://0.0.0.0:3000/hp/api/:path*', // 실제 API 주소
      },
    ];
  },
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
