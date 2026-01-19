import { community } from '@/shared/api/community';
import dayjs from 'dayjs';
import Link from 'next/link';

type NOTICE_ITEM = {
  idx: string;
  title: string;
  text: string;
  views: number;
  topFixing: boolean;
  textCopy: string | null;
  urlCopy: string | null;
  print: string | null;
  post: boolean;
  regId: string;
  regDate: string;
  files: string | null;
  banner: {
    idx: number;
    bannerName: string;
    post: boolean;
    startDate: string;
    startTime: string;
    endDate: string | null;
    endTime: string | null;
    isInfinity: boolean;
    deviceM: boolean;
    devicePc: boolean;
    menuIdx: number;
    openUser: boolean;
    layerUse: boolean;
    layerFile: string;
    mainUse: boolean | null;
    mainFile: string | null;
    link: string;
    windowOpen: boolean;
    todayClose: boolean;
    seeDetail: boolean;
    regId: string;
    regDate: string;
    progress: boolean;
  };
  anotherPosts: string | null;
  thumbnail: string;
}

export const NoticeList = async () => {
  try {
    const noticeList = await community.getMainNoticeList();
    return (

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
          <ul className="space-y-2">
            {noticeList?.map((notice: NOTICE_ITEM) => (
              <li key={notice.idx} className="border-b pb-2 text-lg">
                <Link href={`/community/notice/${notice.idx}`}>
                  <span className="text-gray-500 mr-2">{dayjs(notice.regDate).format('YYYY-MM-DD')}</span>
                  <span className="font-medium">{notice.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    );
  } catch (error) {
    console.error("NoticeList fetch failed:", error);
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">공지사항</h2>
        <div className="text-red-500">공지사항을 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }
}