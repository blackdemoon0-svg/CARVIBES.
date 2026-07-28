import Link from "next/link";
import { getAllVehicles, getVehiclesByBrand } from "@/data/vehicles";
import { priorityBrands, getBrandVehicleCount } from "@/data/brands";
import { newsArticles } from "@/data/news";
import { rankingLists, getRankedVehicles } from "@/lib/rankings";
import VehicleCard from "@/components/VehicleCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScoreRing from "@/components/ScoreRing";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-static";

const brandAccent: Record<string, string> = {
  Audi: "#ff2d3d",
  BMW: "#2fd0ff",
  "Mercedes-Benz": "#d4af6a",
};

export default function HomePage() {
  const vehicles = getAllVehicles();
  const popular = [...vehicles].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  const trendingNews = newsArticles.filter((n) => n.trending).slice(0, 3);
  const fastest = getRankedVehicles(rankingLists[0], 5);
  const sportsCars = getRankedVehicles(rankingLists[1], 5);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="cv-hero-glow cv-bg-grid relative overflow-hidden px-5 pb-24 pt-20 md:pt-28">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-[500px] w-[500px] rounded-full bg-cv-red/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cv-blue/20 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl text-center">
          <span className="cv-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-600 uppercase tracking-[0.2em] text-white/70">
            The complete automotive universe
          </span>

          <h1 className="cv-fade-up mt-6 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-800 leading-[1.02] tracking-tight text-white" style={{ animationDelay: "0.1s" }}>
            Find the car that
            <br />
            <span className="cv-text-gradient">fits your vibe.</span>
          </h1>

          <p className="cv-fade-up mx-auto mt-6 max-w-2xl text-lg text-white/60" style={{ animationDelay: "0.2s" }}>
            Discover, compare, and find your perfect car among 130+ vehicles from Audi, BMW,
            Mercedes-Benz, and every major automaker on earth.
          </p>

          <div className="cv-fade-up mt-9 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.3s" }}>
            <Link href="/explore" className="cv-btn cv-btn-primary px-7 py-3.5 text-sm">
              🚗 Explore Cars
            </Link>
            <Link href="/find-my-car" className="cv-btn cv-btn-electric px-7 py-3.5 text-sm">
              🎯 Find My Car
            </Link>
            <Link href="/compare" className="cv-btn cv-btn-ghost px-7 py-3.5 text-sm">
              ⇄ Compare Cars
            </Link>
          </div>

          {/* Animated statistics instead of hero imagery */}
          <div className="cv-fade-up mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4" style={{ animationDelay: "0.4s" }}>
            {[
              { end: vehicles.length, suffix: "+", label: "Vehicles Tracked" },
              { end: 35, suffix: "+", label: "Global Brands" },
              { end: 1600, suffix: " hp", label: "Peak Horsepower" },
              { end: 420, suffix: " km/h", label: "Top Recorded Speed" },
            ].map((s) => (
              <div key={s.label} className="cv-glass rounded-2xl border border-white/10 p-5">
                <p className="text-2xl font-800 text-white md:text-3xl">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GERMAN ICONS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-gold">Priority Showcase</span>
            <h2 className="mt-2 font-display text-3xl font-800 md:text-4xl">Explore the German Icons</h2>
            <p className="mt-3 max-w-xl text-white/55">
              Audi, BMW, and Mercedes-Benz define premium automotive engineering. Dive into each
              brand&apos;s complete lineup or jump straight into a head-to-head comparison.
            </p>
          </div>
          <Link href="/compare" className="cv-btn cv-btn-electric px-5 py-3 text-sm">
            Compare Audi vs BMW vs Mercedes
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {priorityBrands.map((brand) => {
            const accent = brandAccent[brand.name] ?? "#2fd0ff";
            const bestModel = [...getVehiclesByBrand(brand.name)].sort((a, b) => b.popularity - a.popularity)[0];
            return (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="cv-card cv-glass group relative overflow-hidden rounded-3xl border border-white/10 p-7"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-40"
                  style={{ background: accent }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-800 text-cv-black"
                    style={{ background: `linear-gradient(135deg, ${accent}, white)` }}
                  >
                    {brand.logoText}
                  </span>
                  <span className="text-xs font-600 text-white/40">{getBrandVehicleCount(brand.name)} models</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-700">{brand.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{brand.tagline}</p>
                <p className="mt-4 text-sm text-white/60 line-clamp-3">{brand.description}</p>
                {bestModel && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                    <p className="text-white/40">Popular right now</p>
                    <p className="mt-1 font-700 text-white">{bestModel.fullName}</p>
                    <p className="text-white/50">{formatPrice(bestModel.price)} · {bestModel.hp} hp</p>
                  </div>
                )}
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-700" style={{ color: accent }}>
                  Explore {brand.name} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ POPULAR CARS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-blue">Most Popular</span>
            <h2 className="mt-2 font-display text-3xl font-800 md:text-4xl">Popular Cars Right Now</h2>
          </div>
          <Link href="/explore" className="cv-btn cv-btn-ghost px-5 py-3 text-sm">
            View all 130+ vehicles →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      {/* ============ RANKINGS PREVIEW ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10">
          <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-gold">Data-Driven</span>
          <h2 className="mt-2 font-display text-3xl font-800 md:text-4xl">Popular Rankings</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="cv-glass rounded-3xl border border-white/10 p-7">
            <h3 className="font-display text-xl font-700">🏁 Fastest Cars</h3>
            <div className="mt-5 space-y-4">
              {fastest.map((v, i) => (
                <div key={v.id} className="flex items-center gap-4">
                  <span className="font-display text-lg font-700 text-cv-gold">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-700 text-white">{v.fullName}</p>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-white/8">
                      <div
                        className="cv-grow-bar h-full rounded-full bg-gradient-to-r from-cv-red to-cv-gold"
                        style={{ width: `${(v.topSpeed / 420) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-700 text-white/70">{v.topSpeed} km/h</span>
                </div>
              ))}
            </div>
            <Link href="/rankings/fastest-cars" className="mt-6 inline-block text-sm font-700 text-cv-red">
              See full ranking →
            </Link>
          </div>
          <div className="cv-glass rounded-3xl border border-white/10 p-7">
            <h3 className="font-display text-xl font-700">🔥 Best Sports Cars</h3>
            <div className="mt-5 space-y-4">
              {sportsCars.map((v, i) => (
                <div key={v.id} className="flex items-center gap-4">
                  <span className="font-display text-lg font-700 text-cv-blue">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-700 text-white">{v.fullName}</p>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-white/8">
                      <div
                        className="cv-grow-bar h-full rounded-full bg-gradient-to-r from-cv-blue to-white"
                        style={{ width: `${v.performance}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-700 text-white/70">{v.performance}/100</span>
                </div>
              ))}
            </div>
            <Link href="/rankings/best-sports-cars" className="mt-6 inline-block text-sm font-700 text-cv-blue">
              See full ranking →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FIND MY CAR + COMPARE CTA ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="cv-glass relative overflow-hidden rounded-3xl border border-white/10 p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cv-blue/25 blur-3xl" />
            <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-blue">Personalized</span>
            <h3 className="mt-2 font-display text-3xl font-800">Find My Car</h3>
            <p className="mt-3 text-white/60">
              Set your exact budget, priorities, and lifestyle. Our matching engine scans the entire
              130+ vehicle database to surface your best matches with a compatibility score.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <ScoreRing value={95} label="Sample Match" size={72} color="#2fd0ff" />
              <div className="text-sm text-white/60">
                Answer a few quick questions and get instant, ranked recommendations tailored to your
                budget — from $18K hatchbacks to $3M+ hypercars.
              </div>
            </div>
            <Link href="/find-my-car" className="cv-btn cv-btn-electric mt-7 px-6 py-3 text-sm">
              Start Matching →
            </Link>
          </div>

          <div className="cv-glass relative overflow-hidden rounded-3xl border border-white/10 p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cv-red/25 blur-3xl" />
            <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-red">Head to Head</span>
            <h3 className="mt-2 font-display text-3xl font-800">Compare Cars</h3>
            <p className="mt-3 text-white/60">
              Put 2 or 3 vehicles side-by-side across performance, comfort, technology, safety, and
              luxury. Get an instant verdict on which car is better for you.
            </p>
            <div className="mt-6 flex gap-3">
              <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-center text-xs">
                <p className="font-700 text-cv-red">Audi RS6</p>
                <p className="text-white/40">vs</p>
                <p className="font-700 text-cv-blue">BMW M5</p>
              </div>
              <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-center text-xs">
                <p className="font-700 text-cv-gold">G-Class</p>
                <p className="text-white/40">vs</p>
                <p className="font-700 text-white">Range Rover</p>
              </div>
            </div>
            <Link href="/compare" className="cv-btn cv-btn-primary mt-7 px-6 py-3 text-sm">
              Start Comparing →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TRENDING NEWS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-gold">Automotive World</span>
            <h2 className="mt-2 font-display text-3xl font-800 md:text-4xl">Trending Automotive News</h2>
          </div>
          <Link href="/news" className="cv-btn cv-btn-ghost px-5 py-3 text-sm">
            Read all news →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {trendingNews.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="cv-card cv-glass rounded-2xl border border-white/10 p-6"
            >
              <span className="rounded-full bg-cv-red/20 px-3 py-1 text-[10px] font-700 uppercase tracking-wide text-cv-red">
                {n.category}
              </span>
              <h3 className="mt-4 font-display text-lg font-700 leading-snug">{n.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-white/55">{n.excerpt}</p>
              <p className="mt-4 text-xs text-white/35">
                {new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {n.readTime} min read
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FOLLOW CARVIBES ============ */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="cv-glass relative overflow-hidden rounded-3xl border border-white/10 p-10 text-center">
          <div className="pointer-events-none absolute inset-0 cv-bg-grid opacity-20" />
          <h2 className="relative font-display text-3xl font-800 md:text-4xl">Follow CarVibes</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/60">
            Cinematic reviews, rankings, and comparisons — join the CarVibes community on YouTube and
            Instagram.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href="http://www.youtube.com/@CarVibes-m6i"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-btn cv-btn-primary px-6 py-3 text-sm"
            >
              ▶ Subscribe on YouTube
            </a>
            <a
              href="https://www.instagram.com/carvibesinsta/"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-btn cv-btn-gold px-6 py-3 text-sm"
            >
              📷 Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
