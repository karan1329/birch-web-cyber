/**
 * Single source of truth for the three open roles and their per-role
 * application question packs. Imported by:
 *   - app/careers/page.tsx (renders the role cards)
 *   - app/components/careers/RoleCard.tsx (consumer of the Role type)
 *   - app/components/careers/ApplyForm.tsx (renders questions per role)
 *   - app/actions/contact.ts (validates the submitted role + serializes
 *     answers into the email body)
 *
 * Each role gets four thoughtful, role-specific questions. The shape is
 * deliberately small (id + label + placeholder + required) so the form
 * stays readable as prose rather than a multi-step questionnaire.
 */

export type Role = {
  slug: RoleSlug;
  title: string;
  location: string;
  summary: string;
  requirements: string[];
};

export type RoleSlug =
  | "director-client-origination"
  | "senior-security-consultant"
  | "practice-development-associate"
  | "ai-researcher";

export type ApplyQuestion = {
  id: "q1" | "q2" | "q3" | "q4";
  label: string;
  placeholder: string;
  required?: boolean;
};

export const ROLES: Role[] = [
  {
    slug: "director-client-origination",
    title: "Director, Client Origination",
    location: "India or Singapore",
    summary:
      "Own the relationship from the first conversation through SOW. Run discovery calls, write proposals, and sit at the table when the engagement scopes. Partner-accountable from day one.",
    requirements: [
      "Eight to fifteen years of services origination experience at a Big-4 advisory, a top-tier specialist boutique, or a partner-led services firm.",
      "Personally closed engagements in the $50K to $500K band with CTOs, CISOs and CFOs as the primary buyers.",
      "Fluent on SOC2, ISO 27001, NIST CSF, FAIR, and vCISO retainers, useful in the discovery call and not just in the proposal.",
      "Comfortable being measured on closed engagements and retention rather than on call counts.",
    ],
  },
  {
    slug: "senior-security-consultant",
    title: "Senior Security Consultant",
    location: "India",
    summary:
      "Lead vCISO retainer engagements end-to-end. Sit with executive teams, write the quarterly board pack, hold the regulator response, and stay accountable from kickoff through the third board cycle.",
    requirements: [
      "Eight to twelve years of practice. CISA, CISM, CISSP, or equivalent.",
      "Operating depth across at least two of SOC2, ISO 27001, RBI Master Directions, SEBI CSCRF, MAS TRM, NIS2, EU AI Act.",
      "Comfortable presenting to audit committees and writing for boards in financial language.",
      "Track record of being the senior in the room when something goes wrong.",
    ],
  },
  {
    slug: "practice-development-associate",
    title: "Practice Development Associate",
    location: "India · Singapore",
    summary:
      "Run targeted outbound into growth-stage and regulated mid-cap accounts across India and Singapore. Open the door, qualify the moment, hand the engagement to the partner who will own it.",
    requirements: [
      "Three to seven years of B2B outbound or business development, ideally inside a services or specialist-firm motion rather than a high-volume SaaS one.",
      "You understand the buyer well enough to start a conversation that does not feel templated. A CISO can spot a script.",
      "Comfort working across IST and SGT, with the discipline to research before reaching out.",
      "Bonus: prior exposure to cybersecurity, compliance, fintech, or regulated-industry buying motions.",
    ],
  },  {
    slug: "ai-researcher",
    title: "AI Researcher",
    location: "India or remote",
    summary:
      "For people who want to work on the questions in our library: safety under compression, agentic attack surfaces, what a signature on machine-collected evidence has to mean. You will publish under your own name, against our own standard, and the standard is public so you can read what you are signing up for before you apply.",
    requirements: [
      "A research record you can point at: papers, preprints, reproducible repositories, or work inside a lab where the methodology was yours.",
      "Comfortable with the machinery rather than the API: evaluation design, statistical power, and knowing when a result does not survive its own error bars.",
      "Willing to publish a negative result, and to have the standard applied to your own work in public.",
      "Security background is welcome but not required. Rigour is.",
    ],
  },

];

/**
 * Questions per role. Four each. Designed to surface the shape of a
 * candidate's judgement, not their LinkedIn highlights.
 */
