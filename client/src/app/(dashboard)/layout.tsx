'use client';

import PortalSidebar from '@/components/PortalSidebar';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <PortalSidebar onCollapseChange={setIsCollapsed} />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Portal top-bar header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground-muted">Portal</span>
            <span className="text-[10px] text-border">/</span>
            <span className="text-xs font-bold text-foreground">Dashboard</span>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
