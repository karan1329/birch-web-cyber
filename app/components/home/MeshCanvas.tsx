"use client";

import { useCallback, useEffect, useState } from "react";
import { MeshCanvas2D } from "./MeshCanvas2D";
import { MeshCanvasGL } from "./MeshCanvasGL";

type Backend = "gl" | "2d" | "static";

/**
 * Hero mesh canvas · smart picker between the WebGL2/three.js backend
 * and the 2D canvas fallback.
 *
 * Routing:
 *   - `prefers-reduced-motion`     → `2d` with `staticFrame` (one paint).
 *   - WebGL2 unavailable           → `2d` (animated).
 *   - Coarse pointer + narrow vp   → `2d` (mobile/touch; GL path on
 *                                    integrated mobile GPUs reliably
 *                                    thermals, and the cursor uniform
 *                                    has nothing meaningful to drive).
 *   - WebGL context lost mid-run   → flips to `2d` for the session.
 *   - otherwise                    → `gl`.
 *
 * The picker uses `null` as an explicit pre-decision state so the host
 * `<canvas>` placeholder reserves space for one paint and we avoid a
 * flash of empty hero. The placeholder matches the canvas absolute-fill
 * styling used by both backends.
 */
export function MeshCanvas() {
  const [backend, setBackend] = useState<Backend | null>(null);

  // Stable callback so `MeshCanvasGL` doesn't see a fresh prop identity
  // on every render. Invoked from the GL backend's `webglcontextlost`
  // handler (driver crash, long backgrounding); flips us to the 2D
  // backend for the rest of the session.
  const onContextLost = useCallback(() => {
    setBackend("2d");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let pick: Backend;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduced motion: single static frame, no animation loop.
      pick = "static";
    } else {
      // Capability test. `failIfMajorPerformanceCaveat` rejects software
      // renderers / known-slow drivers so we fall back rather than ship
      // a janky GL path.
      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2", {
        failIfMajorPerformanceCaveat: true,
      });
      if (!gl) {
        pick = "2d";
      } else if (
        // Mobile heuristic: coarse pointer + narrow viewport → 2D. The
        // GL path is gated to laptop/desktop where the dedicated GPU
        // and mouse-driven uniform actually matter.
        window.matchMedia("(pointer: coarse)").matches &&
        window.innerWidth < 900
      ) {
        pick = "2d";
      } else {
        pick = "gl";
      }
    }
    // One-shot capability decision; no cascading-render risk that the
    // react-hooks/set-state-in-effect rule guards against. The same
    // pattern is already used in `useTheme.ts` for localStorage rehydrate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBackend(pick);
  }, []);

  if (backend === null) {
    return (
      <canvas
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
  if (backend === "gl") return <MeshCanvasGL onContextLost={onContextLost} />;
  if (backend === "static") return <MeshCanvas2D staticFrame />;
  return <MeshCanvas2D />;
}
