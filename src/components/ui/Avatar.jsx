// src/components/ui/Avatar.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar component – shows an image or initials inside a circle.
 * Props:
 *   - src: image URL (optional)
 *   - name: fallback name for initials (optional)
 *   - size: number (pixels) – default 40
 */
export default function Avatar({ src, name = '', size = 40 }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const style = { width: size, height: size, lineHeight: `${size}px` };

  return (
    <div
      className="flex items-center justify-center bg-surface rounded-full overflow-hidden text-sm font-medium"
      style={style}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
};
