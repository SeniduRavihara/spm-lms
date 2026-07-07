'use client';

export default function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-450 uppercase tracking-wider flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Overall Progress
        </span>
        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-200/60 dark:border-zinc-800 shadow-2xs">
          {completed}/{total} lessons <span className="text-blue-500 ml-1">({pct}%)</span>
        </span>
      </div>
      <div className="w-full h-3 bg-zinc-200/70 dark:bg-zinc-800/60 rounded-full overflow-hidden p-0.5 border border-zinc-300/20 dark:border-zinc-700/20 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out shadow-xs"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
