export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Humor = 'off' | 'chill' | 'normal' | 'brainrot';
export interface Problem { id: string; title: string; slug: string; difficulty: Difficulty; topicId: string; pattern: string; objective: string; core: boolean; verified: boolean }
export interface Topic { id: string; name: string; phase: number; description: string; java?: string }
export interface ActivityEvent { date: string; problemId: string; kind: 'solve' | 'log' }
export type Level = 'beginner' | 'intermediate' | 'advanced';
export interface Profile { name: string; level: Level }
export interface ProgressState { profile: Profile | null; version: 1; solved: Record<string, string>; mastered: string[]; bookmarks: string[]; review: string[]; notes: Record<string, string>; activity: ActivityEvent[]; dailyGoal: number; theme: 'light'|'dark'; humor: Humor; checks: Record<string, string[]>; lastTopic: string }
export const emptyState = (): ProgressState => ({ version: 1, profile: null, solved: {}, mastered: [], bookmarks: [], review: [], notes: {}, activity: [], dailyGoal: 1, theme: 'dark', humor: 'brainrot', checks: {}, lastTopic: 'arrays' });
