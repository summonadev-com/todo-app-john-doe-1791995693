function todayStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function isOverdue(due: string | null): boolean {
  return !!due && due < todayStr();
}

export function isToday(due: string | null): boolean {
  return !!due && due === todayStr();
}

export function formatDue(due: string): string {
  if (isToday(due)) return 'Today';
  const [y, m, d] = due.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  const diff = Math.round((date.getTime() - t.getTime()) / 86400000);
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
