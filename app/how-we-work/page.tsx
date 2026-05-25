import { InnerHero } from "../components/primitives/InnerHero";
import { MagButton } from "../components/primitives/MagButton";
import { Rise } from "../components/primitives/Rise";
import { SplitText } from "../components/primitives/SplitText";
import { StickyPrinciples } from "../components/how-we-work/StickyPrinciples";
import { EngagementCycle } from "../components/how-we-work/EngagementCycle";

export const metadata = {
  title: "How we work · Birchlogic",
  description:
    "Six principles that decide who we are. Read them before you book a call.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <InnerHero
        kicker="Method"
        title="How we work."
        subtitle="Six principles that decide who we are. Read them before you book a call. If they fit, we will probably work well together. If they do not, we will not."
      />
      <StickyPrinciples />
      <EngagementCycle />
      <ClosingCTASection />
    </>
  );
}

function ClosingCTASection() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding: "clamp(120px, 16vw, 200px) var(--bl-page-pad)",
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
            margin: "0 auto clamp(40px, 5vw, 64px)",
            maxWidth: 1080,
          }}
        >
          <SplitText
            text="If this works for you,"
            perChar={0.012}
          />
          <br />
          <SplitText
            text="we will probably work well together."
            perChar={0.012}
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
