'use client';

export default function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm text-zinc-600">
        <span>Progress</span>
        <span>{completed}/{total} lessons ({pct}%)</span>
      </div>
      <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
