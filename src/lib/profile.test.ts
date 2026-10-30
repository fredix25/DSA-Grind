import { describe, it, expect } from 'vitest';
import { startTopic, daysAgo } from './profile';
import { problems } from '../data/problems';
import { validate } from './storage';
import { emptyState } from './types';
describe('profile', () => {
  it('start topics exist with problems', () => (['beginner', 'intermediate', 'advanced'] as const).forEach(l => expect(problems.some(p => p.topicId === startTopic(l))).toBe(true)));
  it('old saves without a profile keep progress', () => { const old: any = { ...emptyState(), solved: { a: '2026-10-01' } }; delete old.profile; const v = validate(old); expect(v.profile).toBeNull(); expect(v.solved.a).toBe('2026-10-01'); });
  it('daysAgo', () => { expect(daysAgo('2026-10-30', '2026-10-30')).toBe('today'); expect(daysAgo('2026-10-29', '2026-10-30')).toBe('yesterday'); expect(daysAgo('2026-10-27', '2026-10-30')).toBe('3d ago'); });
});
