import fs from "node:fs";
import path from "node:path";

import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { MagButton } from "../components/primitives/MagButton";
import { SplitText } from "../components/primitives/SplitText";
import { PRESS } from "../lib/press";
import { OFFICES } from "../lib/offices";
import {
  READ_FEE,
  READS_PER_QUARTER,
  OFFICE_RATE_INDIA,
  OFFICE_RATE_SINGAPORE,
} from "../lib/start-config";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  title: "The Security Read",
  description:
    "Three weeks, a fixed fee, and the findings written the way your regulator, auditor or enterprise customer would have written them, while there is still time to fix what they would have found.",
  path: "/security-read",
});

/**
 * /security-read · the paid diagnostic.
 *
 * Copy is `security_read_page_v2_and_funnel_playbook.md` Part 2, which is a
 * research-backed rebuild rather than a draft. Three of its findings are
 * structural and the layout encodes them, so they are worth stating here
 * before anyone "improves" the page back:
 *
 *  1. The price is high on the page, not buried. Hidden pricing reads as
 *     something being concealed, and the capacity line does the scarcity
 *     work that a countdown timer or an application gate would otherwise do.
 *  2. The founder's note sits near the FOOT, at roughly 80% scroll, and
 *     there is no hero photograph. The hero's only job is making the offer
 *     legible in seconds; credibility confirms a decision the reader has
 *     already started making.
 *  3. There is no form between the reader and the calendar. At this volume
 *     a form that costs 25% drop-off removes most of a retainer a year.
 *
 * The page targets ~750 words of body copy. Anything added past that needs
 * a named objection justifying it.
 */

/** Assets that ship only when the file is really there. No fake links. */
function hasPublicFile(rel: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

const PORTRAIT = "karan-bhandari.jpg";
const SAMPLE_READ = "security-read-sample-redacted.pdf";

export default function SecurityReadPage() {
  return (
    <>
      <Hero />
      <WhatYouGet />
      <ThreeWeeks />
      <FitCheck />
      <Fee />
      <After />
      <Foreword />
      <Standing />
      <Questions />
      <Close />
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */

function Hero() {
  const sampleLive = hasPublicFile(SAMPLE_READ);
  return (
    <section
      style={{
        ...SECTION,
        paddingTop: "calc(var(--bl-top-offset) + clamp(64px, 8vw, 110px))",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(34px, 4.6vw, 76px)",
            lineHeight: 1,
            letterSpacing: "-0.038em",
            margin: 0,
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="Someone with power is about to read your security." />
        </h1>

        <Rise delay={0.45}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(20px, 2.2vw, 34px)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--bl-accent)",
              margin: "clamp(14px, 1.6vw, 20px) 0 0",
            }}
          >
            We read it first.
          </p>
        </Rise>

        <Rise delay={0.58}>
          <p style={{ ...BODY, margin: "clamp(24px, 3vw, 34px) 0 0" }}>
            Three weeks. Fixed fee. You get the findings the way your
            regulator, your auditor or your enterprise customer would have
            written them, while there is still time to fix what they would
            have found.
          </p>
        </Rise>

        {/* The price sits here deliberately, as the third element. */}
        <Rise delay={0.68}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(17px, 1.6vw, 23px)",
              letterSpacing: "-0.018em",
              color: "var(--bl-fg)",
              margin: "clamp(24px, 3vw, 34px) 0 0",
            }}
          >
            {READ_FEE} · three weeks · a senior partner in every session
          </p>
        </Rise>

        <Rise delay={0.78}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              marginTop: "clamp(26px, 3vw, 38px)",
            }}
          >
            <MagButton href="/contact">Book thirty minutes</MagButton>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "var(--bl-fg3)",
                maxWidth: "38ch",
                lineHeight: 1.55,
              }}
            >
              We will both know inside thirty minutes whether this is a fit.
              Four Reads a quarter, first come first served.
            </span>
          </div>
        </Rise>

        {/* The deliverable, shown rather than described. Of the sites the
            research swept, two published their actual deliverable and both
            lead their categories. It ships when the artefact exists. */}
        {sampleLive && (
          <Rise delay={0.9}>
            <p style={{ ...BODY, marginTop: "clamp(30px, 4vw, 44px)" }}>
              <a
                href={`/${SAMPLE_READ}`}
                className="bl-email-link"
                style={{
                  color: "var(--bl-accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--bl-accent)",
                  paddingBottom: 2,
                }}
              >
                Download a full sanitised Read (PDF)
              </a>
            </p>
          </Rise>
        )}
      </div>
    </section>
  );
}

