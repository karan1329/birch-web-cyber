import fs from "node:fs";
import path from "node:path";

/**
 * RS-4rev · the research library.
 *
 * Four entries at launch. Two are real and carry the abstracts written in
 * RS-4. Two ship as visibly reserved slots — NOT as invented titles. The
 * reserved copy says so in plain language, because a fabricated research
 * title on a page whose entire argument is falsifiability would be the
 * single most damaging thing on the site.
 *
 * GATED · 6.4. Fill `title`/`abstract` on a reserved entry and set
 * `reserved: false` to publish it.
 */

export type LibraryEntry =
  | {
      reserved: false;
      /** Sort key for the A–Z rail. */
      letter: string;
      title: string;
      abstract: string;
      status: string;
    }
  | { reserved: true };

export const LIBRARY: LibraryEntry[] = [
  {
    reserved: false,
    letter: "D",
    title: "Does safety survive compression?",
    abstract:
      "Every regulated deployment quantises its models to fit real hardware, and almost nobody has measured what that does to the safety behaviours the full-precision model was aligned with. We extracted a refusal direction once at full precision and applied it unchanged across int8 and NF4 arms, and the finding so far is uncomfortable in an interesting way: the geometry drifts under NF4 harder than int8, and the behaviour transfers anyway.",
    status:
      "Paper in preparation, independently reverified inside the lab before anything ships.",
  },
  {
    reserved: false,
    letter: "O",
    title: "What does an on-premises security model actually cost?",
    abstract:
      "The sovereign-deployment story is sold hard and measured badly, including, at first, by us. Our own first measurement pass failed our own review, so the work is being re-run under the provenance protocol, and we would rather publish late and right than early and wrong.",
    status: "Re-running. No numbers until it clears.",
  },
  { reserved: true },
  { reserved: true },
];

/** Shown in place of the two reserved slots. */
export const RESERVED_LINE =
  "Two further programmes are being scoped now, and they will appear here when they are real.";

/** RS-5, compressed into the library introduction. */
export const STANDARD_INTRO =
  "Everything in this library clears a twenty-five point standard before it ships, from statistical power to hand-checked citations, and every finding carries an evidence class so you can see what it rests on. We publish the standard itself, and we would frankly enjoy being held to it.";

/**
 * The Research Standard PDF renders as a link ONLY if the artefact actually
 * exists in /public at build time. The page argues for falsifiability; a
 * 404 behind "we publish the standard itself" would undo it.
 */
export const RESEARCH_STANDARD_PATH = "/birchlogic-research-standard-v1.pdf";

export function researchStandardExists(): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", RESEARCH_STANDARD_PATH.slice(1)),
    );
  } catch {
    return false;
  }
}

/**
 * RS-7 · GATED 6.6. The product is called "the memory layer" until Karan
 * christens it. Candidates on the table: Marrow, Firmself, Provenance.
 */
export const MEMORY_LAYER_NAME = "the memory layer";
export const WAITLIST_TAG = "memory-layer-waitlist";
