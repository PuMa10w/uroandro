import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1280, height: 850 } }).then(c=>c.newPage());
const errs=[]; page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await page.goto('http://localhost:3000/', { waitUntil:'domcontentloaded' });
await page.waitForSelector('button.nav-group-btn', { timeout: 5000 });
console.log('nav-group-btn present');
const names = await page.$$eval('button.nav-group-btn', els => els.map(e=>e.textContent.trim()));
console.log('groups:', JSON.stringify(names));
const items = [['games','Игры'],['glossary','Глоссарий'],['humor','Юмор']];
for (const [id,label] of items) {
  const g = page.locator('button.nav-group-btn', { hasText: 'Инструменты' }).first();
  await g.click({force:true}); await page.waitForTimeout(350);
  const it = page.locator('button.nav-dropdown-item', { hasText: label }).first();
  const found = await it.count();
  let h1='';
  if (found) { await it.click({force:true}); await page.waitForTimeout(1200); h1=(await page.locator('h1,h2').first().textContent().catch(()=>''))||''; }
  const len=(await page.locator('main,[role=region],section').first().textContent().catch(()=>''))?.length||0;
  await page.screenshot({path:`.shots/audit-${id}.png`}).catch(()=>{});
  console.log(`${id}: itemFound=${found} h1="${h1.trim().slice(0,40)}" textLen=${len}`);
}
console.log('ERRORS:', errs.length, errs.slice(0,5).join(' | '));
await browser.close();
