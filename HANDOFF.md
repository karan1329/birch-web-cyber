# Birchlogic site — state of play

Checkpoint written at the end of a long working session. Everything below is
committed to `main` in this repo and **not pushed**. Read `git log` for the
full sequence; this file is the map.

---

## Where things stand

**Nothing is deployed.** All work is local commits on `main`, ahead of
`birchlogic/main`. Pushing triggers an SST deploy via GitHub Actions, so
push deliberately, not by reflex.

Local dev: `npx next dev --port 3100` from this directory. Do **not** use
`npm run dev` — that runs `sst dev`, which needs AWS credentials.

### Routes that exist

`/` · `/how-we-work` · `/services` (+ 5 sprint pages) · `/field-notes` ·
`/research` · `/careers` (+ `/careers/apply`) · `/about` · `/contact` ·
`/start` · `/singapore`

---

## The palette, which is locked

One palette, no switching. Dark mode and the accent picker were removed.

| token | value | note |
|---|---|---|
| `--bl-ink` | `#F1EEE7` | beige paper ground, from the one-pager PDF |
| `--bl-fg` | `#121212` | near-black |
| `--bl-fg2` / `--bl-fg3` | `#545454` / `#A6A6A6` | the PDF's grey ramp |
| `--bl-accent` | `#D4405A` | **cranberry red.** Karan's words: this is the
brand red "forever", and it is the colour of the "Book a 30-minute
discovery call" button. Do not substitute a deeper or lighter variant. |
| `--bl-accent-research` | `#1F6F5C` | deep teal. The ONE sanctioned second
chroma, used only by the AI Research nav tab, which is specified to be
permanently coloured. Unapproved — flag it. |

`--bl-neon*` still exist as aliases pointing at cranberry, because ~39
components reference them. Prefer `--bl-accent` in new code.

---

## The hero artwork — read this before touching it

`app/components/home/HeroVisual.tsx` is a port of `Hero Image C` from
Karan's Claude Design project (preserved at `design/cabinet-project/`).

**It is a one-bit dithered canvas.** Every pixel is either paper or ground.
Form exists ONLY because the raking light gives faces different values that
error-diffusion renders at different dot densities.

Two failure modes already hit once each. Do not repeat them:

1. **Removing the lighting destroys the artwork.** Asked to strip the
   "pixelated lighting effect", I flattened the light field. Every face
   crossed the threshold into solid beige and the object vanished. There
   are no outlines underneath to fall back on. The light is not decoration,
   it is the drawing.

2. **The error-diffusion loop was accidentally deleted** by a regex meant to
   strip the redaction bars, and the scene rendered as flat blocks for
   several iterations. If the artwork ever looks like a solid blob, check
   that the dither loop is still present before changing any constants.

**Do not re-derive the composition constants** (`fw = bw * 0.5`,
`cx = bw * 0.56`, `cy = bh * 0.54`). They are authored against the
artwork's own 900×760 proportions. When the panel had the wrong ratio I
"fixed" the constants and made it worse. The correct lever is the panel's
aspect ratio, which is why the hero split is 47/53 — that lands the panel
at ~1.17 against the authored 1.18.

Karan's revised `Hero Image C` (in `design/cabinet-project/`) already has
the black bars and the cycling badge removed and uses ground `#ce3850`.
That file is authoritative. The `THE INDEX · TWENTY-TWO CONTROLS · SCORED`
label still exists in his file but he asked for it removed, so it is
removed here.

### The `/start` visual is different

`/start` runs the **cabinet loop**: a 17-scene, ~33.6s animated SVG with a
mascot who pulls a light cord, stamps a vendor questionnaire FILED, and
files three papers. Ported natively from `cabinet-loop-scene.jsx` +
`animations-v3.jsx` because the exported MP4 tore when scaled. It is vector
and cannot tear. Its panel carries `aspectRatio: 1600/1000` so there is no
letterbox.

