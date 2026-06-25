'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import ChecklistItem from '@/components/ChecklistItem';

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

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    api.courses.get(id as string).then(setCourse);
    api.progress.get(id as string).then((progress: any[]) => {
      setCompleted(new Set(progress.filter(p => p.completed).map(p => p.lessonId)));
    });
  }, [id]);

  async function handleToggle(lessonId: string) {
    const updated = await api.progress.toggle(lessonId, id as string);
    setCompleted(prev => {
      const next = new Set(prev);
      if (updated.completed) next.add(lessonId);
      else next.delete(lessonId);
      return next;
    });
  }

  if (loading || !user) return null;
  if (!course) return <p className="text-zinc-400">Loading...</p>;

  return (
    <div>
      <Link href="/student" className="text-sm text-blue-600 hover:underline">&larr; Back to courses</Link>

      <h1 className="text-2xl font-bold text-zinc-900 mt-2 mb-1">{course.title}</h1>
      <p className="text-zinc-500 mb-6">{course.description}</p>

      <div className="mb-6">
        <ProgressBar completed={completed.size} total={course.lessons.length} />
      </div>

      <div className="border border-zinc-200 rounded-xl divide-y divide-zinc-100">
        {course.lessons.map(l => (
          <ChecklistItem
            key={l.id}
            id={l.id}
            title={l.title}
            completed={completed.has(l.id)}
            onToggle={() => handleToggle(l.id)}
          />
        ))}
        {course.lessons.length === 0 && (
          <p className="p-4 text-zinc-400 text-sm">No lessons in this course yet.</p>
        )}
      </div>
    </div>
  );
}
