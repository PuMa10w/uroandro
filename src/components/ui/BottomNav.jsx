// src/components/ui/BottomNav.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSafeAreaInsets } from '../hooks/useSafeAreaInsets';
import Button from './Button';

const items = [
  { label: 'Главная', path: '/' },
  { label: 'Избранное', path: '/favorites' },
  { label: 'Поиск', path: '/search' },
  { label: 'Настройки', path: '/settings' },
];

export default function BottomNav({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const insets = useSafeAreaInsets();

  const handleClick = (path) => {
    if (location.pathname !== path) {
      navigate(path);
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
          variant={location.pathname === item.path ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => handleClick(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}

BottomNav.propTypes = {};