There is an outstanding note from Karan on this loop: the mascot should
**move in arcs rather than XY-axis lines**. Not yet done. The motion lives
in `cabinet-loop-scene.jsx`.

---

## Layout rules that are load-bearing

- **Hero bottom alignment.** The cranberry panel and the logo strip end on
  the same line *by construction*: the grid row takes its height from the
  copy column's content (no `minHeight` floor), the strip is pinned with
  `marginTop: auto`, and its bottom padding is zero. Do not reintroduce a
  viewport-height floor — that was the original cause of the mismatch.
- **`SplitText` and whitespace.** Two adjacent `SplitText` elements render
  as inline-blocks; a leading space inside the second is stripped by CSS at
  the start of its line box. That is what closed up "unfashionable thesis."
  The primitive now renders edge whitespace as a non-collapsing span, and
  call sites need an explicit `{" "}` between adjacent instances.
- **`Rise` is polymorphic.** Use `as="li"` inside a list — an intervening
  `<div>` makes each item its own single-item list and breaks numbering.

---

## Client logos

`app/lib/clients.ts` is the single source. Logos in `/public/clients`,
cropped from Karan's `logos.png` by alpha-scanning for bounding boxes.

The strip is headed **"Companies that trust our work"**, deliberately — not
a claim of clientship. That framing is what makes it defensible to include
BMO, the Government of the Netherlands, the Ministry of Defence and the
Department of Defence Production, which are founder-credential engagements
from prior roles rather than clients of the firm. The `kind` field records
which lane each belongs to; `FIRM_CLIENTS` is exported for anywhere the
copy actually says "client". **Keep that distinction.**

The sheet also settled a naming question: it is **Saarthee** and **Batra
Numerro**, not "Saarthe.ai" / "The Batraa Numerology".

---

## Content source of truth

`~/Library/CloudStorage/OneDrive-Birchlogic/Birch-Brain/K-Claude/Cybersecurity/birchlogic_hq/07_sales_enablement/`

- `website_content_final.md` — every section ID (HP-, ST-, RS-, SV-, FN-, CA-, AB-)
- `website_overhaul_pack.md` — the §4 engagement mapping, addresses, the review
- `claude_code_todo.md` — the phased backlog

Phases 1–5 of that backlog are done. Phase 6 is gated on Karan.

---

## Still gated on Karan

| # | item | where |
|---|---|---|
| 6.1 | Street addresses | `lib/offices.ts`, `SHOW_STREET_ADDRESSES = false` |
| 6.3 | Jaskaran's About copy | `/about`, slot built and marked |
| 6.4 | Two reserved library entries | `lib/research.ts`, shown as "being scoped now" |
| 6.5 | Read mechanic: credit vs guarantee | `lib/start-config.ts`, defaults to credit |
| 6.6 | Memory-layer product name | `lib/research.ts`, `MEMORY_LAYER_NAME` |
| 6.7 | Foreword photograph | `/about`, ruled 4:5 slot |
| — | **Founding counter** | `lib/start-config.ts`, `FOUNDING_PLACES_TAKEN = null`. The counter line is OMITTED until this is a real number — the pack requires the true number or no block. |
| — | Press article URLs | `lib/press.ts`, renders as text until `href` is filled |
| — | AI Research tab colour | teal `#1F6F5C`, unapproved |

---

## Known-good verification commands

```bash
npx tsc --noEmit
for r in / /start /services /about /research /careers /contact /field-notes /how-we-work /singapore; do
  printf "%-16s %s\n" "$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3100$r")"
done
```

Beware: grepping rendered HTML double-counts, because Next embeds the RSC
flight payload in `<script>` tags. Strip scripts first, or measure in the
browser with `innerText`.

---

## Open, not started

- Mascot motion in arcs rather than straight lines (`/start` loop).
- Logo crops: a few carry white boxes from the source sheet rather than
  clean transparency; several fine-detail marks grey out at 48px.
- The one-pager PDF (`Cyber-one-pagers.pdf`) has copy points Karan wanted
  worked into the landing page. Not yet mined.
