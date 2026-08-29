import Link from "next/link";

import { Anchor } from "../components/primitives/Anchor";
import { Rise } from "../components/primitives/Rise";
import { MagButton } from "../components/primitives/MagButton";
import { SplitText } from "../components/primitives/SplitText";
import { ClientMarquee } from "../components/home/ClientMarquee";
import { CabinetLoop } from "../components/start/CabinetLoop";
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
  title: "The Fractional Security Office",
  description:
    "An entire security department, delivered as one engagement. A named senior partner, our agents underneath, every tool packaged in. From \u20B980,000 a month for founding clients.",
  path: "/start",
});

/**
 * /start · the single-offer page. It sells the Fractional Security Office
 * and nothing else.
 *
 * Reachable from the "For Startups" nav tab, the homepage founder block and
 * the FSO section on /services.
 *
 * Order is ST-9 exactly: ST-1 hero, ST-1a the problem, ST-2 the bets, ST-3
 * proof, ST-4 what the department is, ST-5 the founding offer, ST-5d how it
 * starts, ST-6 terms, ST-7 close.
 *
 * The nine-engagement table used to sit in the middle of this page. ST-9 is
 * explicit that it "appears nowhere on this page; it lives on /services
 * only". A menu of nine alternatives in the middle of a single-offer page
 * competes with the offer instead of supporting it.
 */
export default function StartPage() {
  return (
    <>
      <Moment />
      <Problem />
      <Bets />
      <Proof />
      <Department />
      <Read />
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
        position: "relative",
        background: "var(--bl-ink)",
        color: "var(--bl-fg)",
        paddingTop: "var(--bl-top-offset)",
      }}
    >
      <div
        className="bl-hero-split"
        style={{
          display: "grid",
          // Narrower than the landing hero's 46/54. The film was made for
          // this space, so the copy yields width to it rather than the
          // other way round.
          gridTemplateColumns: "37fr 63fr",
          // No fixed height. The visual column carries the artwork's own
          // 16:10 and the row takes its height from that, so the film fills
          // its panel exactly and there is no letterbox to disguise. The
          // floor stops the hero collapsing on short viewports.
          minHeight: "min(calc(100vh - var(--bl-top-offset)), 720px)",
        }}
      >
        {/* Conversion panel. Same 46/54 grammar as the landing hero. */}
        <div
          className="bl-hero-panel"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
            padding:
              "clamp(48px, 6vw, 88px) clamp(32px, 4vw, 64px) clamp(48px, 6vw, 88px) var(--bl-page-pad)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(38px, 4.9vw, 82px)",
              lineHeight: 0.98,
              letterSpacing: "-0.038em",
              margin: 0,
            }}
          >
            <SplitText text="The Fractional Security Office." />
          </h1>

          <Rise delay={0.5}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(22px, 2.5vw, 38px)",
                lineHeight: 1.18,
                letterSpacing: "-0.025em",
                color: "var(--bl-accent)",
                margin: "clamp(20px, 2.4vw, 30px) 0 0",
              }}
            >
              Cybersecurity needs an owner, not another project.
            </p>
          </Rise>

          <Rise delay={0.62}>
            <p
              style={{
                ...BODY,
                fontSize: "clamp(16px, 1.35vw, 21px)",
                lineHeight: 1.72,
                maxWidth: "44ch",
                margin: "clamp(28px, 3.4vw, 42px) 0 0",
              }}
            >
              An entire security department, delivered as one engagement: a
              senior partner who answers for it by name, our agents running
              the work underneath, and every tool the department needs,
              packaged in. Built for companies that were never going to hire
              one.
            </p>
          </Rise>

          <Rise delay={0.74}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                flexWrap: "wrap",
                marginTop: "clamp(34px, 4vw, 50px)",
              }}
            >
              <MagButton href="/contact">Book thirty minutes</MagButton>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  color: "var(--bl-fg3)",
                  maxWidth: "30ch",
                  lineHeight: 1.55,
                }}
              >
                We will both know inside thirty minutes whether this is a fit.
              </span>
            </div>
          </Rise>
        </div>

        {/* The cabinet loop · full bleed, hard cut at the seam. Rendered
            live from the original SVG scene rather than the MP4 export, so
            it stays crisp at any panel size. */}
        <div
          className="bl-hero-visual"
          style={{
            minWidth: 0,
            minHeight: 0,
            // The artwork's native ratio. The grid row grows to match, so
            // the scene fits edge to edge with nothing left over.
            aspectRatio: "1600 / 1000",
          }}
        >
          <CabinetLoop />
        </div>
      </div>
    </section>
  );
}

