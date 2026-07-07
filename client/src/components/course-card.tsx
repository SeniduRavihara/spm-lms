'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CourseCardProps {
  id: string
  title: string
  category: string
  image: string
  discount?: number
  rating: number
  reviews: number
  instructor: {
    name: string
    avatar: string
  }
  duration: string
  index?: number
}

const gradients = [
  'from-blue-400 to-purple-600',
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-pink-600',
  'from-orange-400 to-red-600',
]

export function CourseCard({
  title,
  category,
  image,
  discount,
  rating,
  reviews,
  instructor,
  duration,
  index = 0,
}: CourseCardProps) {
  const gradient = gradients[index % gradients.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200 hover:scale-105 hover:-translate-y-2"
      whileHover={{ y: -8 }}
    >
      {/* Image container */}
      <div className="relative h-48 overflow-hidden bg-gray-200 overflow-hidden">
        <motion.div 
          className={`h-full w-full bg-gradient-to-br ${gradient}`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {discount && (
          <motion.div
            className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {discount}% OFF
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">{category}</p>
        <h3 className="mt-2 text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
            {rating % 1 !== 0 && <span className="text-yellow-400 text-sm">☆</span>}
          </div>
          <span className="text-sm font-semibold text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Instructor</p>
            <p className="text-xs text-muted-foreground truncate">{instructor.name}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
