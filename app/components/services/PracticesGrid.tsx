"use client";

import Link from "next/link";
import { useState } from "react";
import { Anchor } from "../primitives/Anchor";

type Practice = {
  numeral: string;
  heading: string;
  body: string;
  crossLink?: { href: string; label: string };
};

const PRACTICES: Practice[] = [
  {
    numeral: "I",
    heading: "Strategic Advisory and vCISO.",
    body: "Embedded senior leadership inside the executive team, not next to it. Risk appetite renegotiated each fiscal cycle. Governance built through workflow. Board reporting in financial language.",
  },
  {
    numeral: "II",
    heading: "CRQ and Strategic Assessment.",
    body: "Sixteen-domain CMMI maturity scoring. FAIR-CAM control efficacy quantification. Monte Carlo loss exceedance modelling. Quant work accelerated by our internal workbench, while interviews, scenario scoping, and board framing remain partner-led.",
  },
  {
    numeral: "III",
    heading: "Compliance, Privacy and Regulatory.",
    body: "Multi-framework programme design where evidence is collected once and mapped across overlapping regimes. RBI, SEBI, MAS TRM, EU AI Act, NIS2, DPDP, UAE PDPL, DESC. Workflow-built evidence linkage so audit preparation stops being a sprint.",
    crossLink: {
      href: "/singapore",
      label: "Singapore is our lead regulator-led practice. See it here →",
    },
  },
  {
    numeral: "IV",
    heading: "Application, Cloud and AI Security.",
    body: "Engineering-led security where the security team ships code. Cloud architecture across AWS, Azure, and GCP. AI security architecture for AI-native systems: agentic threat modelling, MCP security, supply-chain governance for models, EU AI Act compliance design that engineering teams can actually execute.",
  },
  {
    numeral: "V",
    heading: "Resilience, Incident Response and Recovery.",
    body: "Crisis-grade incident response with hours-not-days containment objectives. DFIR with forensic-grade evidence preservation. Business continuity that does not depend on the CISO being available at the moment of crisis.",
  },
];

/**
 * Five practices as a vertical Roman-numeral ledger.
 * Each row: huge numeral on the left rail · heading + body on the right.
 * Hover lights the numeral to neon.
 */
export function PracticesGrid() {
  // -1 = nothing revealed. First cell opens by default so the row never
  // reads as five empty headings on load.
  const [active, setActive] = useState(0);

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
        <Anchor number="01" label="Practices" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 76px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            margin: "0 0 24px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          Five practices. Each designed around a specific buyer pain,
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>
            not a generic SOW template.
          </span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: "var(--bl-text-body)",
            margin: "0 0 clamp(56px, 7vw, 96px)",
          }}
        >
          The five practices below are the intellectual scope of what
          Birchlogic delivers. The three commercial shapes that follow are how
          you actually buy it.
        </p>

        <ol
          className="bl-practices-row"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 1,
            background: "var(--bl-rule)",
            border: "1px solid var(--bl-rule)",
          }}
        >
          {PRACTICES.map((p, i) => (
            <PracticeCell
              key={i}
              practice={p}
              open={active === i}
              onOpen={() => setActive(i)}
              onToggle={() => setActive(active === i ? -1 : i)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function PracticeCell({
  practice,
  open,
  onOpen,
  onToggle,
}: {
  practice: Practice;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const { numeral, heading, body, crossLink } = practice;
  return (
    <li
      style={{
        background: open ? "var(--bl-ink3)" : "var(--bl-ink2)",
        transition: "background 0.25s ease",
        display: "flex",
        minWidth: 0,
      }}
      // Desktop reveals on hover; the button below carries tap and keyboard.
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onOpen();
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          appearance: "none",
          background: "none",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          padding: "clamp(20px, 2.2vw, 30px)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "clamp(30px, 3vw, 48px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            color: open ? "var(--bl-accent)" : "var(--bl-fg3)",
            transition: "color 0.25s ease",
          }}
        >
          {numeral}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(15px, 1.25vw, 19px)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            color: "var(--bl-fg)",
            margin: 0,
          }}
        >
          {heading}
        </h3>

        {/* Body is the reveal. Grid-rows transition keeps it animatable
            without hard-coding a height per cell. */}
        <span
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows 0.32s cubic-bezier(0.2,0.7,0.2,1)",
          }}
        >
          <span style={{ overflow: "hidden", minHeight: 0 }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(13px, 1vw, 14.5px)",
                lineHeight: 1.6,
                color: "var(--bl-fg2)",
                paddingTop: 4,
              }}
            >
              {body}
            </span>
            {crossLink && (
              <Link
                href={crossLink.href}
                style={{
                  display: "inline-block",
                  marginTop: 14,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--bl-accent)",
                  textDecoration: "none",
                }}
              >
                {crossLink.label}
              </Link>
            )}
          </span>
        </span>
      </button>
    </li>
  );
}
