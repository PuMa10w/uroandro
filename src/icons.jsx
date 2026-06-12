/**
 * UroAndro SVG Icons — единый набор inline SVG-иконок
 * Все иконки: strokeWidth=1.5, fill=none, currentColor
 * Heroicons-style — единый визуальный язык
 */
import React from 'react';

const DEFAULT_SIZE = 20;

function createIcon(paths, viewBox = '0 0 24 24') {
  return ({ size = DEFAULT_SIZE, className = '', ...props } = {}) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths}
    </svg>
  );
}

// ─── Navigation ──────────────────────────────────────────

export const IconSearch = createIcon(
  <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>
);

export const IconMenu = createIcon(
  <><path d="M3 12h18M3 6h18M3 18h18" /></>
);

export const IconClose = createIcon(
  <><path d="M18 6L6 18M6 6l12 12" /></>
);

export const IconChevronDown = createIcon(
  <><path d="M6 9l6 6 6-6" /></>
);

export const IconChevronRight = createIcon(
  <><path d="M9 18l6-6-6-6" /></>
);

export const IconChevronLeft = createIcon(
  <><path d="M15 18l-6-6 6-6" /></>
);

export const IconBack = IconChevronLeft;

export const IconHome = createIcon(
  <><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></>
);

// ─── Theme ────────────────────────────────────────────────

export const IconMoon = createIcon(
  <><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></>
);

export const IconSun = createIcon(
  <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>
);

// ─── Actions ──────────────────────────────────────────────

export const IconStar = createIcon(
  <><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></>
);

export const IconStarFilled = createIcon(
  <><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" fill="currentColor" /></>
);

export const IconArrowUp = createIcon(
  <><path d="M12 19V5M5 12l7-7 7 7" /></>
);

export const IconArrowDown = createIcon(
  <><path d="M12 5v14M19 12l-7 7-7-7" /></>
);

export const IconClock = createIcon(
  <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>
);

export const IconHeart = createIcon(
  <><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></>
);

// ─── Section Icons ────────────────────────────────────────

export const IconUrology = createIcon(
  <><path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" /></>
);

export const IconAndrology = createIcon(
  <><path d="M12 8v8m-4-4h8" /></>
);

export const IconPediatric = createIcon(
  <><path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></>
);

export const IconEmergency = createIcon(
  <><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></>
);

export const IconTools = createIcon(
  <><path d="M11.42 15.17l-6.62 6.62a2.028 2.028 0 0 0 0 2.87c.792.79 2.076.79 2.868 0l6.62-6.62m-2.868-8.66a2.03 2.03 0 0 0 0-2.87l-1.414-1.41a2.028 2.028 0 0 0-2.868 0L3.7 7.28a2.03 2.03 0 0 0 0 2.87l7.72 7.72m4.38-7.38l5.148 5.149a2.03 2.03 0 0 1 0 2.87l-1.56 1.56a2.03 2.03 0 0 1-2.87 0L11.42 10.2" /></>
);

export const IconSurgery = createIcon(
  <><path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L12.44 6.23a15.994 15.994 0 0 0-4.647 4.763" /></>
);

export const IconCalculators = createIcon(
  <><path d="M4 4h16v16H4V4zM4 9h16M9 4v16" /><path d="M16 14l-2 2 2 2M12 14l2 2-2 2" /></>
);

export const IconDrugs = createIcon(
  <><path d="M15.75 5.25a3 3 0 0 1 3 3m-3-3a3 3 0 0 0-3 3m3-3v6" /><path d="M20.25 12.75a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3H6.75" /><circle cx="4.5" cy="16.5" r="2.25" /></>
);

export const IconAtlas = createIcon(
  <><path d="M12 21a9.004 9.004 0 0 0 8.468-5.648c-.5-.187-1.04-.29-1.595-.29H5.127a7.964 7.964 0 0 0-1.595.29A9.004 9.004 0 0 0 12 21Z" /><path d="M12 21a9.004 9.004 0 0 0 8.468-5.648c-.5-.187-1.04-.29-1.595-.29H5.127a7.964 7.964 0 0 0-1.595.29A9.004 9.004 0 0 0 12 21Z" /><circle cx="12" cy="9" r="6" /></>
);

export const IconSitemap = createIcon(
  <><path d="M2.25 21h19.5m-18-18v18m10.5-18v18M15.75 3h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75ZM3.75 12h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75ZM12 3h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-4.5A.75.75 0 0 1 12 3Z" /></>
);

export const IconGames = createIcon(
  <><path d="M21 16.8c0-1.44-1.184-2.61-2.638-2.61h-2.3c.388.448.638 1.058.638 1.75V17.1c0 .692-.25 1.302-.638 1.75h2.3c1.454 0 2.638-1.17 2.638-2.61v-.64Z" /><path d="M3 16.8c0-1.44 1.184-2.61 2.638-2.61h2.3a2.62 2.62 0 0 0-.638 1.75V17.1c0 .692.25 1.302.638 1.75h-2.3C4.184 18.85 3 17.68 3 16.24v-.64Z" /><path d="M10.5 7.8v4.5M8.25 10h4.5" /><circle cx="12" cy="6.75" r="4" /></>
);

export const IconFavorites = IconHeart;

export const IconExternal = createIcon(
  <><path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></>
);

export const IconInfo = createIcon(
  <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>
);

export const IconCheck = createIcon(
  <><path d="M5 13l4 4L19 7" /></>
);

export const IconWarning = createIcon(
  <><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></>
);

export const IconFilter = createIcon(
  <><path d="M10.5 6h10M4.5 6h1.5M4.5 12h13M4.5 18h7.5" /></>
);

export const IconShare = createIcon(
  <><path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></>
);

// ─── Medical ──────────────────────────────────────────────

export const IconMicroscope = createIcon(
  <><path d="M6.75 3v3.75M9.75 3v3.75M12 8.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /><path d="M9.75 12.75V21h4.5v-8.25" /></>
);

export const IconDocument = createIcon(
  <><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></>
);

export const IconClipboard = createIcon(
  <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></>
);

export const IconPerson = createIcon(
  <><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></>
);

export default {
  IconSearch, IconMenu, IconClose, IconChevronDown, IconChevronRight, IconChevronLeft,
  IconBack, IconHome, IconMoon, IconSun, IconStar, IconStarFilled,
  IconArrowUp, IconArrowDown, IconClock, IconHeart, IconFavorites,
  IconUrology, IconAndrology, IconPediatric, IconEmergency,
  IconTools, IconSurgery, IconCalculators, IconDrugs, IconAtlas, IconSitemap, IconGames,
  IconExternal, IconInfo, IconCheck, IconWarning, IconFilter, IconShare,
  IconMicroscope, IconDocument, IconClipboard, IconPerson,
};