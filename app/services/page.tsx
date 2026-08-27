import { InnerHero } from "../components/primitives/InnerHero";
import { MagButton } from "../components/primitives/MagButton";
import { Rise } from "../components/primitives/Rise";
import { SplitText } from "../components/primitives/SplitText";
import { PracticesGrid } from "../components/services/PracticesGrid";
import { CommercialTiers } from "../components/services/CommercialTiers";
import { SprintsTable } from "../components/services/SprintsTable";
import {
  SubTierComparison,
  type SubTier,
} from "../components/services/SubTierComparison";
import { FractionalSecurityOffice } from "../components/services/FractionalSecurityOffice";
import { NotForSale } from "../components/services/NotForSale";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Five practices. Three commercial shapes. Quick sprints, vCISO retainer, and Fractional Security Office. Senior-led on every one.",
  path: "/services",
});

// SV-3 · Solo / +Engineer / Regulated replace Light / Standard / Regulated.
// The CRQ line inside "Regulated" is where the retired standalone CRQ block
// (SV-2) now lives on this page.
const VCISO_TIERS: [SubTier, SubTier, SubTier] = [
  {
    label: "Solo vCISO",
    body: "A named senior practitioner who represents your security: in front of your customers' security reviews, your auditors, your investors and your board.",
    fit: "Firms whose engineering can execute and who need seniority, representation and a programme owner rather than extra hands.",
  },
  {
    label: "vCISO + Engineer",
    body: "The same named practitioner, plus a forward-deployed engineer for the work that has to actually get built: the evidence pipeline, the cloud hardening, the control implementation, the findings that need closing rather than documenting.",
    fit: "Firms where the gap is in the doing.",
  },
  {
    label: "vCISO Regulated",
    body: "The senior-most configuration, for RBI, SEBI, IRDAI and MAS-regulated environments: regulator response and representation, audit committee briefings, supervisor letters answered, and board reporting that puts a number on exposure. Boards see cyber risk in dollars: a quantified exposure model, delivered in 45 days, is part of every Regulated engagement.",
    fit: "RBI-regulated fintechs, SEBI mid-caps, IRDAI insurers and MAS-licensed entities.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <InnerHero
        kicker="Services"
        title="We build security programs."
        subtitle="Three commercial shapes. Senior-led on every one. The partner who scoped the engagement runs every quarterly review."
      />
      <PracticesGrid />
      <CommercialTiers />
      <SprintsTable />
      <SubTierComparison
        anchorNumber="05"
        anchorLabel="vCISO retainer"
        id="vciso"
        heading="vCISO retainer."
        subhead="Three ways to run it."
        intro="A full-time CISO hire is six months and a board approval away. A vCISO retainer gives you the function in two weeks, with cross-industry pattern recognition that a first-time CISO has not yet built. Month-to-month commercial. Most engagements run multi-year because the program compounds and the partner who closed the engagement runs every quarterly review."
        tiers={VCISO_TIERS}
        closingNote="Month-to-month, thirty days\u2019 notice. Most engagements begin with the Security Read."
      />
      <FractionalSecurityOffice />
      <NotForSale />
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
            fontSize: "clamp(36px, 6vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            margin: "0 auto clamp(40px, 5vw, 64px)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          {/* Was "Pricing is on the call, not on the website." /start now
              publishes the founding rate (ST-5a), which made that line false
              on our own site. The pack's graceful version keeps the spirit
              (no day rates, no surprise invoices) without the contradiction. */}
          <SplitText text="Sprint pricing is on the call." perChar={0.012} />
          <br />
          <SplitText
            text="The Security Office starts at ₹80,000 a month for founding clients."
            perChar={0.012}
            delay={0.26}
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
