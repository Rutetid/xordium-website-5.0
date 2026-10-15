"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRegistrationHref } from "@/data/events";
import { toFestEvent, type DbEventRow, type FestEvent } from "@/lib/events";
import MarkdownText from "@/components/markdown-text";

// Flagship spotlight: first featured event from the database (first event
// as fallback). Renders nothing while loading or when no events exist.
export default function FlagshipSection() {
  const [flagship, setFlagship] = useState<FestEvent | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => (response.ok ? response.json() : []))
      .then((data: DbEventRow[]) => {
        const list = Array.isArray(data) ? data.map(toFestEvent) : [];
        const featured = list.filter((e) =>
          (data.find((d) => d.slug === e.slug)?.featured ?? false),
        );
        setFlagship(featured[0] ?? list[0] ?? null);
        setDone(true);
      })
      .catch(() => {
        setDone(true);
      });
  }, []);

  if (!done) {
    return <div className="glass-panel h-64 animate-pulse" aria-hidden="true" />;
  }

  if (!flagship) return null;

  return (
    <div className="glass-panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-1.5">
        <p className="font-mono text-[10px] tracking-[0.2em] text-red-400 uppercase">
          Flagship // {flagship.category}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-white uppercase">
          {flagship.schedule}
        </p>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-5 md:p-5">
        {/* Poster */}
        <div className="relative h-44 shrink-0 overflow-hidden rounded border border-white/10 bg-black/50 md:order-2 md:h-auto">
          <Image
            src={flagship.image}
            alt={flagship.title}
            fill
            sizes="(max-width: 768px) 100vw, 13rem"
            className="object-contain"
          />
          {flagship.venue ? (
            <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-white uppercase">
              {flagship.venue}
            </span>
          ) : null}
        </div>

        {/* Details */}
        <div className="md:order-1">
          <h2 className="font-display text-2xl leading-tight font-black uppercase sm:text-3xl">
            {flagship.title}
          </h2>
          {flagship.description ? (
            <MarkdownText className="mt-1.5 font-mono text-[11px] leading-relaxed text-white line-clamp-3">
              {flagship.description}
            </MarkdownText>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-white uppercase">
            {flagship.prizePool ? (
              <span>
                <span className="text-white">Prize:</span>{" "}
                <span className="text-white">{flagship.prizePool}</span>
              </span>
            ) : null}
            {flagship.format ? (
              <span>
                <span className="text-white">Format:</span>{" "}
                <span className="text-white">{flagship.format}</span>
              </span>
            ) : null}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href={getRegistrationHref(flagship.slug)}
              className="bg-red-600 px-5 py-2.5 text-center font-mono text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-red-500"
            >
              {flagship.cta || "Register"} // Squad registration →
            </Link>
            <Link
              href="/events"
              className="border border-white/25 px-5 py-2.5 text-center font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-white/10"
            >
              All events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
