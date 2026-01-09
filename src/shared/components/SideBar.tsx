'use client';

import { cn } from '@/lib/utils';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Flag,
  Home,
  Map,
  MessageSquare,
  Building,
  User,
  Users,
  ArrowRightIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: { title: string; href: string }[];
  childrenItems?: { subTitle: string; href: string }[];
  onOff?: boolean;
}

const SideBar = ({ className }: { className?: string }) => {
  const menuItems: MenuItem[] = [
    { title: '마이페이지', icon: <User className="size-6" />, href: '/mypage' },
    { title: '클럽안내', icon: <Home className="size-6" />, href: '/club', childrenItems: [
      { subTitle: '클럽소개', href: '/club/intro' },
      { subTitle: '클럽인사말', href: '/club/greeting' },
      { subTitle: '클럽시설', href: '/club/facility' },
      { subTitle: '클럽맵', href: '/club/map' },
    ] },
    {
      title: '코스안내',
      icon: <Flag className="size-6" />,      
      childrenItems: [
        { subTitle: '코스 소개', href: '/course/intro' },
        { subTitle: '코스 공략', href: '/course/guide' },
      ],
    },
    { title: '이용안내', icon: <Users className="size-6" />, href: '/guide',
      childrenItems: [
        { subTitle: '이용 정책', href: '/guide' },
        { subTitle: '요금 안내', href: '/guide/fee' },
        { subTitle: '오시는 길', href: '/guide/map' },
      ],
    },
    { title: '인터넷예약', icon: <Calendar className="size-6" />, href: '/reservation',
      childrenItems: [
        { subTitle: '골프 예약', href: '/reservation/method' },
      ],
     },
    { title: '커뮤니티', icon: <MessageSquare className="size-6" />, href: '/community',
      childrenItems: [
        { subTitle: '공지사항', href: '/community/notice' },
        { subTitle: '이벤트', href: '/community/event' },
        { subTitle: 'Q&A', href: '/community/qa' },
      ],
     },
  ];


  const [openItems, setOpenItems] = useState();
  const [category, setCategory] = useState<MenuItem[]>(menuItems);

  

  const changeCategory = (item: MenuItem) => {
    setCategory(prev => {
      return prev.map(category => category.title === item.title ? { ...category, 'onOff': true} : {...category, 'onOff': false});
    })
  }
  

  return (
    <aside className={cn('fixed top-0 left-0 h-full w-[280px] border-r bg-white p-6', className)}>
      {/* Logo */}
      <div className="mb-10 px-2">
        <Image src="/images/logo.png" alt="UNI VALLEY CC" width={70} height={45} priority />
      </div>

      {/* Menu List */}
      <nav>
        <ul className='space-y-5'>
            {
              category.map((item) => (
                <li key={item.title}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => changeCategory(item)}>
                        {item.onOff ? <ChevronUp className="size-6" /> : <ChevronDown className="size-6" />}
                      </Button>
                    </div>
                    {item.childrenItems && item.onOff && (
                      <ul className="mt-2 flex flex-col gap-2 py-3">
                        {item.childrenItems.map((childItem) => (
                          <li key={childItem.subTitle} className="px-3 py-2">
                            <Link href={childItem.href} className="text-gray-600 hover:text-gray-900">{childItem.subTitle}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))
            }
        </ul>
      </nav>
    </aside>
  );
};

export { SideBar };

