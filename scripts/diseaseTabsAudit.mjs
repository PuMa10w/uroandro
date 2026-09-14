// scripts/diseaseTabsAudit.mjs — every TAB of sampled disease cards renders content
import fs from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = process.argv[2] || 'http://localhost:3000';
const SAMPLE = Number(process.argv[3] || 18);
const outDir = 'test-results/disease-card-audit';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

const list = await (async () => {
  const p = await browser.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  const d = await p.evaluate(async () => {
    const m = await import('/src/data/index.js');
    return m.allDiseases.map((x) => ({ id: x.id, section: x.section, subsection: x.subsection }));
  });
  await p.close();
  return d;
})();

// sample: spread across sections
const bySection = {};
list.forEach((d) => { (bySection[d.section] ||= []).push(d); });
const sample = [];
for (const sec of Object.keys(bySection)) {
  sample.push(...bySection[sec].slice(0, Math.max(2, Math.ceil(SAMPLE / Object.keys(bySection).length))));
}
console.log('tab-audit sample:', sample.length, 'cards');

const emptyTabs = [];
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

for (const dz of sample) {
  errors.length = 0;
  const url = dz.subsection ? `${BASE}/${dz.section}/${dz.subsection}/${dz.id}` : `${BASE}/${dz.section}/${dz.id}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForSelector('.modal-content', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(700);

  const tabs = await page.$$eval('.tabs-shell .tab', (els) => els.map((e) => e.id.replace('tab-', '')));
  for (const tab of tabs) {
    await page.click(`#tab-${tab}`).catch(() => {});
    await page.waitForTimeout(220);
    const r = await page.evaluate((t) => {
      const panel = document.getElementById(`tabpanel-${t}`);
      return { len: panel ? panel.innerText.trim().length : 0, hasNoData: panel ? /Нет данных/.test(panel.innerText) : false };
    }, tab);
    if (r.len < 40) emptyTabs.push({ disease: dz.id, tab, len: r.len });
  }
  if (errors.length) emptyTabs.push({ disease: dz.id, tab: '(page error)', len: 0, err: errors[0].slice(0, 90) });
}

await browser.close();
fs.writeFileSync(`${outDir}/tabs-report.json`, JSON.stringify({ sampled: sample.length, emptyTabs }, null, 1));
console.log('EMPTY/BROKEN TABS:', emptyTabs.length);
emptyTabs.slice(0, 25).forEach((e) => console.log('  ', e.disease, '|', e.tab, '| len', e.len, e.err ? '| ' + e.err : ''));