export const ROLE_QUESTIONS: Record<RoleSlug, ApplyQuestion[]> = {
  "ai-researcher": [
    {
      id: "q1",
      label: "Tell us about a result of yours that did not survive scrutiny.",
      placeholder:
        "Yours, not someone else's. What did you believe, what broke it, and what did you do once you knew? We care more about this answer than about anything you have published.",
      required: true,
    },
    {
      id: "q2",
      label:
        "Pick one question from our library and tell us how you would attack it.",
      placeholder:
        "Safety under compression, agentic attack surfaces, or what a signature on machine-collected evidence has to mean. Method, not vision: what would you measure, against what baseline, and what would falsify you?",
    },
    {
      id: "q3",
      label:
        "Where does the current evidence on your area actually run out?",
      placeholder:
        "The edge where the literature stops being load-bearing and starts being cited out of habit. Show us you have read to that edge.",
    },
    {
      id: "q4",
      label: "What would you refuse to publish, and why?",
      placeholder:
        "You will publish under your own name against a public standard. Tell us where your line is before we hand you the pen.",
    },
  ],
  "director-client-origination": [
    {
      id: "q1",
      label:
        "Walk us through a deal you closed where the buyer almost said no.",
      placeholder:
        "What was the real objection under the stated one, and what changed? We are looking for the move you made, not the agency you were at.",
      required: true,
    },
    {
      id: "q2",
      label:
        "The most complex services engagement you have ever owned end to end.",
      placeholder:
        "How long was the cycle, who was in the room at signing, and what is the one thing that made it close?",
    },
    {
      id: "q3",
      label:
        "How would you spend a week if no one was tracking your activity?",
      placeholder:
        "Be honest. Partner-level autonomy means you do not hide behind a call dashboard. Tell us what you would actually do.",
    },
    {
      id: "q4",
      label:
        "Pick a category of buyer you find boring or beneath you. Argue why you might be wrong.",
      placeholder:
        "Industry, segment, role, archetype, anything. We care about the argument, not the verdict.",
    },
  ],
  "senior-security-consultant": [
    {
      id: "q1",
      label:
        "Take us to a vCISO, advisory, or board-level engagement you owned.",
      placeholder:
        "What was the written brief, what was the actual problem under the brief, and what did the executive team see at the end?",
      required: true,
    },
    {
      id: "q2",
      label:
        "A regulator interaction, audit defence, or incident where you were the senior in the room.",
      placeholder:
        "What did you say in the first hour? What did you change in the next forty-eight?",
    },
    {
      id: "q3",
      label:
        "You can close a critical control gap in a week but the client will not approve the work.",
      placeholder:
        "Concretely, what do you do? Be specific. The shape of the answer tells us a lot.",
    },
    {
      id: "q4",
      label:
        "A piece of received wisdom in cybersecurity practice that you think is wrong.",
      placeholder:
        "What is the wisdom, what is your evidence, and what do you do instead?",
    },
  ],
  "practice-development-associate": [
    {
      id: "q1",
      label:
        "Pick a real company in India or Singapore you would cold-open this week.",
      placeholder:
        "Who is the buyer, what is the moment, and what is the literal first message you would send? Paste it in.",
      required: true,
    },
    {
      id: "q2",
      label: "Tell us about a no-reply you turned into a conversation.",
      placeholder:
        "What was the unlock? The follow-up, the channel, the angle, the timing; whatever it was, we want the specifics.",
    },
    {
      id: "q3",
      label:
        "An industry, segment, or buyer story in India or Singapore that you think nobody else has caught up to.",
      placeholder:
        "What have you been watching, and why does it matter for a services firm like ours?",
    },
    {
      id: "q4",
      label:
        "Why this role over a SaaS sales role with three times the leads?",
      placeholder:
        "Honest answer. The comp will be competitive but the deal flow will not look like a SaaS pipeline. Be specific about what you are choosing.",
    },
  ],
};

export function getRole(slug: string | undefined): Role | undefined {
  if (!slug) return undefined;
  return ROLES.find((r) => r.slug === slug);
}

export function getRoleQuestions(slug: RoleSlug): ApplyQuestion[] {
  return ROLE_QUESTIONS[slug];
}
