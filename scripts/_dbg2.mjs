import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 850 } }).then(c=>c.newPage());
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const g = page.locator('button.nav-group-btn', { hasText: 'Ещё разделы' }).first();
console.log('group found:', await g.count());
await g.click({ force: true });
await page.waitForTimeout(500);
const dd = await page.evaluate(() => {
  const d = document.querySelector('.nav-dropdown');
  if (!d) return 'NO DROPDOWN';
  return [...d.querySelectorAll('button')].map(b=>b.textContent.trim());
});
console.log('dropdown items:', JSON.stringify(dd));
await browser.close();
