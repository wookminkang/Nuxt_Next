import { BoardList } from "@/shared/components/community/BoardList";
import { BoardSearch } from "@/shared/components/community/BoardSearch";


export default async function CommunityNoticePage({searchParams}:{searchParams: string}) { 
  const searchKeyword = await searchParams;
  return (
    <div>
      <h1>Community Notice</h1>

      {/* 검색 */}
      <BoardSearch />
      {/* 리스트 */}
      <BoardList />
    </div>
  );
}