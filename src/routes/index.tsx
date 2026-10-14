import { createFileRoute } from '@tanstack/react-router';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { todos, add, toggle, edit, remove, clearCompleted } = useTodos();
  const remaining = todos.filter((t) => !t.done).length;
  const hasDone = todos.some((t) => t.done);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur">
        <h1 className="text-3xl font-bold text-slate-900">My Todos</h1>
        <p className="mb-5 text-sm text-slate-500">
          {remaining} {remaining === 1 ? 'task' : 'tasks'} remaining
        </p>
        <TodoForm onAdd={add} />
        <div className="mt-5">
          <TodoList todos={todos} onToggle={toggle} onEdit={edit} onRemove={remove} />
        </div>
        {hasDone && (
          <button
            onClick={clearCompleted}
            className="mt-4 text-sm text-slate-500 underline underline-offset-4 hover:text-red-600"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
