"use client";

import { type ReactNode, useState } from "react";
import { useMagnet } from "../hooks/useMagnet";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  /** Primary = neon fill on ink. Outline = ghost. */
  variant?: "primary" | "outline";
  className?: string;
};

/**
 * Magnetic pill CTA. The wrapper drifts toward the cursor; the inner
 * button changes color + glow on hover and slides the `→` glyph.
 *
 * Wrap navigation in `href`, actions in `onClick`. The DOM is the
 * same · only the rendered element changes · so the magnet works
 * identically for both.
 */
export function MagButton({
  children,
  onClick,
  href,
  variant = "primary",
  className,
}: Props) {
  const ref = useMagnet<HTMLDivElement>(0.25);
  const [hov, setHov] = useState(false);

  const primary = variant === "primary";

  const sharedStyle = {
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    fontFamily: "var(--font-sans)",
    // Scales with the page on large panels; a 14px pill next to a 200px
    // headline reads as a mistake on a 4K monitor.
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "-0.005em",
    padding: "16px 26px 16px 28px",
    background: primary ? "var(--bl-neon)" : "transparent",
    color: primary ? "var(--bl-ink)" : "var(--bl-fg)",
    border: primary ? "none" : "1px solid var(--bl-rule-2, var(--bl-rule2))",
    borderRadius: 999,
    cursor: "pointer",
    overflow: "hidden",
    // Long CTAs (Book a 30-minute discovery call) wrap on tiny screens
    // rather than overflowing the page padding.
    whiteSpace: "normal" as const,
    textAlign: "center" as const,
    transition: "box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease",
    boxShadow:
      primary && hov
        ? "0 0 0 1px var(--bl-neon), 0 12px 36px rgba(var(--bl-neon-rgb), 0.22), 0 0 40px rgba(var(--bl-neon-rgb), 0.18)"
        : !primary && hov
          ? "0 0 0 1px rgba(var(--bl-neon-rgb), 0.45)"
          : "none",
    textDecoration: "none" as const,
  };

  const buttonClass = `bl-mag-button ${className ?? ""}`.trim();

  const inner = (
    <>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <span
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          transform: hov ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.35s cubic-bezier(0.2,0.7,0.2,1)",
        }}
      >
        →
      </span>
    </>
  );

  return (
    <div
      ref={ref}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {href ? (
        <a
          href={href}
          className={buttonClass}
          style={sharedStyle}
          onPointerEnter={() => setHov(true)}
          onPointerLeave={() => setHov(false)}
          onFocus={() => setHov(true)}
          onBlur={() => setHov(false)}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={buttonClass}
          style={{ ...sharedStyle, font: "inherit" }}
          onPointerEnter={() => setHov(true)}
          onPointerLeave={() => setHov(false)}
          onFocus={() => setHov(true)}
          onBlur={() => setHov(false)}
        >
          {inner}
        </button>
      )}
    </div>
  );
}
