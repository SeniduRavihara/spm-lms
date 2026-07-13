"use client";

import { Box, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const BUNDLES = [
  {
    title: "Become a Probability & Statistics Master",
    instructor: "Kate Williams",
    courses: 8,
    price: "$11",
    bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1509228468518-180dd48632a2?q=80&w=300",
  },
  {
    title: "A-Z Web Programming",
    instructor: "Linda Anderson",
    courses: 5,
    price: "$13",
    bg: "bg-gradient-to-br from-orange-400 to-rose-500",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=300",
  },
  {
    title: "Solar Energy Design Course from Zero to Hero",
    instructor: "Jacee Wiley",
    courses: 11,
    price: "$11",
    bg: "bg-gradient-to-br from-emerald-400 to-teal-600",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=300",
  },
];

export default function BundlesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Info */}
          <div className="lg:w-1/3">
             <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6 uppercase">
                Bundles
             </div>
             <h2 className="text-4xl font-medium text-foreground mb-6 leading-tight">
                Course Bundles For Maximum Savings
             </h2>
             <p className="text-foreground-muted mb-10 leading-relaxed">
                Unlock more value with our course bundles, combining top-rated courses at unbeatable prices. Expand your skills with each bundle, making learning both efficient and affordable for your budget.
             </p>
             
             <div className="flex items-center gap-8 mb-10">
                <div>
                   <div className="text-3xl font-medium text-foreground">2K+</div>
                   <div className="text-sm text-foreground-muted">Instructors Choice Our Bundles</div>
                </div>
             </div>

             <button className="px-8 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all">
                <Box className="w-5 h-5" />
                Explore Bundles
             </button>

             <div className="mt-12 opacity-50">
                <div className="w-32 h-32 relative">
                   {/* Illustrative Book Stack Placeholder */}
                   <div className="absolute bottom-0 left-0 w-full h-4 bg-primary rounded-md rotate-2 translate-y-1"></div>
                   <div className="absolute bottom-4 left-2 w-full h-4 bg-orange-500 rounded-md -rotate-1 translate-y-1"></div>
                   <div className="absolute bottom-8 left-1 w-full h-4 bg-purple-500 rounded-md rotate-1 translate-y-1"></div>
                </div>
             </div>
          </div>

          {/* Right: Bundles List */}
          <div className="lg:w-2/3 space-y-6">
             {BUNDLES.map((bundle, index) => (
                <div key={index} className={`${bundle.bg} rounded-md p-8 flex items-center justify-between text-white group cursor-pointer hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                   <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                   
                   <div className="flex items-center gap-8 relative z-10">
                      <div className="w-24 h-24 rounded-md overflow-hidden hidden sm:block">
                         <img src={bundle.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h3 className="text-xl font-medium mb-2 group-hover:underline">{bundle.title}</h3>
                         <div className="flex items-center gap-4 text-white/80 text-sm">
                            <span className="flex items-center gap-1.5 font-medium">
                               <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                  <div className="w-3 h-3 rounded-full bg-white"></div>
                               </div>
                               {bundle.instructor}
                            </span>
                            <span className="flex items-center gap-1.5">
                               <BookOpen className="w-4 h-4" />
                               {bundle.courses} Courses
                            </span>
                         </div>
                      </div>
                   </div>

                   <div className="text-right relative z-10">
                      <div className="text-3xl font-black mb-1">{bundle.price}</div>
                      <div className="text-xs font-medium uppercase tracking-wider opacity-80">Bundle Price</div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
