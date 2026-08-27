import Link from "next/link";
import { InnerHero } from "../../components/primitives/InnerHero";
import { MagButton } from "../../components/primitives/MagButton";
import { Rise } from "../../components/primitives/Rise";
import { SplitText } from "../../components/primitives/SplitText";
import { pageMeta } from "../../lib/seo";
import {
  SprintBlock,
  SprintProse,
} from "../../components/sprints/SprintBlock";

export const metadata = pageMeta({
  title: "Notice 658 + TPRM Readiness Sprint",
  description:
    "Third-party registers, outsourcing-grade due diligence and board accountability for MAS-licensed FIs.",
  path: "/services/notice-658-tprm-readiness",
});

const WEEK_PHASES: { weeks: string; title: string; body: string }[] = [
  {
    weeks: "Weeks 1 to 2",
    title: "Register reconstruction.",
    body: "We build the complete third-party register from your contract repository, finance ledger, and IAM systems. Every material vendor in one taxonomy, classified by service criticality, data sensitivity, and the supervisor's outsourcing-grade test. Existing internal lists are a starting point, not a source of truth.",
  },
  {
    weeks: "Weeks 3 to 4",
    title: "Due diligence pack.",
    body: "We replace the Yes-No questionnaire with outsourcing-grade due diligence: SOC2 review with reviewer notes, sub-processor flowdown, exit clauses tested against MAS expectations, residual-risk register the board can sign. Every material vendor gets evidence, not reassurance.",
  },
  {
    weeks: "Weeks 4 to 6",
    title: "Notice 658 + TPRM mapping.",
    body: "Each control mapped to its Notice 658 paragraph and its TPRM consultation clause in parallel. Where the two diverge, we resolve the divergence in the policy document with framework-specific language. The output is one register, two regimes, one inspector-ready binder.",
  },
  {
    weeks: "Throughout",
    title: "Senior partner presence.",
    body: "The partner who scoped is the partner who delivers. No analyst handoffs. Every MAS-fluent decision lands in the same room.",
  },
];

