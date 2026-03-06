import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface FooterMainProps {
  className?: string;
}

const FooterMain = ({ className }: FooterMainProps) => {
  return (
    <footer className={cn('bg-[#000f02] py-16 text-white', className)}>
      <div className="mx-auto max-w-7xl px-16">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/images/logo.png"
            alt="UNI VALLEY CC"
            width={150}
            height={50}
            className=""
          />
        </div>

        {/* Policies */}
        <div className="mb-6 flex gap-6 text-[15px] font-bold">
          <Link href="/policy/privacy" className="hover:underline">
            개인정보 처리방침
          </Link>
          <Link href="/policy/terms" className="hover:underline">
            이용약관
          </Link>
          <Link href="/policy/email" className="hover:underline">
            이메일주소무단수집거부
          </Link>
        </div>

        {/* Business Info */}
        <div className="mb-12 space-y-1 text-[14px] text-gray-400">
          <p>
            사업자등록번호. 514-81-41848 &nbsp; (40143) 경북 고령군 대가야읍 일량로 588 유니밸리CC
          </p>
          <p>TEL. 054-956-7575~6 &nbsp; FAX. 054-956-7579</p>
        </div>

        {/* Copyright & Versions */}
        <div className="space-y-1 text-[14px] text-gray-400">
          <p>Copyright© UNIVALLEY COUNTRY CLUB CO., LTD. All rights reserved.</p>
          <p>Frontend Version:0.0.8</p>
          <p>Backend Version:1.2.1(1474)</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;

