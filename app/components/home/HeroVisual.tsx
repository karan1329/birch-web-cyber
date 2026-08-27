"use client";

import { useEffect, useRef } from "react";

/**
 * Hero visual · "The Index".
 *
 * Direct port of the `Hero Image C` prototype from the Claude Design
 * handoff bundle. A dithered, deliberately low-resolution scene: a stack
 * of nine scored control-domain cards under a raking light, rendered into
 * a small pixel buffer and upscaled with `image-rendering: pixelated`.
 *
 * Two stacked canvases:
 *   1. the dithered scene (sub-resolution, error-diffused, 3 colours)
 *   2. a crisp overlay for the tab labels, which must stay legible and
 *      therefore must NOT be pixelated.
 *
 * Everything is drawn in buffer pixels; the buffer is `pixelSize` times
 * smaller than the display box in each axis.
 *
 * Colours follow the Cyber one-pagers PDF: brand red ground, paper-beige
 * lit pixels, near-black redaction bars. Nothing glows — the design brief
 * bans bloom, rim light and neon outright.
 */

const LABELS = [
  "GRC",
  "APP SEC",
  "DEVSECOPS",
  "IAM",
  "SOC",
  "VULN MGMT",
  "CLOUD",
  "TRAINING",
  "PRIVACY",
];

// Scene palette, as raw channel triplets for the pixel buffer.
// Canvas `font` cannot resolve nested `var()`, so the mono stack is spelled
// out here rather than read from `--font-mono`.
const MONO_STACK =
  '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const LIT: [number, number, number] = [241, 238, 231]; // paper  #F1EEE7
// Ground red, taken from Karan's revised `Hero Image C` (#ce3850).
const GROUND: [number, number, number] = [206, 56, 80];

type Props = {
  /** Buffer downscale factor. 1 = crisp, 4 = very chunky. */
  pixelSize?: number;
};

