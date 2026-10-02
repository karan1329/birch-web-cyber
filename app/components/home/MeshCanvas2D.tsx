"use client";

import { useEffect, useRef } from "react";

/**
 * Hero canvas · animated 3D wireframe mesh with cursor-driven lighting.
 *
 * This is the **2D fallback** path. The smart picker (`MeshCanvas.tsx`)
 * routes here when WebGL2 is unavailable, when the device has a coarse
 * pointer + narrow viewport, when the GL context is lost, or (with
 * `staticFrame`) when the user has reduced-motion turned on.
 *
 * - cols × rows grid projected with cheap perspective math.
 * - z driven by stacked sine/cosine waves + a radial fall-off so the
 *   centre lifts and edges flatten.
 * - mouse position eased into camera tilt (subtle parallax).
 * - vertices within a radius of the cursor light up in neon; the
 *   intensity falls off with distance. High-z vertices near the cursor
 *   get the brightest core. No periodic auto-glow — every photon
 *   follows the cursor.
 *
 * Reads `--bl-neon-rgb` from `:root` per frame so a swatch swap
 * recolours the mesh instantly without a remount. Reads `light` class
 * to pick a mesh stroke colour that flips with theme.
 *
 * Props:
 *   - `staticFrame` (default false): paint exactly one frame and stop.
 *     Used by the reduced-motion path so the surface still shows but
 *     does not animate.
 */
type Pt = { x: number; y: number; z: number; depth: number; fall: number };

/** Alpha buckets for the batched wireframe strokes. */
const EDGE_LEVELS = 12;

