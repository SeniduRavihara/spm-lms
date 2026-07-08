'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-5 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold">SPM LMS</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Empowering learners worldwide with expert-led courses and professional development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Courses</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Pricing</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Certificate</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Careers</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Press</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Partners</Link></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Documentation</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Community</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Status</Link></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Privacy</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Terms</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Security</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Cookies</Link></li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-400">
            © 2024 SPM LMS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.1 5.5-5.5 8.5c.5 0 1 0 1.5 0C20 15 24 12 24 8.5c0-.119 0-.237-.025-.36A7.431 7.431 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
