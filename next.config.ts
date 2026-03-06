import type { NextConfig } from "next";

// 1. Host 및 서비스 설정 (Nuxt logic 유지)
const hosts: Record<string, string> = {
  ss: "http://192.168.90.36",
  dh: "http://192.168.90.38",
  ldh: "http://192.168.90.37",
  sy: "http://192.168.90.29",
  sb: "http://192.168.90.28",
  lc: "http://localhost",
  dev: "https://erpqahpb.smartscore.kr",
  qa: "http://hpa.qa.erp.officedev",
};

const env = "dev"; // 필요 시 process.env.NEXT_PUBLIC_APP_ENV 등으로 동적 제어 가능

const service = {
  hp: { name: "hp", host: hosts[env], port: 20000 },
};

function getDevHostUrl(svc: { host: string; port: number }) {
  const isCloudEnv = [hosts.dev, hosts.qa].includes(svc.host);
  const host = !isCloudEnv ? `${svc.host}:${svc.port}` : svc.host;
  return host;
}


// 2. Next.js 설정 시작
const nextConfig: NextConfig = {
  // Alias (@/) 설정은 tsconfig.json에서 처리하므로 여기선 생략 가능합니다.

  // SSR 여부 (Next.js App Router는 기본적으로 서버 컴포넌트 기반 SSR)
  // target: 'server' 대신 output: 'standalone' 등을 운영 환경에 맞게 사용합니다.

  // Proxy 설정 (Nuxt의 proxy -> Next의 rewrites)
  async rewrites() {
    const targetHost = getDevHostUrl(service.hp);
    return [
      {
        // 브라우저 요청: /hp/api/member/login
        // 타겟 서버 전달: https://erpqahpb.smartscore.kr/hp/api/member/login
        source: "/hp/api/:path*",
        destination: `${targetHost}/hp/api/:path*`,
      },
      {
        // 브라우저 요청: /hp/member/login (api가 없는 경우)
        // 타겟 서버 전달: https://erpqahpb.smartscore.kr/hp/member/login
        source: "/hp/:path*",
        destination: `${targetHost}/hp/:path*`,
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
      {
        protocol: 'https',
        hostname: 'erpdevimage.smartscore.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'erpimage.smartscore.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.smartscore.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;