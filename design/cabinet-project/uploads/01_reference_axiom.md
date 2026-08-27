# Reference 01 · "Axiom" cloud observability hero image

**Source:** Dribbble shot 27361530, *Cloud Observability Platform, SaaS Landing Page Design*, by Kris Anfalova. Observed directly at 1512px, scrolled and captured at intervals. This file describes what is on screen so the construction can be studied. It is a teardown, not a template to copy.

---

## 1. Where the image sits

The page hero is an asymmetric split, roughly **46 / 54**. Left is a near-white conversion panel holding all the type and the CTA. Right is the image, and the image is **full bleed to the panel edge**: no border, no radius, no inner margin, no drop shadow. It runs from the underside of the nav to the bottom of the hero and is cut hard by the panel edge on the left.

That hard cut matters. The image is not a picture placed on a page. It is a window in the page. Nothing softens the join.

The designer's own note describes the intent as separating "the functional conversion zone from the conceptual visual zone."

---

## 2. The subject

A **photographic sky**: a dense cumulus cloud mass filling the frame, shot from below or level, deep saturated blue at the top graduating to white in the cloud body.

Inside the cloud, roughly centre-right and slightly above the vertical midpoint, sits a **retro CRT computer**: a boxy monitor with a rounded bezel and a separate keyboard on a shallow perspective, angled maybe fifteen degrees off frontal.

The critical treatment: the computer is **not composited on top of the cloud, it is embedded in it**. Its edges are eaten by cloud on the lower left and upper right. Its value range is compressed to almost exactly the cloud's value range, so it reads as pale grey-white against pale grey-white with only a slight edge and a soft interior shadow separating it. There is no rim light, no glow, no outline, no contact shadow.

This is the single most important craft decision in the image. A normal composite puts a sharp, saturated object on a soft background and it looks pasted. Here the object has been **pushed into the background's value and saturation range** until it is almost lost, and legibility is carried by silhouette alone.

---

## 3. The overlay that does the real work

Across the sky, mostly in the upper left and the right edge, there is a field of **tiny white dots and short dashes arranged in loose horizontal contour bands**. Not a regular grid. The bands follow the cloud's forms the way isobars follow pressure or the way a bathymetric chart follows depth. Density varies: tight clusters where the cloud is dense, sparse trailing dots where it thins.

Scale: individual marks are roughly 2 to 3px at the observed size, spaced 6 to 8px apart within a band, with bands 10 to 14px apart. Pure white, low opacity, maybe 40 to 60 percent.

**This is what converts a stock-feeling sky into an instrument reading.** Without it the image is a nice cloud. With it, the image says *this thing is being measured*. It is the entire bridge between "atmospheric" and "observability", and it costs almost nothing.

Note that it is a **measurement overlay, not a decoration**. It has a logic. It follows the subject. A random scatter of dots would not work.

---

## 4. Palette

**One hue family, no second colour anywhere in the image.**

Approximate values read off screen:

| role | approx | where |
|---|---|---|
| deep sky | `#1E6FBF` to `#2A7FD4` | upper corners, densest blue |
| mid sky | `#4A96D8` | the field |
| cloud body | `#A8CDE9` to `#D6E7F4` | the mass |
| cloud highlight | `#F2F7FB` | the brightest lobes |
| hardware | `#C9D8E2` with `#8FA7B8` shadow | the CRT |
| overlay marks | `#FFFFFF` at 40 to 60 percent | the dot bands |

There is no warm tone, no second accent, no gradient between two brand colours. The whole image is one hue at different lightnesses and saturations. That discipline is why it does not read as AI slop despite almost certainly being generated.

---

## 5. Composition and reserved space

- Subject sits **upper-centre-right**, occupying roughly the middle third vertically.
- The **lower left quadrant is deliberately empty cloud**, and that emptiness is not accidental. It is where the translucent UI card sits.
- The right edge holds the densest overlay marks, pulling the eye back into frame.
- No horizon. No ground plane. No scale reference. The image is weightless and unplaceable, which is the point for a "cloud" product.

**Reserve the negative space before generating, not after.** The card is a design element that needs a quiet, mid-value, low-detail region to sit on. If the image is generated without that reservation, the card lands on busy pixels and has to be given a heavier background, and then it stops being translucent and starts being a box.

---

## 6. The cards riding on the image

Translucent rectangles, roughly 170 × 90px at observed scale, sitting flush against the lower-left area with a small inset from the panel edge. Squared corners with a very slight radius. Fill is white at low opacity with a blur behind it, so the cloud shows through as a soft wash.

Contents, in order:
1. A small **dot-matrix glyph** in the top left, a 3 × 3 or 4 × 3 arrangement of tiny squares, some filled and some outlined, reading as a state indicator.
2. A **mono uppercase label** in white, letterspaced, roughly 8px: `DATA BOTTLENECKS`, `ANOMALY DETECTION`, `CHAOS ENGINEERING`.
3. Two lines of tiny body copy in white at maybe 70 percent opacity.

The cards **rotate on a carousel**. Across three captures taken seconds apart the label changed each time. Bottom right of the image panel carries a pair of small square `←` `→` buttons, outlined, translucent, roughly 20px.

Also animated: the grayscale logo strip pinned to the bottom of the left conversion panel scrolls horizontally as a marquee. Logos are monochrome, sitting on a shared baseline, under a mono uppercase label reading `TRUSTED BY ENGINEERING TEAMS GLOBALLY`.

---

## 7. Lighting

High key. Soft and omnidirectional. No visible key light, no cast shadows, no specular highlights, no hard edges anywhere except the CRT's silhouette. The brightest point is the cloud core behind the hardware, which creates a gentle halo without being a glow effect.

Contrast is **low within the image and high against the page**: the image panel is the only saturated area on an otherwise white page, so it carries all the visual weight without needing internal drama.

---

## 8. Second section, for completeness

Below the hero, section two of the same page:

- A **thin full-width band** with hairline rules top and bottom, a tiny centred mono uppercase label `THE PROBLEM`, and small tick marks at the extreme left and right edges of the band.
- A **mono uppercase two-line centred headline**, sentence-length, roughly 20px, letterspaced, in near-black.
- A **2 × 2 grid of pale tiles**. Each tile holds a light-grey background with a **fine isometric line drawing**: server racks, planes, nodes, connecting curves, drawn in hairline grey on an almost invisible grid texture. No fill, no colour, no shading. Below each drawing a mono uppercase caption and one line of small body copy.

The line drawings are the same idea as the dot overlay, executed differently: they carry technical authority without a single photographic element.

---

## 9. What to take and what to leave

**Take, because it is craft:**
- One hue family, no second colour
- Value compression until the subject nearly disappears into the ground
- A measurement overlay with a logic, not a decoration
- Reserved negative space for the UI element, planned before generation
- Full bleed with a hard cut at the panel edge
- Cards that carry mono uppercase labels and nothing louder

**Leave, because it is hers or wrong for us:**
- The specific cloud-and-CRT subject
- The blue palette
- Glassmorphism as the card treatment
- The rotating carousel with arrow controls
- The logo marquee. Under NDA there is no honest logo wall, and a fake one is worse than none.
