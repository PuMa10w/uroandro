// src/hooks/useSafeAreaInsets.js
import { useEffect, useState } from 'react';

/**
 * Hook that returns safe‑area inset values for iPhone X‑style devices.
 * It reads the CSS env variables provided by the browser (env(safe-area-inset-*)).
 */
export default function useSafeAreaInsets() {
  const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    const getInset = (name) => {
      const val = getComputedStyle(document.documentElement).getPropertyValue(`env(safe-area-inset-${name})`).trim();
      // browsers return something like "20px" or empty string; parseInt fallback to 0.
      return parseInt(val, 10) || 0;
    };
    setInsets({
      top: getInset('top'),
      right: getInset('right'),
      bottom: getInset('bottom'),
      left: getInset('left'),
    });
  }, []);

  return insets;
}
