import { quotes, type Ctx } from './quotes';
// ctx|minLevel(0 chill,1 normal,2 brainrot)|text
const raw = `success|1|Another problem solved. Aura +100.
success|2|gng that was NOT supposed to be that clean.
success|2|ts is passing all test cases. Absolute cinema.
success|2|Twin cooked and left no crumbs.
success|1|The compiler said yes. Run it back.
success|2|No cap, that solution is beautiful.
success|0|Accepted. W.
success|2|Bro is fighting for his life against a hashmap and WON.
success|1|The code is clean. The aura is immaculate.
hard|2|Final boss took one look at you and logged off.
hard|1|Hard solved. That one had lore.
hard|2|Generational run. Chat, are we witnessing history?
hard|2|Bro said Hard like it was a suggestion. W.
goal|1|Mission cleared. Go touch grass.
goal|2|Daily goal done. Aura farming, but productive.
goal|0|Goal hit for today. W.
goal|2|Standing on business. Mission complete, twin.
topic|2|Topic lore: completed. Canon event secured.
topic|1|Topic cleared. Pick your next side quest.
topic|0|Topic complete. Review it later to lock it in.
topic|2|The whole topic folded. We are so back.
streak|1|The streak is streaking.
streak|2|Streak going crazy. Consistency aura is real.
streak|0|Streak alive. Small steps count.
streak|2|Lowkey the most consistent person in the chat.
streak|1|One more day, one more W.
streak|2|Twin, the streak is looking majestic.
struggle|1|Stuck is part of the arc. Try a tiny example.
struggle|2|fym the edge case won?? Rematch, gng.
struggle|2|Not every problem needs a nested loop, bro.
struggle|1|Cooked? Temporarily.
struggle|0|Re-read the constraints. They usually hint at the answer.
struggle|2|Lowkey cooked. Highkey recoverable.
struggle|1|Skill issue? Not for long.
struggle|2|We do NOT panic over a null pointer.
struggle|1|A little less panic, a little more binary search.
general|1|One more problem. Then we touch grass.
general|2|bro said O(n^2) and expected us not to notice.
general|2|The base case was right there, gng.
general|2|This recursion tree has more lore than a Netflix series.
general|1|Your future self says thanks.
general|1|This is your training arc.
general|2|ngl, a solved problem a day keeps the imposter syndrome away.
general|2|Chat, should we trust this greedy approach?
general|2|The algorithm is algorithming.
general|2|Bro discovered memoization and never looked back.
general|1|POV: you finally understand sliding window.
general|2|Main character arc: understanding graphs.
general|1|We do not negotiate with TLE.
general|2|iykyk: the answer was a hashmap.
general|2|it's giving optimal complexity.
general|2|Delulu is the solulu, but still read the constraints.
general|0|Small daily practice beats long rare sessions.
general|1|Brain loading... please do not close the tab.
empty|2|Nothing here yet, gng. The side quests are still loading.
empty|1|The checklist is peaceful. Too peaceful.
empty|2|Empty list. NPC behaviour. Go add some lore.
empty|0|Nothing to show yet.
revision|2|The old opps are back. Run it again, twin.
revision|1|You solved this once. Let's see if the knowledge survived.
revision|2|Revision arc: because forgetting is a canon event.
revision|0|Reviewing old problems helps retention.
loading|2|Brain loading... sybau, almost there.
loading|1|Warming up the algorithm...
loading|2|Twin, let him cook. The page is loading.
loading|0|Loading your progress...
tip|1|Click to mark solved. It counts toward your streak.
tip|2|Bookmark it before you forget, bro.
tip|1|Opens on LeetCode in a new tab.
tip|2|Press the checkbox. Aura awaits.
tip|0|Tip: notes help with revision later.
low|1|The comeback arc starts with one question.
low|2|Every expert was once buffering. Bro is loading.
low|0|Everyone starts at zero. Pick one problem.
low|2|Low progress? Lowkey just the first episode.
low|1|Every DSA legend starts somewhere.
general|2|Gng, the only thing standing between you and greatness is one more problem. LOCK IN.
general|2|Twin, that recursion tree has more drama than a Netflix finale.
struggle|1|TLE is temporary. Your comeback arc is forever.
struggle|2|Fym you can't do DP? You haven't even let the memoization cook.
hard|2|Bro is one optimal solution away from generational aura.
struggle|2|The edge cases are talking crazy. Go humble them, twin.
general|1|Today's forecast: 100% chance of cooking.
struggle|1|You got cooked by the problem? Character development.
goal|2|One more question, gng. The side quest is almost cleared.
general|1|Your future self is thanking you for locking in today.
hard|2|Hard problem defeated. Absolute cinema.
struggle|2|The brute-force allegations are looking serious.
struggle|1|Lowkey struggling. Highkey improving.
struggle|2|Chat, we are NOT leaving until we understand the base case.
general|1|The algorithm is not beating you today.
general|1|One day you'll solve this pattern in seconds. Today is part of the lore.
general|2|Bro discovered a monotonic stack and gained forbidden knowledge.
general|1|You don't need motivation every day, twin. Sometimes you just need to open the IDE.
low|1|The comeback arc starts with one checkbox.
struggle|2|Gng, we do not negotiate with TLE.
struggle|2|Stuck on recursion? ong, trust the base case and let the call stack cook.
struggle|1|Fixed the bug after 3 hours. It was a typo. That's DSA lore.
success|2|DP finally clicked. The brainrot was worth it.
topic|2|All nine core questions cleared. Topic lore: finished. We are so back.
streak|2|Streak milestone, no cap. Main character energy.
revision|1|Back to revision: the pattern remembers you.
loading|2|New topic unlocked. Bruh, it's giving final boss prep.
goal|1|One problem from today's goal. Lock in, then touch grass.
success|2|Optimal solution, first try. Skill issue? Not today.
general|2|ts is cooked in the best way. Keep going, twin.`;
const extra = raw.split('\n').map(l => { const [c, m, ...t] = l.split('|'); return { c: c as Ctx, m: +m as 0 | 1 | 2, t: t.join('|') }; });
export const allQuotes = [...quotes, ...extra];