/* ── ST-1a ───────────────────────────────────────────────────────────── */

/**
 * The problem the offer exists for. Two beats: the moment security turns
 * urgent, and the quieter structural reason it was never owned in the first
 * place. The hero used to carry a compressed version of the first beat as
 * its headline; the copy runs at full length here, where it belongs.
 */
function Problem() {
  return (
    <section style={SECTION}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="01" label="The problem" />
        <Rise>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(20px, 2vw, 28px)",
              lineHeight: 1.32,
              letterSpacing: "-0.018em",
              color: "var(--bl-fg)",
              margin: 0,
              maxWidth: "var(--bl-heading-wide)",
            }}
          >
            Security becomes urgent the day someone with power reads yours. An
            enterprise customer&rsquo;s questionnaire, an investor&rsquo;s
            diligence list, a regulator&rsquo;s letter, and most firms discover
            the gap the same day the reader does, which is the most expensive
            possible moment.
          </p>
        </Rise>
        <Rise delay={0.1}>
          <p style={{ ...BODY, marginTop: "clamp(24px, 3vw, 34px)" }}>
            And underneath that moment there is a quieter problem: nobody
            actually owns security. It lives as the CTO&rsquo;s second job, the
            tooling was bought at different times by different people, and
            every audit starts again from zero. Hiring the person who fixes
            this costs sixty lakh to a crore a year, takes six months to find,
            and is more seniority than a fifty-person company can keep busy. So
            the job stays unowned, right up until the day it cannot.
          </p>
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
        <Anchor number="02" label="The bets" />
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
        <Anchor number="03" label="Proof" />
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

/* ── ST-4 · the department, ST-5 · the offer ────────────────────────── */

/**
 * ST-4 · what the department actually is.
 *
 * This block used to be titled "The Fractional Security Office." with the
 * "needs an owner" deck under it. Both moved up to the hero, where ST-1 puts
 * them, so this section carries ST-4's own heading and stops repeating the
 * page title a second time.
 *
 * The lead line "But the sprints end. This is what stays." came off with the
 * nine-engagement table it referred to.
 *
 * Copy is ST-4 verbatim, with one punctuation change: the spec's em dash
 * before "one for DevSecOps" is a comma here, because em dashes are banned
 * in user-facing copy and the list reads the same without it.
 */
