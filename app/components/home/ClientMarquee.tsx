"use client";

// Named clients per Birchlogic copy v2 (11 May 2026).
// Designer note from doc: render as a clean horizontal text strip with
// subtle separators, no logos for v1 launch.
const ITEMS = [
  "AMCS Group",
  "K&S Partners",
  "MB Solutions",
  "The Batraa Numerology",
  "Saarthe.ai",
  "Fusionedge.io",
  "Nexwave GmbH",
  "Mintergraph Solutions",
  "Nest Money Fintech",
];

type Props = {
  /** Larger track for standalone full-width use (legacy). Smaller for
   *  inline use inside another section (Who We Work With). */
  variant?: "standalone" | "inline";
};

/**
 * Horizontal scrolling client strip. Used inline inside the right half
 * of the Who-We-Work-With section. The `inline` variant fits a smaller
 * column, tighter font, edge-fade masks on both sides.
 */
export function ClientMarquee({ variant = "inline" }: Props) {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];
  const inline = variant === "inline";

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: inline ? "20px 0" : "28px 0",
        borderTop: inline ? "1px solid var(--bl-rule)" : undefined,
        borderBottom: inline ? "1px solid var(--bl-rule)" : undefined,
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: inline ? 48 : 72,
          width: "max-content",
          // Slower loop on the smaller inline variant so the eye can
          // settle on each name as it passes.
          animation: `bl-ticker-move ${inline ? 42 : 55}s linear infinite`,
        }}
      >
        {loop.map((p, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: inline ? 48 : 72,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: inline
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
}
