"use client";

import { Percent } from "lucide-react";
import CourseCard from "./CourseCard";

const DISCOUNTED_COURSES = [
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400",
    category: "Development",
    title: "Excel from Beginner to Advanced",
    rating: 4.8,
    reviews: 12,
    instructor: { name: "Robert Rumsfeld", avatar: "https://i.pravatar.cc/150?u=7" },
    price: "$30",
    oldPrice: "$120",
    lessons: 24,
    duration: "14:30 Hours",
    badge: "90% OFF",
  },
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400",
    category: "Development",
    title: "Learn and Understand Angular.js",
    rating: 4.5,
    reviews: 8,
    instructor: { name: "James Kong", avatar: "https://i.pravatar.cc/150?u=8" },
    price: "$10",
    oldPrice: "$40",
    lessons: 12,
    duration: "4:30 Hours",
    badge: "75% OFF",
  },
  {
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400",
    category: "Health & Fitness",
    title: "Health And Fitness Masterclass",
    rating: 4.9,
    reviews: 32,
    instructor: { name: "Jacee Wiley", avatar: "https://i.pravatar.cc/150?u=9" },
    price: "$19",
    oldPrice: "$29",
    lessons: 12,
    duration: "11:59 Hours",
    badge: "25% OFF",
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400",
    category: "Development",
    title: "The Future of Energy",
    rating: 4.7,
    reviews: 15,
    instructor: { name: "Kate Williams", avatar: "https://i.pravatar.cc/150?u=10" },
    price: "$18",
    oldPrice: "$40",
    lessons: 8,
    duration: "1:30 Hours",
    badge: "15% OFF",
  },
];

export default function DiscountedCourses() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Percentage Icon Background decoration */}
      <div className="absolute top-20 right-20 opacity-10 animate-pulse pointer-events-none">
         <Percent className="w-64 h-64 text-red-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-sm font-medium mb-4 uppercase">
             Sales
          </div>
          <h2 className="text-4xl font-medium text-foreground">Discounted Courses</h2>
          <p className="text-foreground-muted mt-4">Save more now with our courses at discounts.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {DISCOUNTED_COURSES.map((course, index) => (
             <CourseCard key={index} {...course} />
           ))}
        </div>

        <div className="text-center mt-12 font-medium text-foreground">
           Over <span className="text-primary">$240K Saved</span> With Exclusive Course Discounts
        </div>
      </div>
    </section>
  );
}
