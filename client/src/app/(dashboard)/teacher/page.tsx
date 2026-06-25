'use client';

import { useEffect, useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
}

export default function TeacherDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => { api.courses.list().then(setCourses); }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    const c = await api.courses.create(title, description);
    setCourses(prev => [...prev, { id: c.id, title: c.title, description: c.description, lessonCount: 0 }]);
    setTitle('');
    setDescription('');
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    await api.courses.delete(id);
    setCourses(prev => prev.filter(c => c.id !== id));
  }

  if (loading || !user) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">My Courses</h1>
          <p className="text-zinc-500">Manage your courses and lessons</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + New Course
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 p-4 border border-zinc-200 rounded-xl bg-zinc-50">
          <input
            type="text" placeholder="Course title" required
            value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg mb-2 text-sm"
          />
          <textarea
            placeholder="Description (optional)"
            value={description} onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg mb-3 text-sm resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700">Create</button>
            <button type="button" onClick={() => setShowForm(false)} className="text-zinc-500 text-sm hover:text-zinc-700">Cancel</button>
          </div>
        </form>
      )}

      {courses.length === 0 ? (
        <p className="text-zinc-400">No courses yet. Create your first one!</p>
      ) : (
        <div className="space-y-3">
          {courses.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl">
              <div>
                <Link href={`/teacher/courses/${c.id}`} className="font-semibold text-zinc-900 hover:text-blue-600">
                  {c.title}
                </Link>
                <p className="text-sm text-zinc-500">{c.lessonCount} lessons</p>
              </div>
              <button onClick={() => handleDelete(c.id)} className="text-red-500 text-sm hover:text-red-700">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
