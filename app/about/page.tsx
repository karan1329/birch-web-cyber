import { InnerHero } from "../components/primitives/InnerHero";
import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { MagButton } from "../components/primitives/MagButton";
import { SplitText } from "../components/primitives/SplitText";
import { PRESS } from "../lib/press";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "Birchlogic exists so that the first person to read your security the way a regulator would is on your side of the table. The founders, the record, and the firm.",
  path: "/about",
});

/**
 * AB-1 · About Us. Four blocks:
 *   1. The Foreword, relocated intact from the homepage (HP-5), with the
 *      photograph slot and the press lines.
 *   2. The two founders side by side. Karan's chronology is written;
 *      Jaskaran's panel ships as a styled placeholder awaiting his brief —
 *      the layout is built and the copy slot is deliberately empty rather
 *      than invented.
 *   3. What the firm has built.
 *   4. Close.
 */
export default function AboutPage() {
  return (
    <>
      <InnerHero
        kicker="About Us"
        title="Meet the founders."
        subtitle="Birchlogic exists so that the first person to read your security the way a regulator would is on your side of the table."
      />

      <Founders />
      <Achievements />
      <Close />
    </>
  );
}

/* ── Block 1 · the two founders ──────────────────────────────────────── */

function Founders() {
  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="The founders" />
        <h2 style={H2}>
          <SplitText text="Two people, one bench." />
        </h2>

        <div
          className="bl-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 4vw, 56px)",
            marginTop: "clamp(36px, 5vw, 56px)",
          }}
        >
          <Rise>
            <FounderPanel
              name="Karan Bhandari"
              role="Co-founder"
              portrait="/karan-bhandari-avatar.jpg"
            >
              <p style={BODY}>
                CEH at fifteen, one of the youngest in India at the time. That
                dateline matters less as a credential than as a runway: it is
                the start of a decade spent inside other people&rsquo;s
                security programmes rather than beside them.
              </p>
              <p style={BODY}>
                ISO 27001 inside the Bank of Montreal&rsquo;s CISO office.
                Sovereign security architecture for a department of the
                Netherlands government. Ransomware response for regional
                enterprises. Board-level risk work across six countries.
              </p>
              <p style={BODY}>
                What all of it taught him is the reader&rsquo;s side of the
                table: how a regulator, an auditor or an acquirer actually
                reads a company, in what order, and which seam they find
                first. That is the discipline the firm is built on.
              </p>
            </FounderPanel>
          </Rise>

          <Rise delay={0.08}>
            <FounderPanel name="Jaskaran Singh" role="Co-founder">
              {/* GATED · Phase 6.3. Copy pending Karan's brief — his AI
                  history, his build record, his side of the firm. The panel
                  ships at final layout with the slot visibly empty rather
                  than filled with invented biography. */}
              <div
                style={{
                  border: "1px dashed var(--bl-rule2)",
                  padding: "clamp(20px, 2.6vw, 30px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
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
                  Copy to follow
                </span>
                <p style={{ ...BODY, color: "var(--bl-fg3)" }}>
                  Jaskaran&rsquo;s note is being written in his own words. It
                  will sit here when it is ready.
                </p>
              </div>
            </FounderPanel>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/**
 * Karan's portrait moved here when the opening note was removed. Jaskaran's
 * slot is ruled and empty rather than filled with a stand-in: the page
 * already handles his missing copy that way, and one founder with a face
 * beside one founder with a placeholder face would read worse than two
 * reserved slots.
 */
function FounderPortrait({ src }: { src: string | null }) {
  const box: React.CSSProperties = {
    width: "clamp(84px, 8vw, 112px)",
    aspectRatio: "1 / 1",
    borderRadius: 4,
    overflow: "hidden",
    flexShrink: 0,
  };
  if (!src) {
    return (
      <span
        aria-hidden="true"
        style={{ ...box, border: "1px dashed var(--bl-rule2)" }}
      />
    );
  }
  return (
    <span style={{ ...box, boxShadow: "inset 0 0 0 1px var(--bl-rule)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
    </span>
  );
}

function FounderPanel({
  name,
  role,
  portrait = null,
  children,
}: {
  name: string;
  role: string;
  portrait?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "clamp(24px, 3vw, 36px)",
        border: "1px solid var(--bl-rule)",
        background: "var(--bl-ink2)",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <FounderPortrait src={portrait} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(20px, 1.9vw, 26px)",
            letterSpacing: "-0.018em",
            color: "var(--bl-fg)",
            margin: 0,
          }}
        >
          {name}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--bl-accent)",
          }}
        >
          {role}
        </span>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Block 2 · the record ───────────────────────────────── */

/**
 * The record.
 *
 * Three lanes, kept apart on purpose. Recognition is third-party and dated,
 * so it carries its outlet. The middle lane is founder credentials from
 * prior roles, which is the honest frame for BMO and the Netherlands
 * department: they are not clients of this firm, and the same distinction
 * `lib/clients.ts` draws with its `kind` field applies here. The last lane
 * is what Birchlogic itself has built.
 *
 * Undated entries carry no year rather than an invented one.
 */
type RecordItem = { year?: string; claim: string; note?: string; href?: string };

const CREDENTIALS: RecordItem[] = [
  {
    claim: "ISO 27001 inside the Bank of Montreal's CISO office",
    note: "Founder credential, prior role",
  },
  {
    claim:
      "Sovereign security architecture for a department of the Netherlands government",
    note: "Founder credential, prior role",
  },
  {
    claim: "Ransomware response for regional enterprises",
    note: "Founder credential, prior role",
  },
  {
    claim: "Board-level risk work across six countries",
    note: "Founder credential, prior role",
  },
  {
    year: "2015",
    claim: "Offensive and defensive security practice begins",
    note: "CEH at fifteen, one of the youngest in India at the time",
  },
];

const FIRM: RecordItem[] = [
  {
    year: "2026",
    claim: "The research lab",
    note: "Our own, publishing against a public standard",
  },
  {
    year: "2026",
    claim: "The internal AI workbench",
    note: "Agents that carry the volume work under a senior signature",
  },
  {
    claim: "Singapore practice open",
    note: "Delhi office active; Pte Ltd entity in formation",
  },
];

function RecordRow({ item, delay }: { item: RecordItem; delay: number }) {
  return (
    <Rise
      as="li"
      delay={delay}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(64px, 92px) minmax(0, 1fr)",
        gap: "clamp(18px, 3vw, 44px)",
        padding: "clamp(18px, 2.2vw, 26px) 0",
        borderBottom: "1px solid var(--bl-rule)",
        alignItems: "baseline",
      }}
    >
      <span className="bl-label" style={{ color: "var(--bl-fg3)" }}>
        {item.year ?? ""}
      </span>
      <span style={{ ...BODY, color: "var(--bl-fg)" }}>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="bl-email-link"
            style={{
              color: "var(--bl-fg)",
              textDecoration: "none",
              borderBottom: "1px solid var(--bl-accent)",
            }}
          >
            {item.claim}
          </a>
        ) : (
          item.claim
        )}
        {item.note && (
          <span style={{ display: "block", color: "var(--bl-fg3)", marginTop: 4 }}>
            {item.note}
          </span>
        )}
      </span>
    </Rise>
  );
}

