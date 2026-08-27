"use client";

import Link from "next/link";
import { Anchor } from "../components/primitives/Anchor";
import { InnerHero } from "../components/primitives/InnerHero";
import { MagButton } from "../components/primitives/MagButton";
import { Rise } from "../components/primitives/Rise";
import { SplitText } from "../components/primitives/SplitText";
import { useCount } from "../components/hooks/useCount";
import { useInView } from "../components/hooks/useInView";

import {
  CompressionTimeline,
  type CompressionEvent,
} from "../components/singapore/CompressionTimeline";

/**
 * /singapore — Birchlogic's regulator-led practice page for MAS-licensed
 * entities and Singapore platforms. Pre-ACRA copy variant in use; the
 * "Pte Ltd incorporating" / "Practice open" phrasings change once ACRA
 * incorporation is confirmed.
 *
 * Page tells the native story only (MAS, PDPC, CSA). NIS2, SOC2, and
 * EU framing intentionally absent — those live on /services and on the
 * NIS2 detail page. A regulator-led practice page that mixes foreign
 * regimes reads like a generalist with a Singapore paragraph.
 *
 * Block plan (six blocks):
 *   00  Hero — eighteen-months thesis, discovery-call action slotted in
 *   01  What five years of work looks like (expectations + compression
 *       timeline in a 2-col grid, bench-math paragraphs full-width below)
 *   02  Regulatory map (MAS / PDPC / CSA)
 *   03  Cyber risk in dollars (CRQ proof treatment, 45-day counter)
 *   04  The Singapore engagements (4-row table → sprint detail pages)
 *   05  How to engage
 */

const TIMELINE_EVENTS: CompressionEvent[] = [
  { date: "11 Dec 2023", body: "MAS Notices 658/1121 issued", regulator: "MAS" },
  { date: "11 Dec 2024", body: "Notices fully in force", regulator: "MAS" },
  {
    date: "31 Oct 2025",
    body: "Cybersecurity (Amendment) Act commences",
    regulator: "Cyber Act",
  },
  {
    date: "31 Jan 2026",
    body: "MAS AI Risk Management consultation closes",
    regulator: "MAS",
  },
  {
    date: "2 Feb 2026",
    body: "PDPC announces the NRIC authentication ban",
    regulator: "PDPC",
  },
  {
    date: "2 Mar 2026",
    body: "CSA Cyber Trust mark certification mandates",
    regulator: "CSA",
  },
  {
    date: "6 Mar 2026",
    body: "TPRM + ORM twin consultations (closed 20 Apr)",
    regulator: "MAS",
  },
  {
    date: "20 Mar 2026",
    body: "MindForge AI Risk Management Toolkit published",
    regulator: "MAS",
  },
  {
    date: "14 May 2026",
    body: "An MPI licence revoked for risk management failures",
    regulator: "MAS",
  },
  {
    date: "H2 2026",
    body: "Finals expected, six-to-twelve-month transitions",
    regulator: "MAS",
    isRange: true,
  },
  {
    date: "31 Dec 2026",
    body: "NRIC authentication deadline",
    regulator: "PDPC",
  },
];

const EXPECTATIONS = [
  "A third-party register covering every material vendor, current enough to survive inspection.",
  "Due diligence that produces evidence, not reassurance.",
  "Operational risk frameworks rebuilt against guidelines still in consultation.",
  "AI governance stood up while the rules are still drafts.",
  "Authentication flows off NRIC numbers before the December deadline.",
  "Board reporting that puts a number on exposure, not a colour.",
];

