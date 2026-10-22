import Image from "next/image";
import Link from "next/link";
import HomepageCountdown from "@/components/homepage-countdown";
import FeaturedSection from "@/components/featured-section";
import HomepageCarousel from "@/components/homepage-carousel";
import SectionHeading from "@/components/section-heading";
import TimetableSection from "@/components/timetable-section";
import { BROCHURE_URL, heroStats, tickerKeywords } from "@/data/site-config";

function Ticker() {
  // Duplicated list so the -50% marquee loop is seamless.
  const items = [...tickerKeywords, ...tickerKeywords];
  return (
    <div className="cx-ticker" aria-hidden="true">
      <div className="cx-ticker-track">
        {items.map((word, i) => (
          <span key={`${word}-${i}`} className="cx-ticker-item">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO — pure web-element takeover (no imagery) */}
      <section className="cx-hero min-h-svh">
        <div className="cx-hero-grid" aria-hidden="true" />
        <div className="cx-hero-floor" aria-hidden="true" />
        <div className="cx-hero-glow cx-hero-glow--acid" aria-hidden="true" />
        <div className="cx-hero-glow cx-hero-glow--danger" aria-hidden="true" />
        <div className="cx-hero-radar" aria-hidden="true">
          <span className="cx-hero-radar-sweep" />
          <span className="cx-hero-radar-core" />
        </div>
        <span className="cx-hero-ghost" aria-hidden="true">
          Xordium
        </span>
        <div className="cx-scanlines" aria-hidden="true" />
        <div className="cx-grain" aria-hidden="true" />
        <span className="cx-hero-rail cx-hero-rail--l" aria-hidden="true">
          25.59556°N // 85.08639°E — BIT PATNA // NODE-05
        </span>
        <span className="cx-hero-rail cx-hero-rail--r" aria-hidden="true">
          SYS.ONLINE // UPLINK STABLE // XORDIUM CORE v5.0
        </span>

        <div className="cx-hero-inner">
          <div className="cx-hero-status cx-rise" style={{ animationDelay: "0ms" }}>
            <span className="cx-hero-chip cx-hero-chip--live">
              <span className="cx-status-dot" aria-hidden="true" />
              Sys.online
            </span>
            <span className="cx-hero-chip">// Encrypted channel</span>
            <span className="cx-hero-chip">Node-05 // BIT Patna</span>
          </div>
          <p
            className="cx-hero-kicker cx-rise"
            style={{ animationDelay: "80ms" }}
          >
            ■ Birla Institute of Technology // Ignite × Esports
          </p>
          <h1
            className="cx-hero-title cx-rise"
            style={{ animationDelay: "160ms" }}
          >
            <span className="cx-glitch" data-text="Xordium">
              Xordium
            </span>{" "}
            <span className="cx-hero-5">5.0</span>
          </h1>
          <p
            className="cx-hero-sub cx-rise"
            style={{ animationDelay: "240ms" }}
          >
            Year 2026 // Flagship technical symbiosis × premier esports arena
          </p>
          <div className="cx-hero-log cx-rise" style={{ animationDelay: "300ms" }} aria-hidden="true">
            <div>
              &gt; boot xordium.core v5.0 … OK
            </div>
            <div>
              &gt; arena grid armed — awaiting operators
              <span className="cx-hero-cursor" />
            </div>
          </div>
          <p
            className="cx-hero-blurb cx-rise"
            style={{ animationDelay: "360ms" }}
          >
            Where cybernetic intellect confronts elite esports execution. A
            week of inter-collegiate competition — showcasing the pinnacle of
            collegiate esports and raw intellectual horsepower.
          </p>
          <div className="cx-hero-barcode cx-rise" style={{ animationDelay: "400ms" }} aria-hidden="true" />
          <div className="mt-6 cx-rise" style={{ animationDelay: "440ms" }}>
            <HomepageCountdown caption="T-minus to arena lockdown" />
          </div>
          <div
            className="cx-hero-cta cx-rise"
            style={{ animationDelay: "520ms" }}
          >
            <Link href="/register" className="cx-btn cx-btn--acid">
              Enter the arena ↗
            </Link>
            <Link href="/events" className="cx-btn cx-btn--ghost">
              Explore events →
            </Link>
            {BROCHURE_URL ? (
              <a
                href={BROCHURE_URL}
                className="cx-btn cx-btn--ghost"
                target="_blank"
                rel="noreferrer"
              >
                ↓ Brochure [PDF]
              </a>
            ) : null}
          </div>
          <div
            className="cx-stats cx-rise"
            style={{ animationDelay: "600ms" }}
          >
            {heroStats.map((s) => (
              <div key={s.label} className="cx-stat">
                <span className="cx-stat-v">{s.value}</span>
                <span className="cx-stat-l">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="cx-hero-telemetry cx-rise" style={{ animationDelay: "680ms" }} aria-hidden="true">
          <h2>Uplink telemetry</h2>
          <dl>
            <div>
              <dt>Coord</dt>
              <dd>25.59 / 85.08</dd>
            </div>
            <div>
              <dt>Ping</dt>
              <dd>12 ms</dd>
            </div>
            <div>
              <dt>Signal</dt>
              <dd className="cx-hero-signal">
                <i /><i /><i /><i /><i /><i /><i /><i /><i />
              </dd>
            </div>
            <div>
              <dt>Threat</dt>
              <dd style={{ color: "var(--color-flux)" }}>Amber</dd>
            </div>
          </dl>
        </aside>

        <Ticker />
      </section>

      {/* FEATURED */}
      <FeaturedSection />

      <div className="cx-tape cx-tape--red" aria-hidden="true" />

      {/* ARCHIVES */}
      <HomepageCarousel />

      <div className="cx-tape cx-tape--neon" aria-hidden="true" />

      {/* SCHEDULE */}
      <TimetableSection />

      {/* VENUE — geospatial HUD */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          kicker="Campus geospatial node"
          title="Birla Institute of Technology"
          blurb="Patna campus grid — the arena floor for Xordium 5.0. Ping the comms channel if you get lost in the campus."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="cx-panel cx-corners flex flex-col justify-center gap-4 p-6">
            <div>
              <p className="font-display text-2xl font-black uppercase tracking-wide">
                Patna Campus
              </p>
              <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-white/70">
                Birla Institute of Technology, Patna, Bihar 800014
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="mailto:ignite@bitmesra.ac.in" className="cx-contact">
                ✉ ignite@bitmesra.ac.in
              </a>
              <a
                href="https://www.instagram.com/ignite_bitp"
                target="_blank"
                rel="noreferrer"
                className="cx-contact"
              >
                [@] Instagram ↗
              </a>
            </div>
          </div>
          <div className="cx-venue cx-corners">
            <Image
              src="/assets/treasure-hunt.jpg"
              alt="Xordium arena floor — past campaign photo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="cx-venue-cross" aria-hidden="true" />
            <span className="cx-venue-coords">
              <span className="cx-status-dot" aria-hidden="true" />
              25.59556, 85.08639
            </span>
            <div className="cx-scanlines" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div className="cx-tape" aria-hidden="true" />

      {/* CLOSER */}
      <section className="cx-closer">
        <div className="cx-scanlines" aria-hidden="true" />
        <p className="cx-closer-kicker">// Comms endpoint — channel open</p>
        <h2 className="cx-closer-title">
          <span className="cx-glitch" data-text="Enter the arena">
            Enter the arena
          </span>
        </h2>
        <p className="cx-closer-sub">
          Registration uplink is live. Slot allocation closes when the clock
          hits zero — transmit before the gateway seals.
        </p>
        <div className="cx-closer-cta">
          <Link
            href="/register"
            className="cx-btn cx-btn--acid cx-btn--lg"
          >
            Authenticate & register now ↗
          </Link>
          <Link
            href="https://www.instagram.com/ignite_bitp"
            target="_blank"
            rel="noreferrer"
            className="cx-btn cx-btn--ghost"
          >
            Follow // Instagram
          </Link>
        </div>
      </section>
    </>
  );
}
