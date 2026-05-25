"use client";

import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  dim?: boolean;
  /** Override the dot color. Defaults to the active neon. */
  color?: string;
  className?: string;
};

/**
 * Tiny inline `<dot> <label>` for micro-status. Glows softly when the
 * dot color matches the neon token (CSS picks up box-shadow blur).
 */
export function Tag({ children, dim = false, color, className }: Props) {
  const dotBg = color ?? "var(--bl-neon)";
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: dim ? "var(--bl-fg3)" : "var(--bl-fg2)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          background: dotBg,
          borderRadius: "50%",
          boxShadow: `0 0 12px ${dotBg}`,
        }}
      />
      {children}
    </span>
  );
}
