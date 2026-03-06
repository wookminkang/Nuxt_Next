import { Suspense } from 'react';
import { BoardList } from '@/components/community/BoardList';
import { BoardSearch } from '@/components/community/BoardSearch';

type BOARD_PARMAS = {
  date?: string;
  dateTo?: string;
  text?: string;
  size?: string;
};

export default function CommunityEventPage({
  searchParams,
}: {
  searchParams: Promise<BOARD_PARMAS>;
}) {
  return (
    <div>
      <h1>Community Event</h1>

      <Suspense fallback={null}>
        <BoardSearch />
      </Suspense>
      <BoardList searchParams={searchParams} />
    </div>
  );
}
