import { describe, it, expect } from 'vitest';
import { validate } from './storage';
import { emptyState } from './types';
import { problems } from '../data/problems';
describe('storage', () => {
  it('accepts valid', () => expect(validate(emptyState()).version).toBe(1));
  it('rejects junk', () => { expect(() => validate(null)).toThrow(); expect(() => validate({ version: 2 })).toThrow(); expect(() => validate({ version: 1, solved: 5, activity: [] })).toThrow(); });
});
describe('dataset', () => {
  it('unique ids', () => expect(new Set(problems.map(p => p.id)).size).toBe(problems.length));
  it('no duplicate slugs across topics', () => expect(new Set(problems.map(p => p.slug)).size).toBe(problems.length));
});
