"use client";

import { Clock, Star } from "lucide-react";

const TRENDING_COURSES = [
  {
    title: "Backend Development with Node.js",
    instructor: "Kate Williams",
    letter: "T",
    price: "$25",
    oldPrice: "$35",
    rating: 4.8,
    duration: "2:30 Hours",
    lessons: 12,
    color: "text-orange-500",
  },
  {
    title: "Mobile App Development with React Native",
    instructor: "Robert Rumsfeld",
    letter: "N",
    price: "$30",
    oldPrice: "$50",
    rating: 4.9,
    duration: "3:30 Hours",
    lessons: 18,
    color: "text-blue-500",
  },
  {
    title: "Python for Data Science",
    instructor: "Linda Anderson",
    letter: "P",
    price: "$20",
    oldPrice: "$35",
    rating: 4.7,
    duration: "2:10 Hours",
    lessons: 15,
    color: "text-green-500",
  },
  {
    title: "Full Stack JavaScript Development",
    instructor: "James Kong",
    letter: "F",
    price: "$40",
    oldPrice: "$60",
    rating: 5,
    duration: "5:40 Hours",
    lessons: 24,
    color: "text-purple-500",
  },
];

export default function TrendingCourses() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-secondary rounded-full text-primary text-[11.5px] font-medium mb-4 uppercase tracking-wider">
               Featured
            </div>
            <h2 className="text-[34px] font-black text-foreground tracking-[-0.03em]">Trending Courses</h2>
            <p className="text-[13.5px] text-foreground-muted mt-2 leading-relaxed">Discover what other students are learning today.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-[12.5px] font-medium text-foreground-muted">
             <button className="hover:text-primary transition-colors">Web Development</button>
             <button className="hover:text-primary transition-colors">Design</button>
             <button className="hover:text-primary transition-colors">Communications</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRENDING_COURSES.map((course, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-md p-6 transition-all hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden">
               {/* Background Letter */}
               <div className={`absolute -top-4 -right-2 text-[120px] font-black opacity-[0.03] ${course.color} select-none pointer-events-none group-hover:opacity-10 transition-opacity`}>
                  {course.letter}
               </div>

               <div className="relative z-10">
                  <h3 className="text-[16px] font-medium text-foreground mb-6 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors leading-snug">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-2.5 mb-6">
                     <img src={`https://i.pravatar.cc/150?u=${index + 20}`} alt="" className="w-8 h-8 rounded-full border border-border/50" />
                     <span className="text-[12.5px] font-medium text-foreground">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                     <div>
                        <div className="flex items-center gap-1 mb-1">
                           <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                           <span className="text-[12.5px] font-medium text-foreground">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-foreground-muted">
                           <Clock className="w-3.5 h-3.5" />
                           <span>{course.duration}</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-[18px] font-black text-primary">{course.price}</div>
                        <div className="text-[11px] text-foreground-muted line-through">{course.oldPrice}</div>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
