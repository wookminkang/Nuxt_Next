
import { community } from '@/shared/api/community';
import { cn } from '@/lib/utils';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

import dayjs from 'dayjs';
import { Separator } from '@/components/ui/separator';


export default async function CommunityNoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noticeDetail = await community.getNoticeDetail(id);


  return (
    <div className={cn('mx-auto w-full max-w-[1200px]')}>
      <Button variant="ghost" size="icon" className="cursor-pointer">
        <MoveLeft className='size-7' />
      </Button>
      <h1 className='text-3xl font-bold mt-10'>{noticeDetail.title}</h1>
      <div className='text-lg text-gray-600 mt-3 flex items-center'>
        <span>{dayjs(noticeDetail.regDate).format('YYYY-MM-DD')}</span>

      </div>
    </div>
  )
}