import { NAMED_CLIENTS } from "../../lib/clients";

type Props = {
  /**
   * `hero`   — the strip at the foot of the hero, with its heading.
   * `inline` — smaller track for use inside another section.
   * `standalone` — legacy full-width track.
   */
  variant?: "standalone" | "inline" | "hero";
};

/**
 * Logo strip · two rows running in opposite directions.
 *
 * The counter-scroll is the point: a single track reads as a loop the eye
 * follows once and dismisses, while two rows moving against each other read
 * as a field that keeps renewing. Top row runs left, bottom row right, at
 * different speeds so they never sync into an obvious repeat.
 *
 * Headed "Companies that trust our work" rather than a claim of clientship,
 * which is the honest framing for a list that mixes engagements of the firm
 * with institutions from the founders' prior roles.
 *
 * Logos sit greyscaled at rest so nineteen brand palettes cannot fight the
 * page's single cranberry accent, and come to full colour on hover.
 */
export function ClientMarquee({ variant = "inline" }: Props) {
  const hero = variant === "hero";

  const half = Math.ceil(NAMED_CLIENTS.length / 2);
  const rowA = NAMED_CLIENTS.slice(0, half);
  const rowB = NAMED_CLIENTS.slice(half);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: hero ? 16 : 12 }}
    >
      {hero && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--bl-fg3)",
          }}
        >
          Companies that trust our work
        </span>
      )}

      <LogoRow items={rowA} direction="left" seconds={46} />
      <LogoRow items={rowB} direction="right" seconds={54} />
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
  // Tripled so the loop has no visible seam at any width.
  const loop = [...items, ...items, ...items];
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%)",
      }}
    >
      <div
        className="bl-marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(44px, 5vw, 78px)",
          width: "max-content",
          // Both rows share one keyframe pair; `reverse` sends the second
          // row the other way.
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
              height: "clamp(34px, 3.2vw, 48px)",
            }}
          >
            {/* Plain img: small transparent PNGs from /public. next/image's
                optimiser adds nothing here and complicates the marquee's
                max-content track. */}
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
