"use client";

import { NAMED_CLIENTS, PERMISSION_LINE } from "../../lib/clients";

type Props = {
  /**
   * `hero`   — inside the first viewport, under the hero text (HP-9).
   *            Carries the "A few of them" label and the permission line.
   * `inline` — smaller track for use inside another section.
   * `standalone` — legacy full-width track.
   */
  variant?: "standalone" | "inline" | "hero";
};

/**
 * Horizontal scrolling client strip. Names come from the canonical list in
 * lib/clients.ts — nothing here hard-codes a client.
 *
 * Per HP-9 the marquee now lives in the hero's first viewport, so it is
 * visible before any scroll. The duplicate that used to sit inside
 * Who We Work With has been removed.
 */
export function ClientMarquee({ variant = "inline" }: Props) {
  const loop = [...NAMED_CLIENTS, ...NAMED_CLIENTS, ...NAMED_CLIENTS];
  const inline = variant === "inline";
  const hero = variant === "hero";

  const track = (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: hero ? "12px 0" : inline ? "20px 0" : "28px 0",
        borderTop: inline ? "1px solid var(--bl-rule)" : undefined,
        borderBottom: inline ? "1px solid var(--bl-rule)" : undefined,
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: hero ? 40 : inline ? 48 : 72,
          width: "max-content",
          // Slower loop on the smaller variants so the eye can settle on
          // each name as it passes.
          animation: `bl-ticker-move ${hero ? 46 : inline ? 42 : 55}s linear infinite`,
        }}
      >
        {loop.map((p, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: hero ? 40 : inline ? 48 : 72,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: hero
                  ? "clamp(14px, 1.05vw, 16px)"
                  : inline
                    ? "clamp(16px, 1.4vw, 20px)"
                    : "clamp(22px, 2.2vw, 32px)",
                letterSpacing: "-0.015em",
                color: "var(--bl-fg)",
                opacity: 0.72,
                whiteSpace: "nowrap",
              }}
            >
              {p}
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--bl-neon)",
                opacity: 0.55,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );

  if (!hero) return track;

  // HP-9 · in the hero window, the strip is labelled and carries the
  // permission line directly beneath it.
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: 9.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
        }}
      >
        A few of them
      </span>
      {track}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 10.5,
          lineHeight: 1.5,
          color: "var(--bl-fg3)",
        }}
      >
        {PERMISSION_LINE}
      </span>
    </div>
  );
}
