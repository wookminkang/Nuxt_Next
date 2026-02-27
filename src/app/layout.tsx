import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/query-provider';
import { ToastBox } from '@/shared/components/ToastBox';
import { UIAlert } from '@/shared/components/dialog/UIAlert';
import { UIConfirm } from '@/shared/components/dialog/UIConfirm';
import { UIToast } from '@/shared/components/dialog/UIToast';


export const metadata: Metadata = {
  title: '일라이트 클럽',
  description: '일라이트 클럽',
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
        <ToastBox />
        <UIAlert />
        <UIConfirm />
        <UIToast />
      </body>
    </html>
  );
}
