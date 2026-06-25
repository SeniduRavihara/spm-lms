import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-6 max-w-5xl mx-auto w-full">{children}</main>
    </>
  );
}