export function HeroVisual({
  pixelSize = 2,
}: Props = {}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const cvTRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = cvRef.current;
    const ct = cvTRef.current;
    if (!wrap || !cv || !ct) return;
    const ctx = cv.getContext("2d");
    const ctxT = ct.getContext("2d");
    if (!ctx || !ctxT) return;

    const px = Math.max(1, pixelSize);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let W = 0;
    let H = 0;
    let bw = 0;
    let bh = 0;
    let img: ImageData | null = null;
    let scene = new Float32Array(0);
    let lightM = new Float32Array(0);

    let raf = 0;
    const t0 = performance.now();
    let mx = -1;
    let my = -1;
    const lifts = new Float32Array(9);
    let hits: { i: number; x0: number; x1: number; y0: number; y1: number }[] =
      [];

    // Drifting dust motes along the light axis.
    const dust = Array.from({ length: 130 }, () => ({
      a: Math.random(),
      p: Math.random() * 2 - 1,
      sp: 0.008 + Math.random() * 0.02,
      ph: Math.random() * 6.28,
      sz: Math.random() < 0.2 ? 2 : 1,
    }));

    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      if (!W || !H) return;
      bw = Math.max(1, Math.ceil(W / px));
      bh = Math.max(1, Math.ceil(H / px));
      cv.width = bw;
      cv.height = bh;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      img = ctx.createImageData(bw, bh);
      scene = new Float32Array(bw * bh);
      lightM = new Float32Array(bw * bh);

      // Label overlay stays at device resolution so type is crisp.
      const d = Math.min(window.devicePixelRatio || 1, 2);
      ct.width = W * d;
      ct.height = H * d;
      ct.style.width = `${W}px`;
      ct.style.height = `${H}px`;
      ctxT.setTransform(d, 0, 0, d, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => {
      mx = -1;
      my = -1;
    };

    const rot = (
      p: [number, number],
      cx: number,
      cy: number,
      c: number,
      sn: number,
    ): [number, number] => {
      const dx = p[0] - cx;
      const dy = p[1] - cy;
      return [cx + dx * c - dy * sn, cy + dx * sn + dy * c];
    };

    /** Convex-polygon scan fill into the scene (or the bar mask). */
    const fillPoly = (
      pts: [number, number][],
      val: number,
      lit: boolean,
    ) => {
      let x0 = 1e9;
      let y0 = 1e9;
      let x1 = -1e9;
      let y1 = -1e9;
      for (const p of pts) {
        x0 = Math.min(x0, p[0]);
        y0 = Math.min(y0, p[1]);
        x1 = Math.max(x1, p[0]);
        y1 = Math.max(y1, p[1]);
      }
      x0 = Math.max(0, Math.floor(x0));
      y0 = Math.max(0, Math.floor(y0));
      x1 = Math.min(bw - 1, Math.ceil(x1));
      y1 = Math.min(bh - 1, Math.ceil(y1));
      const n = pts.length;
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          let inside = true;
          let sign = 0;
          for (let i = 0; i < n; i++) {
            const a = pts[i];
            const b = pts[(i + 1) % n];
            const cr =
              (b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]);
            if (cr !== 0) {
              const sg = cr > 0 ? 1 : -1;
              if (sign === 0) sign = sg;
              else if (sg !== sign) {
                inside = false;
                break;
              }
            }
          }
          if (!inside) continue;
          const i2 = y * bw + x;
          scene[i2] = lit ? val * (0.65 + 0.35 * lightM[i2]) : val;
        }
      }
    };

    const draw = () => {
      if (!bw || !bh || !img) return;
      const el = (performance.now() - t0) / 1000;
      const t = reduced ? 0 : el;

      // ---- raking light field -------------------------------------
      const ax = -bw * 0.05;
      const ay = -bh * 0.12;
      let dx = 0.78;
      let dy = 0.63;
      const dl = Math.hypot(dx, dy);
      dx /= dl;
      dy /= dl;

      for (let y = 0; y < bh; y++) {
        for (let x = 0; x < bw; x++) {
          const rx = x - ax;
          const ry = y - ay;
          const along = rx * dx + ry * dy;
          const perp = Math.abs(rx * dy - ry * dx);
          const wdt = bh * 0.26 + along * 0.07;
          let f = 1 - perp / wdt;
          f = f < 0 ? 0 : f * f * (3 - 2 * f);
          const streak = 0.9 + 0.1 * Math.sin(perp * 0.55 + t * 0.7);
          const cxn = (x - bw * 0.5) / (bw * 0.62);
          const cyn = (y - bh * 0.5) / (bh * 0.62);
          const vig = 1 - 0.55 * (cxn * cxn + cyn * cyn);
          const i2 = y * bw + x;
          lightM[i2] = f;
          scene[i2] = (0.08 + 0.34 * f * streak) * Math.max(0.3, vig);
        }
      }

      // ---- dust ----------------------------------------------------
      const maxAlong = Math.hypot(bw, bh) * 1.15;
      for (const p of dust) {
        const a = ((p.a + t * p.sp) % 1) * maxAlong;
        const wdt = bh * 0.26 + a * 0.07;
        const off = p.p * wdt * 0.85;
        const x = Math.round(ax + dx * a - dy * off);
        const y = Math.round(ay + dy * a + dx * off);
        if (x < 0 || y < 0 || x >= bw || y >= bh) continue;
        const fl = 1 - Math.abs(p.p);
        const tw = 0.6 + 0.4 * Math.sin(t * 2.2 + p.ph);
        const v = (0.45 + 0.5 * fl) * tw;
        const i2 = y * bw + x;
        if (v > scene[i2]) scene[i2] = v;
        if (p.sz === 2 && x + 1 < bw && v * 0.8 > scene[i2 + 1]) {
          scene[i2 + 1] = v * 0.8;
        }
      }

      // ---- hover resolution ---------------------------------------
      let hov = -1;
      if (!reduced && mx >= 0) {
        const mxB = mx * bw;
        const myB = my * bh;
        for (const hb of hits) {
          if (mxB >= hb.x0 && mxB <= hb.x1 && myB >= hb.y0 && myB <= hb.y1) {
            hov = hb.i;
          }
        }
      }
      for (let li = 0; li < 9; li++) {
        lifts[li] += ((li === hov ? 1 : 0) - lifts[li]) * 0.16;
      }
      cv.style.cursor = hov >= 0 ? "pointer" : "default";
      hits = [];

      // ---- the stack ----------------------------------------------
      const cx = bw * 0.56;
      const cy = bh * 0.54 + (reduced ? 0 : Math.sin(t * 0.55) * 3);
      const ang = reduced ? 0 : Math.sin(t * 0.35) * 0.04;
      const c = Math.cos(ang);
      const sn = Math.sin(ang);
      // Authored composition from the prototype. These are tuned to the
      // artwork's own 900x760 proportions — do NOT re-derive them to fit a
      // different box. The panel is given the right aspect ratio instead
      // (see Hero.tsx); that is what keeps the scene reading as a drawer
      // rather than a white mass with colliding tabs.
      const fw = bw * 0.5;
      const fh = fw * 0.3;
      const dvx = -fw * 0.26;
      const dvy = -fw * 0.14;
      const R = (p: [number, number]) => rot(p, cx, cy + fh / 2, c, sn);

      const F1: [number, number] = [cx - fw / 2, cy];
      const F2: [number, number] = [cx + fw / 2, cy];
      const F3: [number, number] = [cx + fw / 2, cy + fh];
      const F4: [number, number] = [cx - fw / 2, cy + fh];

      // top plane
      fillPoly(
        [
          R([F1[0], F1[1]]),
          R([F1[0] + dvx, F1[1] + dvy]),
          R([F2[0] + dvx, F2[1] + dvy]),
          R([F2[0], F2[1]]),
        ],
        0.03,
        false,
      );

      const hashes = [0.3, 0.8, 0.55, 0.15, 0.7, 0.45, 0.9, 0.25, 0.6];
      const tabs: { x: number; y: number; label: string; i: number }[] = [];

      for (let i = 8; i >= 0; i--) {
        const fi = 0.07 + i * 0.105;
        const bcx = cx + dvx * fi;
        const bcy = cy + dvy * fi;
        const cwd = fw * (0.82 - 0.06 * fi);
        const hero = i === 1;
        const chh = hero ? fw * 0.24 : fw * (0.13 + 0.03 * hashes[i]);
        const tilt = (hashes[i] - 0.5) * 3;
        const lift = lifts[i] * fw * 0.11;
        const topY = bcy - chh - lift;

        const p1 = R([bcx - cwd / 2 + tilt, topY]);
        const p2 = R([bcx + cwd / 2 + tilt, topY]);
        const p3 = R([bcx + cwd / 2, bcy + 3]);
        const p4 = R([bcx - cwd / 2, bcy + 3]);

        // contact shadow, then the card face
        fillPoly(
          [
            [p1[0] - 2, p1[1] - 2],
            [p2[0] + 2, p2[1] - 2],
            [p3[0] + 2, p3[1] + 2],
            [p4[0] - 2, p4[1] + 2],
          ],
          0.05,
          false,
        );
        fillPoly([p1, p2, p3, p4], hero ? 1.0 : 0.92 - 0.18 * fi, true);

        const tf = [0.24, 0.5, 0.8, 0.12, 0.55, 0.85, 0.3, 0.56, 0.15][i];
        const tp = R([bcx - cwd / 2 + cwd * tf + tilt, topY]);
        tabs.push({ x: tp[0], y: tp[1], label: LABELS[i], i });
        hits.push({
          i,
          x0: bcx - cwd / 2,
          x1: bcx + cwd / 2,
          y0: topY - 14,
          y1: bcy + 3,
        });

        if (hero) {
          for (let ln = 0; ln < 5; ln++) {
            const ly = topY + 4 + ln * 5;
            const lw2 = cwd * (0.12 + 0.24 * hashes[ln % 5]);
            fillPoly(
              [
                R([bcx - cwd * 0.38, ly]),
                R([bcx + lw2, ly]),
                R([bcx + lw2, ly + 1.7]),
                R([bcx - cwd * 0.38, ly + 1.7]),
              ],
              0.25,
              false,
            );
          }
          const bdef = [
            [0.5, 0.3],
            [0.32, 0.12],
            [0.14, 0.22],
          ];
          for (let b = 0; b < 3; b++) {
            const by = topY + chh * (1 - bdef[b][0]);
          }
        } else {
          if (lifts[i] > 0.85) {
          }
          if (i === 0 || i === 4) {
          }
        }
      }

      // front + side faces, latch, plate
      fillPoly([R(F1), R(F2), R(F3), R(F4)], 0.6, true);
      fillPoly(
        [
          R(F1),
          R([F1[0] + dvx, F1[1] + dvy]),
          R([F4[0] + dvx, F4[1] + dvy]),
          R(F4),
        ],
        0.3,
        true,
      );
      const lw = fw * 0.15;
      const lh = fh * 0.32;
      const lcx = cx;
      const lcy = cy + fh * 0.34;
      fillPoly(
        [
          R([lcx - lw / 2, lcy - lh / 2]),
          R([lcx + lw / 2, lcy - lh / 2]),
          R([lcx + lw / 2, lcy + lh / 2]),
          R([lcx - lw / 2, lcy + lh / 2]),
        ],
        0.9,
        true,
      );
      fillPoly(
        [
          R([lcx - lw / 2 + 2, lcy - lh / 2 + 2]),
          R([lcx + lw / 2 - 2, lcy - lh / 2 + 2]),
          R([lcx + lw / 2 - 2, lcy + lh / 2 - 2]),
          R([lcx - lw / 2 + 2, lcy + lh / 2 - 2]),
        ],
        0.12,
        false,
      );
      const pcy = cy + fh * 0.74;
      fillPoly(
        [
          R([lcx - lw * 0.35, pcy - 2]),
          R([lcx + lw * 0.35, pcy - 2]),
          R([lcx + lw * 0.35, pcy + 2]),
          R([lcx - lw * 0.35, pcy + 2]),
        ],
        0.85,
        true,
      );

      // ---- one-shot scanline on load ------------------------------
      if (!reduced && el < 2.6) {
        const sy = Math.floor((el / 2.6) * bh);
        const sx0 = Math.max(0, Math.floor(cx - fw * 0.95));
        const sx1 = Math.min(bw - 1, Math.ceil(cx + fw * 0.75));
        for (let x = sx0; x <= sx1; x++) {
          const i2 = sy * bw + x;
          if (i2 >= 0 && i2 < scene.length) {
            scene[i2] = Math.min(1, scene[i2] + 0.4);
          }
        }
      }

      // ---- error-diffusion dither to 1 bit ------------------------
      // This IS the artwork. Without it every value is hard-thresholded
      // and the scene collapses into flat blocks with no texture, which
      // is exactly what happened when this loop was accidentally removed.
      for (let y = 0; y < bh; y++) {
        for (let x = 0; x < bw; x++) {
          const i2 = y * bw + x;
          const o = scene[i2];
          const nv = o > 0.5 ? 1 : 0;
          const err = (o - nv) / 8;
          scene[i2] = nv;
          if (x + 1 < bw) scene[i2 + 1] += err;
          if (x + 2 < bw) scene[i2 + 2] += err;
          if (y + 1 < bh) {
            if (x > 0) scene[i2 + bw - 1] += err;
            scene[i2 + bw] += err;
            if (x + 1 < bw) scene[i2 + bw + 1] += err;
          }
          if (y + 2 < bh) scene[i2 + 2 * bw] += err;
        }
      }

      // ---- map to the three-colour palette ------------------------
      const d = img.data;
      for (let i = 0; i < scene.length; i++) {
        const j = i * 4;
        const on = scene[i] > 0.5;
        const src = on ? LIT : GROUND;
        d[j] = src[0];
        d[j + 1] = src[1];
        d[j + 2] = src[2];
        d[j + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);

      // ---- crisp tab labels ---------------------------------------
      // The prototype hard-coded 11px against a 900px-wide canvas. The
      // panel here is whatever 54% of the viewport happens to be, and the
      // scene scales with it while fixed-size type does not — which makes
      // the tabs collide on narrower screens. Scale the label box with the
      // panel so the index tabs keep their spacing.
      ctxT.clearRect(0, 0, W, H);
      ctxT.textAlign = "center";
      ctxT.textBaseline = "middle";
      // Under ~520px the labels cannot be both legible and correctly
      // spaced against the shrunken stack, so drop them entirely and let
      // the dithered scene carry the image on phones.
      if (W < 520) return;
      const s = Math.max(0.72, Math.min(1, W / 900));
      ctxT.font = `600 ${(11 * s).toFixed(2)}px ${MONO_STACK}`;
      for (const tb of tabs) {
        const sx = tb.x * px;
        const sy = tb.y * px;
        const tw = ctxT.measureText(tb.label).width + 14 * s;
        const th = 17 * s;
        const on = tb.i === hov;
        ctxT.fillStyle = on ? "#7A1A2C" : "#F1EEE7";
        ctxT.fillRect(sx - tw / 2, sy - th, tw, th);
        ctxT.strokeStyle = "#7A1A2C";
        ctxT.lineWidth = Math.max(1, 1.5 * s);
        ctxT.strokeRect(sx - tw / 2, sy - th, tw, th);
        ctxT.fillStyle = on ? "#F1EEE7" : "#7A1A2C";
        ctxT.fillText(tb.label, sx, sy - th / 2 + 1);
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      draw();
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    resize();
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [pixelSize]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 320,
        overflow: "hidden",
        background: "var(--bl-accent)",
      }}
    >
      <canvas
        ref={cvRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          imageRendering: "pixelated",
        }}
      />
      <canvas
        ref={cvTRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          pointerEvents: "none",
        }}
      />

    </div>
  );
}
