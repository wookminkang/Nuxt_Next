import Image from 'next/image';
export const ClubIntro = () => {
  return (
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
  )
}

