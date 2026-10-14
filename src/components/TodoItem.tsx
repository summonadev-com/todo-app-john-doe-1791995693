import { useState } from 'react';
import type { Todo } from '@/types/todo';
import { formatDue, isOverdue, isToday } from '@/lib/dates';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onRemove: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onEdit, onRemove }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  function save() {
    const t = text.trim();
    if (t) onEdit(todo.id, t);
    else setText(todo.title);
    setEditing(false);
  }

  const badge =
    todo.due && !todo.done
      ? isOverdue(todo.due)
        ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
        : isToday(todo.due)
          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
          : 'bg-indigo-100 text-indigo-700 dark:bg-slate-700 dark:text-indigo-300'
      : 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500';

  return (
    <li className="flex items-center gap-3 rounded-lg border border-indigo-100 bg-white px-3 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 accent-indigo-600"
      />
      {editing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') {
              setText(todo.title);
              setEditing(false);
            }
          }}
          className="flex-1 rounded border border-indigo-400 bg-transparent px-2 py-1 outline-none dark:text-slate-100"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 break-words ${todo.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}
        >
          {todo.title}
        </span>
      )}
      {todo.due && (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge}`}>
          {formatDue(todo.due)}
        </span>
      )}
      <button
        onClick={() => setEditing(true)}
        className="text-sm text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        Edit
      </button>
      <button
        onClick={() => onRemove(todo.id)}
        className="text-sm text-slate-400 hover:text-red-600"
      >
        Delete
      </button>
    </li>
  );
}
