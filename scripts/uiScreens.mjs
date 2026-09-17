// scripts/uiScreens.mjs — iPhone 15 Pro screenshots of every page (both themes)
import fs from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = process.argv[2] || 'http://127.0.0.1:5199';
const OUT = 'ui-review';
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  '/', '/urology', '/urology/stones', '/urology/stones/urolithiasis', '/andrology',
  '/andrology/fertility', '/pediatric', '/drugs', '/tools', '/calculators', '/surgery',
  '/emergency', '/favorites', '/sitemap', '/metaphylaxis', '/glossary',
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 393, height: 852 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});

for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(900);
  const name = route === '/' ? 'home' : route.replaceAll('/', '_');
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.evaluate(() => document.body.classList.add('light-mode'));
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${OUT}/${name}--light.png` });
  await page.evaluate(() => document.body.classList.remove('light-mode'));
}

await browser.close();
console.log('screens:', fs.readdirSync(OUT).length, 'in', OUT);