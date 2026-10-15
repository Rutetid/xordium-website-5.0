"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import { fetchTimetable, type TimetableEntry } from "@/lib/admin-api";

export default function TimetableSection() {
  const [entries, setEntries] = useState<TimetableEntry[] | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  useEffect(() => {
    fetchTimetable()
      .then((data) => {
        setEntries(data);
      })
      .catch(() => {
        setEntries([]);
      });
  }, []);

  const loaded = entries ?? [];
  const days = [...new Set(loaded.map((e) => e.day))];
  const selectedDay = activeDay && days.includes(activeDay) ? activeDay : days[0];
  const visible = loaded.filter((e) => e.day === selectedDay);

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
            className={`shrink-0 border px-3 py-2 min-h-11 transition-colors ${
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
        {entries === null
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-panel h-24 animate-pulse"
                aria-hidden="true"
              />
            ))
          : visible.map((s) => (
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
