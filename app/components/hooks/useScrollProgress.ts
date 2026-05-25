"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * 0..1 progress as a target element scrolls through the viewport.
 * 0 when its top is at the bottom of the screen; 1 when its bottom
 * is at the top of the screen.
 *
 * Throttled to only re-render on meaningful change so a 60fps loop
 * does not trash React on slower devices.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = -1;

    const loop = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height + vh;
        const elapsed = vh - r.top;
        const next = Math.max(0, Math.min(1, elapsed / total));
        if (Math.abs(next - last) > 0.005) {
          last = next;
          setP(next);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ref]);

  return p;
}
