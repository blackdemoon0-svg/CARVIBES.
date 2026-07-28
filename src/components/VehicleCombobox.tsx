"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Vehicle } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";

const brandAccent: Record<string, string> = {
  Audi: "#ff2d3d",
  BMW: "#2fd0ff",
  "Mercedes-Benz": "#d4af6a",
};

export default function VehicleCombobox({
  vehicles,
  value,
  onChange,
  placeholder = "Select a vehicle…",
  accent = "#2fd0ff",
}: {
  vehicles: Vehicle[];
  value: string | null;
  onChange: (slug: string) => void;
  placeholder?: string;
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = vehicles.find((v) => v.slug === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? vehicles.filter(
          (v) =>
            v.brand.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            v.fullName.toLowerCase().includes(q),
        )
      : vehicles;
    // Priority brands (Audi, BMW, Mercedes-Benz) surface first, then alphabetical.
    return [...list].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority ? -1 : 1;
      return a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model);
    });
  }, [vehicles, query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#0d0f14] px-3 py-2.5 text-left text-sm text-white outline-none transition focus:border-cv-blue/60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">
          {selected ? `${selected.brand} ${selected.model} (${selected.year})` : placeholder}
        </span>
        <span className={`ml-2 shrink-0 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="cv-glass-strong absolute z-50 mt-2 w-full min-w-[280px] overflow-hidden rounded-xl border border-white/15 bg-[#0b0c11] shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
          <div className="border-b border-white/10 p-2.5">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand or model…"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-cv-blue/60"
            />
          </div>
          <div role="listbox" className="max-h-80 overflow-y-auto p-1.5">
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-white/40">No vehicles match &ldquo;{query}&rdquo;</p>
            )}
            {filtered.map((v) => {
              const active = v.slug === value;
              const vAccent = brandAccent[v.brand] ?? accent;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(v.slug);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    active ? "bg-white/10" : "hover:bg-white/8"
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      {v.priority && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: vAccent }} />}
                      <span className={`truncate font-600 ${active ? "text-white" : "text-white/85"}`}>
                        {v.brand} {v.model}
                      </span>
                    </span>
                    <span className="block text-xs text-white/40">
                      {v.year} · {v.category} · {formatPrice(v.price)}
                    </span>
                  </span>
                  {active && (
                    <span className="shrink-0 text-xs font-700" style={{ color: vAccent }}>
                      ✓ Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
