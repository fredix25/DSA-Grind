import { describe, it, expect } from 'vitest';
import { reactionKind } from './reaction';
import { celebrate, unsolveMessage } from './celebrate';
import * as C from '../data/celebrate';
import { emptyState } from './types';
import { problems } from '../data/problems';
const T = '2026-10-29', byDiff = (d: string) => problems.find(p => p.difficulty === d && p.topicId === 'arrays')!;
describe('reactions', () => {
  it('first ever', () => expect(reactionKind(emptyState(), byDiff('Easy'), problems, T)).toBe('first'));
  const used = () => { const s = emptyState(); s.dailyGoal = 5; s.solved['x'] = '2026-10-01'; s.activity.push({ date: '2026-10-01', problemId: 'x', kind: 'solve' }); return s; };
  it('hard / medium / easy', () => { expect(reactionKind(used(), byDiff('Hard'), problems, T)).toBe('hard'); expect(reactionKind(used(), byDiff('Medium'), problems, T)).toBe('medium'); expect(reactionKind(used(), byDiff('Easy'), problems, T)).toBe('easy'); });
  it('topic clear needs ALL core solved', () => { const s = used(); const core = problems.filter(p => p.topicId === 'arrays' && p.core); expect(reactionKind(s, core[0], problems, T)).not.toBe('topic'); core.slice(1).forEach(p => (s.solved[p.id] = T)); expect(reactionKind(s, core[0], problems, T)).toBe('topic'); });
  it('daily goal', () => { const s = used(); s.dailyGoal = 1; expect(reactionKind(s, byDiff('Easy'), problems, T)).toBe('goal'); });
  it('revision problem', () => { const s = used(); const p = byDiff('Medium'); s.review.push(p.id); expect(reactionKind(s, p, problems, T)).toBe('revision'); });
  it('streak milestone', () => { const s = used(); s.activity = ['2026-10-27', '2026-10-28'].map(d => ({ date: d, problemId: 'y', kind: 'solve' as const })); expect(reactionKind(s, byDiff('Easy'), problems, T)).toBe('streak'); });
});
describe('celebrations', () => {
  it('50+ general messages', () => expect(C.general.length).toBeGreaterThanOrEqual(50));
  it('never repeats back to back', () => { let prev = ''; for (let i = 0; i < 300; i++) { const m = celebrate('easy', 'brainrot'); expect(m).not.toBe(prev); prev = m; } });
  it('unsolve is not a success line', () => { for (let i = 0; i < 20; i++) { const m = unsolveMessage(); expect(C.general).not.toContain(m); expect(C.unsolve).toContain(m); } });
  it('hard uses hard pool, off is neutral', () => { expect(C.hard).toContain(celebrate('hard', 'normal')); expect(celebrate('hard', 'off')).toBe('Marked as solved.'); });
});
