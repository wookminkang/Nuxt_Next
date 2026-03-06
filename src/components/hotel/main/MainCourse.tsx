'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  stats: string[];
  href: string;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    name: 'EAST COURSE',
    subtitle: '거친 암반과 울창한 수목이 어우러지는 동코스',
    description:
      '전체 코스의 상층부 능선과 언덕에 위치하여 플레이를 하면서도 코스의 조망뿐 아니라 주변 경관의 아름다움을 그대로 느낄 수 있는 코스입니다.',
    stats: ['3,290M', '3,598YDS', 'PAR36'],
    href: '/hotel/course/east',
    image: '/images/course-east.jpg',
  },
  {
    id: 2,
    name: 'WEST COURSE',
    subtitle: '넓은 페어웨이와 완만한 지형이 펼쳐지는 서코스',
    description:
      '완만한 경사와 넓은 페어웨이로 구성된 서코스는 초보자부터 상급자까지 누구나 즐길 수 있는 코스입니다.',
    stats: ['3,150M', '3,445YDS', 'PAR36'],
    href: '/hotel/course/west',
    image: '/images/course-west.jpg',
  },
  {
    id: 3,
    name: 'SOUTH COURSE',
    subtitle: '아름다운 호수와 조화를 이루는 남코스',
    description:
      '호수를 끼고 펼쳐지는 남코스는 자연과 어우러진 아름다운 경관 속에서 색다른 라운딩 경험을 제공합니다.',
    stats: ['3,210M', '3,511YDS', 'PAR36'],
    href: '/hotel/course/south',
    image: '/images/course-south.jpg',
  },
];

export const MainCourse = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (dir: 'prev' | 'next') => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    setCurrent((prev) =>
      dir === 'next'
        ? (prev + 1) % courses.length
        : (prev - 1 + courses.length) % courses.length
    );
  };

  const course = courses[current];

  return (
    <div className="relative w-full h-[560px] overflow-hidden bg-black">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: animating ? 0.5 : 1 }}
      >
        <Image
          key={course.id}
          src={course.image}
          alt={course.name}
          fill
          className="object-cover"
          priority
        />
        {/* 좌측 어두운 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>

      {/* 좌측 콘텐츠 */}
      <div className="relative z-10 flex h-full flex-col justify-center px-24 max-w-[600px]">
        <h2 className="text-[40px] font-bold text-white tracking-widest mb-2">
          {course.name}
        </h2>
        <p className="text-white text-[16px] font-semibold mb-4">
          {course.subtitle}
        </p>
        <p className="text-white/80 text-[14px] leading-relaxed mb-6">
          {course.description}
        </p>

        {/* 스탯 */}
        <div className="flex items-center gap-4 text-white text-[14px] font-medium mb-8">
          {course.stats.map((stat, i) => (
            <span key={stat} className="flex items-center gap-4">
              {stat}
              {i < course.stats.length - 1 && (
                <span className="text-white/40">|</span>
              )}
            </span>
          ))}
        </div>

        {/* 자세히 보기 버튼 */}
        <Link
          href={course.href}
          className="inline-flex items-center gap-2 border border-white text-white text-[13px] font-medium px-5 py-2.5 w-fit hover:bg-white hover:text-black transition-colors"
        >
          + 자세히 보기
        </Link>
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={() => go('prev')}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center text-white hover:text-white/60 transition-colors"
        aria-label="이전 코스"
      >
        <ChevronLeft className="size-8" />
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={() => go('next')}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center text-white hover:text-white/60 transition-colors"
        aria-label="다음 코스"
      >
        <ChevronRight className="size-8" />
      </button>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {courses.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[2px] transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-4 bg-white/40'
            }`}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
