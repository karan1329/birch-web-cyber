"use client";

import { Anchor } from "../primitives/Anchor";
import { Rise } from "../primitives/Rise";

type Practice = {
  numeral: string;
  heading: string;
  body: string;
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
            maxWidth: 1100,
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
            maxWidth: 700,
            margin: "0 0 clamp(56px, 7vw, 96px)",
          }}
        >
          The five practices below are the intellectual scope of what
          Birchlogic delivers. The three commercial shapes that follow are how
          you actually buy it.
        </p>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {PRACTICES.map((p, i) => (
            <Rise key={i} delay={i * 0.04}>
              <PracticeRow {...p} />
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PracticeRow({ numeral, heading, body }: Practice) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(80px, 120px) minmax(280px, 1fr)",
        gap: "clamp(24px, 4vw, 64px)",
        padding: "clamp(32px, 4vw, 56px) 0",
        borderBottom: "1px solid var(--bl-rule)",
        alignItems: "baseline",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "clamp(56px, 6vw, 96px)",
          lineHeight: 0.9,
          letterSpacing: "-0.045em",
          color: "var(--bl-fg3)",
          transition: "color 0.25s ease",
        }}
        className="bl-practice-numeral"
      >
        {numeral}
      </span>
      <div>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(22px, 2.2vw, 32px)",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            color: "var(--bl-fg)",
            margin: "0 0 16px",
          }}
        >
          {heading}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.65,
            color: "var(--bl-fg2)",
            margin: 0,
            maxWidth: 760,
          }}
        >
          {body}
        </p>
      </div>
    </li>
  );
}