/* ── What you get ────────────────────────────────────────────────────── */

const DELIVERABLES = [
  {
    lead: "The findings, written the way the reader would write them.",
    body: "Not four hundred rows of severity ratings. The specific things a regulator, auditor or enterprise buyer would raise, in the order they would raise them, with the reasoning attached so you can argue with any of it.",
  },
  {
    lead: "Your score on the Security Read Index.",
    body: "Twenty-two controls mapped across RBI, SEBI CSCRF and MAS TRM, scored zero to four, with the peer band for entities of your size and tier.",
  },
  {
    lead: "A remediation plan with owners and dates.",
    body: "Sequenced by what actually blocks you, costed, and shaped to go to an audit committee without being rewritten.",
  },
  {
    lead: "An answer to whatever was asked of you.",
    body: "If a customer sent a questionnaire, a regulator sent a letter, or an investor sent a list, you leave with the response, not a document about the response.",
  },
];

function WhatYouGet() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="What you get" />
        <h2 style={H2}>
          <SplitText text="Four things, and we do not separate them." />
        </h2>
        <Rise delay={0.3}>
          <p style={{ ...BODY, marginTop: "clamp(22px, 2.6vw, 32px)" }}>
            We bundle findings with recommendations because separating them is
            how diagnostics get commoditised.
          </p>
        </Rise>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "clamp(34px, 4.5vw, 52px) 0 0",
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {DELIVERABLES.map((d, i) => (
            <Rise
              key={d.lead}
              as="li"
              className="bl-stack-sm"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(48px, 76px) minmax(0, 1fr)",
                gap: "clamp(18px, 3.5vw, 48px)",
                padding: "clamp(22px, 2.8vw, 34px) 0",
                borderBottom: "1px solid var(--bl-rule)",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 2.6vw, 40px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.045em",
                  color: "var(--bl-accent)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "clamp(17px, 1.6vw, 22px)",
                    letterSpacing: "-0.015em",
                    color: "var(--bl-fg)",
                    marginBottom: 8,
                  }}
                >
                  {d.lead}
                </strong>
                <span style={{ ...BODY, display: "block" }}>{d.body}</span>
              </span>
            </Rise>
          ))}
        </ol>

        <IndexStrip />
      </div>
    </section>
  );
}

/**
 * The Index, drawn as the instrument rather than as a chart.
 *
 * Austere and tabular on purpose: the spec rules out radar charts, gauges
 * and maturity wheels, because a technical buyer reads those as decoration.
 *
 * The cells show the SHAPE of the instrument, twenty-two controls across
 * three regimes on a zero-to-four scale, and nothing here is any entity's
 * result. The peer band from the spec is deliberately not drawn: we do not
 * have benchmark data, and a band with no data behind it would be a
 * fabricated comparison on a page whose whole argument is rigour.
 */
const INDEX_SPANS = [
  { label: "RBI", cells: [3, 2, 4, 1, 3, 2, 4, 3] },
  { label: "SEBI CSCRF", cells: [2, 4, 3, 1, 2, 3, 4] },
  { label: "MAS TRM", cells: [4, 3, 2, 3, 4, 1, 2] },
];

