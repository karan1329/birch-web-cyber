import { InnerHero } from "../components/primitives/InnerHero";
import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { MagButton } from "../components/primitives/MagButton";
import { SplitText } from "../components/primitives/SplitText";
import { PRESS } from "../lib/press";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "Birchlogic exists so that the first person to read your security the way a regulator would is on your side of the table. The founders, the record, and the firm.",
  path: "/about",
});

/**
 * AB-1 · About Us. Four blocks:
 *   1. The Foreword, relocated intact from the homepage (HP-5), with the
 *      photograph slot and the press lines.
 *   2. The two founders side by side. Karan's chronology is written;
 *      Jaskaran's panel ships as a styled placeholder awaiting his brief —
 *      the layout is built and the copy slot is deliberately empty rather
 *      than invented.
 *   3. What the firm has built.
 *   4. Close.
 */
export default function AboutPage() {
  return (
    <>
      <InnerHero
        kicker="About Us"
        title="Meet the founders."
        subtitle="Birchlogic exists so that the first person to read your security the way a regulator would is on your side of the table."
      />

      <Foreword />
      <Founders />
      <WhatWeBuilt />
      <Close />
    </>
  );
}

/* ── Block 1 · the Foreword ──────────────────────────────────────────── */

function Foreword() {
  return (
    <section style={SECTION}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="A note from Karan" />

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 0.62fr) minmax(320px, 1fr)",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "start",
          }}
        >
          <Rise>
            <PhotographSlot />
          </Rise>

          <Rise delay={0.06}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ ...BODY, fontWeight: 500, color: "var(--bl-fg)" }}>
                A note from Karan Bhandari.
              </p>
              <p style={BODY}>
                I have been working in offensive and defensive security since
                2015, and the years since have taken me through ISO 27001
                inside the Bank of Montreal&rsquo;s CISO office, sovereign
                security architecture for a department of the Netherlands
                government, ransomware response for regional enterprises, and
                board-level risk work across six countries.
              </p>
              <p style={BODY}>
                For a good part of that time I was the person on the other side
                of the table, reading a company&rsquo;s security before the
                regulator did, before the deal closed, before the
                investor&rsquo;s technical team started asking questions. And
                what undoes companies in that room is almost never a missing
                control. It is that the policy says one thing, the systems do
                another, and the person answering in the meeting gives a third
                version, not because anyone is lying but because nobody inside
                had ever read all of it together in the order a reviewer reads
                it.
              </p>
              <p style={{ ...BODY, color: "var(--bl-fg)" }}>
                Birchlogic exists so that the first person to read your
                security that way is on your side of the table.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--bl-fg)",
                  margin: 0,
                }}
              >
                — Karan Bhandari,{" "}
                <span style={{ fontWeight: 400, color: "var(--bl-fg2)" }}>
                  Co-founder · Delhi and Singapore
                </span>
              </p>
              <PressLines />
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/**
 * GATED · Phase 6.7. One duotone photograph, captioned in small caps with a
 * credit and date. Until the image exists this renders as a ruled slot at
 * the correct aspect ratio so the layout is final and only the asset is
 * missing — rather than shipping a stock photograph or collapsing the grid.
 */
function PhotographSlot() {
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          aspectRatio: "4 / 5",
          border: "1px dashed var(--bl-rule2)",
          background: "var(--bl-ink2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--bl-fg3)",
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          Photograph
          <br />
          duotone · 4:5
        </span>
      </div>
      <figcaption
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
          marginTop: 10,
        }}
      >
        Karan Bhandari · credit and date to follow
      </figcaption>
    </figure>
  );
}

