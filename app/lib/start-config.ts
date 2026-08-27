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
 * GATED · 6.5. Both variants are written; the credit version is the default
 * pending Karan's credit-versus-guarantee call.
 */
export const READ_MECHANIC: "credit" | "guarantee" = "credit";

export const READ_MECHANIC_COPY: Record<"credit" | "guarantee", string> = {
  credit:
    "Your Security Read fee credits fully against the Security Office, so if we end up working together, starting was nearly free.",
  guarantee:
    "The Security Read is a fixed fee, and if the readout does not give you at least one decision you can act on, we refund it in full.",
};
