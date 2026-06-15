// src/components/ui/BottomNav.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import useSafeAreaInsets from '../../hooks/useSafeAreaInsets';

/**
 * Bottom navigation bar for iPhone‑first UI.
 * Props:
 *   - activeSection: current top‑level section (e.g. 'home')
 *   - onNavigate: function(section, subsection?, diseaseId?, options?) – same signature as Navbar's onNavigate
 */
export default function BottomNav({ activeSection = 'home', onNavigate = () => {} }) {
  const insets = useSafeAreaInsets();

  const items = [
    { label: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f', path: 'home' },
    { label: '\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435', path: 'favorites' },
    { label: '\u041f\u043e\u0438\u0441\u043a', path: 'search' },
    { label: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438', path: 'settings' },
  ];

  const handleClick = (path) => {
    if (onNavigate) {
      // Do not push history for bottom bar navigation
      onNavigate(path, null, null, { skipHistory: true });
    }
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 flex justify-around items-center bg-surface border-t border-gray-200"
      style={{ paddingBottom: `${insets.bottom}px` }}
    >
      {items.map((item) => (
        <Button
          key={item.path}
          variant={activeSection === item.path ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => handleClick(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}

BottomNav.propTypes = {
  activeSection: PropTypes.string,
  onNavigate: PropTypes.func,
};
