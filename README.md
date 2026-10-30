# DSA GRIND 2.0
Lock in. Solve problems. Become cracked at DSA.
Run: `npm install && npm run dev` | `npm test` | `npm run build` | `npm run check-links` (needs internet)

## Built
App shell + sidebar (8 views), dashboard, collapsible 40-topic roadmap in 7 phases (Learn / Core / Side quests / Mastery check), problem library with filters, revision queue, bookmarks, daily challenge, heatmap, streaks, notes, export/import/reset, light/dark, 4 humor levels with a tagged quote library and activity-aware toasts.

## Not done / honest limits
- Problems exist for only 5 of 40 topics (43 problems). The other 35 show "Problems pending".
- No side-quest (additional) problems curated yet; the section and separate tracking are implemented.
- All problems are `verified: false` until `npm run check-links` passes (leetcode.com was unreachable when built).
- Quote library has ~85 lines, not 100+. Learn-the-pattern text is thin for most topics.
- UI has not been checked in a real browser; mobile layout untested.
