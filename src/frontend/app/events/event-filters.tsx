"use client";

import { useMemo, useState } from "react";
import { events } from "@/lib/events";
import StackedEventCard from "@/components/stacked-event-card";

const FILTER_CATEGORIES = [
  "All",
  "Technical",
  "Esports",
  "Fun",
] as const;

type FilterCategory = (typeof FILTER_CATEGORIES)[number];

function getEventFilterCategory(eventCategory: string): FilterCategory {
  const technicalCategories = ["Hackathon", "Algorithms", "AI / ML", "Cybersecurity", "Hardware"];
  const esportsCategories = ["Esports"];
  const funCategories = ["Robotics", "Open"];

  if (technicalCategories.includes(eventCategory)) return "Technical";
  if (esportsCategories.includes(eventCategory)) return "Esports";
  if (funCategories.includes(eventCategory)) return "Fun";
  return "Fun";
}

export default function EventFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>("All");
  const [sortBy, setSortBy] = useState<"prize" | "date" | "title">("prize");

  const filteredEvents = useMemo(() => {
    let filtered = events.filter((e) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        `${e.title} ${e.description} ${e.venue} ${e.tag}`
          .toLowerCase()
          .includes(q);
      const eventFilterCategory = getEventFilterCategory(e.category);
      const matchesCategory = category === "All" || eventFilterCategory === category;
      return matchesQuery && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "prize":
          return parseFloat(b.prizePool.replace(/[^0-9.]/g, "")) - parseFloat(a.prizePool.replace(/[^0-9.]/g, ""));
        case "date":
          return a.schedule.localeCompare(b.schedule);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [query, category, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 font-mono text-[13px] tracking-[0.15em] uppercase">
        {FILTER_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`border px-3 py-1.5 transition ${
              category === c
                ? "border-red-600 bg-red-600 text-white"
                : "border-white/15 text-white hover:bg-white/10"
            }`}
          >
            {c === "All" ? `All tracks • ${events.length}` : c}
          </button>
        ))}
      </div>

      <p className="mt-6 font-mono text-[13px] tracking-[0.2em] text-white uppercase">
        ■ Event protocols [{" "}
        {String(filteredEvents.length).padStart(2, "0")} active protocols ]
      </p>

      {/* Event cards grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-panel p-8 text-center">
          <p className="font-mono text-[13px] text-white">No protocols match your query. Clear search or adjust filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredEvents.map((e, i) => (
            <StackedEventCard
              key={e.slug}
              event={e}
              index={i}
              total={filteredEvents.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
