// src/components/ui/Switch.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function Switch({ checked = false, onChange, label = '' }) {
  const id = `switch-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="flex items-center">
      {label && (
        <label htmlFor={id} className="mr-2 text-sm">
          {label}
        </label>
      )}
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="hidden" />
      <label
        htmlFor={id}
        className="cursor-pointer w-10 h-6 bg-surface rounded-full relative transition-colors duration-200"
        style={{ backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-surface)' }}
      >
        <span
          className="block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200"
          style={{ transform: checked ? 'translateX(1.5rem)' : 'translateX(0)' }}
        />
      </label>
    </div>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};
