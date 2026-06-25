'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await signup(email, password, name, role);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">Sign Up</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text" placeholder="Full Name" required
          value={name} onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg mb-3 text-sm"
        />
        <input
          type="email" placeholder="Email" required
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg mb-3 text-sm"
        />
        <input
          type="password" placeholder="Password" required
          value={password} onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg mb-4 text-sm"
        />

        <select
          value={role} onChange={e => setRole(e.target.value as 'student' | 'teacher')}
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg mb-4 text-sm"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Sign Up
        </button>

        <p className="text-sm text-zinc-500 mt-4 text-center">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
