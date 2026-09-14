import { allDiseases } from './index';
import { enrichDiseaseMetadataList } from './enrichMetadata';

export function getSectionDiseasesByIds(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return [];

  const lookup = new Map(allDiseases.map((disease) => [disease.id, disease]));
  return enrichDiseaseMetadataList(ids.map((id) => lookup.get(id)).filter(Boolean));
}

/**
 * Canonical section listing: EVERY disease from the registry that belongs to
 * the given section/subsection, with an optional priority order.
 *
 * - `subsection` falsy → all diseases of the section (used by Pediatric,
 *   Metaphylaxis where the registry has no sub-split).
 * - `priorityIds` only controls ordering, it never filters content out.
 * - `extraIds` appends explicitly requested diseases (e.g. conditions that
 *   are clinically relevant to a section but registered under another one).
 *
 * This replaces hard-coded per-section ID lists, which silently dropped any
 * newly registered disease (cards missing from sections / dead deep links).
 */
export function getSectionDiseases(section, subsection, priorityIds = [], extraIds = []) {
  const priority = new Map(priorityIds.map((id, index) => [id, index]));
  const priorityFallback = priorityIds.length + 1000;

  const matches = (disease) =>
    disease.section === section && (!subsection || disease.subsection === subsection);

  const base = allDiseases.filter(matches);

  // extras: keep registry objects, appended in the requested order
  const byId = new Map(allDiseases.map((disease) => [disease.id, disease]));
  const present = new Set(base.map((disease) => disease.id));
  const extras = extraIds
    .filter((id) => !present.has(id))
    .map((id) => byId.get(id))
    .filter(Boolean);

  const sorted = [...base].sort((left, right) => {
    const leftPriority = priority.has(left.id) ? priority.get(left.id) : priorityFallback;
    const rightPriority = priority.has(right.id) ? priority.get(right.id) : priorityFallback;

    if (leftPriority !== rightPriority) return leftPriority - rightPriority;
    return left.name.localeCompare(right.name, 'ru');
  });

  return enrichDiseaseMetadataList([...sorted, ...extras]);
}

export function getSectionDiseasesBySubsection(section, subsection, priorityIds = []) {
  return getSectionDiseases(section, subsection, priorityIds);
}