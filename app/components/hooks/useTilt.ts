"use client";

import { useEffect, useRef } from "react";

/**
 * 3D tilt on hover. The wrapper element holds the perspective; the
 * `[data-tilt-inner]` child receives the rotateX/Y transform; an
 * optional `[data-tilt-glare]` overlay gets a radial highlight that
 * follows the cursor in the active neon color.
 *
 * Reads the live --bl-neon-rgb each frame so a neon swap is reflected
 * immediately without remounting.
 */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inner =
      (el.querySelector("[data-tilt-inner]") as HTMLElement | null) ?? el;
    const glare = el.querySelector(
      "[data-tilt-glare]",
    ) as HTMLElement | null;

    let raf = 0;
    const target = { rx: 0, ry: 0, gx: 50, gy: 50, s: 0 };
    const cur = { rx: 0, ry: 0, gx: 50, gy: 50, s: 0 };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      target.ry = (x - 0.5) * max * 2;
      target.rx = -(y - 0.5) * max * 2;
      target.gx = x * 100;
      target.gy = y * 100;
      target.s = 1;
    };

    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.s = 0;
    };

    const loop = () => {
      cur.rx += (target.rx - cur.rx) * 0.12;
      cur.ry += (target.ry - cur.ry) * 0.12;
      cur.gx += (target.gx - cur.gx) * 0.18;
      cur.gy += (target.gy - cur.gy) * 0.18;
      cur.s += (target.s - cur.s) * 0.1;
      inner.style.transform = `perspective(1200px) rotateX(${cur.rx.toFixed(
        2,
      )}deg) rotateY(${cur.ry.toFixed(2)}deg)`;
      if (glare) {
        const rgb =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--bl-neon-rgb")
            .trim() || "205,243,108";
        glare.style.background = `radial-gradient(circle at ${cur.gx}% ${cur.gy}%, rgba(${rgb},${(
          0.12 * cur.s
        ).toFixed(3)}) 0%, rgba(${rgb},0) 55%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return ref;
}
