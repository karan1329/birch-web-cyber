import { InnerHero } from "../components/primitives/InnerHero";
import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { CategoryPills } from "../components/field-notes/CategoryPills";
import {
  FeaturedPostCard,
  RecentPostRow,
  type Post,
} from "../components/field-notes/PostCard";

export const metadata = {
  title: "Field notes · Birchlogic",
  description:
    "Practical, second-hand cybersecurity knowledge from real engagements. Long-form pieces, technical reference, and the occasional rant.",
};

/**
 * Field notes are deliberately practitioner-grade. Each post is drawn from a
 * real engagement (SOC 2 audit, regulator letter, vCISO retainer review,
 * pentest reread) and written so a CISO, founder, or audit lead can act on it
 * in the same week they read it. No vendor-buzzword filler.
 */
const FEATURED: Post[] = [
  {
    title: "SOC 2 for founders: the operating manual.",
    summary:
      "The piece we wish existed when we ran our first SOC 2. What controls auditors actually open on Day 1, which evidence packets matter, what enterprise customers ask for in the procurement cycle after the report lands.",
    readTime: "25 min read",
    category: "Compliance",
  },
  {
    title: "The auditor opens seven documents on Day 1.",
    summary:
      "The order matters. Get the first three right and the audit hums; get them wrong and every subsequent control gets re-asked. The seven, ranked, with what each is actually being read for.",
    readTime: "12 min read",
    category: "Compliance",
  },
  {
    title: "How to lose a board on cybersecurity in one meeting.",
    summary:
      "Four failure patterns we have watched up close. The CRQ-in-dollars-without-context deck. The NIST-IDs-on-screen deck. The two slides that quietly land instead.",
    readTime: "10 min read",
    category: "Sales Enablement",
  },
  {
    title: "DPDP Right Answers: what to actually do.",
    summary:
      "₹250 crore penalty exposure. Forty-seven pages of rules. Six pages of useful interpretation, the consent-pattern table we run with clients, and the three cross-border clauses that come up in every contract negotiation.",
    readTime: "18 min read",
    category: "Privacy",
  },
  {
    title: "The SEBI CSCRF reading list.",
    summary:
      "Board cyber maturity attestation, audit-committee briefing, CRQ in rupees. The reference document we hand to every SEBI-regulated CISO we work with, annotated with the three questions a SEBI inspector opens with.",
    readTime: "22 min read",
    category: "Regulator",
  },
];

const RECENT: Post[] = [
  {
    title: "Thirty days before your first SOC 2 audit.",
    summary:
      "A week-by-week prep schedule from an audit we ran last quarter. What moves a control from 'exception' to 'qualified' to 'unqualified' and the Wednesday checkpoint that decides it.",
    readTime: "16 min read",
  },
  {
    title: "vCISO retainer red flags.",
    summary:
      "When the retainer is just billable hours dressed up. The four signals you are buying time, not a program, and the contract clauses that flip it back.",
    readTime: "12 min read",
  },
  {
    title: "The vendor-questionnaire trap.",
    summary:
      "How to answer a 200-row security questionnaire from a US enterprise without overcommitting. The four-sentence framing pattern we use on every one and the three rows that sink you if you misread them.",
    readTime: "15 min read",
  },
  {
    title: "Pentest findings that aren't.",
    summary:
      "CVSS inflation, marketing-driven scoring, and the four common 'criticals' that quietly disappear when you ask the next question. Read the report, do not just count the colours.",
    readTime: "14 min read",
  },
  {
    title: "MAS TRM for India-HQ fintechs entering Singapore.",
    summary:
      "Cross-border bridge content for fintechs expanding to SG. The MAS-specific framing that most India-HQ advisors do not teach, and the three Annexes that decide whether you sail through or get sent back for a second review.",
    readTime: "20 min read",
  },
  {
    title: "AI security questionnaires US enterprises actually ask.",
    summary:
      "We have answered hundreds. The patterns. NIST AI RMF, OWASP LLM Top 10, and ISO 42001 inside the same procurement cycle, with the four answers that almost always need a follow-up call before they unblock the deal.",
    readTime: "18 min read",
  },
  {
    title: "Cryptographic Right Answers: what to use in 2026.",
    summary:
      "Post-quantum has arrived; most production stacks have not noticed. A short, opinionated table you can hand to engineering tomorrow.",
    readTime: "35 min read",
  },
];

export default function FieldNotesPage() {
  return (
    <>
      <InnerHero
        kicker="Field notes"
        title="Field notes on serious cybersecurity."
        subtitle="Practical, second-hand knowledge from real engagements. Written by Karan and the team."
      />

      <section
        style={{
          background: "var(--bl-section-veil)",
          color: "var(--bl-fg)",
          padding: "clamp(60px, 8vw, 100px) var(--bl-page-pad) 0",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <Rise>
            <CategoryPills />
          </Rise>
        </div>
      </section>

      <section
        style={{
          background: "var(--bl-section-veil)",
          color: "var(--bl-fg)",
          padding: "clamp(60px, 8vw, 100px) var(--bl-page-pad)",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <Anchor number="01" label="Featured" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {FEATURED.map((p, i) => (
              <Rise key={i} delay={i * 0.06}>
                <FeaturedPostCard post={p} />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--bl-section-veil)",
          color: "var(--bl-fg)",
          padding: "clamp(60px, 8vw, 100px) var(--bl-page-pad)",
          borderTop: "1px solid var(--bl-rule)",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <Anchor number="02" label="Recent" />
          <div style={{ borderTop: "1px solid var(--bl-rule)" }}>
            {RECENT.map((p, i) => (
              <Rise key={i} delay={i * 0.04}>
                <RecentPostRow post={p} />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--bl-section-veil)",
          color: "var(--bl-fg)",
          padding: "clamp(100px, 12vw, 160px) var(--bl-page-pad)",
          borderTop: "1px solid var(--bl-rule)",
          textAlign: "center",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(18px, 1.8vw, 26px)",
              lineHeight: 1.4,
              letterSpacing: "-0.015em",
              color: "var(--bl-fg)",
              maxWidth: 720,
              margin: "0 auto 14px",
            }}
          >
            We publish field notes, not marketing content.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              color: "var(--bl-fg2)",
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            If we have an opinion that is not load-bearing, we do not publish
            it.
          </p>
        </div>
      </section>
    </>
  );
}
