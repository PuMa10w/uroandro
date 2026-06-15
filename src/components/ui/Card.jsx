// src/components/ui/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple Card component.
 * Props:
 *   - children: content
 *   - className: additional Tailwind classes
 */
export default function Card({ children, className = '' }) {
  const base = 'bg-surface rounded-md shadow-sm p-4';
  return <div className={`${base} ${className}`}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
