"use client";

import Link from "next/link";

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
        color: "var(--bl-accent)",
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
              maxWidth: "var(--bl-heading-wide)",
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
                color: "var(--bl-accent)",
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

        {/* What makes the promise affordable, rather than just a claim. */}
        <Rise delay={0.2}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.25vw, 18px)",
              lineHeight: 1.7,
              color: "var(--bl-fg2)",
              maxWidth: "var(--bl-text-body)",
              margin: "clamp(32px, 4vw, 48px) auto 0",
              textAlign: "center",
            }}
          >
            That is only affordable because a senior partner here is
            multiplied by an internal AI workbench we built ourselves. The
            agents carry the volume; the judgment, the accountability and the
            signature stay with the person whose name is on the engagement.{" "}
            <Link
              href="/research"
              className="bl-email-link"
              style={{
                color: "var(--bl-accent)",
                textDecoration: "none",
                borderBottom: "1px solid var(--bl-accent)",
                paddingBottom: 1,
              }}
            >
              See how the workbench works
            </Link>
            .
          </p>
        </Rise>
      </div>
    </section>
  );
}
