/**
 * FN-1 · The honest shelf.
 *
 * Five pieces, all being written now, all unlinked. Nothing on this page
 * pretends to be published: there are no hrefs here at all, because a fake
 * link is worse than an empty shelf.
 *
 * Karan can reorder or swap titles by editing this file — the page reads
 * the order verbatim and states that the order is the writing order.
 */

export type FieldNote = {
  title: string;
  dek: string;
  /** Shown on the card. Nothing here is published yet. */
  status: "In the works";
};

export const FIELD_NOTES: FieldNote[] = [
  {
    title: "SOC 2 for founders: the operating manual.",
    dek: "The piece we wish existed when we ran our first SOC 2. What controls auditors actually open on Day 1, which evidence packets matter, what enterprise customers ask for in the procurement cycle after the report lands.",
    status: "In the works",
  },
  {
    title: "The auditor opens seven documents on Day 1.",
    dek: "The order matters. Get the first three right and the audit hums; get them wrong and every subsequent control gets re-asked. The seven, ranked, with what each is actually being read for.",
    status: "In the works",
  },
  {
    title: "How to lose a board on cybersecurity in one meeting.",
    dek: "Four failure patterns we have watched up close. The CRQ-in-dollars-without-context deck. The NIST-IDs-on-screen deck. The two slides that quietly land instead.",
    status: "In the works",
  },
  {
    title: "DPDP Right Answers: what to actually do.",
    dek: "₹250 crore penalty exposure. Forty-seven pages of rules. Six pages of useful interpretation, the consent-pattern table we run with clients, and the three cross-border clauses that come up in every contract negotiation.",
    status: "In the works",
  },
  {
    title: "The SEBI CSCRF reading list.",
    dek: "Board cyber maturity attestation, audit-committee briefing, CRQ in rupees. The reference document we hand to every SEBI-regulated CISO we work with, annotated with the three questions a SEBI inspector opens with.",
    status: "In the works",
  },
];

/** The one line that sits above the cards. */
export const SHELF_INTRO =
  "These five are being written now, in this order. Nothing publishes here until it is worth your time, which is also why there are five and not thirty.";
