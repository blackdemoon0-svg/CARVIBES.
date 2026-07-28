"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppState } from "@/context/AppStateContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Cars" },
  { href: "/brands", label: "Brands" },
  { href: "/find-my-car", label: "Find My Car" },
  { href: "/compare", label: "Compare" },
  { href: "/news", label: "News" },
  { href: "/rankings", label: "Rankings" },
  { href: "/favorites", label: "Favorites" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { favorites, compareList } = useAppState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "cv-glass-strong shadow-[0_10px_40px_rgba(0,0,0,0.5)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cv-red via-cv-gold to-cv-blue font-display text-sm font-800 text-cv-black">
            CV
          </span>
          <span className="font-display text-lg font-700 tracking-wide text-cv-white">
            Car<span className="cv-text-red-blue">Vibes</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3 py-2 text-sm font-600 text-white/75 transition-colors hover:text-white"
            >
              {l.label}
              {l.href === "/favorites" && favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cv-red text-[10px] font-700 text-white">
                  {favorites.length}
                </span>
              )}
              {l.href === "/compare" && compareList.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cv-blue text-[10px] font-700 text-cv-black">
                  {compareList.length}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <form onSubmit={handleSearch} className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search cars, brands, news..."
              className="w-56 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-cv-blue/60 focus:bg-white/10 lg:w-64"
            />
          </form>
          <Link href="/find-my-car" className="cv-btn cv-btn-primary px-4 py-2 text-sm">
            Find My Car
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="cv-glass-strong border-t border-white/10 px-5 py-4 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search cars, brands, news..."
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none"
            />
          </form>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-600 text-white/80 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
