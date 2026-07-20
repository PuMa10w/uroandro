import { chromium } from 'playwright';
const BASE = 'http://localhost:3000/';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 850 } });
const page = await ctx.newPage();

async function openSection(id, group, item) {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  if (item) {
    const g = page.locator('button.nav-group-btn', { hasText: group }).first();
    await g.click({ force: true }); await page.waitForTimeout(300);
    await page.locator(`.nav-dropdown-item:has-text("${item}")`).first().click({ force: true });
  } else {
    await page.locator(`button:has-text("${group}")`).first().click({ force: true });
  }
  await page.waitForTimeout(1200);
}

// metrics: horizontal overflow, empty sections, unstyled headings
const sections = [
  ['urology','Урология',null],['andrology','Андрология',null],
  ['pediatric','Ещё разделы','Детская'],['emergency','Ещё разделы','Экстренные'],
  ['favorites','Инструменты','Избранное'],['surgery','Инструменты','Хирургия'],
  ['metaphylaxis','Инструменты','Диеты при МКБ'],['calculators','Инструменты','Калькуляторы'],
  ['tools','Инструменты','Опросники'],['drugs','Инструменты','Препараты'],
  ['sitemap','Инструменты','Карта сайта'],
];
const out = [];
for (const [id, g, it] of sections) {
  await openSection(id, g, it);
  const m = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const winW = window.innerWidth;
    const overflowX = docW > winW + 1 ? (docW - winW) : 0;
    // empty blocks (section/article/card with no text and small height)
    const cards = [...document.querySelectorAll('.subsection-card,.disease-card,.tool-section,.calculator-card,.service-card-shell,.meta-rule-card,.emergency-card,.sitemap-item,.favorite-card')];
    let emptyCards = 0;
    cards.forEach(c => { if ((c.textContent||'').trim().length < 3) emptyCards++; });
    // headings with default serif/size (unstyled)
    const hs = [...document.querySelectorAll('h1,h2,h3,h4')];
    let unstyledFont = 0;
    hs.slice(0,20).forEach(h => {
      const fs = getComputedStyle(h).fontSize;
      const ff = getComputedStyle(h).fontFamily;
      if (fs === '16px' || /serif/.test(ff) && fs==='16px') unstyledFont++;
    });
    return { overflowX, cards: cards.length, emptyCards, headings: hs.length };
  });
  out.push(`${id.padEnd(13)} | overflowX=${m.overflowX}px cards=${m.cards} emptyCards=${m.emptyCards} headings=${m.headings}`);
}
console.log(out.join('\n'));
await browser.close();
