// scripts/diseaseCardAudit.mjs — every disease card opens & renders content
// Usage: node scripts/diseaseCardAudit.mjs [baseUrl]
import fs from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = process.argv[2] || 'http://localhost:3000';
const outDir = 'test-results/disease-card-audit';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

const list = await (async () => {
  const p = await browser.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  const d = await p.evaluate(async () => {
    const m = await import('/src/data/index.js');
    return m.allDiseases.map((x) => ({ id: x.id, name: x.name, s: x.section, ss: x.subsection }));
  });
  await p.close();
  return d;
})();

console.log('auditing', list.length, 'cards @', BASE);

const results = [];
let errors = [];
page.on('pageerror', (e) => errors.push('PAGEERR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

for (let i = 0; i < list.length; i++) {
  const dz = list[i];
  errors = [];
  // registry URLs: /section/subsection/id, or /section/id when no subsection
  const url = dz.ss
    ? `${BASE}/${dz.s}/${dz.ss}/${dz.id}`
    : `${BASE}/${dz.s}/${dz.id}`;
  const r = { id: dz.id, name: dz.name, url, ok: false, reason: null, tabs: 0, textLen: 0, title: '', consoleErrors: 0 };
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(1100);
    const m = await page.evaluate(() => {
      const modal = document.querySelector('.modal-content');
      const title = document.querySelector('#modal-title, .modal-title, .modal-header h1, .modal-header h2');
      const tabs = document.querySelectorAll('.tabs-shell .tab').length;
      const panel = document.querySelector('.modal-tabpanel');
      return {
        hasModal: !!modal,
        modalH: modal ? Math.round(modal.getBoundingClientRect().height) : 0,
        title: title ? title.textContent.trim().slice(0, 50) : '',
        tabs,
        textLen: panel ? panel.innerText.trim().length : 0,
        hasActionHeader: !!document.querySelector('[data-clinical-action-ready="true"]'),
        emptyState: !!document.querySelector('.no-data, .service-empty-state'),
      };
    });
    r.tabs = m.tabs;
    r.textLen = m.textLen;
    r.title = m.title;
    r.consoleErrors = errors.length;
    if (!m.hasModal) r.reason = 'modal did not open';
    else if (m.tabs === 0) r.reason = 'no tabs rendered';
    else if (m.textLen < 200) r.reason = 'panel content empty (len=' + m.textLen + ')';
    else if (r.consoleErrors > 0) r.reason = 'console errors: ' + errors[0].slice(0, 90);
    else r.ok = true;
  } catch (e) {
    r.reason = 'THROW: ' + String(e.message).slice(0, 110);
  }
  results.push(r);
  if ((i + 1) % 25 === 0) console.log(`  ...${i + 1}/${list.length}`);
}

await browser.close();
const bad = results.filter((x) => !x.ok);
fs.writeFileSync(`${outDir}/report.json`, JSON.stringify({ total: results.length, failed: bad.length, results }, null, 1));
console.log('\nTOTAL:', results.length, '| OK:', results.length - bad.length, '| FAILED:', bad.length);
bad.forEach((b) => console.log('  FAIL', b.id, '|', b.reason, '| tabs:', b.tabs, 'len:', b.textLen));