function Department() {
  return (
    <section
      style={{
        ...SECTION,
        background: "var(--bl-bone)",
        color: "var(--bl-bone-fg)",
        borderTop: "1px solid var(--bl-rule)",
      }}
    >
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="04" label="The department" inverted />

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.2vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "var(--bl-bone-fg)",
            maxWidth: "var(--bl-heading-wide)",
          }}
        >
          <SplitText text="Everything a security department does. One line on your budget." />
        </h2>

        <Rise delay={0.4}>
          <p style={{ ...BONE_BODY, marginTop: "clamp(26px, 3vw, 38px)" }}>
            Every Fractional Security Office deploys the same way: one
            forward-deployed engineer and one virtual CISO arrive as the fixed
            core, and around them we compose whatever your programme actually
            needs from our bench of specialised agents, one for DevSecOps that
            lives in your pipeline, one for vulnerability management that never
            stops watching, one for incident response that drills your runbook
            instead of letting it rot in a drawer. The agents run the volume
            work continuously: evidence collection, policies that stay current,
            controls watched for drift, the questionnaires answered. The senior
            people carry the judgment and the accountability, and every word
            that leaves the department has been read by someone whose name is
            on it.
          </p>
          <p style={{ ...BONE_BODY, marginTop: 18 }}>
            And whatever tools, platforms and OEM licences the department
            needs, we package and run inside the same engagement, so you are
            never buying a consultant and then five products and then finding
            out that nobody owns the space between them. You scale the
            department up when an audit lands or a deal demands it, and back
            down the month after, because you are paying for a security
            capability, not for headcount that sits there between crises.
          </p>
        </Rise>

        {/* ST-5 · the founding offer sits directly under the description of
            what is being offered. */}
        <Rise delay={0.5}>
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
    background: "rgba(var(--bl-accent-rgb), 0.14)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  };

  if (PRICE_BLOCK === "no-price") {
    return (
      <div style={wrap}>
        <p style={{ ...BONE_BODY, color: "var(--bl-bone-fg)" }}>
          Tell us your scope on a thirty-minute call and you will have a
          fixed-price proposal in writing within one business day. No day
          rates, no hourly billing, and nothing on the invoice you did not see
          coming.
        </p>
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
          color: "var(--bl-bone-fg)",
          margin: 0,
        }}
      >
        From {FOUNDING_RATE} a month for founding clients.
      </p>
      <p style={BONE_BODY}>
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
        color: "var(--bl-fg)",
        marginTop: "clamp(26px, 3vw, 36px)",
        paddingTop: 18,
        borderTop: "1px solid var(--bl-rule2)",
      }}
    >
      {READ_MECHANIC_COPY[READ_MECHANIC]}
    </p>
  );
}

/* ── ST-5d ───────────────────────────────────────────────────────────── */

/**
 * How the engagement opens. This is where ST-5c lands, per ST-5d, rather
 * than inside the price block where it used to sit: the mechanic is about
 * the Read, so it belongs beside the Read.
 */
function Read() {
  return (
    <section style={{ ...SECTION, borderTop: "1px solid var(--bl-rule)" }}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="05" label="How it starts" />
        <h2 style={H2}>
          <SplitText text="It starts with three weeks of reading." />
        </h2>
        <Rise delay={0.35}>
          <p style={{ ...BODY, marginTop: "clamp(28px, 3.4vw, 40px)" }}>
            Every Fractional Security Office opens with the Security Read:
            three weeks in which we read your security programme the way the
            person who will judge it reads it, whether that is your enterprise
            customer&rsquo;s security team, your investor&rsquo;s technical
            diligence, or your regulator. It ends in a working session with
            your team rather than a PDF, with findings in the order the reader
            would raise them and a plan with owners and dates against every
            item. It is how the department learns your company before it starts
            running it, and if the honest answer at the end is that your own
            people can execute the plan without us, we will say so in the room.
          </p>
        </Rise>
        <Rise delay={0.45}>
          <ReadMechanic />
        </Rise>
        <Rise delay={0.55}>
          <p style={{ marginTop: "clamp(22px, 2.6vw, 30px)" }}>
            <Link
              href="/security-read"
              className="bl-email-link"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--bl-accent)",
                textDecoration: "none",
                borderBottom: "1px solid var(--bl-accent)",
                paddingBottom: 2,
              }}
            >
              Everything the Security Read covers →
            </Link>
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── ST-6 ────────────────────────────────────────────────────────────── */

function Terms() {
  return (
    <section style={{ ...SECTION, borderTop: "1px solid var(--bl-rule)" }}>
      <div className="bl-container" style={{ padding: 0 }}>
        <Anchor number="06" label="The terms" />
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

/** Body copy on the inverted (near-black) destination surface. */
const BONE_BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(15px, 1.25vw, 18px)",
  lineHeight: 1.7,
  color: "var(--bl-bone-fg2)",
  margin: 0,
  maxWidth: "var(--bl-text-wide)",
};

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(15px, 1.25vw, 18px)",
  lineHeight: 1.7,
  color: "var(--bl-fg2)",
  margin: 0,
  maxWidth: "var(--bl-text-wide)",
};
