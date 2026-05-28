import { InnerHero } from "../components/primitives/InnerHero";
import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { ContactInfoCard } from "../components/contact/ContactInfoCard";
import { ContactForm } from "../components/contact/ContactForm";
import { WhatToExpect } from "../components/contact/WhatToExpect";
import { WhatWeWontDo } from "../components/contact/WhatWeWontDo";
import { OfficesList } from "../components/contact/OfficesList";

export const metadata = {
  title: "Contact · Birchlogic",
  description:
    "Bring a specific blocker. We will tell you what we would do, in how many weeks.",
};

export default function ContactPage() {
  return (
    <>
      <InnerHero
        kicker="30 minutes · zero pitch deck"
        title="One conversation. Thirty minutes."
        subtitle="Bring a specific blocker. We will tell you what we would do, in how many weeks. The form below kicks the thread off and we will follow up to schedule."
      />

      <section
        style={{
          background: "var(--bl-ink)",
          color: "var(--bl-fg)",
          padding: "clamp(80px, 12vw, 140px) var(--bl-page-pad)",
        }}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <Anchor number="01" label="Start the thread" />
          <div
            className="bl-stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(280px, 0.85fr) minmax(320px, 1.4fr)",
              gap: "clamp(28px, 4vw, 56px)",
              alignItems: "stretch",
            }}
          >
            <Rise>
              <ContactInfoCard />
            </Rise>
            <Rise delay={0.08}>
              <ContactForm />
            </Rise>
          </div>
        </div>
      </section>

      <WhatToExpect />
      <WhatWeWontDo />
      <OfficesList />
    </>
  );
}
