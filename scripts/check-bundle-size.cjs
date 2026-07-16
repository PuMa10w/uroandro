/**
 * Bundle size budget guard.
 * Fails CI if the main entry chunk (index-*.js) exceeds the budget.
 * Keeps the app from silently regressing in first-load weight.
 */
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '..', 'build', 'assets');
const BUDGET_BYTES = 460 * 1024; // 460 KB raw (~150 KB gzipped).
// Guard against first-load regressions. The entry chunk includes
// React 19 + react-dom + helmet + app shell + landing + navbar;
// current weight ~443 KB raw. Alarm only on real growth.

function findIndexChunk() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('[size] build/assets not found — run `npm run build` first.');
    process.exit(1);
  }
  const files = fs.readdirSync(BUILD_DIR).filter((f) => /^index-.*\.js$/.test(f));
  if (files.length === 0) {
    console.error('[size] no index-*.js chunk found in build/assets.');
    process.exit(1);
  }
  // pick the largest index chunk (entry)
  return files
    .map((f) => ({ f, size: fs.statSync(path.join(BUILD_DIR, f)).size }))
    .sort((a, b) => b.size - a.size)[0];
}

const chunk = findIndexChunk();
const kb = (chunk.size / 1024).toFixed(1);
const budgetKb = (BUDGET_BYTES / 1024).toFixed(0);

if (chunk.size > BUDGET_BYTES) {
  console.error(
    `[size] ❌ ${chunk.f} is ${kb} KB — exceeds budget of ${budgetKb} KB.\n` +
      '       Reduce first-load JS (code-split, lazy-load, or trim deps) before merging.'
  );
  process.exit(1);
}

console.log(`[size] ✅ ${chunk.f} = ${kb} KB (budget ${budgetKb} KB)`);
process.exit(0);
