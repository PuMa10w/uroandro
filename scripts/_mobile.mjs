import { chromium } from 'playwright';
const browser = await chromium.launch();
async function audit(w, h, label) {
  const page = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w<700, deviceScaleFactor:2 }).then(c=>c.newPage());
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto('http://localhost:3000/', { waitUntil:'networkidle' });
  await page.waitForTimeout(700);
  // open a disease: click a subsection card then a disease
  let overflow = 0, modalOpened=false, modalOverflow=0;
  try {
    const sc = page.locator('.home-destination-card').first();
    await sc.click({force:true}); await page.waitForTimeout(1000);
    const card = page.locator('.subsection-card, .disease-card').first();
    if (await card.count()) { await card.click({force:true}); await page.waitForTimeout(1500); modalOpened = await page.locator('.modal-content, .disease-modal, [role=dialog]').count()>0;
      modalOverflow = await page.evaluate(()=>{ const m=document.querySelector('.modal-content,[role=dialog]'); if(!m)return 0; return Math.max(0, m.scrollWidth-window.innerWidth); });
    }
  } catch(e){ errs.push('nav:'+e.message.slice(0,40)); }
  overflow = await page.evaluate(()=> Math.max(0, document.documentElement.scrollWidth - window.innerWidth));
  await page.screenshot({path:`.shots/m-${label}.png`, fullPage:false}).catch(()=>{});
  console.log(`${label} (${w}x${h}): pageOverflowX=${overflow} modalOpened=${modalOpened} modalOverflowX=${modalOverflow} errs=${errs.length}`);
  await page.close();
}
await audit(390,844,'iphone12');
await audit(360,740,'small-android');
await audit(768,1024,'ipad');
await browser.close();
