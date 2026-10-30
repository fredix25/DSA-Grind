import { useMemo } from 'react';
import type { ActivityEvent } from '../lib/types';
import { localDate } from '../lib/streak';
export default function Heatmap({ events }: { events: ActivityEvent[] }) {
  const cells = useMemo(() => {
    const counts: Record<string, Set<string>> = {}; events.filter(e => e.kind === 'solve').forEach(e => (counts[e.date] ??= new Set()).add(e.problemId));
    const end = new Date(), start = new Date(end); start.setDate(end.getDate() - 7 * 20 + 1); start.setDate(start.getDate() - start.getDay());
    const out: { d: string; n: number }[] = []; for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) { const k = localDate(d); out.push({ d: k, n: counts[k]?.size ?? 0 }); } return out;
  }, [events]);
  const col = (n: number) => n === 0 ? 'bg-slate-200 dark:bg-white/10' : n === 1 ? 'bg-violet-300' : n === 2 ? 'bg-violet-500' : 'bg-cyan-400';
  return <div className="overflow-x-auto"><div className="grid grid-flow-col grid-rows-7 gap-1" role="img" aria-label="Solving activity over the last 20 weeks">{cells.map(c => <div key={c.d} title={`${c.d}: ${c.n} solved`} className={`h-3 w-3 rounded-sm ${col(c.n)}`} />)}</div></div>;
}
