import { chromium } from 'playwright';
const BASE = 'http://localhost:3000/';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 850 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(`[console] ${m.text()}`); });
page.on('pageerror', e => errors.push(`[pageerror] ${e.message}`));

async function openAndClick(groupLabel, itemLabel) {
  await page.waitForSelector('.page-enter', { state: 'detached', timeout: 3000 }).catch(()=>{});
  const g = page.locator('button.nav-group-btn', { hasText: groupLabel }).first();
  if (await g.count()===0) return false;
  await g.click({ timeout: 2000, force: true });
  await page.waitForTimeout(350);
  const it = page.locator(`.nav-dropdown-item:has-text("${itemLabel}")`).first();
  if (await it.count()===0) return false;
  await it.click({ timeout: 2000, force: true });
  return true;
}

const TARGETS = [
  ['urology','Урология',null],['andrology','Андрология',null],
  ['pediatric','Ещё разделы','Детская'],['emergency','Ещё разделы','Экстренные'],
  ['favorites','Инструменты','Избранное'],['surgery','Инструменты','Хирургия'],
  ['metaphylaxis','Инструменты','Диеты при МКБ'],['calculators','Инструменты','Калькуляторы'],
  ['tools','Инструменты','Опросники'],['drugs','Инструменты','Препараты'],
  ['sitemap','Инструменты','Карта сайта'],
  ['games','Игры',null],['glossary','Глоссарий',null],['humor','Юмор',null],
];
const results = [];
for (const [id, group, item] of TARGETS) {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  let ok = false;
  if (item) ok = await openAndClick(group, item);
  else {
    const l = page.locator(`button:has-text("${group}"), a:has-text("${group}")`).first();
    if (await l.count()>0) { await l.click({ timeout: 2000, force: true }); ok = true; }
  }
  await page.waitForTimeout(1300);
  const h1 = (await page.locator('h1, h2').first().textContent().catch(()=> '')) || '';
  const len = (await page.locator('main, [role=region], section').first().textContent().catch(()=>''))?.length || 0;
  await page.screenshot({ path: `.shots/audit-${id}.png`, fullPage: false }).catch(()=>{});
  results.push(`${ok?'OK  ':'FAIL'} ${id.padEnd(13)} | h1="${h1.trim().slice(0,46)}" textLen=${len}`);
}
console.log('=== VISUAL AUDIT ===\n'+results.join('\n'));
const ue = [...new Set(errors)];
console.log('\n=== JS ERRORS ('+ue.length+') ===\n'+(ue.slice(0,40).join('\n')||'none'));
await browser.close();
