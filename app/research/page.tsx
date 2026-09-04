import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { SplitText } from "../components/primitives/SplitText";
import { WaitlistForm } from "../components/research/WaitlistForm";
import { OFFICES, SHOW_STREET_ADDRESSES } from "../lib/offices";
import {
  LIBRARY,
  MEMORY_LAYER_NAME,
  RESEARCH_STANDARD_PATH,
  RESERVED_LINE,
  STANDARD_INTRO,
  WAITLIST_TAG,
  researchStandardExists,
} from "../lib/research";
import { pageMeta } from "../lib/seo";

// RS-9
export const metadata = pageMeta({
  title:
    "AI Research — We build the agents. Then we make them answer for themselves.",
  description:
    "Our own research lab. What it works on, what it publishes, and what it is building next. Every finding clears a twenty-five point standard before it ships.",
  path: "/research",
});

/**
 * /research · AI Research.
 *
 * Order per RS-REV: claim → library (RS-5 folded into its intro) → workbench
 * (moved to the bottom as the anchor) → memory layer → the lab.
 */
export default function ResearchPage() {
  return (
    <>
      <Claim />
      <Library />
      <Workbench />
      <MemoryLayer />
      <Lab />
    </>
  );
}

/* ── RS-1rev ─────────────────────────────────────────────────────────── */

