"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";
import { ClientMarquee } from "./ClientMarquee";

/**
 * Section 5 of the home page. Now hosts the client carousel that used
 * to sit under the hero — the names belong here, next to the persona
 * paragraph that describes who they are.
 *
 * Layout: anchor + headline span the full width. Below, 2-column:
 *   left  = persona body
 *   right = scrolling client strip + a short framing line
 */
export function WhoWeWorkWith() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 200px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="05" label="Who we work with" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            margin: "0 0 clamp(56px, 7vw, 96px)",
            maxWidth: 1100,
          }}
        >
          <SplitText
            text="We build security programs with people"
            perChar={0.01}
          />
          <br />
          <SplitText
            text="who treat the craft seriously."
            perChar={0.01}
            delay={0.32}
            dim
          />
        </h2>

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 1fr)",
            gap: "clamp(40px, 5vw, 88px)",
            alignItems: "start",
          }}
        >
          <Rise>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "clamp(16px, 1.3vw, 19px)",
                lineHeight: 1.65,
                color: "var(--bl-fg2)",
                margin: 0,
                maxWidth: 560,
              }}
            >
              Founders, CISOs, and CFOs at growth-stage companies and
              regulated mid-caps. The kind of operator whose security program
              has outgrown a single owner but does not yet justify a
              forty-person CISO office. They come to us when a specific
              moment arrives: a US enterprise customer asking for SOC2 with
              teeth, a regulator&rsquo;s letter, the board&rsquo;s first hard
              question, the week after an incident, the year before an IPO.
            </p>
          </Rise>

          <Rise delay={0.1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--bl-fg3)",
                }}
              >
                A few of them
              </span>
              <ClientMarquee />
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--bl-fg3)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Names listed with permission. Most engagements stay private.
              </p>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
