// src/components/ui/Toast.jsx — iOS-style toast notifications
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Toast — bottom notification like iOS banner alerts.
 * Props:
 *   - message: string
 *   - type: 'default' | 'success' | 'warning' | 'error'
 *   - duration: ms (default 4000)
 *   - onClose: function
 */
export default function Toast({ message, type = 'default', duration = 4000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    default: 'bg-bg-card border-border',
    success: 'bg-success/20 border-success',
    warning: 'bg-warning/20 border-warning',
    error: 'bg-danger/20 border-danger',
  };

  const icons = {
    default: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-20 left-4 right-4 mx-auto max-w-md p-4 rounded-xl border backdrop-blur-xl z-50 ${colors[type]}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icons[type]}</span>
        <span className="text-text-primary text-sm font-medium flex-1">{message}</span>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};
