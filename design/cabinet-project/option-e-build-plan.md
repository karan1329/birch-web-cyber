# Option E · The Cabinet — build plan for a fresh session

Source brief: `uploads/04_the_cabinet.md` (read it first, fully).
Current attempts to learn from: `Hero Image C.dc.html` (crimson drawer, dither), `Hero Image D.dc.html` (fixed perspective, ladder tabs), `Hero Image E.dc.html` (failed first pass — do not reuse its code).

## Why E failed
- Went straight to the full composed scene in one pass. Geometry, dither, labels, and motion were never individually verified, so nothing could be judged or fixed in isolation.
- The isometric drawing was built blind (no visual check between steps), so proportions and occlusion were wrong at hero size.
- The entropy/dither layer and the line layer were designed together instead of the line drawing being finished and approved FIRST.

## The rules that must hold (from the brief)
- Navy `#0E1B2C` on bone `#F4EFE6`. Ochre `#B8862F` ONLY on the open drawer's tab and the empty slot. Redaction bars are the only pure black.
- Single stroke weight, true 30° isometric, no fill shading, no wood grain, no patina.
- Dither is entropy, line is order; dot density grows with depth. The gradient IS the argument.
- The empty slot is the hero of the frame. One slot, near the front, unmistakable.
- Motion: drawer opens once (620ms, decelerated, no bounce); cards rise staggered 70ms; bars stamp hard-cut 60ms apart, last; reduced-motion = finished still.

## Build in these steps — verify each visually before the next
1. **The drawer alone, static, line only.** One SVG-quality isometric drawer (30°), pulled open, correct occlusion: front face, right wall, top rims, runners. No cards, no dither, no motion. Screenshot-verify proportions at 900×760 AND at thumbnail. Do not proceed until the object reads as furniture.
2. **Cards + tabs, static.** 8–10 standing cards, 4–5 seated tabs in a ladder, every label readable (solid bone plates behind text). One dashed-ochre empty slot near the front. The missing card lying face-up with text lines. Verify: every label legible, slot found by the eye first.
3. **The cabinet context.** Face plane behind, two closed neighbors above, edges running out of frame. Verify the drawer still dominates.
4. **The depth dither pass.** Entropy field + ghost machinery ONLY behind/inside the cabinet mouth; fine→coarse with depth; line elements fade into it by alpha. Verify the front stays quiet and crisp.
5. **Motion.** Slide-out once, staggered card rise, hard-cut redaction stamps, reduced-motion still. Verify timing feels like mass, not bounce.
6. **Interaction (optional last).** Hover lifts a card; keep it subtle.

One step per turn. Screenshot and judge each before moving on. If a step fails, fix it there — never patch it downstream.
