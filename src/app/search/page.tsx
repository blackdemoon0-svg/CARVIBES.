import { Suspense } from "react";
import { getAllVehicles } from "@/data/vehicles";
import { brands } from "@/data/brands";
import { newsArticles } from "@/data/news";
import SearchClient from "./SearchClient";

export const dynamic = "force-static";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-24 text-center text-white/50">Searching…</div>}>
      <SearchClient vehicles={getAllVehicles()} brands={brands} articles={newsArticles} />
    </Suspense>
  );
}
