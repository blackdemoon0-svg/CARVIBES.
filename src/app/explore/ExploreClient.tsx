"use client";

import { useMemo, useState } from "react";
import { Vehicle, Category, FuelType } from "@/data/vehicles";
import VehicleCard from "@/components/VehicleCard";
import Dropdown from "@/components/Dropdown";

type SortKey = "popularity" | "price-asc" | "price-desc" | "hp" | "topspeed" | "rating";

const sortOptions = [
  { value: "popularity", label: "Sort: Popularity" },
  { value: "price-asc", label: "Sort: Price (low to high)" },
  { value: "price-desc", label: "Sort: Price (high to low)" },
  { value: "hp", label: "Sort: Horsepower" },
  { value: "topspeed", label: "Sort: Top Speed" },
  { value: "rating", label: "Sort: Rating" },
];

export default function ExploreClient({
  vehicles,
  categories,
  fuelTypes,
  brands,
}: {
  vehicles: Vehicle[];
  categories: Category[];
  fuelTypes: FuelType[];
  brands: string[];
}) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3500000);
  const [minHp, setMinHp] = useState(0);
  const [minComfort, setMinComfort] = useState(0);
  const [minReliability, setMinReliability] = useState(0);
  const [minLuxury, setMinLuxury] = useState(0);
  const [sort, setSort] = useState<SortKey>("popularity");

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => {
      if (search && !`${v.brand} ${v.model}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (brand !== "All" && v.brand !== brand) return false;
      if (category !== "All" && v.category !== category) return false;
      if (fuel !== "All" && v.fuel !== fuel) return false;
      if (v.price > maxPrice) return false;
      if (v.hp < minHp) return false;
      if (v.comfort < minComfort) return false;
      if (v.reliability < minReliability) return false;
      if (v.luxury < minLuxury) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "hp":
        list = [...list].sort((a, b) => b.hp - a.hp);
        break;
      case "topspeed":
        list = [...list].sort((a, b) => b.topSpeed - a.topSpeed);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.overall - a.overall);
        break;
      default:
        list = [...list].sort((a, b) => b.popularity - a.popularity);
    }
    // Priority brands bubble slightly when sorting by popularity
    if (sort === "popularity") {
      list = [...list].sort((a, b) => Number(b.priority) - Number(a.priority));
      list = list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [vehicles, search, brand, category, fuel, maxPrice, minHp, minComfort, minReliability, minLuxury, sort]);

  function resetFilters() {
    setSearch("");
    setBrand("All");
    setCategory("All");
    setFuel("All");
    setMaxPrice(3500000);
    setMinHp(0);
    setMinComfort(0);
    setMinReliability(0);
    setMinLuxury(0);
    setSort("popularity");
  }

  return (
    <div className="cv-bg-grid mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <span className="text-xs font-700 uppercase tracking-[0.25em] text-cv-blue">130+ Vehicles</span>
        <h1 className="mt-2 font-display text-4xl font-800">Explore Cars</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Search and filter the entire CarVibes database — from budget hatchbacks to million-dollar
          hypercars. Audi, BMW, and Mercedes-Benz are highlighted as German Icons throughout.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* FILTERS */}
        <aside className="cv-glass sticky top-24 h-fit rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-700 uppercase tracking-wide">Filters</h2>
            <button onClick={resetFilters} className="text-xs font-600 text-cv-blue hover:underline">
              Reset all
            </button>
          </div>

          <div className="mt-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brand or model..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cv-blue/60"
            />
          </div>

          <FilterSelect label="Brand" value={brand} onChange={setBrand} options={["All", ...brands]} />
          <FilterSelect label="Category" value={category} onChange={setCategory} options={["All", ...categories]} />
          <FilterSelect label="Fuel Type" value={fuel} onChange={setFuel} options={["All", ...fuelTypes]} />

          <RangeFilter
            label="Max Price"
            value={maxPrice}
            min={18000}
            max={3500000}
            step={1000}
            onChange={setMaxPrice}
            format={(v) => `$${v.toLocaleString()}`}
          />
          <RangeFilter label="Min Horsepower" value={minHp} min={0} max={1600} step={10} onChange={setMinHp} format={(v) => `${v} hp`} />
          <RangeFilter label="Min Comfort" value={minComfort} min={0} max={100} step={5} onChange={setMinComfort} format={(v) => `${v}/100`} />
          <RangeFilter label="Min Reliability" value={minReliability} min={0} max={100} step={5} onChange={setMinReliability} format={(v) => `${v}/100`} />
          <RangeFilter label="Min Luxury" value={minLuxury} min={0} max={100} step={5} onChange={setMinLuxury} format={(v) => `${v}/100`} />
        </aside>

        {/* RESULTS */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              Showing <span className="font-700 text-white">{filtered.length}</span> of {vehicles.length} vehicles
            </p>
            <div className="w-64">
              <Dropdown value={sort} onChange={(v) => setSort(v as SortKey)} options={sortOptions} accent="#2fd0ff" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="cv-glass rounded-2xl border border-white/10 p-16 text-center">
              <p className="text-lg font-700">No vehicles match your filters</p>
              <p className="mt-2 text-sm text-white/50">Try widening your price range or clearing filters.</p>
              <button onClick={resetFilters} className="cv-btn cv-btn-primary mt-5 px-5 py-2.5 text-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="mt-4">
      <Dropdown label={label} value={value} onChange={onChange} options={options} accent="#2fd0ff" />
    </div>
  );
}

function RangeFilter({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-600 uppercase tracking-wide text-white/45">{label}</label>
        <span className="text-xs font-700 text-cv-blue">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#2fd0ff]"
      />
    </div>
  );
}
