import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Check for content density / empty gaps on key pages
async function density(name, url) {
  await page.goto(BASE + url, { waitUntil: 'networkidle' }).catch(()=>{});
  await page.waitForTimeout(700);
  const d = await page.evaluate(() => {
    const main = document.querySelector('#main-content, .page-content, main, [role=region]');
    if (!main) return { err: 'no main' };
    const rect = main.getBoundingClientRect();
    const kids = main.children.length;
    // measure largest vertical gap between children (top-level blocks)
    const blocks = [...main.children].map(c => c.getBoundingClientRect()).sort((a,b)=>a.top-b.top);
    let maxGap = 0, atY = 0;
    for (let i=1;i<blocks.length;i++){
      const gap = blocks[i].top - (blocks[i-1].top + blocks[i-1].height);
      if (gap > maxGap) { maxGap = gap; atY = blocks[i].top; }
    }
    // footer presence
    const footer = !!document.querySelector('footer');
    const h = main.scrollHeight;
    // count buttons/links
    const btns = main.querySelectorAll('button, a[role=button], .subsection-card, .disease-card').length;
    // font of body text
    const p = main.querySelector('p, .section-subtitle');
    const pFont = p ? getComputedStyle(p).fontSize : null;
    return { h: Math.round(rect.height), kids, maxGapPx: Math.round(maxGap), atY: Math.round(atY), footer, interactive: btns, pFont };
  });
  console.log(name.padEnd(22), JSON.stringify(d));
}

await density('home', '/');
await density('urology', '/urology');
await density('stones', '/urology/stones');
await density('disease', '/urology/stones?disease=urolithiasis');
await density('calculators', '/calculators');
await density('emergency', '/emergency');
await density('drugs', '/drugs');
await density('surgery', '/surgery');

// Task 3: locate tallest element on /drugs (bug: 320k px height)
await page.goto(BASE + '/drugs', { waitUntil: 'networkidle' }).catch(()=>{});
await page.waitForTimeout(900);
const tall = await page.evaluate(() => {
  const els = [...document.querySelectorAll('#main-content *')];
  let worst = null, maxH = 0;
  for (const e of els) {
    const h = e.getBoundingClientRect().height;
    if (h > maxH) { maxH = h; worst = e; }
  }
  // also report scrollHeight of main
  const main = document.querySelector('#main-content');
  return {
    tag: worst?.tagName,
    cls: (worst?.className && worst.className.toString) ? worst.className.toString().slice(0,80) : null,
    h: Math.round(maxH),
    mainScrollH: main ? main.scrollHeight : null,
  };
});
console.log('TALLEST /drugs:', JSON.stringify(tall));

// Light theme check on home
await page.goto(BASE + '/', { waitUntil:'networkidle' });
await page.waitForTimeout(400);
await page.evaluate(() => document.body.classList.add('light-mode'));
await page.waitForTimeout(300);
const lt = await page.evaluate(() => ({
  bg: getComputedStyle(document.body).backgroundColor,
  grain: getComputedStyle(document.body,'::after').opacity,
}));
console.log('light-mode', JSON.stringify(lt));

await browser.close();
