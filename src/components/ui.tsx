import { useMemo } from 'react';
import { pick } from '../lib/quotes';
import { Bookmark, ExternalLink, RotateCcw, NotebookPen } from 'lucide-react';
import type { Problem, Difficulty } from '../lib/types';
import type { Store } from '../lib/store';
import { topics } from '../data/topics';
const dc: Record<Difficulty, string> = { Easy: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', Medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', Hard: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' };
const dl: Record<Difficulty, string> = { Easy: 'Easy', Medium: 'Medium', Hard: 'Hard' };
export const DifficultyBadge = ({ d }: { d: Difficulty }) => <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${dc[d]}`}>{dl[d]}</span>;
export const ProgressBar = ({ n, t, label, fill = 'var(--purple)' }: { n: number; t: number; label?: string; fill?: string }) => <div role="progressbar" aria-label={label} aria-valuenow={n} aria-valuemin={0} aria-valuemax={t} className="h-2 w-full rounded-full bg-[var(--progress-track)]"><div className="h-2 rounded-full transition-all" style={{ width: `${t ? n / t * 100 : 0}%`, background: fill }} /></div>;
export const StatCard = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: React.ReactNode; sub?: string }) => <div className="card"><div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">{icon}{label}</div><div className="mt-1 text-2xl font-bold">{value}</div>{sub && <div className="text-xs text-slate-500">{sub}</div>}</div>;
export function ProblemRow({ p, st, showTopic }: { p: Problem; st: Store; showTopic?: boolean }) {
  const { s } = st, on = !!s.solved[p.id];
  const tip = useMemo(() => pick('tip', s.humor), [p.id, s.humor]);
  return (
    <li title={tip || undefined} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-50 dark:hover:bg-white/5">
      <input id={`c-${p.id}`} type="checkbox" className="h-5 w-5 accent-violet-600" checked={on} onChange={() => st.toggle(p.id)} aria-label={`Mark ${p.title} solved`} />
      <div className="min-w-0 flex-1"><a href={`https://leetcode.com/problems/${p.slug}/`} target="_blank" rel="noreferrer" className={`font-medium hover:underline ${on ? 'text-slate-400 line-through' : ''}`}>{p.title} <ExternalLink size={12} className="inline" /></a>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500"><DifficultyBadge d={p.difficulty} /><span>{p.pattern}</span><span className="rounded bg-violet-500/15 px-1 text-violet-600 dark:text-violet-300">{p.core ? 'Core' : 'Side quest'}</span>{showTopic && <span>· {topics.find(t => t.id === p.topicId)?.name}</span>}{!p.verified && <span title="Slug and difficulty not yet verified">· unverified</span>}</div></div>
      {on && <button aria-label="Needs revision" aria-pressed={s.review.includes(p.id)} onClick={() => st.flip('review', p.id)}><RotateCcw size={17} className={s.review.includes(p.id) ? 'text-amber-500' : 'text-slate-400'} /></button>}
      <details className="relative"><summary aria-label={`Notes for ${p.title}`} className="cursor-pointer list-none"><NotebookPen size={17} className={s.notes[p.id] ? 'text-violet-500' : 'text-slate-400'} /></summary>
        <textarea aria-label={`Notes for ${p.title}`} value={s.notes[p.id] ?? ''} onChange={e => st.note(p.id, e.target.value)} className="absolute right-0 z-10 mt-2 h-28 w-56 rounded-xl border bg-white p-2 text-sm shadow-lg dark:border-white/10 dark:bg-[#0d1530]" /></details>
      <button aria-label="Bookmark" aria-pressed={s.bookmarks.includes(p.id)} onClick={() => st.flip('bookmarks', p.id)}><Bookmark size={17} fill={s.bookmarks.includes(p.id) ? 'currentColor' : 'none'} className={s.bookmarks.includes(p.id) ? 'text-violet-500' : 'text-slate-400'} /></button>
    </li>);
}
