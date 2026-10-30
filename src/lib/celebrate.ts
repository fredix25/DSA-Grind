import * as C from '../data/celebrate';
import type { Kind } from './reaction';
import type { Humor } from './types';
let last = '';
const choose = (pool: string[]) => { const ok = pool.filter(x => x !== last); const m = ok[Math.floor(Math.random() * ok.length)] ?? pool[0]; last = m; return m; };
export function celebrate(kind: Kind, mode: Humor): string {
  if (mode === 'off') return 'Marked as solved.';
  const pool = kind === 'easy' ? [...C.easy, ...C.general] : kind === 'medium' ? [...C.medium, ...C.general] : C[kind];
  return choose(pool);
}
export const unsolveMessage = () => choose(C.unsolve);
