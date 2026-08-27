import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { MagButton } from "../components/primitives/MagButton";
import { SplitText } from "../components/primitives/SplitText";
import { ClientMarquee } from "../components/home/ClientMarquee";
import { SprintsTable } from "../components/services/SprintsTable";
import { PERMISSION_LINE } from "../lib/clients";
import {
  FOUNDING_PLACES_TAKEN,
  FOUNDING_PLACES_TOTAL,
  FOUNDING_RATE,
  FULL_RATE,
  PRICE_BLOCK,
  READ_MECHANIC,
  READ_MECHANIC_COPY,
} from "../lib/start-config";
import { pageMeta } from "../lib/seo";

// ST-8
export const metadata = pageMeta({
  title: "Someone with power is about to read your security.",
  description:
    "We read it first, then we run it. Senior-led, agent-run security programmes. Fixed scope, fixed dates, first-pass acceptance as the contracted outcome.",
  path: "/start",
  bare: true,
});

/**
 * /start · the conversion page.
 *
 * Deliberately NOT in the nav or footer. Every campaign lands here — cold
 * email, LinkedIn, the one-pager QR, outbound DMs — while the homepage keeps
 * doing quiet diligence work. Two different jobs.
 *
 * Sections in page order: ST-1 moment, ST-2 bets, ST-3 proof, ST-4 work,
 * ST-5 destination (+ price block and Read mechanic), ST-6 terms, ST-7 close.
 */
export default function StartPage() {
  return (
    <>
      <Moment />
      <Bets />
      <Proof />
      {/* ST-4 · the same nine-engagement table the services page renders,
          from the one canonical module. */}
      <SprintsTable />
      <Destination />
      <Terms />
      <Close />
    </>
  );
}

/* ── ST-1 ────────────────────────────────────────────────────────────── */

function Moment() {
  return (
    <section
      style={{
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        padding:
          "calc(var(--bl-top-offset) + clamp(70px, 9vw, 130px)) var(--bl-page-pad) clamp(80px, 10vw, 140px)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(36px, 5.6vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            margin: 0,
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="Someone with power is about to read your security." />
        </h1>
        <Rise delay={0.5}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(22px, 2.6vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--bl-fg2)",
              margin: "clamp(16px, 2vw, 24px) 0 0",
            }}
          >
            We read it first. Then we run it.
          </p>
        </Rise>
        <Rise delay={0.62}>
          <p style={{ ...BODY, margin: "clamp(26px, 3vw, 40px) 0 0" }}>
            An enterprise customer&rsquo;s questionnaire. An investor&rsquo;s
            diligence list. A regulator&rsquo;s letter. Security becomes urgent
            the day someone with power reads yours, and most firms discover the
            gap the same day the reader does, which is the most expensive
            possible moment. We exist so you discover it first.
          </p>
        </Rise>
        <Rise delay={0.74}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              marginTop: "clamp(28px, 3.4vw, 44px)",
            }}
          >
            <MagButton href="/contact">Book thirty minutes</MagButton>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                letterSpacing: "0.04em",
                color: "var(--bl-fg3)",
              }}
            >
              We will both know inside thirty minutes whether this is a fit.
            </span>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ── ST-2 ────────────────────────────────────────────────────────────── */

const BETS = [
  {
    n: "1",
    lead: "We are seriously fast.",
    body: "The work most teams budget quarters for, we deliver in weeks, because we have done it enough times to know exactly where the time goes.",
  },
  {
    n: "2",
    lead: "We cost less, without the compromise.",
    body: "Our teams are part human, part AI agents we built ourselves, which brings the cost down while the judgment stays senior, reading every word.",
  },
  {
    n: "3",
    lead: "We take complete accountability.",
    body: "A named senior partner answers for every outcome, to your auditor, your regulator and your board, and we sign the heavy paperwork to prove it.",
  },
];

