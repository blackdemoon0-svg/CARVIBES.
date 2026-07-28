"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NewsArticle, newsCategories } from "@/data/news";

export default function NewsClient({ articles }: { articles: NewsArticle[] }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const trending = articles.filter((a) => a.trending).slice(0, 4);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (a.slug === featured.slug) return false;
      if (category !== "All" && a.category !== category) return false;
      if (search && !`${a.title} ${a.excerpt}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [articles, category, search, featured.slug]);

  return (
    <div className="cv-bg-grid mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-gold">Automotive World</span>
        <h1 className="mt-2 font-display text-4xl font-800">News</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          New launches, EV breakthroughs, motorsports, rankings, and everything shaping the
          automotive world.
        </p>
      </div>

      {/* Featured article */}
      <Link
        href={`/news/${featured.slug}`}
        className="cv-card cv-glass mb-14 flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 p-8 md:flex-row md:items-center"
      >
        <div className="flex-1">
          <span className="rounded-full bg-cv-red/20 px-3 py-1 text-[10px] font-700 uppercase tracking-wide text-cv-red">
            Featured · {featured.category}
          </span>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight">{featured.title}</h2>
          <p className="mt-3 max-w-2xl text-white/60">{featured.excerpt}</p>
          <p className="mt-4 text-xs text-white/40">
            {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {featured.readTime} min read
          </p>
          <span className="cv-btn cv-btn-primary mt-6 inline-flex px-5 py-2.5 text-sm">Read Article →</span>
        </div>
        <div className="hidden h-40 w-40 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cv-red via-cv-gold to-cv-blue text-4xl md:flex">
          📰
        </div>
      </Link>

      {/* Trending */}
      <div className="mb-14">
        <h2 className="mb-5 font-display text-xl font-700">🔥 Trending Now</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((a) => (
            <Link key={a.slug} href={`/news/${a.slug}`} className="cv-card cv-glass rounded-2xl border border-white/10 p-5">
              <span className="text-[10px] font-700 uppercase tracking-wide text-cv-blue">{a.category}</span>
              <h3 className="mt-2 font-700 leading-snug">{a.title}</h3>
              <p className="mt-3 text-xs text-white/40">{a.readTime} min read</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search news..."
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none focus:border-cv-blue/60"
        />
        <button
          onClick={() => setCategory("All")}
          className={`cv-btn px-4 py-2 text-xs ${category === "All" ? "cv-btn-primary" : "cv-btn-ghost"}`}
        >
          All
        </button>
        {newsCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`cv-btn px-4 py-2 text-xs ${category === c ? "cv-btn-primary" : "cv-btn-ghost"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link key={a.slug} href={`/news/${a.slug}`} className="cv-card cv-glass rounded-2xl border border-white/10 p-6">
            <span className="rounded-full bg-white/8 px-3 py-1 text-[10px] font-700 uppercase tracking-wide text-white/60">
              {a.category}
            </span>
            <h3 className="mt-4 font-display text-lg font-700 leading-snug">{a.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-white/55">{a.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-white/35">
              <span>{new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <span>{a.readTime} min read</span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-white/50">No articles match your search.</p>
        )}
      </div>
    </div>
  );
}
