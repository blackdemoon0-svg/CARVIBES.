import { Suspense } from "react";
import { categories, fuelTypes } from "@/data/vehicles";
import FindMyCarClient from "./FindMyCarClient";

export const dynamic = "force-static";

export default function FindMyCarPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-24 text-center text-white/50">Loading…</div>}>
      <FindMyCarClient categories={categories} fuelTypes={fuelTypes} />
    </Suspense>
  );
}