function IndexStrip() {
  return (
    <Rise delay={0.15}>
      <figure
        style={{
          margin: "clamp(40px, 5vw, 64px) 0 0",
          padding: "clamp(24px, 3vw, 36px)",
          border: "1px solid var(--bl-rule)",
          background: "var(--bl-paper)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "clamp(14px, 2vw, 28px)",
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          {INDEX_SPANS.map((span) => (
            <div key={span.label} style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {span.cells.map((v, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    style={{
                      width: "clamp(14px, 1.5vw, 20px)",
                      height: "clamp(14px, 1.5vw, 20px)",
                      background: `rgba(var(--bl-accent-rgb), ${
                        0.14 + v * 0.2
                      })`,
                      border: "1px solid rgba(var(--bl-accent-rgb), 0.30)",
                    }}
                  />
                ))}
              </div>
              <span
                className="bl-label"
                style={{ fontSize: 10.5, color: "var(--bl-fg3)" }}
              >
                {span.label}
              </span>
            </div>
          ))}
        </div>
        <figcaption
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--bl-fg3)",
            marginTop: "clamp(20px, 2.4vw, 28px)",
            maxWidth: "var(--bl-text-body)",
          }}
        >
          The Security Read Index: twenty-two controls, scored zero to four,
          mapped across RBI, SEBI CSCRF and MAS TRM. Shown here as the
          instrument. Your own scores and peer band arrive with the readout.
        </figcaption>
      </figure>
    </Rise>
  );
}

/* ── How the three weeks run ─────────────────────────────────────────── */

const WEEKS = [
  {
    when: "Days 1 to 3",
    body: "You pay, then we send the intake pack. In that order, deliberately: the work goes faster when the people gathering evidence are doing it as a client rather than as a prospect.",
    heavy: false,
  },
  {
    when: "Days 4 to 10",
    body: "We read what you have the way a reviewer reads it, which is not the order it was written in, and then we go where the documents point and check whether the controls actually operated. This is where the story either holds or comes apart.",
    heavy: false,
  },
  {
    when: "Day 11. The readout.",
    body: "Ninety minutes with your team. We put the findings on the table, in priority order, with three routes forward. This meeting is the product. We do not email the report ahead of it.",
    heavy: true,
  },
  {
    when: "Days 12 to 15",
    body: "The written artefact, short, with owners and dates against every item.",
    heavy: false,
  },
];

function ThreeWeeks() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="How it runs" />
        <h2 style={H2}>
          <SplitText text="How the three weeks run." />
        </h2>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "clamp(34px, 4.5vw, 52px) 0 0",
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {WEEKS.map((w, i) => (
            <Rise
              key={w.when}
              as="li"
              className="bl-stack-sm"
              delay={i * 0.05}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 220px) minmax(0, 1fr)",
                gap: "clamp(18px, 3.5vw, 48px)",
                padding: "clamp(22px, 2.8vw, 34px) 0",
                borderBottom: "1px solid var(--bl-rule)",
                alignItems: "baseline",
              }}
            >
              <span
                className="bl-label"
                style={{
                  color: w.heavy ? "var(--bl-accent)" : "var(--bl-fg2)",
                }}
              >
                {w.when}
              </span>
              <span style={{ ...BODY, display: "block" }}>{w.body}</span>
            </Rise>
          ))}
        </ol>

        <Rise delay={0.2}>
          <p style={{ ...BODY, marginTop: "clamp(26px, 3vw, 36px)" }}>
            Day 11 is a closing meeting rather than a delivery, which is the
            difference between a diagnostic that goes somewhere and one that
            ends. The written artefact stays short on purpose.
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── Is this for you ─────────────────────────────────────────────────── */

const FIT: { situation: string; verdict: string; yes: boolean }[] = [
  {
    situation:
      "RBI-regulated, an order or inspection in the last twelve months",
    verdict: "Yes",
    yes: true,
  },
  {
    situation: "SEBI CSCRF tier assigned, submission behind or unverified",
    verdict: "Yes",
    yes: true,
  },
  {
    situation:
      "MAS-licensed, first TRM examination ahead, security owned part-time by the CTO",
    verdict: "Yes",
    yes: true,
  },
  {
    situation: "An enterprise deal is stuck in security review right now",
    verdict: "Yes",
    yes: true,
  },
  {
    situation: "You need a CERT-In empanelled VAPT and nothing else",
    verdict: "No, and we will name three firms who do it well",
    yes: false,
  },
  {
    situation: "You want the cheapest possible sign-off",
    verdict: "No",
    yes: false,
  },
  {
    situation: "Nothing has happened yet and nothing is coming",
    verdict: "Not yet. Keep the money.",
    yes: false,
  },
];

