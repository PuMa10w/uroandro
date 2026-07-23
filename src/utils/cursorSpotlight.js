/**
 * Cursor Spotlight — tracks pointer over card elements and updates
 * CSS custom properties --spotlight-x / --spotlight-y so the radial
 * gradient in ultraPremiumMega.css follows the cursor.
 *
 * Lightweight: uses a single delegated mousemove on <body>, never
 * adds per-card listeners. Skips entirely on touch devices.
 */
export function initCursorSpotlight() {
  // Skip on touch devices — no pointer, no benefit
  if (matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const CARD_SEL = [
    '.disease-card',
    '.subsection-card',
    '.tool-section',
    '.calculator-card',
    '.drug-card',
    '.favorite-card',
    '.emergency-card',
    '.home-destination-card',
    '.premium-card',
    '.service-card',
    '.sitemap-item',
    '.guideline-card',
    '.home-guideline-card',
  ].join(',');

  let rafId = 0;

  document.body.addEventListener('mousemove', (e) => {
    if (rafId) return; // throttle to rAF
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      const cards = document.querySelectorAll(CARD_SEL);
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--spotlight-x', `${x}%`);
        card.style.setProperty('--spotlight-y', `${y}%`);
      });
    });
  }, { passive: true });
}