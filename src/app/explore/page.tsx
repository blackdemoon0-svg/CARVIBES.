import { getAllVehicles, categories, fuelTypes, allBrandNames } from "@/data/vehicles";
import ExploreClient from "./ExploreClient";

export const dynamic = "force-static";

export default function ExplorePage() {
  const vehicles = getAllVehicles();
  return (
    <ExploreClient
      vehicles={vehicles}
      categories={categories}
      fuelTypes={fuelTypes}
      brands={allBrandNames}
    />
  );
}
