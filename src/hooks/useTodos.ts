import { useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';

const KEY = 'todos-v1';

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  return {
    todos,
    add: (title: string, due: string | null) =>
      setTodos((t) => [
        { id: crypto.randomUUID(), title, done: false, due, createdAt: Date.now() },
        ...t,
      ]),
    toggle: (id: string) =>
      setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x))),
    edit: (id: string, title: string) =>
      setTodos((t) => t.map((x) => (x.id === id ? { ...x, title } : x))),
    remove: (id: string) => setTodos((t) => t.filter((x) => x.id !== id)),
    clearCompleted: () => setTodos((t) => t.filter((x) => !x.done)),
  };
}
