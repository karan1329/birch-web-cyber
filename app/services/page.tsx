import { InnerHero } from "../components/primitives/InnerHero";
import { MagButton } from "../components/primitives/MagButton";
import { Rise } from "../components/primitives/Rise";
import { SplitText } from "../components/primitives/SplitText";
import { PracticesGrid } from "../components/services/PracticesGrid";
import { CRQProof } from "../components/services/CRQProof";
import { CommercialTiers } from "../components/services/CommercialTiers";
import { SprintsTable } from "../components/services/SprintsTable";
import {
  SubTierComparison,
  type SubTier,
} from "../components/services/SubTierComparison";
import { NotForSale } from "../components/services/NotForSale";

export const metadata = {
  title: "Services · Birchlogic",
  description:
    "Five practices. Three commercial shapes. Quick sprints, vCISO, and Fractional Security Office. Senior-led on every one.",
};

const VCISO_TIERS: [SubTier, SubTier, SubTier] = [
  {
    label: "Light",
    body: "Quarterly board pack, monthly steering, audit support, on-call Slack hours.",
    fit: "Series A SaaS post-SOC2 with US or EU enterprise pipeline.",
  },
  {
    label: "Standard",
    body: "Light plus ongoing program management, vendor risk, AI governance reviews, custom policy authoring, Trust Center maintenance.",
    fit: "Series B SaaS and mid-size fintechs.",
  },
  {
    label: "Regulated",
    body: "Standard plus regulator response, monthly board pack, audit committee briefings, custom policy aligned to RBI, SEBI, or MAS, supervisor letter response.",
    fit: "RBI-regulated fintechs, SEBI mid-caps, MAS-licensed entities.",
  },
];

const FSO_TIERS: [SubTier, SubTier, SubTier] = [
  {
    label: "Core",
    body: "Partner plus one senior plus 0.5 junior FTE-equivalent dedicated.",
    fit: "Series B-plus B2B SaaS and mid-size fintechs.",
  },
  {
    label: "Plus",
    body: "Partner plus two senior plus one junior FTE-equivalent dedicated.",
    fit: "SEBI mid-caps and fintechs with regulator attention.",
  },
  {
    label: "Premium",
    body: "Partner plus two senior plus two junior plus on-call IR readiness, dedicated.",
    fit: "Tier-2 and Tier-3 banks, payment institutions, MAS-licensed mid-size, post-breach embedded.",
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
      <CRQProof />
      <CommercialTiers />
      <SprintsTable />
      <SubTierComparison
        anchorNumber="05"
        anchorLabel="vCISO retainer"
        id="vciso"
        heading="vCISO retainer."
        subhead="Three intensities."
        intro="A full-time CISO hire is six months and a board approval away. A vCISO retainer gives you the function in two weeks, with cross-industry pattern recognition that a first-time CISO has not yet built. Month-to-month commercial. Most engagements run multi-year because the program compounds and the partner who closed the engagement runs every quarterly review."
        tiers={VCISO_TIERS}
        closingNote="We are month-to-month. We have no minimum commitment. Most of our clients stay multi-year because the partner who closed the engagement runs every quarterly review."
      />
      <SubTierComparison
        anchorNumber="06"
        anchorLabel="Fractional Security Office"
        id="fso"
        heading="Fractional Security Office."
        subhead="A complete security function."
        intro="vCISO retainers are advisory. Fractional Security Office is execution. The buyer here is not looking for an advisor; they are looking for the entire security function as an outsourced capability. Birchlogic owns the program. Runs the team. Reports to the board."
        tiers={FSO_TIERS}
        closingNote="Our model is single-tenant. We can hand the capability back to you when you are ready to bring it in-house. We are not designed to be sticky. We are designed to be necessary while we are there."
      />
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
          <SplitText text="Pricing is on the call," perChar={0.012} />
          <br />
          <SplitText
            text="not on the website."
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
