// One-off smoke test for Resend delivery. Run once with:
//   node --env-file=.env.local scripts/smoke-resend.mjs
// Confirms the API key works, the FROM is accepted by Resend, and
// hi@birchlogic.com receives. Delete this file after the test if you like.

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.MAIL_FROM ?? "Birchlogic <onboarding@resend.dev>";
// Sandbox-mode override: until birchlogic.com is verified on Resend, the
// account can only send to the owner address. Override via SMOKE_TO if you
// want to send elsewhere once the domain is verified.
const to = process.env.SMOKE_TO ?? "karanbhandari1329@gmail.com";

if (!apiKey) {
  console.error("RESEND_API_KEY is not set. Aborting.");
  process.exit(1);
}

const resend = new Resend(apiKey);

const result = await resend.emails.send({
  from,
  to,
  subject: "website-apply | smoke-test | dev-environment",
  text: [
    "This is the wiring smoke test for the Birchlogic dev environment.",
    "",
    `Sent at: ${new Date().toISOString()}`,
    `From:    ${from}`,
    `To:      ${to}`,
    "",
    "If you see this email in hi@birchlogic.com, the apply/contact form",
    "submissions are correctly delivering. Safe to delete.",
  ].join("\n"),
});

console.log("Resend response:");
console.dir(result, { depth: 4 });

if (result.error) process.exit(1);
