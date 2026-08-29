"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

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

/**
 * The scene's own cycle, the sum of the seventeen scene durations in
 * `cabinet-loop-scene.jsx`. Kept here so the soundtrack can be locked to the
 * same clock. If a scene duration changes, this changes with it.
 */
const LOOP_SECONDS = 33.6;

/**
 * Length of `public/cabinet-loop.m4a`. Karan re-cut the track to the scene's
 * exact length, so this is 1:1 with LOOP_SECONDS and the music lands on the
 * same beats every pass. Keep the two equal.
 */
const TRACK_SECONDS = 33.6;

/**
 * How far the track may drift from where the animation says it should be
 * before we correct it. Below this, leaving it alone is inaudible; a
 * correction, however small, is a click.
 *
 * Small on purpose. AAC cannot encode a 33.600s source as exactly 33.600s:
 * the encoder adds priming and padding, and the decoded file measures 33.67s.
 * That means the track loses roughly 70ms against the animation on every
 * pass. A loose tolerance lets that accumulate until the correction is a jump
 * you can hear; at 80ms it is corrected about once per pass, by an amount
 * short enough to pass for nothing at all.
 */
const DRIFT_TOLERANCE = 0.08;

/** Shortest distance between two points on a loop of length `len`. */
function loopDistance(a: number, b: number, len: number): number {
  const d = Math.abs(a - b) % len;
  return Math.min(d, len - d);
}

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

/**
 * The soundtrack, phase-locked to the animation.
 *
 * The track is cut to the scene's exact length, so one pass of the music is
 * one pass of the film and the two stay locked pass after pass. Turning sound
 * on mid-scene does not start the track from the top; it drops the needle at
 * the position the animation has already reached, so the music is where it
 * should be rather than a scene behind.
 *
 * Sound is off until asked for. Every browser blocks audio autoplay until a
 * gesture, so an `autoplay` attribute here would not play the track, it would
 * just fail silently and differently per browser. The toggle is the honest
 * version, and a site that makes noise unasked is worse than one that does
 * not.
 */
function SoundToggle({ startedAt }: { startedAt: React.RefObject<number> }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  /** Where the track should be, given how long the animation has run. */
  const targetTime = useCallback(() => {
    const elapsed = (performance.now() - (startedAt.current ?? 0)) / 1000;
    return (elapsed % LOOP_SECONDS) % TRACK_SECONDS;
  }, [startedAt]);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
      return;
    }
    a.currentTime = targetTime();
    // play() rejects if the gesture is not recognised. Swallow it and stay
    // visibly off rather than showing a control that lies about its state.
    a.play().then(
      () => setOn(true),
      () => setOn(false),
    );
  }, [on, targetTime]);

  // Audio and rAF clocks drift apart over minutes. Nudge, but only when the
  // gap is big enough that the correction is cheaper than the drift.
  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => {
      const a = audioRef.current;
      if (!a || a.paused) return;
      if (
        loopDistance(a.currentTime, targetTime(), TRACK_SECONDS) >
        DRIFT_TOLERANCE
      ) {
        a.currentTime = targetTime();
      }
    }, 2000);
    return () => window.clearInterval(id);
  }, [on, targetTime]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/cabinet-loop.m4a"
        loop
        preload="none"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Mute the soundtrack" : "Play the soundtrack"}
        style={{
          position: "absolute",
          right: "clamp(12px, 1.4vw, 22px)",
          bottom: "clamp(12px, 1.4vw, 22px)",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 999,
          border: "1px solid rgba(241, 238, 231, 0.45)",
          background: "rgba(18, 18, 18, 0.30)",
          color: "#F1EEE7",
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "-0.005em",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 6h2.5L9 3v10L5.5 10H3z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {on ? (
            <path
              d="M11.4 5.4a3.6 3.6 0 0 1 0 5.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M11.2 6.2l3.2 3.6M14.4 6.2l-3.2 3.6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          )}
        </svg>
        {on ? "Sound on" : "Sound"}
      </button>
    </>
  );
}

export function CabinetLoop() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const startedAt = useRef<number>(0);

  /**
   * Frame zero of the animation, which is NOT when this component mounts.
   * The scene is a dynamic import, so its clock starts whenever that chunk
   * finishes loading, some unknown number of milliseconds later. Anchoring
   * the soundtrack to this component's mount put the music ahead of the
   * picture by exactly the download time, which is why it sounded off.
   *
   * The scene's <svg> lands in the same commit that starts its clock, so
   * watching for it gives frame zero to within one frame.
   */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (host.querySelector("svg")) {
      startedAt.current = performance.now();
      return;
    }
    const obs = new MutationObserver(() => {
      if (host.querySelector("svg")) {
        startedAt.current = performance.now();
        obs.disconnect();
      }
    });
    obs.observe(host, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
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
      <SoundToggle startedAt={startedAt} />
    </div>
  );
}
