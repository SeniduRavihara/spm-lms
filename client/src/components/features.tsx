'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '📚',
    title: 'Organized Course Content',
    description: 'Access all course materials, lecture notes, readings, and resources in one organized location. Never miss important documents.',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-500',
  },
  {
    icon: '✏️',
    title: 'Assignment & Submission Hub',
    description: 'Submit assignments digitally with automatic timestamping. Get graded submissions and feedback directly from professors.',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-500',
  },
  {
    icon: '💬',
    title: 'Class Discussion Boards',
    description: 'Participate in discussions, ask questions, and collaborate with classmates. Foster academic community and peer learning.',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-500',
  },
  {
    icon: '📊',
    title: 'Grade Tracking & Analytics',
    description: 'Monitor your academic progress with detailed grade reports, performance analytics, and semester GPA calculations.',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    iconBg: 'bg-pink-500',
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-orange-50/20 to-yellow-50/20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">FEATURES</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Master New Skills Using Advanced Learning Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access modern tools, interactive content, and expert resources to master new skills and stay competitive.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`rounded-xl border ${feature.borderColor} ${feature.bgColor} p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <motion.div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconBg} text-white text-2xl shadow-lg`}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits list */}
        <motion.div
          className="mt-16 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border border-blue-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose IDEACADE?</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Flexible Learning Schedule',
              'Affordable Course Prices',
              'Expert Instructor Access',
              'Self-Paced Progression',
            ].map((benefit, i) => (
              <motion.div
                key={benefit}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <svg className="h-6 w-6 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
