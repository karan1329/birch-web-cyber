import { InnerHero } from "../../components/primitives/InnerHero";
import { MagButton } from "../../components/primitives/MagButton";
import { Rise } from "../../components/primitives/Rise";
import { SplitText } from "../../components/primitives/SplitText";
import {
  SprintBlock,
  SprintProse,
} from "../../components/sprints/SprintBlock";

export const metadata = {
  title: "Multi-Framework Compliance Program · Birchlogic",
  description:
    "SOC2, ISO 27001, DPDP, HIPAA, ISO 42001, PCI, MAS TRM, NIS2 alignment. Six to eight weeks. One program. One senior partner.",
};

const WEEK_PHASES: { weeks: string; title: string; body: string }[] = [
  {
    weeks: "Weeks 1 to 2",
    title: "Discovery and scope.",
    body: "We map every framework that currently applies to your business and every framework that will apply in the next 12 months. We identify the union of controls across all of them. We build a single evidence taxonomy that every framework draws from.",
  },
  {
    weeks: "Weeks 3 to 4",
    title: "Policy and procedure layer.",
    body: "We author the policy library once. Each policy is tagged with the frameworks it satisfies. Where frameworks demand different language for the same control, we resolve the differences in one document with framework-specific clauses.",
  },
  {
    weeks: "Weeks 5 to 6",
    title: "Evidence operationalization.",
    body: "Every control's evidence collection is built into the workflow that creates the evidence. Identity changes generate IAM audit logs. Cloud config changes generate Terraform commits. Vendor onboarding generates third-party assessment artifacts. Audit preparation stops being a sprint. It becomes a side-effect of normal engineering.",
  },
  {
    weeks: "Weeks 7 to 8",
    title: "Audit firm coordination.",
    body: "We bring you to two pre-vetted audit firms per framework. We attend the scoping calls. You select. We hand over evidence packages organized by framework. The audit timelines run in parallel, not in sequence.",
  },
  {
    weeks: "Throughout",
    title: "Senior partner presence.",
    body: "The senior who scoped is the senior who delivers. No handoffs. Partner attends every working session.",
  },
];

