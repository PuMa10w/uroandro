import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + '/drugs', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
const deep = await page.evaluate(() => {
  const g = document.querySelector('.drug-group');
  const s = getComputedStyle(g);
  const before = getComputedStyle(g, '::before');
  const after = getComputedStyle(g, '::after');
  // check the parent of all groups - the section's direct flex
  const sec = document.querySelector('.drug-reference');
  const secS = getComputedStyle(sec);
  // is drug-reference a column flex that stretches? Check align-items
  return {
    group: { minHeight: s.minHeight, height: s.height, maxHeight: s.maxHeight, position: s.position, display: s.display, flexDir: s.flexDirection, alignSelf: s.alignSelf, content: s.content, beforeContent: before.content, beforeH: before.height, afterContent: after.content, afterH: after.height },
    section: { display: secS.display, flexDir: secS.flexDirection, align: secS.alignItems, justify: secS.justifyContent, gap: secS.gap },
  };
});
console.log(JSON.stringify(deep, null, 1));
await browser.close();
