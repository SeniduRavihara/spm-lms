'use client';

interface Props {
  id: string;
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export default function ChecklistItem({ title, completed, onToggle }: Props) {
  return (
    <label className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-zinc-50 cursor-pointer group">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
      />
      <span className={`text-zinc-800 ${completed ? 'line-through text-zinc-400' : ''}`}>
        {title}
      </span>
    </label>
  );
}
