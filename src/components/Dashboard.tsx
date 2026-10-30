import { useMemo } from 'react';
import { Flame, Target, CheckCircle2, PlayCircle, Box, ArrowRight, Trophy, Zap, AlertTriangle } from 'lucide-react';
import { problems } from '../data/problems';
import { topics } from '../data/topics';
import type { Store } from '../lib/store';
import { overall, topicProgress } from '../lib/progress';
import { currentStreak, localDate, countOn } from '../lib/streak';
import { ProgressBar } from './ui';
import MonthCalendar from './MonthCalendar';
import ProgressRing from './ProgressRing';
import { pick } from '../lib/quotes';
import { startTopic, daysAgo } from '../lib/profile';
import type { Ctx } from '../data/quotes';
export const dailyPick = () => { const un = problems.filter(p => p.core); const d = localDate(); let h = 0; for (const c of d) h = (h * 31 + c.charCodeAt(0)) % 100000; return un[h % un.length]; };
const dot = { Easy: 'bg-emerald-400', Medium: 'bg-amber-400', Hard: 'bg-rose-500' } as const;
export const quoteCtx = (st: Store): Ctx => { const s = st.s, o = overall(problems, s); return countOn(s.activity, localDate()) >= s.dailyGoal ? 'goal' : s.review.length ? 'revision' : currentStreak(s.activity) >= 3 ? 'streak' : o.done === 0 ? 'low' : 'general'; };
export default function Dashboard({ st, go }: { st: Store; go: (v: string, topic?: string) => void }) {
  const { s } = st, name = s.profile?.name ?? 'gng', today = localDate(), o = overall(problems, s), streak = currentStreak(s.activity), tdone = countOn(s.activity, today);
  const sub = useMemo(() => pick(o.done === 0 ? 'low' : 'general', s.humor) || 'One more problem and we\'re so back.', [s.humor, o.done]);
  const hasP = (id: string) => problems.some(p => p.topicId === id);
  const topicId = o.done === 0 && s.profile ? startTopic(s.profile.level) : hasP(s.lastTopic) ? s.lastTopic : 'arrays';
  const topic = topics.find(t => t.id === topicId)!, tp = topicProgress(problems, s, topicId), tpct = tp.total ? Math.round(tp.done / tp.total * 100) : 0;
  const daily = dailyPick();
  const recent = Object.entries(s.solved).sort((a, b) => b[1].localeCompare(a[1])).slice(0, 3).map(([id, d]) => ({ p: problems.find(p => p.id === id)!, d })).filter(x => x.p);
  const weak = topics.filter(t => hasP(t.id)).map(t => ({ t, ...topicProgress(problems, s, t.id), rev: problems.filter(p => p.topicId === t.id && s.review.includes(p.id)).length }))
    .filter(x => x.done > 0 && (x.rev > 0 || x.done / x.total < 0.5)).sort((a, b) => a.done / a.total - b.done / b.total).slice(0, 3);
  const stat = 'card flex items-center gap-3 !p-4';
  return (
    <div className="grid gap-3 lg:grid-cols-[1.15fr_1.15fr_.8fr]">
      <div className="lg:col-span-3"><h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] md:text-4xl">Yo, <span className="text-[var(--purple)]">{name}</span>. Ready to cook? 💀</h1><p className="mt-1 text-base text-[var(--text-secondary)]">{sub}</p></div>
      <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2">
        <div className={`${stat} !bg-[var(--stat-streak)]`}><Flame className="text-[#FF8A36]" size={34} /><div><div className="text-2xl font-extrabold">{streak}</div><div className="text-sm">Day Streak</div><div className="text-xs text-slate-500 dark:text-slate-300">{streak ? 'Keep going, twin!' : 'Solve one to start'}</div></div></div>
        <div className={`${stat} flex-col !items-stretch !gap-2 !bg-[var(--stat-goal)]`}><div className="flex items-center gap-3"><Target className="text-rose-500" size={34} /><div><div className="text-2xl font-extrabold">{tdone} / {s.dailyGoal}</div><div className="text-sm">Today's Goal</div></div></div><ProgressBar n={Math.min(tdone, s.dailyGoal)} t={s.dailyGoal} label="Daily goal" /></div>
        <div className={`${stat} flex-col !items-stretch !gap-2 !bg-[var(--stat-progress)]`}><div className="flex items-center gap-3"><CheckCircle2 className="text-[var(--green)]" size={34} /><div><div className="text-2xl font-extrabold">{o.pct}%</div><div className="text-sm">Overall Progress</div></div></div><ProgressBar n={o.done} t={o.total} label="Overall" fill="var(--green)" /></div></div>
      <div className="relative hidden lg:block" aria-hidden><span className="absolute left-4 top-6 -rotate-6 font-serif text-3xl italic text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,.7)]">Lock in.</span><svg className="absolute right-4 top-0 h-24 w-24 opacity-60" viewBox="0 0 100 100" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"><path d="M10 80l25-45 20 30 15-20 20 35z" /><path d="M30 20l8 12 8-12 8 12 8-12" stroke="#facc15" /></svg></div>
      <div className="card h-full"><div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-2 text-lg font-bold"><PlayCircle className="text-blue-600" />Continue Learning</h2><button onClick={() => go('roadmap')} className="flex items-center gap-1 text-sm font-medium text-[var(--electric-blue)]">View Roadmap <ArrowRight size={13} /></button></div>
        <div className="tile flex items-center gap-3"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--purple)] to-[var(--deep-purple)] text-white"><Box size={26} /></span>
          <div className="min-w-0 flex-1"><div className="font-bold">{topic.name}</div><div className="text-sm text-slate-500 dark:text-slate-300">{tp.done} / {tp.total} core questions</div><div className="flex items-center gap-2"><div className="flex-1"><ProgressBar n={tp.done} t={tp.total} label="Topic progress" /></div><span className="text-xs">{tpct}%</span></div></div>
          <button className="btn btn-primary" onClick={() => go('roadmap', topicId)}>Continue <ArrowRight size={14} /></button></div></div>
      <div className="lg:row-span-1 lg:col-start-2 lg:row-start-3 lg:-mt-0"><MonthCalendar events={s.activity} /></div>
      <div className="ring-card relative overflow-hidden text-center lg:col-start-3 lg:row-start-3"><ProgressRing pct={o.pct} /><p className="mt-2 text-sm text-[#DCE5FF]">{o.done === 0 ? 'Everyone starts at zero, gng.' : 'You\'re doing so well, gng! 🎉'}</p>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-white/10 p-2 text-sm">{(['Easy', 'Medium', 'Hard'] as const).map(k => { const v = k === 'Easy' ? o.easy : k === 'Medium' ? o.medium : o.hard; return <div key={k}><div className="flex items-center justify-center gap-1 font-bold"><span className={`h-2 w-2 rounded-full ${dot[k]}`} />{v.done}</div><div className="text-xs">{k}</div></div>; })}</div></div>
      <div className="dark-card relative overflow-hidden lg:col-start-1 lg:row-start-4"><h2 className="flex items-center gap-2 text-lg font-bold"><Trophy className="text-yellow-400" />Today's Challenge</h2>
        <p className="mt-2 pr-20 font-semibold">{daily.title}</p><p className="pr-20 text-sm text-indigo-200">{daily.difficulty} · {daily.pattern}. Show them who's boss 😈</p>
        <div className="mt-4 flex items-center gap-3"><a href={`https://leetcode.com/problems/${daily.slug}/`} target="_blank" rel="noreferrer" className="rounded-xl bg-[var(--purple)] px-5 py-2 text-sm font-bold">Start Challenge →</a>
          <label className="flex items-center gap-1.5 text-sm"><input type="checkbox" className="h-4 w-4 accent-cyan-400" checked={!!s.solved[daily.id]} onChange={() => st.toggle(daily.id)} />Solved</label></div>
        <svg aria-hidden className="absolute -right-4 -top-2 h-36 w-36 opacity-60" viewBox="0 0 120 120" fill="none"><circle cx="70" cy="70" r="46" stroke="#a5b4fc" strokeWidth="6" /><circle cx="70" cy="70" r="28" stroke="#fb7185" strokeWidth="6" /><circle cx="70" cy="70" r="9" fill="#fb7185" /><path d="M70 70L112 22" stroke="#facc15" strokeWidth="5" strokeLinecap="round" /></svg></div>
      <div className="card lg:col-start-2 lg:row-start-4"><div className="mb-2 flex items-center justify-between"><h2 className="flex items-center gap-2 font-bold"><Zap size={16} className="text-blue-600" />Recent Activity</h2><button onClick={() => go('library')} className="text-xs font-medium text-blue-600">See all →</button></div>
        {recent.length ? <ul className="space-y-2.5">{recent.map(({ p, d }) => <li key={p.id} className="flex items-center gap-2 text-sm"><CheckCircle2 size={18} className="shrink-0 text-[var(--green)]" /><span className="min-w-0 flex-1 truncate">{p.title}</span><span className="shrink-0 text-xs text-slate-500">{p.difficulty} • {daysAgo(d, today)}</span></li>)}</ul> : <p className="text-sm text-slate-500">Nothing solved yet. The first W is one checkbox away.</p>}</div>
      <div className="card lg:col-start-3 lg:row-start-4"><h2 className="flex items-center gap-2 font-bold"><AlertTriangle size={16} className="text-orange-500" />Weak Topics</h2><p className="mb-2 text-xs text-slate-500">Revise these topics, twin!</p>
        {weak.length ? <ul className="space-y-2">{weak.map(w => <li key={w.t.id}><button onClick={() => go('roadmap', w.t.id)} className="w-full text-left text-sm"><div className="flex justify-between"><span className="truncate">{w.t.name}</span><span>{Math.round(w.done / w.total * 100)}%</span></div><div className="h-1.5 rounded-full bg-[var(--progress-track)]"><div className="h-1.5 rounded-full bg-[var(--orange)]" style={{ width: `${w.done / w.total * 100}%` }} /></div></button></li>)}</ul> : <p className="text-sm text-slate-500">Nothing weak yet. Solve a few problems first.</p>}</div>
          </div>);
}
