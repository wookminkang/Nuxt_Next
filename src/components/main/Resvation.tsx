import Image from 'next/image';

export const Resvation = () => {
  return (
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
      <div className="absolute bottom-0 left-1/2 z-30 w-full -translate-x-1/2 max-w-[1440px] mx-auto">
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
  )
}