import { Map } from '@/shared/components/Map';

export const Location = () => {   
  return (
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
  )
}