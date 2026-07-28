import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Cars" },
  { href: "/brands", label: "Brands" },
  { href: "/find-my-car", label: "Find My Car" },
  { href: "/compare", label: "Compare" },
  { href: "/news", label: "News" },
  { href: "/rankings", label: "Rankings" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-cv-charcoal">
      <div className="cv-bg-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cv-red via-cv-gold to-cv-blue font-display text-sm font-800 text-cv-black">
                CV
              </span>
              <span className="font-display text-lg font-700 tracking-wide">
                Car<span className="cv-text-red-blue">Vibes</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60">Discover. Compare. Find your vibe.</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">
              Find the car that fits your vibe.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs font-700 uppercase tracking-[0.2em] text-white/50">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition hover:text-cv-blue">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-700 uppercase tracking-[0.2em] text-white/50">
              German Icons
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/brands/audi" className="text-sm text-white/70 transition hover:text-cv-red">
                  Audi
                </Link>
              </li>
              <li>
                <Link href="/brands/bmw" className="text-sm text-white/70 transition hover:text-cv-blue">
                  BMW
                </Link>
              </li>
              <li>
                <Link href="/brands/mercedes-benz" className="text-sm text-white/70 transition hover:text-cv-gold">
                  Mercedes-Benz
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-white/70 transition hover:text-white">
                  Audi vs BMW vs Mercedes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-700 uppercase tracking-[0.2em] text-white/50">
              Follow CarVibes
            </h4>
            <p className="mt-4 text-sm text-white/60">
              Cinematic reviews, rankings, and comparisons every week.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="http://www.youtube.com/@CarVibes-m6i"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-btn cv-btn-primary px-4 py-2 text-sm"
              >
                ▶ Subscribe on YouTube
              </a>
              <a
                href="https://www.instagram.com/carvibesinsta/"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-btn cv-btn-gold px-4 py-2 text-sm"
              >
                📷 Follow on Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="cv-divider my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} CarVibes. All rights reserved.</p>
          <p>Built for automotive enthusiasts, by automotive enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
}