export default function MultiFrameworkPage() {
  return (
    <>
      <InnerHero
        kicker="Tier I · Sprint"
        title="One program. Every framework. Six to eight weeks."
        subtitle="SOC2, ISO 27001, DPDP, HIPAA, ISO 42001, PCI, MAS TRM, NIS2 alignment. Whichever combination your business actually faces. One evidence layer. One delivery cycle. One senior partner."
      />

      {/* Block 1 already lives in InnerHero. */}

      <SprintBlock
        number="02"
        label="The problem"
        heading="One business. Four frameworks."
        headingDim="Three half-finished compliance programs."
      >
        <SprintProse>
          You sell to US enterprise. They want SOC2 Type II. You sell to EU
          enterprise. They want ISO 27001 alongside SOC2. They are now asking
          about NIS2 alignment.
        </SprintProse>
        <SprintProse>
          You process Indian customer data. DPDP enforcement is here. Penalties
          reach ₹250 crore.
        </SprintProse>
        <SprintProse>
          If you are AI-native, your customers are also asking about ISO 42001
          and AI training data residency. If you are in healthtech, HIPAA
          enters the conversation. If you handle payments, PCI does. If your
          customer is MAS-licensed, MAS TRM and Notice 658 come up in their
          vendor onboarding.
        </SprintProse>
        <SprintProse>
          The traditional industry response is to run each framework as a
          separate project. Different consultants. Different timelines.
          Different evidence collection. Different audit firms. Different
          price tags. Most companies end up with three half-finished
          compliance programs and one passed audit.
        </SprintProse>
        <SprintProse>
          Birchlogic was built around the opposite thesis. Evidence is
          collected once. Mapped across every regime that applies to your
          business. One program. One senior partner. One delivery cycle. One
          trust narrative for the customers asking.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="03"
        label="Why our approach matters"
        heading="The harder thing to build."
        headingDim="The cheaper thing to operate."
      >
        <SprintProse>
          A SOC2 Type II audit and an ISO 27001 audit have something like 70
          percent control overlap. A DPDP Act readiness program and a GDPR
          program share most of the privacy operational requirements. An ISO
          42001 AIMS shares ISMS scaffolding with ISO 27001. A MAS TRM program
          reuses identity, vendor risk, and incident response controls that
          any of the above already covered.
        </SprintProse>
        <SprintProse>
          Running these as separate projects means re-collecting the same
          evidence three times, paying three sets of consultants to interpret
          the same regulations differently, and producing three audit-ready
          packages that diverge over time as your business changes.
        </SprintProse>
        <SprintProse>
          Running them as one multi-framework program means the evidence layer
          is unified, the policy authoring is unified, the audit narratives
          are unified, and your security team stops spending half its
          operational capacity on compliance theatre.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="04"
        label="What you get"
        heading="Six to eight weeks."
        headingDim="One unified evidence layer."
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
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(140px, 200px) minmax(260px, 1fr)",
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
                    maxWidth: 640,
                  }}
                >
                  {phase.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SprintBlock>

      <SprintBlock
        number="05"
        label="What you keep after"
        heading="A unified evidence layer that survives."
        headingDim="Every framework you add over the next five years."
        inverted
      >
        <SprintProse inverted>
          When a new regulation arrives (and a new one will), you map the
          union, not the union plus the previous unions. Your team's
          compliance overhead drops by 50 to 70 percent against the
          multi-project alternative.
        </SprintProse>
        <SprintProse inverted>
          A trust narrative your sales team can sell with. Your customers do
          not ask &ldquo;do you have SOC2.&rdquo; They ask &ldquo;are you
          secure.&rdquo; A multi-framework compliance program is the most
          credible answer to that question.
        </SprintProse>
        <SprintProse inverted>
          An audit-ready position you can maintain through continuous controls
          monitoring, not annual sprints. Your team stops dreading audit
          season.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="06"
        label="Who this is built for"
        heading="Companies whose customers sit across multiple jurisdictions."
      >
        <SprintProse>
          B2B SaaS founders selling to US, EU, and India simultaneously.
          Fintechs serving regulated banks across two or more countries.
          Healthtech companies handling US, EU, and India patient data.
          AI-native startups whose customer questionnaires now span four
          frameworks per quarter.
        </SprintProse>
        <SprintProse>
          The buyer is the CTO, the Head of Engineering, or the CFO. The
          trigger is usually one specific customer or regulator asking for one
          specific framework, and the realization that the next three
          customers will ask for three more frameworks.
        </SprintProse>
        <SprintProse>
          If you are running one compliance project per quarter and falling
          further behind, this is what we built for you.
        </SprintProse>
      </SprintBlock>

      <SprintBlock
        number="07"
        label="What this is not"
        heading="Three things this is not."
      >
        <SprintProse>
          This is not a tooling project. We work with Vanta, Drata, Sprinto,
          Secureframe, and Scrut as partners. The platform layer matters and
          we have opinions about which to use, but it is not the program.
        </SprintProse>
        <SprintProse>
          This is not a one-time audit. Audits are an output of the program,
          not the program itself.
        </SprintProse>
        <SprintProse>
          This is not a compliance checkbox. If you want a SOC2 report so you
          can close one US deal and never think about security again, hire
          someone else. There are firms in the market for that. We are not
          one of them.
        </SprintProse>
      </SprintBlock>

      <ClosingCTASection />
    </>
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
            maxWidth: 1080,
          }}
        >
          <SplitText text="Talk to us first." perChar={0.014} />
          <br />
          <SplitText
            text="Then talk to anyone else."
            perChar={0.014}
            delay={0.28}
            dim
          />
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.25vw, 18px)",
            color: "var(--bl-fg2)",
            lineHeight: 1.65,
            maxWidth: 720,
            margin: "0 auto 48px",
          }}
        >
          The first 20 minutes are us understanding which frameworks actually
          apply to your business in the next 12 months. The last 10 minutes
          are us telling you which combination we would deliver in six to
          eight weeks, and how the unified evidence layer changes everything
          downstream.
        </p>
        <Rise delay={0.2}>
          <div style={{ display: "inline-flex", justifyContent: "center" }}>
            <MagButton href="/contact">
              Book a 30-minute discovery call
            </MagButton>
          </div>
        </Rise>
        <p
          style={{
            marginTop: 28,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--bl-fg3)",
          }}
        >
          If you are running one compliance project at a time, this
          conversation will save you 18 months.
        </p>
      </div>
    </section>
  );
}
