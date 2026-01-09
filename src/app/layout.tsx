import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/query-provider';

export const metadata: Metadata = {
  title: '유니밸리 CC',
  description: '자연과 조화로운 고품격 컨트리 클럽, 유니밸리 CC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
