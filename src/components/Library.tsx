import { useState } from 'react';
import { problems } from '../data/problems';
import { topics } from '../data/topics';
import type { Store } from '../lib/store';
import { ProblemRow } from './ui';
import { pick } from '../lib/quotes';
export default function Library({ st, preset, ctx, initialQ = '' }: { st: Store; initialQ?: string; preset?: 'review' | 'bookmarks'; ctx: 'empty' | 'revision' }) {
  const [q, setQ] = useState(initialQ), [topic, setTopic] = useState(''), [diff, setDiff] = useState(''), [status, setStatus] = useState(''), [kind, setKind] = useState('');
  const { s } = st;
  const list = problems.filter(p => (!preset || (preset === 'review' ? s.review : s.bookmarks).includes(p.id)) && p.title.toLowerCase().includes(q.toLowerCase()) && (!topic || p.topicId === topic) && (!diff || p.difficulty === diff)
    && (!status || (status === 'solved') === !!s.solved[p.id]) && (!kind || (kind === 'core') === p.core));
  const sel = (v: string, set: (x: string) => void, label: string, opts: string[][]) => <select aria-label={label} value={v} onChange={e => set(e.target.value)} className="rounded-xl border bg-white px-2 py-1.5 text-sm dark:border-white/10 dark:bg-[#0d1530]"><option value="">{label}</option>{opts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>;
  return <div className="card"><div className="mb-3 flex flex-wrap gap-2"><input aria-label="Search problems" placeholder="Search problems" value={q} onChange={e => setQ(e.target.value)} className="min-w-40 flex-1 rounded-xl border bg-transparent px-3 py-1.5 text-sm dark:border-white/10" />
    {sel(topic, setTopic, 'Topic', topics.map(t => [t.id, t.name]))}{sel(diff, setDiff, 'Difficulty', ['Easy', 'Medium', 'Hard'].map(x => [x, x]))}{sel(status, setStatus, 'Status', [['solved', 'Solved'], ['unsolved', 'Unsolved']])}{sel(kind, setKind, 'Core/Side', [['core', 'Core'], ['side', 'Side quest']])}</div>
    {list.length ? <ul>{list.map(p => <ProblemRow key={p.id} p={p} st={st} showTopic />)}</ul> : <p className="py-6 text-center text-sm text-slate-500">{pick(ctx, s.humor) || 'Nothing here.'} ({preset ? 'Mark problems to see them here.' : 'No problems match these filters.'})</p>}</div>;
}
