"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

/**
 * Anti-positioning section. What we explicitly will NOT do on the discovery
 * call · a deliberate filter for serious buyers.
 */
export function WhatWeWontDo() {
  return (
    <section
      style={{
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="03" label="What we will not do" />

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1fr) minmax(320px, 1.4fr)",
            gap: "clamp(40px, 5vw, 88px)",
            alignItems: "start",
          }}
        >
          <Rise>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.6vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: 0,
                maxWidth: 520,
              }}
            >
              No pitch deck.
              <br />
              <span style={{ color: "var(--bl-fg3)" }}>
                No credentials slide.
              </span>
            </h2>
          </Rise>

          <Rise delay={0.08}>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  lineHeight: 1.7,
                  color: "var(--bl-fg2)",
                  margin: "0 0 20px",
                  maxWidth: 720,
                }}
              >
                We will not send a pitch deck. We will not run through our
                credentials slide-by-slide. We will not push for a follow-up
                call you do not want.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  lineHeight: 1.7,
                  color: "var(--bl-fg2)",
                  margin: "0 0 20px",
                  maxWidth: 720,
                }}
              >
                If we are a fit, we will send a tightly-scoped proposal within
                five business days. The proposal will be five pages. It will
                contain the specific deliverables, the timeline, the price,
                the payment terms, the team, the references.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  lineHeight: 1.7,
                  color: "var(--bl-fg2)",
                  margin: 0,
                  maxWidth: 720,
                }}
              >
                If we are not a fit, we will name the firms that are and route
                you to them.
              </p>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
