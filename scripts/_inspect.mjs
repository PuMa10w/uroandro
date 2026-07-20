import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

function lum(r,g,b){const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return a[0]*0.2126+a[1]*0.7152+a[2]*0.0722;}
function parse(c){const m=c.match(/\d+(\.\d+)?/g);return m?m.slice(0,3).map(Number):null;}
function contrast(fg,bg){const f=parse(fg),b=parse(bg);if(!f||!b)return null;const L1=lum(...f),L2=lum(...b);const a=Math.max(L1,L2),bb=Math.min(L1,L2);return ((a+0.05)/(bb+0.05)).toFixed(2);}

async function inspect(name, url) {
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 }).catch(()=>{});
  await page.waitForTimeout(800);
  const data = await page.evaluate(() => {
    const out = {};
    const g = (sel) => document.querySelector(sel);
    const cs = (el) => el ? getComputedStyle(el) : null;
    const h1 = g('h1, .section-title, .hero-title, .service-page-hero h1');
    if (h1) { const s = cs(h1); out.h1 = { text: h1.textContent.slice(0,40), font: s.fontFamily.split(',')[0], size: s.fontSize, weight: s.fontWeight, color: s.color, fill: s.webkitTextFillColor, ls: s.letterSpacing }; }
    const body = g('p, .section-subtitle, .content-block p');
    if (body) { const s = cs(body); out.body = { font: s.fontFamily.split(',')[0], size: s.fontSize, lh: s.lineHeight, color: s.color }; }
    out.bodyBg = cs(document.body).backgroundColor;
    // overflow check
    out.docW = document.documentElement.scrollWidth;
    out.winW = window.innerWidth;
    out.hOverflow = document.documentElement.scrollWidth > window.innerWidth + 2;
    // count cards
    out.cards = document.querySelectorAll('.subsection-card, .theme-card, .disease-card, .service-card-shell, .card, .tool-section, .calculator-card').length;
    // nav
    const nav = g('.navbar, nav, header');
    if (nav) { const s = cs(nav); out.nav = { bg: s.backgroundColor, blur: s.backdropFilter, h: nav.getBoundingClientRect().height }; }
    return out;
  });
  console.log('\n=== ' + name + ' (' + url + ') ===');
  console.log(JSON.stringify(data, null, 1));
}

await inspect('home', '/');
await inspect('urology', '/urology');
await inspect('urology-stones', '/urology/stones');
await inspect('disease', '/urology/stones?disease=urolithiasis');
await inspect('emergency', '/emergency');
await inspect('drugs', '/drugs');
await inspect('calculators', '/calculators');
await inspect('surgery', '/surgery');
await inspect('sitemap', '/sitemap');

// Mobile overflow + typography check
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
for (const url of ['/', '/urology/stones', '/drugs', '/emergency', '/calculators']) {
  await m.goto(BASE + url, { waitUntil: 'networkidle' }).catch(()=>{});
  await m.waitForTimeout(500);
  const r = await m.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    h1fs: (() => { const e = document.querySelector('h1, .section-title, .home-workbench-title'); return e ? getComputedStyle(e).fontSize : null; })(),
  }));
  console.log(`mobile ${url}: hOverflowPx=${r.overflow} h1=${r.h1fs}`);
}
await m.close();

// contrast spot checks on home
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const cc = await page.evaluate(() => {
  function lum(r,g,b){const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return a[0]*0.2126+a[1]*0.7152+a[2]*0.0722;}
  function parse(c){const m=c.match(/\d+(\.\d+)?/g);return m?m.slice(0,3).map(Number):null;}
  function contrast(fg,bg){const f=parse(fg),b=parse(bg);if(!f||!b)return null;const L1=lum(...f),L2=lum(...b);const a=Math.max(L1,L2),bb=Math.min(L1,L2);return ((a+0.05)/(bb+0.05)).toFixed(2);}
  const bg = getComputedStyle(document.body).backgroundColor;
  const el = document.querySelector('p, .section-subtitle, .subsection-card p');
  const fg = el ? getComputedStyle(el).color : null;
  const h1el = document.querySelector('h1, .section-title');
  const h1c = h1el ? getComputedStyle(h1el).webkitTextFillColor || getComputedStyle(h1el).color : null;
  return { bg, textFg: fg, textContrast: contrast(fg, bg) };
});
console.log('\n=== CONTRAST ===', JSON.stringify(cc));

await browser.close();
