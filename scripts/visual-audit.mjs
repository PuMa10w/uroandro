import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4173';
const OUT = 'visual-audit';
mkdirSync(OUT, { recursive: true });

const pages = [
  { name: 'home', url: '/' },
  { name: 'urology', url: '/#/urology' },
  { name: 'urology-stones', url: '/#/urology/stones' },
  { name: 'andrology', url: '/#/andrology' },
  { name: 'metaphylaxis', url: '/#/metaphylaxis' },
  { name: 'calculators', url: '/#/calculators' },
  { name: 'drugs', url: '/#/drugs' },
  { name: 'emergency', url: '/#/emergency' },
  { name: 'surgery', url: '/#/surgery' },
  { name: 'games', url: '/#/games' },
  { name: 'sitemap', url: '/#/sitemap' },
];

const shots = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const p of pages) {
  await page.goto(BASE + p.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const file = `${OUT}/${p.name}.png`;
  await page.screenshot({ path: file, fullPage: false });
  shots.push(file);
}

// Open a disease modal on urology/stones
await page.goto(BASE + '/#/urology/stones', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const btn = await page.$('button:has-text("Мочекаменная болезнь")');
if (btn) {
  await btn.click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/modal-disease.png`, fullPage: false });
  shots.push(`${OUT}/modal-disease.png`);
}

// Mobile view of modal
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
const mpage = await mctx.newPage();
await mpage.goto(BASE + '/#/urology/stones', { waitUntil: 'networkidle' });
await mpage.waitForTimeout(1500);
const mbtn = await mpage.$('button:has-text("Мочекаменная болезнь")');
if (mbtn) {
  await mbtn.click();
  await mpage.waitForTimeout(1200);
  await mpage.screenshot({ path: `${OUT}/modal-disease-mobile.png`, fullPage: false });
  shots.push(`${OUT}/modal-disease-mobile.png`);
}
await mctx.close();

await browser.close();
console.log('SHOTS:', shots.join(', '));
