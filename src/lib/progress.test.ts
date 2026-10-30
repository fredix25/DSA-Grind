import { describe, it, expect } from 'vitest';
import { overall, topicProgress, nextProblem } from './progress';
import { emptyState } from './types';
import { problems } from '../data/problems';
describe('progress', () => {
  it('new user is 0%', () => { const o = overall(problems, emptyState()); expect(o.done).toBe(0); expect(o.pct).toBe(0); expect(o.remaining).toBe(problems.length); });
  it('counts solved by difficulty', () => { const s = emptyState(); s.solved[problems[0].id] = '2026-10-28'; const o = overall(problems, s); expect(o.done).toBe(1); expect(o.easy.done).toBe(1); expect(o.hard.done).toBe(0); });
  it('mastery needs solved', () => { const s = emptyState(); s.mastered.push(problems[0].id); expect(overall(problems, s).mastered).toBe(0); });
  it('topic status + next', () => { const s = emptyState(); s.solved[problems[0].id] = 'x'; expect(topicProgress(problems, s, 'arrays').status).toBe('In progress'); expect(nextProblem(problems, s)?.id).toBe(problems[1].id); });
});
