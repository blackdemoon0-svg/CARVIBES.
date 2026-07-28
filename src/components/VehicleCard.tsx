import Link from "next/link";
import { Vehicle } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import VehicleSilhouette from "./VehicleSilhouette";
import { GalleryButton, ImagesButton, FavoriteButton, CompareButton } from "./VehicleActions";

const brandAccent: Record<string, string> = {
  Audi: "#ff2d3d",
  BMW: "#2fd0ff",
  "Mercedes-Benz": "#d4af6a",
};

export default function VehicleCard({ vehicle, rank }: { vehicle: Vehicle; rank?: number }) {
  const accent = brandAccent[vehicle.brand] ?? "#2fd0ff";

  return (
    <div
      className={`cv-card cv-glass group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 p-5 ${
        vehicle.priority ? "ring-1 ring-white/15" : ""
      }`}
    >
      {vehicle.priority && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-cv-red to-cv-gold px-2.5 py-1 text-[10px] font-700 uppercase tracking-wider text-white">
          German Icon
        </span>
      )}
      {rank && (
        <span className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 font-display text-sm font-700 text-cv-gold">
          #{rank}
        </span>
      )}

      <div className="h-20 opacity-90 transition-transform duration-500 group-hover:scale-105">
        <VehicleSilhouette category={vehicle.category} accent={accent} />
      </div>

      <div className="mt-3">
        <p className="text-xs font-600 uppercase tracking-wider text-white/45">
          {vehicle.brand} · {vehicle.year} · {vehicle.category}
        </p>
        <h3 className="mt-1 font-display text-lg font-700 leading-tight text-white">{vehicle.model}</h3>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-xl font-800 text-white">{formatPrice(vehicle.price)}</span>
        <span className="flex items-center gap-1 text-sm font-700 text-cv-gold">
          ★ {(vehicle.overall / 20).toFixed(1)}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-xs text-white/55">{vehicle.description}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-white/5 p-3 text-center">
        <div>
          <p className="font-display text-sm font-700 text-white">{vehicle.hp}</p>
          <p className="text-[10px] uppercase tracking-wide text-white/40">HP</p>
        </div>
        <div>
          <p className="font-display text-sm font-700 text-white">{vehicle.accel}s</p>
          <p className="text-[10px] uppercase tracking-wide text-white/40">0-100</p>
        </div>
        <div>
          <p className="font-display text-sm font-700 text-white">{vehicle.topSpeed}</p>
          <p className="text-[10px] uppercase tracking-wide text-white/40">km/h</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={`/cars/${vehicle.slug}`} className="cv-btn cv-btn-primary flex-1 px-3 py-2 text-xs">
          View Details
        </Link>
        <GalleryButton searchQuery={vehicle.searchQuery} />
        <ImagesButton searchQuery={vehicle.searchQuery} />
      </div>
      <div className="mt-2 flex gap-2">
        <CompareButton slug={vehicle.slug} className="flex-1" />
        <FavoriteButton slug={vehicle.slug} className="flex-1" />
      </div>
    </div>
  );
}
