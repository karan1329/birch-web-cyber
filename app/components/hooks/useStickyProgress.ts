"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * 0..1 progress while a tall element's content is pinned: 0 when
 * the element's top first reaches the viewport top, 1 when its bottom
 * approaches the viewport bottom.
 *
 * Pair with `position: sticky` on the inner shell. Tune length by the
 * outer element's height (e.g. `6 * 75vh` for six principle cards).
 */
export function useStickyProgress<T extends HTMLElement>(
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
        const scrollable = r.height - vh;
        const past = -r.top;
        const next = scrollable <= 0 ? 0 : Math.max(0, Math.min(1, past / scrollable));
        if (Math.abs(next - last) > 0.003) {
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
