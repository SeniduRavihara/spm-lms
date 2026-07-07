'use client';

import { useEffect, useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  color: string;
}

const colors = [
  'from-blue-400 to-purple-600',
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-pink-600',
  'from-orange-400 to-red-600',
];

export default function TeacherDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadTeacherCourses() {
      try {
        const list = await api.courses.list();
        const formatted = list.map((c: any, index: number) => ({
          ...c,
          color: colors[index % colors.length],
        }));
        setCourses(formatted);
      } catch (err) {
        console.error('Error loading teacher courses:', err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user && user.role === 'teacher') {
      loadTeacherCourses();
    }
  }, [user]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const c = await api.courses.create(title, description);
      setCourses((prev) => [
        ...prev,
        {
          id: c.id,
          title: c.title,
          description: c.description,
          lessonCount: 0,
          color: colors[prev.length % colors.length],
        },
      ]);
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this course? All lessons will be lost.')) return;
    try {
      await api.courses.delete(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  }

  if (loading || !user) return null;

  if (dataLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalLessons = courses.reduce((acc, c) => acc + c.lessonCount, 0);

  return (
    <div className="w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back, {user.name}!</h1>
          <p className="text-lg text-gray-600">Faculty Dashboard & Course Management</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
          >
            {showForm ? 'Cancel Creation' : '+ Create New Course'}
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Animated Course Creation Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleCreate}
                className="overflow-hidden border border-blue-200 bg-gradient-to-br from-white to-blue-50/20 p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Design Editor</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Course Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Advanced Data Structures"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Course Description</label>
                    <textarea
                      placeholder="Brief overview of the syllabus and learning objectives..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                      Publish Course
                    </Button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Courses List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Published Courses</h2>

            {courses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400 bg-white">
                No courses published yet. Use the button above to publish your first syllabus!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Gradient Header */}
                      <div className={`h-12 rounded-lg bg-gradient-to-r ${course.color} mb-4`}></div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description || 'No description provided.'}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {course.lessonCount} Lessons
                      </span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleDelete(course.id)}
                          variant="destructive"
                          size="sm"
                          className="bg-red-50 text-red-600 hover:bg-red-100 border border-transparent font-medium py-1 px-3 rounded-lg"
                        >
                          Delete
                        </Button>
                        <Link href={`/teacher/courses/${course.id}`}>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg"
                          >
                            Manage →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Faculty Stats */}
          <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-white to-purple-50/50 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">📊</span>
              Faculty Overview
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Syllabus</span>
                <span className="text-2xl font-bold text-purple-600">{courses.length}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Lessons</span>
                <span className="text-2xl font-bold text-blue-600">{totalLessons}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Department</span>
                <span className="text-md font-bold text-cyan-600 truncate max-w-[150px]">Computer Science</span>
              </div>
            </div>
          </div>

          {/* Quick instructions */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span> Quick Guide
            </h4>
            <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
              <li>Create courses with descriptive outlines.</li>
              <li>Click "Manage" to add, edit or delete specific syllabus lessons.</li>
              <li>Students will see the syllabus changes dynamically.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
