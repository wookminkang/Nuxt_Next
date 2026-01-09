import { cn } from '@/lib/utils';
import { community } from '@/shared/api/community';
import dayjs from 'dayjs';



async function BoardList({ searchParams }: { searchParams: { date: string, dateTo: string, text?: string, size?: string } }) {
  const searchKeyword = await searchParams;

  const params = {
    date: searchKeyword?.date || dayjs(new Date()).format('YYYY-MM-DD'),
    dateTo: searchKeyword?.dateTo || dayjs(new Date()).add(1, 'year').format('YYYY-MM-DD'),
    text: searchKeyword?.text || '',
    size: searchKeyword?.size || '10'
  }

  const data = await community.getNoticeList(params.date, params.dateTo, params.text, params.size);
  console.log(`data =>`, data);

  return (
    <div className={cn('w-full')}>
      {/* Table Header */}
      <div className="flex border-t-[3px] border-t-[#1a1c23] border-b border-b-[#e5e7eb] py-5 px-4 bg-white text-[15px] font-bold text-[#1a1c23]">
        <div className="w-20 text-center">번호</div>
        <div className="flex-1 px-8 text-left">제목</div>
        <div className="w-40 text-center">작성일</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
          {
            data.map((item: any, index: number) => (
              <div className="flex" key={item.idx}>
                <div className="w-20 text-center">{index + 1}</div>
                <div className="flex-1 px-8 text-left">{item.title}</div>
                <div className="w-40 text-center">{dayjs(item.regDate).format('YYYY-MM-DD')}</div>
              </div>
            ))    
          }
          
          
          <div className="py-24 text-center text-[#9ca3af] border-b border-[#f1f2f4] text-lg">
            등록된 게시물이 없습니다.
          </div>
      </div>
    </div>
  );
}

export { BoardList };
