import { emptyState, type ProgressState } from './types';
const KEY = 'dsa-grind:v1';
export function load(): ProgressState {
  try { const raw = localStorage.getItem(KEY); if (!raw) return emptyState(); return validate(JSON.parse(raw)); } catch { return emptyState(); }
}
export function validate(x: any): ProgressState {
  if (!x || x.version !== 1 || typeof x.solved !== 'object' || !Array.isArray(x.activity)) throw new Error('Invalid progress file');
  const m = { ...emptyState(), ...x }; if (typeof m.humor !== 'string') m.humor = m.humor === false ? 'off' : 'normal'; if (!['off','chill','normal','brainrot'].includes(m.humor)) m.humor = 'normal'; return m;
}
export const save = (s: ProgressState) => localStorage.setItem(KEY, JSON.stringify(s));
