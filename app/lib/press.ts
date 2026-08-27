/**
 * Institutional press record. Used by the About page (AB-1 blocks 1 and 3)
 * and nowhere else.
 *
 * GATED · every item is specified to link to the live article, but the URLs
 * have not been supplied. They render as plain text until `href` is filled
 * in — the same rule the Field Notes shelf follows: no fake links anywhere
 * on the site. Add the URL and the line becomes a link automatically.
 */

export type PressItem = {
  claim: string;
  outlet: string;
  year: string;
  /** Fill in to turn the line into a link. Leave undefined to keep it text. */
  href?: string;
};

export const PRESS: PressItem[] = [
  {
    claim:
      "Founding partner, the world's first Sustainable AI Centre of Excellence",
    outlet: "The Indian Express",
    year: "2026",
  },
  {
    claim: "India's first Sustainable IT Centre of Excellence",
    outlet: "The Times of India",
    year: "2025",
  },
  {
    claim: "Speaker and exhibitor, India AI Summit",
    outlet: "India AI Summit",
    year: "2026",
  },
];
