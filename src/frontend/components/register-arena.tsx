"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import ScrambleText from "@/components/scramble-text";
import {
  openChannelCount,
  registerEvents,
  registrationSourceLabel,
  type RegisterEvent,
} from "@/data/register-events";

const GRID_SPAN: Record<string, string> = {
  "hackathon-12h": "md:col-span-2 lg:col-span-6",
  "cp-contest": "lg:col-span-3",
  "treasure-hunt": "lg:col-span-3",
  "ad-making": "lg:col-span-3",
  technocrat: "lg:col-span-3",
  "pixel-pulse": "md:col-span-2 lg:col-span-6",
};

const TICKER = [
  "REGISTRATION LIVE",
  "12 HOUR HACKATHON",
  "CODE RED",
  "TREASURE HUNT",
  "AD VERSE",
  "CYBER PSYCHOSIS",
  "PIXEL PULSE",
  "受付開始",
  "XORDIUM 5.0 // BIT PATNA",
];

const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
];

const TOTAL_CHANNELS = registerEvents.length;
const OPEN_CHANNELS = openChannelCount();

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

const PROTOCOL = [
  {
    n: "01",
    title: "SELECT",
    body: "Pick the arena you are competing in. One theater per uplink — register again for the others.",
  },
  {
    n: "02",
    title: "UPLINK",
    body: "The button routes you to the official registration page — a Google Form or an external portal. It opens in a fresh tab, nothing to install.",
  },
  {
    n: "03",
    title: "TRANSMIT",
    body: "Fill it fast, hit submit, keep the confirmation screen. That is your seat on the board.",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.5 9.5 9.5 3.5M4.5 3.5h5v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </svg>
  ) : (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M1.5 6.5h9M7 3l3.5 3.5L7 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </svg>
  );
}

function TerminalRow({
  label,
  value,
  n,
  tone = "cyan",
}: {
  label: string;
  value: string;
  n: number;
  tone?: "cyan" | "acid";
}) {
  return (
    <li className="rx-term-line" style={{ "--n": n } as CSSProperties}>
      <span className="rx-term-row">
        <span className="text-white/45">{label}</span>
        <span className="rx-term-lead" aria-hidden="true" />
        <span className={tone === "acid" ? "rx-val-acid" : "rx-val-cyan"}>
          {value}
        </span>
      </span>
    </li>
  );
}

