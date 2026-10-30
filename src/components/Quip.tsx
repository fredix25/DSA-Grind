import { useMemo } from 'react';
import { pick } from '../lib/quotes';
import type { Ctx } from '../data/quotes';
import type { Humor } from '../lib/types';
export default function Quip({ ctx, mode, k, className = '' }: { ctx: Ctx; mode: Humor; k?: string; className?: string }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const t = useMemo(() => pick(ctx, mode), [ctx, mode, k]);
  if (!t) return null;
  return <p className={`text-sm italic text-violet-600 dark:text-violet-300 ${className}`}>{t}</p>;
}
