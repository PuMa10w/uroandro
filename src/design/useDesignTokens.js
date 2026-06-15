// src/design/useDesignTokens.js
import { useMemo } from 'react';

/**
 * Возвращает объект токенов, считанных из CSS‑переменных.
 * Токены можно использовать в стилевых объектах или в styled‑components.
 */
export function useDesignTokens() {
  const tokens = useMemo(() => {
    const root = getComputedStyle(document.documentElement);
    const get = (name) => root.getPropertyValue(name).trim();
    return {
      colors: {
        primary: get('--color-primary'),
        primaryDark: get('--color-primary-dark'),
        secondary: get('--color-secondary'),
        background: get('--color-background'),
        surface: get('--color-surface'),
        success: get('--color-success'),
        warning: get('--color-warning'),
        danger: get('--color-danger'),
      },
      spacing: {
        1: get('--spacing-1'),
        2: get('--spacing-2'),
        3: get('--spacing-3'),
        4: get('--spacing-4'),
        5: get('--spacing-5'),
        6: get('--spacing-6'),
      },
      radius: {
        sm: get('--radius-sm'),
        md: get('--radius-md'),
        lg: get('--radius-lg'),
        xl: get('--radius-xl'),
      },
      shadow: {
        xs: get('--shadow-xs'),
        sm: get('--shadow-sm'),
        md: get('--shadow-md'),
      },
    };
  }, []);

  return tokens;
}
