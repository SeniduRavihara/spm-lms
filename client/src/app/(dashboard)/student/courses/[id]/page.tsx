'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  courseId: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export default function StudentCoursePage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadCourseDetails() {
      try {
        const c = await api.courses.get(id as string);
        setCourse(c);
        const progressList = await api.progress.get(id as string);
        setCompleted(new Set(progressList.filter((p: any) => p.completed).map((p: any) => p.lessonId)));
      } catch (err) {
        console.error('Error loading course details:', err);
      } finally {
        setLoadingData(false);
      }
    }
    if (id && !loading && user && user.role === 'student') {
      loadCourseDetails();
    }
  }, [id, loading, user]);

  async function handleToggle(lessonId: string) {
    try {
      const updated = await api.progress.toggle(lessonId, id as string);
      setCompleted((prev) => {
        const next = new Set(prev);
        if (updated.completed) next.add(lessonId);
        else next.delete(lessonId);
        return next;
      });
    } catch (err) {
      console.error('Failed to toggle progress:', err);
    }
  }

  if (loading || !user) return null;

  if (loadingData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold mb-4">Course not found.</p>
        <Link href="/student" className="text-blue-600 hover:underline">
          &larr; Back to courses
        </Link>
      </div>
    );
  }

  const totalLessons = course.lessons.length;
  const completedLessons = completed.size;
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-8"
    >
      {/* Breadcrumbs */}
      <Link href="/student" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 group transition">
        <span className="mr-1 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to courses
      </Link>

      {/* Header Card */}
      <div className="rounded-2xl border border-border bg-linear-to-br from-card to-card/50 p-8 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
            Interactive Learning
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground mb-3">{course.title}</h1>
        <p className="text-foreground-muted text-lg leading-relaxed">{course.description || 'No description provided.'}</p>
      </div>

      {/* Progress Header Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-md mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-foreground">Course Syllabus Progress</span>
          <span className="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {completedLessons}/{totalLessons} Lessons ({progressPct}%)
          </span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden border border-border">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Syllabus Lessons Checklist */}
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="text-lg">📚</span> Course Lessons
      </h2>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {course.lessons.map((lesson, idx) => {
            const isCompleted = completed.has(lesson.id);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => handleToggle(lesson.id)}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer select-none transition-all duration-200 ${
                  isCompleted
                    ? 'border-success/30 bg-success/5 hover:border-success/50'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Custom Checkbox */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'border-success bg-success text-white'
                      : 'border-border bg-background group-hover:border-primary'
                  }`}>
                    {isCompleted && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-semibold text-foreground transition ${isCompleted ? 'line-through text-foreground-muted/60' : ''}`}>
                    {lesson.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isCompleted
                      ? 'bg-success/10 text-success'
                      : 'bg-muted text-foreground-muted'
                  }`}>
                    {isCompleted ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {totalLessons === 0 && (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-foreground-muted bg-card">
            There are no lessons uploaded for this course yet.
          </div>
        )}
      </div>
    </motion.div>
  );
}
