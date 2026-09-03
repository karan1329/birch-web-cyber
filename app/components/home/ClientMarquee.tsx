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
 * Headed "Selected clients and credentials" rather than a flat claim of
 * clientship. The list mixes engagements of the firm with institutions from
 * the founders' prior roles, and the two nouns keep both lanes honest:
 * some of these are clients, the rest are credentials. Anywhere the copy
 * actually says "client", filter on kind === "firm".
 *
 * Logos render at full colour and full opacity. Desaturating a client's
 * mark reads as a placeholder, and the strip IS the credential.
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
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(14px, 1.05vw, 16px)",
            letterSpacing: "-0.01em",
            color: "var(--bl-fg2)",
          }}
        >
          Selected clients and credentials
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
      className="bl-marquee-row"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="bl-marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(52px, 5.7vw, 90px)",
          width: "max-content",
          // Own compositing layer, so the loop is a layer transform rather
          // than a repaint. translate3d and backface-visibility are what
          // actually get Safari to promote it.
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translate3d(0,0,0)",
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
              height: "max(clamp(41px, 3.9vw, 57px), min(1.78vw, 71px))",
            }}
          >
            {/* Plain img: small transparent PNGs from /public. next/image's
                optimiser adds nothing here and complicates the marquee's
                max-content track. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.logo}
              alt={c.name}
              loading={i < items.length ? "eager" : "lazy"}
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
