"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

/**
 * Section 04 — the senior-partner promise. A pull quote that lands as the
 * foundational commercial commitment.
 *
 * Typography tuned so the headline fits cleanly in two visual lines across
 * viewports. `textWrap: balance` keeps wrapping balanced when the browser
 * has to break the longer first sentence. Each statement sits on its own
 * row so the second line ("There is no other model.") always reads as a
 * deliberate continuation, never as part of an overflow line.
 */
export function SeniorPartnerPromise() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 200px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(var(--bl-neon-rgb), 0.06), transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="bl-container"
        style={{ padding: 0, position: "relative" }}
      >
        <Anchor number="04" label="The promise" />

        <Rise>
          <blockquote
            style={{
              margin: 0,
              maxWidth: 1180,
              marginInline: "auto",
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.032em",
            }}
          >
            <div
              style={{
                fontSize: "clamp(30px, 5.4vw, 84px)",
                marginBottom: "clamp(14px, 1.5vw, 20px)",
                textWrap: "balance",
              }}
            >
              <SplitText
                text="A senior partner runs every engagement."
                perChar={0.012}
                threshold={0.25}
              />
            </div>
            <div
              style={{
                fontSize: "clamp(24px, 4vw, 64px)",
                color: "var(--bl-fg3)",
                textWrap: "balance",
              }}
            >
              <SplitText
                text="There is no other model."
                perChar={0.012}
                delay={0.5}
                threshold={0.25}
              />
            </div>
          </blockquote>
        </Rise>
      </div>
    </section>
  );
}
