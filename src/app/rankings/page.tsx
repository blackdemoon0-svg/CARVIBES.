import Link from "next/link";
import { rankingLists, getRankedVehicles } from "@/lib/rankings";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-static";

const icons: Record<string, string> = {
  "fastest-cars": "🏁",
  "best-sports-cars": "🔥",
  "best-luxury-cars": "💎",
  "most-reliable-cars": "🛡️",
  "best-electric-cars": "⚡",
  "best-suvs": "🚙",
  "best-under-40k": "💰",
  "most-comfortable-cars": "🛋️",
  "best-performance-cars": "🚀",
  "best-daily-cars": "🗓️",
};

export default function RankingsPage() {
  return (
    <div className="cv-bg-grid mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-gold">Data-Driven Lists</span>
        <h1 className="mt-2 font-display text-4xl font-800">Rankings</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Explore the top vehicles across every dimension — from outright speed to reliability,
          comfort, and value.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {rankingLists.map((r) => {
          const top3 = getRankedVehicles(r, 3);
          return (
            <Link key={r.slug} href={`/rankings/${r.slug}`} className="cv-card cv-glass rounded-2xl border border-white/10 p-7">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icons[r.slug]}</span>
                <h2 className="font-display text-xl font-700">{r.title}</h2>
              </div>
              <p className="mt-2 text-sm text-white/55">{r.description}</p>
              <div className="mt-5 space-y-2">
                {top3.map((v, i) => (
                  <div key={v.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="font-display font-700 text-cv-gold">#{i + 1}</span>
                      <span className="font-600">{v.fullName}</span>
                    </span>
                    <span className="text-white/50">{formatPrice(v.price)}</span>
                  </div>
                ))}
              </div>
              <span className="mt-5 inline-block text-sm font-700 text-cv-blue">View full top 10 →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
