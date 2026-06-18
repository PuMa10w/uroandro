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
      className="fixed inset-x-0 bottom-0 bg-bg-card border-t border-border backdrop-blur-xl safe-area-bottom"
      style={{ paddingBottom: `${Math.max(8, insets.bottom)}px` }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => {
          const isActive = activeSection === item.path;
          const activeClass = isActive 
            ? item.variant === 'emergency' ? 'text-danger' : 'text-teal' 
            : 'text-text-secondary';
          
          return (
            <button
              key={item.path}
              onClick={() => handleClick(item.path)}
              className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 py-1 transition-all duration-200 ${activeClass}`}
              aria-label={item.label}
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>
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