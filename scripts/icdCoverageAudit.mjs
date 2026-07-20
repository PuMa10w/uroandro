import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read disease registry. The legacy clinicalAtlasData.js (icdCoverageTargets /
// anatomyModels) was purged during dead-code cleanup, so we now validate ICD-10
// coverage directly against the live disease index.
const indexPath = path.join(rootDir, 'src/data/index.js');
const source = fs.readFileSync(indexPath, 'utf8');
const matches = [
  ...source.matchAll(
    /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']*)',\s*icd:\s*'([^']*)',\s*section:\s*'([^']*)',\s*subsection:\s*'([^']*)'/g
  ),
];

const allDiseases = matches.map((m) => ({
  id: m[1],
  name: m[2],
  icd: m[3],
  section: m[4],
  subsection: m[5],
}));

// Standard ICD-10 chapter ranges relevant to urology & andrology.
const chapters = [
  { range: 'A00-N99', label: 'Все МКБ-10 (A–N)' },
  { range: 'N00-N39', label: 'Мочевыделительная система' },
  { range: 'N40-N51', label: 'Мужская половая сфера' },
  { range: 'Q53-Q64', label: 'Врождённые урологические аномалии' },
  { range: 'C60-C63', label: 'Злокачественные новообразования мужских половых органов' },
  { range: 'C64-C68', label: 'Злокачественные новообразования мочевых путей' },
];

function normalizeIcd(value = '') {
  return String(value).toUpperCase().replace(/\s+/g, '');
}

function isInRange(icd, range) {
  const n = normalizeIcd(icd);
  if (!n) return false;
  const [start, end] = range.split('-');
  if (!end) return n.startsWith(normalizeIcd(start));
  const sl = start[0], el = end[0];
  const sn = Number(start.slice(1)), en = Number(end.slice(1));
  const letter = n[0];
  const num = Number((n.match(/^[A-Z](\d+)/) || [])[1]);
  if (!Number.isFinite(num)) return false;
  if (sl !== el) return letter >= sl && letter <= el;
  return letter === sl && num >= sn && num <= en;
}

const missingIcd = allDiseases.filter((d) => !d.icd || !normalizeIcd(d.icd).match(/^[A-Z]\d/i));
const chapterCoverage = chapters.map((c) => ({
  range: c.range,
  label: c.label,
  diseaseCount: allDiseases.filter((d) => isInRange(d.icd, c.range)).length,
}));

const report = {
  status: missingIcd.length === 0 ? 'pass' : 'fail',
  updated_at: new Date().toISOString(),
  totalDiseases: allDiseases.length,
  icdCoded: allDiseases.length - missingIcd.length,
  missingIcdCount: missingIcd.length,
  missingIcdExamples: missingIcd.slice(0, 25).map((d) => ({ id: d.id, name: d.name })),
  chapterCoverage,
};

const outDir = path.join(rootDir, 'content');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'icd-coverage-summary-v14.json'),
  `${JSON.stringify(report, null, 2)}\n`,
  'utf8'
);

console.log(JSON.stringify(report, null, 2));

if (report.status !== 'pass') {
  process.exitCode = 1;
}
