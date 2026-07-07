'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    icon: '📖',
    value: '450+',
    label: 'Active Students',
    color: 'bg-blue-400',
    shadowColor: 'shadow-blue-300',
  },
  {
    icon: '👨‍🏫',
    value: '85',
    label: 'Faculty Members',
    color: 'bg-green-400',
    shadowColor: 'shadow-green-300',
  },
  {
    icon: '📚',
    value: '127',
    label: 'Course Offerings',
    color: 'bg-red-400',
    shadowColor: 'shadow-red-300',
  },
  {
    icon: '🎯',
    value: '92%',
    label: 'Course Completion Rate',
    color: 'bg-amber-400',
    shadowColor: 'shadow-amber-300',
  },
]

export function StatsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ${stat.color} shadow-xl ${stat.shadowColor} transition-all duration-300`}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <span className="text-2xl">{stat.icon}</span>
              </motion.div>
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-blue-100">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