function EventCard({
  event,
  order,
  onBlocked,
}: {
  event: RegisterEvent;
  order: number;
  onBlocked: (event: RegisterEvent) => void;
}) {
  const [pending, setPending] = useState(false);
  const wide = event.wide === true;
  const spanClass = GRID_SPAN[event.slug] ?? "lg:col-span-3";

  function handleClick(clickEvent: MouseEvent<HTMLAnchorElement>) {
    if (!event.formUrl) {
      clickEvent.preventDefault();
      setPending(true);
      onBlocked(event);
      window.setTimeout(() => setPending(false), 700);
    }
  }

  return (
    <a
      href={event.formUrl || "#"}
      target={event.formUrl ? "_blank" : undefined}
      rel={event.formUrl ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className={`rx-card ${wide ? "rx-card--wide" : ""} ${
        pending ? "is-pending" : ""
      } ${spanClass}`}
      style={
        {
          "--acc": event.accent,
          "--i": order,
        } as CSSProperties
      }
    >
      <div className="rx-shake">
        <div className="flex items-start justify-between gap-4">
          <span className="rx-idx">{event.index}</span>
          <span className="rx-tag">{event.tag}</span>
        </div>

        <div className="mt-auto">
          <span className="rx-jp">{event.jp}</span>
          <h3 className="rx-title">
            <ScrambleText text={event.title} delay={220 + order * 110} />
          </h3>
          <p className="rx-blurb">{event.blurb}</p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <span className="rx-cta">
              Uplink
              <ArrowIcon diagonal={Boolean(event.formUrl)} />
            </span>
            <span
              className={`rx-slot ${event.formUrl ? "" : "rx-slot--pending"}`}
            >
              {registrationSourceLabel(event.formUrl)}
            </span>
          </div>
        </div>
      </div>

      {wide && event.ghost ? (
        <span className="rx-ghost" aria-hidden="true">
          {event.ghost}
        </span>
      ) : null}
      <span className="rx-corners rx-corners--a" aria-hidden="true" />
      <span className="rx-corners rx-corners--b" aria-hidden="true" />
      <span className="rx-sweep" aria-hidden="true" />
    </a>
  );
}

export default function RegisterArena() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<{ id: number; name: string } | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const move = (event: PointerEvent) => {
      const bounds = arena.getBoundingClientRect();
      x = event.clientX - bounds.left;
      y = event.clientY - bounds.top;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        arena.style.setProperty("--mx", `${x}px`);
        arena.style.setProperty("--my", `${y}px`);
      });
    };

    arena.addEventListener("pointermove", move);
    return () => {
      arena.removeEventListener("pointermove", move);
      if (frame) cancelAnimationFrame(frame);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  function handleBlocked(event: RegisterEvent) {
    setToast({ id: Date.now(), name: event.title });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3600);
  }

  return (
    <div className="rx-arena" ref={arenaRef}>
      <div className="rx-tape" aria-hidden="true" />

      {/* ================= HERO ================= */}
      <header className="rx-shell rx-hero">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="rx-eyebrow">
              // Xordium 5.0 — intake terminal — 受付
            </p>

            <div className="mt-4">
              <span className="rx-outline">Event</span>
              <h1 className="rx-glitch" data-text="REGISTRATION">
                REGISTRATION
              </h1>
            </div>

            <p className="rx-lede">
              {NUMBER_WORDS[TOTAL_CHANNELS] ?? TOTAL_CHANNELS} arenas are live.
              Pick your theater, hit uplink, and the official registration page
              opens in a new tab. No accounts, no queue — just coordinates.
            </p>
          </div>

          <div className="relative mt-8 lg:col-span-5 lg:mt-0 lg:pb-2">
            <span className="rx-stamp">Access granted</span>
            <div className="rx-term mt-5 p-4 sm:p-5">
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                <span className="rx-live-dot" aria-hidden="true" />
                uplink monitor
                <span className="rx-caret">▌</span>
              </p>
              <ul className="space-y-2">
                <TerminalRow label="CHANNEL" value="EXTERNAL FORMS" n={0} />
                <TerminalRow label="CLEARANCE" value="GUEST / OPEN" n={1} />
                <TerminalRow
                  label="TRACKS"
                  value={`${pad2(TOTAL_CHANNELS)} ONLINE`}
                  n={2}
                />
                <TerminalRow
                  label="UPLINKED"
                  value={`${pad2(OPEN_CHANNELS)} / ${pad2(TOTAL_CHANNELS)}`}
                  n={3}
                  tone="acid"
                />
                <TerminalRow label="ROUTING" value="NEW TAB" n={4} />
                <TerminalRow label="STATUS" value="● LIVE" n={5} tone="acid" />
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* ================= TICKER ================= */}
      <div className="rx-marquee" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="rx-marquee__seg" key={copy}>
            {Array.from({ length: 4 }).flatMap((_, block) =>
              TICKER.map((phrase) => (
                <span key={`${copy}-${block}-${phrase}`}>
                  {phrase}
                  <i className="rx-marquee__dot">◆</i>
                </span>
              )),
            )}
          </div>
        ))}
      </div>

      {/* ================= GRID ================= */}
      <main className="rx-shell rx-grid-section">
        <div className="rx-head">
          <span className="rx-head-num">02</span>
          <h2 className="rx-head-title">
            Choose your <em>theater</em>
          </h2>
          <span className="rx-head-rule" aria-hidden="true" />
          <span className="rx-head-meta">
            {pad2(OPEN_CHANNELS)} / {pad2(TOTAL_CHANNELS)} channels open
          </span>
        </div>

        <div className="rx-grid">
          {registerEvents.map((event, index) => (
            <EventCard
              key={event.slug}
              event={event}
              order={index}
              onBlocked={handleBlocked}
            />
          ))}
        </div>
      </main>

      {/* ================= PROTOCOL ================= */}
      <section className="rx-shell rx-protocol">
        <div className="rx-head">
          <span className="rx-head-num">03</span>
          <h2 className="rx-head-title">
            Intake <em>protocol</em>
          </h2>
          <span className="rx-head-rule" aria-hidden="true" />
          <span className="rx-head-meta">Read before transmit</span>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {PROTOCOL.map((step, index) => (
            <article
              key={step.n}
              className="rx-step"
              style={{ "--i": index } as CSSProperties}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="rx-step-num">{step.n}</span>
                <span className="rx-step-title">{step.title}</span>
              </div>
              <p className="rx-step-body">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="rx-outro">
          <p className="rx-outro-note">
            Each theater keeps its own registration link. Submitting twice will
            not buy you a second seat. Stuck mid-transmission? Open a support
            ticket and a crew operator will answer.
          </p>
          <div className="rx-outro-actions flex flex-wrap gap-2">
            <Link href="/events" className="rx-btn-acid">
              Full events directory
              <ArrowIcon />
            </Link>
            <Link href="/support" className="rx-btn-ghost">
              Open support channel
              <ArrowIcon diagonal />
            </Link>
          </div>
        </div>
      </section>

      <div className="rx-barcode" aria-hidden="true" />
      <div className="rx-tape rx-tape--red" aria-hidden="true" />

      {/* ================= OVERLAYS ================= */}
      <span className="rx-rail rx-rail--l" aria-hidden="true">
        受付 // sector 05 // intake open // xordium
      </span>
      <span className="rx-rail rx-rail--r" aria-hidden="true">
        do not trust the map // trust the riddle
      </span>
      <div className="rx-scanlines" aria-hidden="true" />
      <div className="rx-scanbar" aria-hidden="true" />
      <div className="rx-grain" aria-hidden="true" />
      <span className="rx-watermark" aria-hidden="true">
        登録
      </span>

      {toast ? (
        <div className="rx-toast" role="status" key={toast.id}>
          <p className="rx-toast-kicker">// uplink refused</p>
          <p className="rx-toast-body">
            The form for <strong>{toast.name}</strong> has not been wired up
            yet. Crew is still patching the channel — check back shortly.
          </p>
        </div>
      ) : null}
    </div>
  );
}
