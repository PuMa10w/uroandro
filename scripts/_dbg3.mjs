import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 850 } }).then(c=>c.newPage());
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
// What intercepts a click at the button's center?
const probe = await page.evaluate(() => {
  const g = [...document.querySelectorAll('button.nav-group-btn')].find(b=>b.textContent.includes('Ещё разделы'));
  const r = g.getBoundingClientRect();
  const cx = r.left + r.width/2, cy = r.top + r.height/2;
  const el = document.elementFromPoint(cx, cy);
  return { rect: {x:r.x,y:r.y,w:r.width,h:r.height}, topEl: el ? el.tagName+'.'+el.className+' / '+el.textContent.trim().slice(0,20) : 'none' };
});
console.log('probe:', JSON.stringify(probe));
// Try real mouse click at coordinates
await page.mouse.click(probe.rect.x + probe.rect.w/2, probe.rect.y + probe.rect.h/2);
await page.waitForTimeout(400);
const dd = await page.evaluate(() => {
  const d = document.querySelector('.nav-dropdown');
  return d ? [...d.querySelectorAll('button')].map(b=>b.textContent.trim()) : 'NO DROPDOWN';
});
console.log('after mouse click dropdown:', JSON.stringify(dd));
await browser.close();
