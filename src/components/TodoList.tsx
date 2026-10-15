import type { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onRemove: (id: string) => void;
};

export function TodoList({ todos, ...handlers }: Props) {
  if (todos.length === 0) {
    return <p className="py-8 text-center text-slate-400 dark:text-slate-500">Nothing to do yet. Add your first task above.</p>;
  }
  const sorted = [...todos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.due && b.due) return a.due.localeCompare(b.due);
    if (a.due) return -1;
    if (b.due) return 1;
    return b.createdAt - a.createdAt;
  });
  return (
    <ul className="flex flex-col gap-2">
      {sorted.map((t) => (
        <TodoItem key={t.id} todo={t} {...handlers} />
      ))}
    </ul>
  );
}
