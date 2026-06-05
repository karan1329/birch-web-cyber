"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

const ITEMS = [
  "Managed Detection and Response",
  "Live incident response",
  "Penetration testing",
  "Cybersecurity products",
  "Managed IT helpdesk",
];

/**
 * "What we deliberately do not sell." Anti-positioning block. Lists the five
 * things Birchlogic does NOT do in-house, with the reasoning. Strengthens
 * the program-vs-vendor differentiation.
 */
export function NotForSale() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="07" label="What we deliberately do not sell" />

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
              These are all important.
              <br />
              <span style={{ color: "var(--bl-fg3)" }}>
                They are separate disciplines.
              </span>
            </h2>
          </Rise>

          <Rise delay={0.08}>
            <div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  borderTop: "1px solid var(--bl-rule)",
                }}
              >
                {ITEMS.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      padding: "18px 0",
                      borderBottom: "1px solid var(--bl-rule)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        fontSize: "clamp(16px, 1.4vw, 19px)",
                        color: "var(--bl-fg)",
                      }}
                    >
                      {item}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.04em",
                        color: "var(--bl-fg3)",
                      }}
                    >
                      Coordinated, not owned
                    </span>
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  color: "var(--bl-fg2)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 640,
                }}
              >
                We do not run these in-house. We coordinate the best
                specialist for each. You get senior judgment on the program.
                You get top-tier delivery on each specialist line. You get one
                accountable partner across all of it.
              </p>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
