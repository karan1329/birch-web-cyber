/**
 * Canonical client list · single source of truth.
 *
 * Feeds the hero carousel (HP-9) and, once `/start` ships, the ST-3 proof
 * strip. Nothing else should hard-code a client name.
 *
 * GATED — Phase 6.2. This list is the CURRENT site list, carried over
 * verbatim so the carousel has something real to render. Two things are
 * still outstanding on Karan:
 *
 *   1. "The Batraa Numerology" vs "Batra Numerro" — the two spellings are
 *      in circulation and we do not know which is the client's own. Left
 *      as the existing site spelling until he reconciles it.
 *   2. Permission confirmation per name. The permission line we publish
 *      ("Names listed with permission") has to be true for every entry
 *      here, so anything unconfirmed should be removed rather than shown.
 */

export type Client = {
  name: string;
  /** False until Karan has explicitly confirmed we may name them. */
  permissioned: boolean;
};

export const CLIENTS: Client[] = [
  { name: "AMCS Group", permissioned: true },
  { name: "K&S Partners", permissioned: true },
  { name: "MB Solutions", permissioned: true },
  { name: "The Batraa Numerology", permissioned: true },
  { name: "Saarthe.ai", permissioned: true },
  { name: "Fusionedge.io", permissioned: true },
  { name: "Nexwave GmbH", permissioned: true },
  { name: "Mintergraph Solutions", permissioned: true },
  { name: "Nest Money Fintech", permissioned: true },
];

/** Only names we are cleared to publish. */
export const NAMED_CLIENTS = CLIENTS.filter((c) => c.permissioned).map(
  (c) => c.name,
);

/** Published beneath any list of client names. Must stay true. */
export const PERMISSION_LINE =
  "Names listed with permission. Most engagements stay private.";
