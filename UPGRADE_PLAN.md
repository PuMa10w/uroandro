# UroAndro — Детальный план улучшения

## Текущее состояние (после Ph1-6 + аудит)
- ✅ 197 diseases с 0 пустыми полями
- ✅ 500+ препаратов в справочнике
- ✅ Премиум CSS (Glass 2.0, blur 40px)
- ✅ SVG иконки вместо unicode
- ✅ Анимации (stagger, page-enter, modal-slide)
- ✅ Поиск работает (болезни, МКБ, препараты, транслит)
- ✅ Адаптив под мобильные

---

## Что не хватает / требует доработки

### 1. НАВИГАЦИЯ (Navigation)
| Проблема | Решение | Приоритет |
|---------|---------|-----------|
| Нет центра экрана поиска | Добавить hero-поиск под заголовком "Рабочий старт врача" | 🔥 HIGH |
| Navbar не фиксирован | Sticky header при скролле | 🔥 HIGH |
| Нет нижнего таб-бара на моб | Bottom navigation для моб (домой/поиск/разделы/калькуляторы) | 🚀 MEDIUM |
| Бургер-меню моб | Упростить, добавить иконки | 🚀 MEDIUM |

### 2. ДИЗАЙН (Design System)
| Проблема | Решение | Приоритет |
|---------|---------|-----------|
| Цветовая дифференциация разделов | Urology: teal glow, Andrology: gold glow, Emergency: amber | ✅ DONE (частично) |
| Текст "Red flags" неактивен | Кнопки-бэджи вместо текста | ✅ DONE |
| Quick Access горизонтальный скролл | Сетка 2x4 адаптив | ✅ DONE |
| Recent cards без дат/контекста | Добавить время/теги к карточкам | 🚀 MEDIUM |
| Техлинтеры (Local-only, Strict QA) | Удалены | ✅ DONE |

### 3. UX (Usability)
| Проблема | Решение | Приоритет |
|---------|---------|-----------|
| Touch targets < 44px | Минимум 44x44 для моб | 🔥 HIGH |
| Нет жестов для моб | Swipe back, pull-to-refresh | 🚀 MEDIUM |
| Нет подтверждения действий | Toast уведомления | 🚀 MEDIUM |
| Нет индикатора загрузки | Skeleton loading | 🚀 MEDIUM |

### 4. ФУНКЦИОНАЛЬНОСТЬ (Features)
| Проблема | Решение | Приоритет |
|---------|---------|-----------|
| Нет оффлайн-режима PWA | Сделать PWA с offline pages | 🔥 HIGH |
| Нет экспорта PDF | Экспорт карточек в PDF | 🚀 MEDIUM |
| Нет избранного в поиске | Избранное как секция в поиске | 🚀 MEDIUM |
| Нет сравнения препаратов | Таблица сравнения (LUKS, дозы) | 🚀 MEDIUM |
| Нет AI-диагностики | Интегрировать LLM для подсказок | 🔮 FUTURE |
| Нет голосового ввода | Speech-to-text в поиск | 🔮 FUTURE |
| Нет 3D-моделей | Three.js интеграция | 🔮 FUTURE |

### 5. КОНТЕНТ (Content)
| Проблема | Решение | Приоритет |
|---------|---------|-----------|
| Источники без дат обновления | Добавить даты (EAU 2026) | ✅ DONE |
| Нет деталей по калькуляторам | IPSS, IIEF, PSA калькуляторы | 🚀 MEDIUM |
| Нет pediatric section | Детская урология | 🚀 MEDIUM |
| Нет oncology subtypes | Глубже: рак мочевого, рак яичка | 🚀 MEDIUM |

### 6. ТЕХНИЧЕСКАЯ БАЗА (Tech)
| Проблема | Решение | Приоритет |
|---------|---------|-----------|
| Framer Motion установлен, но не используется | Page transitions + micro-anims | 🚀 MEDIUM |
| Много CSS файлов | Консолидировать в flagship.css | 🚀 MEDIUM |
| Нет analytics | Web vitals + Sentry | ✅ DONE |
| Нет A/B тестов | Feature flags | 🔮 FUTURE |
| Нет unit-тестов для поиска | Тесты search.js | 🚀 MEDIUM |

---

## План на ближайшие 2 недели

```
Week 1
├─ Day 1-2: Sticky navbar + hero search
├─ Day 3: Touch targets 44x44px, mobile bottom bar
├─ Day 4: Toast system + skeleton loading
├─ Day 5: PWA offline support

Week 2
├─ Day 1-2: Расширить поиск (фавориты, история в выдаче)
├─ Day 3: PDF export для карточек
├─ Day 4: Таблица сравнения препаратов
├─ Day 5: Framer Motion page transitions
```

---

## Файлы для рефакторинга (горячие точки)

| Файл | Проблема | Что менять |
|------|----------|------------|
| `src/App.jsx` | 362 строки, сложная логика | Разбить на хуки/useContext |
| `src/components/Navbar.jsx` | 900+ строк, дублирования | Вынести поиск в отдельный компонент |
| `src/components/LandingPage.jsx` | 246 строк, но можно чище | Добавить hero-search section |
| `src/styles/*.css` | 7 файлов с !important | Мерж в flagship + удалить v23/v22 |
| `src/data/*.js` (208 файлов) | Жёсткие импорты | Lazy loading по разделам |

---

## Ключевые метрики

```
Core Web Vitals (целевые):
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

Bundle рост:
- Текущий: ~1.2MB, gzip 300KB
- Цель: < 400KB gzip (удалить Sentry, уменьшить deps)

Поиск:
- Debounce: 250ms
- Results limit: 10
- Coverage: 197 diseases + 500 drugs + symptoms
```

---

## Next priority

1. **Hero search** — главный экран, центральное поле
2. **Sticky header** — фикс при скролле
3. **Bottom nav** — мобильный UX
4. **PWA offline** — service worker + cached pages
5. **PDF export** — скачивание карточек