const PILLARS: { label: string; body: string }[] = [
  {
    label: "MAS operational resilience",
    body: "Notice 658 for banks and merchant banks, the equivalent notices for other licence classes, and the incoming TPRM and ORM guideline layer that extends third-party expectations to every MAS-licensed FI. Third-party registers, outsourcing-grade due diligence, board accountability.",
  },
  {
    label: "MAS Technology Risk Management",
    body: "The full TRM domain scope. Supervisory letter response, single-domain remediation, evidence packs a MAS reviewer recognises.",
  },
  {
    label: "MAS AI risk and AI governance",
    body: "The draft AI Risk Management Guidelines, the MindForge toolkit and its Operationalisation Handbook, ISO 42001, IMDA's agentic AI framework. An AI governance posture built against the Handbook today carries over when the guidelines land; waiting for finals is how you lose the transition window.",
  },
  {
    label: "PDPC",
    body: "PDPA obligations plus the NRIC authentication ban, deadline 31 December 2026, enforcement from 1 January 2027. Authentication flow audit, MFA migration, breach defence readiness.",
  },
  {
    label: "CSA",
    body: "The Cybersecurity (Amendment) Act's third-party CII regime, the 2-hour suspected-APT reporting clock, Cyber Trust mark readiness against the 2026 and 2027 certification dates.",
  },
];

const ENGAGEMENTS: {
  name: string;
  fixes: string;
  shape: string;
  href: string;
}[] = [
  {
    name: "Notice 658 + TPRM Readiness Sprint",
    fixes:
      "Your third-party register, mapped to Notice 658 and the incoming TPRM Guidelines before MAS asks.",
    shape: "4 to 6 weeks",
    href: "/services/notice-658-tprm-readiness",
  },
  {
    name: "MAS TRM Single-Domain Sprint",
    fixes:
      "One open TRM domain finding, closed by a MAS-fluent senior partner.",
    shape: "4 weeks",
    href: "/services/mas-trm-single-domain",
  },
  {
    name: "MAS AI Governance Sprint",
    fixes:
      "AI risk posture aligned to the draft Guidelines and the MindForge Handbook; ISO 42001 readiness where a certificate is demanded.",
    shape: "4 weeks",
    href: "/services/iso-42001-readiness",
  },
  {
    name: "vCISO Regulated · MAS",
    fixes:
      "Regulator response, monthly board pack, audit committee briefings, supervisor letter response.",
    shape: "Month-to-month retainer",
    href: "/services#vciso",
  },
];

export default function SingaporePage() {
  return (
    <>
      <InnerHero
        kicker="Singapore"
        title="Eighteen months to do five years of work."
        subtitle={
          <>
            Singapore is compressing five years of supervisory expectation into
            eighteen months, and the mid-market compliance bench was never
            staffed for that pace. We built this practice for the gap between
            what the regulator now expects and what a lean team can deliver: a
            senior partner in every meeting, MAS fluency in the room, and a
            delivery model that moves in weeks while the industry still scopes
            in quarters.
          </>
        }
        action={
          <MagButton href="/contact">Book a 30-minute discovery call</MagButton>
        }
      />

      <WorkBehindTheDeadline />
      <RegulatoryMap />
      <RiskInDollars />
      <Engagements />
      <HowToEngage />
    </>
  );
}

// ─── 01 ────────────────────────────────────────────────────────────────────
function WorkBehindTheDeadline() {
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
        <Anchor number="01" label="The work behind the deadline" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: "0 0 24px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="What five years of work looks like." perChar={0.012} />
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-body)",
            margin: "0 0 clamp(40px, 5vw, 64px)",
          }}
        >
          Put the supervisor&rsquo;s 2026 expectations on one desk and count
          them.
        </p>

        {/* 2-col: expectations LEFT · compression timeline RIGHT */}
        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 1fr)",
            gap: "clamp(40px, 5vw, 72px)",
            alignItems: "start",
            marginBottom: "clamp(56px, 7vw, 80px)",
          }}
        >
          <Rise>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                borderTop: "1px solid var(--bl-rule)",
              }}
            >
              {EXPECTATIONS.map((line, i) => (
                <li
                  key={i}
                  style={{
                    padding: "clamp(16px, 2vw, 22px) 0",
                    borderBottom: "1px solid var(--bl-rule)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    lineHeight: 1.55,
                    color: "var(--bl-fg)",
                  }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </Rise>

          <Rise delay={0.1}>
            <CompressionTimeline events={TIMELINE_EVENTS} />
          </Rise>
        </div>

        {/* Bench-math + two-ways-through paragraphs, full-width below */}
        <Rise delay={0.06}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.2vw, 17px)",
              color: "var(--bl-fg2)",
              lineHeight: 1.65,
              maxWidth: "var(--bl-text-wide)",
              margin: "0 0 24px",
            }}
          >
            Each line is a quarter of serious work, and your compliance team is
            two or three people who were hired for licensing and conduct, in a
            market where senior security practitioners are scarce and expensive
            to keep. The standard consulting answer of a scoping quarter
            followed by a delivery year was built for regulation that arrives
            one obligation at a time; it does not fit inside a six-month
            transition window, and running three of those engagements in
            parallel is a budget your board will not sign.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.2vw, 17px)",
              color: "var(--bl-fg2)",
              lineHeight: 1.65,
              maxWidth: "var(--bl-text-wide)",
              margin: 0,
            }}
          >
            That leaves two ways through: hire senior bodies the market does
            not have, or change how the work gets delivered. We built
            Birchlogic around the second one, and Singapore is where it matters
            most.
          </p>
        </Rise>
      </div>
    </section>
  );
}

