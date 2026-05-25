"use client";

import { type ReactNode } from "react";
import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

type Props = {
  number: string;
  label: string;
  heading?: string;
  headingDim?: string;
  children: ReactNode;
  /** Optional inverted (bone) surface for visual rhythm between blocks. */
  inverted?: boolean;
  id?: string;
};

/**
 * One block of a tier-1 sprint landing page. The page is a stack of these,
 * with the doc's 8-block structure mapped 1:1 to instances.
 * Anchor at top · large heading · arbitrary body content slot.
 */
export function SprintBlock({
  number,
  label,
  heading,
  headingDim,
  children,
  inverted = false,
  id,
}: Props) {
  return (
    <section
      id={id}
      style={{
        position: "relative",
        background: inverted ? "var(--bl-bone)" : "var(--bl-ink)",
        color: inverted ? "var(--bl-bone-fg)" : "var(--bl-fg)",
        padding: "clamp(80px, 11vw, 140px) var(--bl-page-pad)",
        borderTop: inverted ? "none" : "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number={number} label={label} inverted={inverted} />

        {(heading || headingDim) && (
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(30px, 4.2vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "0 0 clamp(32px, 4vw, 56px)",
              maxWidth: 1080,
              color: inverted ? "var(--bl-bone-fg)" : "var(--bl-fg)",
            }}
          >
            {heading}
            {headingDim && (
              <>
                <br />
                <span
                  style={{
                    color: inverted
                      ? "var(--bl-bone-fg3)"
                      : "var(--bl-fg3)",
                  }}
                >
                  {headingDim}
                </span>
              </>
            )}
          </h2>
        )}

        <Rise>{children}</Rise>
      </div>
    </section>
  );
}

/**
 * Helper: prose paragraph that respects the surrounding inverted/dark surface.
 * Use inside SprintBlock children for body copy.
 */
export function SprintProse({
  children,
  inverted = false,
  max = 800,
}: {
  children: ReactNode;
  inverted?: boolean;
  max?: number;
}) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(15px, 1.2vw, 18px)",
        lineHeight: 1.7,
        color: inverted ? "var(--bl-bone-fg2)" : "var(--bl-fg2)",
        maxWidth: max,
        margin: "0 0 22px",
      }}
    >
      {children}
    </p>
  );
}
