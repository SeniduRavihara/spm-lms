'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import CourseCard from '@/components/CourseCard';

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
}

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseSummary[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => { api.courses.list().then(setCourses); }, []);

  if (loading || !user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">My Courses</h1>
      <p className="text-zinc-500 mb-6">Track your learning progress</p>

      {courses.length === 0 ? (
        <p className="text-zinc-400">No courses available yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map(c => (
            <CourseCard key={c.id} {...c} href={`/student/courses/${c.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
