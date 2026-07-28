import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrandBySlug } from "@/data/brands";
import { getVehiclesByBrand, Vehicle } from "@/data/vehicles";

function topModel(list: Vehicle[]): Vehicle | undefined {
  return [...list].sort((a, b) => b.popularity - a.popularity)[0];
}
import VehicleCard from "@/components/VehicleCard";

export const dynamic = "force-static";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

const accentMap: Record<string, string> = {
  red: "#ff2d3d",
  blue: "#2fd0ff",
  gold: "#d4af6a",
  white: "#e5e7eb",
};

const compareTargets: Record<string, { label: string; slug: string }[]> = {
  audi: [
    { label: "Audi vs BMW", slug: "bmw" },
    { label: "Audi vs Mercedes-Benz", slug: "mercedes-benz" },
  ],
  bmw: [
    { label: "BMW vs Audi", slug: "audi" },
    { label: "BMW vs Mercedes-Benz", slug: "mercedes-benz" },
  ],
  "mercedes-benz": [
    { label: "Mercedes-Benz vs Audi", slug: "audi" },
    { label: "Mercedes-Benz vs BMW", slug: "bmw" },
  ],
};

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const vehicles = getVehiclesByBrand(brand.name);
  const accent = accentMap[brand.accent];
  const performanceModels = [...vehicles].sort((a, b) => b.performance - a.performance).slice(0, 4);
  const luxuryModels = [...vehicles].sort((a, b) => b.luxury - a.luxury).slice(0, 4);
  const electricModels = vehicles.filter((v) => v.fuel === "Electric");
  const popularModels = [...vehicles].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const compares = compareTargets[brand.slug];

  return (
    <div className="cv-bg-grid">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-14">
        <div
          className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full opacity-25 blur-[110px]"
          style={{ background: accent }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs text-white/40">
            <Link href="/brands" className="hover:text-white">Brands</Link> / {brand.name}
          </p>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span
              className="flex h-20 w-20 items-center justify-center rounded-2xl font-display text-2xl font-800 text-cv-black"
              style={{ background: `linear-gradient(135deg, ${accent}, white)` }}
            >
              {brand.logoText}
            </span>
            <div>
              {brand.priority && (
                <span className="mb-2 inline-block rounded-full bg-gradient-to-r from-cv-red to-cv-gold px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-white">
                  German Icon
                </span>
              )}
              <h1 className="font-display text-4xl font-800">{brand.name}</h1>
              <p className="text-sm uppercase tracking-widest text-white/45">
                {brand.country} · Founded {brand.founded} · &ldquo;{brand.tagline}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="cv-glass rounded-2xl border border-white/10 p-6">
              <h3 className="font-700 text-white/80">Brand History & Overview</h3>
              <p className="mt-2 text-sm text-white/60">{brand.description}</p>
            </div>
            <div className="cv-glass rounded-2xl border border-white/10 p-6">
              <h3 className="font-700 text-white/80">Brand Philosophy</h3>
              <p className="mt-2 text-sm text-white/60">{brand.philosophy}</p>
            </div>
          </div>

          {compares && (
            <div className="mt-8 flex flex-wrap gap-3">
              {compares.map((c) => {
                const targetBrand = getBrandBySlug(c.slug);
                const targetTop = targetBrand ? topModel(getVehiclesByBrand(targetBrand.name)) : undefined;
                const selfTop = topModel(vehicles);
                return (
                  <Link
                    key={c.slug}
                    href={`/compare?a=${selfTop?.slug ?? ""}&b=${targetTop?.slug ?? ""}`}
                    className="cv-btn cv-btn-electric px-4 py-2 text-sm"
                  >
                    {c.label} →
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-800">Popular Models</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularModels.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-800">Performance Models</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {performanceModels.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-800">Luxury Models</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {luxuryModels.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      {electricModels.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-2xl font-800">Electric Models</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {electricModels.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-800">Complete {brand.name} Lineup</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>
    </div>
  );
}
