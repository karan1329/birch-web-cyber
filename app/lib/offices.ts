/**
 * Office locations · single source for the footer, /contact and RS-8.
 *
 * GATED · Phase 6.1. The street addresses are written and correct per HP-7
 * and the S1–S8 address table, but they ship ONLY on Karan's approval. Flip
 * SHOW_STREET_ADDRESSES to true and every surface that renders an office
 * upgrades from the region line to the full address at once — no hunting
 * through components.
 */

export const SHOW_STREET_ADDRESSES = false;

export type Office = {
  city: string;
  /** Shown while the street address is gated. */
  region: string;
  /** HP-7 · ships on approval. */
  address: string;
};

export const OFFICES: Office[] = [
  {
    city: "Delhi",
    region: "Connaught Place, New Delhi",
    address: "5th Floor, Statesman House, Connaught Place, New Delhi 110001",
  },
  {
    city: "Singapore",
    region: "Scotts Road, Singapore",
    address: "1 Scotts Road, #24-10, Shaw Centre, Singapore 228208",
  },
];
