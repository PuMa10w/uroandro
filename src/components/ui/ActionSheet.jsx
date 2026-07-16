// src/components/ui/ActionSheet.jsx — iOS-style action sheet for iPhone
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useSafeAreaInsets from '../../hooks/useSafeAreaInsets';

/**
 * ActionSheet — bottom-up modal sheet like iOS UIAlertController.
 * Props:
 *   - isOpen: boolean
 *   - onClose: function
 *   - title: string
 *   - actions: [{ label, value, style?, destructive? }]
 *   - cancelLabel: string
 */
export default function ActionSheet({ isOpen, onClose, title, actions, cancelLabel = 'Отмена' }) {
  const insets = useSafeAreaInsets();

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div
        className="relative w-full bg-bg-card rounded-t-2xl safe-area-bottom"
        style={{
          paddingBottom: `${Math.max(12, insets.bottom + 12)}px`,
          maxWidth: '500px',
          margin: '0 auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-center text-text-primary font-semibold text-base">{title}</h3>
          </div>
        )}

        <div className="py-2">
          {actions.map((action) => (
            <button
              key={action.value}
              onClick={() => {
                action.onPress?.();
                onClose();
              }}
              className={`w-full px-4 py-3 text-left transition-colors active:bg-bg-tertiary ${
                action.destructive ? 'text-danger' : 'text-text-primary'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="pt-2 border-t border-border mt-2">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 text-center font-semibold text-teal bg-bg-secondary rounded-lg mx-2"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

ActionSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      destructive: PropTypes.bool,
      onPress: PropTypes.func,
    })
  ),
  cancelLabel: PropTypes.string,
};
