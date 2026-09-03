"use client";

import { Anchor } from "../primitives/Anchor";

/**
 * A dedicated head-and-shoulders crop, not the full portrait.
 *
 * The full frame is square, so `object-fit: cover` into a round square box
 * crops nothing and the head lands tiny. Zooming with a CSS transform fixed
 * the size but clipped the top of the head, because the hairline sits about
 * 4% down the source and the zoom window started at 12%. Cropping the file
 * once, offline, is the version that cannot drift: the avatar is already
 * framed, so the CSS is a plain cover with no transform.
 *
 * Cropped from `design/source-assets/karan-bhandari-original.jpg`.
 */
const PORTRAIT_SRC = "/karan-bhandari-avatar.jpg";

import { Rise } from "../primitives/Rise";
import { SplitText } from "../primitives/SplitText";

/**
 * Section 01 — Thesis.
 *
 * Layout:
 *   Full-width anchor + headline.
 *   Below, two columns:
 *     Left  = the orientation argument as prose.
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
        padding: "clamp(88px, 11vw, 140px) var(--bl-page-pad)",
        overflow: "hidden",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="Thesis" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "max(clamp(34px, 5.4vw, 84px), min(2.62vw, 105px))",
            lineHeight: 1,
            letterSpacing: "-0.035em",
            margin: "0 0 clamp(44px, 5.5vw, 72px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="We were founded on an" perChar={0.012} />
          <br />
          {/* Two SplitTexts render as adjacent inline-blocks, so the space
              between them has to be explicit — a leading space inside the
              second one is stripped by CSS at the start of its line box.
              That is what closed up "unfashionable thesis." */}
          <SplitText
            text="unfashionable"
            perChar={0.012}
            delay={0.22}
            style={{ color: "var(--bl-accent)" }}
          />{" "}
          <SplitText text="thesis." perChar={0.012} delay={0.5} />
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
          {/* Left, the argument as prose, plus a one-line source note. */}
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
                    fontSize: "max(clamp(16px, 1.3vw, 19px), min(0.59vw, 24px))",
                    lineHeight: 1.7,
                    color: "var(--bl-fg2)",
                  }}
                >
                  Every year this industry sells more tools, and every year
                  the breach reports list the same six causes they have
                  listed since 2008: stolen credentials, a misconfigured
                  cloud, identity mistakes, personal accounts, a third party
                  with too much access, and someone getting phished on an
                  ordinary Tuesday. The tools were never the problem. What
                  separates the companies that survive from the companies
                  that get hollowed out is whether somebody actually runs
                  security, week after week, or whether it was bought once,
                  wired in, and forgotten about until the day it mattered.
                </span>
              </p>

              {/* HP-2 · the footnote carries SOURCES ONLY now. The long
                  version restated the six causes the paragraph above had
                  just named; the causes are the argument, not a citation,
                  so they live in the body and this is one line. */}
              <aside
                style={{
                  marginTop: "clamp(28px, 3.2vw, 40px)",
                  paddingTop: 16,
                  borderTop: "1px solid var(--bl-rule)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--bl-fg3)",
                }}
              >
                <span style={{ color: "var(--bl-fg2)", marginRight: 6 }}>
                  [1]
                </span>
                Sources: Verizon DBIR, Mandiant M-Trends, IBM Cost of a Data
                Breach Report, every year since 2008.
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
 * Circle-cropped portrait beside the attribution.
 *
 * The source is a square head-and-shoulders frame, so `object-fit: cover`
 * alone would crop nothing and the head would land tiny inside the circle.
 * The scale + origin pair zooms toward the face instead, which is what
 * gives a head crop rather than a shrunken full frame.
 *
 * Hides itself if the file is not there, so the card degrades to the
 * attribution alone rather than showing a broken-image glyph.
 */
function Portrait() {
  return (
    <span
      style={{
        display: "block",
        // 44, not 54. The pre-cropped avatar carries headroom and shoulders,
        // so at 54 the circle sat heavier next to the attribution than the
        // attribution itself. Change both numbers together.
        width: 44,
        height: 44,
        flexShrink: 0,
        borderRadius: "50%",
        overflow: "hidden",
        // Reads as a struck plate on the cranberry rather than a pasted-in
        // JPEG. Deliberately not a drop shadow, which the brief bans.
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.18)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PORTRAIT_SRC}
        alt="Karan Bhandari"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const el = e.currentTarget.parentElement;
          if (el) el.style.display = "none";
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
    </span>
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
        className="bl-label"
        style={{
          position: "relative",
          display: "block",
          color: "rgba(0, 0, 0, 0.62)",
          marginBottom: "clamp(28px, 3.4vw, 48px)",
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
        Cybersecurity is a craft that is meant to be practised, not
        something you procure.
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
          alignItems: "center",
          gap: 12,
        }}
      >
        <Portrait />
        <span
          className="bl-label"
          style={{ color: "rgba(0, 0, 0, 0.82)" }}
        >
          Karan Bhandari · Co-founder, Birchlogic
        </span>
      </figcaption>
    </figure>
  );
}
