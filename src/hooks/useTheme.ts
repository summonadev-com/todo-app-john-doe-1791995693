import { useEffect, useState } from 'react';

export type Mode = 'light' | 'dark';
export type Accent = 'indigo' | 'rose' | 'emerald' | 'orange';

export const ACCENTS: { id: Accent; color: string }[] = [
  { id: 'indigo', color: '#4f46e5' },
  { id: 'rose', color: '#e11d48' },
  { id: 'emerald', color: '#059669' },
  { id: 'orange', color: '#ea580c' },
];

function initialMode(): Mode {
  const saved = localStorage.getItem('theme-mode');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initialAccent(): Accent {
  const saved = localStorage.getItem('theme-accent');
  return ACCENTS.some((a) => a.id === saved) ? (saved as Accent) : 'indigo';
}

export function useTheme() {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [accent, setAccent] = useState<Accent>(initialAccent);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    localStorage.setItem('theme-accent', accent);
  }, [accent]);

  return {
    mode,
    accent,
    setAccent,
    toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
  };
}
