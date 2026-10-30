import { useId } from 'react';
export default function DSAGrindLogo({ size = 32, wordmark = true, className = '' }: { size?: number; wordmark?: boolean; className?: string }) {
  const g = useId();
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="DSA GRIND logo" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id={g} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed" /><stop offset=".6" stopColor="#4f46e5" /><stop offset="1" stopColor="#2563eb" /></linearGradient></defs>
        <rect width="48" height="48" rx="12" fill={`url(#${g})`} />
        <path d="M32.4 16.9A11 11 0 1 0 35 24H25" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32.4" cy="16.9" r="3" fill="#22d3ee" /><circle cx="25" cy="24" r="2.4" fill="#22d3ee" />
      </svg>
      {wordmark && <span className="text-lg font-extrabold leading-none tracking-tight">DSA <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">GRIND</span></span>}
    </span>);
}
