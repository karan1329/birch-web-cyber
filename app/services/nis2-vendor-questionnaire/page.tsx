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
  title: "NIS2 Vendor Questionnaire Engine",
  description:
    "Answer the vendor security questionnaire once. Reuse the evidence across every NIS2 counterparty that asks.",
  path: "/services/nis2-vendor-questionnaire",
});

const WEEK_PHASES: { weeks: string; title: string; body: string }[] = [
  {
    weeks: "Week 1",
    title: "Source-of-truth build.",
    body: "We assemble the canonical answer library from your existing SOC2, ISO 27001, and DPDP evidence; the gaps NIS2 introduces over those frameworks (mostly around incident reporting, supply-chain risk, and management accountability) we close with policy and control work, not with new questionnaire prose.",
  },
  {
    weeks: "Weeks 2 to 3",
    title: "Answer engine + reviewer playbook.",
    body: "We build a buyer-facing answer engine indexed against the NIS2 obligations enterprises actually test (Articles 21, 23, the supply-chain expectations), and a reviewer playbook your sales engineers can run alone. A questionnaire that took three weeks turns around in three hours.",
  },
  {
    weeks: "From month 2",
    title: "Monthly maintenance.",
    body: "Each month: the new EU enterprise questionnaires you received, the diffs from prior buyers, the regulatory updates (member-state implementation drifts, CER overlaps, ENISA guidance), and the answer library updates rolled in. The engine stays current; your sales engineers stay unblocked.",
  },
  {
    weeks: "Throughout",
    title: "Senior partner presence.",
    body: "The partner who scoped is the partner who delivers. Edge-case questions (member-state quirks, dual-use disclosures, EU subsidiary scope) get a same-day answer from someone who has seen the version of the question that closed last month.",
  },
];

export default function Nis2QuestionnairePage() {
  return (
    <>
      <InnerHero
        kicker="EU · Sprint"
        title="NIS2 questionnaires, answered."
        subtitle="EU enterprise NIS2 vendor questionnaires answered in hours, not weeks. A three-week build plus monthly maintenance, for Singapore SaaS with EU pipeline. Senior partner-led."
      />

      <SprintBlock
        number="02"
        label="The problem"
        heading="NIS2 is in force."
        headingDim="The questionnaires are a sales chokepoint."
      >
        <SprintProse>
          The NIS2 Directive came into force on 16 January 2023; the
          transposition deadline for member states was 17 October 2024.
          Implementation is now uneven across the EU but the procurement
          consequence is uniform: every EU enterprise customer onboarding a
          Singapore SaaS now adds a NIS2 vendor questionnaire to the
          standard SOC2 and ISO 27001 stack.
        </SprintProse>
        <SprintProse>
          The questionnaires are long. The questions overlap your existing
          frameworks but ask for slightly different evidence. The buyer
          assumes you have the answers; if you do not, the procurement
          stage stalls for the two to three weeks it takes your engineering
          team to write them. Multiply by the number of EU deals in the
          pipeline and the sales motion stops being velocity-led.
        </SprintProse>
        <SprintProse>
          The right shape is a sales-engineering asset: a canonical answer
          library, indexed against the NIS2 obligations enterprises test
          for, that your team can ship a customised response from in hours.
          The supervisor framing belongs in the policy library; the buyer
          framing belongs in the questionnaire response.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="03"
        label="Why our approach matters"
        heading="A library, not a one-off."
        headingDim="Built once. Maintained monthly."
      >
        <SprintProse>
          Every consulting firm in the market will answer your next NIS2
          questionnaire by hand for a fixed fee. The fourth questionnaire
          arrives two weeks later. We build the answer engine and hand it
          over so the fourth questionnaire takes hours, not weeks, and the
          fortieth takes the same.
        </SprintProse>
        <SprintProse>
          The monthly maintenance is the half of the engagement that
          matters. NIS2 implementation drifts member-state by member-state,
          ENISA guidance updates quarterly, and the questionnaire templates
          enterprises use change every six months. The engine stays current
          because the partner who owns it watches the source.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="04"
        label="What you get"
        heading="Three weeks to ship."
        headingDim="Monthly maintenance after."
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
        heading="A sales motion the EU pipeline does not stall."
        inverted
      >
        <SprintProse inverted>
          An answer library your sales engineering team can run alone. The
          partner is on call for edge-case questions; the standard
          questionnaire turnaround is hours, not weeks.
        </SprintProse>
        <SprintProse inverted>
          A reviewer playbook that closes the gap between what NIS2 demands
          and what the SOC2 or ISO 27001 evidence already proves. Your
          existing evidence carries; the engine maps it to the obligation
          the buyer is asking about.
        </SprintProse>
        <SprintProse inverted>
          A monthly cadence that absorbs member-state implementation drift
          before it shows up in a procurement question you have not seen
          before.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="06"
        label="Who this is built for"
        heading="Singapore SaaS with EU pipeline."
      >
        <SprintProse>
          B2B SaaS, AI-native platforms, and infrastructure firms HQ-ed in
          Singapore (or with significant SG engineering footprint) selling
          into EU enterprises. The buyer is the Head of Sales Engineering,
          the CISO, or the founder whose deal is stuck on a long
          questionnaire.
        </SprintProse>
        <SprintProse>
          If you also need US enterprise AI questionnaire coverage on the
          same surface, the AI Security Questionnaire Response Engine pairs
          natively. We will say so on the call.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="07"
        label="What this is not"
        heading="Three things this is not."
      >
        <SprintProse>
          This is not a NIS2 compliance programme. NIS2 obligations bind the
          essential and important entities the directive names; the
          questionnaire is the downstream procurement consequence and the
          engine answers it. If you are an essential entity inside an EU
          member state, the right engagement is a programme, not this
          sprint.
        </SprintProse>
        <SprintProse>
          This is not a one-time questionnaire response. We build the
          engine; the answer to the fortieth questionnaire is the same
          shape as the answer to the fourth.
        </SprintProse>
        <SprintProse>
          This is not a Singapore-regulator engagement. NIS2 is EU
          procurement coverage; the supervisor work lives in the MAS-native
          sprints.
        </SprintProse>
        <Link
          href="/services"
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
          Part of the sprint catalogue. See all services →
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
        gridTemplateColumns: "minmax(140px, 200px) minmax(0, 1fr)",
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
        padding: "var(--bl-section-gap) var(--bl-page-pad)",textAlign: "center",
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
            text="Hours, not weeks."
            perChar={0.014}
          />
          <br />
          <SplitText
            text="Every questionnaire after the first."
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
