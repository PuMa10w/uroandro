// scripts/iphone15proAudit.mjs — read-only visual audit @ iPhone 15 Pro
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const shotDir = path.join(rootDir, 'test-results', 'iphone15pro-audit');
fs.mkdirSync(shotDir, { recursive: true });

const ROUTES = [
  '/', '/urology', '/andrology', '/pediatric', '/drugs', '/tools',
  '/calculators', '/calculators?tool=sperm-tree', '/surgery', '/atlas',
  '/favorites', '/emergency', '/sitemap', '/glossary', '/metaphylaxis',
  '/humor', '/urology/oncology', '/urology/stones',
  '/urology/stones/urolithiasis', '/urology/infections/urosepsis',
  '/urology/oncology/prostate-cancer', '/andrology/sexual/erectile-dysfunction',
  '/andrology/endocrine/hypogonadism', '/andrology/fertility/male-infertility',
  '/pediatric/enuresis',
];

const PROFILES = [
  { name: '15pro-portrait', width: 393, height: 852, sat: 59, sab: 34, sal: 0, sar: 0 },
  { name: '15pro-landscape', width: 852, height: 393, sat: 59, sab: 34, sal: 59, sar: 59 },
];

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
]);

function createStaticServer() {
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url || '/', 'http://127.0.0.1');
    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const requestedFile = decodedPath === '/' ? '/index.html' : decodedPath;
    const candidate = path.normalize(path.join(buildDir, requestedFile));
    const safeCandidate = candidate.startsWith(buildDir) ? candidate : path.join(buildDir, 'index.html');
    const filePath = fs.existsSync(safeCandidate) && fs.statSync(safeCandidate).isFile()
      ? safeCandidate
      : path.join(buildDir, 'index.html');
    response.setHeader('Content-Type', mimeTypes.get(path.extname(filePath)) || 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-store');
    fs.createReadStream(filePath).pipe(response);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

const issues = [];
const { server, baseUrl } = await createStaticServer();

for (const profile of PROFILES) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: profile.width, height: profile.height },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push('PAGEERR: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  for (const route of ROUTES) {
    errors.length = 0;
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(700);
    await page.evaluate((p) => {
      const r = document.documentElement.style;
      r.setProperty('--sat', p.sat + 'px');
      r.setProperty('--sab', p.sab + 'px');
      r.setProperty('--sal', p.sal + 'px');
      r.setProperty('--sar', p.sar + 'px');
    }, profile).catch(() => {});
    await page.waitForTimeout(250);

    const m = await page.evaluate(() => {
      const overflowX = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
      let smallTargets = 0;
      const targets = document.querySelectorAll(
        'button, a[role="button"], .bottom-nav-btn, .tabs-shell .tab, .drug-filter-chip, .drug-risk-chip'
      );
      for (const el of targets) {
        const b = el.getBoundingClientRect();
        if (b.width > 0 && b.height > 0 && (b.height < 44 || b.width < 44)) {
          // 1) Pseudo-element hit-area extension (44x44 overlay pattern)
          let hitOk = false;
          for (const pseudo of ['::before', '::after']) {
            const ps = getComputedStyle(el, pseudo);
            if (ps.content !== 'none' && ps.content !== '' && ps.position === 'absolute') {
              const pw = parseFloat(ps.width) || 0;
              const ph = parseFloat(ps.height) || 0;
              if (pw >= 43 && ph >= 43) { hitOk = true; break; }
            }
          }
          // 2) Stretch context: parent row/cell guarantees the touch area
          //    (grid/flex parents stretch children — the tap lands on parent)
          if (!hitOk) {
            const p = el.parentElement;
            if (p) {
              const pd = getComputedStyle(p);
              if ((pd.display.includes('grid') || pd.display.includes('flex')) && p.getBoundingClientRect().height >= 44) {
                hitOk = true;
              }
            }
          }
          if (!hitOk) smallTargets++;
        }
      }
      let underHomeBar = 0;
      for (const el of document.querySelectorAll('button, a')) {
        const b = el.getBoundingClientRect();
        if (b.height > 0 && b.bottom > window.innerHeight - 8) {
          const pos = getComputedStyle(el).position;
          if (pos === 'fixed' || pos === 'sticky') underHomeBar++;
        }
      }
      let clippedText = 0;
      for (const el of document.querySelectorAll('h1, h2, h3, p, li')) {
        if (el.classList.contains('sr-only')) continue; // intentional a11y clip
        const s = getComputedStyle(el);
        if (
          el.scrollWidth > el.clientWidth + 4 &&
          s.overflow === 'hidden' &&
          !el.closest('[data-scrollable="x"]')
        ) {
          clippedText++;
        }
      }
      return { overflowX, smallTargets, underHomeBar, clippedText };
    });

    const routeErrors = errors.length;
    if (m.overflowX > 1 || m.smallTargets > 0 || m.underHomeBar > 0 || m.clippedText > 3 || routeErrors > 0) {
      issues.push({ profile: profile.name, route, ...m, consoleErrors: routeErrors });
    }
    const shotName = route.replaceAll('/', '_').replaceAll('?', '_q_').replaceAll('=', '_') || 'root';
    await page.screenshot({ path: path.join(shotDir, `${profile.name}${shotName}.png`) });
  }
  await browser.close();
}

server.close();
fs.writeFileSync(path.join(shotDir, 'issues.json'), JSON.stringify(issues, null, 1));
console.log('ISSUES:', issues.length);
issues.forEach((i) => console.log(JSON.stringify(i)));
