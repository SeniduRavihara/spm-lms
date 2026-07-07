'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  progress: number;
  completedCount: number;
  totalCount: number;
  color: string;
  status: string;
}

const colors = [
  'from-blue-400 to-purple-600',
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-pink-600',
  'from-orange-400 to-red-600',
];

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadStudentData() {
      try {
        const list = await api.courses.list();
        const detailed = await Promise.all(
          list.map(async (c: any, index: number) => {
            const detail = await api.courses.get(c.id);
            const progressData = await api.progress.get(c.id);
            const completed = progressData.filter((p: any) => p.completed).length;
            const total = detail.lessons.length;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            let status = 'Just Started';
            if (percentage > 80) status = 'Near Completion';
            else if (percentage > 0) status = 'In Progress';

            return {
              id: c.id,
              title: c.title,
              description: c.description,
              progress: percentage,
              completedCount: completed,
              totalCount: total,
              color: colors[index % colors.length],
              status,
            };
          })
        );
        setCourses(detailed);
      } catch (err) {
        console.error('Error loading student courses:', err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user && user.role === 'student') {
      loadStudentData();
    }
  }, [user]);

  if (loading || !user) return null;

  if (dataLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading courses...</p>
        </div>
      </div>
    );
  }

  const completedCoursesCount = courses.filter((c) => c.progress === 100 && c.totalCount > 0).length;

  const upcomingAssignments = [
    { id: 1, title: 'React Checklist Assignment', dueDate: '2026-07-20', course: 'Advanced Web Development' },
    { id: 2, title: 'Term Project Proposal', dueDate: '2026-07-22', course: 'LMS System SPM' },
    { id: 3, title: 'API Integration Worksheet', dueDate: '2026-07-25', course: 'Web Development Basics' },
  ];

  return (
    <div className="w-full">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-lg text-gray-600">
          You are enrolled in {courses.length} {courses.length === 1 ? 'course' : 'courses'} this semester
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>

          {courses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 bg-white">
              No courses available yet. Please check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Course Header with Gradient */}
                    <div className={`h-12 rounded-lg bg-gradient-to-r ${course.color} mb-4`}></div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description || 'No description provided.'}</p>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
                        <span className="text-xs font-bold text-blue-600">
                          {course.completedCount}/{course.totalCount} ({course.progress}%)
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${course.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        ></motion.div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        course.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        course.status === 'Near Completion' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {course.status}
                      </span>
                      <Link href={`/student/courses/${course.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                        Continue →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Upcoming Assignments */}
          <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-white to-orange-50/50 p-6 shadow-lg mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">📋</span>
              Upcoming Tasks
            </h3>

            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="p-3 rounded-lg bg-white border border-orange-100 hover:border-orange-300 transition-all"
                >
                  <p className="font-semibold text-sm text-gray-900">{assignment.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{assignment.course}</p>
                  <p className="text-xs font-semibold text-orange-600 mt-2">
                    Due: {assignment.dueDate}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">📊</span>
              Your Stats
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed Courses</span>
                <span className="text-2xl font-bold text-blue-600">{completedCoursesCount}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current GPA</span>
                <span className="text-2xl font-bold text-purple-600">3.85</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Learning Hours</span>
                <span className="text-2xl font-bold text-cyan-600">124</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
