import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.evaluate(() => document.body.classList.add('light-mode'));
await page.waitForTimeout(300);
const info = await page.evaluate(() => {
  const body = getComputedStyle(document.body);
  const html = getComputedStyle(document.documentElement);
  const bgVar = getComputedStyle(document.body).getPropertyValue('--bg-primary');
  // what rule sets body background?
  return {
    bodyBg: body.backgroundColor,
    bodyBgImage: body.backgroundImage,
    htmlBg: html.backgroundColor,
    bgPrimaryVar: bgVar.trim(),
    bodyHasLightClass: document.body.classList.contains('light-mode'),
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
