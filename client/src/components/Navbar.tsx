'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = () => {
    logout()
    router.push('/')
    setShowDropdown(false)
  }

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
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300">IDEACADE</span>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-xl z-50">
                <Link href="/dashboard" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition border-b">
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
