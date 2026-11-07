import Link from "next/link";
import { GitFork, Globe2, Play, Trophy, Users } from "lucide-react";
import { hackTheMatrixResults } from "@/data/results";

const rankLabel = (rank: number) => String(rank).padStart(2, "0");
const resultCategories = [
  ...new Set(hackTheMatrixResults.map(({ category }) => category)),
];

export default function ResultsPage() {
  return (
    <div className="cx-stage cx-results-stage">
      <div className="cx-grain" aria-hidden="true" />

      <section className="cx-page-head">
        <div className="cx-page-head-inner">
          <p className="cx-page-kicker">
            <span className="cx-live-dot" aria-hidden="true" />
            Verified transmissions // Hall of builds // Xordium 5.0
          </p>
          <h1 className="cx-page-title">
            <span className="cx-glitch" data-text="Results uplink">
              Results uplink
            </span>{" "}
            <span aria-hidden="true" className="text-red-500">
              {"//"}
            </span>{" "}
            <span className="cx-page-jp">結果</span>
          </h1>
          <span className="cx-page-rule" aria-hidden="true" />
          <p className="cx-page-blurb">
            The projects that made it through the matrix. Open a team record to
            watch the build in motion or explore the live deployment.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-6 sm:pt-10">
        <section className="relative overflow-hidden border border-acid/45 bg-[#07080a]/95 shadow-[0_10px_44px_rgb(0_0_0_/_0.6),0_0_26px_-14px_rgb(198_255_0_/_0.55)]">
          <div className="cx-tape cx-tape--micro" aria-hidden="true" />
          <div className="flex flex-col gap-5 px-5 pb-5 pt-8 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:pb-6 sm:pt-10">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.24em] text-acid uppercase">
                Event archive // 01
              </p>
              <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Hack the Matrix
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-danger pl-3 font-mono text-[10px] font-bold tracking-[0.18em] text-white/65 uppercase">
              <Trophy className="size-4 text-flux" aria-hidden="true" />
              <span>Results ledger</span>
              <span className="text-white/30">//</span>
              <span>{hackTheMatrixResults.length} verified</span>
            </div>
          </div>
        </section>

        {hackTheMatrixResults.length ? (
          <section
            aria-label="Hack The Matrix results"
            className="mt-9 space-y-12"
          >
            {resultCategories.map((category) => (
              <section key={category} aria-labelledby={`${category}-heading`}>
                <div className="mb-5 flex min-w-0 items-center gap-3 sm:gap-4">
                  <div
                    className="size-2 bg-acid shadow-[0_0_14px_#c6ff00]"
                    aria-hidden="true"
                  />
                  <h2
                    id={`${category}-heading`}
                    className="min-w-0 break-words font-display text-[clamp(1.65rem,8.5vw,2.25rem)] font-black uppercase leading-none tracking-tight text-white sm:text-4xl"
                  >
                    {category}
                  </h2>
                  <span
                    className="hidden h-px flex-1 bg-acid/35 sm:block"
                    aria-hidden="true"
                  />
                </div>

                <div className="space-y-8">
                  {hackTheMatrixResults
                    .filter((result) => result.category === category)
                    .map((result) => (
                      <div key={`${result.rank}-${result.teamName}`}>
                        <p className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] text-flux uppercase">
                          <Trophy className="size-4" aria-hidden="true" />
                          {result.award}
                        </p>
                        <article className="cx-panel cx-corners overflow-hidden">
                          <header className="flex items-start justify-between gap-3 px-5 pt-5 sm:gap-4 sm:px-7 sm:pt-7">
                            <div className="min-w-0">
                              <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/45 uppercase">
                                Team record
                              </p>
                              <h3 className="mt-1 break-words font-display text-[clamp(1.85rem,9.5vw,2.25rem)] font-black uppercase leading-none text-white sm:text-4xl">
                                {result.teamName}
                              </h3>
                            </div>
                            <span className="shrink-0 border border-acid/45 bg-acid/10 px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-acid uppercase">
                              ID // {rankLabel(result.rank)}
                            </span>
                          </header>

                          <div className="space-y-6 px-5 py-6 sm:px-7 sm:pb-7">
                            <div>
                              <p className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.2em] text-neon uppercase">
                                <Users
                                  className="size-3.5"
                                  aria-hidden="true"
                                />{" "}
                                Team operators
                              </p>
                              <ul className="mt-3 flex flex-wrap gap-2">
                                {result.members.map((member) => (
                                  <li
                                    key={member}
                                    className="border border-white/15 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-white/80 uppercase"
                                  >
                                    {member}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="border-l-2 border-danger bg-danger/[0.06] px-4 py-3">
                              <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/45 uppercase">
                                Project deployed
                              </p>
                              <p className="mt-1 font-display text-2xl font-bold uppercase text-white">
                                {result.projectName}
                              </p>
                            </div>

                            {result.demoUrl ? (
                              <div className="overflow-hidden border border-neon/35 bg-black shadow-[0_0_28px_-16px_#00f0ff]">
                                <div className="flex items-center justify-between bg-neon/[0.06] px-3 py-2">
                                  <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-neon uppercase">
                                    Demo transmission
                                  </p>
                                  <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold tracking-[0.16em] text-white/50 uppercase">
                                    <span className="size-1.5 animate-pulse rounded-full bg-danger" />
                                    Drive player
                                  </span>
                                </div>
                                <div className="aspect-video bg-[#030405]">
                                  <iframe
                                    className="size-full"
                                    src={result.demoUrl}
                                    title={`${result.projectName} demo video`}
                                    allow="autoplay"
                                    allowFullScreen
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            ) : null}

                            <p className="font-mono text-xs leading-6 text-white/70">
                              {result.description}
                            </p>

                            <div className="grid gap-2 sm:grid-cols-3">
                              {result.demoUrl ? (
                                <a
                                  className="cx-btn cx-btn--acid w-full"
                                  href={result.demoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <Play
                                    className="size-3.5 fill-current"
                                    aria-hidden="true"
                                  />
                                  Watch demo
                                </a>
                              ) : null}
                              {result.websiteUrl ? (
                                <a
                                  className="cx-btn cx-btn--ghost w-full"
                                  href={result.websiteUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <Globe2
                                    className="size-3.5"
                                    aria-hidden="true"
                                  />
                                  Open live build
                                </a>
                              ) : null}
                              {result.githubUrl ? (
                                <a
                                  className="cx-btn cx-btn--ghost w-full"
                                  href={result.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <GitFork
                                    className="size-3.5"
                                    aria-hidden="true"
                                  />
                                  View source
                                </a>
                              ) : null}
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </section>
        ) : (
          <section className="cx-panel cx-corners mt-6 overflow-hidden">
            <div className="cx-scan" aria-hidden="true" />
            <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
              <div className="max-w-md">
                <span className="mx-auto grid size-14 place-items-center border border-neon/50 bg-neon/10 text-neon">
                  <Trophy className="size-6" aria-hidden="true" />
                </span>
                <p className="mt-5 font-mono text-[10px] font-bold tracking-[0.24em] text-acid uppercase">
                  Results registry // syncing
                </p>
                <h2 className="mt-2 font-display text-4xl font-black uppercase text-white">
                  Team records incoming
                </h2>
                <p className="mt-3 font-mono text-xs leading-6 text-white/65">
                  Verified Hack The Matrix team records, project demos and live
                  builds will appear here once the results are released.
                </p>
                <Link href="/events" className="cx-btn cx-btn--ghost mt-6">
                  Back to arenas →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
