"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { useTilt } from "../hooks/useTilt";

type Props = {
  href: string;
  /** Max tilt in degrees handed to useTilt. */
  max?: number;
  /** Min height of the inner panel. */
  minHeight?: number;
  /**
   * Card body. Receives the live hover flag so a caller's background
   * numeral, status dot, and arrow can animate in step with the shell's
   * shadow lift and glare, which are driven by the same flag.
   */
  children: (hov: boolean) => ReactNode;
  className?: string;
};

/**
 * Tilt-reactive card shell. Wraps content in a Next link, applies the
 * useTilt perspective transform to a `[data-tilt-inner]` panel, and paints
 * a cursor-following neon glare into the `[data-tilt-glare]` overlay. The
 * boxShadow ring is the one card-shadow the design budget allows.
 *
 * Used by the home Engagement section and the /services commercial tiers;
 * each supplies its own numeral, copy, and footer via the render prop.
 */
export function TiltCard({
  href,
  max = 10,
  minHeight = 420,
  children,
  className,
}: Props) {
  const ref = useTilt<HTMLDivElement>(max);
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={href}
      className={className}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div
        ref={ref}
        onPointerEnter={() => setHov(true)}
        onPointerLeave={() => setHov(false)}
        style={{ cursor: "pointer", perspective: 1200 }}
      >
        <div
          data-tilt-inner
          style={{
            position: "relative",
            background: "var(--bl-ink)",
            color: "var(--bl-fg)",
            borderRadius: 24,
            padding: "clamp(28px, 3vw, 44px)",
            minHeight,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            boxShadow: hov
              ? "0 32px 80px rgba(10,10,12,0.28), 0 0 0 1px rgba(10,10,12,0.08)"
              : "0 12px 32px rgba(10,10,12,0.10), 0 0 0 1px rgba(10,10,12,0.06)",
            transition: "box-shadow 0.4s ease",
            willChange: "transform",
          }}
        >
          <div
            data-tilt-glare
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />
          {children(hov)}
        </div>
      </div>
    </Link>
  );
}
