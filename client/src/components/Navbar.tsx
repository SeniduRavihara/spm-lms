'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-zinc-200 bg-white">
      <Link href={user.role === 'teacher' ? '/teacher' : '/student'} className="font-bold text-zinc-900">
        LMS
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-zinc-500">{user.name} ({user.role})</span>
        <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
      </div>
    </nav>
  );
}
