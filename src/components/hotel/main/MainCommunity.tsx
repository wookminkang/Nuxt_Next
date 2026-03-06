import dayjs from 'dayjs';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface NoticeItem {
  idx: number;
  title: string;
  text: string;
  regDate: string;
  views: number;
  topFixing: boolean;
  post: boolean;
  thumbnail: { fileUrl?: string } | null;
  anotherPosts: string | null;
}


const NOTICE_TAG = 'hotel-notice';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const gCode = process.env.NEXT_PUBLIC_G_CODE;

export async function MainCommunity() {
  let items: NoticeItem[] = [];

  try {
    const res = await fetch(`${baseUrl}/hp/api/notice?clubCode=${gCode}&size=3&post=true`,
      {
        next: {
          tags: [NOTICE_TAG],
          revalidate: 300, // 5분 기본 캐시 (on-demand revalidation 없을 때 폴백)
        },
      }
    );
    const json = await res.json();
    items = json?.data ?? [];
  } catch (error) {
    console.error('[MainCommunity] 공지사항 조회 실패:', error);
  }

  return (
    <section className="w-full py-20 px-6">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-wide mb-3">NEWS</h2>
        <p className="text-gray-500 text-[15px]">일라이트 호텔의 최근 소식을 안내해 드립니다.</p>
      </div>

      {/* 카드 리스트 */}
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.idx} className="flex flex-col">
              {/* 썸네일 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                {item.thumbnail?.fileUrl ? (
                  <Image
                    src={item.thumbnail.fileUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                )}
                {/* 배지 */}
                <span className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1">
                  공지사항
                </span>
              </div>

              {/* 내용 */}
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-[13px] text-gray-400">{dayjs(item.regDate).format('YYYY.MM.DD')}</p>
                <p className="text-[15px] font-semibold text-gray-800 line-clamp-2 leading-snug">
                  {item.title}
                </p>
                <Link
                  href={`/hotel/community/notice/${item.idx}`}
                  className="mt-1 flex items-center gap-0.5 text-[13px] font-medium text-[#8B7355] hover:underline"
                >
                  바로가기 <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/hotel/community/notice"
            className="flex items-center gap-2 border border-gray-300 px-16 py-3 text-[14px] font-medium text-gray-700 hover:border-gray-500 transition-colors"
          >
            + 더보기
          </Link>
        </div>
      </div>
    </section>
  );
}
