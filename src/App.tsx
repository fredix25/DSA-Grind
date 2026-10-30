import { useState, useEffect } from 'react';
import { Home, Map as MapIcon, Code2, Trophy, RefreshCw, Bookmark, BarChart3, FileText, Settings as Gear, Menu, X, Search, Bell, ChevronDown, Flame, Sun, Moon } from 'lucide-react';
import { useStore } from './lib/store';
import Dashboard, { dailyPick, quoteCtx } from './components/Dashboard';
import Roadmap from './components/Roadmap';
import Library from './components/Library';
import Settings from './components/Settings';
import Notes from './components/Notes';
import Heatmap from './components/Heatmap';
import Quip from './components/Quip';
import Onboarding from './components/Onboarding';
import QuoteBanner from './components/QuoteBanner';
import DSAGrindLogo from './components/DSAGrindLogo';
import { ProblemRow } from './components/ui';
import { problems } from './data/problems';
import { overall } from './lib/progress';
import { currentStreak } from './lib/streak';
const nav = [['dashboard', 'Home', Home], ['roadmap', 'DSA Roadmap', MapIcon], ['library', 'Problem Library', Code2], ['daily', 'Daily Challenge', Trophy], ['revision', 'Revision Queue', RefreshCw], ['bookmarks', 'Bookmarks', Bookmark], ['analytics', 'Progress Analytics', BarChart3], ['notes', 'Notes', FileText], ['settings', 'Settings', Gear]] as const;
export default function App() {
  const st = useStore(), { s } = st, [v, setV] = useState('dashboard'), [splash, setSplash] = useState(true), [menu, setMenu] = useState(false), [focus, setFocus] = useState(''), [q, setQ] = useState(''), [sq, setSq] = useState('');
  useEffect(() => { const t = setTimeout(() => setSplash(false), 1100); return () => clearTimeout(t); }, []);
  const go = (k: string, topic?: string) => { setV(k); setFocus(topic ?? ''); setMenu(false); };
  const o = overall(problems, s), streak = currentStreak(s.activity), dark = s.theme === 'dark';
  if (splash) return <div className="shell grid place-items-center text-white" role="status"><div className="text-center"><DSAGrindLogo size={64} className="flex-col !gap-3 text-3xl" /><Quip ctx="loading" mode={s.humor} className="mt-2 !text-violet-200" /></div></div>;
  if (!s.profile) return <Onboarding s={s} setS={st.setS} />;
  const view = v === 'dashboard' ? <Dashboard st={st} go={go} /> : v === 'roadmap' ? <Roadmap key={focus} st={st} focus={focus} /> : v === 'library' ? <Library key={sq} st={st} ctx="empty" initialQ={sq} />
    : v === 'revision' ? <Library st={st} preset="review" ctx="revision" /> : v === 'bookmarks' ? <Library st={st} preset="bookmarks" ctx="empty" /> : v === 'notes' ? <Notes st={st} /> : v === 'settings' ? <Settings st={st} />
    : v === 'daily' ? <div className="card max-w-xl"><Quip ctx="general" mode={s.humor} k="daily" className="mb-2" /><p className="mb-2 text-sm text-slate-500">Today's pick (same all day, changes at local midnight)</p><ul><ProblemRow p={dailyPick()} st={st} showTopic /></ul></div>
    : <div className="space-y-3"><div className="card"><div className="mb-2 text-xs text-slate-500">Activity (20 weeks)</div><Heatmap events={s.activity} /></div><div className="card text-sm">Solved {o.done}/{o.total} · Easy {o.easy.done}/{o.easy.total} · Medium {o.medium.done}/{o.medium.total} · Hard {o.hard.done}/{o.hard.total} · Mastered {o.mastered}</div></div>;
  const title = nav.find(n => n[0] === v)?.[1];
  return (
    <div className="shell p-2 md:p-3">
      <div className="app">
        <aside className="side flex flex-col p-4" aria-label="Main navigation">
          <div className="flex items-center justify-between lg:px-1 lg:pb-5"><DSAGrindLogo size={40} /><button className="btn !border-white/20 !text-white lg:hidden" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={18} /> : <Menu size={18} />}</button></div>
          <div className={`${menu ? 'flex' : 'hidden'} mt-3 flex-1 flex-col lg:mt-0 lg:flex`}>
            <nav className="flex flex-col gap-1">{nav.map(([k, l, I]) => <button key={k} onClick={() => go(k)} aria-current={v === k ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${v === k ? 'bg-[var(--sidebar-active)] text-white shadow-lg' : 'text-slate-200 hover:bg-[var(--sidebar-secondary)]'}`}><I size={18} className="shrink-0" />{l}{k === 'revision' && o.review > 0 && <span className="ml-auto rounded-full bg-rose-500 px-1.5 text-xs text-white">{o.review}</span>}</button>)}</nav>
            <div className="mt-5 rounded-2xl border border-[var(--sidebar-border)] bg-[var(--sidebar-secondary)] p-3 text-center"><div className="text-xs text-slate-300">Current Streak</div><div className="flex items-center justify-center gap-2 text-2xl font-extrabold"><Flame className="text-[#FF8A36]" />{streak} {streak === 1 ? 'day' : 'days'}</div><div className="text-xs text-slate-300">{streak ? "You're on fire!" : 'Solve one to start'}</div></div>
            <p className="mt-4 -rotate-2 px-2 font-serif text-lg italic text-violet-200">Keep going, {s.profile.name}!</p>
            <div className="mt-auto pt-6"><button onClick={() => st.setS({ ...s, theme: dark ? 'light' : 'dark' })} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className="flex w-full items-center justify-between rounded-full border border-[var(--sidebar-border)] bg-[var(--sidebar-secondary)] px-4 py-2.5"><Sun size={16} className="text-[var(--orange)]" /><span className="relative h-6 w-11 rounded-full bg-[var(--purple)]"><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${dark ? 'left-[22px]' : 'left-0.5'}`} /></span><Moon size={16} className="text-[#C9BFFF]" /></button></div>
          </div>
        </aside>
        <div className="panel flex flex-col p-3 md:p-4 lg:overflow-hidden">
          <header className="header-bar">
            <label className="header-search"><Search size={16} /><input aria-label="Search all problems" placeholder="Search problems, topics..." value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { setSq(q); setV('library'); setMenu(false); } }} className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300" /></label>
            <button onClick={() => go('revision')} aria-label={`Revision queue, ${o.review} waiting`} className="header-btn relative p-2.5"><Bell size={16} />{o.review > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />}</button>
            <button onClick={() => go('settings')} aria-label="Profile and settings" className="header-btn flex items-center gap-2 p-1 pr-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[var(--purple)] to-[var(--electric-blue)] font-bold">{s.profile.name[0]?.toUpperCase()}</span><ChevronDown size={14} /></button>
          </header>
          <main className="p-1 pt-4 md:p-4 lg:flex-1 lg:overflow-y-auto">
            {v !== 'dashboard' && <><h2 className="mb-1 text-2xl font-extrabold">{title}</h2><Quip ctx={v === 'revision' ? 'revision' : v === 'bookmarks' || v === 'notes' ? 'empty' : 'general'} mode={s.humor} k={v} className="mb-4" /></>}
            {view}
          </main>
          {v === 'dashboard' && <div className="px-1 pb-1 md:px-4 lg:shrink-0"><QuoteBanner ctx={quoteCtx(st)} mode={s.humor} /></div>}
        </div>
      </div>
      {st.toast && <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4"><div key={st.toast.id} role="status" aria-live="polite" className={`toast-in max-w-md rounded-2xl px-4 py-2 text-center text-sm font-bold shadow-xl ${st.toast.tone === 'win' ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white' : 'bg-slate-800 text-slate-100'}`}>{st.toast.msg}</div></div>}
    </div>);
}
