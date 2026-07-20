import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERR: ' + e.message));

// Light mode bg should NOT be transparent after Task 1 fix
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.evaluate(() => document.body.classList.add('light-mode'));
await page.waitForTimeout(300);
const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
console.log('light-mode body bg:', lightBg, lightBg === 'rgba(0, 0, 0, 0)' ? 'FAIL(transparent)' : 'OK');

// Drugs accordion: only one group open, clicking toggles
await page.evaluate(() => document.body.classList.remove('light-mode'));
await page.goto(BASE + '/drugs', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const acc = await page.evaluate(() => {
  const groups = [...document.querySelectorAll('.drug-group')];
  const open = groups.filter(g => g.classList.contains('is-open')).length;
  const firstTitle = groups[0]?.querySelector('.drug-group-title');
  const listVisible = groups[0]?.querySelector('.drug-list') ? true : false;
  // count total cards rendered (should be only open group's)
  const cards = document.querySelectorAll('.drug-card').length;
  return { totalGroups: groups.length, openGroups: open, firstListVisible: listVisible, cardsRendered: cards };
});
console.log('DRUGS accordion:', JSON.stringify(acc));

// click second group title, expect it opens and others collapse
await page.evaluate(() => {
  const g = document.querySelectorAll('.drug-group')[1];
  g?.querySelector('.drug-group-title')?.click();
});
await page.waitForTimeout(400);
const acc2 = await page.evaluate(() => {
  const groups = [...document.querySelectorAll('.drug-group')];
  return { openGroups: groups.filter(g => g.classList.contains('is-open')).length };
});
console.log('after click group[1]:', JSON.stringify(acc2));

// footer badges present
const footer = await page.evaluate(() => ({
  badges: document.querySelectorAll('.footer-guideline-badge').length,
  disclaimer: !!document.querySelector('.footer-disclaimer'),
}));
console.log('FOOTER:', JSON.stringify(footer));

console.log('PAGE ERRORS:', errors.length, errors.slice(0,5));
await browser.close();
