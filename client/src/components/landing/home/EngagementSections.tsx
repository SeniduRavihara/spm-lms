"use client";

import { IcoForums, IcoPlus, IcoVideo, IcoRewardPoints } from "@/components/icons/LmsIcons";
import { Info, Wallet } from "lucide-react";

export function ForumSection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-[11.5px] font-medium mb-6 uppercase tracking-wider">
             Forums
          </div>
          <h2 className="text-[34px] md:text-[42px] font-black text-white mb-6 leading-tight tracking-[-0.03em]">
             Share Ideas, Gain Knowledge, Build Community
          </h2>
          <p className="text-[13.5px] text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
             Join our discussion forums to share your ideas, learn from others, and interact with the community. Exchange ideas on various topics, engage in meaningful discussions, get valuable insights from peers and experts, and expand your knowledge beyond courses.
          </p>

         <div className="flex justify-center -space-x-4 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
               <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-muted overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i + 40}`} alt="" className="w-full h-full object-cover" />
               </div>
            ))}
         </div>

         <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-5 bg-white text-primary font-black rounded-md shadow-2xl flex items-center gap-3 hover:bg-white/90 transition-all">
               <IcoForums className="w-6 h-6" size={24} />
               Explore Forums
            </button>
            <button className="px-10 py-5 bg-primary-foreground/10 border border-white/20 text-white font-black rounded-md flex items-center gap-3 hover:bg-white/10 transition-all">
               <IcoPlus className="w-6 h-6" size={24} />
               Create a Topic
            </button>
         </div>
      </div>
    </section>
  );
}

export function LiveClasses() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-4 uppercase tracking-wider">
             Live classes
          </div>
          <h2 className="text-[34px] md:text-[42px] font-black text-foreground tracking-[-0.03em]">Experience Interactive High Quality Live Classes</h2>
          <p className="text-[13.5px] text-foreground-muted mt-4 max-w-2xl mx-auto leading-relaxed">Join our interactive live sessions for real-time learning, collaboration, and immediate instructor feedback today.</p>
        </div>

        <div className="relative rounded-[20px] overflow-hidden group shadow-2xl aspect-[21/9] min-h-[400px]">
           {/* Background Image with Zoom Call Effect */}
           <img 
            src="/zoom-background.webp" 
            alt="Learning Community" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
           />
           
           {/* Dark Blue Overlay */}
           <div className="absolute inset-0 bg-[#080635]/85 flex flex-col items-center justify-center text-center p-8">
              {/* Play Button */}
              <div className="mb-8">
                <button className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 transition-transform duration-300 relative group/play">
                   <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current ml-1">
                      <path d="M5 3L19 12L5 21V3Z" />
                   </svg>
                </button>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-true-white mb-4 tracking-tight leading-tight">
                Start Your Learning Journey Today!
              </h3>
              <p className="text-true-white/80 text-[14px] sm:text-[16px] max-w-2xl mb-10 font-medium">
                Join Sri Lanka's #1 online learning family & start earning from your new skills.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <button className="px-8 py-3.5 bg-primary text-true-white dark:text-secondary font-black rounded-md flex items-center gap-2 hover:bg-primary/90 transition-all text-[15px] uppercase tracking-wide group/btn">
                  Join Now
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </button>
                <button className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-true-white font-black rounded-md flex items-center gap-2 hover:bg-white/20 transition-all text-[15px] uppercase tracking-wide group/btn">
                  Videos
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </button>
              </div>

              {/* Footer text */}
              <div className="text-true-white/60 text-[13px] font-medium tracking-wide">
                Result-Driven Learning Guaranteed
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

export function RewardPoints() {
  return (
    <section className="py-24 bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Side - Content */}
          <div className="lg:w-1/2">
             <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-6 uppercase tracking-wider">
                Reward Points
             </div>
             <h2 className="text-[34px] md:text-[42px] font-black text-foreground mb-6 leading-tight tracking-[-0.03em]">
                Earn Reward Points For Every Learning Activity
             </h2>
             <p className="text-[13.5px] text-foreground-muted mb-8 leading-relaxed">
                Stay motivated and get rewarded as you learn. Earn points for quizzes, assignments, course completions, and engagement, then redeem them for exclusive content.
             </p>
             
             <button className="px-8 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all mb-12">
                <IcoRewardPoints className="w-5 h-5" size={20} />
                Explore Rewards
             </button>
             
              <div className="flex gap-12">
                 <div className="relative">
                    <div className="text-[32px] font-black text-primary mb-1 tracking-tighter">300K+</div>
                    <div className="text-[12.5px] font-medium text-foreground">Points Collected</div>
                    <div className="text-[10px] text-foreground-muted mt-1 uppercase tracking-widest font-medium">By platform users</div>
                 </div>
                 <div className="relative pl-12 border-l border-border/50">
                    <div className="text-[32px] font-black text-primary mb-1 tracking-tighter">180+</div>
                    <div className="text-[12.5px] font-medium text-foreground">Rewards Available</div>
                    <div className="text-[10px] text-foreground-muted mt-1 uppercase tracking-widest font-medium">To get them for free</div>
                 </div>
              </div>
          </div>

          {/* Right Side - Image/Illustration */}
          <div className="lg:w-1/2 relative">
             <div className="bg-primary/5 rounded-full absolute inset-0 scale-125 blur-3xl"></div>
             <div className="relative z-10">
                <img src="https://images.unsplash.com/photo-1563013544-824ae1df9015?q=80&w=800" alt="Rewards" className="w-full h-auto rounded-md shadow-2xl" />
                
                {/* Floating Icons */}
                <div className="absolute -top-10 -right-10 bg-background/95 border border-border p-5 rounded-md shadow-2xl animate-float">
                   <IcoRewardPoints className="w-12 h-12 text-yellow-500" size={48} />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-background/95 border border-border p-5 rounded-md shadow-2xl animate-float-delayed">
                   <div className="flex flex-col items-center">
                      <Wallet className="w-12 h-12 text-green-500 mb-2" />
                      <div className="text-lg font-black text-green-500">+ $500</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
