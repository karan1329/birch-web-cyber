# Personal-deploy path · karan1329 → Vercel

This doc is the source of truth for the **second** deploy target on this repo. The site has two production paths today:

| Target | Remote | Trigger | Infra |
|---|---|---|---|
| **Birchlogic org** | `birchlogic` → `Birchlogic/birch-web-cyber` | push to `main` | GitHub Actions (`.github/workflows/deploy.yml`) → `sst deploy --stage production` → AWS |
| **karan1329 personal** | `karan` → `karan1329/birch-web-cyber` | push to `main` | Vercel CD (auto-built from any push) |

`karan` is the **primary** day-to-day push target; the upstream is set to it. `birchlogic` stays available for the AWS path. Both rebuild from the same `main`.

Any future Claude session asked to "push", "deploy", or "set up the personal remote" should read this file first. CLAUDE.md links here.

---

## 1 · Why dual remote

Two independent deploys de-risk launches. The AWS path is the regulator-facing production deploy under the Birchlogic org account; the Vercel path is fast iteration, preview branches, and direct personal control. Either can serve traffic. The cost of keeping both running is one extra `git push` when synchronisation matters, plus two sets of env-var values to keep aligned in the two control planes (GH Actions secrets vs Vercel Project Settings).

If you ever want to retire one path, the lever is:
- **Retire AWS**: delete `.github/workflows/deploy.yml` and remove `sst` + `@types/sst` from `package.json`. Drop the `birchlogic` remote.
- **Retire Vercel**: disconnect the project in Vercel UI. Drop the `karan` remote.

Neither is recommended right now. Both work.

---

## 2 · Authentication state

The current machine is already authenticated to `karan1329` via `gh`, with the token cached in the macOS keychain. To verify:

```bash
gh auth status
```

Expected: `Logged in to github.com account karan1329 (keyring)` with scopes `gist`, `read:org`, `repo`, `workflow`.

If that entry is gone (new machine, keychain wiped, token revoked), re-auth interactively:

```bash
gh auth login --hostname github.com --git-protocol https --web
# follow the device-code flow in browser; pick karan1329
gh auth setup-git   # ensures git uses gh's token for github.com
```

Multiple accounts on the same machine: `gh auth switch -u karan1329` toggles the active account.

`gh` carries the token into git operations automatically when pushing to `github.com` URLs over HTTPS. No SSH keys to manage.

---

## 3 · Repo bootstrap (already run; reproduce if needed)

The three commands that stood the karan remote up. Idempotent in the sense that re-running them surfaces clear errors if the repo / remote already exists.

```bash
# 1. Create the repo on karan1329
gh repo create karan1329/birch-web-cyber --private \
  --description "Birchlogic marketing site · Next.js 16 + three.js mesh hero · SST/Vercel parallel deploy" \
  --homepage "https://birchlogic.com"

# 2. Add the remote
git remote add karan https://github.com/karan1329/birch-web-cyber.git

# 3. Push current main, set upstream so `git push` defaults to karan
git push -u karan main
```

If `gh repo create` says the repo exists, either pick a new name or (carefully, after confirming with the user) delete and recreate: `gh repo delete karan1329/birch-web-cyber --yes`.

---

## 4 · Vercel connect (one-time UI step, ~5 minutes)

Vercel doesn't expose a free CLI to do this end-to-end, so the project is created in the UI.

1. Sign in to **vercel.com** with the GitHub account `karan1329`. (Vercel uses GitHub OAuth; the karan1329 GH session is what authorises Vercel to read the new repo.)
2. **New Project → Import Git Repository**. Pick `karan1329/birch-web-cyber` from the list. If it doesn't appear, click "Adjust GitHub App Permissions" and add the repo to Vercel's access list.
3. **Framework Preset**: Next.js (auto-detected). Confirm.
4. **Build & Output Settings** (use defaults):
   - Build command: `next build`
   - Output directory: `.next`
   - Install command: `npm ci`
5. **Environment Variables** (Project Settings → Environment Variables, **Production** scope at minimum; consider Preview scope too):
   - `RESEND_API_KEY` — value from the Birchlogic org GH Actions Production env. Without this, form actions log to console instead of sending email (graceful fallback in `app/actions/contact.ts`).
   - `TURNSTILE_SECRET_KEY` — same source. Without this, every form submission fails the human-check.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — the public site key. Production value is in `sst.config.ts` defaults: `0x4AAAAAADV3eER-aGUurFlO`. Setting this in Vercel makes the real widget ship in the client bundle; without it, the test widget (always-passes) is used.
   - `MAIL_FROM` — `Birchlogic <noreply@birchlogic.com>` (paste the display name + angle-bracketed address as a single string).
   - `MAIL_TO` — comma-separated multi-recipient. Current production value: `hi@birchlogic.com,karan@birchlogic.com,jas@birchlogic.com`. `app/actions/contact.ts` splits on commas; no spaces inside the value.
6. **Deploy**. First build runs `npm ci` + `next build` + uploads `.next`. Takes ~2 minutes.
7. Verify the deploy: the Vercel preview URL (`<project>.vercel.app`) loads the home page, the mesh canvas paints, the discovery-call link works.

Custom domain comes later (Section 7).

