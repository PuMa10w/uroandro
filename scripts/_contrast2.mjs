import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 850 } }).then(c=>c.newPage());
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const res = await page.evaluate(() => {
  const rgb = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); return m ? m[1].split(',').map(Number) : null; };
  const lum = (c) => { const f = v => { v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4); }; return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2]); };
  function bgOf(el){ let e=el; for(let i=0;i<12;i++){ if(!e) break; const b=rgb(getComputedStyle(e).backgroundColor); if(b && b.length>=3 && b[3]!==0 && (b[0]||b[1]||b[2])) return b; e=e.parentElement; } const pr=rgb(getComputedStyle(document.body).backgroundColor); return pr||[10,14,20]; }
  const els=[...document.querySelectorAll('p,span,a,li,h1,h2,h3,h4,button,label,strong,td,th,small,em')];
  const low=[];
  for(const e of els.slice(0,600)){
    const cs=getComputedStyle(e); if(!e.textContent.trim()||cs.display==='none'||cs.visibility==='hidden')continue;
    const fg=rgb(cs.color); if(!fg)continue; const bl=lum(bgOf(e)); const fl=lum(fg);
    const ratio=(Math.max(fl,bl)+0.05)/(Math.min(fl,bl)+0.05);
    if(ratio<3.0) low.push({t:e.tagName,txt:e.textContent.trim().slice(0,22),r:+ratio.toFixed(2)});
  }
  return {total:els.length, low:low.slice(0,30), count:low.length};
});
console.log('contrast issues:', res.count, '/', res.total);
console.log(JSON.stringify(res.low));
await browser.close();
