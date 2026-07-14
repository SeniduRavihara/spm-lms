'use client';

import { useEffect, useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Mail, 
  User, 
  Lock, 
  Calendar,
  X,
  GraduationCap
} from 'lucide-react';

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  color: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: string;
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
  const [students, setStudents] = useState<Student[]>([]);
  
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState<'courses' | 'students'>('courses');
  
  // Course creation states
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  // Student management states
  const [searchQuery, setSearchQuery] = useState('');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // Student form states
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  
  const [dataLoading, setDataLoading] = useState(true);
  const [formError, setFormError] = useState('');

  // Redirect if unauthorized
  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Handle URL hash changes to toggle active tab
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#students') {
        setActiveTab('students');
      } else {
        setActiveTab('courses');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Fetch initial dashboard metrics and entities
  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [courseList, studentList] = await Promise.all([
          api.courses.list(),
          api.auth.listStudents()
        ]);
        
        const formatted = courseList.map((c: any, index: number) => ({
          ...c,
          color: colors[index % colors.length],
        }));
        
        setCourses(formatted);
        setStudents(studentList);
      } catch (err) {
        console.error('Error loading dashboard metrics:', err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user && user.role === 'teacher') {
      loadDashboardData();
    }
  }, [user]);

  // Course handlers
  async function handleCreateCourse(e: FormEvent) {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    try {
      const c = await api.courses.create(courseTitle, courseDescription);
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
      setCourseTitle('');
      setCourseDescription('');
      setShowCourseForm(false);
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  }

  async function handleDeleteCourse(id: string) {
    if (!confirm('Are you sure you want to delete this course? All lessons will be lost.')) return;
    try {
      await api.courses.delete(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  }

  // Student handlers
  const openAddStudentModal = () => {
    setEditingStudent(null);
    setStudentName('');
    setStudentEmail('');
    setStudentPassword('');
    setFormError('');
    setShowStudentModal(true);
  };

  const openEditStudentModal = (student: Student) => {
    setEditingStudent(student);
    setStudentName(student.name);
    setStudentEmail(student.email);
    setStudentPassword('');
    setFormError('');
    setShowStudentModal(true);
  };

  async function handleStudentSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError('');

    try {
      if (editingStudent) {
        // Edit student
        const payload: any = { name: studentName, email: studentEmail };
        if (studentPassword) payload.password = studentPassword;
        
        const updated = await api.auth.updateStudent(editingStudent.id, payload);
        setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
        setShowStudentModal(false);
      } else {
        // Add new student
        if (!studentPassword) {
          setFormError('Password is required for new students');
          return;
        }
        const created = await api.auth.createStudent({
          name: studentName,
          email: studentEmail,
          password: studentPassword
        });
        setStudents(prev => [created, ...prev]);
        setShowStudentModal(false);
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to submit student form');
    }
  }

  async function handleDeleteStudent(id: string) {
    if (!confirm('Are you sure you want to remove this student? This operation is permanent.')) return;
    try {
      await api.auth.deleteStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  }

  if (loading || !user) return null;

  if (dataLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-foreground-muted font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalLessons = courses.reduce((acc, c) => acc + c.lessonCount, 0);

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Top Welcome Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-extrabold text-foreground mb-1">Welcome Back, {user.name}!</h1>
          <p className="text-sm text-foreground-muted">Faculty Admin Portal & Dashboard</p>
        </motion.div>

        {activeTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Button
              onClick={() => setShowCourseForm(!showCourseForm)}
              className="bg-primary text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              {showCourseForm ? 'Cancel Creation' : '+ Create New Course'}
            </Button>
          </motion.div>
        )}

        {activeTab === 'students' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Button
              onClick={openAddStudentModal}
              className="bg-primary text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              + Register Student
            </Button>
          </motion.div>
        )}
      </div>

      {/* Tabs Controller */}
      <div className="flex border-b border-border mb-8">
        <button
          onClick={() => { setActiveTab('courses'); window.location.hash = 'courses'; }}
          className={`px-6 py-3 font-bold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'courses' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          Manage Courses
        </button>
        <button
          onClick={() => { setActiveTab('students'); window.location.hash = 'students'; }}
          className={`px-6 py-3 font-bold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'students' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          Student Directory ({students.length})
        </button>
      </div>

      {/* TAB CONTENT: Courses tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Add Course Form */}
            <AnimatePresence>
              {showCourseForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleCreateCourse}
                  className="overflow-hidden border border-border bg-card p-6 rounded-2xl shadow-lg"
                >
                  <h3 className="text-md font-bold text-foreground mb-4">Course Design Editor</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1 uppercase tracking-wider">Course Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Advanced Data Structures"
                        required
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1 uppercase tracking-wider">Course Description</label>
                      <textarea
                        placeholder="Brief overview of the syllabus and learning objectives..."
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-background text-foreground resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <Button type="button" variant="ghost" onClick={() => setShowCourseForm(false)}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/95 text-white font-semibold px-4 py-2 rounded-xl"
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
              <h2 className="text-lg font-bold text-foreground">Your Published Courses</h2>

              {courses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-foreground-muted bg-card">
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
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className={`h-2.5 w-full rounded-full bg-gradient-to-r ${course.color} mb-4`}></div>
                        <h3 className="text-md font-bold text-foreground mb-1 line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-foreground-muted mb-4 line-clamp-2">{course.description || 'No description provided.'}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
                        <span className="text-xs font-bold text-foreground-muted bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                          {course.lessonCount} Lessons
                        </span>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDeleteCourse(course.id)}
                            variant="destructive"
                            size="sm"
                            className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 border border-transparent font-medium py-1 px-3 rounded-lg"
                          >
                            Delete
                          </Button>
                          <Link href={`/teacher/courses/${course.id}`}>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/95 text-white font-semibold py-1 px-3 rounded-lg cursor-pointer"
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

          {/* Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <h3 className="text-md font-bold text-foreground mb-4 flex items-center gap-2">
                <span>📊</span>
                Faculty Overview
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-muted">Active Syllabus</span>
                  <span className="text-xl font-bold text-primary">{courses.length}</span>
                </div>
                <div className="h-px bg-border"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-muted">Total Lessons</span>
                  <span className="text-xl font-bold text-blue-500">{totalLessons}</span>
                </div>
                <div className="h-px bg-border"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-muted">Total Students</span>
                  <span className="text-xl font-bold text-emerald-500">{students.length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <h4 className="font-bold text-xs text-foreground mb-2 flex items-center gap-2 uppercase tracking-wider">
                <span>💡</span> Quick Guide
              </h4>
              <ul className="text-[11px] text-foreground-muted space-y-2 list-disc list-inside">
                <li>Create courses with descriptive outlines.</li>
                <li>Click "Manage" to add, edit or delete specific syllabus lessons.</li>
                <li>Switch to "Student Directory" to verify or create student credentials.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}

      {/* TAB CONTENT: Student Directory Tab */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Filters and search area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground-muted">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="text-xs text-foreground-muted">
              Showing {filteredStudents.length} of {students.length} registered students
            </div>
          </div>

          {/* Student Grid list */}
          {filteredStudents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-foreground-muted bg-card max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-foreground-muted" />
              </div>
              <h4 className="font-bold text-foreground">No students found</h4>
              <p className="text-xs mt-1">Try refining your search query or add a new student using the button above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div 
                  key={student.id}
                  className="bg-card rounded-2xl border border-border p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm leading-tight">{student.name}</h4>
                        <p className="text-xs text-foreground-muted flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[170px]">{student.email}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[11px] text-foreground-muted pt-3 border-t border-border/60">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Joined {new Date(student.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-5 pt-1">
                    <button
                      onClick={() => openEditStudentModal(student)}
                      className="p-2 rounded-lg text-primary hover:bg-primary/10 border border-border cursor-pointer transition-colors"
                      title="Edit student details"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-border cursor-pointer transition-colors"
                      title="Remove student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Dialog for Add/Edit Student */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-border">
              <h3 className="font-bold text-foreground">
                {editingStudent ? 'Edit Student Profile' : 'Register New Student'}
              </h3>
              <button 
                onClick={() => setShowStudentModal(false)}
                className="text-foreground-muted hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStudentSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3.5 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 rounded-xl border border-red-200/50 text-xs">
                  {formError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <input
                  type="password"
                  required={!editingStudent}
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder={editingStudent ? 'Leave blank to keep current' : 'Enter login password'}
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-border mt-6">
                <Button type="button" variant="ghost" onClick={() => setShowStudentModal(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  {editingStudent ? 'Save Changes' : 'Create Student'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
