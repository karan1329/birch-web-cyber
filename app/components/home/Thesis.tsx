"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

/**
 * Section 01 — Thesis.
 *
 * Layout:
 *   Full-width anchor + headline.
 *   Below, two columns:
 *     Left  = the orientation argument as prose + footnoted vector data.
 *     Right = a sticky accent-coloured card carrying the Karan quote and
 *             the framing that it is the founding principle behind
 *             Birchlogic. The card stays in view while the prose scrolls.
 */
export function Thesis() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 200px) var(--bl-page-pad)",
        overflow: "hidden",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="Thesis" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5.4vw, 84px)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
            margin: "0 0 clamp(56px, 7vw, 96px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="We were founded on an" perChar={0.012} />
          <br />
          <SplitText
            text="unfashionable"
            perChar={0.012}
            delay={0.22}
            dim
          />
          <SplitText text=" thesis." perChar={0.012} delay={0.5} />
        </h2>

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 0.95fr)",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          {/* Left — argument as prose + footnote */}
          <Rise>
            <div style={{ maxWidth: "var(--bl-text-narrow)" }}>
              <p style={{ margin: 0 }}>
                <span
                  style={{
                    display: "block",
                    marginBottom: 18,
                    fontSize: "clamp(20px, 1.7vw, 26px)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.012em",
                    color: "var(--bl-fg)",
                    fontWeight: 500,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  The cybersecurity industry mistakes complexity for
                  sophistication.
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(16px, 1.3vw, 19px)",
                    lineHeight: 1.7,
                    color: "var(--bl-fg2)",
                  }}
                >
                  {/* HP-2 · the "mechanics of failure" sentence and its list
                      moved to /how-we-work under principle three, where the
                      argument already had a natural home. The footnote below
                      stays here. */}
                  The companies that survive serious adversaries and the
                  companies that get hollowed out look indistinguishable on
                  paper. What separates them is orientation: whether security
                  is a practice the company follows or a product category it
                  bought once and forgot. The orientation of the company is.
                </span>
              </p>

              <aside
                style={{
                  marginTop: "clamp(40px, 5vw, 64px)",
                  paddingTop: 20,
                  borderTop: "1px solid var(--bl-rule)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  lineHeight: 1.65,
                  color: "var(--bl-fg3)",
                  letterSpacing: "0.01em",
                }}
              >
                <span
                  style={{
                    color: "var(--bl-fg2)",
                    marginRight: 6,
                    letterSpacing: "0.06em",
                  }}
                >
                  [1]
                </span>
                The same six categories account for the majority of incidents
                in every major report since 2008: stolen credentials, cloud
                misconfiguration, identity errors, personal accounts,
                third-party access, social engineering. Sources: Verizon
                DBIR, Mandiant M-Trends, IBM Cost of a Data Breach Report.
              </aside>
            </div>
          </Rise>

          {/* Right — accent-coloured founding-principle card, sticky */}
          <Rise delay={0.1}>
            <div
              className="bl-stack-sticky-md"
              style={{
                position: "sticky",
                top: "calc(var(--bl-top-offset) + 40px)",
              }}
            >
              <FoundingPrincipleCard />
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/**
 * The founding-principle card. Solid accent background, dark text for
 * contrast, oversized quote glyph in the corner, attribution and an
 * italicised framing line at the bottom.
 *
 * Sits in the right column of the Thesis section. Uses the live neon
 * variable so the card recolours when the user picks Cobalt / Burgundy /
 * Bone from the theme switcher.
 */
function FoundingPrincipleCard() {
  return (
    <figure
      style={{
        position: "relative",
        margin: 0,
        background: "var(--bl-neon)",
        color: "var(--bl-ink)",
        borderRadius: 20,
        padding: "clamp(32px, 3.6vw, 56px)",
        overflow: "hidden",
        // Subtle inner ring so the card feels deliberate rather than flat.
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Decorative oversized quote mark anchored to the top-left */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "clamp(8px, 1vw, 16px)",
          left: "clamp(18px, 2.4vw, 36px)",
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(120px, 14vw, 200px)",
          lineHeight: 0.6,
          fontWeight: 500,
          color: "rgba(0, 0, 0, 0.1)",
          letterSpacing: "-0.05em",
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </span>

      {/* Top mono label */}
      <span
        style={{
          position: "relative",
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(0, 0, 0, 0.55)",
          marginBottom: "clamp(32px, 4vw, 56px)",
        }}
      >
        Founding principle
      </span>

      {/* The quote */}
      <blockquote
        style={{
          position: "relative",
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "clamp(20px, 2vw, 30px)",
          lineHeight: 1.28,
          letterSpacing: "-0.015em",
          color: "var(--bl-ink)",
        }}
      >
        Serious cybersecurity work is not a marketplace problem to be
        procured. It is a craft problem, to be practised.
      </blockquote>

      {/* Divider */}
      <div
        style={{
          margin: "clamp(28px, 3.2vw, 44px) 0 22px",
          height: 1,
          background: "rgba(0, 0, 0, 0.18)",
        }}
      />

      {/* Attribution + framing line */}
      <figcaption
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "rgba(0, 0, 0, 0.78)",
            textTransform: "uppercase",
          }}
        >
          Karan Bhandari · Co-founder, Birchlogic
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 1vw, 15px)",
            lineHeight: 1.5,
            color: "rgba(0, 0, 0, 0.62)",
            maxWidth: 360,
          }}
        >
          The founding principle behind Birchlogic.
        </span>
      </figcaption>
    </figure>
  );
}
