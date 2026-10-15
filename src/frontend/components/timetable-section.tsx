"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import { fetchTimetable, type TimetableEntry } from "@/lib/admin-api";

// Shown when the API is unreachable (e.g. local dev without a database).
const FALLBACK_ENTRIES: TimetableEntry[] = [
  {
    id: "fallback-1",
    day: "Day 01 // Arrival & opening",
    time: "09:00 – 11:30",
    title: "Registration convergence & hardware verification",
    detail: "ID & peripheral inspection, LAN seat assignment.",
    venue: "Tech Complex Hall A",
    mode: "Mandatory",
    sortOrder: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "fallback-2",
    day: "Day 01 // Arrival & opening",
    time: "12:00 – 13:30",
    title: "Xordium 5.0 ceremonial keynote & bracket draw",
    detail:
      "Official ceremony featuring Ignite leads, tournament directors, live draw.",
    venue: "Main Auditorium",
    mode: "Ceremony live",
    sortOrder: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "fallback-3",
    day: "Day 02 // Bracket battles",
    time: "14:30 – 20:00",
    title: "Valorant LAN group stage // Round of 32",
    detail: "Parallel simultaneous combat sessions on dual 128-tick racks.",
    venue: "Arena Ground 01",
    mode: "Elimination",
    sortOrder: 2,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "fallback-4",
    day: "Day 02 // Bracket battles",
    time: "21:00 – Late",
    title: "Synapse hackathon: kickoff & problem statement drop",
    detail: "36-hour timer initiates. Enterprise sponsors release forget briefs.",
    venue: "Innovation Labs",
    mode: "Sprint start",
    sortOrder: 3,
    createdAt: "",
    updatedAt: "",
  },
];

export default function TimetableSection() {
  const [entries, setEntries] = useState<TimetableEntry[]>(FALLBACK_ENTRIES);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  useEffect(() => {
    fetchTimetable()
      .then((data) => {
        if (data.length > 0) setEntries(data);
      })
      .catch(() => {
        // Keep fallback entries when the API is unreachable.
      });
  }, []);

  const days = [...new Set(entries.map((e) => e.day))];
  const selectedDay = activeDay && days.includes(activeDay) ? activeDay : days[0];
  const visible = entries.filter((e) => e.day === selectedDay);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading
        kicker="Festival timetable // Featured timetable"
        title="Festival schedule timetable"
        blurb="Structured four-day competitive continuum across the BIT collegiate campus. All times indexed to Indian Standard Time (IST)."
      />
      <div className="mb-4 flex gap-2 overflow-x-auto font-mono text-[13px] tracking-[0.15em] uppercase">
        {days.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActiveDay(d)}
            className={`shrink-0 border px-3 py-2 transition-colors ${
              d === selectedDay
                ? "border-red-600 bg-red-600 text-white"
                : "border-white/15 text-white hover:text-white"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {visible.map((s) => (
          <div
            key={s.id}
            className="glass-panel grid gap-2 p-4 sm:grid-cols-[140px_1fr_auto] sm:items-center"
          >
            <span className="font-mono text-xs text-cyan-300">{s.time}</span>
            <div>
              <h3 className="font-display text-sm font-extrabold tracking-wide uppercase">
                {s.title}
              </h3>
              <p className="font-mono text-[13px] text-white">{s.detail}</p>
            </div>
            <div className="flex gap-2 font-mono text-[13px] tracking-[0.15em] uppercase">
              <span className="border border-white/15 px-2 py-1 text-white">
                {s.venue}
              </span>
              <span className="border border-red-600/50 px-2 py-1 text-red-400">
                [{s.mode}]
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
