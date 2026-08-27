"use client";

import dynamic from "next/dynamic";

/**
 * The Fractional Security Office cabinet loop.
 *
 * This replaces the exported MP4. The film was a 18MB H.264 encode being
 * scaled into a responsive panel, which is where the tearing came from —
 * the source here is the original SVG scene, so it renders at whatever
 * resolution the panel happens to be and never degrades.
 *
 * Loaded client-side only: the scene drives a requestAnimationFrame clock
 * and measures the viewport, neither of which means anything on the server.
 * The poster frame stands in until it mounts, so the panel is never empty
 * and never flashes a different colour.
 *
 * The artwork's aspect ratio (1600×1000) is preserved by the scene itself.
 */
const CabinetLoopRoot = dynamic(
  () => import("./cabinet/cabinet-loop-scene").then((m) => m.CabinetLoopRoot),
  {
    ssr: false,
    loading: () => <PosterFallback />,
  },
);

/** The film's own ground, sampled from the artwork. Not the accent token. */
export const FILM_GROUND = "#B53752";

function PosterFallback() {
  return (
    <div style={{ position: "absolute", inset: 0, background: FILM_GROUND }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/drawer-cyber-poster.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}

export function CabinetLoop() {
  return (
    <div
      role="img"
      aria-label="An isometric filing drawer labelled Fractional Security Office. A small figure stamps a vendor security questionnaire FILED and files it, along with a DPDP Act compliance sheet and an AWS security review, into the drawer's tabbed slots."
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 320,
        overflow: "hidden",
        background: FILM_GROUND,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CabinetLoopRoot />
    </div>
  );
}
