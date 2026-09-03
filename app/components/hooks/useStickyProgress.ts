"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * 0..1 progress while a tall element's content is pinned: 0 when
 * the element's top first reaches the viewport top, 1 when its bottom
 * approaches the viewport bottom.
 *
 * Pair with `position: sticky` on the inner shell. Tune length by the
 * outer element's height (e.g. `6 * 75vh` for six principle cards).
 *
 * PERFORMANCE, because this drives the How We Work transitions that were
 * reported as laggy. The previous version ran an unconditional rAF loop for
 * the life of the page and called `getBoundingClientRect()` inside it, which
 * forces a synchronous layout on every single frame — sixty a second, whether
 * or not the user is scrolling, and whether or not the section is anywhere
 * near the viewport. Two gates fix it without changing the output:
 *
 *   1. An IntersectionObserver starts the loop only while the element is on
 *      or near screen, and stops it otherwise. Most of the page's life is
 *      now spent doing nothing at all.
 *   2. Inside the loop, the measurement is skipped entirely when the scroll
 *      position has not moved since the last frame. A still page costs one
 *      integer comparison per frame instead of a forced layout.
 *
 * The setState is still gated on a meaningful delta, so React re-renders only
 * when the progress visibly changes rather than on every measured frame.
 */
export function useStickyProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let running = false;
    let last = -1;
    let lastScroll = Number.NaN;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      const past = -r.top;
      const next =
        scrollable <= 0 ? 0 : Math.max(0, Math.min(1, past / scrollable));
      if (Math.abs(next - last) > 0.003) {
        last = next;
        setP(next);
      }
    };

    const loop = () => {
      const y = window.scrollY;
      // Nothing has moved: no layout read, no state write.
      if (y !== lastScroll) {
        lastScroll = y;
        measure();
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastScroll = Number.NaN; // force one measurement on entry
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    // rootMargin so progress is already correct by the time the section
    // reaches the fold, rather than snapping when it crosses.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      stop();
    };
  }, [ref]);

  return p;
}
