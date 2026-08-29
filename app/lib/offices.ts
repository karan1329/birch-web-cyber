/**
 * Office locations · single source for the footer, /contact and RS-8.
 *
 * Phase 6.1 is CLOSED. Karan approved the street addresses on 2026-08-27 and
 * supplied them in `Cyber-one-pagers.pdf`, whose footer carries both
 * verbatim; they match the HP-7 / S1-S8 table exactly. Every surface that
 * renders an office now shows the full address.
 */

export const SHOW_STREET_ADDRESSES = true;

export type Office = {
  city: string;
  /** Shown while the street address is gated. */
  region: string;
  /** HP-7 · approved, live. */
  address: string;
  /** Optional internal route for cities that have their own page. */
  href?: string;
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
    href: "/singapore",
  },
];
