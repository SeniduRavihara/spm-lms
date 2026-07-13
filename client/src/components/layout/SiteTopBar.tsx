"use client";

import { ThemeToggle } from "@/components/ThemeToggle";

import Link from "next/link";

export default function SiteTopBar() {
  return (
    <div className="bg-[#0170ff] dark:bg-[#3e93ff] h-24 text-white dark:text-[#1e1f26] py-2.5 px-4 sm:px-6 lg:px-12 relative z-0 font-extralight transition-colors duration-300 leading-relaxed">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
        {/* Left: Contact Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[13.5px] text-white/90 dark:text-[#1e1f26]/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
            </svg>
            <span>+1 (323) 555-9876</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[13.5px] text-white/90 dark:text-[#1e1f26]/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span>support@spm-lms.com</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[400px] relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-white/20 dark:bg-[#1e1f26]/10 border border-white/15 dark:border-[#1e1f26]/20 rounded-full py-2 px-4 text-[13.5px] text-white dark:text-[#1e1f26] placeholder:text-white/60 dark:placeholder:text-[#1e1f26]/60 focus:outline-none focus:bg-white/25 transition-all font-extralight"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 dark:text-[#1e1f26]/80 absolute right-4 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        {/* Right: Selectors & Auth */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[13.5px] font-extralight hover:text-white/80 dark:hover:text-[#1e1f26]/80 transition-colors">
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