function Claim() {
  return (
    <section
      style={{
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding:
          "calc(var(--bl-top-offset) + clamp(70px, 9vw, 130px)) var(--bl-page-pad) clamp(80px, 10vw, 130px)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--bl-accent-research)",
          }}
        >
          AI Research
        </span>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(34px, 5.2vw, 82px)",
            lineHeight: 0.99,
            letterSpacing: "-0.04em",
            margin: "clamp(18px, 2vw, 26px) 0 0",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="You cannot stay in the AI race by consuming AI." />
        </h1>
        <Rise delay={0.5}>
          <p style={{ ...BODY, margin: "clamp(26px, 3vw, 38px) 0 0" }}>
            Somewhere in the last two years, every firm on earth became an
            &ldquo;AI-native company&rdquo; by buying the same subscriptions as
            everyone else, and we think that is a polite fiction. If AI is
            going to sit inside serious security work, then the firm doing that
            work has to practise AI the way it practises security: hands on the
            machinery, findings written down, mistakes owned in public. So we
            launched our own research lab. This page is what it works on, what
            it publishes, and what it is building next.
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── RS-4rev · the library ───────────────────────────────────────────── */

function Library() {
  const hasStandard = researchStandardExists();
  const entries = LIBRARY.filter((e) => !e.reserved) as Extract<
    (typeof LIBRARY)[number],
    { reserved: false }
  >[];
  const reservedCount = LIBRARY.length - entries.length;

  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="The library" />
        <h2 style={H2}>
          <SplitText text="Four questions we are working on." />
        </h2>

        <Rise delay={0.3}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              margin: "clamp(26px, 3vw, 38px) 0 clamp(36px, 4.5vw, 56px)",
            }}
          >
            <p style={BODY}>{STANDARD_INTRO}</p>
            {/* Renders as a link ONLY when the artefact exists at build. */}
            {hasStandard ? (
              <a
                href={RESEARCH_STANDARD_PATH}
                className="bl-email-link"
                style={STANDARD_LINK}
              >
                The Birchlogic Research Standard, PDF →
              </a>
            ) : (
              <span style={{ ...STANDARD_LINK, color: "var(--bl-fg3)" }}>
                The Birchlogic Research Standard · publishing with the first
                entry
              </span>
            )}
          </div>
        </Rise>

        {/* A–Z rail (the Apple-contacts pattern) beside the entries. */}
        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(280px, 1fr)",
            gap: "clamp(20px, 3vw, 44px)",
            alignItems: "start",
          }}
        >
          <AlphaRail letters={entries.map((e) => e.letter)} />

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
            {entries.map((e, i) => (
              <Rise
                key={e.title}
                as="li"
                delay={i * 0.05}
                id={`entry-${e.letter}`}
                style={{
                  background: "var(--bl-ink2)",
                  padding: "clamp(24px, 3vw, 36px)",
                  scrollMarginTop: "calc(var(--bl-nav-h) + 24px)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(19px, 1.8vw, 26px)",
                    lineHeight: 1.22,
                    letterSpacing: "-0.018em",
                    color: "var(--bl-fg)",
                    margin: "0 0 12px",
                  }}
                >
                  {e.title}
                </h3>
                <p style={{ ...BODY, fontSize: "clamp(14px, 1.1vw, 16px)" }}>
                  {e.abstract}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    color: "var(--bl-accent-research)",
                    margin: "14px 0 0",
                  }}
                >
                  Status · {e.status}
                </p>
              </Rise>
            ))}

            {/* The two reserved slots. Visibly held, never faked. */}
            {reservedCount > 0 && (
              <Rise
                as="li"
                delay={entries.length * 0.05}
                style={{
                  background: "var(--bl-ink2)",
                  padding: "clamp(24px, 3vw, 36px)",
                  borderTop: "1px dashed var(--bl-rule2)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9.5,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--bl-fg3)",
                  }}
                >
                  {reservedCount} reserved
                </span>
                <p
                  style={{
                    ...BODY,
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    color: "var(--bl-fg3)",
                    marginTop: 10,
                  }}
                >
                  {RESERVED_LINE}
                </p>
              </Rise>
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}

function AlphaRail({ letters }: { letters: string[] }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <nav
      aria-label="Jump to entry"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "sticky",
        top: "calc(var(--bl-nav-h) + 20px)",
      }}
    >
      {alphabet.map((l) => {
        const live = letters.includes(l);
        return live ? (
          <a
            key={l}
            href={`#entry-${l}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.08em",
              color: "var(--bl-accent-research)",
              textDecoration: "none",
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {l}
          </a>
        ) : (
          <span
            key={l}
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.08em",
              color: "var(--bl-rule2)",
              lineHeight: 1.5,
            }}
          >
            {l}
          </span>
        );
      })}
    </nav>
  );
}

/* ── RS-3 · the workbench, now the anchor at the bottom ──────────────── */

const AGENT_WORK = [
  "Evidence collection",
  "Policy currency",
  "Control drift monitoring",
  "Questionnaire first drafts",
];
const HUMAN_WORK = [
  "Scope",
  "Judgment",
  "The auditor conversation",
  "The signature",
];

function Workbench() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="The workbench" />
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(18px, 1.9vw, 26px)",
            letterSpacing: "-0.02em",
            color: "var(--bl-fg2)",
            margin: "0 0 12px",
          }}
        >
          Everything above feeds one machine.
        </p>
        <h2 style={H2}>
          <SplitText text="What the agents do, and what they will never do." />
        </h2>

        <Rise delay={0.35}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              margin: "clamp(28px, 3.4vw, 44px) 0 clamp(36px, 4.5vw, 56px)",
            }}
          >
            <p style={BODY}>
              The agents do the work that eats a security team alive: evidence
              collection across your stack, policy sets that stay current
              instead of going stale between audits, control monitoring that
              notices drift the week it happens rather than the week the
              auditor does, and first drafts of the two hundred questionnaire
              answers every enterprise deal now demands. That work runs
              continuously, which is what makes a serious programme affordable
              at a price where our competitors can only offer you a few hours
              of somebody&rsquo;s month.
            </p>
            <p style={BODY}>
              What the agents will never do is decide what matters. Scope,
              judgment, the conversation with the auditor when they push back,
              the call on which of forty red flags is the one that counts, and
              the signature on anything that leaves the building: that stays
              with a person whose name is on it, in every engagement, with no
              exceptions, because we have read enough machine-generated
              compliance work to know exactly what it is worth without a senior
              reader.
            </p>
            <p style={{ ...BODY, color: "var(--bl-fg)" }}>
              And so you have it from us rather than from a sales call: the
              workbench does not make junior work senior. It removes the volume
              work so that senior time goes where senior time matters. A firm
              telling you its AI replaces judgment is telling you something
              about its judgment.
            </p>
          </div>
        </Rise>

        <Rise delay={0.42}>
          <LayerDiagram />
        </Rise>
      </div>
    </section>
  );
}

/** Agent layer over human layer, one line connecting them. Ink on paper. */
function LayerDiagram() {
  return (
    <figure
      style={{
        margin: 0,
        border: "1px solid var(--bl-rule)",
        background: "var(--bl-ink2)",
        padding: "clamp(24px, 3vw, 40px)",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      <LayerRow label="Agent layer · volume" items={AGENT_WORK} />
      <div
        aria-hidden="true"
        style={{
          width: 1,
          height: 34,
          background: "var(--bl-accent)",
          margin: "0 auto",
        }}
      />
      <LayerRow label="Human layer · judgment" items={HUMAN_WORK} solid />
    </figure>
  );
}

function LayerRow({
  label,
  items,
  solid = false,
}: {
  label: string;
  items: string[];
  solid?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <figcaption
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--bl-fg3)",
        }}
      >
        {label}
      </figcaption>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 8,
        }}
      >
        {items.map((i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "11px 13px",
              background: solid ? "var(--bl-bone)" : "var(--bl-ink)",
              color: solid ? "var(--bl-bone-fg)" : "var(--bl-fg2)",
              border: solid
                ? "1px solid var(--bl-bone)"
                : "1px dashed var(--bl-rule2)",
            }}
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── RS-7 · the memory layer ─────────────────────────────────────────── */

function MemoryLayer() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="03" label="What we are building" />
        <h2 style={H2}>
          {/* GATED 6.6 · renamed when christened. */}
          <SplitText text={`Next: ${MEMORY_LAYER_NAME}.`} />
        </h2>

        <Rise delay={0.35}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              margin: "clamp(28px, 3.4vw, 44px) 0 clamp(32px, 4vw, 48px)",
            }}
          >
            <p style={BODY}>
              Enterprises are pouring serious money into having their own AI,
              and at the end of it most of them are running the same model,
              trained on the same data, through the same harness as everyone
              else. The capability is real and it is everywhere, which is
              exactly the problem: when every firm&rsquo;s outputs come from the
              same intelligence, no firm&rsquo;s outputs sound like the firm.
              There is no individuality left in what comes out, no self, and
              for a professional organisation whose entire value is how{" "}
              <em>its</em> people think, that should be alarming.
            </p>
            <p style={BODY}>
              Because what makes your firm&rsquo;s work yours was never the
              model. It is the judgment of your senior people, the way your
              firm argues, the precedents it reaches for, what it refuses to
              say, the know-how that walks out of the building every time an
              expert retires. No amount of spend on your own AI captures any of
              that today.
            </p>
            <p style={BODY}>
              So we are building a memory layer: a system that captures expert
              and organisational knowledge and sits in front of any model you
              choose, frontier or your own, so that the outputs carry your
              firm&rsquo;s identity at your experts&rsquo; level. Not another
              model. A memory that makes whichever model you use produce work
              that could only have come from you.
            </p>
            <p style={{ ...BODY, color: "var(--bl-fg)" }}>
              We think that matters more than owning your own AI, in a world
              where intelligence itself is being commoditised. The intelligence
              is becoming a utility. The identity is becoming the asset.
            </p>
            <p style={BODY}>
              It grew out of our work on judgment in regulated decision
              functions, and it is in build now.
            </p>
          </div>
        </Rise>

        <Rise delay={0.42}>
          <WaitlistForm tag={WAITLIST_TAG} />
        </Rise>
      </div>
    </section>
  );
}

/* ── RS-8 · the lab ──────────────────────────────────────────────────── */

function Lab() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="The lab" />
        <h2 style={H2}>
          <SplitText text="Delhi builds. Singapore listens." />
        </h2>
        <Rise delay={0.35}>
          <p style={{ ...BODY, margin: "clamp(26px, 3vw, 38px) 0 0" }}>
            The lab works out of Delhi and Singapore, and the second of those
            is not an administrative fact. Singapore is where the rules for
            regulated AI are being written fastest right now, with MAS drafting
            AI risk guidelines, the MindForge handbook already published, and
            IMDA circling agentic systems, and we would rather build
            governance-grade infrastructure next door to the people writing the
            rulebook than read about it from a distance. If your regulator is
            going to ask hard questions about AI in the next two years, there is
            a fair chance the question gets drafted within a kilometre of our
            Singapore office.
          </p>
        </Rise>

        <Rise delay={0.42}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "clamp(28px, 3.4vw, 40px) 0 0",
              display: "flex",
              gap: "clamp(24px, 4vw, 64px)",
              flexWrap: "wrap",
            }}
          >
            {OFFICES.map((o) => (
              <li key={o.city}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "var(--bl-fg)",
                  }}
                >
                  {o.city}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    lineHeight: 1.6,
                    color: "var(--bl-fg3)",
                    marginTop: 4,
                    maxWidth: 280,
                  }}
                >
                  {/* GATED 6.1 · street addresses ship on approval. */}
                  {SHOW_STREET_ADDRESSES ? o.address : o.region}
                </span>
              </li>
            ))}
          </ul>
        </Rise>
      </div>
    </section>
  );
}

/* ── shared ──────────────────────────────────────────────────────────── */

const SECTION: React.CSSProperties = {
  background: "var(--bl-section-veil)",
  color: "var(--bl-fg)",
  padding: "var(--bl-section-gap) var(--bl-page-pad)",
};

const H2: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: "clamp(28px, 3.8vw, 58px)",
  lineHeight: 1.05,
  letterSpacing: "-0.032em",
  margin: 0,
  maxWidth: "var(--bl-heading-wide)",
};

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(15px, 1.25vw, 18px)",
  lineHeight: 1.7,
  color: "var(--bl-fg2)",
  margin: 0,
  maxWidth: "var(--bl-text-wide)",
};

const STANDARD_LINK: React.CSSProperties = {
  alignSelf: "flex-start",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.06em",
  color: "var(--bl-accent-research)",
  textDecoration: "none",
  borderBottom: "1px solid currentColor",
  paddingBottom: 3,
};
