import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin Dashboard | RYM",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="lg:flex min-h-screen bg-surface-container">
      <Sidebar />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
