import Link from "next/link";

const links = [
  { href: "/", label: "Base" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/admin", label: "Admin", desktopOnly: true },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-2.5 pt-2.5 lg:px-4 lg:pt-4">
      <div className="glass-panel mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl px-3 py-2.5 shadow-[0_8px_40px_rgb(0_0_0/0.55)] lg:flex-nowrap lg:gap-x-4 lg:px-6 lg:py-4">
        <Link href="/" className="order-1 flex shrink-0 items-center gap-2">
          <span className="bg-red-600 px-2.5 py-1.5 font-display text-lg font-black tracking-wider text-white lg:text-xl">
            XORDIUM
          </span>
          <span className="font-display text-lg font-black text-white lg:text-xl">
            5.0
          </span>
        </Link>

        <Link
          href="/register"
          className="order-2 shrink-0 bg-red-600 px-3 py-2 font-mono text-xs font-bold tracking-[0.12em] text-white uppercase hover:bg-red-500 lg:order-3 lg:px-5 lg:py-2.5 lg:text-base lg:tracking-[0.15em]"
        >
          Register →
        </Link>

        <nav className="no-scrollbar order-3 flex w-full min-w-0 items-center justify-center gap-0.5 overflow-x-auto lg:order-2 lg:w-auto lg:flex-1 lg:gap-3 lg:overflow-x-visible">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 rounded-lg px-2 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-white uppercase transition hover:bg-white/10 hover:text-white lg:px-4 lg:py-2 lg:text-base lg:tracking-[0.2em] ${
                l.desktopOnly ? "hidden lg:inline" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
