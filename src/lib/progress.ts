import type { Problem, ProgressState, Difficulty } from './types';
export const overall = (ps: Problem[], s: ProgressState) => {
  const solved = ps.filter(p => s.solved[p.id]);
  const by = (d: Difficulty) => ({ done: solved.filter(p => p.difficulty === d).length, total: ps.filter(p => p.difficulty === d).length });
  return { total: ps.length, done: solved.length, remaining: ps.length - solved.length, pct: ps.length ? Math.round(solved.length / ps.length * 100) : 0,
    mastered: ps.filter(p => s.mastered.includes(p.id) && s.solved[p.id]).length, review: ps.filter(p => s.review.includes(p.id)).length,
    easy: by('Easy'), medium: by('Medium'), hard: by('Hard') };
};
export const topicProgress = (ps: Problem[], s: ProgressState, topicId: string) => {
  const t = ps.filter(p => p.topicId === topicId && p.core); const d = t.filter(p => s.solved[p.id]).length;
  return { done: d, total: t.length, status: d === 0 ? 'Not started' : d < t.length ? 'In progress' : 'Core completed' };
};
export const nextProblem = (ps: Problem[], s: ProgressState) => ps.find(p => !s.solved[p.id]);
