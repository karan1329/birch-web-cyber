"use client";

import { useEffect, useState } from "react";

/**
 * Animate a numeric value from 0 to `to` once `active` flips true.
 * Cubic ease-out, default 1400ms.
 */
export function useCount(
  to: number,
  duration = 1400,
  active = true,
  decimals = 0,
) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(eased * to);
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [to, duration, active]);

  return Number(v.toFixed(decimals));
}
