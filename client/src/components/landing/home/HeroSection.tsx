"use client";

import { IcoStar } from "@/components/icons/LmsIcons";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import HeroFrames from "./HeroFrames";

export default function HeroSection() {
  const { user } = useAuth();
  return (
    <section className="relative pt-20 pb-20 overflow-hidden bg-background">
      {/* Background Vertical Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] flex justify-between px-20">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-px h-full bg-foreground"></div>
        ))}
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-1.5 py-1.5 bg-white dark:bg-background/50 border-2 border-slate-900 dark:border-true-white/20 rounded-full mb-8 group cursor-pointer transition-colors">
               <span className="flex items-center gap-1.5 px-4 py-2 bg-[#0170ff] dark:bg-[#3e93ff] rounded-full text-[13px] font-light text-white dark:text-slate-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-white dark:fill-slate-900">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                  </svg>
                  New
               </span>
               <span className="text-[14px] font-light text-slate-900 dark:text-slate-300 pr-3 flex items-center gap-2">
                  Automated CD Active!
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900/60 dark:text-slate-500 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
               </span>
            </div>

            <h1 className="text-[54px] md:text-[72px] font-black text-foreground leading-[1] mb-8 tracking-[-0.05em]">
              Start <span className="text-primary">Succeeding</span>
              <br />
              <span className="text-foreground/90">With Top Tutors</span>
            </h1>

            <p className="text-[13.5px] text-foreground-muted mb-10 leading-[1.8] max-w-[420px]">
              Join thousands of learners advancing their skills through expert-led courses. Connect with top instructors, learn anytime, and unlock new career opportunities on one platform.
            </p>

            <div className="flex flex-wrap gap-5 mb-12">
              <Link
                href={user ? "/dashboard" : "/login"}
                className="px-8 py-4 bg-[#438eff] dark:bg-[#438eff] text-white dark:text-[#0e2145] font-black rounded-full transition-all shadow-xl shadow-primary/20 flex items-center gap-3 text-[15px]"
              >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 7.81v8.38c0 3.64-2.17 5.81-5.81 5.81H7.81C4.17 22 2 19.83 2 16.19V7.81c0-.51.04-1 .13-1.45C2.64 3.61 4.67 2.01 7.77 2h8.46c3.1.01 5.13 1.61 5.64 4.36.09.45.13.94.13 1.45z" opacity=".4"/>
                  <path d="M22 7.81v.05H2v-.05c0-.51.04-1 .13-1.45h5.64V2h1.5v4.36h5.46V2h1.5v4.36h5.64c.09.45.13.94.13 1.45zM14.44 12.72l-2.08-1.2c-.77-.44-1.51-.5-2.09-.17-.58.33-.9 1.01-.9 1.89v2.4c0 .88.32 1.56.9 1.89.25.14.53.21.82.21.4 0 .83-.13 1.27-.38l2.08-1.2c.77-.44 1.19-1.06 1.19-1.73 0-.67-.43-1.26-1.19-1.71z"/>
                </svg>
                Enroll on Courses
              </Link>
              <Link
                href="#"
                className="px-8 py-4 bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 dark:hover:bg-white/20 border border-slate-900/10 dark:border-white/10 text-foreground font-black rounded-full transition-all flex items-center gap-3 text-[15px] backdrop-blur-sm"
              >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-slate-400 dark:text-slate-500">
                  <path d="M13 3.25H7C3.58 3.25 2.25 4.58 2.25 8v8c0 2.3 1.25 4.75 4.75 4.75h6c3.42 0 4.75-1.33 4.75-4.75V8c0-3.42-1.33-4.75-4.75-4.75z" opacity=".4"/>
                  <path d="M11.5 11.38a1.88 1.88 0 100-3.76 1.88 1.88 0 000 3.76zM21.65 6.17c-.41-.21-1.27-.45-2.44.37l-1.48 1.04c.01.14.02.27.02.42v8c0 .15-.02.28-.02.42l1.48 1.04c.62.44 1.16.58 1.59.58.37 0 .66-.1.85-.2.41-.21 1.1-.78 1.1-2.21V8.38c0-1.43-.69-2-1.1-2.21z"/>
                </svg>
                Book a Meeting
              </Link>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-11 h-11 rounded-full border-[3px] border-background bg-muted overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?u=${i + 20}`}
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <IcoStar key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" size={14} />
                  ))}
                </div>
                <div className="text-[13px] text-foreground-muted font-medium">
                  Trusted by <span className="text-primary font-black">1.2M+</span> <span className="text-foreground font-black">Students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Official Hero Image & Elements */}
          <div className="relative flex items-center justify-center lg:justify-end h-full">
            <div className="relative w-full max-w-[580px] aspect-square">
               {/* Main Composite Image */}
               <HeroFrames />
               
               {/* Rotating Revolver SVG */}
               <img 
                  src="https://lms.rocket-soft.org/store/landing_builder/landing_13/371/revolverimage_RIy.svg" 
                  className="absolute top-[3%] left-[-3%] w-[18%] aspect-square z-20 animate-spin-slow pointer-events-none" 
                  alt="Rotating Badge" 
               />

               {/* Start Now Card */}
               <div className="absolute bottom-[-1%] -left-[-15%] z-30 animate-float">
                  <div className="bg-white/95 dark:bg-[#1e1f26]/95 backdrop-blur-md border border-border/50 p-3 sm:p-4 rounded-md shadow-2xl flex items-center gap-3 rotate-[-15deg]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/10">
                       <img 
                          src="https://lms.rocket-soft.org/store/landing_builder/landing_1/1/ZNzOr_Group_2038.png" 
                          alt="Tutor" 
                          className="w-full h-full object-cover" 
                       />
                    </div>
                    <div>
                       <p className="text-[13px] sm:text-[14px] font-black text-foreground leading-none mb-1">Start Now!</p>
                       <span className="text-[10px] sm:text-[11px] text-foreground-muted whitespace-nowrap">Learning Anywhere, Anytime</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
