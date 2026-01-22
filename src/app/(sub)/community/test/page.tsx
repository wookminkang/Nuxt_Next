import React from 'react';
import { Search, Calendar } from 'lucide-react'; // 아이콘 라이브러리 예시
import { SearchBar } from '@/shared/components/community/SearchBar';
import { community } from '@/shared/api/community';

const NoticePage = async ({ searchParams }: { searchParams: Promise<{ text: string }> }) => {
  const searchParams_keyword = await searchParams;

  console.log(`searchParams_keyword`, searchParams_keyword);
  const data = await community.getTestList(searchParams_keyword);
  console.log(`notice page data`, data);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* --- Hero Section --- */}
      <section className="relative flex h-[300px] flex-col items-center justify-center bg-gray-800 text-white">
        {/* 배경 이미지 (이미지 경로를 넣어주세요) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/path-to-your-golf-image.jpg')" }}
        />
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-4xl font-bold">커뮤니티</h1>
          <p className="text-lg opacity-90">
            고객들의 새로운 라이프스타일을 선도하는 킹즈락 CC의 생생한 소식입니다.
          </p>
        </div>
      </section>

      {/* --- Content Section --- */}
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">공지사항</h2>

        {/* Search & Filter Bar */}
        <SearchBar />

        {/* Notice List */}
        <div className="space-y-3">
          {/* 리스트 아이템 예시 (이 부분을 map으로 돌리시면 됩니다) */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
            <div
              key={idx}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                {/* '공지' 배지는 첫 번째 아이템 등에만 조건부 렌더링 */}
                {idx === 0 && (
                  <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-white">
                    공지
                  </span>
                )}
                <span className="font-medium text-gray-800 transition-colors group-hover:text-emerald-700">
                  {idx === 0
                    ? '[필독 공지] 2024년 연간 단체 모집 안내'
                    : '2024 킹즈락CC 신년사 제목x작성일'}
                </span>
              </div>
              <span className="text-sm text-gray-400">24.12.06</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NoticePage;