function FitCheck() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="03" label="Is this for you" />
        <h2 style={H2}>
          <SplitText text="Is this for you." />
        </h2>

        <div
          style={{
            marginTop: "clamp(34px, 4.5vw, 52px)",
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {FIT.map((f, i) => (
            <Rise
              key={f.situation}
              className="bl-stack-sm"
              delay={i * 0.04}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: "clamp(16px, 3vw, 40px)",
                padding: "clamp(18px, 2.2vw, 26px) 0",
                borderBottom: "1px solid var(--bl-rule)",
                alignItems: "baseline",
              }}
            >
              <span style={{ ...BODY, display: "block" }}>{f.situation}</span>
              <strong
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  letterSpacing: "-0.01em",
                  color: f.yes ? "var(--bl-accent)" : "var(--bl-fg3)",
                }}
              >
                {f.verdict}
              </strong>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The fee ─────────────────────────────────────────────────────────── */

function Fee() {
  return (
    <section
      style={{
        ...SECTION,
        background: "var(--bl-bone)",
        color: "var(--bl-bone-fg)",}}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="The fee" inverted />
        <h2
          style={{
            ...H2,
            color: "var(--bl-bone-fg)",
          }}
        >
          <SplitText
            text={`${READ_FEE}, fixed, agreed before we start.`}
          />
        </h2>
        <Rise delay={0.35}>
          <p style={{ ...BONE_BODY, marginTop: "clamp(26px, 3vw, 38px)" }}>
            No variation for hours or scope. If the readout does not give you
            at least one decision you can act on, tell us and we refund it in
            full. We have never had to.
          </p>
          <p style={{ ...BONE_BODY, marginTop: 18 }}>
            We charge for the Read because a serious examination of your
            security is not something we can do properly for someone who is
            not serious about the answer, and because a firm that gives its
            thinking away free has told you what it thinks that thinking is
            worth.
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── What comes after ────────────────────────────────────────────────── */

function After() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="05" label="What comes after" />
        <h2 style={H2}>
          <SplitText text="The Security Office." />
        </h2>
        <Rise delay={0.3}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(17px, 1.5vw, 22px)",
              letterSpacing: "-0.018em",
              color: "var(--bl-fg)",
              margin: "clamp(20px, 2.4vw, 28px) 0 0",
            }}
          >
            From {OFFICE_RATE_INDIA} a month in India,{" "}
            {OFFICE_RATE_SINGAPORE} in Singapore.
          </p>
        </Rise>
        <Rise delay={0.4}>
          <p style={{ ...BODY, marginTop: "clamp(22px, 2.6vw, 30px)" }}>
            Most firms do not need advice. They need somebody to own this. The
            Security Office is the function on retainer: a named senior
            partner accountable for the outcome, our agents doing the volume
            work underneath, and the tools, platforms and OEM licences you
            actually need, packaged and run by us rather than bought and
            managed by you.
          </p>
          <p style={{ ...BODY, marginTop: 18 }}>
            That last part is the difference. You are not hiring a consultant
            and then separately buying five products and then discovering
            nobody owns the space between them. One line, one accountable
            name.
          </p>
          <p style={{ ...BODY, marginTop: 18 }}>
            We are month-to-month and we are not built to be sticky. When you
            are ready to bring this in-house, we help you do it.
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── Foreword ────────────────────────────────────────────────────────── */

/**
 * The credibility block, at roughly 80% scroll and in first person. This is
 * the only place on the page that argues from who we are rather than from
 * what the reader gets, and its position is the finding, not a preference.
 */
function Foreword() {
  const portraitLive = hasPublicFile(PORTRAIT);
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="06" label="Who does the reading" />
        <div style={{ maxWidth: "var(--bl-text-body)" }}>
          {portraitLive && (
            <Rise>
              <figure style={{ margin: "0 0 clamp(26px, 3vw, 36px)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${PORTRAIT}`}
                  alt="Karan Bhandari"
                  width={260}
                  height={325}
                  style={{
                    width: 260,
                    maxWidth: "100%",
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                    objectPosition: "50% 22%",
                    display: "block",
                    // Duotoned into the paper so it reads as a printed plate
                    // rather than a pasted-in JPEG. Colour versus monochrome
                    // showed no effect on perceived competence, so the
                    // monochrome choice is free and it matches the page.
                    filter: "grayscale(1) contrast(1.04)",
                  }}
                />
                <figcaption
                  className="bl-label"
                  style={{
                    color: "var(--bl-fg3)",
                    fontSize: 10.5,
                    marginTop: 12,
                  }}
                >
                  Karan Bhandari · Co-founder
                </figcaption>
              </figure>
            </Rise>
          )}

          <Rise delay={0.1}>
            <p style={BODY}>
              I have been working in offensive and defensive security since
              2015. Since then: ISO 27001 inside the Bank of Montreal CISO
              office, sovereign security architecture for a department of the
              Netherlands government, ransomware response for regional
              enterprises, and board-level risk work for banks across six
              countries.
            </p>
            <p style={{ ...BODY, marginTop: 18 }}>
              For a large part of that I was the person on the other side of
              the table, reading a company&rsquo;s security before the
              regulator did, before the deal closed, before the
              investor&rsquo;s technical team started asking questions. What
              undoes companies in that room is almost never a missing control.
              It is that the policy, the systems and the answer someone gives
              in the meeting are three different stories, and nobody inside
              had ever read them together in the order a reviewer reads them.
            </p>
            <p style={{ ...BODY, marginTop: 18, color: "var(--bl-fg)" }}>
              That is the entire reason Birchlogic exists, and it is the whole
              of what the Read does.
            </p>
            <p
              className="bl-label"
              style={{ color: "var(--bl-fg2)", marginTop: 22 }}
            >
              Karan Bhandari · Co-founder · Delhi and Singapore
            </p>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/* ── Standing ────────────────────────────────────────────────────────── */

/**
 * A dated, linked list rather than a logo strip. An unlinked masthead reads
 * closer to a confession than a credential to a finance-literate reader, so
 * items without a URL render as plain text until `href` is filled in.
 */
function Standing() {
  const ordered = [...PRESS].sort((a, b) => b.year.localeCompare(a.year));
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="07" label="Standing" />
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "clamp(10px, 1.5vw, 18px) 0 0",
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {ordered.map((p) => (
            <Rise
              key={`${p.claim}-${p.year}`}
              as="li"
              className="bl-stack-sm"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(56px, 84px) 1fr",
                gap: "clamp(14px, 2.5vw, 32px)",
                padding: "clamp(16px, 2vw, 22px) 0",
                borderBottom: "1px solid var(--bl-rule)",
                alignItems: "baseline",
              }}
            >
              <span className="bl-label" style={{ color: "var(--bl-fg3)" }}>
                {p.year}
              </span>
              <span style={{ ...BODY, display: "block" }}>
                {p.claim}
                {". "}
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bl-email-link"
                    style={{
                      color: "var(--bl-accent)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--bl-accent)",
                    }}
                  >
                    {p.outlet} →
                  </a>
                ) : (
                  <span style={{ color: "var(--bl-fg3)" }}>{p.outlet}</span>
                )}
              </span>
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Questions ───────────────────────────────────────────────────────── */

const QUESTIONS = [
  {
    q: "We already have a compliance platform.",
    a: "Keep it. It collects evidence, which is real work. It cannot tell you whether your scope was drawn around the right systems, whether a control showing green actually operated, or how a specific regulator will read what you built.",
  },
  {
    q: "We just passed an audit.",
    a: "Then a defined set of controls operated inside a defined scope for a defined window. The question is what sits outside that boundary, and in most programmes we read, something significant does.",
  },
  {
    q: "Can we just get the findings without the recommendations, cheaper?",
    a: "No. We do not separate them.",
  },
  { q: "Will you sign an NDA first?", a: "Yes, ours or yours." },
  {
    q: "How fast can you start?",
    a: "Two weeks normally. Seven days if you are holding a letter with a date on it.",
  },
  {
    q: "What if we do not take the retainer?",
    a: "Then you keep the findings and the plan, and if your own team can execute it we will say so.",
  },
];

/**
 * Collapsed by default so the page reads short and still answers everything.
 * Native `details`, so it works with no JavaScript, and no rotating plus or
 * minus glyph: the house rules ban that device for bodies this short.
 */
function Questions() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="08" label="Questions" />
        <div style={{ borderTop: "1px solid var(--bl-rule)" }}>
          {QUESTIONS.map((item) => (
            <details
              key={item.q}
              style={{ borderBottom: "1px solid var(--bl-rule)" }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  padding: "clamp(18px, 2.2vw, 26px) 0",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "clamp(16px, 1.4vw, 20px)",
                  letterSpacing: "-0.012em",
                  color: "var(--bl-fg)",
                }}
              >
                {item.q}
              </summary>
              <p
                style={{
                  ...BODY,
                  margin: "0 0 clamp(20px, 2.4vw, 28px)",
                  maxWidth: "var(--bl-text-body)",
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Close ───────────────────────────────────────────────────────────── */

/**
 * Terminates in a named human with a real mailto, plus the phone number and
 * both street addresses. Those are not housekeeping: a physical address and
 * a phone number outscore a client-logo strip on web credibility by a wide
 * margin, and this firm sells from India into Singapore and the West.
 */
function Close() {
  return (
    <section
      style={{
        ...SECTION,textAlign: "center",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <h2 style={{ ...H2, margin: "0 auto", fontSize: "clamp(28px, 4vw, 58px)" }}>
          <SplitText text="From the day we start, cybersecurity is our headache, not yours." />
        </h2>
        <Rise delay={0.4}>
          <p
            style={{
              ...BODY,
              margin: "clamp(24px, 3vw, 36px) auto clamp(30px, 4vw, 44px)",
            }}
          >
            Bring whatever is bugging you to a thirty-minute call. We will
            tell you what we would do and in how many weeks, or point you
            somewhere better and wish you well.
          </p>
        </Rise>
        <Rise delay={0.5}>
          <MagButton href="/contact">Book thirty minutes</MagButton>
        </Rise>
        <Rise delay={0.6}>
          <div
            style={{
              margin: "clamp(30px, 4vw, 44px) auto 0",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontFamily: "var(--font-sans)",
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "var(--bl-fg3)",
            }}
          >
            <span>
              <a
                href="mailto:karan@birchlogic.com"
                className="bl-email-link"
                style={{ color: "var(--bl-fg2)", textDecoration: "none" }}
              >
                karan@birchlogic.com
              </a>{" "}
              ·{" "}
              <a
                href="tel:+919663131111"
                className="bl-email-link"
                style={{ color: "var(--bl-fg2)", textDecoration: "none" }}
              >
                +91 96631 31111
              </a>
            </span>
            {OFFICES.map((o) => (
              <span key={o.city}>{o.address}</span>
            ))}
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ── shared ──────────────────────────────────────────────────────────── */

const SECTION: React.CSSProperties = {
  background: "var(--bl-section-veil)",
  color: "var(--bl-fg)",
  padding: "var(--bl-section-gap) var(--bl-page-pad)",
};

const H2: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.8vw, 58px)",
  lineHeight: 1.05,
  letterSpacing: "-0.032em",
  margin: 0,
  maxWidth: "var(--bl-heading-wide)",
};

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(15px, 1.25vw, 18px)",
  lineHeight: 1.7,
  color: "var(--bl-fg2)",
  margin: 0,
  maxWidth: "var(--bl-text-wide)",
};

const BONE_BODY: React.CSSProperties = {
  ...BODY,
  color: "var(--bl-bone-fg2)",
};
