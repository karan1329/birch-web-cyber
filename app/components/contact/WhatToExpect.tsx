"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

const PHASES = [
  {
    minutes: "First 5",
    title: "Quick introductions both ways.",
    body: "",
  },
  {
    minutes: "Next 20",
    title: "You describe the specific blocker.",
    body: "A deal stuck in TPRM. A regulator letter. A board ask. An AI question in a procurement questionnaire. The more specific you are, the more useful the call.",
  },
  {
    minutes: "Last 5",
    title: "We tell you what we would do, in how many weeks.",
    body: "We tell you which of our twelve sprints (or which retainer tier, or whether you need FSO) is the right fit. If we are not a fit, we say so and route you elsewhere.",
  },
];

/**
 * The 5/20/5 breakdown of what happens on a discovery call.
 * Numbered ledger style, same pattern as /how-we-work EngagementCycle.
 */
export function WhatToExpect() {
  return (
    <section
      style={{
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="What to expect" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(32px, 5vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: "0 0 32px",
            maxWidth: 1080,
          }}
        >
          We do not run a sales process.
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>
            The thirty minutes work like this.
          </span>
        </h2>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "clamp(40px, 5vw, 64px) 0 0",
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {PHASES.map((p, i) => (
            <Rise key={i} delay={i * 0.04}>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(120px, 180px) minmax(260px, 1fr)",
                  gap: "clamp(24px, 4vw, 64px)",
                  padding: "clamp(24px, 3vw, 36px) 0",
                  borderBottom: "1px solid var(--bl-rule)",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: "var(--bl-fg3)",
                    textTransform: "uppercase",
                  }}
                >
                  {p.minutes} min
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "clamp(18px, 1.7vw, 24px)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.015em",
                      color: "var(--bl-fg)",
                      margin: p.body ? "0 0 8px" : 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  {p.body && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: "var(--bl-fg2)",
                        margin: 0,
                        maxWidth: 640,
                      }}
                    >
                      {p.body}
                    </p>
                  )}
                </div>
              </li>
            </Rise>
          ))}
        </ol>

        <p
          style={{
            marginTop: 28,
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px, 1.15vw, 16px)",
            lineHeight: 1.65,
            color: "var(--bl-fg2)",
            maxWidth: 720,
          }}
        >
          You do not need to send a brief beforehand. You do not need to sign
          an NDA for a discovery call. You can bring colleagues if useful. If
          it is an emergency, say so when you book. We start in seven days.
        </p>
      </div>
    </section>
  );
}
