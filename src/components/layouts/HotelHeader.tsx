'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, AlignJustify } from 'lucide-react';
import type { MenuItem } from '@/types/menu';

interface HotelHeaderProps {
  menus: MenuItem[];
}

export default function HotelHeader({ menus }: HotelHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const navMenus = menus
    .filter((m) => m.isVisible && !m.isMainPage)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <header
      className="fixed top-0 left-0 w-full bg-white z-50"
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveIdx(null);
      }}
    >
      {/* 메가메뉴 열릴 때 배경 패널 */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-gray-100 shadow-lg h-[274px]" />
      )}

      {/* 메인 네비게이션 바 */}
      <div className="relative border-b border-gray-100">
        <div className="relative flex h-[72px] w-full items-center px-10">

          {/* 로고 - 맨 좌측 */}
          <Link href="/hotel" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={90}
              height={55}
              className="object-contain"
              priority
            />
          </Link>

          {/* 네비게이션 - 화면 절대 가운데 */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-17">
            {navMenus.map((menu) => (
              <div
                key={menu.idx}
                className="relative flex h-[72px] items-center"
                onMouseEnter={() => {
                  setIsOpen(true);
                  setActiveIdx(menu.idx);
                }}
              >
                {/* 부모 메뉴 */}
                <button
                  className={`text-[22px] font-bold transition-colors whitespace-nowrap ${activeIdx === menu.idx ? 'text-[#8B7355]' : 'text-gray-800'
                    }`}
                >
                  {menu.name}
                </button>

                {/* 자식 메뉴 - 부모 기준 절대 위치 */}
                {isOpen && (
                  <ul className="absolute top-full left-0 z-50 pt-6 space-y-6 w-full">
                    {menu.children
                      .filter((c) => c.isVisible)
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((child) => (
                        <li key={child.idx} className="w-full text-center">
                          <Link
                            href={child.seoSlug || '#'}
                            target={child.isTargetBlank ? '_blank' : undefined}
                            className="text-[16px] font-semibold text-gray-500 hover:text-[#8B7355] transition-colors whitespace-nowrap text-center inline-block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          {/* 우측 버튼 - 맨 우측 */}
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/login"
              className="border border-gray-300 rounded-sm px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-500 transition-colors"
            >
              로그인
            </Link>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-sm px-3 py-1.5 hover:border-gray-500 transition-colors">
              KOR
              <ChevronDown className="size-3.5" />
            </button>
            <button className="p-1.5 text-gray-700">
              <AlignJustify className="size-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
