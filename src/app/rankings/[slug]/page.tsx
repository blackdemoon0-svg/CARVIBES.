import Link from "next/link";
import { notFound } from "next/navigation";
import { rankingLists, getRankingBySlug, getRankedVehicles } from "@/lib/rankings";
import { formatPrice } from "@/lib/format";
import { GalleryButton, ImagesButton, FavoriteButton, CompareButton } from "@/components/VehicleActions";

export const dynamic = "force-static";

export function generateStaticParams() {
  return rankingLists.map((r) => ({ slug: r.slug }));
}

export default async function RankingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ranking = getRankingBySlug(slug);
  if (!ranking) notFound();

  const list = getRankedVehicles(ranking, 10);
  const maxValue = Math.max(...list.map((v) => ranking.getValue(v)));

  return (
    <div className="cv-bg-grid mx-auto max-w-5xl px-5 py-16">
      <p className="text-xs text-white/40">
        <Link href="/rankings" className="hover:text-white">Rankings</Link> / {ranking.title}
      </p>
      <h1 className="mt-3 font-display text-4xl font-800">{ranking.title}</h1>
      <p className="mt-3 max-w-2xl text-white/60">{ranking.description}</p>

      <div className="mt-10 space-y-4">
        {list.map((v, i) => {
          const val = ranking.getValue(v);
          return (
            <div key={v.id} className="cv-glass rounded-2xl border border-white/10 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cv-red via-cv-gold to-cv-blue font-display text-xl font-800 text-cv-black">
                  #{i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/40">{v.brand} · {v.category}</p>
                      <Link href={`/cars/${v.slug}`} className="font-display text-lg font-700 hover:text-cv-blue">
                        {v.model}
                      </Link>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-800">{ranking.formatValue(v)}</p>
                      <p className="text-xs text-white/40">{formatPrice(v.price)}</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="cv-grow-bar h-full rounded-full bg-gradient-to-r from-cv-red via-cv-gold to-cv-blue"
                      style={{ width: `${(val / maxValue) * 100}%` }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <GalleryButton searchQuery={v.searchQuery} />
                    <ImagesButton searchQuery={v.searchQuery} />
                    <CompareButton slug={v.slug} />
                    <FavoriteButton slug={v.slug} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
