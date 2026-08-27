/**
 * The nine engagements · single source of truth.
 *
 * Adopted from the one-pager per website_overhaul_pack.md §4, replacing the
 * old fourteen-row capability inventory. The nine are situation-shaped —
 * they name the buyer's moment rather than the deliverable's category.
 *
 * Row one is The Security Read, which is the stated entry point to
 * everything else. Nothing from the old table was dropped: `absorbs`
 * records where each retired row went, so the mapping stays auditable.
 *
 * The three MAS sprints deliberately do NOT appear here — they live on
 * /singapore, which is their natural home.
 */

export type Engagement = {
  name: string;
  /** The situation it fixes, in the buyer's words. */
  fixes: string;
  /** Duration in weeks, as published. */
  weeks: string;
  /** Old site rows this engagement absorbed (audit trail, not rendered). */
  absorbs?: string[];
  /** Row one carries a marker in the table. */
  entryPoint?: boolean;
  /** Existing sprint landing page, where one is already built. */
  href?: string;
};

export const ENGAGEMENTS: Engagement[] = [
  {
    name: "The Security Read",
    fixes:
      "Someone important is about to read your security. We read it first, the way they will, and tell you what they will find.",
    weeks: "3",
    entryPoint: true,
  },
  {
    name: "Sales Deal Rescue",
    fixes:
      "Your deal is stuck in the customer's security review right now. We write the answers, join the calls, and unstick it.",
    weeks: "2 to 3",
    absorbs: ["TPRM Audit Rescue"],
  },
  {
    name: "Platform Rescue",
    fixes:
      "You bought Vanta, Drata or Sprinto and the audit is still stuck. The tool did its job; we do the part it cannot.",
    weeks: "2 to 4",
    absorbs: ["SOC 2 Type I in 2 Weeks"],
  },
  {
    name: "Regulatory Response",
    fixes:
      "An RBI order, a CSCRF deadline, a DPDP date, a MAS finding or a licence application. Evidence that survives the inspector.",
    weeks: "4 to 12",
    absorbs: ["SEBI CSCRF Attestation Sprint", "DPDP Act Readiness Sprint"],
  },
  {
    name: "Certification Programme",
    fixes:
      "SOC 2, ISO 27001, or both at once. Evidence collected once, certificate on the first pass.",
    weeks: "6 to 8",
    absorbs: ["Multi-Framework Compliance Program", "ISO 42001 Readiness"],
    href: "/services/multi-framework-compliance",
  },
  {
    name: "CERT-In empanelled VAPT",
    // Verbatim per the pack: this row exists to kill the contradiction with
    // the "what we do not sell" table, so the delivery model is stated in
    // the row itself rather than left implied.
    fixes:
      "The pentest report that banks, regulators, tenders and enterprise reviews actually accept. Delivered with our CERT-In empanelled testing partners, scoped and signed by our senior partner, so you get the empanelled report and one accountable name.",
    weeks: "2 to 4",
  },
  {
    name: "Breach Readiness",
    fixes:
      "The incident plan that exists only on paper, tested before it is needed: tabletop, runbook, and the DPDP and CERT-In notification clocks you would actually have to hit.",
    weeks: "3 to 4",
    absorbs: ["Post-Incident 30-Day Hardening"],
  },
  {
    name: "Evidence Automation & Trust Centre",
    fixes:
      "One-time build: evidence collects itself, your trust centre answers the questionnaires, and your engineers go back to shipping. A senior partner signs what the pipeline produces.",
    weeks: "3 to 6",
    absorbs: [
      "AI Security Questionnaire Response Engine",
      "NIS2 Vendor Questionnaire Engine",
    ],
    href: "/services/nis2-vendor-questionnaire",
  },
  {
    name: "AI Security & Governance",
    fixes:
      "Customers and regulators started asking AI questions your SOC 2 was never built to answer, from system assessment to the board AI policy FREE-AI expects.",
    weeks: "4 to 6",
    absorbs: ["AI Security Posture Sprint"],
    href: "/services/iso-42001-readiness",
  },
];

/**
 * Held back from the nine deliberately. The pack leaves both of these as
 * open calls ("fold into Security Office scope or keep as sprint 10" /
 * "keep as a quiet tenth row or move to a PE/DD note"), so rather than
 * silently dropping them they are listed under the table as available work.
 */
export const ALSO_AVAILABLE = [
  "Cloud Security Architecture Review",
  "M&A Cyber Due Diligence Express",
];

/** ST-4 · the line every engagement row ends on. */
export const ENGAGEMENT_CLOSER =
  "Every Security Read ends in a working session with your team rather than a PDF, and if the plan is something your own people can execute without us, we will say so in the room.";
