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
  title: "MAS TRM Single-Domain Sprint",
  description:
    "One open MAS TRM domain finding, closed on a hard clock. Scoped, evidenced and board-ready.",
  path: "/services/mas-trm-single-domain",
});

const WEEK_PHASES: { weeks: string; title: string; body: string }[] = [
  {
    weeks: "Week 1",
    title: "Finding triage.",
    body: "We read the supervisor letter or the internal audit finding in the language MAS wrote it. We map the actual gap against the TRM domain control set, not the consultant restatement. The first deliverable is the right question, agreed in the room: what control evidence does the supervisor need to see, and at what depth.",
  },
  {
    weeks: "Weeks 2 to 3",
    title: "Control build + evidence rebuild.",
    body: "We stand up the control to the standard the domain demands. Documentation, technical implementation, monitoring, the artefact set a MAS reviewer opens first. Where the existing posture has the shape but not the evidence, we rebuild the evidence layer so it reads as design, not retrofit.",
  },
  {
    weeks: "Week 4",
    title: "Response pack + walk-through.",
    body: "We assemble the supervisor response pack: cover note, control narrative, evidence index, remediation plan with dates the team will actually hit. Partner walks your team through the response cadence and sits the first supervisor follow-up if needed.",
  },
  {
    weeks: "Throughout",
    title: "Senior partner presence.",
    body: "The partner who scoped is the partner who delivers. MAS-fluent at every meeting. No analyst handoffs, no junior-led correspondence with the supervisor.",
  },
];

export default function MasTrmSingleDomainPage() {
  return (
    <>
      <InnerHero
        kicker="MAS · Sprint"
        title="One TRM domain. Closed."
        subtitle="One open MAS TRM Domain finding, closed by a senior MAS-fluent partner in four weeks. Evidence packs the supervisor recognises. Cover-note language that lands as design, not retrofit."
      />

      <SprintBlock
        number="02"
        label="The problem"
        heading="The finding sits open."
        headingDim="The next supervisory cycle is forty days away."
      >
        <SprintProse>
          You have a finding from a thematic inspection, an internal audit
          report, or a routine supervisor letter. The finding is real, the
          remediation is in flight, and the documentation in front of MAS
          does not yet read as a closed loop. The next supervisory engagement
          is six to ten weeks out and the institution&rsquo;s appetite for
          another open item is zero.
        </SprintProse>
        <SprintProse>
          The standard consulting answer is a domain-wide assessment that
          rebuilds everything around the finding over a quarter. That model
          is the right one when nothing is binding; it is the wrong one when
          one specific control needs to land in a supervisor pack in four
          weeks. Hourly billing rewards scope creep into adjacent domains;
          the supervisor reads scope creep as a posture problem.
        </SprintProse>
        <SprintProse>
          The right answer is the opposite shape. One open finding, one TRM
          domain, one senior partner in the room from day one, four weeks
          from intake to response pack, written in the language the
          supervisor uses, with the control depth a MAS reviewer recognises.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="03"
        label="Why our approach matters"
        heading="MAS-fluent, partner-led, four-week clock."
      >
        <SprintProse>
          MAS TRM is read on language as much as on control depth. Cover
          notes that translate a SOC2 control into a Notice 658 expectation,
          evidence packs that mirror the Annex structure the supervisor
          reads, remediation plans dated against the institution&rsquo;s
          board cycle. We write to the supervisor; the firms that write to
          their own delivery teams produce remediation that reads as
          remediation.
        </SprintProse>
        <SprintProse>
          The partner who scoped the sprint sits every working session,
          every supervisor pre-meeting, and every escalation. Four weeks is
          the right shape because the supervisor cycle is six to ten; we
          want the response pack on the desk before the next thematic
          inspection scope is set, not after.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="04"
        label="What you get"
        heading="Four weeks."
        headingDim="One closed-loop response pack."
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
        heading="A response pattern your team can run."
        headingDim="The next finding does not need us."
        inverted
      >
        <SprintProse inverted>
          The artefact set for the closed domain becomes the template for
          the next finding your team handles internally. Evidence index
          layout, cover-note language, supervisor-pack format — all of it
          documented, all of it portable to adjacent domains.
        </SprintProse>
        <SprintProse inverted>
          A relationship with the senior partner who handled the response.
          When the next finding lands, you call the same person and the
          rebuild starts from the existing template, not from intake.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="06"
        label="Who this is built for"
        heading="MAS-licensed institutions with one open TRM domain finding and a hard clock."
      >
        <SprintProse>
          Tier-2 and Tier-3 banks, merchant banks, payment institutions, and
          capital markets services licence holders whose internal audit, a
          thematic MAS inspection, or a routine supervisor letter has put
          one specific TRM domain on the desk with a date attached. The
          buyer is the CISO, the Head of Technology Risk, or the Head of
          Compliance.
        </SprintProse>
        <SprintProse>
          If the finding is the whole TRM domain rather than one control
          inside it, this is not the right shape; we will say so on the
          call.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="07"
        label="What this is not"
        heading="Three things this is not."
      >
        <SprintProse>
          This is not a TRM assessment. We do those on a vCISO retainer over
          a board cycle; this sprint closes one finding, not a domain
          rebuild.
        </SprintProse>
        <SprintProse>
          This is not a writing exercise. The cover note is the smallest
          part of the work; the control depth is the work.
        </SprintProse>
        <SprintProse>
          This is not a deliverable handed to a junior. The partner who
          scoped is the partner who sits the supervisor pre-meeting.
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
          <SplitText text="One finding." perChar={0.014} />
          <br />
          <SplitText
            text="Four weeks. Senior partner."
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