export function MeshCanvas2D({
  staticFrame = false,
}: { staticFrame?: boolean } = {}) {
  const cvRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    // Track mouse in canvas-local coordinates so the spotlight follows
    // the cursor accurately regardless of where the hero sits on screen.
    const mouse = {
      x: 0.5,
      y: 0.5,
      tx: 0.5,
      ty: 0.5,
      // Canvas-relative cursor (pixels). Defaults centred so first paint
      // shows a soft glow in the middle rather than off-screen.
      lx: 0,
      ly: 0,
      tlx: 0,
      tly: 0,
    };
    // Initialise canvas-relative defaults to the visual centre.
    mouse.lx = mouse.tlx = cv.clientWidth * 0.5;
    mouse.ly = mouse.tly = cv.clientHeight * 0.6;

    // Full device resolution. An earlier pass rendered this at 1/3 scale to
    // borrow the hero's dithered look, but at that size each vertex became a
    // chunky block and the waveform stopped reading as a fine surface. The
    // pixel-dither language belongs to the hero canvas, where it is the
    // subject; the ambient backdrop needs to stay sleek.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.max(1, Math.round(cv.clientWidth * dpr));
      cv.height = Math.max(1, Math.round(cv.clientHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
      const rect = cv.getBoundingClientRect();
      mouse.tlx = e.clientX - rect.left;
      mouse.tly = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const rootStyle = getComputedStyle(document.documentElement);
    const readVar = (name: string, fallback: string) =>
      rootStyle.getPropertyValue(name).trim() || fallback;

    // Touch devices have no cursor to drive the light, so 30fps reads the
    // same and halves the main-thread cost on the weakest hardware. Motion
    // is time-based so the drift speed is identical at either rate.
    const minFrameMs = window.matchMedia("(pointer: coarse)").matches ? 32 : 0;
    let last = 0;

    const draw = (now = performance.now()) => {
      if (!staticFrame && now - last < minFrameMs) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const dtScale = last ? Math.min(3, (now - last) / (1000 / 60)) : 1;
      last = now;
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      // Cursor-local coords ease faster than the parallax tilt so the
      // light feels tightly attached to the pointer rather than lagging.
      mouse.lx += (mouse.tlx - mouse.lx) * 0.18;
      mouse.ly += (mouse.tly - mouse.ly) * 0.18;
      ctx.clearRect(0, 0, w, h);

      const cols = 56;
      const rows = 32;
      const gridW = w * 1.6;
      const gridH = h * 2.2;
      const cx = w * 0.5;
      const cy = h * 0.72;
      const persp = 760;
      const tiltX = -0.62 + (mouse.y - 0.5) * 0.12;
      const tiltY = (mouse.x - 0.5) * 0.18;

      t += 0.0065 * dtScale;

      const rgb = readVar("--bl-accent-rgb", "212,64,90");
      // One hue family: the wireframe is cranberry too, just at a much
      // lower alpha than the cursor highlight. No second chroma anywhere.
      const mesh = rgb;

      const pts: Pt[] = new Array(cols * rows);

      for (let yi = 0; yi < rows; yi++) {
        for (let xi = 0; xi < cols; xi++) {
          const u = xi / (cols - 1);
          const v = yi / (rows - 1);
          const dx = u - 0.5;
          const dy = v - 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const fall = Math.max(0, 1 - dist * 1.55);
          const px = (u - 0.5) * gridW;
          const py = (v - 0.5) * gridH;
          const z =
            (Math.sin(u * 7 + t * 1.3) * 26 +
              Math.cos(v * 5 + t * 1.0) * 30 +
              Math.sin((u + v) * 4.5 + t * 1.5) * 18 +
              Math.cos((u - v) * 8 - t * 0.9) * 12) *
            fall;

          const cX = Math.cos(tiltX);
          const sX = Math.sin(tiltX);
          const y1 = py * cX - z * sX;
          const z1 = py * sX + z * cX;
          const cY = Math.cos(tiltY);
          const sY = Math.sin(tiltY);
          const x2 = px * cY + z1 * sY;
          const z2 = -px * sY + z1 * cY;
          const f = persp / (persp + z2 + 220);
          pts[yi * cols + xi] = {
            x: cx + x2 * f,
            y: cy + y1 * f,
            z,
            depth: f,
            fall,
          };
        }
      }

      // Edges are batched into alpha buckets: one path + one stroke per
      // bucket instead of one per edge (~3,500 strokes/frame before). The
      // alpha is quantised to EDGE_LEVELS steps, which is invisible at
      // 0.20 max opacity. Tuned against the 0.90 `--bl-section-veil` that
      // sits over the mesh below the hero; if the texture ever needs to
      // read louder, the veil is the better dial than this alpha.
      const buckets: Path2D[] = Array.from(
        { length: EDGE_LEVELS },
        () => new Path2D(),
      );
      const addEdge = (a: Pt, b: Pt) => {
        if (a.fall < 0.04 || b.fall < 0.04) return;
        const lvl = Math.min(EDGE_LEVELS - 1, Math.floor(a.fall * EDGE_LEVELS));
        buckets[lvl].moveTo(a.x, a.y);
        buckets[lvl].lineTo(b.x, b.y);
      };
      for (let yi = 0; yi < rows; yi++) {
        for (let xi = 0; xi < cols - 1; xi++) {
          addEdge(pts[yi * cols + xi], pts[yi * cols + xi + 1]);
        }
      }
      for (let yi = 0; yi < rows - 1; yi++) {
        for (let xi = 0; xi < cols; xi++) {
          addEdge(pts[yi * cols + xi], pts[(yi + 1) * cols + xi]);
        }
      }
      ctx.lineWidth = 0.9;
      for (let lvl = 0; lvl < EDGE_LEVELS; lvl++) {
        ctx.strokeStyle = `rgba(${mesh},${((lvl + 0.5) / EDGE_LEVELS) * 0.2})`;
        ctx.stroke(buckets[lvl]);
      }

      // Cursor-driven neon highlights.
      // Vertices within `cursorRadius` of the eased cursor position light
      // up in neon, intensity falling off with distance. High-z vertices
      // near the cursor get the brightest cores so the wave still shapes
      // the spotlight organically.
      const cursorRadius = Math.min(w, h) * 0.34;
      const invR = 1 / cursorRadius;
      for (const p of pts) {
        if (p.fall < 0.04) continue;
        const dx = p.x - mouse.lx;
        const dy = p.y - mouse.ly;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > cursorRadius) continue;
        // Smooth radial fall-off (cubic-eased) so the spotlight edges
        // dissolve rather than cutting off.
        const u = 1 - dist * invR;
        const cursorWeight = u * u * (3 - 2 * u);
        if (cursorWeight < 0.02) continue;
        // Lift high-z vertices a touch so the surface ripples shine
        // through the spotlight.
        const zNorm = Math.max(0.25, Math.min(1, (p.z + 60) / 130));
        const intensity = cursorWeight * zNorm;
        // Vertex dot + its falloff. Both were sized for the old chunky
        // buffer; at native resolution they need to be much finer or the
        // waveform reads as a field of blobs instead of points of light.
        const r = 2.2 * p.depth * p.fall;
        const glowR = r * 3.2 * (0.5 + intensity * 0.7);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, `rgba(${rgb},${0.55 * intensity})`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${rgb},${0.85 * p.fall * intensity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      if (staticFrame) return;
      raf = requestAnimationFrame(draw);
    };

    // Start on idle, not on mount: the first frames of this canvas would
    // otherwise compete with hydration and the headline's first paint. The
    // canvas fades in once it has something to show.
    let idle = 0;
    let started = false;
    const begin = () => {
      started = true;
      cv.style.opacity = "1";
      raf = requestAnimationFrame(draw);
    };
    // Safari has no requestIdleCallback; fall back to a short timeout.
    const ric = window.requestIdleCallback as
      | typeof window.requestIdleCallback
      | undefined;
    const cic = window.cancelIdleCallback as
      | typeof window.cancelIdleCallback
      | undefined;
    if (ric) idle = ric(begin, { timeout: 1200 });
    else idle = window.setTimeout(begin, 300);

    return () => {
      if (!started) {
        if (ric && cic) cic(idle);
        else clearTimeout(idle);
      }
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [staticFrame]);

  return (
    <canvas
      ref={cvRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 0.8s cubic-bezier(0.2,0.7,0.2,1)",
      }}
    />
  );
}
