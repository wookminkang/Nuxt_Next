import HotelHeader from "@/components/layouts/HotelHeader";
import HotelFooter from "@/components/layouts/HotelFooter";
import { commonApi } from "@/api";
import type { MenuItem } from "@/types/menu";

export default async function HotelLayout({ children }: { children: React.ReactNode }) {
  const res = await commonApi.getMenus('C');
  const menus: MenuItem[] = res?.data ?? [];

  return (
    <div className="">
      <HotelHeader menus={menus} />
      <main className="flex-1">
        {children}
      </main>
      <HotelFooter />
    </div>
  );
}