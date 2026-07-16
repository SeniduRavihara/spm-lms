'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  BookOpen
} from 'lucide-react';

interface PortalSidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function PortalSidebar({ onCollapseChange }: PortalSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHash = () => {
      setHash(window.location.hash);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [pathname]);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') {
      setIsCollapsed(true);
      onCollapseChange?.(true);
    }
  }, [onCollapseChange]);

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem('sidebar-collapsed', String(nextState));
    onCollapseChange?.(nextState);
  };

  if (!user) return null;

  const isTeacher = user.role === 'teacher';
  const dashboardLink = isTeacher ? '/teacher' : '/student';

  const menuItems = isTeacher
    ? [
        { label: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
        { label: 'Students', href: '/teacher#students', icon: Users },
        { label: 'My Profile', href: '/profile', icon: UserCircle },
      ]
    : [
        { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
        { label: 'My Profile', href: '/profile', icon: UserCircle },
      ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside 
      className={`h-screen sticky top-0 z-40 bg-card border-r border-border flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-border flex items-center justify-between h-16">
          {!isCollapsed && (
            <Link href={dashboardLink} className="flex items-center gap-2 group">
              <div className={`p-1.5 rounded-lg bg-gradient-to-tr ${isTeacher ? 'from-indigo-500 to-violet-600' : 'from-blue-600 to-indigo-600'} text-white shadow-xs`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base text-foreground tracking-tight">
                SPM LMS
              </span>
            </Link>
          )}
          {isCollapsed && (
            <div className="mx-auto">
              <Link href={dashboardLink} className="p-1.5 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs block">
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          )}
          
          {!isCollapsed && (
            <button 
              onClick={toggleCollapse}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {isCollapsed && (
          <div className="flex justify-center py-3 border-b border-border">
            <button 
              onClick={toggleCollapse}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Menu Navigation Links */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const ActiveIcon = item.icon;
            
            // Check active state using path and hash
            const isTabActive = item.href.includes('#')
              ? pathname === item.href.split('#')[0] && hash === '#' + item.href.split('#')[1]
              : pathname === item.href && (pathname !== '/teacher' || hash !== '#students');

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.href.includes('#')) {
                    const [path, newHash] = item.href.split('#');
                    if (pathname === path) {
                      window.location.hash = newHash;
                    }
                  } else if (item.href === '/teacher' && pathname === '/teacher') {
                    window.location.hash = '';
                  }
                }}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isTabActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground-muted hover:bg-slate-100 dark:hover:bg-zinc-800/50 hover:text-foreground'
                }`}
              >
                <ActiveIcon className={`w-5 h-5 shrink-0 ${isTabActive ? 'text-primary' : 'text-foreground-muted'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-3 border-t border-border">
        {!isCollapsed && (
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-border mb-3">
            <div className="flex items-center gap-2 truncate">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${isTeacher ? 'from-indigo-500 to-violet-600' : 'from-blue-600 to-indigo-600'} text-white flex items-center justify-center text-sm font-bold shrink-0`}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-foreground truncate leading-tight">{user.name}</p>
                <p className="text-[10px] text-foreground-muted uppercase tracking-wider leading-none mt-0.5">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
