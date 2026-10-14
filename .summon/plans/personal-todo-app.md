---
status: pending
title: Personal todo app with due dates
---

1. Add `src/types/todo.ts` defining a task: id, title, done flag, optional due date, created time. Outcome: shared type for all components.
2. Add `src/hooks/useTodos.ts` that holds the task list and saves it to the browser's local storage on every change. Provides add, toggle, edit, delete, and clear-completed actions. Outcome: tasks persist across reloads with no account.
3. Add `src/lib/dates.ts` with helpers to format a due date ("Today", "Tomorrow", "Mar 5") and detect overdue or due-today tasks. Outcome: friendly date labels.
4. Add `src/components/TodoForm.tsx`: a text input plus a date picker and an Add button; blank titles are rejected. Outcome: quick task entry.
5. Add `src/components/TodoItem.tsx`: checkbox, title (strikethrough when done), due-date badge (red when overdue, amber when due today), inline edit, and delete button. Outcome: clear, scannable rows.
6. Add `src/components/TodoList.tsx`: renders tasks sorted with incomplete first, then by soonest due date, with an empty-state message. Outcome: the most urgent tasks are at the top.
7. Update `src/routes/index.tsx` to compose the page: heading, remaining-task count, form, list, and a "Clear completed" button. Centered card layout styled with Tailwind, responsive for mobile.
8. Adjust `src/routes/__root.tsx` and `src/styles/global.css` for a soft background and page title/base typography as needed. Outcome: polished, consistent look.
9. Verify: add, complete, edit, delete, reload persistence, and overdue styling all work.
