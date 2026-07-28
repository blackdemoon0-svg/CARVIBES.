"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Vehicle, getVehicleBySlug, getVehiclesByBrand } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import ScoreRing from "@/components/ScoreRing";
import StatBar from "@/components/StatBar";
import { GalleryButton, ImagesButton } from "@/components/VehicleActions";
import { useAppState } from "@/context/AppStateContext";
import VehicleCombobox from "@/components/VehicleCombobox";

const slotColors = ["#ff2d3d", "#2fd0ff", "#d4af6a"];

function practicality(v: Vehicle) {
  return Math.round(v.seats * 8 + v.reliability * 0.3 + v.comfort * 0.3 - v.price / 20000);
}

const quickPresets = [
  { label: "Audi vs BMW", brandA: "Audi", brandB: "BMW" },
  { label: "Audi vs Mercedes-Benz", brandA: "Audi", brandB: "Mercedes-Benz" },
  { label: "BMW vs Mercedes-Benz", brandA: "BMW", brandB: "Mercedes-Benz" },
];

function topModel(brand: string) {
  return [...getVehiclesByBrand(brand)].sort((a, b) => b.popularity - a.popularity)[0];
}

export default function CompareClient({ vehicles }: { vehicles: Vehicle[] }) {
  const params = useSearchParams();
  const { compareList, saveComparison } = useAppState();

  const initial = useMemo(() => {
    const fromQuery = [params.get("a"), params.get("b"), params.get("c")].filter(Boolean) as string[];
    if (fromQuery.length >= 2) return fromQuery.slice(0, 3);
    if (compareList.length >= 2) return compareList.slice(0, 3);
    return [];
  }, [params, compareList]);

  const [slots, setSlots] = useState<(string | null)[]>([
    initial[0] ?? null,
    initial[1] ?? null,
    initial[2] ?? null,
  ]);
  const [mode, setMode] = useState<2 | 3>(initial[2] ? 3 : 2);

  const [priorities, setPriorities] = useState({
    performance: 3,
    comfort: 3,
    reliability: 3,
    technology: 3,
    safety: 3,
    luxury: 3,
    practicality: 3,
  });

  const selected = slots.slice(0, mode).map((s) => (s ? getVehicleBySlug(s) : undefined));
  const validSelected = selected.filter(Boolean) as Vehicle[];

  const sortedVehicles = useMemo(() => [...vehicles].sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model)), [vehicles]);

  function setSlot(index: number, slug: string) {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = slug || null;
      return next;
    });
  }

  function applyPreset(brandA: string, brandB: string) {
    const a = topModel(brandA);
    const b = topModel(brandB);
    setMode(2);
    setSlots([a?.slug ?? null, b?.slug ?? null, null]);
  }

  const maxValues = {
    price: Math.max(...vehicles.map((v) => v.price)),
    hp: Math.max(...vehicles.map((v) => v.hp)),
    torque: Math.max(...vehicles.map((v) => v.torque)),
    topSpeed: Math.max(...vehicles.map((v) => v.topSpeed)),
  };

  const metricRows: {
    label: string;
    get: (v: Vehicle) => number;
    format: (v: Vehicle) => string;
    higherIsBetter: boolean;
    max: number;
  }[] = [
    { label: "Price", get: (v) => v.price, format: (v) => formatPrice(v.price), higherIsBetter: false, max: maxValues.price },
    { label: "Horsepower", get: (v) => v.hp, format: (v) => `${v.hp} hp`, higherIsBetter: true, max: maxValues.hp },
    { label: "Torque", get: (v) => v.torque, format: (v) => `${v.torque} Nm`, higherIsBetter: true, max: maxValues.torque },
    { label: "0-100 km/h", get: (v) => 20 - v.accel, format: (v) => `${v.accel}s`, higherIsBetter: true, max: 20 },
    { label: "Top Speed", get: (v) => v.topSpeed, format: (v) => `${v.topSpeed} km/h`, higherIsBetter: true, max: maxValues.topSpeed },
    { label: "Comfort", get: (v) => v.comfort, format: (v) => `${v.comfort}/100`, higherIsBetter: true, max: 100 },
    { label: "Performance", get: (v) => v.performance, format: (v) => `${v.performance}/100`, higherIsBetter: true, max: 100 },
    { label: "Reliability", get: (v) => v.reliability, format: (v) => `${v.reliability}/100`, higherIsBetter: true, max: 100 },
    { label: "Technology", get: (v) => v.technology, format: (v) => `${v.technology}/100`, higherIsBetter: true, max: 100 },
    { label: "Safety", get: (v) => v.safety, format: (v) => `${v.safety}/100`, higherIsBetter: true, max: 100 },
    { label: "Luxury", get: (v) => v.luxury, format: (v) => `${v.luxury}/100`, higherIsBetter: true, max: 100 },
    { label: "Practicality", get: (v) => practicality(v), format: (v) => `${practicality(v)} pts`, higherIsBetter: true, max: 120 },
  ];

  function winnerIndex(row: (typeof metricRows)[number]) {
    if (validSelected.length < 2) return -1;
    const values = validSelected.map((v) => row.get(v));
    const best = row.higherIsBetter ? Math.max(...values) : Math.min(...values);
    return values.indexOf(best);
  }

  const weightedScores = validSelected.map((v) => {
    const total =
      v.performance * priorities.performance +
      v.comfort * priorities.comfort +
      v.reliability * priorities.reliability +
      v.technology * priorities.technology +
      v.safety * priorities.safety +
      v.luxury * priorities.luxury +
      Math.min(100, practicality(v)) * priorities.practicality;
    const weightSum = Object.values(priorities).reduce((a, b) => a + b, 0);
    return Math.round(total / weightSum);
  });

  const winnerCarIndex = weightedScores.length
    ? weightedScores.indexOf(Math.max(...weightedScores))
    : -1;

  return (
    <div className="cv-bg-grid mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-red">Head to Head</span>
        <h1 className="mt-2 font-display text-4xl font-800">Compare Cars</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Select 2 or 3 vehicles from the 130+ car database for a full statistical breakdown, or jump
          straight into a German Icons showdown.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {quickPresets.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p.brandA, p.brandB)} className="cv-btn cv-btn-ghost px-4 py-2 text-sm">
            {p.label}
          </button>
        ))}
        <button
          onClick={() => setMode(mode === 2 ? 3 : 2)}
          className="cv-btn cv-btn-electric ml-auto px-4 py-2 text-sm"
        >
          {mode === 2 ? "+ Add a 3rd car" : "− Compare only 2"}
        </button>
      </div>

      {/* Selectors */}
      <div className={`grid gap-5 ${mode === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {Array.from({ length: mode }).map((_, i) => (
          <div key={i} className="cv-glass rounded-2xl border border-white/10 p-5" style={{ borderTopColor: slotColors[i], borderTopWidth: 3 }}>
            <label className="text-xs font-600 uppercase tracking-wide text-white/45">Vehicle {i + 1}</label>
            <div className="mt-2">
              <VehicleCombobox
                vehicles={sortedVehicles}
                value={slots[i]}
                onChange={(slug) => setSlot(i, slug)}
                accent={slotColors[i]}
              />
            </div>
            {selected[i] && (
              <div className="mt-4 text-center">
                <p className="font-display text-lg font-700">{selected[i]!.fullName}</p>
                <p className="text-sm text-white/50">{formatPrice(selected[i]!.price)}</p>
                <div className="mt-3 flex justify-center gap-2">
                  <GalleryButton searchQuery={selected[i]!.searchQuery} label="Gallery" />
                  <ImagesButton searchQuery={selected[i]!.searchQuery} label="Images" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {validSelected.length >= 2 ? (
        <>
          {/* Score rings row */}
          <div className="mt-14 grid gap-6" style={{ gridTemplateColumns: `repeat(${validSelected.length}, 1fr)` }}>
            {validSelected.map((v, i) => (
              <div key={v.id} className="cv-glass rounded-2xl border border-white/10 p-6 text-center">
                <p className="font-display text-lg font-700" style={{ color: slotColors[i] }}>
                  {v.fullName}
                </p>
                <div className="mt-4 flex justify-center">
                  <ScoreRing value={weightedScores[i]} label="Match Score" size={100} color={slotColors[i]} />
                </div>
              </div>
            ))}
          </div>

          {/* Detailed comparison table */}
          <div className="mt-14 cv-glass overflow-x-auto rounded-2xl border border-white/10 p-6">
            <h2 className="mb-6 font-display text-xl font-700">Detailed Comparison</h2>
            <div className="min-w-[600px] space-y-5">
              {metricRows.map((row) => {
                const win = winnerIndex(row);
                return (
                  <div key={row.label}>
                    <p className="mb-2 text-xs font-600 uppercase tracking-wide text-white/45">{row.label}</p>
                    <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${validSelected.length}, 1fr)` }}>
                      {validSelected.map((v, i) => (
                        <div key={v.id} className={win === i ? "rounded-lg bg-white/5 p-2 ring-1 ring-white/20" : "p-2"}>
                          <StatBar
                            label={win === i ? `${v.fullName} 👑` : v.fullName}
                            value={(row.get(v) / row.max) * 100}
                            displayValue={row.format(v)}
                            color={slotColors[i]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priorities */}
          <div className="mt-14 cv-glass rounded-2xl border border-white/10 p-7">
            <h2 className="font-display text-xl font-700">Tell us your priorities</h2>
            <p className="mt-1 text-sm text-white/50">
              Adjust these sliders to change how we calculate &ldquo;Which car is better for you?&rdquo;
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {(Object.keys(priorities) as (keyof typeof priorities)[]).map((key) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-600 capitalize text-white/60">{key}</span>
                    <span className="font-700 text-cv-blue">{priorities[key]}/5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={priorities[key]}
                    onChange={(e) => setPriorities((p) => ({ ...p, [key]: Number(e.target.value) }))}
                    className="mt-2 w-full accent-[#2fd0ff]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-14 cv-glass rounded-2xl border border-cv-gold/30 bg-gradient-to-br from-cv-gold/10 to-transparent p-8 text-center">
            <h2 className="font-display text-2xl font-800">Which car is better for you?</h2>
            {winnerCarIndex >= 0 && (
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                Based on your priorities, the{" "}
                <span className="font-700 text-cv-gold">{validSelected[winnerCarIndex].fullName}</span>{" "}
                comes out ahead with a weighted score of {weightedScores[winnerCarIndex]}/100. It leads in{" "}
                {metricRows.filter((r) => winnerIndex(r) === winnerCarIndex).length} of {metricRows.length}{" "}
                measured categories among your selection.
              </p>
            )}
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => saveComparison(validSelected.map((v) => v.slug))}
                className="cv-btn cv-btn-primary px-5 py-2.5 text-sm"
              >
                💾 Save this comparison
              </button>
              <Link href="/favorites" className="cv-btn cv-btn-ghost px-5 py-2.5 text-sm">
                View Saved Comparisons →
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-16 cv-glass rounded-2xl border border-white/10 p-16 text-center text-white/50">
          Select at least 2 vehicles above to see a full comparison.
        </div>
      )}
    </div>
  );
}
