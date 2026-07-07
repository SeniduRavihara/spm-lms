'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const isTeacher = user.role === 'teacher';
  const dashboardLink = isTeacher ? '/teacher' : '/student';
  const initials = user.name.split(' ').map(n => n[0]).join('');

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs px-6 py-3 flex items-center justify-between transition-all duration-300">
      {/* Brand logo */}
      <Link href={dashboardLink} className="flex items-center gap-2 group">
        <div className={`p-2 rounded-xl bg-gradient-to-tr ${isTeacher ? 'from-indigo-500 to-violet-600 bg-indigo-600' : 'from-blue-600 to-indigo-600 bg-blue-600'} text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <span className="font-extrabold text-lg text-zinc-900 dark:text-white tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent group-hover:opacity-95 transition-opacity">
          LMS Portal
        </span>
      </Link>

      {/* Navigation items */}
      <div className="flex items-center gap-5 text-sm">
        <Link
          href={dashboardLink}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
            isActive(dashboardLink)
              ? 'text-zinc-900 bg-zinc-100 dark:bg-zinc-800 dark:text-white'
              : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-200'
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/profile"
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
            isActive('/profile')
              ? 'text-zinc-900 bg-zinc-100 dark:bg-zinc-800 dark:text-white'
              : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-200'
          }`}
        >
          My Profile
        </Link>

        <span className="w-px h-5 bg-zinc-200 dark:bg-zinc-800" />

        {/* User Badge Info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 leading-none">{user.name}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isTeacher ? 'text-indigo-500' : 'text-blue-500'}`}>
              {user.role}
            </span>
          </div>

          <Link href="/profile" className="focus:outline-none">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${isTeacher ? 'from-indigo-500 to-violet-600' : 'from-blue-500 to-indigo-600'} text-white font-extrabold flex items-center justify-center shadow-xs border border-white/25 dark:border-zinc-800 hover:scale-105 active:scale-95 transition-all`}>
              {initials}
            </div>
          </Link>

          <button
            onClick={logout}
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-1.5 rounded-lg transition-all font-semibold active:scale-95 cursor-pointer text-xs"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
