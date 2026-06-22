/**
 * Lazy Disease Data Loader
 * Динамически подгружает данные по разделам для <50ms загрузки
 */

const dataLoaders = {
  urology: () => import('../data/urologyData.js'),
  andrology: () => import('../data/andrologyData.js'),
  stones: () => import('../data/stoneDiseaseData.js'),
  infections: () => import('../data/infectionDiseaseData.js'),
  oncology: () => import('../data/oncologyDiseaseData.js'),
  drugs: () => import('../data/drugReferenceData.js'),
};

const loadedData = new Map();

export async function loadDiseaseData(section) {
  if (loadedData.has(section)) {
    return loadedData.get(section);
  }
  
  const loader = dataLoaders[section];
  if (!loader) {
    return [];
  }
  
  try {
    const module = await loader();
    const data = module.default || module[Object.keys(module)[0]] || [];
    loadedData.set(section, data);
    return data;
  } catch (err) {
    console.error(`Failed to load ${section} data:`, err);
    return [];
  }
}

// Preload critical sections
export async function preloadCriticalData() {
  await Promise.all([
    loadDiseaseData('urology').catch(() => []),
    loadDiseaseData('andrology').catch(() => []),
  ]);
}