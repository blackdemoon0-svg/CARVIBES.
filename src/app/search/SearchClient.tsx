"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Vehicle } from "@/data/vehicles";
import { Brand } from "@/data/brands";
import { NewsArticle } from "@/data/news";
import VehicleCard from "@/components/VehicleCard";

export default function SearchClient({
  vehicles,
  brands,
  articles,
}: {
  vehicles: Vehicle[];
  brands: Brand[];
  articles: NewsArticle[];
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const q = query.trim().toLowerCase();

  const matchedVehicles = useMemo(
    () =>
      q
        ? vehicles.filter(
            (v) =>
              v.brand.toLowerCase().includes(q) ||
              v.model.toLowerCase().includes(q) ||
              v.category.toLowerCase().includes(q) ||
              v.fullName.toLowerCase().includes(q),
          )
        : [],
    [q, vehicles],
  );

  const matchedBrands = useMemo(
    () => (q ? brands.filter((b) => b.name.toLowerCase().includes(q) || b.country.toLowerCase().includes(q)) : []),
    [q, brands],
  );

  const matchedNews = useMemo(
    () =>
      q
        ? articles.filter((a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
        : [],
    [q, articles],
  );

  const totalResults = matchedVehicles.length + matchedBrands.length + matchedNews.length;

  return (
    <div className="cv-bg-grid mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-blue">Global Search</span>
        <h1 className="mt-2 font-display text-4xl font-800">Search CarVibes</h1>
        <div className="mt-6">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands, models, categories, or news..."
            className="w-full max-w-xl rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none focus:border-cv-blue/60"
          />
        </div>
      </div>

      {!q ? (
        <p className="text-white/50">Start typing to search across the entire CarVibes universe.</p>
      ) : totalResults === 0 ? (
        <p className="text-white/50">No results found for &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="space-y-14">
          {matchedBrands.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-700">Brands ({matchedBrands.length})</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matchedBrands.map((b) => (
                  <Link key={b.slug} href={`/brands/${b.slug}`} className="cv-card cv-glass rounded-2xl border border-white/10 p-5">
                    <p className="font-700">{b.name}</p>
                    <p className="text-xs text-white/40">{b.country}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {matchedVehicles.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-700">Vehicles ({matchedVehicles.length})</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {matchedVehicles.slice(0, 12).map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </section>
          )}

          {matchedNews.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-700">News ({matchedNews.length})</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matchedNews.map((a) => (
                  <Link key={a.slug} href={`/news/${a.slug}`} className="cv-card cv-glass rounded-2xl border border-white/10 p-5">
                    <p className="font-700 leading-snug">{a.title}</p>
                    <p className="mt-2 text-xs text-white/40">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
