import type { Level } from './types';
export const startTopic = (l: Level) => l === 'beginner' ? 'arrays' : l === 'intermediate' ? 'sliding-window' : 'dp-fundamentals';
export const levelLabel: Record<Level, string> = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
export const daysAgo = (date: string, today: string) => { const t = (s: string) => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); }; const n = t(today) - t(date); return n <= 0 ? 'today' : n === 1 ? 'yesterday' : `${n}d ago`; };
