'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  const isTeacher = user.role === 'teacher';
  const dashboardLink = isTeacher ? '/teacher' : '/student';

  // Role badge styling
  const roleColors = isTeacher
    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50'
    : 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50';

  const avatarBg = isTeacher
    ? 'from-indigo-500 to-violet-600 shadow-indigo-250 dark:shadow-indigo-950/40'
    : 'from-blue-500 to-indigo-600 shadow-blue-250 dark:shadow-blue-950/40';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: any = { name, email };
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      await updateProfile(payload);
      setSuccess('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-fade-in">
      <div>
        <Link href={dashboardLink} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-850 shadow-md overflow-hidden">
        {/* Banner with color theme */}
        <div className={`h-24 bg-gradient-to-r ${isTeacher ? 'from-indigo-600 to-violet-700' : 'from-blue-600 to-indigo-700'}`} />

        <div className="px-6 pb-8 relative">
          {/* Avatar and Role */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-10 mb-6 gap-4">
            <div className="flex items-end gap-4.5">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${avatarBg} text-white flex items-center justify-center text-3xl font-extrabold shadow-lg border-4 border-white dark:border-zinc-900 z-10`}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">{user.name}</h1>
                <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
              </div>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${roleColors} self-start sm:self-auto`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isTeacher ? 'bg-indigo-500' : 'bg-blue-500'}`} />
              {roleLabel}
            </div>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800/80 mb-6" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4.5 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 rounded-xl border border-red-150 dark:border-red-900/50 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-4.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl border border-emerald-150 dark:border-emerald-900/50 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{success}</span>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-850 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-850 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-zinc-850 dark:text-white mb-1">Change Password</h3>
              <p className="text-xs text-zinc-400 mb-4">Leave password fields blank if you do not want to change your password.</p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password to verify changes"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required={!!newPassword}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-850 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">New Password</label>
                    <input
                      type="password"
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-850 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-850 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2.5 bg-zinc-900 dark:bg-zinc-850 hover:bg-zinc-800 dark:hover:bg-zinc-750 text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
