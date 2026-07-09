// src/components/ui/BottomNav.jsx — iPhone 15/16/17 Pro Max Premium Navigation
import React from 'react';
import PropTypes from 'prop-types';
import useSafeAreaInsets from '../../hooks/useSafeAreaInsets';

const ICONS = {
  home: '🏠',
  favorites: '★',
  search: '🔍',
  emergency: '🚨',
  settings: '⚙️',
};

/**
 * iPhone-first bottom navigation with SF Symbols style icons.
 * Features:
 * - 44px touch targets
 * - Safe area padding
 * - Haptic feedback
 * - Smooth transitions
 */
export default function BottomNav({ activeSection = 'home', onNavigate = () => {} }) {
  const insets = useSafeAreaInsets();

  const items = [
    { label: 'Главная', path: 'home', icon: ICONS.home },
    { label: 'Избранное', path: 'favorites', icon: ICONS.favorites },
    { label: 'Поиск', path: 'search', icon: ICONS.search },
    { label: 'Экстренно', path: 'emergency', icon: ICONS.emergency, variant: 'emergency' },
    { label: 'Настройки', path: 'settings', icon: ICONS.settings },
  ];

  const handleClick = (path) => {
    // Haptic feedback for iPhone
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
    onNavigate(path, null, null, { skipHistory: true });
  };

  return (
    <nav
      className="bottom-nav"
      style={{ paddingBottom: `${Math.max(8, insets.bottom)}px` }}
    >
      <div className="bottom-nav-container">
        {items.map((item) => {
          const isActive = activeSection === item.path;
          const activeClass = isActive
            ? item.variant === 'emergency' ? 'text-danger' : 'text-teal'
            : 'text-text-secondary';

          return (
            <button
              key={item.path}
              onClick={() => handleClick(item.path)}
              className={`bottom-nav-btn ${activeClass}`}
              aria-label={item.label}
            >
              <span className="bottom-nav-icon">{item.icon}</span>
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

BottomNav.propTypes = {
  activeSection: PropTypes.string,
  onNavigate: PropTypes.func,
};