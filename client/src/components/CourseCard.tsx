'use client';

import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  href: string;
}

export default function CourseCard({ title, description, lessonCount, href }: Props) {
  return (
    <Link href={href} className="block p-5 border border-zinc-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition">
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{description}</p>
      <p className="mt-3 text-xs text-zinc-400">{lessonCount} lessons</p>
    </Link>
  );
}
