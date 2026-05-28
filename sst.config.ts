/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "birch-web",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("BirchWeb", {
      environment: {
        // Secrets — supplied at deploy time via GitHub Actions env (repo or
        // `production` environment secrets), never committed. The empty-string
        // fallback keeps `sst deploy` from failing when unset; the app then logs
        // instead of sending (identical to having no key).
        RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
        TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY ?? "",
        // Non-secret config. The Turnstile *site* key is public (it ships in the
        // client bundle), so inlining it here is safe and ensures the production
        // build uses the real widget instead of the always-pass test key.
        NEXT_PUBLIC_TURNSTILE_SITE_KEY:
          process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADV3eER-aGUurFlO",
        MAIL_FROM: process.env.MAIL_FROM ?? "Birchlogic <noreply@birchlogic.com>",
        MAIL_TO: process.env.MAIL_TO ?? "hi@birchlogic.com",
      },
    });
  },
});
