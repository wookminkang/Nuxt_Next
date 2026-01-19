import { SideBar } from "@/shared/components/SideBar";
import { SubHeader } from "@/shared/components/subHeader";
import { SubFooter } from "@/shared/components/SubFooter";

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