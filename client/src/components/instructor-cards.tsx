'use client'

import { motion } from 'framer-motion'

interface InstructorCardProps {
  name: string
  title: string
  department: string
  expertise: string[]
  initials: string
  color: string
  bgGradient: string
  index: number
}

function InstructorCard({
  name,
  title,
  department,
  expertise,
  initials,
  color,
  bgGradient,
  index,
}: InstructorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg transition-all duration-300 hover:border-gray-300 w-full max-w-sm"
    >
      {/* Header with gradient */}
      <div className={`h-24 bg-gradient-to-r ${bgGradient}`} />

      {/* Content */}
      <div className="px-6 pb-6 pt-2">
        {/* Avatar */}
        <motion.div
          className={`-mt-16 mb-4 h-24 w-24 rounded-xl ${color} flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white`}
          whileHover={{ scale: 1.05 }}
        >
          {initials}
        </motion.div>

        {/* Information */}
        <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
        <p className="text-sm font-semibold text-primary mb-2">{title}</p>
        <p className="text-xs text-muted-foreground mb-4 font-medium">{department}</p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {expertise.map((exp) => (
            <motion.span
              key={exp}
              whileHover={{ scale: 1.05 }}
              className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200"
            >
              {exp}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function InstructorCardsSection() {
  const instructors: InstructorCardProps[] = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Professor of Computer Science',
      department: 'Department of Computing',
      expertise: ['AI/ML', 'Data Science', 'Web Dev'],
      initials: 'SJ',
      color: 'bg-gradient-to-br from-blue-600 to-blue-400',
      bgGradient: 'from-blue-100 to-blue-50',
      index: 0,
    },
    {
      name: 'Prof. Michael Chen',
      title: 'Associate Professor of Engineering',
      department: 'Department of Engineering',
      expertise: ['Systems', 'Architecture', 'DevOps'],
      initials: 'MC',
      color: 'bg-gradient-to-br from-cyan-600 to-cyan-400',
      bgGradient: 'from-cyan-100 to-cyan-50',
      index: 1,
    },
    {
      name: 'Dr. Emily Rodriguez',
      title: 'Senior Lecturer in Business',
      department: 'Department of Business Administration',
      expertise: ['Strategy', 'Finance', 'Analytics'],
      initials: 'ER',
      color: 'bg-gradient-to-br from-purple-600 to-purple-400',
      bgGradient: 'from-purple-100 to-purple-50',
      index: 2,
    },
    {
      name: 'Prof. James Wilson',
      title: 'Assistant Professor of Mathematics',
      department: 'Department of Mathematics',
      expertise: ['Calculus', 'Statistics', 'Algorithms'],
      initials: 'JW',
      color: 'bg-gradient-to-br from-pink-600 to-pink-400',
      bgGradient: 'from-pink-100 to-pink-50',
      index: 3,
    },
  ]

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Meet Our Faculty
      </h2>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Learn from experienced professors and industry experts who are dedicated to your academic success
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.name} {...instructor} />
        ))}
      </div>
    </div>
  )
}
