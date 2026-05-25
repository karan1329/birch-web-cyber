"use client";

import { useEffect, useRef } from "react";

/**
 * Hero canvas · animated 3D wireframe mesh with cursor-driven lighting.
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
 */
export function MeshCanvas() {
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
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

    const draw = () => {
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

      t += 0.0065;

      const rgb = readVar("--bl-neon-rgb", "205,243,108");
      const isLight =
        document.documentElement.classList.contains("light");
      const mesh = isLight ? "10,10,12" : "237,237,239";

      const pts: { x: number; y: number; z: number; depth: number; fall: number }[] =
        new Array(cols * rows);

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

      // Horizontal edges
      for (let yi = 0; yi < rows; yi++) {
        for (let xi = 0; xi < cols - 1; xi++) {
          const a = pts[yi * cols + xi];
          const b = pts[yi * cols + xi + 1];
          if (a.fall < 0.04 || b.fall < 0.04) continue;
          ctx.strokeStyle = `rgba(${mesh},${a.fall * 0.1})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // Vertical edges
      for (let yi = 0; yi < rows - 1; yi++) {
        for (let xi = 0; xi < cols; xi++) {
          const a = pts[yi * cols + xi];
          const b = pts[(yi + 1) * cols + xi];
          if (a.fall < 0.04 || b.fall < 0.04) continue;
          ctx.strokeStyle = `rgba(${mesh},${a.fall * 0.1})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
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
        const r = 5 * p.depth * p.fall;
        const glowR = r * 6 * (0.5 + intensity * 0.7);
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

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

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
      }}
    />
  );
}