function RecordGroup({
  label,
  items,
}: {
  label: string;
  items: RecordItem[];
}) {
  return (
    <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: "clamp(14px, 1.6vw, 20px)",
        }}
      >
        <span className="bl-label" style={{ color: "var(--bl-fg2)", whiteSpace: "nowrap" }}>
          {label}
        </span>
        <span
          aria-hidden="true"
          style={{ flex: 1, height: 1, background: "var(--bl-rule)" }}
        />
      </div>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: "1px solid var(--bl-rule)",
        }}
      >
        {items.map((it, i) => (
          <RecordRow key={it.claim} item={it} delay={i * 0.04} />
        ))}
      </ol>
    </div>
  );
}

function Achievements() {
  const recognition: RecordItem[] = PRESS.map((p) => ({
    year: p.year,
    claim: p.claim,
    note: p.outlet,
    href: p.href,
  }));

  return (
    <section style={{ ...SECTION,}}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="The record" />
        <h2 style={H2}>
          <SplitText text="The record, dated." />
        </h2>
        <Rise delay={0.3}>
          <p style={{ ...BODY, marginTop: "clamp(20px, 2.4vw, 30px)" }}>
            Recognition is third-party and linked. The middle section is
            credential the founders carry from earlier roles rather than work
            of this firm, and it is labelled that way because footers and
            about pages get read by exactly the people who check.
          </p>
        </Rise>

        <RecordGroup label="Recognition" items={recognition} />
        <RecordGroup label="Founder credentials" items={CREDENTIALS} />
        <RecordGroup label="Built by the firm" items={FIRM} />
      </div>
    </section>
  );
}

/* ── Block 3 · close ─────────────────────────────────────────────────── */

function Close() {
  return (
    <section
      style={{
        ...SECTION,textAlign: "center",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Rise>
          <p
            style={{
              ...BODY,
              fontSize: "clamp(18px, 1.9vw, 26px)",
              color: "var(--bl-fg)",
              maxWidth: "var(--bl-text-wide)",
              margin: "0 auto clamp(32px, 4vw, 44px)",
            }}
          >
            If any of that sounds like the firm you want reading your security,
            the next step is thirty minutes.
          </p>
        </Rise>
        <Rise delay={0.1}>
          <MagButton href="/contact">Book a 30-minute discovery call</MagButton>
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
  fontSize: "clamp(30px, 4vw, 60px)",
  lineHeight: 1.05,
  letterSpacing: "-0.032em",
  margin: 0,
  maxWidth: "var(--bl-heading-wide)",
};

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(15px, 1.2vw, 17px)",
  lineHeight: 1.7,
  color: "var(--bl-fg2)",
  margin: 0,
  maxWidth: "var(--bl-text-body)",
};
