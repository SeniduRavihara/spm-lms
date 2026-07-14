"use client";

import { IcoStudents } from "@/components/icons/LmsBrandIcons";
import { ChevronDown, Rocket, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-[15px] font-light text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-2 px-1 relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
  </Link>
);

export default function SiteNavbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className={cn(
        "mx-auto transition-all duration-300",
        isScrolled ? "max-w-full" : "max-w-7xl px-4 sm:px-6 lg:px-8"
      )}>
        <div className={cn(
          "bg-white dark:bg-[#1e1f26] backdrop-blur-md border-x border-b border-border/50 flex justify-between items-center h-20 transition-all duration-300",
          isScrolled 
            ? "rounded-none px-6 lg:px-12 shadow-md mt-0" 
            : "rounded-md px-6 shadow-2xl -mt-10"
        )}>
          {/* Logo & Categories */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0170ff] to-[#67a9ff] group-hover:shadow-lg transition-all duration-300">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#0170ff] to-[#67a9ff] bg-clip-text text-transparent group-hover:opacity-95 transition-all duration-300">SPM LMS</span>
            </Link>

            <button className="hidden lg:flex items-center gap-2.5 px-4 py-2 bg-slate-50 dark:bg-white/5 border border-border/60 rounded-full text-slate-700 dark:text-slate-200 hover:bg-muted transition-all text-[13.5px] font-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <rect width="7" height="7" x="3" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="14" rx="1"/>
                <rect width="7" height="7" x="3" y="14" rx="1"/>
              </svg>
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden xl:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href={user ? "/dashboard" : "/login"}>Courses</NavLink>
            <NavLink href="/instructors">Instructors</NavLink>
            <NavLink href="/store">Store</NavLink>
            <NavLink href="/forums">Forums</NavLink>
            <NavLink href="/events">Events</NavLink>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
        
            <Link
              href={user ? "/dashboard" : "/login"}
              className="px-8 py-3.5 bg-[#438eff] text-white dark:text-[#0e2145] font-medium rounded-md shadow-lg transition-all flex items-center gap-2 text-[15px]"
            >
              <IcoStudents size={22} />
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
