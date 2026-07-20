import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const shots = [
  { name: 'home', url: '/' },
  { name: 'urology', url: '/urology' },
  { name: 'urology-stones', url: '/urology/stones' },
  { name: 'andrology', url: '/andrology' },
  { name: 'emergency', url: '/emergency' },
  { name: 'calculators', url: '/calculators' },
  { name: 'drugs', url: '/drugs' },
  { name: 'favorites', url: '/favorites' },
  { name: 'surgery', url: '/surgery' },
  { name: 'sitemap', url: '/sitemap' },
  { name: 'disease', url: '/urology/stones?disease=urolithiasis' },
  { name: 'disease-bph', url: '/urology/functional?disease=bph' },
];

const OUT = '/c/Users/rousl/Desktop/projects/uroandro/.shots';
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERR: ' + e.message));

for (const s of shots) {
  try {
    await page.goto(BASE + s.url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: false });
    console.log('shot', s.name);
  } catch (e) {
    console.log('ERR', s.name, e.message);
  }
}

// Mobile shot
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
await m.goto(BASE + '/urology/stones', { waitUntil: 'networkidle' });
await m.waitForTimeout(1000);
await m.screenshot({ path: `${OUT}/mobile-urology.png` });
await m.goto(BASE + '/', { waitUntil: 'networkidle' });
await m.waitForTimeout(1000);
await m.screenshot({ path: `${OUT}/mobile-home.png` });

await browser.close();
console.log('CONSOLE_ERRORS:', errors.length);
errors.slice(0, 20).forEach((e) => console.log(' -', e));
