'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Alex Martinez',
    role: 'Senior Year Computer Science',
    initials: 'AM',
    bgColor: 'from-blue-500 to-blue-400',
    content: 'This LMS made organizing my coursework effortless. The assignment submission system is intuitive and the grade tracking keeps me motivated throughout the semester.',
  },
  {
    name: 'Jordan Williams',
    role: 'Second Year Engineering',
    initials: 'JW',
    bgColor: 'from-cyan-500 to-cyan-400',
    content: 'The collaboration tools have helped me connect with study groups and professors easily. The course materials are well-organized and always accessible.',
  },
  {
    name: 'Casey Patel',
    role: 'Junior Business Administration',
    initials: 'CP',
    bgColor: 'from-purple-500 to-purple-400',
    content: 'Excellent platform for managing my academic journey. The progress tracking and grade analytics give me clear insights into my performance and areas for improvement.',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-green-50/30 to-cyan-50/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Student Feedback</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Student Success Stories</h2>
          <p className="text-lg text-muted-foreground">
            Hear from students about their university learning experience
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="rounded-xl border border-green-200 bg-gradient-to-br from-white to-green-50 p-8 shadow-lg hover:shadow-2xl hover:shadow-green-200 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${testimonial.bgColor} text-white font-bold text-sm`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
