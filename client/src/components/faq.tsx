'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'How do I get started with SPM LMS?',
    answer: 'Getting started is easy! Simply create an account, browse our course catalog, and enroll in the courses that interest you. You can start learning immediately with lifetime access to course materials.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and various digital payment methods. All transactions are secure and encrypted for your protection.',
  },
  {
    question: 'Can I get a refund if I&apos;m not satisfied?',
    answer: 'Yes, we offer a 30-day money-back guarantee if you&apos;re not completely satisfied with your course. No questions asked!',
  },
  {
    question: 'Do you provide certificates?',
    answer: 'Absolutely! Upon successful completion of any course, you&apos;ll receive a verified certificate that you can download and share on LinkedIn or your resume.',
  },
  {
    question: 'Is there lifetime access to courses?',
    answer: 'Yes, once you enroll in a course, you have lifetime access to all the materials, including any future updates or new content added by the instructor.',
  },
  {
    question: 'How can I get support if I have questions?',
    answer: 'Our dedicated support team is available 24/7 through email, chat, and phone. You can also access our community forums where fellow students and instructors help each other.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about SPM LMS and how we can help you succeed.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-r from-white to-blue-50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-100/50 transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-foreground pr-8">
                  {faq.question}
                </h3>
                <motion.svg
                  className="h-6 w-6 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <p className="p-6 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 p-8 text-center text-white shadow-xl hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-6 text-blue-100">Our support team is ready to help you anytime.</p>
          <motion.button
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
