"use client";

import Link from "next/link";
import { Vehicle } from "@/data/vehicles";
import { useAppState } from "@/context/AppStateContext";
import VehicleCard from "@/components/VehicleCard";

export default function FavoritesClient({ vehicles }: { vehicles: Vehicle[] }) {
  const { favorites, recentlyViewed, savedComparisons, ready } = useAppState();

  const favVehicles = vehicles.filter((v) => favorites.includes(v.slug));
  const recentVehicles = recentlyViewed
    .map((slug) => vehicles.find((v) => v.slug === slug))
    .filter(Boolean) as Vehicle[];

  return (
    <div className="cv-bg-grid mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-gold">Your Garage</span>
        <h1 className="mt-2 font-display text-4xl font-800">Favorites</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Every vehicle you save, every comparison you build, and every car you&apos;ve recently
          viewed — all in one place.
        </p>
      </div>

      {!ready ? (
        <p className="text-white/40">Loading your garage…</p>
      ) : (
        <>
          <section className="mb-16">
            <h2 className="mb-5 font-display text-xl font-700">★ Saved Cars ({favVehicles.length})</h2>
            {favVehicles.length === 0 ? (
              <EmptyState message="You haven't favorited any cars yet." cta="Explore Cars" href="/explore" />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {favVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            )}
          </section>

          <section className="mb-16">
            <h2 className="mb-5 font-display text-xl font-700">💾 Saved Comparisons ({savedComparisons.length})</h2>
            {savedComparisons.length === 0 ? (
              <EmptyState message="You haven't saved any comparisons yet." cta="Compare Cars" href="/compare" />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {savedComparisons.map((slugs, i) => {
                  const names = slugs
                    .map((s) => vehicles.find((v) => v.slug === s)?.fullName)
                    .filter(Boolean)
                    .join(" vs ");
                  return (
                    <Link
                      key={i}
                      href={`/compare?${slugs.map((s, idx) => `${["a", "b", "c"][idx]}=${s}`).join("&")}`}
                      className="cv-card cv-glass rounded-2xl border border-white/10 p-5"
                    >
                      <p className="text-xs uppercase tracking-wide text-white/40">Comparison #{i + 1}</p>
                      <p className="mt-2 font-700">{names}</p>
                      <span className="mt-3 inline-block text-sm text-cv-blue">Reopen comparison →</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-5 font-display text-xl font-700">🕘 Recently Viewed</h2>
            {recentVehicles.length === 0 ? (
              <EmptyState message="You haven't viewed any car details yet." cta="Explore Cars" href="/explore" />
            ) : (
              <div className="cv-scrollbar-hide flex gap-5 overflow-x-auto pb-4">
                {recentVehicles.map((v) => (
                  <div key={v.id} className="w-72 shrink-0">
                    <VehicleCard vehicle={v} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function EmptyState({ message, cta, href }: { message: string; cta: string; href: string }) {
  return (
    <div className="cv-glass rounded-2xl border border-white/10 p-12 text-center text-white/50">
      <p>{message}</p>
      <Link href={href} className="cv-btn cv-btn-primary mt-5 inline-flex px-5 py-2.5 text-sm">
        {cta} →
      </Link>
    </div>
  );
}
