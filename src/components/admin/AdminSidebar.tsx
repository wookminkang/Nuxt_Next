'use client';

import { useState } from 'react';
import {
  LayoutGrid,
  Monitor,
  Menu,
  FileText,
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  Settings,
  Users,
  Folder,
  BarChart3,
  Shield,
  Database,
  Globe,
  Image,
  Bell,
  Mail,
  Calendar,
  BookOpen,
  Archive,
  Tag,
  Search,
  Home,
  Layers,
  FileEdit,
  Newspaper,
  Megaphone,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUserInfoStore } from '@/store/userStore';

// 아이콘 매핑 함수
const getIcon = (iconName: string, menuName?: string) => {
  // iconName을 소문자로 변환하여 매칭
  const iconLower = iconName?.toLowerCase() || '';
  const nameLower = menuName?.toLowerCase() || '';

  const iconMap: Record<string, React.ReactNode> = {
    // 직접 매칭
    'layoutgrid': <LayoutGrid className="w-5 h-5" />,
    'monitor': <Monitor className="w-5 h-5" />,
    'menu': <Menu className="w-5 h-5" />,
    'filetext': <FileText className="w-5 h-5" />,
    'settings': <Settings className="w-5 h-5" />,
    'users': <Users className="w-5 h-5" />,
    'folder': <Folder className="w-5 h-5" />,
    'barchart3': <BarChart3 className="w-5 h-5" />,
    'shield': <Shield className="w-5 h-5" />,
    'database': <Database className="w-5 h-5" />,
    'globe': <Globe className="w-5 h-5" />,
    'image': <Image className="w-5 h-5" />,
    'bell': <Bell className="w-5 h-5" />,
    'mail': <Mail className="w-5 h-5" />,
    'calendar': <Calendar className="w-5 h-5" />,
    'bookopen': <BookOpen className="w-5 h-5" />,
    'archive': <Archive className="w-5 h-5" />,
    'tag': <Tag className="w-5 h-5" />,
    'search': <Search className="w-5 h-5" />,
    'home': <Home className="w-5 h-5" />,
    'layers': <Layers className="w-5 h-5" />,
    'fileedit': <FileEdit className="w-5 h-5" />,
    'newspaper': <Newspaper className="w-5 h-5" />,
    'megaphone': <Megaphone className="w-5 h-5" />,
    'helpcircle': <HelpCircle className="w-5 h-5" />,

    // 메뉴 이름 기반 매칭
    '대시보드': <LayoutGrid className="w-5 h-5" />,
    '사이트관리': <Monitor className="w-5 h-5" />,
    '메뉴관리': <Menu className="w-5 h-5" />,
    '게시물관리': <FileText className="w-5 h-5" />,
    '공지사항': <Newspaper className="w-5 h-5" />,
    '이벤트': <Megaphone className="w-5 h-5" />,
    '자료실': <Archive className="w-5 h-5" />,
    '자주찾는질문': <HelpCircle className="w-5 h-5" />,
    '배너': <Image className="w-5 h-5" />,
    '팝업': <Bell className="w-5 h-5" />,
    '회원관리': <Users className="w-5 h-5" />,
    '설정': <Settings className="w-5 h-5" />,
  };

  // iconName으로 먼저 찾기
  if (iconMap[iconLower]) {
    return iconMap[iconLower];
  }

  // menuName으로 찾기
  if (iconMap[nameLower]) {
    return iconMap[nameLower];
  }

  // 기본값
  return <LayoutGrid className="w-5 h-5" />;
};

