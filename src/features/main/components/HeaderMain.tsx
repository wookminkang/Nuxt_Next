import Image from 'next/image';
import Link from 'next/link';

const HeaderMain = () => {
  const navItems = [
    { name: '클럽안내', href: '/club' },
    { name: '코스안내', href: '/course' },
    { name: '이용안내', href: '/guide' },
    { name: '인터넷예약', href: '/reservation' },
    { name: '커뮤니티', href: '/community' },
  ];

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="UNI VALLEY CC"
              width={92}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden items-center space-x-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[15px] font-semibold text-gray-800 transition-colors hover:text-[#006633]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-5 text-[13px] font-medium text-gray-600">
          <Link href="/profile" className="hover:text-black">
            내 프로필
          </Link>
          <span className="h-3 w-[1px] bg-gray-300" />
          <button className="hover:text-black">로그아웃</button>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;

