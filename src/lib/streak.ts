import type { ActivityEvent } from './types';
export const localDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const toDay = (s: string) => { const [y,m,d] = s.split('-').map(Number); return Math.round(Date.UTC(y,m-1,d)/86400000); };
export const activeDays = (ev: ActivityEvent[]) => [...new Set(ev.map(e => e.date))].sort();
export function currentStreak(ev: ActivityEvent[], today = localDate()): number {
  const days = new Set(activeDays(ev).map(toDay)); const t = toDay(today);
  let cur = days.has(t) ? t : t - 1; let n = 0;
  while (days.has(cur)) { n++; cur--; }
  return n;
}
export function longestStreak(ev: ActivityEvent[]): number {
  const d = activeDays(ev).map(toDay); let best = 0, run = 0;
  d.forEach((x, i) => { run = i > 0 && x === d[i-1] + 1 ? run + 1 : 1; best = Math.max(best, run); });
  return best;
}
export const countOn = (ev: ActivityEvent[], date: string) => new Set(ev.filter(e => e.date === date && e.kind === 'solve').map(e => e.problemId)).size;
