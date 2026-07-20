import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 850 } }).then(c=>c.newPage());
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const info = await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Урология');
  const cs = getComputedStyle(btn);
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  // walk up to find opaque bg
  let e = btn, bg=null;
  for(let i=0;i<10;i++){ if(!e)break; const b=getComputedStyle(e).backgroundColor; const m=b.match(/rgba?\(([^)]+)\)/); if(m){const p=m[1].split(',').map(Number); if(p[3]!==0 && (p[0]||p[1]||p[2])){bg=b;break;}} e=e.parentElement; }
  return { color: cs.color, bodyBg, resolvedBg: bg, btnBg: cs.backgroundColor };
});
console.log(JSON.stringify(info,null,1));
await browser.close();
