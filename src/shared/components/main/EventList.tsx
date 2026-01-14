'use client';

import { useQuery } from '@tanstack/react-query';
import { community } from '@/shared/api/community';
import { initQueryKey } from '@/shared/utils/queryKet';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';



export const EventList = () => { 
  const { data: eventList, isLoading } = useQuery({
    queryKey: initQueryKey.list('Event'),
    queryFn: () => community.getEventList({ page: 0, size: 10, post: true }),
    staleTime: 1000 * 10 * 1,
    gcTime: 1000 * 60 * 1,
    refetchOnWindowFocus: true,
  });


  if(isLoading) {
    return (
      <div className='flex gap-4 mt-6 h-[500px] overflow-hidden'>
        <Skeleton className='rounded-2xl overflow-hidden w-2/3' />
        <Skeleton className='rounded-2xl overflow-hidden w-1/3' />
        <Skeleton className='rounded-2xl overflow-hidden w-1/3' />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl w-full overflow-hidden px-10 py-10">
      <div className='flex flex-col gap-2'>
        <h2 className='text-4xl font-extrabold'>
          <span className="text-[#006f14]">진행중인 이벤트</span>            
        </h2>
        <h2 className='text-4xl font-extrabold'>
          따끈따끈 최신 혜택
        </h2>
        <p className='text-gray-500 text-xl font-bold mt-3'>고령유니밸리를 더 즐길 수 있는 방법! 진행 중인 다양한 이벤트를 확인해보세요!</p>
      </div>
      <div className='flex gap-4 mt-6 h-[500px] overflow-hidden'>
        {
          eventList?.[0] && (
            <div className="rounded-2xl overflow-hidden w-2/4"> 
              <Image src={eventList?.[0]?.thumbnail} alt="Event" width={500} height={300} className="w-full object-cover" />
            </div>
          )
        }
        {
          eventList?.[1] && (
            <div className="rounded-2xl overflow-hidden w-1/4"> 
              <Image src={eventList?.[1]?.thumbnail} alt="Event" width={500} height={300} className="w-full object-cover" />
            </div>
          )
        }
        {
          eventList?.[2] && (
            <div className="rounded-2xl overflow-hidden w-1/4"> 
              <Image src={eventList?.[2]?.thumbnail} alt="Event" width={500} height={300} className="w-full object-cover" />
            </div>
          )
        }
      </div>
      <div className='flex justify-center mt-8'>
        <Button variant="link" className="cursor-pointer text-2xl font-black">
          <Link href="/community/event">
            <span>더보기</span>
          </Link>
          
          <ArrowRightIcon className="size-6" />
        </Button>
      </div>
    </div>
  )
}