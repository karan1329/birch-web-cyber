@AGENTS.md

# Birchlogic · senior cybersecurity advisory site

## What this is

The marketing site for **Birchlogic**, a senior cybersecurity strategic advisory boutique. Founded in India (Delhi office active). Singapore Pte Ltd entity in formation. Tagline: **"Cybersecurity, done seriously."**

Karan Bhandari is co-founder. Voice is his.

## The vision · read this before any edit

**One sentence:** Old-school consultancy discipline executed with cutting-edge software. Premium, restrained, design-led, unmistakably *not* "another AI-generated landing page."

Three failure modes we have explicitly rejected and will not return to:

1. **Generic Claude-UI** · italic serif headlines + uppercase mono labels everywhere (Cormorant + Space Grotesk on cream). Reads as "every other AI-gen site."
2. **SaaS animation tropes** · pulsing-dot status pills, "Learn more →" green inline links, drawn entry lines, accordion +/- icons, staggered list reveals on every li.
3. **Editorial purism with no motion** · boring, lopsided, no signature interaction.

What we landed on is a **third path**: dark canvas, single bold sans, one neon accent, heavy 3D + scroll-driven motion, minimal copy. Premium consultancy chassis with a modern AI-stack edge.

## Stack

- **Next.js 16** (App Router, Turbopack default) · `app/` routes, RSC by default, `"use client"` for anything interactive
- **React 19** · `useTransition`, `use(promise)`, refs as props (no `forwardRef`)
- **Tailwind v4** · CSS-first config via `@theme inline` in `app/globals.css`. No `tailwind.config.ts`.
- **Framer Motion** · `whileInView` reveals where it fits. Vanilla rAF for canvas mesh, magnet, tilt, sticky progress (Framer doesn't help here).
- **next/font** · Geist + Geist Mono preloaded, exposed as `--font-geist-sans` / `--font-geist-mono` CSS vars
- **TypeScript strict**

## Design tokens

Defined as CSS vars in `app/globals.css` under `@theme inline`. Dark is default; light is a class swap on `<html>`. Every token has a paired value in both palettes.

| Var | Dark | Light | Use |
|---|---|---|---|
| `--bl-ink` | `#0A0A0C` | `#F5F1E8` | Page bg |
| `--bl-ink2` | `#101015` | `#EDE8D9` | Cards / panels |
| `--bl-ink3` | `#16161D` | `#E4DDC9` | Deeper cards / hover |
| `--bl-fg` | `#EDEDEF` | `#0A0A0C` | Primary text |
| `--bl-fg2` | `rgba(237,237,239,.62)` | `rgba(10,10,12,.65)` | Secondary text |
| `--bl-fg3` | `rgba(237,237,239,.36)` | `rgba(10,10,12,.42)` | Tertiary / dimmed display text |
| `--bl-rule` | `rgba(255,255,255,.08)` | `rgba(10,10,12,.10)` | 1px dividers |
| `--bl-rule2` | `rgba(255,255,255,.16)` | `rgba(10,10,12,.18)` | Strong dividers |
| `--bl-bone` | `#F2EFE8` | `#0A0A0C` | **Inverted** contrast surface (engagement section flips light↔dark with theme) |
| `--bl-bone-fg` | `#0A0A0C` | `#EDEDEF` | Text on inverted surface |
| `--bl-neon` | `#CDF36C` | same | Single accent · curated four: **Lime** `#CDF36C` · **Cobalt** `#5AA9FF` · **Burgundy** `#DA3F62` · **Bone** `#EDE9DF` |
| `--bl-neon-rgb` | `205,243,108` | same | Triplet for `rgba()` glow/shadow math |

Spacing/sizing:
- `--page-pad: clamp(24px, 5vw, 80px)` · horizontal page padding
- `--max-width: 1240px` · content container
- `--section-gap: clamp(80px, 10vw, 140px)`
- `--nav-h: 60px`
- `--top-offset: var(--nav-h)`

## Typography

- **`font-sans` → Geist** (300–900) · display + body. One family does almost everything.
- **`font-mono` → Geist Mono** (400, 500) · labels, status bars, section kickers, captions, micro-numbers.
- **No serif. No italic by default. No uppercase mono everywhere.**
- Display sizing uses `clamp()` for fluid scaling · e.g. hero is `clamp(44px, 9vw, 148px)`, line-height 0.9, letter-spacing `-0.045em`.
- Tabular numerals on counters: `font-variant-numeric: tabular-nums`.

## Motion vocabulary

Every motion is **scroll-driven** or **input-driven**. Never autoplay decoration, never staggered list reveals across every li.

| Primitive | Where |
|---|---|
| `SplitText` · char-by-char rise on every headline | Hero, Thesis, Engagement, Proof, ClosingCTA |
| `Rise` · single fade-up wrapper for non-headline blocks | Section bodies, CTAs, callouts |
| `MeshCanvas` · 3D wireframe with mouse parallax, neon-glow high-Z points | Hero |
| `useStickyProgress` · pin section, drive card cycle | HowWeWork (6 principles over `6 × 75vh`) |
| `useTilt` · perspective rotateX/Y + glare follow | Engagement tier cards |
| `useMagnet` · element drifts toward cursor | Pill CTAs |
| `useCount` · eased number ramp when in view | Thesis stats, Proof donut center |
| Marquee · pure CSS `ticker-move` keyframe + edge masks | Client strip |
| Pulse dot · slow opacity+scale | Hero status bar, active principle marker · sparingly |

Easing default: `cubic-bezier(0.2, 0.7, 0.2, 1)`. Durations: 600–900ms for reveals, 250ms for hover state transitions.

Animations must run at 60fps. The mesh hook reads RGB triplets from CSS vars on each frame so neon-swap updates the canvas live without remount.

## Component primitives (live in `app/components/`)

| File | What |
|---|---|
| `chrome/Nav.tsx` | Fixed glassy dark nav, backdrop-blur on scroll, active link in neon, mobile sheet |
| `chrome/Footer.tsx` | Dark footer with offices, navigation, social, "Cybersecurity, done seriously." kicker |
| `chrome/ThemeSwitcher.tsx` | Top-nav pill (current accent + mode glyph) → glass dropdown with segmented Dark/Light + four paint-swatch tiles (Lime / Cobalt / Burgundy / Bone). Persists to localStorage. |
| `primitives/SplitText.tsx` | Character stagger reveal. Props: `text`, `delay`, `perChar`, `as`, `className`, `dim` |
| `primitives/Rise.tsx` | Single fade-up. Props: `delay`, `y`, `duration` |
| `primitives/Tag.tsx` | Inline `<dot> <label>` for micro-status |
| `primitives/MagButton.tsx` | Magnetic neon-fill or outline CTA. Pill, with `→` that slides on hover |
| `primitives/TiltCard.tsx` | Wrapper exposing `data-tilt-inner` + `data-tilt-glare` slots |
| `primitives/Anchor.tsx` | `0X · Label` section opener with a thin CSS rule running off the side |
| `home/MeshCanvas.tsx` | 3D wireframe canvas, mouse parallax, reads `--bl-neon-rgb` per frame |
| `home/Hero.tsx`, `Thesis.tsx`, `HowWeWork.tsx`, `Engagement.tsx`, `Proof.tsx`, `ClosingCTA.tsx`, `ClientMarquee.tsx` | The seven home sections |
| `hooks/*` | `useInView`, `useScrollProgress`, `useStickyProgress`, `useMagnet`, `useTilt`, `useCount`, `useTheme` |

## Section anchors

`Anchor` replaces the old `SectionLabel`. Reads `01 · Thesis` followed by a thin CSS rule running off the side. Consistent on every section head.

No section gets all-caps wide-letter-spaced "THE THESIS" labels. No section gets a colored badge.

## Copy voice (from `birchlogic_website_copy_20260511.md`)

- **Confident and opinionated.** No vendor-buzzword filler.
- **Dense and specific.** Numbers over adjectives.
- **No em dashes (U+2014).** Use commas, semicolons, or new sentences. This is enforced; the codebase has been audited.
- **Position on quality and speed, not cost.** Birchlogic is the serious option, not the cheap option.
- **"Cybersecurity, done seriously"** is the master line. Every page rolls up to it.
- The reader is intelligent. Tell them the thing, then move on. No "we believe", "passionate about", or "industry-leading".
- Karan's quotes are attributed with `<figure>/<blockquote>/<figcaption>` and "Karan Bhandari, Co-founder, Birchlogic".

Three-word headlines work when the design allows. Live examples: **"Three commercial shapes. Same craft."** · **"One conversation. Thirty minutes."** · **"Let's talk."**

## Anti-patterns (enforced)

- **Em dashes (U+2014) in user-facing copy.** Use commas, semicolons, or new sentences. Hyphens `-` and middle-dots `·` are fine.
- No italic serif headlines (no Cormorant / Playfair).
- No uppercase mono labels above every section ("THE THESIS").
- No "Since 2013 / UNCHANGED" colored badges per row.
- No staggered fade-up on every `<li>` in every list.
- No "Learn more →" green inline link CTAs.
- No drawn entry-line animation gimmicks.
- No accordion with rotating +/- icons for short bodies.
- No pulsing dots scattered as decoration (one in the hero status bar is the budget).
- No gradient backgrounds (one radial glow per CRQProof section is the budget).
- No emoji.
- No "as seen in" press strips.
- No drop shadows on cards (one boxShadow ring on tilt cards is the budget; nothing else).
- No published pricing on the website (per Karan's direction · pricing is on the discovery call).

## Routes

```
app/
  layout.tsx                                       # html shell, Geist+GeistMono via next/font, Nav, Footer
  globals.css                                      # @theme tokens, base, keyframes
  page.tsx                                         # home · 8 sections
  how-we-work/page.tsx                             # 6 meta principles (sticky scroll) + engagement cycle
  services/page.tsx                                # 5 practices, 3 commercial tiers, 12 sprints, vCISO/FSO sub-tiers
  services/multi-framework-compliance/page.tsx     # tier-1 sprint landing template (8 blocks)
  blog/page.tsx                                    # featured + recent + categories
  careers/page.tsx                                 # 3 roles + how we run the firm
  contact/page.tsx                                 # 3 methods + what to expect + offices
  components/                                      # see table above
```

Sections of home (in order): Hero · ClientMarquee · Thesis · HowWeWork (2-col 8 principles) · Engagement (3 tilt cards: Sprints / vCISO / Fractional Security Office) · SeniorPartnerPromise · WhoWeWorkWith · ClosingCTA. CRQ donut now lives on `/services`, not home.

## Commands

```bash
npm run dev      # sst dev · runs the Next dev server (Turbopack) + SST live AWS dev
npm run build    # next build
npm run lint     # eslint
npm run deploy   # sst deploy --stage production
```

Dev server runs at http://localhost:3000. `sst dev` wraps `next dev`, so it
needs AWS credentials; for a pure local UI loop without AWS, `npx next dev` works.

## Theme + neon switching

`useTheme()` hook owns the state. Mutates two things on `<html>`:
1. Adds `class="light"` (or no class for dark).
2. Inline `style.setProperty('--bl-neon', hex)` + `'--bl-neon-rgb', triplet`.

`globals.css` reads `:root { ... }` for dark, `:root.light { ... }` for light. The mesh hook reads `getComputedStyle(html).getPropertyValue('--bl-neon-rgb')` once per frame so a neon swap updates the canvas without remount.

State persists to `localStorage` under `bl:theme` and `bl:neon`.
