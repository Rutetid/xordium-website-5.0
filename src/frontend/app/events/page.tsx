import EventFilters from "./event-filters";
import FlagshipSection from "@/components/flagship-section";

export default function EventsPage() {
  return (
    <>
      <section className="border-b border-white/10">
        <div className="text-slab mx-auto max-w-7xl px-4 pt-6 pb-5 my-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-red-500 uppercase">
            Syllabus 2026 // Arena directory active // Cycle 05
          </p>
          <h1 className="mt-1.5 font-display text-4xl leading-none font-black uppercase sm:text-6xl">
            Events directory{" "}
            <span className="text-red-600">{"//"}</span>{" "}
            <span className="text-cyan-300">競技一覧</span>
          </h1>
          <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-white">
            List of events, technical, esports and fun for you to drop in
            engineered for Birla Institute of Technology.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-5">
        {/* Flagship — first featured event from the database */}
        <FlagshipSection />

        {/* Filters + grid */}
        <div className="mt-6">
          <EventFilters />
        </div>
      </section>
    </>
  );
}