// ─── 02 ────────────────────────────────────────────────────────────────────
function RegulatoryMap() {
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
        <Anchor number="02" label="Regulatory map" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: "0 0 24px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          Native coverage.
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>One programme.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-body)",
            margin: "0 0 clamp(48px, 6vw, 80px)",
          }}
        >
          Every regime below has its own buyer pain and its own clock. We run
          them as one programme, so evidence is collected once and the board
          sees one picture.
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {PILLARS.map((p, i) => (
            <Rise key={i} delay={i * 0.04}>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(220px, 280px) minmax(280px, 1fr)",
                  gap: "clamp(24px, 4vw, 64px)",
                  padding: "clamp(28px, 4vw, 44px) 0",
                  borderBottom: "1px solid var(--bl-rule)",
                  alignItems: "baseline",
                }}
                className="bl-pillar-row"
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    color: "var(--bl-fg)",
                  }}
                >
                  {p.label}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(15px, 1.15vw, 17px)",
                    lineHeight: 1.65,
                    color: "var(--bl-fg2)",
                    margin: 0,
                    maxWidth: "var(--bl-text-body)",
                  }}
                >
                  {p.body}
                </p>
              </li>
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── 03 ────────────────────────────────────────────────────────────────────
function RiskInDollars() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>(0.3);
  const days = useCount(45, 1600, isInView);

  return (
    <section
      style={{
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={inViewRef}
        className="bl-container"
        style={{ padding: 0, position: "relative" }}
      >
        <Anchor number="03" label="Cyber risk, in dollars" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: "0 0 clamp(48px, 6vw, 72px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          Boards see cyber risk
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>in dollars.</span>
        </h2>

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 1fr)",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "center",
          }}
        >
          <Rise>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(16px, 1.25vw, 18px)",
                lineHeight: 1.65,
                color: "var(--bl-fg2)",
                margin: 0,
                maxWidth: "var(--bl-text-narrow)",
              }}
            >
              The question Singapore audit committees ask in 2026 is not
              whether the firm is compliant but what its loss exposure is, in
              dollars, and how it moves quarter to quarter. The market answers
              with a heat map in three shades of amber. We answer with a
              number: FAIR and FAIR-CAM loss exceedance modelling, delivered in
              45 days, denominated in the currency the CFO already uses for
              credit, market, and operational risk. The hourly shops do not
              quantify, and the audit-brand readiness reviews stop at a
              rating, which is why the number, not the heat map, is what
              survives the board meeting.
            </p>
          </Rise>

          <Rise delay={0.1}>
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 200,
                fontVariantNumeric: "tabular-nums",
                fontSize: "clamp(120px, 18vw, 280px)",
                lineHeight: 0.9,
                letterSpacing: "-0.055em",
                color: "var(--bl-neon)",
                textAlign: "center",
              }}
            >
              {days}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(11px, 1vw, 14px)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--bl-fg3)",
                  marginTop: 12,
                }}
              >
                Days to a board-grade CRQ
              </div>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}

