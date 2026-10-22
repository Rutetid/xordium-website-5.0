import EventFilters from "./event-filters";
import FlagshipSection from "@/components/flagship-section";

export default function EventsPage() {
  return (
    <>
      <section className="cx-page-head">
        <div className="cx-page-head-inner">
          <p className="cx-page-kicker">
            Syllabus 2026 // Arena directory active // Cycle 05
          </p>
          <h1 className="cx-page-title">
            <span className="cx-glitch" data-text="Events directory">
              Events directory
            </span>{" "}
            <span aria-hidden="true" className="text-red-500">
              {"//"}
            </span>{" "}
            <span className="cx-page-jp">競技一覧</span>
          </h1>
          <span className="cx-page-rule" aria-hidden="true" />
          <p className="cx-page-blurb">
            List of events — technical, esports and fun — engineered for
            Birla Institute of Technology. Scan the directory, pick your
            theater, the uplink is open.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Flagship — first featured event (curated fallback offline) */}
        <FlagshipSection />

        {/* Filters + directory rows */}
        <div className="mt-10">
          <EventFilters />
        </div>
      </section>
    </>
  );
}
