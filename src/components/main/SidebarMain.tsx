'use client';

import { cn } from '@/lib/utils';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Flag,
  Home,
  MessageSquare,
  User,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: { title: string; href: string }[];
}

const SidebarMain = ({ className }: { className?: string }) => {
  const [openItems, setOpenItems] = useState<string[]>(['코스안내']);

  const menuItems: MenuItem[] = [
    { title: '마이페이지', icon: <User className="size-6" />, href: '/mypage' },
    { title: '클럽안내', icon: <Home className="size-6" />, href: '/club' },
    {
      title: '코스안내',
      icon: <Flag className="size-6" />,
      subItems: [
        { title: '코스 소개', href: '/course/intro' },
        { title: '코스 공략', href: '/course/guide' },
      ],
    },
    { title: '이용안내', icon: <Users className="size-6" />, href: '/guide' },
    { title: '인터넷예약', icon: <Calendar className="size-6" />, href: '/reservation' },
    { title: '커뮤니티', icon: <MessageSquare className="size-6" />, href: '/community' },
  ];

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
    );
  };

  return (
    <aside className={cn('h-full w-[280px] border-r bg-white p-6', className)}>
      {/* Logo */}
      <div className="mb-10 px-2">
        <Image src="/images/logo.png" alt="UNI VALLEY CC" width={140} height={45} priority />
      </div>

      {/* Menu List */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isOpen = openItems.includes(item.title);
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.title} className="flex flex-col">
              {/* Main Item */}
              <button
                onClick={() => hasSubItems && toggleItem(item.title)}
                className={cn(
                  'flex w-full items-center justify-between py-4 px-2 text-gray-800 transition-colors hover:bg-gray-50',
                  isOpen && hasSubItems ? 'font-bold' : 'font-medium'
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-xl">{item.title}</span>
                </div>
                {hasSubItems && (
                  <span>
                    {isOpen ? (
                      <ChevronUp className="size-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="size-6 text-gray-400" />
                    )}
                  </span>
                )}
              </button>

              {/* Sub Items */}
              {hasSubItems && isOpen && (
                <div className="mt-1 flex flex-col space-y-1 pl-12">
                  {item.subItems?.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className={cn(
                        'rounded-lg py-4 pl-4 text-lg transition-colors',
                        subItem.title === '코스 소개'
                          ? 'bg-gray-100 font-bold text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarMain;

