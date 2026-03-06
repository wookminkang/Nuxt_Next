import GolfHeader from '@/components/layouts/GolfHeader';
import GolfFooter from '@/components/layouts/GolfFooter';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { Map } from '@/components/common/Map';
import { EventList } from '@/components/main/EventList';
import { Course } from '@/components/main/Course';
import { Location } from '@/components/main/Location';
import { ClubIntro } from '@/components/main/ClubIntro';
import { NoticeList } from '@/components/main/NoticeList';
import { Resvation } from '@/components/main/Resvation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <GolfHeader />

      <main className='bg-[#f3f4f6]'>
        <Resvation />

        <section className="mt-10 w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-8">
            <EventList />

            <Course />

            <Location />

            <ClubIntro />

            <NoticeList />

          </div>
        </section>
      </main>
      <GolfFooter className='mt-10' />
    </div>
  );
}
