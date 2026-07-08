'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = () => {
    logout()
    router.push('/')
    setShowDropdown(false)
  }

  const isTeacher = user?.role === 'teacher';
  const dashboardLink = isTeacher ? '/teacher' : '/student';
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('') : '';

  const isActive = (path: string) => pathname === path;
  const isDashboardRoute = pathname?.startsWith('/student') || pathname?.startsWith('/teacher') || pathname?.startsWith('/profile');

  if (user && isDashboardRoute) {
    // Render Dashboard Navbar
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

  // Render Marketing / Landing Page Navbar
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:shadow-lg group-hover:shadow-blue-300 transition-all duration-300">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300">SPM LMS</span>
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#" className="relative text-sm font-medium text-foreground group overflow-hidden">
            <span className="transition-colors duration-300 group-hover:text-primary">Home</span>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="#" className="relative text-sm font-medium text-foreground group overflow-hidden">
            <span className="transition-colors duration-300 group-hover:text-primary">Courses</span>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="#" className="relative text-sm font-medium text-foreground group overflow-hidden">
            <span className="transition-colors duration-300 group-hover:text-primary">Instructors</span>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="#" className="relative text-sm font-medium text-foreground group overflow-hidden">
            <span className="transition-colors duration-300 group-hover:text-primary">Store</span>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="#" className="relative text-sm font-medium text-foreground group overflow-hidden">
            <span className="transition-colors duration-300 group-hover:text-primary">Forums</span>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="#" className="relative text-sm font-medium text-foreground group overflow-hidden">
            <span className="transition-colors duration-300 group-hover:text-primary">Events</span>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
        </div>

        {/* Auth Buttons */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-700">{user.name}</span>
              <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-xl z-50">
                <Link href={dashboardLink} className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition border-b">
                  📊 Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="text-blue-600 bg-transparent hover:bg-blue-50 border border-blue-300 transition-all duration-300">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-cyan-300 transition-all duration-300 hover:scale-105">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
