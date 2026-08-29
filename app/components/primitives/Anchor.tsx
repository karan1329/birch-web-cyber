"use client";

import { type ReactNode } from "react";

type Props = {
  number: string;
  label: string;
  /** Optional badge / progress shown right of the rule (e.g. `01 / 06`). */
  right?: ReactNode;
  /** Inverted variant for the bone-coloured Engagement section. */
  inverted?: boolean;
  className?: string;
};

/**
 * Section opener: `01 · Thesis _______________`.
 * Mono kicker on the left, thin rule running off the side, optional
 * badge on the right. No em dashes anywhere (brand voice rule); the
 * separator between number and label is a middle dot, and the rule
 * itself is a real CSS border, not a text glyph.
 */
export function Anchor({
  number,
  label,
  right,
  inverted = false,
  className,
}: Props) {
  const labelColor = inverted ? "var(--bl-bone-fg2)" : "var(--bl-fg3)";
  const ruleColor = inverted ? "var(--bl-bone-rule)" : "var(--bl-rule)";
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: "clamp(40px, 5vw, 64px)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: labelColor,
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
        }}
      >
        {number} · {label}
      </span>
      <span style={{ flex: 1, height: 1, background: ruleColor }} />
      {right && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: labelColor,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          {right}
        </span>
      )}
    </div>
  );
}
