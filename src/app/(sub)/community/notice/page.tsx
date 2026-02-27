import { Suspense } from 'react';
import { BoardList } from '@/shared/components/community/BoardList';
import { BoardSearch } from '@/shared/components/community/BoardSearch';

type BOARD_PARMAS = {
  date?: string;
  dateTo?: string;
  text?: string;
  size?: string;
};

export default async function CommunityNoticePage({
  searchParams,
}: {
  searchParams: Promise<BOARD_PARMAS>;
}) {
  return (
    <div>
      <h1>Community Notice</h1>

      {/* 검색 */}
      <Suspense fallback={null}>
        <BoardSearch />
      </Suspense>
      {/* 리스트 */}
      <BoardList searchParams={searchParams} />
    </div>
  );
}
