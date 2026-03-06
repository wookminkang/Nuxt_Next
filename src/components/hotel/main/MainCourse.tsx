'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

interface Room {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  stats: string[];
  href: string;
  image: string;
}

const rooms: Room[] = [
  {
    id: 1,
    name: '특별한 휴식과 잊지 못할 추억의 시간',
    subtitle: '자연의 품 안에서 되찾는 당신만의 완벽한 리듬',
    description:
      '비울수록 채워지는 온전한 휴식을 위해, 스탠다드부터 프리미어까지 네 가지 타입의 공간을 세밀하게 다듬었습니다.<br />창 너머 펼쳐지는 풍경과 함께 당신의 취향이 머무는 최적의 공간을 경험해 보십시오',
    stats: ["스탠다드", "슈페리어", "디럭스", "프리미어", "스위트"],
    href: '/hotel/course/east',
    image: '/main-room-01.jpg',
  },
  {
    id: 2,
    name: '스탠다드',
    subtitle: '원베드룸의 3가지 타입',
    description:
      '',
    stats: ["스탠다드 더블", "스탠다드 트윈", "스탠다드 로얄"],
    href: '/hotel/course/west',
    image: '/main-room-02.jpg',
  },
  {
    id: 3,
    name: '슈페리어',
    subtitle: '투베드룸의 1가지 타입',
    description:
      '',
    stats: ['슈페리어'],
    href: '/hotel/course/south',
    image: '/main-room-03.jpg',
  },
  {
    id: 4,
    name: '디럭스',
    subtitle: '원베드룸의 2가지 타입',
    description:
      '',
    stats: ["디럭스 트윈", "디럭스 골프"],
    href: '/hotel/course/south',
    image: '/main-room-04.jpg',
  },
  {
    id: 5,
    name: '프리미어',
    subtitle: '투베드룸의 1가지 타입',
    description:
      '',
    stats: ['프리미어'],
    href: '/hotel/course/south',
    image: '/main-room-05.jpg',
  },
  {
    id: 6,
    name: '스위트',
    subtitle: '3베드룸의 2가지 타입',
    description:
      '',
    stats: ["스위트 골프", "스위트 테라스"],
    href: '/hotel/course/south',
    image: '/main-room-06.jpg',
  },
];

export const MainCourse = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={500}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
        className="w-full h-full"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.id}>
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/smartscore_erp_homepage/${process.env.NEXT_PUBLIC_G_CODE}/main/${room.image}`}
                alt={room.name}
                fill
                className="object-cover"
                priority
              />
              {/* 좌측 어두운 그라디언트 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>

            {/* 좌측 콘텐츠 */}
            <div className="relative z-10 flex h-screen flex-col justify-center px-24">
              <h2 className="text-[60px] font-bold text-white mb-2">
                {room.name}
              </h2>
              <p className="text-white text-[24px] font-semibold mb-4">
                {room.subtitle}
              </p>
              {room.description && (
                <p
                  className="text-white/80 text-[20px] leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: room.description }}
                />
              )}

              {/* 스탯 */}
              <div className="flex items-center gap-4 text-white text-[18px] font-medium mb-8">
                {room.stats.map((stat, i) => (
                  <span key={stat} className="flex items-center gap-4">
                    {stat}
                    {i < room.stats.length - 1 && (
                      <span className="text-white/40">|</span>
                    )}
                  </span>
                ))}
              </div>

              {/* 자세히 보기 버튼 */}
              <Link
                href={room.href}
                className="inline-flex items-center mt-7 border border-white text-white text-[17px] font-medium px-5 py-2.5 w-fit hover:bg-white hover:text-black transition-colors"
              >
                + 자세히 보기
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 이전 버튼 */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center text-white hover:text-white/60 transition-colors"
        aria-label="이전 코스"
      >
        <ChevronLeft className="size-8" />
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center text-white hover:text-white/60 transition-colors"
        aria-label="다음 코스"
      >
        <ChevronRight className="size-8" />
      </button>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {rooms.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`h-[2px] transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
