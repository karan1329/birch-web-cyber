"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  LineSegments,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { LINE_FRAG, POINT_FRAG, VERT } from "./mesh/shaders";
import {
  createPerfMonitor,
  nextTier,
  TIER_CONFIG,
  type Tier,
} from "./mesh/perf";

type Props = {
  /**
   * Called when the WebGL context is lost or the renderer constructor
   * throws. The picker uses this to flip to the 2D backend for the rest
   * of the session rather than retry on a broken context.
   */
  onContextLost?: () => void;
};

/**
 * Hero mesh canvas · WebGL2 / three.js backend.
 *
 * Final state (after chunk 5 of the upgrade):
 *   - 96×56 indexed wireframe + additive Points pass, GPU-displaced in
 *     the vertex shader. Cursor raycast onto the world-Y=0 plane gives
 *     `uMouseWorld`; the dome lift + cursor-weighted halos run entirely
 *     in shaders.
 *   - Per-frame `--bl-neon-rgb` and `.light` reads keep `uNeon`/`uInk`
 *     in sync with the active theme; swatch swaps recolour the mesh
 *     within one frame, no remount.
 *   - Adaptive perf: rolling 60-frame dt average drops the grid to
 *     72×40 (still with points) or 56×32 (lines only) if dt exceeds
 *     budget. Downshift only — no flicker from oscillation.
 *   - Visibility pause: the rAF loop stops while the tab is hidden and
 *     restarts from a fresh `lastT` so the resumed frame has no dt
 *     spike (which would otherwise jolt `uTime`).
 *   - `webglcontextlost` handler bubbles up to the picker via
 *     `onContextLost` so we fall back to the 2D backend for the
 *     session instead of retrying on a broken context.
 *
 * Convention:
 *   - Grid plane lives on world XZ; height field rises in world Y.
 *   - Camera is above + behind, looking at a point above the plane so
 *     the mesh occupies the lower portion of the hero — matches the
 *     2D fallback's `cy = h * 0.72` composition.
 */
