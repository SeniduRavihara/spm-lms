import { Navbar } from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/50">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
