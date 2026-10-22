"use client";

import { useEffect, useMemo, useState } from "react";
import { toFestEvent, type DbEventRow, type FestEvent } from "@/lib/events";
import { FALLBACK_EVENTS } from "@/data/site-config";
import StackedEventCard from "@/components/stacked-event-card";

type SortKey = "prize" | "date" | "title";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "prize", label: "Prize ↓" },
  { key: "date", label: "Date →" },
  { key: "title", label: "A–Z" },
];

export default function EventFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortKey>("prize");
  const [events, setEvents] = useState<FestEvent[] | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DbEventRow[] | null) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data.map(toFestEvent));
        } else {
          setEvents(FALLBACK_EVENTS);
        }
      })
      .catch(() => {
        setEvents(FALLBACK_EVENTS);
      });
  }, []);

  // Filter tabs come from the categories actually present — never empty ones.
  const filterCategories = useMemo(
    () => ["All", ...[...new Set((events ?? []).map((e) => e.category))].sort()],
    [events],
  );

  const filteredEvents = useMemo(() => {
    const catalogue = events ?? [];
    let filtered = catalogue.filter((e) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        `${e.title} ${e.description} ${e.venue} ${e.tag}`
          .toLowerCase()
          .includes(q);
      const matchesCategory = category === "All" || e.category === category;
      return matchesQuery && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "prize":
          return (
            parseFloat(b.prizePool.replace(/[^0-9.]/g, "")) -
            parseFloat(a.prizePool.replace(/[^0-9.]/g, ""))
          );
        case "date":
          return a.schedule.localeCompare(b.schedule);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, query, category, sortBy]);

  return (
    <div id="directory" className="flex flex-col gap-4">
      {/* Search + sort */}
      <div className="cx-dir-bar">
        <div className="cx-dir-search">
          <input
            type="search"
            className="cx-input"
            placeholder="Search protocols…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search events"
          />
        </div>
        <div className="flex gap-2" role="group" aria-label="Sort events">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSortBy(s.key)}
              aria-pressed={sortBy === s.key}
              className="cx-sched-tab"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div
        className="cx-sched-tabs"
        role="group"
        aria-label="Filter by category"
      >
        {filterCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className="cx-sched-tab"
          >
            {c === "All" ? `All tracks • ${events?.length ?? 0}` : c}
          </button>
        ))}
      </div>

      <p className="cx-dir-count">
        ■ Event protocols <strong>[{String(filteredEvents.length).padStart(2, "0")} active]</strong>
      </p>

      {/* Event rows */}
      {events === null ? (
        <div className="flex flex-col gap-5" aria-hidden="true">
          {[0, 1].map((i) => (
            <div key={i} className="cx-event h-64 animate-pulse" />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="cx-flag cx-dir-empty">
          <strong>No protocols match</strong>
          Clear the search or adjust the filters to rescan the directory.
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
