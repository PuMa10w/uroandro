/**
 * Minimal disease index for landing page only
 * Provides fast initial load with essential data only
 */

// Only essential metadata for landing page - no heavy clinical data
export const diseaseIndex = [
  { id: 'urolithiasis', name: 'Мочекаменная болезнь', icd: 'N20-N23', section: 'urology', subsection: 'stones', icon: '💎' },
  { id: 'kidney-stone', name: 'Камень почки', icd: 'N20.0', section: 'urology', subsection: 'stones', icon: '💎' },
  { id: 'dgpgj', name: 'ДГПЖ / Аденома простаты', icd: 'N31.9', section: 'urology', subsection: 'functional', icon: '🔬' },
  { id: 'bladder-cancer', name: 'Рак мочевого пузыря', icd: 'C67', section: 'urology', subsection: 'oncology', icon: '🎗️' },
  { id: 'prostate-cancer', name: 'Рак предстательной железы', icd: 'C61', section: 'urology', subsection: 'oncology', icon: '🎗️' },
  { id: 'ed', name: 'Эректильная дисфункция', icd: 'N52.9', section: 'andrology', subsection: 'sexual', icon: '⚡' },
];

// Lookup map for quick access
export const diseaseById = Object.fromEntries(diseaseIndex.map(d => [d.id, d]));