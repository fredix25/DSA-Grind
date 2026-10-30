import { describe, it, expect } from 'vitest';
import { pick } from './quotes';
import { allQuotes as quotes } from '../data/quotes2';
import { topics } from '../data/topics';
import { problems } from '../data/problems';
describe('humor + data', () => {
  it('off mode is silent', () => expect(pick('success', 'off')).toBe(''));
  it('chill never uses brainrot-only lines', () => { for (let i = 0; i < 50; i++) { const t = pick('general', 'chill'); expect(quotes.find(q => q.t === t)?.m).toBe(0); } });
  it('every context has a chill line', () => (['success','hard','goal','topic','streak','struggle','general','empty','revision','loading','tip','low'] as const).forEach(c => expect(quotes.some(q => q.c === c && q.m === 0)).toBe(true)));
  it('48 topics, all problem topics exist', () => { expect(topics.length).toBe(48); problems.forEach(p => expect(topics.some(t => t.id === p.topicId)).toBe(true)); });
});

import { describe as d2, it as i2, expect as e2 } from 'vitest';
d2('library size', () => i2('has 100+ quotes', () => e2(quotes.length).toBeGreaterThanOrEqual(100)));
