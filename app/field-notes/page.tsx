import { InnerHero } from "../components/primitives/InnerHero";
import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { FIELD_NOTES, SHELF_INTRO } from "../lib/field-notes";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  title: "Field Notes",
  description:
    "Five pieces being written now, in order. Nothing publishes here until it is worth your time, which is also why there are five and not thirty.",
  path: "/field-notes",
});

/**
 * FN-1 · the honest shelf.
 *
 * The page used to list five "featured" and four "recent" articles plus a
 * category rail, none of which were published. That is the most corrosive
 * thing a diligence surface can do, so the whole listing is gone. What
 * remains is five greyed, unlinked cards marked "In the works", driven by
 * app/lib/field-notes.ts.
 *
 * There is deliberately not a single anchor tag on these cards.
 */
export default function FieldNotesPage() {
  return (
    <>
      <InnerHero
        kicker="Field Notes"
        title="Field notes on serious cybersecurity."
        subtitle="We publish field notes, not marketing content. If we have an opinion that is not load-bearing, we do not publish it."
      />

      <section
        style={{
          background: "var(--bl-section-veil)",
          color: "var(--bl-fg)",
          padding: "var(--bl-section-gap) var(--bl-page-pad)",}}
      >
        <div className="bl-container" style={{ padding: 0 }}>
          <Anchor number="01" label="On the shelf" />

          <Rise>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(16px, 1.35vw, 19px)",
                lineHeight: 1.68,
                color: "var(--bl-fg2)",
                maxWidth: "var(--bl-text-wide)",
                margin: "0 0 clamp(40px, 5vw, 64px)",
              }}
            >
              {SHELF_INTRO}
            </p>
          </Rise>

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 1,
              background: "var(--bl-rule)",
              border: "1px solid var(--bl-rule)",
            }}
          >
            {FIELD_NOTES.map((n, i) => (
              <Rise
                key={n.title}
                as="li"
                delay={i * 0.04}
                style={{
                  background: "var(--bl-ink2)",
                  padding: "clamp(24px, 3vw, 36px)",
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: "clamp(16px, 3vw, 40px)",
                  alignItems: "start",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "clamp(18px, 1.7vw, 24px)",
                      lineHeight: 1.25,
                      letterSpacing: "-0.015em",
                      // Greyed: these are not live, and the type says so
                      // before the badge does.
                      color: "var(--bl-fg3)",
                      margin: "0 0 10px",
                    }}
                  >
                    {n.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(13.5px, 1.05vw, 15px)",
                      lineHeight: 1.6,
                      color: "var(--bl-fg3)",
                      margin: 0,
                      maxWidth: "var(--bl-text-body)",
                    }}
                  >
                    {n.dek}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9.5,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--bl-fg3)",
                    border: "1px dashed var(--bl-rule2)",
                    padding: "7px 11px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.status}
                </span>
              </Rise>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