export const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Set<string | number>>(new Set());
  const pathname = usePathname();
  const { userInfo } = useUserInfoStore();
  const adminMenus = userInfo.adminMenus || [];

  // 드롭다운 토글 함수
  const toggleMenu = (menuIdx: string | number) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuIdx)) {
        newSet.delete(menuIdx);
      } else {
        newSet.add(menuIdx);
      }
      return newSet;
    });
  };

  // children이 객체 배열인지 확인하는 헬퍼 함수
  const isChildrenObjectArray = (children: any[]): children is any[] => {
    return children.length > 0 && typeof children[0] === 'object' && children[0] !== null;
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 fixed left-0 top-0 z-50",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* 접기/펼치기 버튼 */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <ChevronsLeft className={cn(
            "w-4 h-4 text-gray-600 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {adminMenus.length === 0 ? (
            <li className="px-3 py-3 text-sm text-gray-400 text-center">
              메뉴가 없습니다
            </li>
          ) : (
            adminMenus.map((menu) => {
              // children이 객체 배열인지 확인
              const childrenArray = Array.isArray(menu.children) ? menu.children : [];
              const hasSubmenu = childrenArray.length > 0 && isChildrenObjectArray(childrenArray);
              const isActive = menu.path === pathname;
              const menuPath = menu.path || '#';
              const isOpen = openMenus.has(menu.idx);

              // children이 문자열 배열인 경우 (이전 방식 호환)
              const isStringArray = childrenArray.length > 0 && typeof childrenArray[0] === 'string';
              const subMenus = isStringArray
                ? adminMenus.filter((subMenu) => childrenArray.includes(String(subMenu.idx)))
                : childrenArray;

              // 최상위 메뉴만 표시 (다른 메뉴의 children에 포함되지 않은 메뉴)
              const isTopLevel = !adminMenus.some((m) => {
                if (!m.children || !Array.isArray(m.children) || m.children.length === 0) return false;
                // children이 객체 배열인 경우
                if (isChildrenObjectArray(m.children)) {
                  return m.children.some((child: any) => child.idx === menu.idx);
                }
                // children이 문자열 배열인 경우
                if (typeof m.children[0] === 'string') {
                  const stringChildren = m.children as string[];
                  return stringChildren.includes(String(menu.idx));
                }
                return false;
              });

              // 최상위 메뉴만 표시
              if (!isTopLevel) return null;

              return (
                <li key={menu.idx}>
                  {menuPath !== '#' && !hasSubmenu ? (
                    <Link
                      href={menuPath}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                        "hover:bg-gray-50",
                        isActive && "bg-gray-100 font-medium",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <span className="text-black">{getIcon(menu.icon, menu.name)}</span>
                      {!isCollapsed && (
                        <span className="flex-1 text-black">{menu.name}</span>
                      )}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => hasSubmenu && toggleMenu(menu.idx)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                          "hover:bg-gray-50 text-black",
                          isActive && "bg-gray-100 font-medium",
                          isCollapsed && "justify-center"
                        )}
                      >
                        <span>{getIcon(menu.icon, menu.name)}</span>
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left">{menu.name}</span>
                            {hasSubmenu && (
                              isOpen ? (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              )
                            )}
                          </>
                        )}
                      </button>
                      {/* 서브메뉴 */}
                      {hasSubmenu && isOpen && !isCollapsed && subMenus.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {subMenus.map((subMenu: any) => {
                            const isSubActive = subMenu.path === pathname;
                            const subPath = subMenu.path || '#';
                            const subHasChildren = subMenu.children && Array.isArray(subMenu.children) && subMenu.children.length > 0 && isChildrenObjectArray(subMenu.children);
                            const isSubOpen = openMenus.has(subMenu.idx);

                            return (
                              <li key={subMenu.idx}>
                                {subPath !== '#' && !subHasChildren ? (
                                  <Link
                                    href={subPath}
                                    className={cn(
                                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                                      "hover:bg-gray-50 text-gray-700",
                                      isSubActive && "bg-gray-100 font-medium text-black"
                                    )}
                                  >
                                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                    <span className="flex-1">{subMenu.name}</span>
                                  </Link>
                                ) : subHasChildren ? (
                                  <>
                                    <button
                                      onClick={() => toggleMenu(subMenu.idx)}
                                      className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm text-left",
                                        "hover:bg-gray-50 text-gray-700"
                                      )}
                                    >
                                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                      <span className="flex-1">{subMenu.name}</span>
                                      {isSubOpen ? (
                                        <ChevronDown className="w-3 h-3 text-gray-400" />
                                      ) : (
                                        <ChevronRight className="w-3 h-3 text-gray-400" />
                                      )}
                                    </button>
                                    {/* 3단계 서브메뉴 */}
                                    {isSubOpen && subMenu.children.map((subSubMenu: any) => {
                                      const isSubSubActive = subSubMenu.path === pathname;
                                      const subSubPath = subSubMenu.path || '#';

                                      return (
                                        <ul key={subSubMenu.idx} className="ml-6 mt-1">
                                          <li>
                                            {subSubPath !== '#' ? (
                                              <Link
                                                href={subSubPath}
                                                className={cn(
                                                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                                                  "hover:bg-gray-50 text-gray-600",
                                                  isSubSubActive && "bg-gray-100 font-medium text-black"
                                                )}
                                              >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                <span className="flex-1">{subSubMenu.name}</span>
                                              </Link>
                                            ) : (
                                              <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                <span>{subSubMenu.name}</span>
                                              </div>
                                            )}
                                          </li>
                                        </ul>
                                      );
                                    })}
                                  </>
                                ) : (
                                  <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500">
                                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                    <span>{subMenu.name}</span>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </nav>
    </div>
  );
}

