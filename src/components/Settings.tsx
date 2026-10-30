import { useRef } from 'react';
import { Download, Upload, Trash2, UserX } from 'lucide-react';
import type { Store } from '../lib/store';
import { validate } from '../lib/storage';
import { emptyState, type Humor, type Level } from '../lib/types';
const field = 'mt-1 block w-full rounded-xl border bg-white p-2 dark:border-white/10 dark:bg-[#0d1530]';
export default function Settings({ st }: { st: Store }) {
  const { s, setS } = st, f = useRef<HTMLInputElement>(null), pr = s.profile ?? { name: '', level: 'beginner' as Level };
  const exp = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' })); a.download = 'dsa-grind-progress.json'; a.click(); };
  const imp = async (file?: File) => { if (!file) return; try { setS(validate(JSON.parse(await file.text()))); } catch { alert('Not a valid DSA GRIND backup.'); } };
  return <div className="card max-w-xl space-y-4">
    <label className="block text-sm font-semibold">Name<input value={pr.name} maxLength={30} onChange={e => setS({ ...s, profile: { ...pr, name: e.target.value } })} onBlur={() => !pr.name.trim() && s.profile && setS({ ...s, profile: { ...pr, name: 'gng' } })} className={field} /></label>
    <label className="block text-sm font-semibold">DSA level<select value={pr.level} onChange={e => setS({ ...s, profile: { ...pr, level: e.target.value as Level } })} className={field}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label>
    <label className="block text-sm font-semibold">Daily goal (problems)<input type="number" min={1} max={20} value={s.dailyGoal} onChange={e => setS({ ...s, dailyGoal: Math.min(20, Math.max(1, +e.target.value || 1)) })} className={`${field} !w-24`} /></label>
    <label className="block text-sm font-semibold">Humor level<select value={s.humor} onChange={e => setS({ ...s, humor: e.target.value as Humor })} className={field}><option value="off">Off</option><option value="chill">Chill</option><option value="normal">Normal</option><option value="brainrot">Maximum Brainrot</option></select></label>
    <div className="flex flex-wrap gap-2"><button className="btn" onClick={() => setS({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' })}>Theme: {s.theme}</button><button className="btn" onClick={exp}><Download size={14} />Export JSON</button>
      <button className="btn" onClick={() => f.current?.click()}><Upload size={14} />Import JSON</button><input ref={f} hidden type="file" accept="application/json" onChange={e => imp(e.target.files?.[0])} /></div>
    <div className="flex flex-wrap gap-2 border-t pt-3 dark:border-white/10"><button className="btn text-amber-600" onClick={() => confirm('Reset your profile? Your problem progress is kept, and you will be asked for your name again.') && setS({ ...s, profile: null })}><UserX size={14} />Reset profile</button>
      <button className="btn text-rose-500" onClick={() => confirm('Reset ALL progress? This cannot be undone. Your profile and settings are kept.') && setS({ ...emptyState(), profile: s.profile, theme: s.theme, humor: s.humor, dailyGoal: s.dailyGoal })}><Trash2 size={14} />Reset progress</button></div></div>;
}
