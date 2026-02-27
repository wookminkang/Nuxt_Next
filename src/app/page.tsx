import Image from 'next/image';
import Link from 'next/link';
import { Nanum_Myeongjo } from 'next/font/google';

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const gCode = process.env.NEXT_PUBLIC_G_CODE?.toLowerCase();

const welcomeImg = (fileName: string) =>
  `${imageBaseUrl}/smartscore_erp_homepage/${gCode}/welcome/${fileName}`;

console.log(`welcomeImg =>`, welcomeImg('logo.png'));

export default function WelcomePage() {
  return (
    <div className="flex flex-col w-screen h-screen bg-white overflow-hidden">
      {/* 로고 */}
      <div className="flex justify-center items-center min-h-[210px] shrink-0 max-md:min-h-[104px]">
        <Image
          src={welcomeImg('logo.png')}
          alt="logo"
          width={200}
          height={56}
          priority
          className="h-14 w-auto max-md:h-7"
        />
      </div>

      {/* Golf / Hotel 선택 */}
      <div className="flex flex-1 bg-black overflow-hidden max-md:flex-col">

        {/* 골프 */}
        <Link
          href="/golf"
          className="group relative flex flex-1 items-center justify-center overflow-hidden"
        >
          <Image
            src={welcomeImg('image-golf.jpg')}
            alt="Golf CC Background Image"
            fill
            className="object-cover scale-100 opacity-100 transition-[transform,opacity] duration-[600ms] group-hover:opacity-60 group-hover:scale-110 group-hover:duration-[1600ms] transition-all duration-500"
            quality={80}
          />
          <div className="relative z-10 text-center text-white whitespace-nowrap">
            <strong className={`${nanumMyeongjo.className} block text-[120px] font-light leading-none max-md:text-[60px]`}>
              Golf
            </strong>
            <p className="font-semibold tracking-[-0.32px] leading-snug">
              일라이트 골프장 홈페이지를 방문합니다.
            </p>
          </div>
        </Link>

        {/* 호텔 */}
        <Link
          href="/hotel"
          className="group relative flex flex-1 items-center justify-center overflow-hidden"
        >
          <Image
            src={welcomeImg('image-hotel.jpg')}
            alt="Accommodation Background Image"
            fill
            className="object-cover scale-100 opacity-100 transition-[transform,opacity] duration-[600ms] group-hover:opacity-60 group-hover:scale-110 group-hover:duration-[1600ms] transition-all duration-500"
            quality={80}
          />
          <div className="relative z-10 text-center text-white whitespace-nowrap">
            <strong className={`${nanumMyeongjo.className} block text-[120px] font-light leading-none max-md:text-[60px]`}>
              Hotel
            </strong>
            <p className="font-semibold tracking-[-0.32px] leading-snug">
              일라이트 객실 홈페이지를 방문합니다.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
