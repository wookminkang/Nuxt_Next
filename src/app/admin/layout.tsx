import { AdminSidebar } from "@/shared/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 ml-[280px]">
        <div className="flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}