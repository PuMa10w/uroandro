import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + '/drugs', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
// open group index 1 and inspect its card count
const res = await page.evaluate(() => {
  const groups = [...document.querySelectorAll('.drug-group')];
  const g1 = groups[1];
  g1.querySelector('.drug-group-title').click();
  return { g1Name: groups[1].querySelector('.drug-group-title').textContent.trim().slice(0,30) };
});
await page.waitForTimeout(400);
const after = await page.evaluate(() => {
  const groups = [...document.querySelectorAll('.drug-group')];
  const openG = groups.find(g => g.classList.contains('is-open'));
  const cards = openG ? openG.querySelectorAll('.drug-card').length : 0;
  return { openGroupName: openG?.querySelector('.drug-group-title').textContent.trim().slice(0,30), cardsInOpen: cards };
});
console.log('clicked:', res.g1Name);
console.log('after click:', JSON.stringify(after));
// screenshot light mode home + drugs
await page.evaluate(() => document.body.classList.add('light-mode'));
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: '.shots/light-home.png' });
await page.goto(BASE + '/drugs', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.screenshot({ path: '.shots/light-drugs.png' });
console.log('shots saved');
await browser.close();
