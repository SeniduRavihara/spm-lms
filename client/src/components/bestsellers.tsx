'use client'

import { motion } from 'framer-motion'
import { CourseCard } from '@/components/course-card'
import { Button } from '@/components/ui/button'

const bestsellers = [
  {
    id: '5',
    title: 'New-In LMS System',
    category: 'Development',
    image: '/courses/lms.jpg',
    discount: 0,
    rating: 5,
    reviews: 12,
    instructor: { name: 'Robert Rumsfeld', avatar: '' },
    duration: '2:30 Hours',
  },
  {
    id: '6',
    title: 'Learn Linux in 5 Days',
    category: 'Development',
    image: '/courses/linux.jpg',
    discount: 0,
    rating: 4.5,
    reviews: 8,
    instructor: { name: 'John Doe', avatar: '' },
    duration: '1:30 Hours',
  },
  {
    id: '7',
    title: 'New Landing Page',
    category: 'Development',
    image: '/courses/landing.jpg',
    discount: 0,
    rating: 4,
    reviews: 2,
    instructor: { name: 'Robert Rumsfeld', avatar: '' },
    duration: '1:10 Hours',
  },
]

export function Bestsellers() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Promotional card */}
          <motion.div
            className="md:col-span-1 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 p-8 text-white flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div>
              <p className="text-sm font-semibold opacity-90">FEATURED</p>
              <h3 className="text-2xl font-bold mt-2">Bestsellers Chosen by Our Students</h3>
              <p className="mt-4 text-sm text-blue-100">
                Explore our top-selling courses, chosen by thousands of learners who&apos;ve had professional and industrial success with our platform.
              </p>
            </div>
            <motion.button
              className="mt-6 inline-flex items-center text-white hover:text-blue-100 transition"
              whileHover={{ x: 4 }}
            >
              <span className="font-semibold">View More</span>
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Course cards */}
          {bestsellers.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <CourseCard {...course} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
