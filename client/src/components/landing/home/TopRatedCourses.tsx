"use client";

import { ArrowRight, Award } from "lucide-react";
import Link from "next/link";
import CourseCard from "./CourseCard";

const TOP_RATED_COURSES = [
  {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600",
    category: "Development",
    title: "Learn Python Programming",
    rating: 5,
    reviews: 12,
    instructor: { name: "Robert Rumsfeld", avatar: "https://i.pravatar.cc/150?u=4" },
    price: "Free",
    lessons: 2,
    duration: "2:30 Hours",
  },
  {
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600",
    category: "Management",
    title: "Effective Time Management",
    rating: 4.8,
    reviews: 24,
    instructor: { name: "John Does", avatar: "https://i.pravatar.cc/150?u=5" },
    price: "$30",
    lessons: 8,
    duration: "1:20 Hours",
  },
  {
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600",
    category: "Health & Fitness",
    title: "Health And Fitness Masterclass",
    rating: 4.9,
    reviews: 32,
    instructor: { name: "Jacee Wiley", avatar: "https://i.pravatar.cc/150?u=6" },
    price: "$19",
    oldPrice: "$29",
    lessons: 12,
    duration: "11:59 Hours",
    badge: "25% OFF",
  },
];

export default function TopRatedCourses() {
  return (
    <section className="py-24 bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12">
          {/* Right: Info Block */}
          <div className="lg:w-1/4">
            <div className="bg-card border border-border rounded-md p-10 h-full flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center mb-8">
                     <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-medium text-foreground mb-6 leading-tight">
                    Top Rated by Our Students
                  </h2>
                  <p className="text-foreground-muted mb-8 leading-relaxed">
                    Check out our most highly rated courses, trusted by learners for quality content, expert instructors, and a wide range of topics.
                  </p>
               </div>
               <Link
                href="/courses"
                className="relative z-10 inline-flex items-center gap-2 text-primary font-medium hover:underline group/btn"
              >
                View More
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Left: Course Cards */}
          <div className="lg:w-3/4">
            <div className="grid md:grid-cols-3 gap-8">
              {TOP_RATED_COURSES.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
