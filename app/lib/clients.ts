/**
 * Canonical client list · single source of truth.
 *
 * Feeds the hero logo strip and, once `/start` ships, the ST-3 proof strip.
 * Nothing else should hard-code a client name or logo path.
 *
 * Logos are cropped from Karan's master sheet (`logos.png`) into
 * /public/clients. The sheet also settles the spelling question that was
 * open in Phase 6.2: it is "Saarthee" and "Batra Numerro Private Limited",
 * not "Saarthe.ai" / "The Batraa Numerology".
 *
 * LANES.
 * `kind` still records which of these are engagements of the firm and which
 * are founder-credential institutions from Karan's prior roles, because the
 * distinction matters wherever we make a claim about clientship.
 *
 * The hero strip no longer makes that claim. It is headed "Selected clients
 * and credentials", which is true of both lanes and names each of them, so
 * both render there. Anywhere that says "client", filter on kind === "firm".
 */

export type Client = {
  name: string;
  /** Path under /public. */
  logo: string;
  /**
   * "firm"    — a client of Birchlogic. Safe for the client strip.
   * "founder" — a founder-credential engagement from a prior role. NOT a
   *             firm client; belongs on /about, never in the strip.
   */
  kind: "firm" | "founder";
  /** False until Karan has explicitly confirmed we may name them. */
  permissioned: boolean;
};

export const CLIENTS: Client[] = [
  { name: "AMCS Group", logo: "/clients/amcs.png", kind: "firm", permissioned: true },
  { name: "K&S Partners", logo: "/clients/ks-partners.png", kind: "firm", permissioned: true },
  { name: "MBS Global", logo: "/clients/mbs-global.png", kind: "firm", permissioned: true },
  { name: "Batra Numerro", logo: "/clients/batra-numerro.png", kind: "firm", permissioned: true },
  { name: "Saarthee", logo: "/clients/saarthee.png", kind: "firm", permissioned: true },
  { name: "Fusionedge", logo: "/clients/fusionedge.png", kind: "firm", permissioned: true },
  { name: "Nexwave", logo: "/clients/nexwave.png", kind: "firm", permissioned: true },
  { name: "M Intergraph Systems", logo: "/clients/m-intergraph.png", kind: "firm", permissioned: true },
  { name: "Nest Money", logo: "/clients/nest-money.png", kind: "firm", permissioned: true },
  { name: "Coforge", logo: "/clients/coforge.png", kind: "firm", permissioned: true },
  { name: "FigBytes", logo: "/clients/figbytes.png", kind: "firm", permissioned: true },
  { name: "Xammer", logo: "/clients/xammer.png", kind: "firm", permissioned: true },
  { name: "Watermelon Software", logo: "/clients/watermelon-software.png", kind: "firm", permissioned: true },
  { name: "Waterloo Intuition", logo: "/clients/waterloo-intuition.png", kind: "firm", permissioned: true },
  { name: "LambdaVision", logo: "/clients/lambdavision.png", kind: "firm", permissioned: true },

  // ── founder-credential · deliberately OUT of the client strip ──────────
  { name: "BMO", logo: "/clients/bmo.png", kind: "founder", permissioned: true },
  {
    name: "Government of the Netherlands",
    logo: "/clients/government-of-the-netherlands.png",
    kind: "founder",
    permissioned: true,
  },
  {
    name: "Ministry of Defence",
    logo: "/clients/ministry-of-defence.png",
    kind: "founder",
    permissioned: true,
  },
  {
    name: "Department of Defence Production",
    logo: "/clients/defence-production.png",
    kind: "founder",
    permissioned: true,
  },
];

/**
 * What the hero strip renders: every permissioned company, both lanes,
 * under the "companies that trust our work" heading.
 */
export const NAMED_CLIENTS = CLIENTS.filter((c) => c.permissioned);

/** Firm clients only. Use this anywhere the copy says "client". */
export const FIRM_CLIENTS = CLIENTS.filter(
  (c) => c.kind === "firm" && c.permissioned,
);

/** Founder-credential marks, for the About page only. */
export const FOUNDER_CREDENTIALS = CLIENTS.filter(
  (c) => c.kind === "founder" && c.permissioned,
);

/** Published beneath any list of client names. Must stay true. */
export const PERMISSION_LINE =
  "Names listed with permission. Most engagements stay private.";
