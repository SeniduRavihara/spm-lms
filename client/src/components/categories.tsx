'use client'

import { motion } from 'framer-motion'

const categories = [
  {
    id: '1',
    name: 'Engineering',
    count: 12,
    icon: '⚙️',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Computer Science',
    count: 15,
    icon: '💻',
    color: 'bg-cyan-500',
  },
  {
    id: '3',
    name: 'Business Administration',
    count: 8,
    icon: '💼',
    color: 'bg-amber-500',
  },
  {
    id: '4',
    name: 'Health Sciences',
    count: 10,
    icon: '🏥',
    color: 'bg-green-500',
  },
  {
    id: '5',
    name: 'Natural Sciences',
    count: 9,
    icon: '🧪',
    color: 'bg-purple-500',
  },
  {
    id: '6',
    name: 'Liberal Arts',
    count: 14,
    icon: '📖',
    color: 'bg-pink-500',
  },
  {
    id: '7',
    name: 'Fine Arts',
    count: 7,
    icon: '🎨',
    color: 'bg-red-500',
  },
  {
    id: '8',
    name: 'Education',
    count: 6,
    icon: '🎓',
    color: 'bg-indigo-500',
  },
]

export function Categories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">DEPARTMENTS</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">University Departments</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse courses offered by different departments across campus.
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <motion.div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${category.color} text-2xl group-hover:scale-110 transition`}
                whileHover={{ scale: 1.1 }}
              >
                {category.icon}
              </motion.div>
              <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.count} {category.count === 1 ? 'Course' : 'Courses'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
