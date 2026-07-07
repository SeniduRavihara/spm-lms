'use client';

interface Props {
  id: string;
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export default function ChecklistItem({ title, completed, onToggle }: Props) {
  return (
    <div 
      onClick={onToggle}
      className={`flex items-center justify-between py-3 px-4.5 rounded-xl border cursor-pointer select-none transition-all duration-250 group hover:shadow-xs ${
        completed 
          ? 'bg-emerald-50/30 dark:bg-emerald-950/5 border-emerald-100 dark:border-emerald-900/20' 
          : 'bg-white dark:bg-zinc-900 border-zinc-200/70 dark:border-zinc-850 hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 hover:border-zinc-350 dark:hover:border-zinc-700/60'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Custom custom checkbox circle/square */}
        <div className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center border transition-all duration-200 shrink-0 ${
          completed 
            ? 'bg-emerald-500 border-emerald-500 text-white scale-102 shadow-xs' 
            : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-transparent group-hover:border-blue-500'
        }`}>
          <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {/* Lesson Title Text */}
        <span className={`text-sm font-semibold truncate transition-all duration-300 ${
          completed 
            ? 'line-through text-zinc-400 dark:text-zinc-500' 
            : 'text-zinc-850 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white'
        }`}>
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
          completed 
            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-450' 
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500'
        }`}>
          {completed ? 'Completed' : 'To Learn'}
        </span>
      </div>
    </div>
  );
}
