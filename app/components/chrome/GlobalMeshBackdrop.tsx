"use client";

import { MeshCanvas } from "../home/MeshCanvas";

/**
 * Site-wide hero mesh, mounted in the root layout so the WebGL context,
 * three.js scene, geometry, uniforms, and animation state persist across
 * every route transition. One canvas for the session — navigating Home
 * → Services → Careers does not re-allocate buffers or reset `uTime`.
 *
 * Positioning: `position: fixed; inset: 0; z-index: 0` pins the mesh to
 * the viewport. Page content is later in DOM order (Nav, main, Footer)
 * and paints on top. Sections that want to expose the mesh (Hero,
 * InnerHero) render with a transparent background; the rest keep their
 * solid surfaces and naturally cover the mesh as the user scrolls past.
 */
export function GlobalMeshBackdrop() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <MeshCanvas />
    </div>
  );
}
