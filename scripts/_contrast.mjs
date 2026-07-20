import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 850 } }).then(c=>c.newPage());
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const lowContrast = await page.evaluate(() => {
  const lum = (rgb) => {
    const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); };
    return 0.2126*f(rgb[0])+0.7152*f(rgb[1])+0.0722*f(rgb[2]);
  };
  const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); return m? m[1].split(',').map(Number): null; };
  const pb = parse(getComputedStyle(document.body).backgroundColor) || [10,14,20];
  const res = [];
  const els = [...document.querySelectorAll('p,span,a,li,h1,h2,h3,h4,button,label,strong,td,th')];
  for (const e of els.slice(0,500)) {
    const cs = getComputedStyle(e);
    if (!e.textContent.trim() || cs.visibility==='hidden' || cs.display==='none') continue;
    const fg = parse(cs.color); if (!fg) continue;
    let bl = lum(pb); const bg = parse(cs.backgroundColor);
    if (bg && bg.length>=3 && bg[3]!==0 && (bg[0]||bg[1]||bg[2])) bl = lum(bg);
    const ratio = (Math.max(lum(fg),bl)+0.05)/(Math.min(lum(fg),bl)+0.05);
    if (ratio < 3.0) res.push({ t:e.tagName, txt:e.textContent.trim().slice(0,24), ratio:+ratio.toFixed(2) });
  }
  return res.slice(0,25);
});
console.log('LOW CONTRAST (<3.0):', lowContrast.length);
console.log(JSON.stringify(lowContrast));
await browser.close();
