import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllVehicles, getVehicleBySlug, getSimilarVehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import ScoreRing from "@/components/ScoreRing";
import StatBar from "@/components/StatBar";
import VehicleCard from "@/components/VehicleCard";
import VehicleSilhouette from "@/components/VehicleSilhouette";
import { GalleryButton, ImagesButton, FavoriteButton, CompareButton } from "@/components/VehicleActions";
import RecentlyViewedTracker from "@/components/RecentlyViewedTracker";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllVehicles().map((v) => ({ slug: v.slug }));
}

const brandAccent: Record<string, string> = {
  Audi: "#ff2d3d",
  BMW: "#2fd0ff",
  "Mercedes-Benz": "#d4af6a",
};

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const accent = brandAccent[vehicle.brand] ?? "#2fd0ff";
  const similar = getSimilarVehicles(vehicle, 4);

  return (
    <div className="cv-bg-grid">
      <RecentlyViewedTracker slug={vehicle.slug} />

      {/* HERO / SPEC HEADER */}
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-14">
        <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full opacity-20 blur-[110px]" style={{ background: accent }} />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs text-white/40">
            <Link href="/explore" className="hover:text-white">Explore Cars</Link> / {vehicle.brand} / {vehicle.model}
          </p>

          <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex-1">
              {vehicle.priority && (
                <span className="mb-3 inline-block rounded-full bg-gradient-to-r from-cv-red to-cv-gold px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-white">
                  German Icon
                </span>
              )}
              <p className="text-sm font-600 uppercase tracking-wider text-white/50">
                {vehicle.brand} · {vehicle.year}
              </p>
              <h1 className="mt-1 font-display text-4xl font-800 md:text-5xl">{vehicle.model}</h1>
              <p className="mt-4 max-w-xl text-white/60">{vehicle.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="font-display text-3xl font-800">{formatPrice(vehicle.price)}</span>
                <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-700 text-cv-gold">
                  ★ {(vehicle.overall / 20).toFixed(1)} / 5.0
                </span>
                <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-600 text-white/60">{vehicle.category}</span>
                <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-600 text-white/60">{vehicle.fuel}</span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <GalleryButton searchQuery={vehicle.searchQuery} label="View Gallery" />
                <ImagesButton searchQuery={vehicle.searchQuery} label="View Images" />
                <CompareButton slug={vehicle.slug} />
                <FavoriteButton slug={vehicle.slug} />
                <Link href={`/find-my-car?similarTo=${vehicle.slug}`} className="cv-btn cv-btn-electric px-3 py-2 text-xs">
                  🎯 Find Similar Cars
                </Link>
              </div>
            </div>

            <div className="w-full max-w-md lg:w-[380px]">
              <div className="cv-glass rounded-2xl border border-white/10 p-6">
                <div className="h-28">
                  <VehicleSilhouette category={vehicle.category} accent={accent} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <Stat label="Horsepower" value={`${vehicle.hp} hp`} />
                  <Stat label="Torque" value={`${vehicle.torque} Nm`} />
                  <Stat label="0-100 km/h" value={`${vehicle.accel}s`} />
                  <Stat label="Top Speed" value={`${vehicle.topSpeed} km/h`} />
                  <Stat label="Consumption" value={vehicle.consumption} />
                  <Stat label="Drivetrain" value={vehicle.drive} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCORE RINGS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-800">Performance & Ownership Scores</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          <ScoreRing value={vehicle.performance} label="Performance" color="#ff2d3d" />
          <ScoreRing value={vehicle.comfort} label="Comfort" color="#2fd0ff" />
          <ScoreRing value={vehicle.reliability} label="Reliability" color="#d4af6a" />
          <ScoreRing value={vehicle.technology} label="Technology" color="#2fd0ff" />
          <ScoreRing value={vehicle.safety} label="Safety" color="#ff2d3d" />
          <ScoreRing value={vehicle.luxury} label="Luxury" color="#d4af6a" />
        </div>
      </section>

      {/* FULL SPECS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="cv-glass rounded-2xl border border-white/10 p-7">
            <h3 className="font-display text-xl font-700">Complete Specifications</h3>
            <div className="mt-5 divide-y divide-white/8 text-sm">
              {[
                ["Engine", vehicle.engine],
                ["Fuel Type", vehicle.fuel],
                ["Horsepower", `${vehicle.hp} hp`],
                ["Torque", `${vehicle.torque} Nm`],
                ["0-100 km/h", `${vehicle.accel}s`],
                ["Top Speed", `${vehicle.topSpeed} km/h`],
                ["Consumption", vehicle.consumption],
                ["Drivetrain", vehicle.drive],
                ["Seating Capacity", `${vehicle.seats} seats`],
                ["Category", vehicle.category],
                ["Year", `${vehicle.year}`],
                ["Price", formatPrice(vehicle.price)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5">
                  <span className="text-white/50">{k}</span>
                  <span className="font-700 text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="cv-glass rounded-2xl border border-white/10 p-7">
              <h3 className="font-display text-xl font-700">Detailed Ratings</h3>
              <div className="mt-5 space-y-4">
                <StatBar label="Performance" value={vehicle.performance} color="#ff2d3d" />
                <StatBar label="Comfort" value={vehicle.comfort} color="#2fd0ff" />
                <StatBar label="Reliability" value={vehicle.reliability} color="#d4af6a" />
                <StatBar label="Technology" value={vehicle.technology} color="#2fd0ff" />
                <StatBar label="Safety" value={vehicle.safety} color="#ff2d3d" />
                <StatBar label="Luxury" value={vehicle.luxury} color="#d4af6a" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROS & CONS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-800">Pros & Cons</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cv-blue/25 bg-cv-blue/5 p-7">
            <h3 className="font-700 text-cv-blue">Pros</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {vehicle.pros.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-cv-blue">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-cv-red/25 bg-cv-red/5 p-7">
            <h3 className="font-700 text-cv-red">Cons</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {vehicle.cons.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-cv-red">✕</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SIMILAR CARS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-800">Similar Cars</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <p className="font-display text-sm font-700 text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
    </div>
  );
}
