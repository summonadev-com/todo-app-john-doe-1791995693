import { ACCENTS, useTheme } from '@/hooks/useTheme';
import { Dropdown } from '@/components/Dropdown';

const MODES = [
  { value: 'light' as const, label: 'Light' },
  { value: 'dark' as const, label: 'Dark' },
];

export function ThemeSwitcher() {
  const { mode, accent, setAccent, setMode } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <Dropdown label="Mode" value={mode} options={MODES} onChange={setMode} />
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
