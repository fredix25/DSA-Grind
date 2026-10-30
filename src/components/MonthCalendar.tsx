import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Dot } from 'lucide-react';
import type { ActivityEvent } from '../lib/types';
import { localDate } from '../lib/streak';
export default function MonthCalendar({ events }: { events: ActivityEvent[] }) {
  const [off, setOff] = useState(0);
  const base = new Date(new Date().getFullYear(), new Date().getMonth() + off, 1), y = base.getFullYear(), m = base.getMonth();
  const counts = useMemo(() => { const c: Record<string, Set<string>> = {}; events.filter(e => e.kind === 'solve').forEach(e => (c[e.date] ??= new Set()).add(e.problemId)); return c; }, [events]);
  const cells = [...Array(base.getDay()).fill(0), ...Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => i + 1)];
  const today = localDate();
  return (
    <div className="card h-full">
      <div className="mb-3 flex items-center justify-between"><h3 className="flex items-center gap-2 text-lg font-bold"><CalendarDays size={18} />{base.toLocaleString('en', { month: 'long' })}, {y}</h3>
        <div className="flex gap-1"><button className="btn !p-1.5" aria-label="Previous month" onClick={() => setOff(off - 1)}><ChevronLeft size={15} /></button><button className="btn !p-1.5" aria-label="Back to this month" onClick={() => setOff(0)}><Dot size={15} /></button><button className="btn !p-1.5" aria-label="Next month" onClick={() => setOff(off + 1)}><ChevronRight size={15} /></button></div></div>
      <div className="grid grid-cols-7 gap-1.5 text-center text-sm">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="rounded-lg bg-[var(--card-background-secondary)] py-1 text-xs font-medium">{d}</div>)}
        {cells.map((d, i) => { if (!d) return <div key={i} />; const k = localDate(new Date(y, m, d)), n = counts[k]?.size ?? 0;
          return <div key={i} title={`${k}: ${n} solved`} className={`grid h-7 place-items-center rounded-lg font-medium ${n ? 'bg-[var(--electric-blue)] text-white' : 'bg-[var(--card-background-secondary)]'} ${k === today ? 'ring-2 ring-[var(--purple)] !rounded-full' : ''}`}>{d}</div>; })}</div>
    </div>);
}