---

## 5 · Daily workflow

The local `main` tracks `karan/main` (set by `git push -u karan main` during bootstrap). So:

```bash
git push                       # pushes to karan/main → Vercel deploys
git push birchlogic main       # pushes to birchlogic/main → AWS deploys via deploy.yml
git push karan main && git push birchlogic main   # push both (when you want both prods in sync)
```

Convention: push to `karan` for normal work. Push to `birchlogic` only when AWS specifically needs the update — e.g. a regulator-facing demo on the AWS URL, or a feature that touches `sst.config.ts`.

`git pull` defaults to `karan/main` for the same upstream reason. If `birchlogic/main` ever drifts ahead (someone else pushed there), pull from it explicitly: `git pull birchlogic main`.

---

## 6 · Preview deploys (branches)

Vercel auto-builds every branch you push to `karan` as a preview URL. Useful for "show this to someone before merging":

```bash
git checkout -b polish/timeline
# ... edit ...
git push karan polish/timeline
# Vercel auto-builds and posts a preview URL to the GitHub PR (or accessible via Vercel dashboard)
```

The AWS path does not produce branch previews — only `main` triggers `deploy.yml`.

---

## 7 · Custom domain on Vercel (deferred)

After the first green deploy:

1. Vercel Project → Settings → Domains.
2. Add `birchlogic.com` (and `www.birchlogic.com` if applicable).
3. Vercel returns the DNS records to add at the domain registrar. Add them. Vercel verifies and issues a Let's Encrypt cert automatically.
4. Decide which path is canonical: if `karan`/Vercel is canonical, point `birchlogic.com` at Vercel; the AWS deploy keeps running but at the SST-issued URL.

Don't do this until the Vercel deploy is reliably green and the env vars are confirmed correct.

---

## 8 · Troubleshooting

**`Permission denied` on `git push karan main`.** Check `gh auth status` — likely the active account drifted off karan1329 or the keychain entry got revoked. Re-auth or `gh auth switch -u karan1329`.

**`gh repo create` says "name already exists"**. Either the bootstrap already ran (check `gh repo view karan1329/birch-web-cyber`) or the name is taken by another karan1329 repo. **Do not auto-delete** — confirm with the user, then either pick a new name or `gh repo delete karan1329/birch-web-cyber --yes` only after explicit approval.

**Vercel build fails on `npm ci`**. The lockfile may have drifted vs `package.json`. Run `npm install` locally to refresh, commit `package-lock.json`, push.

**Forms log to console on Vercel prod**. The env vars aren't set in the right scope. Vercel scopes env vars to Production / Preview / Development; the form actions read `process.env.RESEND_API_KEY` at runtime, so the var must be on the Production scope.

**Vercel build succeeds but `/singapore` 404s**. Routing under App Router; confirm `app/singapore/page.tsx` exists in the deployed commit (`gh browse app/singapore/page.tsx --repo karan1329/birch-web-cyber`).

**Push to `karan` works but Vercel doesn't trigger a build**. The Vercel Git integration may have been disconnected. Vercel Project → Settings → Git → reconnect.

---

## 9 · Commit-author email (REQUIRED for Vercel CD — not just cosmetic)

Vercel **blocks** any git-triggered deployment whose HEAD commit author email is not a verified email on the pushing GitHub account. This is an anti-abuse measure. The machine's auto-derived `karan@Karans-MacBook-Pro-2.local` (hostname placeholder) is not valid, so a push with that author lands in Vercel as a red **"Deployment Blocked — commit author email is not valid"** and never builds.

Fix (repo-local; set once, applies to all future commits in this repo):

```bash
git config user.name "Karan Bhandari"
git config user.email "62919589+karan1329@users.noreply.github.com"
```

That `62919589+karan1329@users.noreply.github.com` is GitHub's privacy-preserving noreply address for the `karan1329` account (`62919589` is the account's numeric id). It is always a verified email for the account, so Vercel accepts it without exposing a real inbox. To use a real email instead (e.g. `karan@birchlogic.com`), that address must first be **added and verified** under GitHub → Settings → Emails, or Vercel will block it just the same.

After fixing the config, the bad author only affects commits already made; make one new commit (any change, or `git commit --allow-empty`) so the new HEAD carries the valid author, then push — Vercel builds it. Use `--global` instead of repo-local if you want every repo on the machine fixed.

---

## Appendix · what's in each control plane

For future "where do I configure X?" lookups:

| Concern | Birchlogic / AWS path | karan / Vercel path |
|---|---|---|
| Secrets | GH org → `Birchlogic` → Settings → Environments → `production` → Secrets | Vercel Project → Settings → Environment Variables |
| Deploy logs | GH Actions tab on `Birchlogic/birch-web-cyber` | Vercel Project → Deployments |
| Domain | AWS Route 53 / CloudFront / SST output | Vercel Project → Settings → Domains |
| Build cache | none (cold every run) | Vercel build cache; clear via Project → Settings → Git → "Clear Build Cache" |
| Preview URL | none | `<branch>-<project>.vercel.app` |
| Production URL | SST-issued CloudFront URL (whichever the `sst deploy` returned) | `<project>.vercel.app` until custom domain is added |
