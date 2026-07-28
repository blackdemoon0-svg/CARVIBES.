import Link from "next/link";
import { brands, getBrandVehicleCount } from "@/data/brands";

export const dynamic = "force-static";

const accentMap: Record<string, string> = {
  red: "#ff2d3d",
  blue: "#2fd0ff",
  gold: "#d4af6a",
  white: "#e5e7eb",
};

export default function BrandsPage() {
  const priority = brands.filter((b) => b.priority);
  const rest = brands.filter((b) => !b.priority);

  return (
    <div className="cv-bg-grid mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-gold">Global Brands</span>
        <h1 className="mt-2 font-display text-4xl font-800">Brands</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          {brands.length} legendary automakers, from mass-market icons to ultra-exclusive hypercar
          houses. Audi, BMW, and Mercedes-Benz lead the way as CarVibes&apos; German Icons.
        </p>
      </div>

      <h2 className="mb-5 font-display text-xl font-700 text-cv-gold">German Icons</h2>
      <div className="mb-16 grid gap-6 md:grid-cols-3">
        {priority.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>

      <h2 className="mb-5 font-display text-xl font-700">All Brands</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rest.map((b) => (
          <BrandCard key={b.slug} brand={b} small />
        ))}
      </div>
    </div>
  );
}

function BrandCard({ brand, small }: { brand: (typeof brands)[number]; small?: boolean }) {
  const accent = accentMap[brand.accent];
  const count = getBrandVehicleCount(brand.name);
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={`cv-card cv-glass block rounded-2xl border border-white/10 ${small ? "p-5" : "p-7"}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex items-center justify-center rounded-xl font-display font-800 text-cv-black ${
            small ? "h-11 w-11 text-sm" : "h-14 w-14 text-lg"
          }`}
          style={{ background: `linear-gradient(135deg, ${accent}, white)` }}
        >
          {brand.logoText}
        </span>
        <span className="text-xs font-600 text-white/40">{count} models</span>
      </div>
      <h3 className={`mt-4 font-display font-700 ${small ? "text-base" : "text-xl"}`}>{brand.name}</h3>
      <p className="text-xs uppercase tracking-widest text-white/40">{brand.country}</p>
      {!small && <p className="mt-3 text-sm text-white/60 line-clamp-2">{brand.description}</p>}
    </Link>
  );
}