function PressLines() {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "8px 0 0",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {PRESS.map((p) => (
        <li
          key={p.claim}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            lineHeight: 1.6,
            letterSpacing: "0.04em",
            color: "var(--bl-fg3)",
          }}
        >
          {p.href ? (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="bl-email-link"
              style={{ color: "var(--bl-fg2)", textDecoration: "underline" }}
            >
              {p.claim} — {p.outlet}, {p.year}
            </a>
          ) : (
            // No href yet: rendered as text, never as a dead link.
            <>
              {p.claim} — {p.outlet}, {p.year}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ── Block 2 · the two founders ──────────────────────────────────────── */

function Founders() {
  return (
    <section style={{ ...SECTION, borderTop: "1px solid var(--bl-rule)" }}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="The founders" />
        <h2 style={H2}>
          <SplitText text="Two people, one bench." />
        </h2>

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 4vw, 56px)",
            marginTop: "clamp(36px, 5vw, 56px)",
          }}
        >
          <Rise>
            <FounderPanel name="Karan Bhandari" role="Co-founder">
              <p style={BODY}>
                CEH at fifteen, one of the youngest in India at the time. That
                dateline matters less as a credential than as a runway: it is
                the start of a decade spent inside other people&rsquo;s
                security programmes rather than beside them.
              </p>
              <p style={BODY}>
                ISO 27001 inside the Bank of Montreal&rsquo;s CISO office.
                Sovereign security architecture for a department of the
                Netherlands government. Ransomware response for regional
                enterprises. Board-level risk work across six countries.
              </p>
              <p style={BODY}>
                What all of it taught him is the reader&rsquo;s side of the
                table: how a regulator, an auditor or an acquirer actually
                reads a company, in what order, and which seam they find
                first. That is the discipline the firm is built on.
              </p>
            </FounderPanel>
          </Rise>

          <Rise delay={0.08}>
            <FounderPanel name="Jaskaran Singh" role="Co-founder">
              {/* GATED · Phase 6.3. Copy pending Karan's brief — his AI
                  history, his build record, his side of the firm. The panel
                  ships at final layout with the slot visibly empty rather
                  than filled with invented biography. */}
              <div
                style={{
                  border: "1px dashed var(--bl-rule2)",
                  padding: "clamp(20px, 2.6vw, 30px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9.5,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--bl-fg3)",
                  }}
                >
                  Copy to follow
                </span>
                <p style={{ ...BODY, color: "var(--bl-fg3)" }}>
                  Jaskaran&rsquo;s note is being written in his own words. It
                  will sit here when it is ready.
                </p>
              </div>
            </FounderPanel>
          </Rise>
        </div>
      </div>
    </section>
  );
}

function FounderPanel({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "clamp(24px, 3vw, 36px)",
        border: "1px solid var(--bl-rule)",
        background: "var(--bl-ink2)",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(20px, 1.9vw, 26px)",
            letterSpacing: "-0.018em",
            color: "var(--bl-fg)",
            margin: 0,
          }}
        >
          {name}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--bl-accent)",
          }}
        >
          {role}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ── Block 3 · what the firm has built ───────────────────────────────── */

function WhatWeBuilt() {
  return (
    <section style={{ ...SECTION, borderTop: "1px solid var(--bl-rule)" }}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="03" label="What the firm has built" />
        <h2 style={H2}>
          <SplitText text="The record, dated." />
        </h2>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "clamp(32px, 4vw, 48px) 0 0",
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {PRESS.map((p, i) => (
            <Rise
              key={p.claim}
              as="li"
              delay={i * 0.04}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(80px, 110px) minmax(240px, 1fr)",
                gap: "clamp(20px, 3vw, 48px)",
                padding: "clamp(22px, 2.6vw, 32px) 0",
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
                }}
              >
                {p.year}
              </span>
              <span style={{ ...BODY, color: "var(--bl-fg)" }}>
                {p.claim}
                <span style={{ color: "var(--bl-fg3)" }}> — {p.outlet}</span>
              </span>
            </Rise>
          ))}
          <Rise
            as="li"
            delay={PRESS.length * 0.04}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(80px, 110px) minmax(240px, 1fr)",
              gap: "clamp(20px, 3vw, 48px)",
              padding: "clamp(22px, 2.6vw, 32px) 0",
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
              }}
            >
              2026
            </span>
            <span style={{ ...BODY, color: "var(--bl-fg)" }}>
              The research lab
              <span style={{ color: "var(--bl-fg3)" }}>
                {" "}
                — our own, publishing against a public standard
              </span>
            </span>
          </Rise>
        </ol>
      </div>
    </section>
  );
}

/* ── Block 4 · close ─────────────────────────────────────────────────── */

function Close() {
  return (
    <section
      style={{
        ...SECTION,
        borderTop: "1px solid var(--bl-rule)",
        textAlign: "center",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Rise>
          <p
            style={{
              ...BODY,
              fontSize: "clamp(18px, 1.9vw, 26px)",
              color: "var(--bl-fg)",
              maxWidth: "var(--bl-text-wide)",
              margin: "0 auto clamp(32px, 4vw, 44px)",
            }}
          >
            If any of that sounds like the firm you want reading your security,
            the next step is thirty minutes.
          </p>
        </Rise>
        <Rise delay={0.1}>
          <MagButton href="/contact">Book a 30-minute discovery call</MagButton>
        </Rise>
      </div>
    </section>
  );
}

/* ── shared ──────────────────────────────────────────────────────────── */

const SECTION: React.CSSProperties = {
  background: "var(--bl-section-veil)",
  color: "var(--bl-fg)",
  padding: "clamp(90px, 12vw, 160px) var(--bl-page-pad)",
};

const H2: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: "clamp(30px, 4vw, 60px)",
  lineHeight: 1.05,
  letterSpacing: "-0.032em",
  margin: 0,
  maxWidth: "var(--bl-heading-wide)",
};

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(15px, 1.2vw, 17px)",
  lineHeight: 1.7,
  color: "var(--bl-fg2)",
  margin: 0,
  maxWidth: "var(--bl-text-body)",
};
