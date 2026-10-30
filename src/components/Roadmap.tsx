import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { topics, phases } from '../data/topics';
import { problems } from '../data/problems';
import type { Store } from '../lib/store';
import { ProblemRow, ProgressBar } from './ui';
import { pick } from '../lib/quotes';
import Quip from './Quip';
const checks = [['explain', 'I can explain the pattern'], ['solve', 'I can solve representative problems independently'], ['complexity', 'I can explain time and space complexity'], ['recognize', 'I can recognize when to use it'], ['variation', 'I can solve a variation without copying a solution']];
function Topic({ i, id, st, focus }: { i: number; id: string; st: Store; focus?: string }) {
  const t = topics.find(x => x.id === id)!, [open, setOpen] = useState(focus === id), [side, setSide] = useState(false);
  const core = problems.filter(p => p.topicId === id && p.core), extra = problems.filter(p => p.topicId === id && !p.core);
  const done = core.filter(p => st.s.solved[p.id]).length, ex = extra.filter(p => st.s.solved[p.id]).length, c = st.s.checks[id] ?? [];
  const d = (k: string) => { const a = core.filter(p => p.difficulty === k); return `${k} ${a.filter(p => st.s.solved[p.id]).length}/${a.length}`; };
  return (
    <div className="card p-0">
      <button aria-expanded={open} aria-controls={`t-${id}`} onClick={() => { setOpen(!open); st.setS(p => ({ ...p, lastTopic: id })); }} className="flex w-full items-center gap-3 p-4 text-left">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-500/15 text-sm font-bold text-violet-600 dark:text-violet-300">{i}</span>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 font-semibold">{t.name}{c.length === 5 && <span className="rounded bg-emerald-500/15 px-1.5 text-xs text-emerald-500">Mastered</span>}{!core.length && <span className="rounded bg-slate-500/15 px-1.5 text-xs text-slate-500">Problems pending</span>}</div>
          <div className="text-xs text-slate-500">{t.description}</div>
          {core.length > 0 && <div className="mt-2 flex items-center gap-3"><div className="flex-1"><ProgressBar n={done} t={core.length} label={`${t.name} core progress`} /></div><span className="text-xs text-slate-500">{done}/{core.length} core · {d('Easy')} · {d('Medium')} · {d('Hard')}</span></div>}</div>
        <ChevronDown className={`shrink-0 transition ${open ? 'rotate-180' : ''}`} size={18} />
      </button>
      {open && <div id={`t-${id}`} className="space-y-4 border-t border-slate-200 p-4 dark:border-white/10">
        <Quip ctx={core.length > 0 && done === core.length ? 'topic' : done === 0 ? 'low' : 'general'} mode={st.s.humor} k={id} /><section><h4 className="mb-1 text-sm font-semibold">Learn the pattern</h4><p className="text-sm text-slate-600 dark:text-slate-300">{t.description} {t.java && <><br /><span className="font-medium">Java tip:</span> {t.java}</>}</p>{!t.java && <p className="text-xs text-slate-500">Detailed notes and Java tips for this topic are not written yet.</p>}</section>
        <section><h4 className="mb-1 text-sm font-semibold">Core questions — the main quest ({done}/{core.length})</h4>
          {core.length ? <ul>{core.map(p => <ProblemRow key={p.id} p={p} st={st} />)}</ul> : <p className="text-sm text-slate-500">No verified problems curated yet. {pick('empty', st.s.humor)}</p>}
          {core.length > 0 && core.length < 9 && <p className="text-xs text-amber-500">Gap flagged: only {core.length} of 9 core problems curated.</p>}</section>
        <section><button className="btn" aria-expanded={side} onClick={() => setSide(!side)}><Sparkles size={14} />Side quests ({ex}/{extra.length})</button>
          {side && (extra.length ? <ul className="mt-2">{extra.map(p => <ProblemRow key={p.id} p={p} st={st} />)}</ul> : <p className="mt-2 text-sm text-slate-500">No side quests curated yet.</p>)}</section>
        <section><h4 className="mb-1 text-sm font-semibold">Mastery check (manual — solving problems does not auto-master a topic)</h4>
          {checks.map(([k, l]) => <label key={k} className="flex items-center gap-2 py-0.5 text-sm"><input type="checkbox" className="accent-violet-600" checked={c.includes(k)} onChange={() => st.check(id, k)} />{l}</label>)}</section>
      </div>}
    </div>);
}
export default function Roadmap({ st, focus }: { st: Store; focus?: string }) {
  return <div className="space-y-8">{phases.map((ph, pi) => { const ts = topics.filter(t => t.phase === pi + 1); const ps = problems.filter(p => ts.some(t => t.id === p.topicId) && p.core);
    return <section key={ph}><div className="mb-2 flex items-baseline justify-between"><h2 className="text-lg font-bold">Phase {pi + 1} — {ph}</h2><span className="text-xs text-slate-500">{ps.filter(p => st.s.solved[p.id]).length}/{ps.length} core solved</span></div><Quip ctx="general" mode={st.s.humor} k={ph} className="mb-2" />
      <div className="space-y-2">{ts.map(t => <Topic key={t.id} i={topics.indexOf(t) + 1} id={t.id} st={st} focus={focus} />)}</div></section>; })}</div>;
}
