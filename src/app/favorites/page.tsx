import { getAllVehicles } from "@/data/vehicles";
import FavoritesClient from "./FavoritesClient";

export const dynamic = "force-static";

export default function FavoritesPage() {
  const vehicles = getAllVehicles();
  return <FavoritesClient vehicles={vehicles} />;
}
