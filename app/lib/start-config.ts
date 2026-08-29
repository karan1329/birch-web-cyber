/**
 * /start configuration.
 *
 * Every gated decision on the founding-offer page lives here so nothing is
 * hard-coded into the markup and Karan can flip any of it in one file.
 */

/**
 * ST-5a vs ST-5b · which price block ships.
 *
 * ST-REV makes ST-5a (the published founding rate) the shipping default per
 * Karan's decision. ST-5b stays in the codebase as the fallback; set this to
 * "no-price" to switch without touching the page.
 */
export const PRICE_BLOCK: "founding-rate" | "no-price" = "founding-rate";

/**
 * ST-5a · the founding counter.
 *
 * GATED · 6.x. This MUST be the true number. The content pack is explicit:
 * "The counter shows the true number or the block does not ship." Nothing
 * derives or estimates this — it is read straight from here, and if it is
 * null the counter line is omitted rather than guessed.
 */
export const FOUNDING_PLACES_TOTAL = 10;
export const FOUNDING_PLACES_TAKEN: number | null = null;

/** Published rates, in rupees per month. */
export const FOUNDING_RATE = "₹80,000";
export const FULL_RATE = "₹1,25,000";

/**
 * ST-5c · the Read mechanic.
 *
 * Gate 6.5 is CLOSED, resolved to "guarantee" by the research in
 * `security_read_page_v2_and_funnel_playbook.md` Part 1, finding 1: nobody
 * in the category runs a fee credit, Enns argues against it explicitly, and
 * a full credit reframes the Read as a deposit rather than a purchase, which
 * is the thing that makes paid diagnostics convert. The guarantee carries
 * the same risk reversal at almost no cost.
 *
 * Set this back to "credit" to revert; both variants stay written.
 */
export const READ_MECHANIC: "credit" | "guarantee" = "guarantee";

export const READ_MECHANIC_COPY: Record<"credit" | "guarantee", string> = {
  credit:
    "Your Security Read fee credits fully against the Security Office, so if we end up working together, starting was nearly free.",
  guarantee:
    "The Security Read is a fixed fee, and if the readout does not give you at least one decision you can act on, we refund it in full.",
};

/* ─────────────────────────────────────────────────────────────────────
   The Security Read · /security-read
   Prices per `security_read_page_v2_and_funnel_playbook.md`. The Read is
   priced at the diagnostic-to-retainer ratio the same file settles at
   5-15% of the follow-on, and the capacity line is the scarcity device
   that replaces a countdown timer or an application gate.
   ───────────────────────────────────────────────────────────────────── */

export const READ_FEE = "\u20B91,25,000";
export const READS_PER_QUARTER = 4;

/** What comes after the Read: the Security Office retainer. */
export const OFFICE_RATE_INDIA = "\u20B91,00,000";
export const OFFICE_RATE_SINGAPORE = "SGD 4,500";
