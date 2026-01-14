import type { NextConfig } from 'next';

const hosts = {
  ss: "http://192.168.90.36", // 성신
  dh: "http://192.168.90.38", // 오팀
  ldh: "http://192.168.90.37", // 동혁
  sy: "http://192.168.90.29", // 소영
  sb: "http://192.168.90.28", // 솔비
  lc: "http://localhost", // 로컬
  dev: "https://erpqahpb.smartscore.kr", // erpdev
};

const env = "dev";

const service = {
  hp: { name: "hp", host: hosts[env], port: 20000 },
};

function getDevHostUrl(svc: { name: string, host: string, port: number }) {
  const isCloudEnv = ["https://erpqahpb.smartscore.kr", "https://erpqahpb.smartscore.kr"].includes(svc.host);
  return !isCloudEnv ? `${svc.host}:${svc.port}` : svc.host;
}


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/hp/:path*', 
        destination: `${getDevHostUrl(service.hp)}/hp/:path*`,
      }
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
