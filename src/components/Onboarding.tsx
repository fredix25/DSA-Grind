import { useState } from 'react';
import DSAGrindLogo from './DSAGrindLogo';
import type { Level, ProgressState } from '../lib/types';
import { startTopic } from '../lib/profile';
export default function Onboarding({ s, setS }: { s: ProgressState; setS: (x: ProgressState) => void }) {
  const [name, setName] = useState(''), [level, setLevel] = useState<Level>('beginner'), [goal, setGoal] = useState(s.dailyGoal || 1);
  const has = Object.keys(s.solved).length > 0, ok = name.trim().length > 0;
  const submit = () => ok && setS({ ...s, profile: { name: name.trim(), level }, dailyGoal: goal, lastTopic: has ? s.lastTopic : startTopic(level) });
  const chip = (on: boolean) => `rounded-xl border px-4 py-2 text-sm font-semibold transition ${on ? 'border-transparent bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow' : 'border-white/15 text-slate-300 hover:bg-white/10'}`;
  return (
    <div className="shell grid place-items-center p-4"><div className="w-full max-w-lg rounded-3xl bg-[#0b1030] p-8 text-slate-100 shadow-2xl">
      <DSAGrindLogo size={48} />
      <h1 className="mt-6 text-3xl font-extrabold leading-tight">Welcome to DSA GRIND. Let's build your coding aura.</h1>
      {has && <p className="mt-2 text-sm text-cyan-300">We found your saved progress. It stays safe.</p>}
      <label className="mt-6 block text-sm font-semibold">What should we call you?<input autoFocus value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} maxLength={30} placeholder="Your name" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base outline-none focus:border-blue-400" /></label>
      <fieldset className="mt-5"><legend className="text-sm font-semibold">What is your current DSA level?</legend><div className="mt-2 flex flex-wrap gap-2">{(['beginner', 'intermediate', 'advanced'] as const).map(l => <button key={l} type="button" aria-pressed={level === l} className={chip(level === l)} onClick={() => setLevel(l)}>{l[0].toUpperCase() + l.slice(1)}</button>)}</div></fieldset>
      <fieldset className="mt-5"><legend className="text-sm font-semibold">Problems you want to solve daily</legend><div className="mt-2 flex flex-wrap gap-2">{[1, 2, 3, 5, 10].map(g => <button key={g} type="button" aria-pressed={goal === g} className={chip(goal === g)} onClick={() => setGoal(g)}>{g}</button>)}</div></fieldset>
      <button disabled={!ok} onClick={submit} className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-base font-extrabold tracking-wide text-white transition enabled:hover:opacity-90 disabled:opacity-40">LET'S LOCK IN →</button>
      {!ok && <p className="mt-2 text-center text-xs text-slate-400">Enter your name to continue.</p>}
    </div></div>);
}
