"use client";

import { Check, UserPlus, Search, Filter } from "lucide-react";

export function TeacherRegistration() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 relative">
             <div className="absolute inset-0 bg-primary/20 rounded-md rotate-6 scale-95 pointer-events-none"></div>
             <div className="relative rounded-md overflow-hidden aspect-video shadow-2xl border-4 border-white dark:border-gray-800">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" alt="Teacher" className="w-full h-full object-cover" />
             </div>
             
             {/* Info Bubble */}
             <div className="absolute top-10 -right-10 bg-background/95 backdrop-blur-md border border-border p-6 rounded-md shadow-2xl flex items-center gap-4 animate-float max-w-xs transition-all hover:scale-105">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                   <div className="w-4 h-4 bg-primary rounded-full animate-ping"></div>
                </div>
                <div>
                   <div className="text-sm font-black text-foreground">Start Earning Right Now!</div>
                   <div className="text-xs text-foreground-muted mt-1">Join 500+ instructors today and earn monthly income immediately.</div>
                   <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-medium text-primary">$30 - $3500 earned per month</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2">
             <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-6 uppercase tracking-wider">
                Teach with us
             </div>
             <h2 className="text-[34px] md:text-[42px] font-black text-foreground mb-6 leading-tight tracking-[-0.03em]">
                Start Sharing Skills, Build Courses, Earn Revenue
             </h2>
             <p className="text-[13.5px] text-foreground-muted mb-8 leading-relaxed max-w-xl">
                Join our platform, share your expertise, reach thousands of learners, and earn monthly income effortlessly online today.
             </p>
             
             <ul className="space-y-4 mb-10">
                {[
                   "Flexible Teaching Schedule",
                   "Global Student Reach",
                   "Earn Extra Income",
                   "Build Personal Brand"
                ].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-[14px] font-medium text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                         <Check className="w-3.5 h-3.5" />
                      </div>
                      {item}
                   </li>
                ))}
             </ul>

             <button className="px-8 py-4 bg-primary text-white font-medium rounded-md shadow-xl shadow-primary/30 flex items-center gap-2.5 hover:bg-primary/90 transition-all text-sm">
                <UserPlus className="w-5 h-5" />
                Become an Instructor
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InstructorSearch() {
  return (
    <section className="py-24 bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-20">
          {/* Left Side - Content */}
          <div className="lg:w-1/2">
             <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-6 uppercase tracking-wider">
                Instructors
             </div>
             <h2 className="text-[34px] md:text-[42px] font-black text-foreground mb-6 leading-tight tracking-[-0.03em]">
                Search, Filter, Book Your Ideal Instructor Easily
             </h2>
             <p className="text-[13.5px] text-foreground-muted mb-10 leading-relaxed max-w-xl">
                Quickly find and book the perfect instructor using advanced filters and flexible booking options to match your learning goals.
             </p>
             
             <button className="px-8 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all mb-12 text-sm">
                <Filter className="w-5 h-5" />
                Filter Finder
             </button>
             
             <div className="flex gap-12">
                <div>
                   <div className="text-[32px] font-black text-foreground mb-1 tracking-tighter">25K+</div>
                   <div className="text-[12.5px] font-medium text-foreground">Instructors</div>
                   <div className="text-[10px] text-foreground-muted mt-1 uppercase tracking-widest font-medium">Available in 250 fields</div>
                </div>
                <div className="pl-12 border-l border-border/50">
                   <div className="text-[32px] font-black text-foreground mb-1 tracking-tighter">5K+</div>
                   <div className="text-[12.5px] font-medium text-foreground">Meetings Conducted</div>
                   <div className="text-[10px] text-foreground-muted mt-1 uppercase tracking-widest font-medium">Effectively on platform</div>
                </div>
             </div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 relative">
             <div className="absolute inset-0 bg-primary/20 rounded-md -rotate-6 scale-95 pointer-events-none"></div>
             <div className="relative rounded-md overflow-hidden aspect-video shadow-2xl border-4 border-white dark:border-gray-800">
                <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800" alt="Search Instructor" className="w-full h-full object-cover" />
             </div>
             
             {/* Hover info */}
             <div className="absolute bottom-10 -left-10 bg-background/95 backdrop-blur-md border border-border p-6 rounded-md shadow-2xl flex items-center gap-4 animate-float-delayed">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                   <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                   <div className="text-sm font-black text-foreground">Filter and Find</div>
                   <div className="text-xs text-foreground-muted mt-1">Search instructors in different fields meeting <br /> your requirements and book meetings</div>
                   <div className="mt-3 flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted">
                           <img src={`https://i.pravatar.cc/150?u=${i + 30}`} alt="" className="w-full h-full rounded-full" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-white text-[10px] flex items-center justify-center font-medium">+5K</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
