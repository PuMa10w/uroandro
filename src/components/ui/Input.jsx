// src/components/ui/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
}) {
  const base = 'border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary';
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${base} ${className}`}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
