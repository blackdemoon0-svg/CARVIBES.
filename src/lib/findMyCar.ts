import { Vehicle, FuelType, getAllVehicles } from "@/data/vehicles";

export interface FindMyCarAnswers {
  minBudget: number;
  maxBudget: number;
  bodyTypes: string[];
  priority: "performance" | "comfort" | "balanced";
  reliabilityImportance: number; // 1-5
  luxuryImportance: number; // 1-5
  fuelPreference: FuelType | "Any";
  seats: number;
  usage: "city" | "highway" | "mixed" | "offroad";
  condition: "new" | "used";
}

export interface MatchResult {
  vehicle: Vehicle;
  score: number;
  reasons: string[];
}

export const defaultAnswers: FindMyCarAnswers = {
  minBudget: 20000,
  maxBudget: 90000,
  bodyTypes: [],
  priority: "balanced",
  reliabilityImportance: 3,
  luxuryImportance: 3,
  fuelPreference: "Any",
  seats: 2,
  usage: "mixed",
  condition: "new",
};

export function findMatches(answers: FindMyCarAnswers, limit = 9): MatchResult[] {
  const vehicles = getAllVehicles();

  const results = vehicles.map((v) => {
    let score = 0;
    let maxScore = 0;
    const reasons: string[] = [];

    // Budget fit (weight 30)
    maxScore += 30;
    if (v.price >= answers.minBudget && v.price <= answers.maxBudget) {
      score += 30;
      reasons.push(`Fits comfortably within your $${answers.minBudget.toLocaleString()}–$${answers.maxBudget.toLocaleString()} budget`);
    } else {
      const range = Math.max(answers.maxBudget - answers.minBudget, 1);
      const distance =
        v.price > answers.maxBudget ? v.price - answers.maxBudget : answers.minBudget - v.price;
      const penalty = Math.min(30, (distance / range) * 30);
      score += Math.max(0, 30 - penalty);
    }

    // Body type (weight 15)
    maxScore += 15;
    if (answers.bodyTypes.length === 0 || answers.bodyTypes.includes(v.category)) {
      score += 15;
      if (answers.bodyTypes.includes(v.category)) {
        reasons.push(`Matches your preferred body style: ${v.category}`);
      }
    } else {
      score += 4;
    }

    // Priority: performance vs comfort (weight 20)
    maxScore += 20;
    if (answers.priority === "performance") {
      score += (v.performance / 100) * 20;
      if (v.performance >= 85) reasons.push("Delivers thrilling, high-performance driving dynamics");
    } else if (answers.priority === "comfort") {
      score += (v.comfort / 100) * 20;
      if (v.comfort >= 85) reasons.push("Offers a supremely comfortable ride");
    } else {
      score += ((v.performance + v.comfort) / 200) * 20;
    }

    // Reliability importance (weight up to 12)
    const reliabilityWeight = (answers.reliabilityImportance / 5) * 12;
    maxScore += 12;
    score += (v.reliability / 100) * reliabilityWeight + (12 - reliabilityWeight) * 0.5;
    if (answers.reliabilityImportance >= 4 && v.reliability >= 88) {
      reasons.push("Backed by an excellent reliability record");
    }

    // Luxury importance (weight up to 12)
    const luxuryWeight = (answers.luxuryImportance / 5) * 12;
    maxScore += 12;
    score += (v.luxury / 100) * luxuryWeight + (12 - luxuryWeight) * 0.5;
    if (answers.luxuryImportance >= 4 && v.luxury >= 88) {
      reasons.push("Provides a premium, luxurious cabin experience");
    }

    // Fuel preference (weight 10)
    maxScore += 10;
    if (answers.fuelPreference === "Any" || v.fuel === answers.fuelPreference) {
      score += 10;
      if (answers.fuelPreference !== "Any") reasons.push(`Runs on your preferred fuel type: ${v.fuel}`);
    } else {
      score += 2;
    }

    // Seats (weight 8)
    maxScore += 8;
    if (v.seats >= answers.seats) {
      score += 8;
      if (v.seats >= answers.seats + 2) reasons.push(`Spacious ${v.seats}-seat layout for passengers and cargo`);
    } else {
      score += 2;
    }

    // Usage (weight 8)
    maxScore += 8;
    if (answers.usage === "offroad" && (v.category === "SUV" || v.category === "Pickup") && v.drive === "AWD") {
      score += 8;
      reasons.push("AWD SUV/pickup capability suited for off-road use");
    } else if (answers.usage === "city" && (v.category === "Hatchback" || v.category === "Sedan" || v.category === "Coupe")) {
      score += 8;
      reasons.push("Compact, efficient footprint ideal for city driving");
    } else if (answers.usage === "highway" && (v.comfort >= 82 || v.category === "Sedan" || v.category === "SUV")) {
      score += 6;
      reasons.push("Comfortable, stable highway cruiser");
    } else if (answers.usage === "mixed") {
      score += 6;
    } else {
      score += 3;
    }

    // Condition (weight 5) — used preference favors lower price vehicles slightly
    maxScore += 5;
    if (answers.condition === "used" && v.price <= answers.maxBudget * 0.7) {
      score += 5;
      reasons.push("Strong candidate for a great-value used purchase");
    } else if (answers.condition === "new") {
      score += 5;
    } else {
      score += 2;
    }

    const percentage = Math.round((score / maxScore) * 100);
    return {
      vehicle: v,
      score: Math.max(0, Math.min(100, percentage)),
      reasons: reasons.slice(0, 4),
    };
  });

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => ({
      ...r,
      reasons: r.reasons.length ? r.reasons : ["A well-rounded option that fits your overall profile"],
    }));
}
