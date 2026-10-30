import { useState } from 'react';
import { RefreshCw, Zap } from 'lucide-react';
import { pick } from '../lib/quotes';
import type { Ctx } from '../data/quotes';
import type { Humor } from '../lib/types';
const KW = /\b(memoization|cooked|cooking|cook|aura|final boss|big W|locked in|lock in|lore|TLE|DP|side quest)\b/gi;
const hl = (q: string) => q.split(KW).map((part, i) => i % 2 === 1 ? <span key={i} className="text-[var(--cyan)] underline decoration-2 underline-offset-4">{part}</span> : part);
export default function QuoteBanner({ ctx, mode }: { ctx: Ctx; mode: Humor }) {
  const cycle: Ctx[] = [ctx, 'general', 'struggle', 'success', 'general', 'revision'];
  const [n, setN] = useState(0), [q, setQ] = useState(() => pick(ctx, mode) || pick('general', 'normal'));
  const refresh = () => { const next = n + 1; setN(next); setQ(pick(cycle[next % cycle.length], mode) || pick('general', mode) || 'Pick one problem. Start small.'); };
  return (
    <section aria-label="Daily motivation" style={{ background: "linear-gradient(90deg,var(--quote-gradient-start),var(--quote-gradient-middle) 50%,var(--quote-gradient-end))" }} className="relative overflow-hidden rounded-3xl bg-gradient-to-r p-4 text-white shadow-[0_10px_30px_rgba(73,33,197,.4)] md:p-5">
      <svg aria-hidden className="pointer-events-none absolute -right-6 -top-6 hidden h-48 w-72 opacity-30 md:block" viewBox="0 0 280 190" fill="none" stroke="#a5b4fc" strokeWidth="2"><circle cx="190" cy="100" r="80" /><circle cx="190" cy="100" r="50" /><path d="M20 160l50-40 40 20 60-70" strokeLinecap="round" /></svg>
      <span className="absolute bottom-3 right-[270px] hidden -rotate-6 font-serif text-4xl font-bold italic text-[var(--cyan)] lg:block">BIG W!</span>
      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl"><span className="inline-flex items-center gap-1 rounded-lg bg-[#DCD4FF] px-3 py-1 text-xs font-bold tracking-wider text-[#2A1480]">DAILY DOSE OF LOCK-IN <Zap size={12} className="text-[#FFAA35]" /></span>
          <p key={q} className="toast-in mt-2 text-xl font-extrabold leading-snug md:text-2xl">“ {hl(q || 'Pick one problem. Start small.')} ”</p><p className="mt-1 text-xs text-[#DCD4FF]">— DSA GRIND</p></div>
        <button onClick={refresh} className="inline-flex items-center gap-2 rounded-xl bg-[var(--sidebar-background)] px-4 py-2.5 text-sm font-bold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Get Another Quote <RefreshCw size={14} /></button>
      </div>
    </section>);
}
