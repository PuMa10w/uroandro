import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 850 } }).then(c=>c.newPage());
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const info = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button')];
  return btns.map(b => ({ cls: b.className, txt: b.textContent.trim().slice(0,30) }))
    .filter(b => /nav-group|Ещё|Инструменты|Детская|Экстрен|Избран|Хирург|Диеты|Кальк|Опрос|Препар|Карта/.test(b.cls+b.txt));
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
