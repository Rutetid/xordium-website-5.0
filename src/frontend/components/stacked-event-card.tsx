import Image from "next/image";
import Link from "next/link";
import { getRegistrationHref } from "@/data/events";
import type { FestEvent } from "@/lib/events";
import MarkdownText from "@/components/markdown-text";

// Alternating stacked event row, shared by the events directory and the
// homepage featured section: odd rows poster-left, even rows poster-right.
export default function StackedEventCard({
  event: e,
  index,
  total,
}: {
  event: FestEvent;
  index: number;
  total: number;
}) {
  // 1-indexed: odd events (1,3,5…) → poster left, description right
  //            even events (2,4,6…) → description left, poster right
  const posterOnLeft = (index + 1) % 2 === 0;

  const Poster = (
    <div className="group relative shrink-0 w-full lg:w-[35%] min-w-[280px] max-w-[420px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded border border-white/10 bg-[#101218]">
        <Image
          src={e.image}
          alt={e.title}
          fill
          sizes="(max-width: 1024px) 100vw, 35vw"
          className="object-contain transition duration-700 group-hover:scale-102"
        />
        {/* Tag */}
        {e.tag ? (
        <div className="absolute left-3 top-3 z-10">
          <span className="bg-red-600 px-2 py-1 font-mono text-[13px] tracking-[0.2em] text-white uppercase">
            {e.tag}
          </span>
        </div>
        ) : null}
        {/* Category */}
        {e.category ? (
        <div className="absolute right-3 top-3 z-10">
          <span className="bg-black/70 px-2 py-1 font-mono text-[13px] tracking-[0.2em] text-cyan-300 uppercase">
            {e.category}
          </span>
        </div>
        ) : null}
      </div>
    </div>
  );

  const Info = (
    <div
      className={`flex w-full flex-col justify-center p-5 lg:p-7 ${posterOnLeft ? "lg:pl-6" : "lg:pr-6"}`}
    >
      {/* Index */}
      <p className="font-mono text-[13px] tracking-[0.35em] text-red-500 uppercase">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </p>

      <h3 className="mt-1.5 font-display text-lg font-black leading-tight uppercase sm:text-xl">
        {e.title}
      </h3>

      {e.description ? (
        <MarkdownText className="mt-2 font-mono text-[13px] leading-relaxed text-white line-clamp-3">
          {e.description}
        </MarkdownText>
      ) : null}

      <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 font-mono text-[13px]">
        {e.venue && (
          <div className="flex justify-between gap-4">
            <dt className="text-white uppercase">Venue</dt>
            <dd className="text-right text-white">{e.venue}</dd>
          </div>
        )}
        {e.format && (
          <div className="flex justify-between gap-4">
            <dt className="text-white uppercase">Format</dt>
            <dd className="text-right text-white">{e.format}</dd>
          </div>
        )}
        {e.schedule && (
          <div className="flex justify-between gap-4">
            <dt className="text-white uppercase">Schedule</dt>
            <dd className="text-right text-white">{e.schedule}</dd>
          </div>
        )}
        {e.teamSize && (
          <div className="flex justify-between gap-4">
            <dt className="text-white uppercase">Team</dt>
            <dd className="text-right text-white">{e.teamSize}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <div className="font-mono text-[13px] tracking-[0.2em] text-white uppercase">
            Prize pool
          </div>
          {e.prizePool ? (
            <div className="font-display text-lg font-black text-red-500">
              {e.prizePool}
            </div>
          ) : null}
          {e.prizeNote && (
            <div className="font-mono text-[13px] text-cyan-300 uppercase">
              {e.prizeNote}
            </div>
          )}
        </div>
        {e.cta ? (
          <Link
            href={getRegistrationHref(e.slug)}
            className="bg-red-600 px-4 py-2 font-mono text-[13px] font-bold tracking-[0.15em] text-white uppercase transition hover:bg-red-500"
          >
            {e.cta} →
          </Link>
        ) : null}
      </div>
    </div>
  );

  return (
    <div
      className="glass-panel flex flex-col overflow-hidden lg:h-96 lg:flex-row lg:items-stretch"
    >
      {posterOnLeft ? (
        <>
          {Poster}
          {Info}
        </>
      ) : (
        <>
          {Info}
          {Poster}
        </>
      )}
    </div>
  );
}
