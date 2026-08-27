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

/**
 * Slug intentionally retained as `iso-42001-readiness` for legacy inbound
 * links. The display name is the MAS-first "MAS AI Governance Sprint";
 * ISO 42001 is the certificate leg for buyers who demand one.
 */
export const metadata = pageMeta({
  title: "MAS AI Governance Sprint",
  description:
    "AI risk integrated into the cyber programme, not bolted next to it. ISO 42001 readiness for regulated institutions.",
  path: "/services/iso-42001-readiness",
});

const WEEK_PHASES: { weeks: string; title: string; body: string }[] = [
  {
    weeks: "Week 1",
    title: "Inventory and material-risk mapping.",
    body: "We inventory every AI system in scope: in-production models, vendor-supplied AI features, agentic workflows, and the procurement pipeline of AI tools the team has not surfaced yet. Each is mapped against the MAS material-risk test and the MindForge Handbook's risk taxonomy.",
  },
  {
    weeks: "Weeks 2 to 3",
    title: "Governance build.",
    body: "AI risk policy, model lifecycle controls, human-oversight model, third-party AI vendor controls, incident response for AI-specific failure modes. Authored against the draft MAS AI Risk Management Guidelines, the MindForge Operationalisation Handbook, and IMDA's agentic AI framework so the posture carries when finals land.",
  },
  {
    weeks: "Week 4",
    title: "ISO 42001 certificate leg.",
    body: "Where a customer or counterparty demands ISO 42001 specifically, we map the same control set into the AIMS structure so the certificate path runs from the same evidence layer. One programme, two outputs; the supervisor pack and the buyer evidence pack do not diverge.",
  },
  {
    weeks: "Throughout",
    title: "Senior partner presence.",
    body: "The partner who scoped is the partner who delivers. No analyst handoffs on the AI risk register, no junior-led correspondence with the audit committee.",
  },
];

export default function MasAiGovernancePage() {
  return (
    <>
      <InnerHero
        kicker="MAS · Sprint"
        title="MAS AI governance, today."
        subtitle="An AI risk posture built against the MAS AI Risk Management Guidelines and the MindForge Operationalisation Handbook, with ISO 42001 readiness where a certificate is demanded. Four weeks. Senior partner in every meeting."
      />

      <SprintBlock
        number="02"
        label="The problem"
        heading="The guidelines are draft."
        headingDim="The transition window is not."
      >
        <SprintProse>
          The MAS AI Risk Management Guidelines closed for consultation on
          31 January 2026 and finals are expected in the second half of the
          year. The MindForge Operationalisation Handbook published 20 March
          2026 already tells you what an audited AI governance posture
          looks like. ISO 42001 is in the market and US-EU buyers are
          asking for it on procurement questionnaires today.
        </SprintProse>
        <SprintProse>
          The institutional response is to wait for the guideline finals.
          That answer is wrong arithmetically: the proposed transition
          window is how long you get, not when you start, and a six-month
          transition is not enough time to stand up a material-risk AI
          governance posture from cold.
        </SprintProse>
        <SprintProse>
          The right answer is to build against the Handbook now. The control
          set is observable, the structure is published, and an AIMS built
          against the Handbook today carries over when the guidelines land.
          Where a buyer or counterparty demands the ISO 42001 certificate
          specifically, the same control set delivers the AIMS in parallel.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="03"
        label="Why our approach matters"
        heading="MAS-first. Certificate where needed."
        headingDim="One programme. One evidence layer."
      >
        <SprintProse>
          The MAS-first framing matters because the supervisor reads for
          institutional judgement on material risk, not for a generic
          compliance posture. We build against the Handbook because the
          Handbook is what the supervisor will use to assess your posture
          when the finals land.
        </SprintProse>
        <SprintProse>
          The ISO 42001 certificate is the buyer leg. A US enterprise asking
          for AI governance evidence does not read MAS guidelines; they
          read a certificate. We map the same control set into the AIMS
          structure so one programme delivers both outputs and the two
          evidence packs stay aligned over time.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="04"
        label="What you get"
        heading="Four weeks."
        headingDim="One AI governance posture, two evidence outputs."
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
        heading="A posture that carries to finals."
        headingDim="A certificate path that runs from the same evidence."
        inverted
      >
        <SprintProse inverted>
          An AI risk register and governance posture aligned to the
          Operationalisation Handbook today. When the MAS AI Risk Management
          Guidelines finalise in H2 2026, the work is the format change, not
          the content rebuild.
        </SprintProse>
        <SprintProse inverted>
          An AIMS that earns the ISO 42001 certificate on the timeline an
          enterprise buyer expects. One audit, one evidence package, one
          renewal cycle.
        </SprintProse>
        <SprintProse inverted>
          A control set you can defend in front of an audit committee and a
          procurement reviewer in the same week, without writing two
          different documents.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="06"
        label="Who this is built for"
        heading="MAS-regulated entities with material AI risk, and SG platforms whose buyers are asking."
      >
        <SprintProse>
          Banks and payment institutions with model-driven decisions on
          credit, fraud, or AML. Capital markets services firms with
          AI-augmented research, trading, or surveillance. SaaS platforms
          selling AI features into MAS-regulated counterparties or US-EU
          enterprises that have added ISO 42001 to procurement
          questionnaires.
        </SprintProse>
        <SprintProse>
          The buyer is the Head of Model Risk, the CISO, the Head of AI, or
          the founder whose AI feature is sitting in a procurement review.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="07"
        label="What this is not"
        heading="Three things this is not."
      >
        <SprintProse>
          This is not a model audit. We work alongside model risk teams; the
          sprint covers governance posture, not statistical validation.
        </SprintProse>
        <SprintProse>
          This is not a certificate-only project. If you want an ISO 42001
          paper with no MAS-defensible posture behind it, hire someone else.
        </SprintProse>
        <SprintProse>
          This is not a finals-watching exercise. The Handbook is the
          authority we build against now; the guidelines finalising will
          confirm the structure, not invalidate the work.
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
            text="Build now."
            perChar={0.014}
          />
          <br />
          <SplitText
            text="Finals will confirm. Not invalidate."
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
