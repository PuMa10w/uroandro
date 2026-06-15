// src/components/ui/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component with Tailwind styling.
 * Props:
 *  - children: button label
 *  - variant: 'primary' | 'secondary' | 'danger'
 *  - size: 'sm' | 'md' | 'lg'
 *  - onClick: handler
 */
export default function Button({ children, variant = 'primary', size = 'md', onClick, ...rest }) {
  const base = 'font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-primary-dark focus-visible:ring-secondary',
    danger: 'bg-danger text-white hover:bg-red-700 focus-visible:ring-danger',
  };
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const className = `${base} ${variants[variant]} ${sizes[size]}`;
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};