function Bets() {
  return (
    <section style={SECTION}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="The bets" />
        <h2 style={H2}>
          <SplitText text="The three bets you are making by working with us." />
        </h2>

        {/* Numbered rows, not cards, per the pack's design note. */}
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "clamp(36px, 5vw, 56px) 0 0",
            borderTop: "1px solid var(--bl-rule)",
          }}
        >
          {BETS.map((b, i) => (
            <Rise
              key={b.n}
              as="li"
              delay={i * 0.05}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(56px, 90px) minmax(260px, 1fr)",
                gap: "clamp(20px, 4vw, 56px)",
                padding: "clamp(26px, 3.2vw, 40px) 0",
                borderBottom: "1px solid var(--bl-rule)",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "clamp(30px, 3.4vw, 52px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.045em",
                  color: "var(--bl-accent)",
                }}
              >
                {b.n}
              </span>
              <span>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "clamp(18px, 1.7vw, 24px)",
                    letterSpacing: "-0.015em",
                    color: "var(--bl-fg)",
                    marginBottom: 8,
                  }}
                >
                  {b.lead}
                </strong>
                <span style={{ ...BODY, display: "block" }}>{b.body}</span>
              </span>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── ST-3 ────────────────────────────────────────────────────────────── */

function Proof() {
  return (
    <section style={{ ...SECTION, borderTop: "1px solid var(--bl-rule)" }}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="02" label="Proof" />
        <h2 style={H2}>
          <SplitText text="The same bets, placed before you, by people who checked." />
        </h2>
        <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
          <ClientMarquee variant="standalone" />
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11.5,
              color: "var(--bl-fg3)",
              margin: "14px 0 0",
            }}
          >
            {PERMISSION_LINE}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── ST-5 ────────────────────────────────────────────────────────────── */

function Destination() {
  return (
    <section style={{ ...SECTION, borderTop: "1px solid var(--bl-rule)" }}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="The destination" />

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(20px, 2.2vw, 30px)",
            letterSpacing: "-0.02em",
            color: "var(--bl-fg2)",
            margin: "0 0 12px",
          }}
        >
          But the sprints end. This is what stays.
        </p>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.8vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-0.038em",
            margin: 0,
          }}
        >
          {/* Section title matches SV-4 and the one-pager exactly. */}
          <SplitText text="The Fractional Security Office." />
        </h2>
        <Rise delay={0.4}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.8vw, 26px)",
              color: "var(--bl-fg2)",
              margin: "14px 0 clamp(26px, 3vw, 38px)",
            }}
          >
            Cybersecurity needs an owner, not another project.
          </p>
        </Rise>

        <Rise delay={0.5}>
          <p style={BODY}>
            Some firms come to us with a known problem, and most come with a
            quieter one: nobody actually owns security, so it lives as the
            CTO&rsquo;s second job and every audit starts again from zero. The
            Security Office is how we fix that for good. A named senior partner
            owns your programme and answers for it. Our agents run the volume
            work underneath, collecting evidence, keeping policies current,
            watching controls for drift and answering the questionnaires, all
            of it continuously rather than in the fortnight before an audit.
            And whatever tools, platforms and OEM licences the programme
            actually needs, we package and run as part of the same engagement,
            so you are never buying a consultant and then five products and
            then finding out that nobody owns the space between them.
          </p>
          <p style={{ ...BODY, color: "var(--bl-fg)", marginTop: 18 }}>
            One line on your budget. One accountable name. It scales with the
            challenge, not with headcount.
          </p>
        </Rise>

        <Rise delay={0.58}>
          <PriceBlock />
        </Rise>
      </div>
    </section>
  );
}

/**
 * ST-5a / ST-5b. Which one renders is a config flag, not an edit.
 *
 * The counter is only drawn when the true number is known. Per the pack:
 * "The counter shows the true number or the block does not ship."
 */
