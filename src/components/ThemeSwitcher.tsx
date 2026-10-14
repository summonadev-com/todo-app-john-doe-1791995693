import { ACCENTS, useTheme } from '@/hooks/useTheme';

export function ThemeSwitcher() {
  const { mode, accent, setAccent, toggleMode } = useTheme();
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {ACCENTS.map((a) => (
          <button
            key={a.id}
            onClick={() => setAccent(a.id)}
            aria-label={`${a.id} theme`}
            style={{ backgroundColor: a.color }}
            className={`h-5 w-5 rounded-full ring-offset-2 dark:ring-offset-slate-900 ${
              accent === a.id ? 'ring-2 ring-slate-400' : ''
            }`}
          />
        ))}
      </div>
      <button
        onClick={toggleMode}
        className="rounded-lg border border-slate-300 px-2.5 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}
