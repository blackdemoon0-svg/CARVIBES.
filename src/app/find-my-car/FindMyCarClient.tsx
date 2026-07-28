"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Category, FuelType, getVehicleBySlug } from "@/data/vehicles";
import { FindMyCarAnswers, defaultAnswers, findMatches } from "@/lib/findMyCar";
import { formatPrice } from "@/lib/format";
import ScoreRing from "@/components/ScoreRing";
import VehicleSilhouette from "@/components/VehicleSilhouette";
import { GalleryButton, ImagesButton, FavoriteButton, CompareButton } from "@/components/VehicleActions";
import Dropdown from "@/components/Dropdown";

const brandAccent: Record<string, string> = {
  Audi: "#ff2d3d",
  BMW: "#2fd0ff",
  "Mercedes-Benz": "#d4af6a",
};

export default function FindMyCarClient({ categories, fuelTypes }: { categories: Category[]; fuelTypes: FuelType[] }) {
  const params = useSearchParams();
  const similarTo = params.get("similarTo");
  const similarVehicle = similarTo ? getVehicleBySlug(similarTo) : undefined;

  const [answers, setAnswers] = useState<FindMyCarAnswers>(
    similarVehicle
      ? {
          ...defaultAnswers,
          minBudget: Math.max(15000, Math.round(similarVehicle.price * 0.7)),
          maxBudget: Math.round(similarVehicle.price * 1.3),
          bodyTypes: [similarVehicle.category],
          fuelPreference: similarVehicle.fuel,
        }
      : defaultAnswers,
  );
  const [submitted, setSubmitted] = useState(Boolean(similarVehicle));

  const results = submitted ? findMatches(answers, 9) : [];

  function toggleBody(cat: string) {
    setAnswers((a) => ({
      ...a,
      bodyTypes: a.bodyTypes.includes(cat) ? a.bodyTypes.filter((c) => c !== cat) : [...a.bodyTypes, cat],
    }));
  }

  return (
    <div className="cv-bg-grid mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10 text-center">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-blue">Personalized Matching</span>
        <h1 className="mt-2 font-display text-4xl font-800">Find My Car</h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Tell us your exact budget and priorities. Our engine scans the entire 130+ vehicle
          database — from $18K hatchbacks to $3M+ hypercars — to find your best matches.
        </p>
      </div>

      <div className="cv-glass rounded-3xl border border-white/10 p-7 md:p-10">
        {/* Budget */}
        <div>
          <h2 className="font-display text-lg font-700">💰 What is your budget?</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-600 uppercase tracking-wide text-white/45">Minimum budget</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min={15000}
                  max={3400000}
                  step={1000}
                  value={answers.minBudget}
                  onChange={(e) => setAnswers((a) => ({ ...a, minBudget: Number(e.target.value) }))}
                  className="w-full accent-[#ff2d3d]"
                />
              </div>
              <input
                type="number"
                value={answers.minBudget}
                onChange={(e) => setAnswers((a) => ({ ...a, minBudget: Number(e.target.value) }))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-600 uppercase tracking-wide text-white/45">Maximum budget</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min={15000}
                  max={3400000}
                  step={1000}
                  value={answers.maxBudget}
                  onChange={(e) => setAnswers((a) => ({ ...a, maxBudget: Number(e.target.value) }))}
                  className="w-full accent-[#2fd0ff]"
                />
              </div>
              <input
                type="number"
                value={answers.maxBudget}
                onChange={(e) => setAnswers((a) => ({ ...a, maxBudget: Number(e.target.value) }))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-white/50">
            Budget range: <span className="font-700 text-white">{formatPrice(answers.minBudget)}</span> —{" "}
            <span className="font-700 text-white">{formatPrice(answers.maxBudget)}</span>
          </p>
        </div>

        <div className="cv-divider my-8" />

        {/* Body type */}
        <div>
          <h2 className="font-display text-lg font-700">🚙 What type of car do you want?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => toggleBody(c)}
                className={`cv-btn px-4 py-2 text-xs ${answers.bodyTypes.includes(c) ? "cv-btn-electric" : "cv-btn-ghost"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/40">Leave empty to consider all body styles.</p>
        </div>

        <div className="cv-divider my-8" />

        {/* Priority */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-700">⚡ Performance or comfort?</h2>
            <div className="mt-4 flex gap-2">
              {(["performance", "balanced", "comfort"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setAnswers((a) => ({ ...a, priority: p }))}
                  className={`cv-btn flex-1 px-3 py-2 text-xs capitalize ${answers.priority === p ? "cv-btn-primary" : "cv-btn-ghost"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-700">⛽ Fuel preference</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setAnswers((a) => ({ ...a, fuelPreference: "Any" }))}
                className={`cv-btn px-3 py-2 text-xs ${answers.fuelPreference === "Any" ? "cv-btn-primary" : "cv-btn-ghost"}`}
              >
                Any
              </button>
              {fuelTypes.map((f) => (
                <button
                  key={f}
                  onClick={() => setAnswers((a) => ({ ...a, fuelPreference: f }))}
                  className={`cv-btn px-3 py-2 text-xs ${answers.fuelPreference === f ? "cv-btn-primary" : "cv-btn-ghost"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="cv-divider my-8" />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-700">🛡️ Reliability importance</h2>
              <span className="font-700 text-cv-blue">{answers.reliabilityImportance}/5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={answers.reliabilityImportance}
              onChange={(e) => setAnswers((a) => ({ ...a, reliabilityImportance: Number(e.target.value) }))}
              className="mt-3 w-full accent-[#2fd0ff]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-700">💎 Luxury importance</h2>
              <span className="font-700 text-cv-gold">{answers.luxuryImportance}/5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={answers.luxuryImportance}
              onChange={(e) => setAnswers((a) => ({ ...a, luxuryImportance: Number(e.target.value) }))}
              className="mt-3 w-full accent-[#d4af6a]"
            />
          </div>
        </div>

        <div className="cv-divider my-8" />

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-display text-base font-700">👥 Seats needed</h2>
            <div className="mt-3">
              <Dropdown
                value={String(answers.seats)}
                onChange={(v) => setAnswers((a) => ({ ...a, seats: Number(v) }))}
                options={[2, 4, 5, 7, 8].map((s) => ({ value: String(s), label: `${s}+ seats` }))}
                accent="#2fd0ff"
              />
            </div>
          </div>
          <div>
            <h2 className="font-display text-base font-700">🛣️ Where do you drive?</h2>
            <div className="mt-3">
              <Dropdown
                value={answers.usage}
                onChange={(v) => setAnswers((a) => ({ ...a, usage: v as FindMyCarAnswers["usage"] }))}
                options={[
                  { value: "city", label: "Mostly city" },
                  { value: "highway", label: "Mostly highway" },
                  { value: "mixed", label: "Mixed driving" },
                  { value: "offroad", label: "Off-road / rugged terrain" },
                ]}
                accent="#2fd0ff"
              />
            </div>
          </div>
          <div>
            <h2 className="font-display text-base font-700">🔑 New or used?</h2>
            <div className="mt-3">
              <Dropdown
                value={answers.condition}
                onChange={(v) => setAnswers((a) => ({ ...a, condition: v as FindMyCarAnswers["condition"] }))}
                options={[
                  { value: "new", label: "New" },
                  { value: "used", label: "Used / pre-owned" },
                ]}
                accent="#d4af6a"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => setSubmitted(true)} className="cv-btn cv-btn-electric px-8 py-3.5 text-sm">
            🎯 Show My Best Matches
          </button>
        </div>
      </div>

      {submitted && (
        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-800">Your Best Matches</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-white/55">
            Ranked by compatibility with your budget, priorities, and lifestyle.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(({ vehicle, score, reasons }) => {
              const accent = brandAccent[vehicle.brand] ?? "#2fd0ff";
              return (
                <div key={vehicle.id} className="cv-card cv-glass rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-24">
                      <VehicleSilhouette category={vehicle.category} accent={accent} />
                    </div>
                    <ScoreRing value={score} label="Match" size={64} color={accent} />
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wide text-white/40">{vehicle.brand}</p>
                  <h3 className="font-display text-lg font-700">{vehicle.model}</h3>
                  <p className="mt-1 font-display text-xl font-800">{formatPrice(vehicle.price)}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-white/5 p-2 text-center text-xs">
                    <div><p className="font-700">{vehicle.hp}</p><p className="text-white/40">HP</p></div>
                    <div><p className="font-700">{vehicle.accel}s</p><p className="text-white/40">0-100</p></div>
                    <div><p className="font-700">{vehicle.topSpeed}</p><p className="text-white/40">km/h</p></div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {reasons.map((r) => (
                      <p key={r} className="flex gap-1.5 text-xs text-white/60">
                        <span className="text-cv-blue">✓</span> {r}
                      </p>
                    ))}
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}
