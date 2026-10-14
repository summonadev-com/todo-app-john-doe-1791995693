import { ACCENTS, useTheme } from '@/hooks/useTheme';
import { Dropdown } from '@/components/Dropdown';

export function ThemeSwitcher() {
  const { mode, accent, setAccent, setMode } = useTheme();
  const dark = mode === 'dark';
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Dark mode"
        onClick={() => setMode(dark ? 'light' : 'dark')}
        className={`relative h-7 w-12 rounded-full transition-colors ${
          dark ? 'bg-indigo-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            dark ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <Dropdown
        label="Accent color"
        value={accent}
        options={ACCENTS.map((a) => ({
          value: a.id,
          label: a.id.charAt(0).toUpperCase() + a.id.slice(1),
          swatch: a.color,
        }))}
        onChange={setAccent}
      />
    </div>
  );
}
