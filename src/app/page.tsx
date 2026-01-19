import HeaderMain from '@/features/main/components/HeaderMain';
import FooterMain from '@/features/main/components/FooterMain';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { Map } from '@/shared/components/Map';
import { EventList } from '@/shared/components/main/EventList';
import { Course } from '@/shared/components/main/Course';
import { Location } from '@/shared/components/main/Location';
import { ClubIntro } from '@/shared/components/main/ClubIntro';
import { NoticeList } from '@/shared/components/main/NoticeList';
import { Resvation } from '@/shared/components/main/Resvation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderMain />

      <main className='bg-[#f3f4f6]'>
        <Resvation />

        <section className="mt-10 w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-8">
            {/* <EventList />

            <Course />

            <Location />

            <ClubIntro />

            <NoticeList /> */}

          </div>
        </section>
      </main>
      <FooterMain className='mt-10' />
    </div>
  );
}
