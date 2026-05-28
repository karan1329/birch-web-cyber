"use server";

import { Resend } from "resend";
import { ROLE_QUESTIONS, getRole, type RoleSlug } from "../components/careers/roles";

/**
 * Server actions for /contact and /careers/apply.
 *
 * Both actions:
 *  1. Verify a Cloudflare Turnstile token against siteverify.
 *  2. Validate the required fields.
 *  3. Format the submission as a plain-text email and ship it via Resend.
 *  4. Fall back to a console log if `RESEND_API_KEY` is not set (dev).
 *
 * Email convention (matches the user's mailbox search expectation):
 *   Contact:     `website-contact | {subject} | {name}`
 *   Application: `website-apply | {role title} | {name}`
 *
 * Required env vars in production:
 *   RESEND_API_KEY              Resend API key
 *   MAIL_FROM                   Verified sender, e.g. noreply@birchlogic.com
 *   MAIL_TO                     Recipient inbox, defaults to hi@birchlogic.com
 *   TURNSTILE_SECRET_KEY        Cloudflare Turnstile production secret
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  Cloudflare Turnstile production site key
 *
 * Test keys (Cloudflare-issued, safe to commit) cover local dev:
 *   Site key:   1x00000000000000000000AA
 *   Secret key: 1x0000000000000000000000000000000AA
 */

const TURNSTILE_SECRET =
  process.env.TURNSTILE_SECRET_KEY ?? "1x0000000000000000000000000000000AA";

// birchlogic.com is verified on Resend; the From MUST be on that domain.
// onboarding@resend.dev (sandbox) would cap delivery to the account owner.
const MAIL_FROM = process.env.MAIL_FROM ?? "Birchlogic <noreply@birchlogic.com>";
const MAIL_TO = process.env.MAIL_TO ?? "hi@birchlogic.com";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const body = new URLSearchParams();
    body.append("secret", TURNSTILE_SECRET);
    body.append("response", token);
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
        cache: "no-store",
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Offline / firewall fallback: only the dev test secret is auto-trusted.
    // Production secrets fail closed on a verify-endpoint outage.
    return TURNSTILE_SECRET.startsWith("1x");
  }
}

async function sendMail(args: { subject: string; text: string; replyTo?: string }) {
  if (!resend) {
    console.log("[email:no-key]", args.subject);
    console.log(args.text);
    return;
  }
  await resend.emails.send({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: args.subject,
    text: args.text,
    replyTo: args.replyTo,
  });
}

export type ActionResult = { ok: true } | { ok: false; error: string };

// ─────────────────────────────────────────────────────────────────────────
// Contact form
// ─────────────────────────────────────────────────────────────────────────

const CONTACT_SUBJECT_LABEL: Record<string, string> = {
  "quick-sprint": "Quick Sprint",
  vciso: "vCISO retainer",
  fso: "Fractional Security Office",
  general: "General",
};

export async function submitContact(formData: FormData): Promise<ActionResult> {
  const token = String(formData.get("cf-turnstile-response") ?? "");
  const human = await verifyTurnstile(token);
  if (!human) {
    return {
      ok: false,
      error: "Could not verify the form. Please refresh and try again.",
    };
  }

  const payload = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.firstName || !payload.email || !payload.message) {
    return {
      ok: false,
      error: "Name, work email and message are required.",
    };
  }

  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ");
  const subjectLabel = CONTACT_SUBJECT_LABEL[payload.subject] ?? "General";
  const subject = `website-contact | ${subjectLabel} | ${fullName || payload.email}`;
  const text = [
    `Submitted: ${new Date().toISOString()}`,
    ``,
    `From: ${fullName || "(no name)"} <${payload.email}>`,
    `Company: ${payload.company || "(not provided)"}`,
    `Subject: ${subjectLabel}`,
    ``,
    `Message:`,
    payload.message,
  ].join("\n");

  try {
    await sendMail({ subject, text, replyTo: payload.email });
  } catch (err) {
    console.error("[email] send failed", err);
    return {
      ok: false,
      error:
        "We received your note but mail delivery hiccuped. We will follow up at the email you provided.",
    };
  }

  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// Job application
// ─────────────────────────────────────────────────────────────────────────

const VALID_ROLE_SLUGS = new Set<RoleSlug>([
  "director-client-origination",
  "senior-security-consultant",
  "practice-development-associate",
]);

export async function submitApplication(
  formData: FormData,
): Promise<ActionResult> {
  const token = String(formData.get("cf-turnstile-response") ?? "");
  const human = await verifyTurnstile(token);
  if (!human) {
    return {
      ok: false,
      error: "Could not verify the form. Please refresh and try again.",
    };
  }

  const roleSlugRaw = String(formData.get("role") ?? "").trim();
  if (!VALID_ROLE_SLUGS.has(roleSlugRaw as RoleSlug)) {
    return {
      ok: false,
      error: "Unknown role. Please reload the page and try again.",
    };
  }
  const roleSlug = roleSlugRaw as RoleSlug;
  const role = getRole(roleSlug);
  if (!role) {
    return { ok: false, error: "Unknown role." };
  }

  const payload = {
    role,
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    linkedin: String(formData.get("linkedin") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.linkedin) {
    return {
      ok: false,
      error: "Name, email and LinkedIn URL are required.",
    };
  }

  const questions = ROLE_QUESTIONS[roleSlug];
  const answers = questions.map((q) => ({
    id: q.id,
    label: q.label,
    answer: String(formData.get(q.id) ?? "").trim(),
    required: !!q.required,
  }));

  // At least the first (required) question must have content.
  const firstRequired = answers.find((a) => a.required);
  if (firstRequired && !firstRequired.answer) {
    return {
      ok: false,
      error: "Please answer the first question — it is the load-bearing one.",
    };
  }

  const subject = `website-apply | ${role.title} | ${payload.name}`;
  const text = [
    `Submitted: ${new Date().toISOString()}`,
    ``,
    `Role: ${role.title} (${role.location})`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `LinkedIn: ${payload.linkedin}`,
    `Phone: ${payload.phone || "(not provided)"}`,
    ``,
    `─── Answers ───`,
    ...answers.flatMap((a) => [
      ``,
      `Q: ${a.label}`,
      a.answer || "(no answer)",
    ]),
  ].join("\n");

  try {
    await sendMail({ subject, text, replyTo: payload.email });
  } catch (err) {
    console.error("[email] send failed", err);
    return {
      ok: false,
      error:
        "We received your application but mail delivery hiccuped. We will follow up at the email you provided.",
    };
  }

  return { ok: true };
}
