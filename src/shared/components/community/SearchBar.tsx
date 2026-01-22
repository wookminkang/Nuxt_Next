'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const keyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key !== 'Enter') {
      return;
    }
    router.push(`/community/test?text=${keyword}`);
  };

  const handleSearch = () => {
    if (!keyword) {
      return;
    }
    router.push(`/community/test?text=${keyword}`);
  };

  return (
    <div className="mb-10 flex flex-wrap gap-3">
      <div className="relative min-w-[300px] flex-1">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="제목, 내용을 입력해주세요"
          className="w-full rounded-full border border-gray-300 px-6 py-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          onKeyDown={keyDownEvent}
        />
        <Search
          className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400"
          onClick={handleSearch}
        />
      </div>
      {/* 날짜 선택 등 추가 인터랙션 요소들 */}
    </div>
  );
}
