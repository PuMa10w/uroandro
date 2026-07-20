import { chromium } from 'playwright';

const BASE = 'http://localhost:4173';
const pages = ['home','urology','urology-stones','andrology','metaphylaxis','calculators','drugs','emergency','surgery','games','sitemap','pediatric','glossary','tools'];
const urlFor = p => p === 'home' ? '/' : `/#/${p}`;

const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 }).then(c => c.newPage());

const audit = [];
for (const p of pages) {
  await page.goto(BASE + urlFor(p), { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  const m = await page.evaluate(() => {
    const h = document.querySelector('.section-title, .home-workbench-title, h1, h2');
    const card = document.querySelector('.subsection-card, .premium-card, .service-card, .disease-card, .tool-card');
    const cs = h ? getComputedStyle(h) : null;
    const cc = card ? getComputedStyle(card) : null;
    return {
      heading: h ? h.innerText.slice(0, 24) : 'NONE',
      hClip: cs ? cs.webkitBackgroundClip : 'n/a',
      hSize: cs ? cs.fontSize : 'n/a',
      hWeight: cs ? cs.fontWeight : 'n/a',
      cardBg: cc ? cc.backgroundColor : 'n/a',
      cardRadius: cc ? cc.borderRadius : 'n/a',
      cardShadow: cc ? (cc.boxShadow === 'none' ? 'none' : 'has') : 'n/a',
      cardBlur: cc ? cc.backdropFilter : 'n/a',
    };
  });
  audit.push({ page: p, ...m });
}
await browser.close();
console.log(JSON.stringify(audit, null, 1));
