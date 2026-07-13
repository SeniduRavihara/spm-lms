"use client";

import CourseCard from "./CourseCard";
import Link from "next/link";

const FREE_COURSES = [
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400",
    category: "Business",
    title: "Become a Product Manager",
    rating: 4.8,
    reviews: 12,
    instructor: { name: "Ricardo Daw", avatar: "https://i.pravatar.cc/150?u=11" },
    price: "Free",
    lessons: 24,
    duration: "2:10 Hours",
    badge: "Free",
  },
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400",
    category: "Development",
    title: "Learn Linux in 5 Days",
    rating: 4.5,
    reviews: 8,
    instructor: { name: "Robert Rumsfeld", avatar: "https://i.pravatar.cc/150?u=12" },
    price: "Free",
    lessons: 12,
    duration: "1:30 Hours",
    badge: "Free",
  },
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400",
    category: "Development",
    title: "New Landing Page",
    rating: 4,
    reviews: 2,
    instructor: { name: "Robert Rumsfeld", avatar: "https://i.pravatar.cc/150?u=13" },
    price: "Free",
    lessons: 8,
    duration: "1:10 Hours",
    badge: "Free",
  },
  {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400",
    category: "Development",
    title: "Learn Python Programming",
    rating: 5,
    reviews: 12,
    instructor: { name: "Linda Anderson", avatar: "https://i.pravatar.cc/150?u=14" },
    price: "Free",
    lessons: 12,
    duration: "2:30 Hours",
    badge: "Free",
  },
];

export default function FreeCourses() {
  return (
    <section className="py-24 bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4 uppercase">
             Free
          </div>
          <h2 className="text-4xl font-medium text-foreground">Free Courses</h2>
          <p className="text-foreground-muted mt-4">Access top-quality free courses anytime, expand your skills, and learn without spending a single dollar.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
           {FREE_COURSES.map((course, index) => (
             <CourseCard key={index} {...course} />
           ))}
        </div>

        <div className="bg-primary rounded-md p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20">
           <div>
              <h3 className="text-2xl font-medium text-white mb-2">Need skills but budget constraints?</h3>
              <p className="text-white/80">Explore top-quality free courses and start advancing your skills even more affordably online today.</p>
           </div>
           <Link href="/courses" className="px-8 py-4 bg-white text-primary font-medium rounded-md flex items-center gap-2 hover:bg-white/90 transition-all whitespace-nowrap">
              Explore Free Courses
           </Link>
        </div>
      </div>
    </section>
  );
}
