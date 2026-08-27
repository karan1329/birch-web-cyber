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
 * Client logo strip · two rows running in opposite directions.
 *
 * The counter-scroll is the point: a single track reads as a loop the eye
 * can follow and dismiss, while two rows moving against each other read as
 * a field of names that keeps renewing. The top row runs left, the bottom
 * row runs right, at slightly different speeds so they never sync up into
 * an obvious repeat.
 *
 * Logos come from the canonical list in lib/clients.ts, which excludes
 * founder-credential marks by design — see the lane note there.
 *
 * Logos are greyscaled at rest so nineteen different brand palettes do not
 * fight the page's one accent, and come to full colour on hover.
 */
export function ClientMarquee({ variant = "inline" }: Props) {
  const hero = variant === "hero";

  // Split into two rows, then triple each so the loop has no visible seam.
  const half = Math.ceil(NAMED_CLIENTS.length / 2);
  const rowA = NAMED_CLIENTS.slice(0, half);
  const rowB = NAMED_CLIENTS.slice(half);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: hero ? 8 : 12 }}>
      {hero && (
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
      )}

      <LogoRow items={rowA} direction="left" seconds={44} />
      <LogoRow items={rowB} direction="right" seconds={52} />

      {hero && (
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
      )}
    </div>
  );
}

function LogoRow({
  items,
  direction,
  seconds,
}: {
  items: typeof NAMED_CLIENTS;
  direction: "left" | "right";
  seconds: number;
}) {
  const loop = [...items, ...items, ...items];
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div
        className="bl-marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(34px, 4vw, 60px)",
          width: "max-content",
          // The two rows share one keyframe pair; `reverse` is what sends
          // the second row the other way.
          animation: `bl-ticker-move ${seconds}s linear infinite${
            direction === "right" ? " reverse" : ""
          }`,
        }}
      >
        {loop.map((c, i) => (
          <span
            key={`${c.name}-${i}`}
            className="bl-client-logo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              height: "clamp(26px, 2.4vw, 34px)",
            }}
          >
            {/* Plain img: these are small transparent PNGs served from
                /public, and next/image's optimiser adds nothing here while
                complicating the marquee's max-content track. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.logo}
              alt={c.name}
              loading="lazy"
              decoding="async"
              style={{
                height: "100%",
                width: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
