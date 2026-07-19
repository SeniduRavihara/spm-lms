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
  videoUrl?: string;
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
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
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
        if (c && c.lessons && c.lessons.length > 0) {
          setActiveLesson(c.lessons[0]);
        }
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
            className="h-full bg-linear-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* active lesson view and playlist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Active Lesson player */}
        <div className="md:col-span-2 space-y-6">
          {activeLesson ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
              <h2 className="text-2xl font-extrabold text-foreground mb-4">{activeLesson.title}</h2>
              
              {/* Video Player */}
              <div className="relative pt-[56.25%] w-full rounded-xl overflow-hidden bg-black shadow-lg mb-6 border border-border">
                {activeLesson.videoUrl && activeLesson.videoUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeLesson.videoUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2]}`}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={activeLesson.title}
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-foreground-muted bg-linear-to-br from-slate-900 to-slate-950 p-6 text-center">
                    <span className="text-4xl mb-2">🎥</span>
                    <p className="font-semibold text-white">No video attached to this lesson.</p>
                    <p className="text-xs text-foreground-muted/60 max-w-70 mt-1">Enjoy reading through your syllabus notes and materials.</p>
                  </div>
                )}
              </div>

              {/* Mark Complete Button */}
              <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-border">
                <span className="text-sm font-semibold text-foreground-muted">
                  Status: {completed.has(activeLesson.id) ? 'Completed' : 'Pending'}
                </span>
                <button
                  onClick={() => handleToggle(activeLesson.id)}
                  className={`px-6 py-2 rounded-lg font-bold text-sm shadow-xs transition-all duration-200 ${
                    completed.has(activeLesson.id)
                      ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                  }`}
                >
                  {completed.has(activeLesson.id) ? '✓ Completed' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-foreground-muted bg-card">
              Select a lesson from the syllabus to start learning.
            </div>
          )}
        </div>

        {/* Right: Playlist */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span>📚</span> Syllabus Lessons
          </h3>
          
          <div className="space-y-2">
            {course.lessons.map((lesson, idx) => {
              const isCompleted = completed.has(lesson.id);
              const isActive = activeLesson?.id === lesson.id;
              return (
                <motion.div
                  key={lesson.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setActiveLesson(lesson)}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer select-none transition-all duration-200 ${
                    isActive
                      ? 'border-blue-500 bg-blue-500/5'
                      : isCompleted
                      ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/40'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(lesson.id);
                      }}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-border bg-background hover:border-primary'
                      }`}
                    >
                      {isCompleted && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-semibold text-sm truncate text-foreground transition ${isCompleted ? 'line-through text-foreground-muted/60' : ''}`}>
                      {lesson.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {totalLessons === 0 && (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-foreground-muted bg-card">
                There are no lessons uploaded for this course yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
