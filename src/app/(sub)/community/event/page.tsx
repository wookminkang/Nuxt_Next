import { BoardList } from '@/shared/components/community/BoardList';
import { BoardSearch } from '@/shared/components/community/BoardSearch';

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

      <BoardSearch />
      <BoardList searchParams={searchParams} />
    </div>
  );
}
