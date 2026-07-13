"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CourseCard from "./CourseCard";

const BESTSELLER_COURSES = [
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
    category: "Development",
    title: "New-In LMS System",
    rating: 5,
    reviews: 12,
    instructor: { name: "Robert Rumsfeld", avatar: "https://i.pravatar.cc/150?u=1" },
    price: "Free",
    lessons: 2,
    duration: "2:30 Hours",
    badge: "New",
  },
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600",
    category: "Development",
    title: "Learn Linux in 5 Days",
    rating: 4.5,
    reviews: 8,
    instructor: { name: "John Does", avatar: "https://i.pravatar.cc/150?u=2" },
    price: "Free",
    lessons: 12,
    duration: "1:30 Hours",
  },
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600",
    category: "Development",
    title: "New Landing Page",
    rating: 4,
    reviews: 2,
    instructor: { name: "Robert Rumsfeld", avatar: "https://i.pravatar.cc/150?u=3" },
    price: "Free",
    lessons: 1,
    duration: "1:10 Hours",
  },
];

export default function BestsellerCourses() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Info Block */}
          <div className="lg:w-1/4">
            <div className="bg-primary rounded-md p-10 h-full flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
               <div className="relative z-10">
                  <h2 className="text-3xl font-medium text-white mb-6 leading-tight">
                    Bestsellers Chosen by Our Students
                  </h2>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    Explore our top-selling courses, chosen by thousands of learners who've and professional and industrial success with our platform.
                  </p>
               </div>
               <Link
                href="/courses"
                className="relative z-10 inline-flex items-center gap-2 text-white font-medium hover:underline group/btn"
              >
                View More
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Course Cards */}
          <div className="lg:w-3/4">
            <div className="grid md:grid-cols-3 gap-8">
              {BESTSELLER_COURSES.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