export function MeshCanvasGL({ onContextLost }: Props = {}) {
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  // Keep the contextlost callback fresh across renders so the listener
  // attached in useEffect always sees the latest closure without us
  // having to retear the whole scene. The sync runs on every render that
  // changes `onContextLost`; in practice the picker memoises it once.
  const onLostRef = useRef(onContextLost);
  useEffect(() => {
    onLostRef.current = onContextLost;
  }, [onContextLost]);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;

    // The renderer constructor can throw on misbehaving drivers or
    // when a StrictMode dev double-mount races with the canvas's prior
    // context. If it does, signal the picker so we fall to the 2D
    // backend for the session instead of leaving a blank hero.
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas: cv,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      onLostRef.current?.();
      return;
    }
    // Native resolution. A sub-resolution buffer made the vertices read as
    // oversized blocks; the pixel-dither language lives in the hero canvas,
    // where it is the subject, not here in the ambient backdrop.
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 1, 4000);
    camera.position.set(0, 260, 720);
    camera.lookAt(0, 100, 0);

    const uniforms = {
      uTime: { value: 0 },
      uMouseWorld: { value: new Vector3() },
      uMouseStrength: { value: 0 },
      // Grid spans wider than the visible viewport so the radial
      // fall-off (aFall) sends edges to zero offscreen — matches the
      // 2D fallback's soft-fade-to-corners character.
      uGridW: { value: 1400 },
      uGridH: { value: 1100 },
      uCursorRadius: { value: 350 },
      // Foreground colour for the wireframe; flipped between dark and
      // light per frame in the rAF loop below.
      uInk: { value: new Vector3(237 / 255, 237 / 255, 239 / 255) },
      // Slightly stronger than the 2D fallback's 0.1 because the global
      // mesh is the headline visual on every page — needs to read at rest,
      // not just when the cursor halos are illuminating a region. The
      // additive Points pass still carries the cursor-driven brightness.
      uLineAlpha: { value: 0.18 },
      // Active neon swatch; reread from `--bl-neon-rgb` per frame so a
      // swatch swap (Lime → Cobalt → Burgundy → Bone) recolours the
      // additive halos within one frame, no remount.
      uNeon: { value: new Vector3(205 / 255, 243 / 255, 108 / 255) },
    };

    // Layer = geometry + materials + scene-attached meshes for one
    // perf tier. Downshifting disposes the current layer and builds a
    // fresh one at the lower grid resolution. The uniforms object is
    // shared across rebuilds so `uTime`, mouse, and theme state survive.
    let tier: Tier = 2;
    let layer = buildLayer(tier, uniforms, scene);

    const resize = () => {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Paint one frame immediately so the initial state and any resize
      // is visible even if the rAF loop has not ticked yet (background
      // tabs, throttled headless contexts, deeply nested iframes).
      renderer.render(scene, camera);
    };
    resize();
    window.addEventListener("resize", resize);

    // Cursor → uniforms. NDC mouse drives both the camera-parallax sway
    // and the raycast onto the y=0 surface plane that produces
    // `uMouseWorld` for the vertex shader's dome lift.
    const mouseTarget = new Vector2();
    const mouseEased = new Vector2();
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 1, 0), 0);
    const tmpHit = new Vector3();
    let strengthTarget = 0;
    let strengthEased = 0;

    const onMove = (e: PointerEvent) => {
      mouseTarget.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
      strengthTarget = 1;
    };
    const onLeaveDoc = () => {
      strengthTarget = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveDoc);

    const baseCam = camera.position.clone();
    const lookAt = new Vector3(0, 100, 0);

    const rootStyle = getComputedStyle(document.documentElement);
    const rootEl = document.documentElement;

    const perf = createPerfMonitor();
    const TIER_CHECK_INTERVAL_MS = 1500;
    let lastTierCheckAt = performance.now();

    let raf = 0;
    let lastT = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastT) / 1000;
      lastT = now;

      uniforms.uTime.value += dt;

      mouseEased.lerp(mouseTarget, 0.18);
      strengthEased += (strengthTarget - strengthEased) * 0.08;
      uniforms.uMouseStrength.value = strengthEased;

      raycaster.setFromCamera(mouseEased, camera);
      if (raycaster.ray.intersectPlane(plane, tmpHit)) {
        uniforms.uMouseWorld.value.copy(tmpHit);
      }

      // Subtle camera parallax — matches the 2D fallback's tilt sway.
      camera.position.set(
        baseCam.x + mouseEased.x * 60,
        baseCam.y + mouseEased.y * 30,
        baseCam.z,
      );
      camera.lookAt(lookAt);

      // Live theme uniforms. Reads happen before the draw so the frame
      // is internally consistent (no mid-frame colour seam).
      const neonRaw = rootStyle.getPropertyValue("--bl-accent-rgb").trim();
      if (neonRaw) {
        const parts = neonRaw.split(",").map(Number);
        if (
          parts.length === 3 &&
          parts.every((n) => !Number.isNaN(n))
        ) {
          uniforms.uNeon.value.set(
            parts[0] / 255,
            parts[1] / 255,
            parts[2] / 255,
          );
        }
      }
      // One hue family: the wireframe shares the cranberry accent rather
      // than introducing a second chroma. Alpha in the shader keeps it far
      // quieter than the cursor highlight.
      uniforms.uInk.value.copy(uniforms.uNeon.value);

      renderer.render(scene, camera);

      // Adaptive perf — check every TIER_CHECK_INTERVAL_MS once the
      // ring buffer is full, so a single slow frame can't trigger a
      // premature downshift.
      const stat = perf.push(dt);
      if (
        stat.filled &&
        tier > 0 &&
        now - lastTierCheckAt > TIER_CHECK_INTERVAL_MS
      ) {
        const next = nextTier(tier, stat.avg);
        if (next !== tier) {
          tier = next;
          layer.dispose();
          layer = buildLayer(tier, uniforms, scene);
        }
        lastTierCheckAt = now;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Pause the loop while the tab is hidden. Resume with a fresh
    // `lastT` so the first frame after restore doesn't carry a huge
    // dt (which would jolt `uTime` and visibly snap the surface).
    const onVis = () => {
      if (document.visibilityState !== "visible") {
        if (raf !== 0) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (raf === 0) {
        lastT = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // Context loss (driver crash, long backgrounding, GPU process kill)
    // → stop the loop and signal the picker. The picker falls to the
    // 2D backend for the rest of the session.
    const onCtxLost = (e: Event) => {
      e.preventDefault();
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      onLostRef.current?.();
    };
    cv.addEventListener("webglcontextlost", onCtxLost);

    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveDoc);
      document.removeEventListener("visibilitychange", onVis);
      cv.removeEventListener("webglcontextlost", onCtxLost);
      layer.dispose();
      renderer.dispose();
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

type Layer = { dispose: () => void };

/**
 * Build the geometry + materials + scene-attached meshes for one perf
 * tier. Returns a `dispose()` that removes the meshes from the scene
 * and disposes the GPU resources. The shared `uniforms` object is
 * referenced (not copied) by the materials, so per-frame updates
 * survive a `buildLayer → dispose → buildLayer` rebuild during a tier
 * downshift.
 */
function buildLayer(
  tier: Tier,
  uniforms: Record<string, { value: unknown }>,
  scene: Scene,
): Layer {
  const cfg = TIER_CONFIG[tier];
  const grid = buildGrid(cfg.cols, cfg.rows);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(grid.positions, 3));
  geometry.setAttribute("aFall", new BufferAttribute(grid.fall, 1));
  geometry.setIndex(new BufferAttribute(grid.indices, 1));

  const lineMat = new ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: LINE_FRAG,
    uniforms,
    transparent: true,
    depthWrite: false,
  });
  const lines = new LineSegments(geometry, lineMat);
  scene.add(lines);

  let pointMat: ShaderMaterial | null = null;
  let points: Points | null = null;
  if (cfg.withPoints) {
    pointMat = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: POINT_FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    points = new Points(geometry, pointMat);
    scene.add(points);
  }

  return {
    dispose() {
      scene.remove(lines);
      if (points) scene.remove(points);
      geometry.dispose();
      lineMat.dispose();
      pointMat?.dispose();
    },
  };
}

