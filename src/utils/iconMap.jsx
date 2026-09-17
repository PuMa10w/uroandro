// src/utils/iconMap.jsx — string key / legacy emoji / component → SVG icon
// Единая точка замены эмодзи на SVG без правки данных (DRY).
import React from 'react';
import {
  IconStone, IconFire, IconRibbon, IconBolt, IconWrench, IconKidney,
  IconAnger, IconDna, IconFlask, IconRadiation, IconBoom, IconWater,
  IconSalt, IconSalad, IconGame, IconBook, IconMap, IconBaby, IconSettings,
  IconHome, IconStarFilled, IconSearch, IconEmergency, IconSurgery,
  IconTools, IconCalculators, IconDrugs, IconClipboard, IconMicroscope,
  IconDocument, IconWarning, IconPerson,
} from '../icons';

const MAP = {
  stone: IconStone,
  stones: IconStone,
  infection: IconFire,
  infections: IconFire,
  oncology: IconRibbon,
  functional: IconBolt,
  nervous: IconBolt,
  reconstructive: IconWrench,
  nephrology: IconKidney,
  pain: IconAnger,
  sexual: IconPerson,
  fertility: IconDna,
  endocrine: IconFlask,
  radiation: IconRadiation,
  trauma: IconBoom,
  water: IconWater,
  salt: IconSalt,
  nutrition: IconSalad,
  game: IconGame,
  glossary: IconBook,
  sitemap: IconMap,
  pediatric: IconBaby,
  emergency: IconEmergency,
  surgery: IconSurgery,
  tools: IconTools,
  calculators: IconCalculators,
  drugs: IconDrugs,
  home: IconHome,
  favorites: IconStarFilled,
  search: IconSearch,
  settings: IconSettings,
  clipboard: IconClipboard,
  lab: IconMicroscope,
  document: IconDocument,
  warning: IconWarning,
  person: IconPerson,
  default: IconWarning,
};

/** Legacy emoji (данные уже содержат их) → ключ MAP.
 *  Записано через \u-эскейпы, чтобы символы не терялись в кодировке. */
const EMOJI_TO_KEY = {
  '\u{1F48E}': 'stone',            // 💎
  '\u{1F525}': 'infection',        // 🔥
  '\u{1F397}\u{FE0F}': 'oncology', // 🎗️
  '\u{26A1}': 'functional',        // ⚡
  '\u{1F527}': 'reconstructive',   // 🔧
  '\u{1FAD8}': 'nephrology',       // 🫘
  '\u{1F4A2}': 'pain',             // 💢
  '\u{1F9EC}': 'fertility',        // 🧬
  '\u{2697}\u{FE0F}': 'endocrine', // ⚗️
  '\u{2622}\u{FE0F}': 'radiation', // ☢️
  '\u{1F4A5}': 'trauma',           // 💥
  '\u{1F6B0}': 'water',            // 🚰
  '\u{1F9C2}': 'salt',             // 🧂
  '\u{1F957}': 'nutrition',        // 🥗
  '\u{1F3AE}': 'game',             // 🎮
  '\u{1F4D6}': 'glossary',         // 📖
  '\u{1F5FA}\u{FE0F}': 'sitemap',  // 🗺️
  '\u{1F476}': 'pediatric',        // 👶
  '\u{1F6A8}': 'emergency',        // 🚨
  '\u{1F52A}': 'surgery',          // 🔪
  '\u{1F4CA}': 'tools',            // 📊
  '\u{1F9EE}': 'calculators',      // 🧮
  '\u{1F48A}': 'drugs',            // 💊
  '\u{1F52C}': 'lab',              // 🔬
  '\u{1F52D}': 'lab',              // 🔭
  '\u{1F4CB}': 'clipboard',        // 📋
  '\u{26A0}\u{FE0F}': 'warning',   // ⚠️
  '\u{2699}\u{FE0F}': 'settings',  // ⚙️
  '\u{1F3E0}': 'home',             // 🏠
  '\u{2605}': 'favorites',         // ★
  '\u{2606}': 'favorites',         // ☆
  '\u{1F50D}': 'search',           // 🔍
  // дополнительные (метафилактика / хирургия / экстренное)
  '\u{1F95B}': 'water',            // 🥛
  '\u{1F377}': 'warning',          // 🍷
  '\u{1F969}': 'nutrition',        // 🥩
  '\u{1F3C3}': 'functional',       // 🏃
  '\u{2696}\u{FE0F}': 'settings',  // ⚖️
  '\u{1F34B}': 'nutrition',        // 🍋
  '\u{1F7E1}': 'stone',            // 🟡
  '\u{1F7E2}': 'stone',            // 🟢
  '\u{26D4}': 'warning',           // ⛔
  '\u{1F4A1}': 'warning',          // 💡
  '\u{1F4C5}': 'document',         // 📅
  '\u{1F3AC}': 'document',         // 🎬
  '\u{1F9EA}': 'lab',              // 🧪
};

/**
 * Renders any icon value as an SVG component.
 * Accepts: React component | MAP key ('infection') | legacy emoji ('🔥').
 */
export function renderIcon(value, props = {}) {
  if (typeof value === 'function') {
    const Cmp = value;
    return <Cmp {...props} />;
  }
  const key = EMOJI_TO_KEY[value] || value;
  const Cmp = MAP[key] || MAP.default;
  return <Cmp {...props} />;
}

export default renderIcon;