"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count up to `to` once `active` flips true. Cubic ease-out, default 1400ms.
 *
 * Initial state is `to`, NOT 0, so the server-rendered HTML carries the real
 * figure. Crawlers, link unfurlers and no-JS readers previously saw a bare
 * "0" where the headline statistic should be, which is worse than showing no
 * animation at all.
 *
 * On the client the value is primed back to 0 immediately after hydration —
 * well before the element scrolls into view — so the count still starts from
 * zero without a reader ever seeing it snap backwards.
 *
 * Reduced motion skips the animation entirely and holds at `to`.
 */
export function useCount(
  to: number,
  duration = 1400,
  active = true,
  decimals = 0,
) {
  const [v, setV] = useState(to);
  const [primed, setPrimed] = useState(false);
  const primedRef = useRef(false);

  // Client-only prime. Runs once, straight after hydration.
  useEffect(() => {
    if (primedRef.current) return;
    primedRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // hold at `to`, never animate
    }
    // One-shot prime on mount; no cascading-render risk, so the
    // set-state-in-effect rule does not apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setV(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrimed(true);
  }, []);

  useEffect(() => {
    if (!primed || !active) return;
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
  }, [to, duration, active, primed]);

  return Number(v.toFixed(decimals));
}
