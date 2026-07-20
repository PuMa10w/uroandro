import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile:true, deviceScaleFactor:2 }).then(c=>c.newPage());
const errs=[]; page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await page.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await page.waitForTimeout(800);
// open search
await page.locator('button[aria-label="Открыть поиск"]').click({force:true}).catch(async()=>{ await page.locator('button.search-toggle').click({force:true}); });
await page.waitForTimeout(500);
await page.fill('.search-input', 'цистит').catch(()=>{});
await page.waitForTimeout(800);
const resCount = await page.locator('.search-result, .search-result-item, button:has-text("Цистит")').count();
// click first result
const first = page.locator('.search-result-item, button:has-text("Цистит")').first();
let clicked = await first.count()>0;
if (clicked) { await first.click({force:true}); await page.waitForTimeout(1500); }
const modal = await page.locator('.modal-content, [role=dialog], .disease-modal').count();
const overflow = await page.evaluate(()=>{ const m=document.querySelector('.modal-content,[role=dialog],.disease-modal'); if(!m)return 0; return Math.max(0, m.scrollWidth-window.innerWidth); });
await page.screenshot({path:`.shots/m-modal.png`}).catch(()=>{});
console.log(`searchResults=${resCount} clicked=${clicked} modal=${modal} modalOverflowX=${overflow} errs=${errs.length} ${errs.slice(0,3).join('|')}`);
await browser.close();
