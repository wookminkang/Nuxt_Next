import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export const Course = () => {
  return (
    <div className="bg-white rounded-2xl w-full overflow-hidden px-10 py-10">
      <div className='flex flex-col gap-2'>
        <h2 className='text-4xl font-extrabold'>
          <span className="text-[#006f14]">코스소개</span>            
        </h2>
        <h2 className='text-4xl font-extrabold'>
          미리보는 코스 정보와 팁
        </h2>
        <p className='text-gray-500 text-xl font-bold mt-3'>Natural Dynamic Course! 고령유니밸리 컨트리 클럽</p>
      </div>

      <div className="mt-6">
        <div className="relative overflow-hidden rounded-2xl">
          <Image src="/images/main-course-image1.png" alt="Course" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute bg-black/50 inset-0 flex flex-col items-center justify-center text-center h-full text-white">
            <h3 className='text-white text-4xl font-bold'>유니코스</h3>
            <h4 className='text-xl font-bold mt-4'>소나무 숲과 탁 트인 고지대 전망이 어우러진</h4>
            <h4 className='text-xl font-bold'>시원한 라운딩이 매력적인 코스</h4>
            <Button variant="link" className="cursor-pointer border border-white rounded-full px-2 py-2 w-[44px] h-[44px] mt-6">
              <Link href="/course/intro">
                <ArrowRightIcon className="size-6 text-white" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}