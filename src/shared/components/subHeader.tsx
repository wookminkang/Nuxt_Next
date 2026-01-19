import Link from 'next/link';

export const SubHeader = () => {
  return (
    <div className="bg-white px-10 py-10 px-12">
      <div className="flex justify-end">
        <Link href="/auth/login" className='text-gray-700 text-lg font-semibold'>로그인/회원가입</Link>
      </div>
    </div >
  )
}