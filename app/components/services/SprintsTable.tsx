"use client";

import Link from "next/link";
import { useState } from "react";
import { Anchor } from "../primitives/Anchor";

type Sprint = {
  name: string;
  fixes: string;
  duration: string;
  href?: string;
};

const SPRINTS: Sprint[] = [
  {
    name: "Multi-Framework Compliance Program",
    fixes: "SOC2, ISO 27001, DPDP, AI governance, all delivered as one program. Evidence collected once, mapped across regimes.",
    duration: "6 to 8 weeks",
    href: "/services/multi-framework-compliance",
  },
  {
    name: "SOC2 Type I in 2 Weeks",
    fixes: "You are stalled mid-Vanta. Senior firm pushes you across the audit line.",
    duration: "2 weeks",
  },
  {
    name: "AI Security Posture Sprint",
    fixes: "US prospects asking AI questions. You have no answers.",
    duration: "4 weeks",
  },
  {
    name: "ISO 42001 Readiness Sprint",
    fixes: "EU customer asked for ISO 42001. You have no AIMS.",
    duration: "4 weeks",
    href: "/services/iso-42001-readiness",
  },
  {
    name: "Cloud Security Architecture Review",
    fixes: "AWS, Azure, GCP grew reactively. Customer-defensible architecture in 4 weeks.",
    duration: "4 weeks",
  },
  {
    name: "SEBI CSCRF Attestation Sprint",
    fixes: "Audit committee deadline. CRQ in rupees alongside controls evidence.",
    duration: "4 weeks",
  },
  {
    name: "DPDP Act Readiness Sprint",
    fixes: "ROPA, DPO, breach playbook, cross-border transfer framework.",
    duration: "4 weeks",
  },
  {
    name: "TPRM Audit Rescue",
    fixes: "A deal is stuck. We unstick it in three weeks.",
    duration: "3 to 4 weeks",
  },
  {
    name: "AI Security Questionnaire Response Engine",
    fixes: "Multiple enterprise prospects asking AI questions. We build the answer library.",
    duration: "3 weeks + monthly",
  },
  {
    name: "MAS TRM Single-Domain Sprint",
    fixes: "One open TRM Domain finding. MAS-fluent partner.",
    duration: "4 weeks",
    href: "/services/mas-trm-single-domain",
  },
  {
    name: "Notice 658 + TPRM Readiness Sprint",
    fixes: "Your third-party register, mapped to Notice 658 and the incoming TPRM Guidelines before MAS asks.",
    duration: "4 to 6 weeks",
    href: "/services/notice-658-tprm-readiness",
  },
  {
    name: "NIS2 Vendor Questionnaire Engine",
    fixes: "EU enterprise questionnaires answered in hours, not weeks. Built for SG SaaS with EU pipeline.",
    duration: "3 weeks + monthly",
    href: "/services/nis2-vendor-questionnaire",
  },
  {
    name: "Post-Incident 30-Day Hardening",
    fixes: "After the breach: identity, backups, IR runbook, board recovery report.",
    duration: "4 weeks",
  },
  {
    name: "M&A Cyber DD Express",
    fixes: "PE-ready cyber DD. IC-grade output.",
    duration: "3 to 4 weeks",
  },
];

/**
 * Sprint ledger. Rows with `href` link to their dedicated landing pages.
 * Hover lights the row with a left neon bar. Section heading dropped the
 * explicit count so we do not need to re-render every time a sprint
 * lands or retires.
 */
export function SprintsTable() {
  return (
    <section
      id="sprints"
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(100px, 14vw, 180px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="The quick sprints" />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(32px, 4.5vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          Quick sprints.
          <br />
          <span style={{ color: "var(--bl-fg3)" }}>
            One specific thing, fixed in weeks.
          </span>
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
          A founder with a US enterprise deal stuck on AI questions does not
          need a year. A SEBI mid-cap CISO with an attestation due in 60 days
          does not need a one-off audit. They need one specific thing fixed in
          one month, by a senior practitioner, with a partner accountable for
          the outcome.
        </p>

        <div
          style={{
            overflowX: "auto",
            border: "1px solid var(--bl-rule)",
            borderRadius: 12,
            background: "var(--bl-ink2)",
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
                <TH style={{ width: "32%" }}>Sprint</TH>
                <TH style={{ width: "52%" }}>What it fixes</TH>
                <TH style={{ width: "16%", textAlign: "right" }}>Duration</TH>
              </tr>
            </thead>
            <tbody>
              {SPRINTS.map((s, i) => (
                <SprintRow key={i} sprint={s} isLast={i === SPRINTS.length - 1} />
              ))}
            </tbody>
          </table>
        </div>
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

function SprintRow({
  sprint,
  isLast,
}: {
  sprint: Sprint;
  isLast: boolean;
}) {
  const [hov, setHov] = useState(false);
  const hasLink = Boolean(sprint.href);

  return (
    <tr
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
      style={{
        background: hov && hasLink ? "var(--bl-ink3)" : "transparent",
        borderBottom: isLast ? "none" : "1px solid var(--bl-rule)",
        transition: "background 0.25s ease",
        cursor: hasLink ? "pointer" : "default",
      }}
    >
      <td
        style={{
          padding: "20px",
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 16,
          color: "var(--bl-fg)",
          letterSpacing: "-0.005em",
          verticalAlign: "top",
          position: "relative",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 2,
            background: hasLink ? "var(--bl-neon)" : "var(--bl-rule2)",
            opacity: hov && hasLink ? 1 : hasLink ? 0.55 : 0.25,
            transition: "opacity 0.25s ease",
          }}
        />
        {hasLink ? (
          <Link
            href={sprint.href!}
            style={{
              color: "inherit",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {sprint.name}
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
        ) : (
          sprint.name
        )}
      </td>
      <td
        style={{
          padding: "20px",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--bl-fg2)",
          lineHeight: 1.55,
          verticalAlign: "top",
        }}
      >
        {sprint.fixes}
      </td>
      <td
        style={{
          padding: "20px",
          textAlign: "right",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--bl-fg3)",
          letterSpacing: "0.04em",
          verticalAlign: "top",
          whiteSpace: "nowrap",
        }}
      >
        {sprint.duration}
      </td>
    </tr>
  );
}