export default function Notice658Page() {
  return (
    <>
      <InnerHero
        kicker="MAS · Sprint"
        title="Notice 658, mapped."
        subtitle="The third-party register MAS expects, built in four to six weeks. Notice 658 for banks and merchant banks, the equivalent notices for other licence classes, and the incoming TPRM Guidelines in one programme. Senior partner in every meeting."
      />

      <SprintBlock
        number="02"
        label="The problem"
        heading="The register is the audit."
        headingDim="And most registers do not survive an inspector reading them."
      >
        <SprintProse>
          Notice 658 binds banks and merchant banks; the equivalent notices
          extend the same expectation across the other licence classes, and the
          TPRM consultation released 6 March 2026 (closed 20 April) proposes
          extending third-party expectations to every MAS-licensed FI plus a
          semi-annual register submission to the supervisor. The register is
          no longer an internal artefact you maintain in a spreadsheet between
          inspections; it is an evidence pack you ship to MAS twice a year.
        </SprintProse>
        <SprintProse>
          The Toppan Next Tech third-party incident put third-party operational
          resilience back at the top of the MAS supervisory agenda. The 14 May
          2026 revocation of a major payment institution licence for risk
          management failures put the rest of the market on notice: register
          gaps are now a supervisory action item, not a finding to remediate
          on next year&rsquo;s audit cycle.
        </SprintProse>
        <SprintProse>
          The standard response is a tooling project: stand up a third-party
          risk platform, send out questionnaires, populate the register from
          whatever vendors reply. The supervisor reads that as the absence of
          due diligence, not the presence of it. The register that survives
          inspection is built from your contract repository up, not from a
          questionnaire response down.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="03"
        label="Why our approach matters"
        heading="One register. Two regimes."
        headingDim="One audit-defensible binder."
      >
        <SprintProse>
          Notice 658 and the TPRM Guidelines share most of their control
          surface: classification, due diligence depth, board accountability,
          exit clauses, sub-processor flowdown, ongoing monitoring. Running
          them as two projects means reconciling two registers, two policy
          libraries, and two evidence taxonomies six months from now, when
          MAS asks for both.
        </SprintProse>
        <SprintProse>
          We build one register and tag each control against both regimes, so
          the policy authoring happens once, the due diligence pack is written
          once, and the semi-annual submission and the annual audit draw from
          the same evidence layer. Where the two regimes diverge, the
          divergence is resolved in the document, not in your team&rsquo;s head.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="04"
        label="What you get"
        heading="Four to six weeks."
        headingDim="One unified third-party programme."
      >
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {WEEK_PHASES.map((phase, i) => (
            <PhaseRow key={i} phase={phase} />
          ))}
        </ol>
      </SprintBlock>

      <SprintBlock
        number="05"
        label="What you keep after"
        heading="A register that survives."
        headingDim="Every inspection, every six months."
        inverted
      >
        <SprintProse inverted>
          A third-party register your compliance team can defend on a
          fortnight&rsquo;s notice. Not a spreadsheet you rebuild before each
          audit; a living artefact wired into vendor onboarding, contract
          renewal, and incident response so it updates by side-effect.
        </SprintProse>
        <SprintProse inverted>
          A semi-annual submission ready before MAS asks. When the TPRM
          Guidelines finalise and the submission cadence locks, you are
          already running the cycle; the work is the format, not the content.
        </SprintProse>
        <SprintProse inverted>
          A policy library that closes the gap between Notice 658, the TPRM
          Guidelines, and the wider operational resilience expectations the
          supervisor reads as one programme.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="06"
        label="Who this is built for"
        heading="MAS-licensed FIs whose third-party register is older than the obligation."
      >
        <SprintProse>
          Tier-2 and Tier-3 banks, merchant banks, payment institutions,
          capital markets services licence holders, and the SaaS platforms
          that serve them. The buyer is the Head of Compliance, the COO, or
          the CISO; the trigger is a supervisor letter, a board paper coming
          due, or a peer institution&rsquo;s licence action that the
          chairperson read about over the weekend.
        </SprintProse>
        <SprintProse>
          If your register was built for vendor onboarding and never rebuilt
          for inspection, this is what we built for you.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="07"
        label="What this is not"
        heading="Three things this is not."
      >
        <SprintProse>
          This is not a tooling implementation. We work alongside the
          third-party risk platforms in the market, but the register is built
          from your contract repository, not from a vendor&rsquo;s template.
        </SprintProse>
        <SprintProse>
          This is not a checklist exercise. The supervisor reads for evidence
          of judgement; we build evidence of judgement.
        </SprintProse>
        <SprintProse>
          This is not a one-off. The TPRM cadence is semi-annual once the
          Guidelines finalise. We hand back a process, not just a binder.
        </SprintProse>
        <Link
          href="/singapore"
          style={{
            display: "inline-block",
            marginTop: 32,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "var(--bl-neon)",
            textDecoration: "none",
          }}
        >
          Part of our Singapore practice. See the regulatory map →
        </Link>
      </SprintBlock>

      <ClosingCTASection />
    </>
  );
}

function PhaseRow({
  phase,
}: {
  phase: { weeks: string; title: string; body: string };
}) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) minmax(260px, 1fr)",
        gap: "clamp(24px, 4vw, 64px)",
        padding: "clamp(24px, 3vw, 36px) 0",
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
          textTransform: "uppercase",
        }}
      >
        {phase.weeks}
      </span>
      <div>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(18px, 1.7vw, 24px)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            color: "var(--bl-fg)",
            margin: "0 0 8px",
          }}
        >
          {phase.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--bl-fg2)",
            margin: 0,
            maxWidth: "var(--bl-text-narrow)",
          }}
        >
          {phase.body}
        </p>
      </div>
    </li>
  );
}

function ClosingCTASection() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-section-veil)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 220px) var(--bl-page-pad)",
        borderTop: "1px solid var(--bl-rule)",
        textAlign: "center",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(36px, 5.5vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            margin: "0 auto clamp(32px, 4vw, 48px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText
            text="Bring the register you have."
            perChar={0.014}
          />
          <br />
          <SplitText
            text="We will tell you what survives."
            perChar={0.014}
            delay={0.28}
            dim
          />
        </h2>
        <Rise delay={0.2}>
          <div style={{ display: "inline-flex", justifyContent: "center" }}>
            <MagButton href="/contact">
              Book a 30-minute discovery call
            </MagButton>
          </div>
        </Rise>
      </div>
    </section>
  );
}
