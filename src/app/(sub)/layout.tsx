import { SideBar } from "@/shared/components/SideBar";
import { SubFooter } from "@/shared/components/SubFooter";

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SideBar />
      <main className="flex-1 p-6 ml-[280px]">
        {children}
      </main>
      <SubFooter />
    </div>
  );
}