import HeaderMain from '@/features/main/components/HeaderMain';
import FooterMain from '@/features/main/components/FooterMain';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { Map } from '@/shared/components/Map';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderMain />

      <main className='bg-[#f3f4f6]'>
        {/* Hero Section */}
        <section className="relative w-full">
          <Image src="https://erpqaimage.smartscore.kr/smartscore_erp_homepage/388w4/main/main-vis-image.png" alt="Hero" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center h-full">            
            <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50"></div>
            <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2">
              <h2 className='text-white text-[66px] font-bold w-full'>UNIVALLEY COUNTRY CLUB</h2>
              <h3 className='text-white text-2xl font-bold'>Nature and Humans</h3>
              <h3 className='text-white text-2xl font-bold'>A place where nature and humans meet</h3>
            </div>
          </div>

          {/* 날짜 티타임 선택 */}
          <div className="absolute bottom-0 left-1/2 z-30 w-full -translate-x-1/2 px-16">
            <div className="bg-white rounded-tl-2xl rounded-tr-2xl w-full overflow-hidden">
              <div className='flex'>
                <div className='w-2/3 px-10 py-10'>
                  <h2 className="text-3xl font-bold">
                    날짜를 선택하고 티타임을 확인해보세요!
                  </h2>
                </div>
                <div className='w-1/3 bg-[#f8f8f8] px-10 py-10'>
                  <h2 className="text-3xl font-bold">
                    예약 가능 티타임
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Quick Links / Features */}
        <section className="mt-10">
          <div className="px-16 flex flex-col gap-8">
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
              <div className="flex gap-4 mt-6 h-[500px] overflow-hidden">
                <div className="rounded-2xl overflow-hidden w-1/2"> 
                  <Image src="https://erpqaimage.smartscore.kr/erp/clubs/28/homepage/1763078155640591457.jpg" alt="Event" width={300} height={300} className="w-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden w-1/2"> 
                  <div className="flex gap-2 h-full">
                    <div className='flex-1 rounded-2xl overflow-hidden'>
                      <Image src="https://erpqaimage.smartscore.kr/erp/clubs/28/homepage/1763078155640591457.jpg" alt="Event" width={400} height={800} className="w-full h-full object-cover" />
                    </div>
                    <div className='flex-1 rounded-2xl overflow-hidden'>
                      <Image src="https://erpqaimage.smartscore.kr/erp/clubs/28/homepage/1763078155640591457.jpg" alt="Event" width={400} height={800} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center mt-8'>
                <Button variant="link" className="cursor-pointer text-2xl font-black">
                  더보기
                  <ArrowRightIcon className="size-6" />
                </Button>
              </div>
            </div>

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
                      <ArrowRightIcon className="size-6 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#006f14] rounded-2xl w-full overflow-hidden px-10 py-10">
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-4xl font-extrabold text-white'>고령유니밸리CC 오시는 길</h2>
                  <h3 className='text-[#c1e1c5] text-2xl font-bold mt-3'>아름다운 풍경 속 골프장으로의 여정,</h3>
                  <h3 className='text-[#c1e1c5] text-2xl font-bold'>편하게 찾아오세요</h3>
                  <p className='text-white text-2xl font-bold mt-7'>주소 : 경북 고령군 대가야읍 일량로 588</p>
                </div>
                <div className='w-1/2 h-[400px]'>
                  <Map />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl w-full overflow-hidden px-10 py-10">
              <div className='flex flex-col gap-2'>
                <h2 className='text-4xl font-extrabold'>
                  <span className="text-[#006f14]">클럽소개</span>            
                </h2>
                <h2 className='text-4xl font-extrabold'>
                  우수한 시설과 서비스 제공
                </h2>
                <p className='text-gray-500 text-xl font-bold mt-3'>녹음이 우거진 산을 뒤로하고 아늑하게 자리잡은 클럽하우스</p>
              </div>

              <div className="mt-6 grid h-[600px] grid-cols-3 grid-rows-2 gap-4">
                {/* Row 1 */}
                <div className="group relative col-span-2 row-span-1 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/main-club-image1.jpg"
                    alt="클럽하우스"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                    클럽하우스
                  </span>
                </div>
                <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/main-club-image2.jpg"
                    alt="로비"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-6 left-6 text-2xl font-bold text-white">로비</span>
                </div>
                {/* Row 2 */}
                <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/main-club-image3.jpg"
                    alt="편의점"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                    편의점
                  </span>
                </div>
                <div className="group relative col-span-2 row-span-1 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/main-club-image4.jpg"
                    alt="락커룸"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                    락커룸
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl w-full overflow-hidden px-10 py-10">
              <div className='flex flex-col gap-2'>
                <h2 className='text-4xl font-extrabold'>
                  <span className="text-[#006f14]">공지사항</span>            
                </h2>
                <h2 className='text-4xl font-extrabold'>
                  고령유니밸리의 최신소식
                </h2>
                <p className='text-gray-500 text-xl font-bold mt-3'>Natural Dynamic Course! 고령유니밸리 컨트리 클럽</p>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterMain className='mt-10'/>
    </div>
  );
}
