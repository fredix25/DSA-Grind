import { useEffect, useState, useCallback } from 'react';
import { load, save } from './storage';
import { localDate } from './streak';
import { problems } from '../data/problems';
import { reactionKind } from './reaction';
import { celebrate, unsolveMessage } from './celebrate';
import type { ProgressState } from './types';
export interface Toast { id: number; msg: string; tone: 'win' | 'neutral' }
let tid = 0;
export function useStore() {
  const [s, setS] = useState<ProgressState>(load); const [toast, setToast] = useState<Toast | null>(null);
  useEffect(() => { save(s); document.documentElement.classList.toggle('dark', s.theme === 'dark'); }, [s]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 4500); return () => clearTimeout(t); }, [toast]);
  const toggle = useCallback((id: string) => {
    const p = problems.find(x => x.id === id); if (!p) return; const today = localDate();
    if (s.solved[id]) { // unsolve: neutral message; activity history is kept
      const { [id]: _gone, ...rest } = s.solved; setS({ ...s, solved: rest }); setToast({ id: ++tid, msg: unsolveMessage(), tone: 'neutral' }); return; }
    const kind = reactionKind(s, p, problems, today);
    setS({ ...s, solved: { ...s.solved, [id]: today }, activity: [...s.activity, { date: today, problemId: id, kind: 'solve' }], lastTopic: p.topicId });
    setToast({ id: ++tid, msg: celebrate(kind, s.humor), tone: 'win' });
  }, [s]);
  const flip = (k: 'bookmarks' | 'review' | 'mastered', id: string) => setS(p => ({ ...p, [k]: p[k].includes(id) ? p[k].filter(x => x !== id) : [...p[k], id] }));
  const note = (id: string, v: string) => setS(p => ({ ...p, notes: { ...p.notes, [id]: v } }));
  const check = (topic: string, key: string) => setS(p => { const c = p.checks[topic] ?? []; return { ...p, checks: { ...p.checks, [topic]: c.includes(key) ? c.filter(x => x !== key) : [...c, key] } }; });
  return { s, setS, toast, toggle, flip, note, check };
}
export type Store = ReturnType<typeof useStore>;
