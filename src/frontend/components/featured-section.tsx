"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import StackedEventCard from "@/components/stacked-event-card";
import { events, getFeaturedEvents, type FestEvent } from "@/lib/events";

type DbEventFlag = {
  slug: string;
  featured: boolean;
  posterUrl?: string | null;
};

// Homepage featured section. Reads the admin-controlled `featured` flags
// from the database; falls back to the built-in list when the API is
// unreachable so the section never renders empty by accident.
export default function FeaturedSection() {
  const [featured, setFeatured] = useState<FestEvent[] | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DbEventFlag[] | null) => {
        if (!Array.isArray(data)) return;
        const bySlug = new Map(data.map((d) => [d.slug, d]));
        setFeatured(
          events
            .map((e) => {
              const db = bySlug.get(e.slug);
              if (!db) return e;
              return {
                ...e,
                featured: Boolean(db.featured),
                image: db.posterUrl || e.image,
              };
            })
            .filter((e) => e.featured),
        );
      })
      .catch(() => {
        // Keep the built-in fallback when the API is unreachable.
      });
  }, []);

  const visible = featured ?? getFeaturedEvents();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading
        kicker="Transmission specifications // 01"
        title="Featured competitions"
        blurb="Engineered for extreme performance. Each track carries strict tournament guidelines, certified adjudicators, enterprise compute nodes, and direct cash disbursements."
      />
      <div className="flex flex-col gap-5">
        {visible.map((e, i) => (
          <StackedEventCard key={e.slug} event={e} index={i} total={visible.length} />
        ))}
      </div>
    </section>
  );
}
