import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERR: ' + e.message));

const urls = ['/', '/urology', '/urology/stones', '/urology/stones?disease=urolithiasis', '/andrology', '/emergency', '/calculators', '/drugs', '/surgery', '/sitemap', '/favorites'];
const results = [];
for (const u of urls) {
  await page.goto(BASE + u, { waitUntil: 'networkidle' }).catch(()=>{});
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const cs = (el) => el ? getComputedStyle(el) : null;
    const h1 = document.querySelector('h1, .section-title, .home-workbench-title');
    const grain = cs(document.body)['::after'] ? getComputedStyle(document.body, '::after') : null;
    // check grain layer exists
    const bodyAfter = getComputedStyle(document.body, '::after');
    const overflow = document.documentElement.scrollWidth - window.innerWidth;
    return {
      h1size: h1 ? cs(h1).fontSize : null,
      grainOpacity: bodyAfter.opacity,
      grainBlend: bodyAfter.mixBlendMode,
      overflow,
    };
  });
  results.push({ u, ...r });
}
console.log('PAGES CHECK:');
results.forEach(r => console.log(`  ${r.u.padEnd(42)} h1=${r.h1size} grain=${r.grainOpacity}/${r.grainBlend} overflow=${r.overflow}px`));

// Mobile overflow sweep
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
let mobOverflow = [];
for (const u of ['/', '/urology', '/urology/stones', '/andrology', '/emergency', '/calculators', '/drugs', '/surgery']) {
  await m.goto(BASE + u, { waitUntil: 'networkidle' }).catch(()=>{});
  await m.waitForTimeout(400);
  const o = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (o > 1) mobOverflow.push(`${u}=${o}px`);
}
console.log('MOBILE OVERFLOW:', mobOverflow.length ? mobOverflow.join(', ') : 'none');
console.log('CONSOLE ERRORS:', errors.length);
errors.slice(0,10).forEach(e => console.log('  -', e));
await browser.close();
