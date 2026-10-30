import { describe, it, expect } from 'vitest';
import { currentStreak, longestStreak, activeDays } from './streak';
const e = (date: string, problemId = 'a'): any => ({ date, problemId, kind: 'solve' });
describe('streaks', () => {
  it('counts duplicates once', () => expect(activeDays([e('2026-10-27'), e('2026-10-27','b')]).length).toBe(1));
  it('consecutive days', () => expect(currentStreak([e('2026-10-26'), e('2026-10-27'), e('2026-10-28')], '2026-10-28')).toBe(3));
  it('streak alive if today not yet done', () => expect(currentStreak([e('2026-10-26'), e('2026-10-27')], '2026-10-28')).toBe(2));
  it('missed day breaks', () => expect(currentStreak([e('2026-10-25'), e('2026-10-26')], '2026-10-28')).toBe(0));
  it('month boundary', () => expect(longestStreak([e('2026-10-31'), e('2026-11-01'), e('2026-11-02')])).toBe(3));
  it('DST-safe longest', () => expect(longestStreak([e('2026-03-07'), e('2026-03-08'), e('2026-03-09'), e('2026-03-12')])).toBe(3));
  it('empty', () => expect(currentStreak([], '2026-10-28')).toBe(0));
});
