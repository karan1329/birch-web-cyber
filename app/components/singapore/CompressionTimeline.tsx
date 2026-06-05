"use client";

/**
 * Vertical neon-spine timeline. Events are spaced evenly along the
 * spine — uniform gap between adjacent rows. The compression theme is
 * conveyed by the date labels themselves (the cluster of 2026 dates
 * speaks for itself), not by spatial proportionality.
 *
 * Regulator coding lives in the dot colour (MAS = lime, PDPC = dim
 * neon, CSA = neutral, Cyber Act = neutral) — no separate pill row.
 * Each event is a single line: dot · date · body. Tight typography
 * keeps row height near 26px so the spine reads as a clean ruled
 * column.
 */

export type Regulator = "MAS" | "PDPC" | "CSA" | "Cyber Act";

export type CompressionEvent = {
  /** "11 Dec 2023" · "H2 2026". Ranges are supported. */
  date: string;
  body: string;
  regulator?: Regulator;
  /** Soften the spine dot to a hollow ring for date ranges. */
  isRange?: boolean;
};

type Props = {
  events: CompressionEvent[];
  /** Defaults to 6 Jun 2026 — pinning avoids SSR/hydration drift. */
  today?: Date;
  /** Uniform vertical gap (px) between adjacent events. */
  gap?: number;
};

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseDate(raw: string): Date {
  const half = raw.match(/^H([12])\s+(\d{4})$/i);
  if (half) {
    const year = parseInt(half[2], 10);
    const month = half[1] === "2" ? 9 : 3;
    return new Date(year, month, 15);
  }
  const std = raw.match(/^(\d{1,2})\s+(\w{3})\s+(\d{4})$/);
  if (std) {
    const day = parseInt(std[1], 10);
    const month = MONTHS[std[2].toLowerCase()];
    const year = parseInt(std[3], 10);
    if (month !== undefined) return new Date(year, month, day);
  }
  return new Date(raw);
}

const DOT_COLOR: Record<Regulator, string> = {
  MAS: "var(--bl-neon)",
  PDPC: "rgba(var(--bl-neon-rgb), 0.55)",
  CSA: "rgba(237, 237, 239, 0.55)",
  "Cyber Act": "rgba(237, 237, 239, 0.35)",
};

const DEFAULT_TODAY = new Date(2026, 5, 6);

export function CompressionTimeline({
  events,
  today = DEFAULT_TODAY,
  gap = 18,
}: Props) {
  const sorted = [...events]
    .map((e) => ({ ...e, _d: parseDate(e.date) }))
    .sort((a, b) => a._d.getTime() - b._d.getTime());

  return (
    <div
      role="list"
      aria-label="Singapore regulator timeline, 2023 to 2026"
      style={{
        position: "relative",
        paddingLeft: 22,
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      {/* Neon spine. Slightly inset from container left so the
          regulator-coloured dots sit centred on the rule. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 5,
          top: 6,
          bottom: 6,
          width: 1,
          background: "var(--bl-neon)",
          boxShadow: "0 0 8px rgba(var(--bl-neon-rgb), 0.45)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {sorted.map((event, i) => {
          const isFuture = event._d > today;
          const isPast = event._d < today;
          const dotColor = event.regulator
            ? DOT_COLOR[event.regulator]
            : "var(--bl-fg3)";
          const dotStyle = event.isRange
            ? {
                background: "transparent",
                border: `1.5px solid ${dotColor}`,
              }
            : { background: dotColor };

          return (
            <div
              key={i}
              role="listitem"
              style={{
                marginTop: i === 0 ? 0 : gap,
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                position: "relative",
              }}
            >
              {/* Dot on the spine. Negative margin pulls it back over
                  the spine; sized to read as a regulator indicator. */}
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: 7,
                  height: 7,
                  marginLeft: -20,
                  transform: "translateY(2px)",
                  borderRadius: "50%",
                  boxShadow: isFuture
                    ? `0 0 8px ${dotColor}`
                    : "none",
                  opacity: isPast ? 0.7 : 1,
                  ...dotStyle,
                }}
              />

              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.04em",
                  color: isFuture ? "var(--bl-neon)" : "var(--bl-fg3)",
                  fontVariantNumeric: "tabular-nums",
                  width: 88,
                }}
              >
                {event.date}
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  lineHeight: 1.4,
                  color: isPast ? "var(--bl-fg2)" : "var(--bl-fg)",
                }}
              >
                {event.body}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
