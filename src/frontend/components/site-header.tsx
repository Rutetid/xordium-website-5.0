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
    <header className="glass-panel sticky top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="bg-red-600 px-2 py-1 font-display text-sm font-black tracking-wider text-white">
            XORDIUM
          </span>
          <span className="font-display text-sm font-black text-white">
            5.0
          </span>
        </Link>
        <nav className="no-scrollbar flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 px-1.5 py-1 font-mono text-[9.5px] tracking-[0.12em] text-white uppercase transition hover:bg-white/10 hover:text-white sm:px-3 sm:text-[11px] sm:tracking-[0.2em] ${
                l.desktopOnly ? "hidden sm:inline" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="ml-1 shrink-0 bg-red-600 px-2 py-1.5 font-mono text-[9.5px] font-bold tracking-[0.1em] text-white uppercase hover:bg-red-500 sm:px-3 sm:text-[11px] sm:tracking-[0.15em]"
          >
            Register →
          </Link>
        </nav>
      </div>
    </header>
  );
}
