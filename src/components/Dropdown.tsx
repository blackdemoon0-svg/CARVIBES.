"use client";

import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  accent = "#2fd0ff",
}: {
  label?: string;
  value: string;
  options: DropdownOption[] | string[];
  onChange: (value: string) => void;
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const normalized: DropdownOption[] = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const selected = normalized.find((o) => o.value === value);

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

  return (
    <div ref={ref} className="relative">
      {label && <label className="mb-1.5 block text-xs font-600 uppercase tracking-wide text-white/45">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#0d0f14] px-3 py-2 text-left text-sm text-white outline-none transition focus:border-cv-blue/60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{selected?.label ?? "Select…"}</span>
        <span className={`ml-2 shrink-0 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="cv-glass-strong absolute z-50 mt-2 max-h-72 w-full min-w-[180px] overflow-y-auto rounded-xl border border-white/15 bg-[#0d0f14] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {normalized.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  active ? "font-700 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
                style={active ? { background: `${accent}26`, color: accent } : undefined}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
