"use client"

import { cn } from '@/lib/utils';
import { community } from '@/shared/api/community';
import dayjs from 'dayjs';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useBoardQuery } from '@/shared/hooks/queryKey';
import { use, useEffect } from 'react';
import { Button } from '@/components/ui/button';

type NOTICE_PARMAS = {
  date?: string;
  dateTo?: string;
  text?: string;
  size?: string;
};

function BoardList({ searchParams }: { searchParams: Promise<NOTICE_PARMAS> }) {
  const queryClient = useQueryClient();
  const searchKeyword = use(searchParams);
  const { date, dateTo, text, size } = searchKeyword;

  const params = {
    date: date || dayjs(new Date()).format('YYYY-MM-DD'),
    dateTo: dateTo || dayjs(new Date()).add(1, 'year').format('YYYY-MM-DD'),
    text: text || '',
    size: size || '10',
  };

  // const data = await community.getNoticeList(params.date, params.dateTo, params.text, params.size);
  // console.log(`data =>`, data);



  const { data: noticeList, isLoading } = useQuery({
    queryFn: () => useBoardQuery.get('Notice', params.date, params.dateTo, params.text, params.size),
    queryKey: useBoardQuery.list('Notice', params),
    staleTime: 1000 * 10 * 1,
    gcTime: 1000 * 60 * 1,
    refetchOnWindowFocus: true,

  })

  const mutation = useMutation({
    mutationFn: () => useBoardQuery.get('Notice', params.date, params.dateTo, params.text, params.size),
    onSuccess: () => {
      console.log(`onSuccess =>`);
      queryClient.invalidateQueries({ queryKey: ['Notice'] });
    },
  })


  const handleRefetch = () => {
    mutation.mutate();
  }


  if(isLoading) {
    return <div>Loading...</div>;
  }
  

  console.log(`noticeList =>`, noticeList);


  return (
    <div className={cn('mx-auto w-full max-w-[1200px]')}>

      <Button onClick={handleRefetch}>다시 가져오기</Button>
      {/* Table Header */}
      <div className="flex border-t-[3px] border-b border-t-[#1a1c23] border-b-[#e5e7eb] bg-white px-4 py-5 text-[15px] font-bold text-[#1a1c23]">
        <div className="w-20 text-center">번호</div>
        <div className="flex-1 px-8 text-left">제목</div>
        <div className="w-40 text-center">작성일</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {noticeList?.map((item: any, index: number) => (
          <div className="flex" key={item.idx}>
            <div className="w-20 text-center">{index + 1}</div>
            <div className="flex-1 px-8 text-left">{item.title}</div>
            <div className="w-40 text-center">{dayjs(item.regDate).format('YYYY-MM-DD')}</div>
          </div>
        ))}

        <div className="border-b border-[#f1f2f4] py-24 text-center text-lg text-[#9ca3af]">
          등록된 게시물이 없습니다.
        </div>
      </div>
    </div>
  );
}

export { BoardList };
