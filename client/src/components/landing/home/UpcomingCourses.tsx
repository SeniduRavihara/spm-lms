"use client";

import { Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const UPCOMING_COURSES = [
  {
    title: "Learn Advanced Programming",
    instructor: "Kate Williams",
    category: "Development",
    price: "$50",
    duration: "18:30 Hours",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400",
  },
  {
    title: "Web Design for Beginners",
    instructor: "Linda Anderson",
    category: "Design",
    price: "$10",
    duration: "5:30 Hours",
    image: "https://images.unsplash.com/photo-1541462608141-ad4d76942185?q=80&w=400",
  },
  {
    title: "Digital Photography",
    instructor: "Ricardo Daw",
    category: "Design",
    price: "$50",
    duration: "14:00 Hours",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400",
  },
  {
    title: "Python for Beginners",
    instructor: "Robert Rumsfeld",
    category: "Development",
    price: "$30",
    duration: "1:20 Hours",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400",
  },
];

export default function UpcomingCourses() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4 uppercase">
             Featured
          </div>
          <h2 className="text-4xl font-medium text-foreground">Explore Upcoming Courses</h2>
          <p className="text-foreground-muted mt-4">Stay ahead with fresh courses launching soon, designed to expand your skills and knowledge further.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {UPCOMING_COURSES.map((course, index) => (
            <div key={index} className="group relative aspect-[3/4] rounded-md overflow-hidden cursor-pointer">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="text-xs font-medium text-primary uppercase mb-2">{course.category}</div>
                <h3 className="text-xl font-medium text-white mb-4 line-clamp-2">{course.title}</h3>
                
                <div className="flex items-center gap-4 text-white/70 text-sm mb-6">
                   <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                         <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      </div>
                      <span>{course.instructor}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                   <div className="text-2xl font-medium text-white">{course.price}</div>
                   <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                   </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ArrowRight className="w-6 h-6" />
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
           <button className="px-10 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all inline-flex items-center gap-2">
              View More
           </button>
        </div>
      </div>
    </section>
  );
}
