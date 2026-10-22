import SectionHeading from "@/components/section-heading";
import { SupportForm } from "./support-form";

export default function SupportPage() {
  return (
    <div className="cx-stage">
      <div className="cx-scanlines" aria-hidden="true" />
      <div className="cx-grain" aria-hidden="true" />

      <section className="cx-page-head">
        <div className="cx-page-head-inner">
          <p className="cx-page-kicker">
            <span className="cx-live-dot" aria-hidden="true" />
            Comms endpoint // Terminal 04 // Helpdesk active
          </p>
          <h1 className="cx-page-title">
            <span className="cx-glitch" data-text="Support">
              Support
            </span>{" "}
            <span aria-hidden="true" className="text-red-500">
              {"//"}
            </span>{" "}
            <span className="cx-page-jp">応援</span>
          </h1>
          <span className="cx-page-rule" aria-hidden="true" />
          <p className="cx-page-blurb">
            Transmission issues, registration queries or hardware
            compatibility checks — open a dispatch and the committee
            arbiters respond via comms.
          </p>
        </div>
      </section>

      {/* carrier signal — replaces the hazard tape */}
      <div className="cx-carrier" aria-hidden="true">
        <span className="cx-carrier-rail" />
        <span className="cx-carrier-tag">
          <span className="cx-live-dot cx-live-dot--red" />
          Carrier // CH-04 // 14.4 KBPS
        </span>
        <span className="cx-carrier-rail" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <SectionHeading
          kicker="Directory & dispatch"
          title="Open a channel"
          blurb="Pick a touchpoint node on the left, or push a packet through the dispatch terminal on the right."
        />
        <div className="mt-8">
          <SupportForm />
        </div>
      </section>
    </div>
  );
}
