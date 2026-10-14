import { useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';

const KEY = 'todos-v3';

function dayOffset(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function defaults(): Todo[] {
  const now = Date.now();
  const items: [string, string | null, boolean][] = [
    ['Welcome! Tick me to mark a task done', null, false],
    ['Pay electricity bill', dayOffset(-1), false],
    ['Buy groceries', dayOffset(0), false],
    ['Call mom', dayOffset(1), false],
    ['Plan weekend trip', dayOffset(4), false],
    ['Set up my todo app', null, true],
  ];
  return items.map(([title, due, done], i) => ({
    id: crypto.randomUUID(),
    title,
    done,
    due,
    createdAt: now - i * 1000,
  }));
}

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : defaults();
  } catch {
    return defaults();
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
