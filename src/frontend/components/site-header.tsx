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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="glass-panel mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-[0_8px_40px_rgb(0_0_0/0.55)] sm:px-6 sm:py-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="bg-red-600 px-2.5 py-1.5 font-display text-lg font-black tracking-wider text-white sm:text-xl">
            XORDIUM
          </span>
          <span className="font-display text-lg font-black text-white sm:text-xl">
            5.0
          </span>
        </Link>
        <nav className="no-scrollbar flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto sm:gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 rounded-lg px-2.5 py-2 font-mono text-xs tracking-[0.14em] text-white uppercase transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-base sm:tracking-[0.2em] ${
                l.desktopOnly ? "hidden sm:inline" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/register"
          className="shrink-0 bg-red-600 px-3 py-2.5 font-mono text-xs font-bold tracking-[0.12em] text-white uppercase hover:bg-red-500 sm:px-5 sm:text-base sm:tracking-[0.15em]"
        >
          Register →
        </Link>
      </div>
    </header>
  );
}
