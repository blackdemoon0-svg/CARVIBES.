import { Vehicle, getAllVehicles } from "@/data/vehicles";

export interface RankingList {
  slug: string;
  title: string;
  description: string;
  metricLabel: string;
  getValue: (v: Vehicle) => number;
  formatValue: (v: Vehicle) => string;
  filter?: (v: Vehicle) => boolean;
}

export const rankingLists: RankingList[] = [
  {
    slug: "fastest-cars",
    title: "Fastest Cars",
    description: "Ranked by top speed — the outright velocity kings of the CarVibes database.",
    metricLabel: "Top Speed",
    getValue: (v) => v.topSpeed,
    formatValue: (v) => `${v.topSpeed} km/h`,
  },
  {
    slug: "best-sports-cars",
    title: "Best Sports Cars",
    description: "The most engaging sports cars and supercars, ranked by performance score.",
    metricLabel: "Performance Score",
    getValue: (v) => v.performance,
    formatValue: (v) => `${v.performance}/100`,
    filter: (v) => v.category === "Sports Car" || v.category === "Supercar" || v.category === "Coupe",
  },
  {
    slug: "best-luxury-cars",
    title: "Best Luxury Cars",
    description: "The most opulent, refined vehicles ranked by luxury score.",
    metricLabel: "Luxury Score",
    getValue: (v) => v.luxury,
    formatValue: (v) => `${v.luxury}/100`,
  },
  {
    slug: "most-reliable-cars",
    title: "Most Reliable Cars",
    description: "Vehicles most likely to go the distance without unexpected trips to the shop.",
    metricLabel: "Reliability Score",
    getValue: (v) => v.reliability,
    formatValue: (v) => `${v.reliability}/100`,
  },
  {
    slug: "best-electric-cars",
    title: "Best Electric Cars",
    description: "The strongest EVs, balancing performance and technology.",
    metricLabel: "EV Score",
    getValue: (v) => Math.round((v.performance + v.technology) / 2),
    formatValue: (v) => `${Math.round((v.performance + v.technology) / 2)}/100`,
    filter: (v) => v.fuel === "Electric",
  },
  {
    slug: "best-suvs",
    title: "Best SUVs",
    description: "Top-scoring SUVs across comfort, safety, and technology.",
    metricLabel: "Overall Score",
    getValue: (v) => v.overall,
    formatValue: (v) => `${v.overall}/100`,
    filter: (v) => v.category === "SUV",
  },
  {
    slug: "best-under-40k",
    title: "Best Cars Under $40,000",
    description: "Maximum value without stretching the budget.",
    metricLabel: "Overall Score",
    getValue: (v) => v.overall,
    formatValue: (v) => `${v.overall}/100`,
    filter: (v) => v.price <= 40000,
  },
  {
    slug: "most-comfortable-cars",
    title: "Most Comfortable Cars",
    description: "The plushest rides in the CarVibes database.",
    metricLabel: "Comfort Score",
    getValue: (v) => v.comfort,
    formatValue: (v) => `${v.comfort}/100`,
  },
  {
    slug: "best-performance-cars",
    title: "Best Performance Cars",
    description: "Raw acceleration and performance, ranked from fastest to slowest 0-100 km/h.",
    metricLabel: "0-100 km/h",
    getValue: (v) => 20 - v.accel,
    formatValue: (v) => `${v.accel}s`,
  },
  {
    slug: "best-daily-cars",
    title: "Best Daily Cars",
    description: "The best all-rounders for commuting, balancing comfort, reliability, and safety.",
    metricLabel: "Daily Score",
    getValue: (v) => Math.round((v.comfort + v.reliability + v.safety) / 3),
    formatValue: (v) => `${Math.round((v.comfort + v.reliability + v.safety) / 3)}/100`,
  },
];

export function getRankingBySlug(slug: string): RankingList | undefined {
  return rankingLists.find((r) => r.slug === slug);
}

export function getRankedVehicles(ranking: RankingList, limit = 10): Vehicle[] {
  const all = getAllVehicles();
  const filtered = ranking.filter ? all.filter(ranking.filter) : all;
  return [...filtered].sort((a, b) => ranking.getValue(b) - ranking.getValue(a)).slice(0, limit);
}