// ─── 04 ────────────────────────────────────────────────────────────────────
function Engagements() {
  return (
    <section
      id="engagements"
      style={{
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="The Singapore engagements" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: "0 0 24px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          Weeks, not quarters.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-wide)",
            margin: "0 0 clamp(48px, 6vw, 72px)",
          }}
        >
          When the supervisor compresses five years into eighteen months, speed
          stops being a preference and becomes the only delivery model that
          fits inside the transition windows. Our internal AI workbench runs
          the bureaucratic 60 percent of the work, the senior partner spends
          the recovered time on judgment, and that is how a third-party
          readiness programme lands in four to six weeks at a depth the
          quarterly-cadence firms do not reach at any speed. Scope and
          delivery date are fixed before we start, a senior partner sits in
          every meeting, and pricing is on the call.
        </p>

        <div
          style={{
            overflowX: "auto",
            border: "1px solid var(--bl-rule)",
            borderRadius: 12,
            background: "var(--bl-ink2)",
            marginBottom: 24,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 720,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--bl-rule)" }}>
                <TH style={{ width: "30%" }}>Engagement</TH>
                <TH style={{ width: "50%" }}>What it fixes</TH>
                <TH style={{ width: "20%", textAlign: "right" }}>Shape</TH>
              </tr>
            </thead>
            <tbody>
              {ENGAGEMENTS.map((e, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      i === ENGAGEMENTS.length - 1
                        ? "none"
                        : "1px solid var(--bl-rule)",
                  }}
                >
                  <td
                    style={{
                      padding: 20,
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: 16,
                      color: "var(--bl-fg)",
                      letterSpacing: "-0.005em",
                      verticalAlign: "top",
                    }}
                  >
                    <Link
                      href={e.href}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {e.name}
                      <span
                        aria-hidden="true"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          color: "var(--bl-neon)",
                        }}
                      >
                        ↗
                      </span>
                    </Link>
                  </td>
                  <td
                    style={{
                      padding: 20,
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "var(--bl-fg2)",
                      lineHeight: 1.55,
                      verticalAlign: "top",
                    }}
                  >
                    {e.fixes}
                  </td>
                  <td
                    style={{
                      padding: 20,
                      textAlign: "right",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--bl-fg3)",
                      letterSpacing: "0.04em",
                      verticalAlign: "top",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.shape}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px, 1.1vw, 16px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-wide)",
            margin: 0,
          }}
        >
          Board-level security reviews with quantified exposure are scoped on
          the call.
        </p>
      </div>
    </section>
  );
}

function TH({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "16px 20px",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--bl-fg3)",
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </th>
  );
}

// ─── 05 ────────────────────────────────────────────────────────────────────
function HowToEngage() {
  return (
    <section
      style={{
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 200px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="05" label="How to engage" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(36px, 6vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            margin: "0 0 32px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          One conversation.
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>Thirty minutes.</span>
        </h2>

        <Rise>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.25vw, 18px)",
              lineHeight: 1.7,
              color: "var(--bl-fg2)",
              maxWidth: "var(--bl-text-wide)",
              margin: "0 0 clamp(40px, 5vw, 56px)",
            }}
          >
            Book a 30-minute discovery call. Bring a specific Singapore
            blocker: a third-party register you cannot defend, a TRM domain
            finding from a supervisory letter, an AI feature your MAS-regulated
            counterparty is questioning, a December NRIC deadline nobody has
            scoped. We will tell you which engagement maps and in how many
            weeks. The call is led by Karan.
          </p>
        </Rise>

        <Rise delay={0.06}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(20px, 3vw, 32px) clamp(28px, 4vw, 48px)",
              alignItems: "center",
            }}
          >
            <MagButton href="/contact">
              Book a 30-minute discovery call
            </MagButton>
            <Link
              href="https://www.linkedin.com/in/karan-bhandari-0ab161149/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(14px, 1.1vw, 16px)",
                color: "var(--bl-fg)",
                textDecoration: "none",
                borderBottom: "1px solid var(--bl-rule2)",
                paddingBottom: 2,
              }}
            >
              Or send Karan a message on LinkedIn.
            </Link>
          </div>
        </Rise>
      </div>
    </section>
  );
}