function PriceBlock() {
  const wrap: React.CSSProperties = {
    marginTop: "clamp(32px, 4vw, 48px)",
    padding: "clamp(24px, 3vw, 38px)",
    border: "1px solid var(--bl-accent)",
    background: "rgba(var(--bl-accent-rgb), 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  };

  if (PRICE_BLOCK === "no-price") {
    return (
      <div style={wrap}>
        <p style={{ ...BODY, color: "var(--bl-fg)" }}>
          Tell us your scope on a thirty-minute call and you will have a
          fixed-price proposal in writing within one business day. No day
          rates, no hourly billing, and nothing on the invoice you did not see
          coming.
        </p>
        <ReadMechanic />
      </div>
    );
  }

  return (
    <div style={wrap}>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "clamp(20px, 2.2vw, 30px)",
          letterSpacing: "-0.02em",
          color: "var(--bl-fg)",
          margin: 0,
        }}
      >
        From {FOUNDING_RATE} a month for founding clients.
      </p>
      <p style={BODY}>
        Full rate is {FULL_RATE}. We are opening the Security Office to{" "}
        {FOUNDING_PLACES_TOTAL} companies at the founding rate, because two
        founders can own {FOUNDING_PLACES_TOTAL} programmes properly and we are
        not going to pretend otherwise. Founding clients keep their rate for as
        long as they stay.
      </p>
      {FOUNDING_PLACES_TAKEN !== null && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--bl-accent)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {FOUNDING_PLACES_TAKEN} of {FOUNDING_PLACES_TOTAL} places taken
        </p>
      )}
      <ReadMechanic />
    </div>
  );
}

/** ST-5c · credit or guarantee, per the config flag. */
function ReadMechanic() {
  return (
    <p
      style={{
        ...BODY,
        fontSize: "clamp(14px, 1.1vw, 16px)",
        margin: 0,
        paddingTop: 12,
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      {READ_MECHANIC_COPY[READ_MECHANIC]}
    </p>
  );
}

/* ── ST-6 ────────────────────────────────────────────────────────────── */

function Terms() {
  return (
    <section style={{ ...SECTION, borderTop: "1px solid var(--bl-rule)" }}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="05" label="The terms" />
        <h2 style={H2}>
          <SplitText text="The terms, because they are part of the product." />
        </h2>
        <Rise delay={0.35}>
          <p style={{ ...BODY, marginTop: "clamp(28px, 3.4vw, 40px)" }}>
            We are month-to-month with thirty days&rsquo; notice, and if you
            leave in the first month you keep everything we built. We are not
            designed to be sticky, so when you are ready to bring security
            in-house we will help you hire and hand the programme over
            properly. A fixed-price proposal reaches you in writing within one
            business day of the scoping call. And we take a limited number of
            clients at a time, because this is a senior-led practice and there
            is a real ceiling on how many programmes one partner can own
            without lying about it.
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── ST-7 ────────────────────────────────────────────────────────────── */

function Close() {
  return (
    <section
      style={{
        ...SECTION,
        borderTop: "1px solid var(--bl-rule)",
        textAlign: "center",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <h2
          style={{
            ...H2,
            margin: "0 auto",
            fontSize: "clamp(28px, 4vw, 58px)",
          }}
        >
          <SplitText text="From the day we start, cybersecurity becomes our headache, not yours." />
        </h2>
        <Rise delay={0.4}>
          <p
            style={{
              ...BODY,
              margin: "clamp(24px, 3vw, 36px) auto clamp(30px, 4vw, 44px)",
            }}
          >
            Bring whatever is bugging you to a thirty-minute call and we will
            tell you what we would do and in how many weeks, or point you in
            the right direction and wish you well.
          </p>
        </Rise>
        <Rise delay={0.5}>
          <MagButton href="/contact">Book thirty minutes</MagButton>
        </Rise>
        <Rise delay={0.58}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              letterSpacing: "0.06em",
              color: "var(--bl-fg3)",
              margin: "clamp(24px, 3vw, 34px) 0 0",
            }}
          >
            <a
              href="mailto:karan@birchlogic.com"
              className="bl-email-link"
              style={{ color: "var(--bl-fg2)", textDecoration: "none" }}
            >
              karan@birchlogic.com
            </a>{" "}
            · Delhi · Singapore
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── shared ──────────────────────────────────────────────────────────── */

const SECTION: React.CSSProperties = {
  background: "var(--bl-section-veil)",
  color: "var(--bl-fg)",
  padding: "clamp(90px, 12vw, 160px) var(--bl-page-pad)",
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
