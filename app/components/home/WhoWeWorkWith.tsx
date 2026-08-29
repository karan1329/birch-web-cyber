"use client";

import Link from "next/link";
import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

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
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(88px, 11vw, 140px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="05" label="Who we work with" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 112px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            margin: "0 0 clamp(44px, 5.5vw, 72px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          {/* ONE instance, not two. Each SplitText is an atomic
              inline-block, so a second one starts on a fresh line whenever
              the tail of the first leaves no room — which stranded "people"
              alone on line two. A single instance wraps word by word and
              `accentFrom` carries the colour change from "who" onward. */}
          <SplitText
            text="We build security programs with people who treat the craft seriously."
            perChar={0.01}
            accentFrom={6}
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
                fontSize: "clamp(16px, 1.3vw, 23px)",
                lineHeight: 1.65,
                color: "var(--bl-fg2)",
                margin: 0,
                maxWidth: "var(--bl-text-narrow)",
              }}
            >
              Founders, CISOs, and CFOs at growth-stage companies and
              regulated mid-caps. The kind of operator whose security program
              has outgrown a single owner but does not yet justify a
              forty-person CISO office. RBI-regulated fintechs. SEBI
              mid-caps. MAS-licensed banks, payment institutions, and capital
              markets firms. They come to us when a specific moment arrives:
              a US enterprise customer asking for SOC2 with teeth, a
              regulator&rsquo;s letter, the board&rsquo;s first hard
              question, the week after an incident, the year before an IPO.
            </p>
            <Link
              href="/singapore"
              style={{
                display: "inline-block",
                marginTop: 24,
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: "-0.008em",
                color: "var(--bl-accent)",
                textDecoration: "none",
              }}
            >
              Singapore practice →
            </Link>
          </Rise>

          {/* HP-9 · the client marquee that used to sit here has moved into
              the hero's first viewport. This section keeps its paragraph and
              loses the duplicate. */}

          {/* HP-10 · founder segment */}
          <Rise delay={0.1}>
            <FounderBlock />
          </Rise>
        </div>
      </div>
    </section>
  );
}

/**
 * HP-10 · the founder sub-block that closes Who We Work With. Routes to
 * /start, which is deliberately absent from the nav and footer — this card
 * and the homepage close are its only entry points.
 */
function FounderBlock() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "clamp(28px, 3.2vw, 42px)",
        background: "var(--bl-accent)",
        color: "var(--bl-ink)",
        overflow: "hidden",
      }}
    >
      {/* Oversized corner glyph, same device as the founding-principle card
          so the two accent surfaces read as one family. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "clamp(-18px, -1vw, -8px)",
          right: "clamp(10px, 1.6vw, 22px)",
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(110px, 12vw, 205px)",
          lineHeight: 0.7,
          fontWeight: 500,
          color: "rgba(0, 0, 0, 0.10)",
          letterSpacing: "-0.05em",
          pointerEvents: "none",
        }}
      >
        +
      </span>
      <span
        className="bl-label"
        style={{ position: "relative", color: "rgba(0, 0, 0, 0.62)" }}
      >
        For founders
      </span>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "clamp(20px, 1.9vw, 29px)",
          letterSpacing: "-0.018em",
          lineHeight: 1.15,
          color: "var(--bl-ink)",
          margin: 0,
          position: "relative",
        }}
      >
        Building a startup?
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(14px, 1.1vw, 18px)",
          lineHeight: 1.6,
          color: "rgba(18, 18, 18, 0.78)",
          margin: 0,
          maxWidth: "var(--bl-text-body)",
          position: "relative",
        }}
      >
        If you are a founder somewhere between bootstrapped and Series B, with
        an enterprise deal, an audit or an investor&rsquo;s diligence list
        somewhere on the horizon, we built something specifically for you, and
        it is priced for where you are rather than where you are going.
      </p>
      <Link
        href="/start"
        className="bl-email-link"
        style={{
          alignSelf: "flex-start",
          marginTop: 4,
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 13.5,
          letterSpacing: "-0.008em",
          color: "var(--bl-ink)",
          background: "var(--bl-fg)",
          textDecoration: "none",
          padding: "11px 18px",
          position: "relative",
        }}
      >
        See the founding offer →
      </Link>
    </div>
  );
}
