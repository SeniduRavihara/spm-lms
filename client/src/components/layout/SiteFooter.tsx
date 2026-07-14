"use client";

import { Send, Mail, Phone, MapPin, Sparkles, Lightbulb, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Newsletter() {
  const { user } = useAuth();
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-background-secondary/10 backdrop-blur-md rounded-md p-12 border border-white/20 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-lg relative">
              <img 
                src="https://lms.rocket-soft.org/store/themes/footers/2/happy_emoji_zoa.svg" 
                className="absolute -top-12 -left-12 w-16 h-16 animate-bounce-slow" 
                alt="Happy"
              />
               <h2 className="text-[34px] font-black text-white mb-4 leading-tight tracking-[-0.03em]">Stay Update</h2>
               <p className="text-[13.5px] text-white/80 leading-relaxed">Stay ahead with our latest courses, expert guides, and earning secrets.</p>
           </div>
           
           <div className="flex-1 w-full max-w-md">
              <div className="relative group">
                 <input
                   type="email"
                   placeholder="Email address"
                   className="w-full px-8 py-5 bg-white text-foreground rounded-md focus:outline-none focus:ring-4 focus:ring-white/20 transition-all font-medium pr-32"
                 />
                 <button className="absolute right-2 top-2 bottom-2 px-8 bg-primary text-white font-black rounded-md hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    Join
                 </button>
              </div>
           </div>
        </div>
        
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-16">
           <div className="text-left relative">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium mb-6">
                 ✨ Let's get started now!
              </div>
              <h3 className="text-[50px] font-black text-white leading-[1.1] tracking-[-0.05em] relative">
                 Take the First Step <br /> Towards Mastery!
                 <Sparkles 
                   className="absolute -right-16 top-0 w-12 h-12 text-yellow-300" 
                 />
              </h3>
              <Link 
                  href={user ? "/dashboard" : "/login"}
                  className="mt-8 px-10 py-5 bg-white text-primary text-[15px] font-black rounded-md inline-flex items-center gap-3 hover:bg-white/90 transition-all shadow-2xl"
               >
                  Enroll in Courses
               </Link>
           </div>
           <div className="opacity-30">
              <Sparkles className="w-64 h-64 text-white rotate-12" />
           </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1a1e2b] text-[#c4c9d4] pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
             <Link href="/" className="flex items-center gap-2 group mb-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0170ff] to-[#67a9ff] group-hover:shadow-lg transition-all duration-300">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#0170ff] to-[#67a9ff] bg-clip-text text-transparent group-hover:opacity-95 transition-all duration-300">SPM LMS</span>
             </Link>
             <p className="text-[13.5px] text-[#c4c9d4]/70 leading-relaxed mb-8">
                Stay ahead with our latest courses, expert guides, and earning secrets.
             </p>
             <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                   <img src="https://lms.rocket-soft.org/store/1/default_images/social/facebook.svg" className="w-5 h-5" alt="Facebook" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                   <img src="https://lms.rocket-soft.org/store/1/default_images/social/messenger.svg" className="w-5 h-5" alt="Messenger" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                   <img src="https://lms.rocket-soft.org/store/1/default_images/social/whatsapp.svg" className="w-5 h-5" alt="WhatsApp" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                   <img src="https://lms.rocket-soft.org/store/1/default_images/social/instagram.svg" className="w-5 h-5" alt="Instagram" />
                </Link>
             </div>
          </div>

          {/* Quick Links */}
          <div>
             <h4 className="text-[16px] font-medium text-white mb-8">Quick Links</h4>
             <ul className="space-y-4 text-[13.5px] text-[#c4c9d4]/70">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Courses</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">About us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact us</Link></li>
             </ul>
          </div>

          {/* Categories */}
          <div>
             <h4 className="text-[16px] font-medium text-white mb-8">Category</h4>
             <ul className="space-y-4 text-[13.5px] text-[#c4c9d4]/70">
                <li><Link href="#" className="hover:text-primary transition-colors">Web Development</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Freelancing 101</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">IT A-Z</Link></li>
             </ul>
          </div>

          {/* Contact Details */}
          <div>
             <h4 className="text-[16px] font-medium text-white mb-8">Contact Us</h4>
             <ul className="space-y-6 text-[13.5px] text-[#c4c9d4]/70">
                <li className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                   <span>No 177/10, Honnattara north, Piliyandala, Sri Lanka</span>
                </li>
                <li className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
                   </svg>
                   <span>+(94) 77 785 4956</span>
                </li>
                <li className="flex items-center gap-3">
                   <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                   <span>hello@spm-lms.com</span>
                </li>
                <li className="flex items-center gap-3">
                   <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                   <span>Mon - Sun : 8am - 6pm</span>
                </li>
             </ul>
          </div>
        </div>

         <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-foreground-muted">
               Copyright © 2026 SPM LMS (PVT) LTD. All Right Reserved.
            </div>
            <div className="flex gap-6">
               <div className="text-xs text-foreground-muted">Refund Policy</div>
               <div className="text-xs text-foreground-muted">Terms & Conditions</div>
               <div className="text-xs text-foreground-muted">Privacy Policy</div>
               <div className="text-xs text-foreground-muted">Data Protection Policy</div>
            </div>
         </div>
      </div>
    </footer>
  );
}
