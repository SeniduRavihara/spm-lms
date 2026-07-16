'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Lesson {
  id: string;
  title: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [newLesson, setNewLesson] = useState('');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadCourseDetails() {
      try {
        const c = await api.courses.get(id as string);
        setCourse(c);
      } catch (err) {
        console.error('Error loading course details:', err);
      } finally {
        setLoadingData(false);
      }
    }
    if (id && !loading && user && user.role === 'teacher') {
      loadCourseDetails();
    }
  }, [id, loading, user]);

  async function handleAddLesson(e: FormEvent) {
    e.preventDefault();
    if (!newLesson.trim()) return;

    try {
      const lesson = await api.lessons.create(id as string, newLesson);
      setCourse((prev) =>
        prev ? { ...prev, lessons: [...prev.lessons, lesson] } : prev
      );
      setNewLesson('');
    } catch (err) {
      console.error('Failed to add lesson:', err);
    }
  }

  async function handleDeleteLesson(lessonId: string) {
    if (!confirm('Are you sure you want to delete this lesson? This cannot be undone.')) return;
    try {
      await api.lessons.delete(lessonId);
      setCourse((prev) =>
        prev ? { ...prev, lessons: prev.lessons.filter((l) => l.id !== lessonId) } : prev
      );
    } catch (err) {
      console.error('Failed to delete lesson:', err);
    }
  }

  if (loading || !user) return null;

  if (loadingData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading course data...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold mb-4">Course not found.</p>
        <Link href="/teacher" className="text-blue-600 hover:underline">
          &larr; Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-8"
    >
      {/* Return link */}
      <Link href="/teacher" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 group transition">
        <span className="mr-1 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to dashboard
      </Link>

      {/* Course Detail Card */}
      <div className="rounded-2xl border border-border bg-linear-to-br from-card to-card/50 p-8 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
            Syllabus Manager
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground mb-3">{course.title}</h1>
        <p className="text-foreground-muted text-lg leading-relaxed">{course.description || 'No description provided.'}</p>
      </div>

      {/* Adding Lesson Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-md mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <span>📝</span> Add New Syllabus Lesson
        </h2>
        <form onSubmit={handleAddLesson} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g. Lesson 1: Introduction to Next.js routing"
            required
            value={newLesson}
            onChange={(e) => setNewLesson(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm bg-background text-foreground"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm"
          >
            Add Lesson
          </Button>
        </form>
      </div>

      {/* Syllabus Lessons Checklist */}
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="text-lg">📚</span> Syllabus Lessons ({course.lessons.length})
      </h2>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {course.lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25 }}
              whileHover={{ scale: 1.01, y: -1 }}
              className="flex items-center justify-between p-4 border border-border bg-card rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  {idx + 1}
                </span>
                <span className="font-semibold text-foreground">{lesson.title}</span>
              </div>
              <Button
                onClick={() => handleDeleteLesson(lesson.id)}
                variant="destructive"
                size="sm"
                className="bg-red-50 text-red-600 hover:bg-red-100 border border-transparent font-medium py-1 px-3 rounded-lg"
              >
                Remove
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>

        {course.lessons.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-foreground-muted bg-card">
            There are no lessons published for this syllabus yet. Use the tool above to add lessons.
          </div>
        )}
      </div>
    </motion.div>
  );
}
