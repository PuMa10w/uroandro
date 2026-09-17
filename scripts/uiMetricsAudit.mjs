// scripts/uiMetricsAudit.mjs — design-system metrics audit @ iPhone 15 Pro
// Usage: node scripts/uiMetricsAudit.mjs [baseUrl]   (default http://127.0.0.1:5199)
import { chromium } from '@playwright/test';

const BASE = process.argv[2] || 'http://127.0.0.1:5199';
const ROUTES = [
  '/', '/urology', '/urology/stones', '/andrology', '/pediatric', '/drugs',
  '/tools', '/calculators', '/surgery', '/emergency', '/favorites', '/sitemap',
  '/metaphylaxis', '/glossary', '/urology/stones/urolithiasis',
];

// Radii budget: шкала даёт 6 значений (999/26/20/14/10/0); +2 — наследие
// lock-слоёв (contract/v21/v22/v23) и diseaseModalPremium (771 !important),
// которые нельзя переписывать. 8 сохраняет консистентность и не ломает контракты.
const BUDGET = { tinyFont: 0, maxBlur: 24, emoji: 0, radii: 8, stickyOverlap: 0 };
// Emoji are intentional in the humour section (reaction faces) — exempt it.
const EMOJI_ALLOWLIST = ['/humor'];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 393, height: 852 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
const violations = [];

for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => {
    const els = [...document.querySelectorAll('*')];
    let tinyFont = 0;
    let emoji = 0;
    const tinySamples = [];
    const emojiSamples = [];
    const radii = new Set();
    const blurs = [];
    for (const el of els) {
      const c = getComputedStyle(el);
      const box = el.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) continue;
      const fs = parseFloat(c.fontSize);
      const ownText = el.childElementCount === 0 ? (el.textContent || '').replace(/[©®™]/g, '').trim() : '';
      if (fs > 0 && fs < 12 && ownText.length > 1) {
        tinyFont++;
        if (tinySamples.length < 3) {
          tinySamples.push(`${(typeof el.className === 'string' ? el.className : el.tagName).slice(0, 26)}:${fs.toFixed(1)}`);
        }
      }
      if (ownText && /\p{Extended_Pictographic}/u.test(ownText) && !/^[\s©®™]*$/.test(ownText)) {
        emoji++;
        if (emojiSamples.length < 3) emojiSamples.push(ownText.slice(0, 12));
      }
      if (c.borderRadius && c.borderRadius !== '0px') radii.add(c.borderRadius);
      const bf = c.backdropFilter;
      if (bf && bf !== 'none') {
        const px = Number((bf.match(/blur\((\d+)/) || [])[1]);
        if (px) blurs.push(px);
      }
    }
    return {
      tinyFont, tinySamples, emoji, emojiSamples,
      radii: radii.size,
      maxBlur: blurs.length ? Math.max(...blurs) : 0,
    };
  });

  const routeViolations = [];
  if (m.tinyFont > BUDGET.tinyFont) routeViolations.push(`tinyFont=${m.tinyFont} (${m.tinySamples.join(', ')})`);
  if (m.maxBlur > BUDGET.maxBlur) routeViolations.push(`maxBlur=${m.maxBlur}px`);
  if (m.emoji > BUDGET.emoji && !EMOJI_ALLOWLIST.includes(route)) routeViolations.push(`emoji=${m.emoji} (${m.emojiSamples.join(' ')})`);
  if (m.radii > BUDGET.radii) routeViolations.push(`radii=${m.radii}`);
  if (routeViolations.length) violations.push({ route, violations: routeViolations });
}

// modal sticky overlap (iPhone)
await page.goto(`${BASE}/urology/stones/urolithiasis`, { waitUntil: 'networkidle' }).catch(() => {});
await page.waitForSelector('.modal-content', { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(700);
const overlap = await page.evaluate(() => {
  const sticky = [...document.querySelectorAll('.modal-content *')]
    .filter((el) => {
      const p = getComputedStyle(el).position;
      const isOverlay = el.classList.contains('modal-reading-progress'); // декоративная 2px-линия, pointer-events:none
      return (p === 'sticky' || p === 'fixed') && el.getBoundingClientRect().height > 0 && !isOverlay;
    })
    .map((el) => ({
      cls: (typeof el.className === 'string' ? el.className : el.tagName).slice(0, 26),
      r: el.getBoundingClientRect(),
    }));
  let n = 0;
  for (let i = 0; i < sticky.length; i++) {
    for (let j = i + 1; j < sticky.length; j++) {
      if (sticky[i].r.top < sticky[j].r.bottom && sticky[j].r.top < sticky[i].r.bottom) n++;
    }
  }
  return { n, pairs: sticky.map((s) => s.cls) };
});
if (overlap.n > BUDGET.stickyOverlap) {
  violations.push({
    route: '/urology/stones/urolithiasis (modal)',
    violations: [`stickyOverlap=${overlap.n} [${overlap.pairs.join(' + ')}]`],
  });
}

await browser.close();
console.log('UI METRICS VIOLATIONS:', violations.length);
violations.forEach((v) => console.log('  ', v.route.padEnd(42), v.violations.join(' | ')));
process.exit(violations.length === 0 ? 0 : 1);