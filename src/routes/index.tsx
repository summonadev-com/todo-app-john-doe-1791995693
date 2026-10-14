import { createFileRoute } from '@tanstack/react-router';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { todos, add, toggle, edit, remove, clearCompleted } = useTodos();
  const remaining = todos.filter((t) => !t.done).length;
  const hasDone = todos.some((t) => t.done);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 px-4 py-10 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-xl rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur dark:bg-slate-900/80">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">My Todos</h1>
            <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
              {remaining} {remaining === 1 ? 'task' : 'tasks'} remaining
            </p>
          </div>
          <ThemeSwitcher />
        </div>
        <TodoForm onAdd={add} />
        <div className="mt-5">
          <TodoList todos={todos} onToggle={toggle} onEdit={edit} onRemove={remove} />
        </div>
        {hasDone && (
          <button
            onClick={clearCompleted}
            className="mt-4 text-sm text-slate-500 underline underline-offset-4 hover:text-red-600 dark:text-slate-400"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
