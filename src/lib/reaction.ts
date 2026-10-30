import type { Problem, ProgressState } from './types';
import { countOn, currentStreak } from './streak';
export type Kind = 'first' | 'topic' | 'goal' | 'streak' | 'revision' | 'session' | 'hard' | 'medium' | 'easy';
export const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100];
// `s` is the state BEFORE the problem is marked solved.
export function reactionKind(s: ProgressState, p: Problem, all: Problem[], today: string): Kind {
  const solved = { ...s.solved, [p.id]: today };
  const activity = [...s.activity, { date: today, problemId: p.id, kind: 'solve' as const }];
  if (Object.keys(s.solved).length === 0 && s.activity.length === 0) return 'first';
  const core = all.filter(x => x.topicId === p.topicId && x.core);
  if (p.core && core.length > 0 && core.every(x => solved[x.id])) return 'topic';
  const n = countOn(activity, today);
  if (n === s.dailyGoal && countOn(s.activity, today) < s.dailyGoal) return 'goal';
  if (n === 1 && STREAK_MILESTONES.includes(currentStreak(activity, today))) return 'streak';
  if (s.review.includes(p.id)) return 'revision';
  if (n >= 3) return 'session';
  return p.difficulty === 'Hard' ? 'hard' : p.difficulty === 'Medium' ? 'medium' : 'easy';
}
