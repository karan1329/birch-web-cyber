import { InnerHero } from "../components/primitives/InnerHero";
import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { CategoryPills } from "../components/blog/CategoryPills";
import {
  FeaturedPostCard,
  RecentPostRow,
  type Post,
} from "../components/blog/PostCard";

export const metadata = {
  title: "Blog · Birchlogic",
  description:
    "Field notes on serious cybersecurity. Long-form pieces, technical reference material, and the occasional rant.",
};

const FEATURED: Post[] = [
  {
    title: "SOC2 for founders: the operating manual.",
    summary:
      "The piece we wish existed when we ran our first SOC2. What controls actually matter, what auditors actually want, what enterprise customers actually ask for after the report lands.",
    readTime: "25 min read",
    category: "Compliance",
  },
  {
    title: "DPDP Right Answers: what to actually do.",
    summary:
      "₹250 crore penalty exposure. 47 pages of rules. Six pages of useful interpretation. We have the six pages.",
    readTime: "18 min read",
    category: "Privacy",
  },
  {
    title: "The SEBI CSCRF Reading List.",
    summary:
      "Board cyber maturity attestation, audit committee briefing, CRQ in rupees. The reference document we hand to every SEBI CISO we work with.",
    readTime: "22 min read",
    category: "Regulator",
  },
];

const RECENT: Post[] = [
  {
    title: "MAS TRM for India-HQ fintechs entering Singapore.",
    summary:
      "Cross-border bridge content for fintechs expanding to SG. The MAS-specific framing that most advisors rarely teach.",
    readTime: "20 min read",
  },
  {
    title: "AI security questionnaires US enterprises actually ask.",
    summary:
      "We have answered hundreds. Here are the patterns. NIST AI RMF, OWASP LLM Top 10, ISO 42001 in the same procurement cycle.",
    readTime: "18 min read",
  },
  {
    title: "Cryptographic Right Answers: what to use in 2026.",
    summary:
      "Post-quantum has arrived. Most production stacks have not noticed.",
    readTime: "35 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <InnerHero
        kicker="Field notes"
        title="Field notes on serious cybersecurity."
        subtitle="Long-form pieces, technical reference material, and the occasional rant. Written by Karan and the team."
      />

      <section
        style={{
          background: "var(--bl-ink)",
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
          background: "var(--bl-ink)",
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
          background: "var(--bl-ink)",
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
          background: "var(--bl-ink)",
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
