'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-radial from-zinc-50 to-zinc-200/50 dark:from-zinc-950 dark:to-zinc-900/30 px-4 relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute right-10 top-10 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg relative z-10 transition-all duration-300"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-650 text-white shadow-md mb-4.5 scale-102">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-400 text-xs mt-1.5 font-medium">Log in to continue your learning journey</p>
        </div>

        {error && (
          <div className="p-4.5 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 rounded-xl border border-red-150 dark:border-red-900/50 text-sm flex items-start gap-3 mb-5">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email" 
              placeholder="name@example.com" 
              required
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-950 shadow-2xs transition"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">Password</label>
            </div>
            <input
              type="password" 
              placeholder="••••••••" 
              required
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-950 shadow-2xs transition"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              <span>Logging in...</span>
            </>
          ) : (
            <span>Log In</span>
          )}
        </button>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-6 text-center">
          No account yet? <Link href="/signup" className="text-blue-600 hover:text-blue-700 hover:underline font-semibold">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