/**
 * Build a `cols × rows` grid centred on the origin in `[-0.5, 0.5]²`,
 * with a precomputed radial fall-off attribute and an index buffer of
 * horizontal + vertical line pairs (consumed by `LineSegments`).
 *
 * The position attribute is 3-component (z = 0) because three.js's
 * built-in `position` attribute is conventionally vec3; the vertex
 * shader reads `position.xy` and ignores the z.
 */
function buildGrid(cols: number, rows: number) {
  const total = cols * rows;
  const positions = new Float32Array(total * 3);
  const fall = new Float32Array(total);

  for (let yi = 0; yi < rows; yi++) {
    for (let xi = 0; xi < cols; xi++) {
      const idx = yi * cols + xi;
      const u = xi / (cols - 1);
      const v = yi / (rows - 1);
      const dx = u - 0.5;
      const dy = v - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      positions[idx * 3] = dx;
      positions[idx * 3 + 1] = dy;
      positions[idx * 3 + 2] = 0;
      // Same fall-off as the 2D fallback for character parity.
      fall[idx] = Math.max(0, 1 - dist * 1.55);
    }
  }

  const hEdges = (cols - 1) * rows;
  const vEdges = cols * (rows - 1);
  const indices = new Uint16Array((hEdges + vEdges) * 2);
  let i = 0;
  for (let yi = 0; yi < rows; yi++) {
    for (let xi = 0; xi < cols - 1; xi++) {
      indices[i++] = yi * cols + xi;
      indices[i++] = yi * cols + xi + 1;
    }
  }
  for (let yi = 0; yi < rows - 1; yi++) {
    for (let xi = 0; xi < cols; xi++) {
      indices[i++] = yi * cols + xi;
      indices[i++] = (yi + 1) * cols + xi;
    }
  }

  return { positions, fall, indices };
}
