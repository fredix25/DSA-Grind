import type { Ctx } from '../data/quotes';
import { allQuotes as quotes } from '../data/quotes2';
import type { Humor } from './types';
const lvl = { off: -1, chill: 0, normal: 1, brainrot: 2 } as const;
let last = '';
export function pick(ctx: Ctx, mode: Humor): string {
  const m = lvl[mode]; if (m < 0) return '';
  const pool = quotes.filter(q => q.c === ctx && q.m <= m && q.t !== last);
  const q = pool.length ? pool[Math.floor(Math.random() * pool.length)].t : ''; last = q || last; return q;
}
