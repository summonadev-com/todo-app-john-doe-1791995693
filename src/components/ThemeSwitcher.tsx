import { ACCENTS, useTheme, type Accent, type Mode } from '@/hooks/useTheme';

const selectClass =
  'rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-sm capitalize text-slate-600 outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300';

export function ThemeSwitcher() {
  const { mode, accent, setAccent, setMode } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as Mode)}
        aria-label="Mode"
        className={selectClass}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <select
        value={accent}
        onChange={(e) => setAccent(e.target.value as Accent)}
        aria-label="Accent color"
        className={selectClass}
      >
        {ACCENTS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.id}
          </option>
        ))}
      </select>
    </div>
  );
}
