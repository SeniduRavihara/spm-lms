'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200 opacity-30 blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 -left-20 h-64 w-64 rounded-full bg-cyan-200 opacity-20 blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-block">
              <motion.div
                className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm font-semibold text-blue-700">Fall 2024 Semester Now Open!</span>
              </motion.div>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl">
              Your Digital <span className="text-primary">Learning</span> Hub
            </h1>

            <p className="mb-8 text-lg text-muted-foreground">
              Access your courses, submit assignments, connect with classmates, and track your academic progress. All your university learning tools in one unified platform.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white sm:w-auto">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Start Learning
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="w-full border-2 border-primary text-primary hover:bg-blue-50 sm:w-auto">
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn More
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="mt-12 flex items-center gap-8 border-t border-border pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Trusted by <span className="font-bold text-foreground">1.2M+ Students</span></p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Featured Faculty */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">Featured Faculty</div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="h-12 w-full bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg mb-3" />
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg mb-2">SJ</div>
                <h4 className="font-semibold text-sm text-foreground">Dr. Sarah Johnson</h4>
                <p className="text-xs text-primary font-medium">Computer Science</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">AI/ML</span>
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">Data</span>
                </div>
              </motion.div>

              <motion.div
                className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="h-12 w-full bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-lg mb-3" />
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center text-white font-bold text-lg mb-2">MC</div>
                <h4 className="font-semibold text-sm text-foreground">Prof. Michael Chen</h4>
                <p className="text-xs text-primary font-medium">Engineering</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-block px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded">Systems</span>
                  <span className="inline-block px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded">DevOps</span>
                </div>
              </motion.div>

              <motion.div
                className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="h-12 w-full bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg mb-3" />
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold text-lg mb-2">ER</div>
                <h4 className="font-semibold text-sm text-foreground">Dr. Emily Rodriguez</h4>
                <p className="text-xs text-primary font-medium">Business</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-block px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">Strategy</span>
                  <span className="inline-block px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">Finance</span>
                </div>
              </motion.div>

              <motion.div
                className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="h-12 w-full bg-gradient-to-r from-pink-100 to-pink-50 rounded-lg mb-3" />
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-600 to-pink-400 flex items-center justify-center text-white font-bold text-lg mb-2">JW</div>
                <h4 className="font-semibold text-sm text-foreground">Prof. James Wilson</h4>
                <p className="text-xs text-primary font-medium">Mathematics</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-block px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded">Calculus</span>
                  <span className="inline-block px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded">Stats</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
