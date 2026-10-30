import { useId } from 'react';
export default function ProgressRing({ pct }: { pct: number }) {
  const id = useId(), r = 52, c = 2 * Math.PI * r;
  return <div className="relative mx-auto h-36 w-36"><svg viewBox="0 0 120 120" className="-rotate-90" role="img" aria-label={`${pct}% complete`}><defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#258DFF" /><stop offset="1" stopColor="#38C8F5" /></linearGradient></defs>
    <circle cx="60" cy="60" r={r} fill="none" stroke="#26366E" strokeWidth="10" /><circle cx="60" cy="60" r={r} fill="none" stroke={`url(#${id})`} strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} style={{ transition: 'stroke-dashoffset .6s' }} /></svg>
    <div className="absolute inset-0 grid place-items-center text-center"><div><div className="text-3xl font-extrabold">{pct}%</div><div className="text-xs text-[#DCE5FF]">Complete</div></div></div></div>;
}
