import { Suspense } from "react";
import { getAllVehicles } from "@/data/vehicles";
import CompareClient from "./CompareClient";

export const dynamic = "force-static";

export default function ComparePage() {
  const vehicles = getAllVehicles();
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-24 text-center text-white/50">Loading comparison…</div>}>
      <CompareClient vehicles={vehicles} />
    </Suspense>
  );
}
