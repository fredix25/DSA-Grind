// Usage: npm run check-links  (needs internet). Verifies each slug resolves via LeetCode's GraphQL title lookup.
import { readFileSync } from 'node:fs';
const src = readFileSync('src/data/problems.ts', 'utf8');
const rows = [...src.matchAll(/\['([^']+(?:\\'[^']*)*)','([a-z0-9-]+)','(Easy|Medium|Hard)'/g)];
let bad = 0;
for (const [, title, slug, diff] of rows) {
  const r = await fetch('https://leetcode.com/graphql', { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'query($s:String!){question(titleSlug:$s){title difficulty}}', variables: { s: slug } }) });
  const q = (await r.json())?.data?.question;
  if (!q || q.difficulty !== diff) { bad++; console.log(`MISMATCH ${slug}: expected ${diff}, got`, q); }
  await new Promise(r => setTimeout(r, 600));
}
console.log(`${rows.length} checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
