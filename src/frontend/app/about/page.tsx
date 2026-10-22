import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";

const scale = [
  {
    value: "07",
    label: "Combat arenas — technical, esports, creative and fun tracks under one grid",
  },
  {
    value: "06",
    label: "Engineering depts — CSE, AIML, ECE, EEE, ME and CE unified under single arena infrastructure",
  },
  {
    value: "12h",
    label: "Non-stop uninterrupted compute — the flagship hackathon clock",
  },
  {
    value: "100%",
    label: "Student-crafted — designed, built and run by the club, no agency skin",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page head ─────────────────────────────────────────── */}
      <section className="cx-page-head">
        <div className="cx-page-head-inner">
          <p className="cx-page-kicker">
            Declassified overview // Protocol 2026 // Cycle 05
          </p>
          <h1 className="cx-page-title">
            <span className="cx-glitch" data-text="About Xordium">
              About Xordium
            </span>{" "}
            <span aria-hidden="true" className="text-red-500">
              {"//"}
            </span>{" "}
            <span className="cx-page-jp">概要</span>
          </h1>
          <span className="cx-page-rule" aria-hidden="true" />
          <p className="cx-page-blurb">
            The convergence of open hardware, algorithmic dominance,
            underground cyberpunk culture and esports warfare — staged
            annually at Birla Institute of Technology, Patna.
          </p>
        </div>
      </section>

      {/* ── The event ─────────────────────────────────────────── */}
      <div className="cx-tape cx-tape--red" aria-hidden="true" />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          kicker="The event"
          title="Xordium 5.0"
          blurb="Annual flagship symposium of Club Ignite and the eSports Society — BIT Mesra, Off Campus, Patna."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Manifesto panel */}
          <div className="cx-flag cx-corners">
            <div className="cx-flag-bar">
              <p className="cx-flag-label">Symposium manifesto</p>
              <p className="cx-flag-time">Year 2026</p>
            </div>
            <div className="cx-flag-body">
              <div className="cx-flag-main">
                <blockquote className="cx-about-quote">
                  {"“"}We reject the slide deck and measure the{" "}
                  <span className="text-red-500">solder seam</span>.{"”"}
                </blockquote>
                <p className="cx-about-body">
                  Xordium brings together technology enthusiasts, gamers and
                  creators from across campuses for a week of technical
                  workshops, competitive events, esports tournaments and
                  fun-filled challenges. From coding battles to high-energy
                  gaming arenas and creative contests, every segment is
                  designed to ignite minds and fuel collaboration.
                </p>
                <div className="cx-about-tags">
                  <span className="cx-tag">Technical</span>
                  <span className="cx-tag">Esports</span>
                  <span className="cx-tag">Creative</span>
                  <span className="cx-tag cx-tag--ghost">Workshops</span>
                  <span className="cx-tag cx-tag--ghost">Fun</span>
                </div>
                <div className="cx-flag-actions">
                  <Link href="/events" className="cx-btn cx-btn--acid">
                    Explore arenas →
                  </Link>
                  <Link href="/register" className="cx-btn cx-btn--ghost">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="cx-about-poster cx-corners">
            <Image
              src="/assets/Xordium Banner.jpeg"
              alt="Xordium 5.0 arena banner"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="pointer-events-none"
              priority
            />
            <span className="cx-about-poster-tag">Coming soon</span>
          </div>
        </div>

        {/* Scale telemetry */}
        <div className="cx-about-scale">
          {scale.map((s) => (
            <div key={s.label} className="cx-about-stat cx-corners">
              <p className="cx-about-stat-value">{s.value}</p>
              <p className="cx-about-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The club ──────────────────────────────────────────── */}
      <div className="cx-tape cx-tape--neon" aria-hidden="true" />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          kicker="The operators"
          title="Club Ignite"
          blurb="Student-run technical club and esports society of BIT Patna — the guild behind the grid."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="cx-panel cx-corners cx-about-club">
            <p className="cx-about-club-kicker">// Ignite</p>
            <h3 className="cx-about-club-title">Technical wing</h3>
            <p className="cx-about-body">
              Club Ignite is the engineering collective of BIT Patna —
              workshops, hackathons, open-source sprints and project build
              nights run entirely by students. Ignite owns the technical
              arenas of Xordium: the 12-hour hackathon, competitive
              programming, the Gen AI lab and the Technocrat crown.
            </p>
            <ul className="cx-about-list">
              <li>Hands-on workshops and build nights across the year</li>
              <li>Hackathon and CP infrastructure for the whole campus</li>
              <li>Open-source contributions and project showcases</li>
            </ul>
          </div>

          <div className="cx-panel cx-corners cx-about-club">
            <p className="cx-about-club-kicker">// Esports Society</p>
            <h3 className="cx-about-club-title">Arena wing</h3>
            <p className="cx-about-body">
              The eSports Society runs the competitive gaming circuits —
              LAN tournaments, squad brackets and the mainstage arena.
              Together with Ignite, it forms the dual-guild structure
              behind Xordium: code on one side, controllers on the other,
              one grid to run them both.
            </p>
            <ul className="cx-about-list">
              <li>LAN tournament ops and squad bracket management</li>
              <li>Mainstage production for finals night</li>
              <li>Cross-campus competitive circuits year-round</li>
            </ul>
          </div>
        </div>

        <div className="cx-about-contact">
          <p className="cx-about-contact-label">// Ping the comms channel</p>
          <div className="cx-about-contact-row">
            <a href="mailto:ignite@bitmesra.ac.in" className="cx-contact">
              ✉ ignite@bitmesra.ac.in
            </a>
            <a
              href="https://www.instagram.com/ignite_bitp"
              target="_blank"
              rel="noreferrer"
              className="cx-contact"
            >
              [a] Instagram ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="cx-about-cta cx-corners">
          <div>
            <p className="cx-sec-kicker">Uplink open</p>
            <h2 className="cx-about-cta-title">
              Prepare your deck for 2026
            </h2>
          </div>
          <div className="cx-flag-actions">
            <Link href="/register" className="cx-btn cx-btn--acid">
              Register →
            </Link>
            <Link href="/events" className="cx-btn cx-btn--ghost">
              Explore tracks
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
