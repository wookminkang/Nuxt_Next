import { cn } from '@/lib/utils';
import { community } from '@/shared/api/community';
import dayjs from 'dayjs';

type NOTICE_PARMAS = {
  date?: string;
  dateTo?: string;
  text?: string;
  size?: string;
};

async function BoardList({ searchParams }: { searchParams: Promise<NOTICE_PARMAS> }) {
  const searchKeyword = await searchParams;
  const { date, dateTo, text, size } = searchKeyword;

  const params = {
    date: date || dayjs(new Date()).format('YYYY-MM-DD'),
    dateTo: dateTo || dayjs(new Date()).add(1, 'year').format('YYYY-MM-DD'),
    text: text || '',
    size: size || '10',
  };

  // const data = await community.getNoticeList(params.date, params.dateTo, params.text, params.size);
  // console.log(`data =>`, data);

  return (
    <div className={cn('w-full')}>
      {/* Table Header */}
      <div className="flex border-t-[3px] border-b border-t-[#1a1c23] border-b-[#e5e7eb] bg-white px-4 py-5 text-[15px] font-bold text-[#1a1c23]">
        <div className="w-20 text-center">번호</div>
        <div className="flex-1 px-8 text-left">제목</div>
        <div className="w-40 text-center">작성일</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {/* {data.map((item: any, index: number) => (
          <div className="flex" key={item.idx}>
            <div className="w-20 text-center">{index + 1}</div>
            <div className="flex-1 px-8 text-left">{item.title}</div>
            <div className="w-40 text-center">{dayjs(item.regDate).format('YYYY-MM-DD')}</div>
          </div>
        ))} */}

        <div className="border-b border-[#f1f2f4] py-24 text-center text-lg text-[#9ca3af]">
          등록된 게시물이 없습니다.
        </div>
      </div>
    </div>
  );
}

export { BoardList };
