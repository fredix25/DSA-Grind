import { problems } from '../data/problems';
import type { Store } from '../lib/store';
import { pick } from '../lib/quotes';
export default function Notes({ st }: { st: Store }) {
  const ids = Object.keys(st.s.notes).filter(id => st.s.notes[id]?.trim()); const items = ids.map(id => problems.find(p => p.id === id)).filter(Boolean) as typeof problems;
  if (!items.length) return <div className="card text-center text-sm text-slate-500">{pick('empty', st.s.humor) || 'No notes yet.'} Add notes from the note icon on any problem row.</div>;
  return <div className="space-y-3">{items.map(p => <div key={p.id} className="card"><a className="font-semibold hover:underline" href={`https://leetcode.com/problems/${p.slug}/`} target="_blank" rel="noreferrer">{p.title}</a>
    <textarea aria-label={`Notes for ${p.title}`} value={st.s.notes[p.id]} onChange={e => st.note(p.id, e.target.value)} className="mt-2 h-24 w-full rounded-xl border bg-transparent p-2 text-sm dark:border-white/10" /></div>)}</div>;
}
