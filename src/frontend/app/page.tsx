import Image from "next/image";
import Link from "next/link";
import HomepageCountdown from "@/components/homepage-countdown";
import FeaturedSection from "@/components/featured-section";
import HomepageCarousel from "@/components/homepage-carousel";
import SectionHeading from "@/components/section-heading";
import TimetableSection from "@/components/timetable-section";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden" >
        {/*<Image*/}
        {/*  src="/assets/valorant-jett.jpg"*/}
        {/*  alt=""*/}
        {/*  fill*/}
        {/*  priority*/}
        {/*  sizes="100vw"*/}
        {/*  className="object-cover opacity-25"*/}
        {/*/>*/}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/55 via-[#0a0c10]/65 to-[#0a0c10]/80"/>
        <div className="relative flex w-full items-center justify-center px-4">
          <div className="text-slab relative mx-auto w-full max-w-5xl px-6 py-10 text-center sm:px-10">
          <p className="font-mono text-[13px] tracking-[0.3em] text-red-500 uppercase">
            ■ Birla Institute of Technology // Ignite x Esports // 2026 edition
          </p>
          <p className="mt-3 font-mono text-[13px] tracking-[0.3em] text-white uppercase">
            Flagship technical events • Premier eSports arena
          </p>
          <h1 className="mt-2 font-display text-6xl leading-none font-black tracking-tight sm:text-8xl">
            XORDIUM <span className="text-red-600">5.0</span>
          </h1>
          <p className="font-display text-xl font-bold tracking-[0.4em] text-white">
            YEAR 2026
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-[13px] leading-relaxed shadow-md text-white sm:text-base">
            Where cybernetic intellect confronts elite esports
            execution. A week of inter-collegiate competition, showcasing the
            pinnacle of collegiate esports and intellectual prowess.
          </p>
          <div className="mx-auto mt-6 max-w-xl">
            <HomepageCountdown caption="Event commence in"/>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/events"
              className="bg-red-600 px-6 py-3 font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-red-500"
            >
              Explore all events →
            </Link>
            <Link
              href=""
              className="border border-white/25 px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase hover:bg-white/10"
            >
              ↓ Official Brochure [PDF]
            </Link>
          </div>
          <div
            className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-4">
          </div>
        </div>
        </div>
      </section>

      {/* FEATURED COMPETITIONS */}
      <FeaturedSection />

      <HomepageCarousel/>

      {/* SCHEDULE */}
      <TimetableSection />

      {/* VENUE */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Campus geospatial node"
            title="Birla Institute of Technology"
          />
          <div className="text-slab mt-4">
          <p className="font-mono text-md leading-relaxed text-white">
            Patna Campus
          </p>
          <p className="mt-3 font-mono text-[13px] text-white">
            Birla Institute of Technology, Patna, Bihar 800014
            <br/>
            ignite@bitmesra.ac.in
          </p>
          </div>
        </div>
        <div className="glass-panel relative min-h-64 overflow-hidden">
          <Image
            src="/assets/treasure-hunt.jpg"
            alt="BIT campus arena map"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
          <span
            className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 font-mono text-[13px] tracking-[0.2em] text-cyan-300 uppercase">
            Coordinates - 25.59556, 85.08639
          </span>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 mb-12">
        <div className="glass-panel mx-auto max-w-6xl px-4 py-8 text-center">
          <p className="font-mono text-[13px] tracking-[0.3em] text-red-500 uppercase">
            {"//"} Comms endpoint
          </p>
          <h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">
            Enter the Xordium 5.0 arena
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="bg-red-600 px-6 py-3 font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-red-500"
            >
              Authenticate & register now →
            </Link>
            <Link
              href="https://www.instagram.com/ignite_bitp" className="border border-white/25 px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase hover:bg-white/10"
            >
              Follow Us on Instagram
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
