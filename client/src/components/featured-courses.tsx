'use client'

import { motion } from 'framer-motion'
import { CourseCard } from '@/components/course-card'

const courses = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    category: 'Computer Science',
    image: '/courses/cs101.jpg',
    discount: 0,
    rating: 4.8,
    reviews: 142,
    instructor: { name: 'Dr. Sarah Johnson', avatar: '' },
    duration: '14 weeks',
  },
  {
    id: '2',
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    image: '/courses/dsa.jpg',
    discount: 0,
    rating: 4.7,
    reviews: 98,
    instructor: { name: 'Prof. Michael Chen', avatar: '' },
    duration: '12 weeks',
  },
  {
    id: '3',
    title: 'Calculus I: Functions and Limits',
    category: 'Mathematics',
    image: '/courses/calc1.jpg',
    discount: 0,
    rating: 4.9,
    reviews: 156,
    instructor: { name: 'Prof. James Wilson', avatar: '' },
    duration: '16 weeks',
  },
  {
    id: '4',
    title: 'Business Strategy & Management',
    category: 'Business Administration',
    image: '/courses/strategy.jpg',
    discount: 0,
    rating: 4.6,
    reviews: 87,
    instructor: { name: 'Dr. Emily Rodriguez', avatar: '' },
    duration: '12 weeks',
  },
]

export function FeaturedCourses() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Featured Courses</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Current Semester Offerings</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enroll in our most popular university courses taught by experienced faculty members.
          </p>
        </motion.div>

        {/* Courses grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <CourseCard key={course.id} {...course} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Over <span className="font-bold text-primary">$240K</span> saved with exclusive course discounts
          </p>
        </motion.div>
      </div>
    </section>
  )
}
