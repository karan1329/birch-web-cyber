"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver wrapper with a layout probe + safety failsafe.
 * In nested-iframe contexts (preview, embeds) IO can fire late; the probe
 * checks bounding rect after first paint, and the safety timer guarantees
 * content is never permanently hidden.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
  once = true,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let obs: IntersectionObserver | null = null;
    let probeTimer: ReturnType<typeof setTimeout> | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    const fire = () => {
      setInView(true);
      obs?.disconnect();
      if (probeTimer) clearTimeout(probeTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
    };

    try {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (once) fire();
            else setInView(true);
          } else if (!once) {
            setInView(false);
          }
        },
        { threshold },
      );
      obs.observe(el);
    } catch {
      /* SSR / very old browser · fall back to probe */
    }

    probeTimer = setTimeout(() => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.bottom > 0 && r.top < vh) fire();
    }, 120);

    safetyTimer = setTimeout(fire, 2000);

    return () => {
      obs?.disconnect();
      if (probeTimer) clearTimeout(probeTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [threshold, once]);

  return [ref, inView] as const;
}
