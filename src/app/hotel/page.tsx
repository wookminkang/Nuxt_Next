/** 호텔 메인페이지 */
import { MainCommunity } from "@/components/hotel/main/MainCommunity";
import { MainCourse } from "@/components/hotel/main/MainCourse";

export default function HotelPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">

      <MainCommunity />

      <MainCourse />


    </div>
  );
}
