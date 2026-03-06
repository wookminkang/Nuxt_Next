import { SideBar } from "@/components/common/SideBar";
import { SubHeader } from "@/components/common/subHeader";
import { SubFooter } from "@/components/common/SubFooter";

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SideBar />
      <SubHeader />
      <main className="flex-1 p-6 ml-[280px]">
        <div className="flex flex-col">
          {children}
        </div>
      </main>
      <SubFooter />
    </div>
  );
}