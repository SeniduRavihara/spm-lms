'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  lessonCount: number;
}

interface ProgressRecord {
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
}

const colors = [
  'from-blue-500 to-indigo-600',
  'from-indigo-500 to-violet-600',
  'from-purple-500 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-orange-500 to-red-600',
];

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.role === 'student') {
      Promise.all([
        api.courses.list(),
        api.progress.getAll()
      ])
        .then(([coursesData, progressData]) => {
          setCourses(coursesData);
          setProgress(progressData);
        })
        .catch(err => console.error("Failed to load dashboard data:", err))
        .finally(() => setPageLoading(false));
    }
  }, [user]);

  if (loading || !user) return null;

  // Helper to calculate progress for a specific course
  const getCourseProgress = (courseId: string, lessonCount: number) => {
    const completedLessons = progress.filter(
      p => p.courseId === courseId && p.completed
    ).length;
    
    const percentage = lessonCount > 0 ? Math.round((completedLessons / lessonCount) * 100) : 0;
    return {
      completed: completedLessons,
      total: lessonCount,
      percentage
    };
  };

  // Process courses with progress information and layout color
  const coursesWithDetails = courses.map((course, idx) => {
    const prog = getCourseProgress(course.id, course.lessonCount);
    let status: 'completed' | 'in-progress' | 'not-started' = 'not-started';
    if (prog.percentage === 100 && prog.total > 0) {
      status = 'completed';
    } else if (prog.completed > 0) {
      status = 'in-progress';
    }
    return { 
      ...course, 
      progress: prog, 
      status,
      color: colors[idx % colors.length]
    };
  });

  // Calculate global stats
  const totalCourses = courses.length;
  const completedCoursesCount = coursesWithDetails.filter(c => c.status === 'completed').length;
  const inProgressCoursesCount = coursesWithDetails.filter(c => c.status === 'in-progress').length;
  const notStartedCoursesCount = coursesWithDetails.filter(c => c.status === 'not-started').length;

  const totalLessons = courses.reduce((sum, c) => sum + c.lessonCount, 0);
  const completedLessonsCount = progress.filter(p => p.completed).length;
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  // Filter courses based on search & selected tab
  const filteredCourses = coursesWithDetails.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'in-progress' && course.status === 'in-progress') ||
      (activeTab === 'completed' && course.status === 'completed') ||
      (activeTab === 'not-started' && course.status === 'not-started');
      
    return matchesSearch && matchesTab;
  });

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning';
    if (hr < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todayDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Welcome Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-tr from-[#0e2145] via-[#121f3e] to-[#0170ff]/20 p-6 md:p-8 rounded-2xl shadow-xl text-white border border-white/10"
      >
        <div className="absolute right-0 top-0 -mt-4 -mr-4 w-56 h-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-6 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Student Portal
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
              {getGreeting()}, {user.name}!
            </h1>
            <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-xl">
              Ready to learn something new today? Keep pushing your boundaries and track your milestones below.
            </p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 self-start md:self-auto text-xs md:text-sm text-white shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{todayDate()}</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics Section */}
      {pageLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl animate-pulse border border-zinc-200 dark:border-zinc-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Courses */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Courses</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{totalCourses}</h3>
              <p className="text-xs text-foreground-muted mt-1">Total Enrolled</p>
            </div>
          </motion.div>

          {/* Card 2: In Progress */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">In Progress</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{inProgressCoursesCount}</h3>
              <p className="text-xs text-foreground-muted mt-1">Active Modules</p>
            </div>
          </motion.div>

          {/* Card 3: Completed */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Completed</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{completedCoursesCount}</h3>
              <p className="text-xs text-foreground-muted mt-1">Finished Courses</p>
            </div>
          </motion.div>

          {/* Card 4: Overall Progress */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Overall Progress</span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{overallPercentage}%</h3>
              <div className="mt-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Filter and Search controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2"
      >
        <div className="flex items-center overflow-x-auto pb-1 md:pb-0 gap-1.5 bg-card/65 backdrop-blur-md p-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-250 whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white dark:bg-zinc-800 text-foreground shadow-sm'
                : 'text-foreground-muted hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            All Courses ({totalCourses})
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-250 whitespace-nowrap ${
              activeTab === 'in-progress'
                ? 'bg-white dark:bg-zinc-800 text-foreground shadow-sm'
                : 'text-foreground-muted hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            In Progress ({inProgressCoursesCount})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-250 whitespace-nowrap ${
              activeTab === 'completed'
                ? 'bg-white dark:bg-zinc-800 text-foreground shadow-sm'
                : 'text-foreground-muted hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Completed ({completedCoursesCount})
          </button>
          <button
            onClick={() => setActiveTab('not-started')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-250 whitespace-nowrap ${
              activeTab === 'not-started'
                ? 'bg-white dark:bg-zinc-800 text-foreground shadow-sm'
                : 'text-foreground-muted hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Not Started ({notStartedCoursesCount})
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* Courses List Section */}
      {pageLoading ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-60 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-200 dark:border-zinc-800" />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-card/40 rounded-2xl border border-border p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-850 rounded-full flex items-center justify-center mx-auto text-zinc-400 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h4 className="text-base font-bold text-foreground">No courses match your criteria</h4>
          <p className="mt-1 text-sm text-foreground-muted max-w-sm mx-auto">
            Try adjusting your search query, clearing filters, or checking back later for newly added materials.
          </p>
          {(searchQuery || activeTab !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="mt-5 px-4.5 py-2 text-xs font-semibold bg-zinc-900 dark:bg-zinc-850 hover:bg-zinc-800 dark:hover:bg-zinc-750 text-white rounded-lg transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                {/* Course Header Gradient Accent */}
                <div className={`h-2.5 w-full bg-gradient-to-r ${course.color}`} />

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Card Header Badge and Menu */}
                    <div className="flex items-center justify-between mb-4">
                      {course.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Completed
                        </span>
                      )}
                      {course.status === 'in-progress' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          In Progress
                        </span>
                      )}
                      {course.status === 'not-started' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                          Not Started
                        </span>
                      )}
                      <span className="text-xs font-semibold text-zinc-400">
                        {course.lessonCount} Lessons
                      </span>
                    </div>

                    {/* Course Title and Description */}
                    <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground-muted line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Progress Indicator for Card */}
                  <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/60">
                    <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300">
                          {course.teacherName ? course.teacherName.split(' ').map(n => n[0]).join('') : 'T'}
                        </div>
                        <span className="truncate max-w-[130px]">{course.teacherName || 'Instructor'}</span>
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-300 font-bold">
                        {course.progress.percentage}% Done ({course.progress.completed}/{course.progress.total})
                      </span>
                    </div>
                    
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800/60 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${course.color}`}
                        style={{ width: `${course.progress.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button Area */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/student/courses/${course.id}`}
                    className={`w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                      course.status === 'completed'
                        ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50'
                        : course.status === 'in-progress'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md dark:bg-blue-650 dark:hover:bg-blue-700 shadow-sm'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-white hover:shadow-md dark:bg-zinc-800 dark:hover:bg-zinc-700 shadow-sm'
                    }`}
                  >
                    <span>
                      {course.status === 'completed'
                        ? 'Review Content'
                        : course.status === 'in-progress'
                          ? 'Resume Learning'
                          : 'Start Learning'}
                    </span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
