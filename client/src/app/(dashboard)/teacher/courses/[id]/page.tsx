'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

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

  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => { api.courses.get(id as string).then(setCourse); }, [id]);

  async function handleAddLesson(e: FormEvent) {
    e.preventDefault();
    if (!newLesson.trim()) return;
    const lesson = await api.lessons.create(id as string, newLesson);
    setCourse(prev => prev ? { ...prev, lessons: [...prev.lessons, lesson] } : prev);
    setNewLesson('');
  }

  async function handleDeleteLesson(lessonId: string) {
    await api.lessons.delete(lessonId);
    setCourse(prev => prev ? { ...prev, lessons: prev.lessons.filter(l => l.id !== lessonId) } : prev);
  }

  if (loading || !user) return null;
  if (!course) return <p className="text-zinc-400">Loading...</p>;

  return (
    <div>
      <Link href="/teacher" className="text-sm text-blue-600 hover:underline">&larr; Back to courses</Link>

      <h1 className="text-2xl font-bold text-zinc-900 mt-2 mb-1">{course.title}</h1>
      <p className="text-zinc-500 mb-6">{course.description || 'No description'}</p>

      <h2 className="font-semibold text-zinc-800 mb-3">Lessons</h2>

      <form onSubmit={handleAddLesson} className="flex gap-2 mb-4">
        <input
          type="text" placeholder="New lesson title" required
          value={newLesson} onChange={e => setNewLesson(e.target.value)}
          className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg text-sm"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add</button>
      </form>

      {course.lessons.length === 0 ? (
        <p className="text-zinc-400">No lessons yet.</p>
      ) : (
        <ul className="space-y-2">
          {course.lessons.map(l => (
            <li key={l.id} className="flex items-center justify-between px-3 py-2 border border-zinc-200 rounded-lg">
              <span className="text-zinc-800">{l.title}</span>
              <button onClick={() => handleDeleteLesson(l.id)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
