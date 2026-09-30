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
            <FounderPanel name="Jaskaran Singh" role="Co-founder" portrait="/jaskaran-avatar.png">
              <p style={BODY}>
                Jaskaran has spent the better part of a decade as an enterprise
                AI architect, accumulating field exposure across something on
                the order of fifteen large enterprise deployments in financial
                services, healthcare, and industrial domains.
              </p>
              <p style={BODY}>
                Earlier in his career, he built and deployed explainable and
                responsible AI systems as the Enterprise Architect for the
                insurance sector across the United States and Canada, and he
                consulted the Dutch government on responsible and explainable AI
                policy in 2021, which is the precise category of
                regulator-grade explainability the EU AI Act is now mandating
                across the European market.
              </p>
              <p style={BODY}>
                Watching enterprise AI deployments fail at the same point, in
                the same way, across enough institutions to remove any
                reasonable doubt that the problem was the runtime layer rather
                than the model, is what made the category visible.
              </p>
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
  {
    claim:
      "Enterprise Architect for the insurance sector across the United States and Canada",
    note: "Founder credential, prior role",
  },
  {
    year: "2021",
    claim:
      "Dutch government advisory on responsible and explainable AI policy",
    note: "Founder credential, prior role",
  },
  {
    claim:
      "Fifteen large enterprise AI deployments across financial services, healthcare, and industrial domains",
    note: "Founder credential, prior role",
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

/** A group label node that interrupts the timeline spine. */
function TimelineGroupLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 16,
        paddingLeft: "clamp(40px, 5vw, 64px)",
        marginBottom: "clamp(20px, 2.8vw, 32px)",
        marginTop: "clamp(40px, 5vw, 60px)",
      }}
    >
      {/* Diamond node on the spine */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "calc(clamp(40px, 5vw, 64px) / 2 - 7px)",
          width: 14,
          height: 14,
          background: "var(--bl-neon)",
          transform: "rotate(45deg)",
          flexShrink: 0,
          boxShadow: "0 0 10px rgba(var(--bl-neon-rgb), 0.5)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--bl-neon)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        style={{ flex: 1, height: 1, background: "var(--bl-rule2)" }}
      />
    </div>
  );
}

/** A single entry on the timeline. */
function TimelineEntry({
  item,
  delay,
  isLast,
}: {
  item: RecordItem;
  delay: number;
  isLast: boolean;
}) {
  return (
    <Rise
      as="li"
      delay={delay}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "clamp(40px, 5vw, 64px) minmax(0, 1fr)",
        paddingBottom: isLast ? 0 : "clamp(22px, 3vw, 36px)",
      }}
    >
      {/* Dot on the spine */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 5 }}>
        <div
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: item.year ? "var(--bl-neon)" : "var(--bl-fg3)",
            boxShadow: item.year
              ? "0 0 8px rgba(var(--bl-neon-rgb), 0.55)"
              : "none",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {item.year && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--bl-neon)",
              fontWeight: 500,
            }}
          >
            {item.year}
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px, 1.15vw, 16px)",
            lineHeight: 1.5,
            color: "var(--bl-fg)",
            fontWeight: 400,
          }}
        >
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="bl-email-link"
              style={{
                color: "var(--bl-fg)",
                textDecoration: "none",
                borderBottom: "1px solid var(--bl-rule2)",
              }}
            >
              {item.claim}
            </a>
          ) : (
            item.claim
          )}
        </span>
        {item.note && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.06em",
              color: "var(--bl-fg3)",
              lineHeight: 1.5,
            }}
          >
            {item.note}
          </span>
        )}
      </div>
    </Rise>
  );
}

function Achievements() {
  const recognition: RecordItem[] = PRESS.map((p) => ({
    year: p.year,
    claim: p.claim,
    note: p.outlet,
    href: p.href,
  }));

  const groups: { label: string; items: RecordItem[] }[] = [
    { label: "Recognition", items: recognition },
    { label: "Founder credentials", items: CREDENTIALS },
    { label: "Built by the firm", items: FIRM },
  ];

  let delayCounter = 0.1;

  return (
    <section style={{ ...SECTION }}>
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

        {/* Timeline wrapper — the vertical neon spine runs the full height */}
        <div
          style={{
            position: "relative",
            marginTop: "clamp(36px, 5vw, 56px)",
          }}
        >
          {/* Spine */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "calc(clamp(40px, 5vw, 64px) / 2 - 1px)",
              top: 0,
              bottom: 0,
              width: 2,
              background:
                "linear-gradient(to bottom, var(--bl-neon) 0%, rgba(var(--bl-neon-rgb), 0.15) 100%)",
            }}
          />

          {groups.map((g) => (
            <div key={g.label}>
              <TimelineGroupLabel label={g.label} />
              <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {g.items.map((item, i) => {
                  const d = delayCounter;
                  delayCounter += 0.04;
                  return (
                    <TimelineEntry
                      key={item.claim}
                      item={item}
                      delay={d}
                      isLast={i === g.items.length - 1}
                    />
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
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
