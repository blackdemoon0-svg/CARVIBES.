// CarVibes vehicle database — 130+ vehicles across 35+ global brands.
// Priority brands (Audi, BMW, Mercedes-Benz) receive expanded lineups.

export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Drive = "RWD" | "AWD" | "FWD";
export type Category =
  | "Sedan"
  | "SUV"
  | "Coupe"
  | "Hatchback"
  | "Supercar"
  | "Sports Car"
  | "Wagon"
  | "Pickup"
  | "Convertible";

export interface RawVehicle {
  brand: string;
  model: string;
  year: number;
  category: Category;
  price: number;
  engine: string;
  fuel: FuelType;
  hp: number;
  torque: number;
  accel: number;
  topSpeed: number;
  consumption: string;
  drive: Drive;
  seats: number;
  comfort: number;
  performance: number;
  reliability: number;
  technology: number;
  safety: number;
  luxury: number;
  popularity: number;
}

export interface Vehicle extends RawVehicle {
  id: string;
  slug: string;
  searchQuery: string;
  fullName: string;
  overall: number;
  description: string;
  pros: string[];
  cons: string[];
  priority: boolean;
}

const PRIORITY_BRANDS = new Set(["Audi", "BMW", "Mercedes-Benz"]);

const raw: RawVehicle[] = [
  // ===================== AUDI (priority) =====================
  { brand: "Audi", model: "A3", year: 2024, category: "Hatchback", price: 35000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 201, torque: 320, accel: 6.7, topSpeed: 250, consumption: "7.0L/100km", drive: "FWD", seats: 5, comfort: 78, performance: 65, reliability: 82, technology: 85, safety: 88, luxury: 70, popularity: 70 },
  { brand: "Audi", model: "A4", year: 2024, category: "Sedan", price: 43000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 201, torque: 320, accel: 7.1, topSpeed: 240, consumption: "7.2L/100km", drive: "AWD", seats: 5, comfort: 82, performance: 68, reliability: 83, technology: 87, safety: 90, luxury: 75, popularity: 75 },
  { brand: "Audi", model: "A6", year: 2024, category: "Sedan", price: 58000, engine: "3.0L Turbo V6", fuel: "Petrol", hp: 261, torque: 400, accel: 5.6, topSpeed: 250, consumption: "7.8L/100km", drive: "AWD", seats: 5, comfort: 87, performance: 74, reliability: 83, technology: 90, safety: 92, luxury: 85, popularity: 78 },
  { brand: "Audi", model: "A8", year: 2024, category: "Sedan", price: 87000, engine: "3.0L Turbo V6", fuel: "Petrol", hp: 335, torque: 500, accel: 5.5, topSpeed: 250, consumption: "9.0L/100km", drive: "AWD", seats: 5, comfort: 95, performance: 78, reliability: 80, technology: 94, safety: 95, luxury: 96, popularity: 72 },
  { brand: "Audi", model: "Q5", year: 2024, category: "SUV", price: 46000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 261, torque: 400, accel: 6.2, topSpeed: 240, consumption: "8.5L/100km", drive: "AWD", seats: 5, comfort: 85, performance: 70, reliability: 84, technology: 88, safety: 91, luxury: 78, popularity: 82 },
  { brand: "Audi", model: "Q7", year: 2024, category: "SUV", price: 60000, engine: "3.0L Turbo Diesel V6", fuel: "Diesel", hp: 335, torque: 500, accel: 5.7, topSpeed: 250, consumption: "7.4L/100km", drive: "AWD", seats: 7, comfort: 88, performance: 74, reliability: 81, technology: 90, safety: 93, luxury: 85, popularity: 80 },
  { brand: "Audi", model: "Q8", year: 2024, category: "SUV", price: 72000, engine: "3.0L Turbo V6", fuel: "Petrol", hp: 335, torque: 500, accel: 5.6, topSpeed: 250, consumption: "10.0L/100km", drive: "AWD", seats: 5, comfort: 88, performance: 77, reliability: 80, technology: 92, safety: 92, luxury: 88, popularity: 76 },
  { brand: "Audi", model: "e-tron GT", year: 2024, category: "Coupe", price: 104000, engine: "Dual Motor Electric", fuel: "Electric", hp: 522, torque: 630, accel: 3.9, topSpeed: 245, consumption: "19kWh/100km", drive: "AWD", seats: 4, comfort: 90, performance: 92, reliability: 85, technology: 97, safety: 93, luxury: 92, popularity: 81 },
  { brand: "Audi", model: "RS6 Avant", year: 2024, category: "Wagon", price: 122000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 591, torque: 800, accel: 3.6, topSpeed: 305, consumption: "11.8L/100km", drive: "AWD", seats: 5, comfort: 86, performance: 97, reliability: 80, technology: 93, safety: 91, luxury: 90, popularity: 93 },
  { brand: "Audi", model: "RS7 Sportback", year: 2024, category: "Coupe", price: 118000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 591, torque: 800, accel: 3.5, topSpeed: 305, consumption: "11.5L/100km", drive: "AWD", seats: 5, comfort: 85, performance: 97, reliability: 80, technology: 93, safety: 90, luxury: 91, popularity: 88 },
  { brand: "Audi", model: "TT RS", year: 2023, category: "Coupe", price: 68000, engine: "2.5L Turbo I5", fuel: "Petrol", hp: 394, torque: 480, accel: 3.7, topSpeed: 250, consumption: "9.5L/100km", drive: "AWD", seats: 4, comfort: 75, performance: 91, reliability: 79, technology: 85, safety: 86, luxury: 80, popularity: 70 },
  { brand: "Audi", model: "R8 V10 Performance", year: 2024, category: "Supercar", price: 214000, engine: "5.2L V10", fuel: "Petrol", hp: 602, torque: 560, accel: 3.2, topSpeed: 331, consumption: "12.3L/100km", drive: "AWD", seats: 2, comfort: 68, performance: 98, reliability: 76, technology: 88, safety: 85, luxury: 93, popularity: 90 },

  // ===================== BMW (priority) =====================
  { brand: "BMW", model: "1 Series M135", year: 2024, category: "Hatchback", price: 45000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 300, torque: 400, accel: 4.8, topSpeed: 250, consumption: "8.5L/100km", drive: "AWD", seats: 5, comfort: 78, performance: 85, reliability: 81, technology: 87, safety: 88, luxury: 75, popularity: 74 },
  { brand: "BMW", model: "3 Series 330i", year: 2024, category: "Sedan", price: 45000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 255, torque: 400, accel: 5.6, topSpeed: 250, consumption: "7.5L/100km", drive: "RWD", seats: 5, comfort: 83, performance: 78, reliability: 83, technology: 88, safety: 90, luxury: 78, popularity: 85 },
  { brand: "BMW", model: "5 Series 540i", year: 2024, category: "Sedan", price: 58000, engine: "3.0L Turbo I6", fuel: "Petrol", hp: 375, torque: 530, accel: 5.3, topSpeed: 250, consumption: "8.0L/100km", drive: "RWD", seats: 5, comfort: 88, performance: 80, reliability: 82, technology: 92, safety: 93, luxury: 86, popularity: 82 },
  { brand: "BMW", model: "7 Series 760i", year: 2024, category: "Sedan", price: 95000, engine: "4.4L Twin-Turbo V8", fuel: "Petrol", hp: 536, torque: 750, accel: 4.7, topSpeed: 250, consumption: "10.5L/100km", drive: "AWD", seats: 5, comfort: 96, performance: 87, reliability: 79, technology: 96, safety: 96, luxury: 97, popularity: 74 },
  { brand: "BMW", model: "X3 xDrive30i", year: 2024, category: "SUV", price: 47000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 248, torque: 400, accel: 6.1, topSpeed: 210, consumption: "8.5L/100km", drive: "AWD", seats: 5, comfort: 84, performance: 72, reliability: 83, technology: 87, safety: 91, luxury: 78, popularity: 81 },
  { brand: "BMW", model: "X5 xDrive40i", year: 2024, category: "SUV", price: 65000, engine: "3.0L Turbo I6", fuel: "Petrol", hp: 375, torque: 530, accel: 5.3, topSpeed: 243, consumption: "9.7L/100km", drive: "AWD", seats: 5, comfort: 90, performance: 80, reliability: 80, technology: 91, safety: 93, luxury: 88, popularity: 86 },
  { brand: "BMW", model: "X7 xDrive40i", year: 2024, category: "SUV", price: 78000, engine: "3.0L Turbo I6", fuel: "Petrol", hp: 375, torque: 530, accel: 5.8, topSpeed: 240, consumption: "10.5L/100km", drive: "AWD", seats: 7, comfort: 93, performance: 78, reliability: 79, technology: 92, safety: 94, luxury: 92, popularity: 79 },
  { brand: "BMW", model: "M3 Competition", year: 2024, category: "Sports Car", price: 76000, engine: "3.0L Twin-Turbo I6", fuel: "Petrol", hp: 503, torque: 650, accel: 3.5, topSpeed: 290, consumption: "10.2L/100km", drive: "RWD", seats: 5, comfort: 80, performance: 96, reliability: 78, technology: 90, safety: 90, luxury: 85, popularity: 95 },
  { brand: "BMW", model: "M5", year: 2024, category: "Sports Car", price: 110000, engine: "4.4L Twin-Turbo V8 Hybrid", fuel: "Hybrid", hp: 717, torque: 1000, accel: 3.5, topSpeed: 305, consumption: "9.0L/100km", drive: "AWD", seats: 5, comfort: 87, performance: 98, reliability: 77, technology: 95, safety: 92, luxury: 90, popularity: 94 },
  { brand: "BMW", model: "M8 Competition", year: 2024, category: "Coupe", price: 133000, engine: "4.4L Twin-Turbo V8", fuel: "Petrol", hp: 617, torque: 750, accel: 3.2, topSpeed: 305, consumption: "11.0L/100km", drive: "AWD", seats: 4, comfort: 85, performance: 97, reliability: 76, technology: 93, safety: 90, luxury: 93, popularity: 87 },
  { brand: "BMW", model: "i4 M50", year: 2024, category: "Sedan", price: 67000, engine: "Dual Motor Electric", fuel: "Electric", hp: 536, torque: 795, accel: 3.9, topSpeed: 225, consumption: "20kWh/100km", drive: "AWD", seats: 5, comfort: 86, performance: 91, reliability: 82, technology: 96, safety: 91, luxury: 85, popularity: 83 },
  { brand: "BMW", model: "iX xDrive50", year: 2024, category: "SUV", price: 88000, engine: "Dual Motor Electric", fuel: "Electric", hp: 516, torque: 765, accel: 4.4, topSpeed: 200, consumption: "21kWh/100km", drive: "AWD", seats: 5, comfort: 92, performance: 85, reliability: 81, technology: 97, safety: 94, luxury: 90, popularity: 80 },

  // ===================== MERCEDES-BENZ (priority) =====================
  { brand: "Mercedes-Benz", model: "A-Class A250", year: 2024, category: "Hatchback", price: 38000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 221, torque: 350, accel: 6.2, topSpeed: 250, consumption: "7.5L/100km", drive: "FWD", seats: 5, comfort: 80, performance: 68, reliability: 80, technology: 88, safety: 89, luxury: 76, popularity: 72 },
  { brand: "Mercedes-Benz", model: "C-Class C300", year: 2024, category: "Sedan", price: 47000, engine: "2.0L Turbo Hybrid I4", fuel: "Hybrid", hp: 255, torque: 400, accel: 6.0, topSpeed: 250, consumption: "7.0L/100km", drive: "RWD", seats: 5, comfort: 85, performance: 72, reliability: 80, technology: 90, safety: 91, luxury: 82, popularity: 84 },
  { brand: "Mercedes-Benz", model: "E-Class E350", year: 2024, category: "Sedan", price: 62000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 255, torque: 400, accel: 6.1, topSpeed: 250, consumption: "7.8L/100km", drive: "RWD", seats: 5, comfort: 90, performance: 74, reliability: 80, technology: 93, safety: 94, luxury: 88, popularity: 83 },
  { brand: "Mercedes-Benz", model: "S-Class S500", year: 2024, category: "Sedan", price: 118000, engine: "3.0L Turbo I6", fuel: "Petrol", hp: 429, torque: 520, accel: 4.9, topSpeed: 250, consumption: "9.5L/100km", drive: "AWD", seats: 5, comfort: 98, performance: 82, reliability: 80, technology: 98, safety: 98, luxury: 99, popularity: 85 },
  { brand: "Mercedes-Benz", model: "GLC 300", year: 2024, category: "SUV", price: 49000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 255, torque: 400, accel: 6.0, topSpeed: 210, consumption: "8.6L/100km", drive: "AWD", seats: 5, comfort: 86, performance: 72, reliability: 81, technology: 89, safety: 92, luxury: 80, popularity: 83 },
  { brand: "Mercedes-Benz", model: "GLE 450", year: 2024, category: "SUV", price: 67000, engine: "3.0L Turbo I6", fuel: "Petrol", hp: 375, torque: 500, accel: 5.5, topSpeed: 240, consumption: "9.8L/100km", drive: "AWD", seats: 5, comfort: 90, performance: 79, reliability: 79, technology: 92, safety: 93, luxury: 87, popularity: 84 },
  { brand: "Mercedes-Benz", model: "GLS 580", year: 2024, category: "SUV", price: 92000, engine: "4.0L Twin-Turbo V8 Hybrid", fuel: "Hybrid", hp: 483, torque: 700, accel: 4.9, topSpeed: 240, consumption: "10.8L/100km", drive: "AWD", seats: 7, comfort: 95, performance: 84, reliability: 78, technology: 94, safety: 95, luxury: 93, popularity: 79 },
  { brand: "Mercedes-Benz", model: "G-Class G63 AMG", year: 2024, category: "SUV", price: 180000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 577, torque: 850, accel: 4.5, topSpeed: 220, consumption: "13.5L/100km", drive: "AWD", seats: 5, comfort: 87, performance: 92, reliability: 78, technology: 90, safety: 92, luxury: 95, popularity: 97 },
  { brand: "Mercedes-Benz", model: "AMG GT 63 S", year: 2024, category: "Sports Car", price: 162000, engine: "4.0L Twin-Turbo V8 Hybrid", fuel: "Hybrid", hp: 630, torque: 900, accel: 3.1, topSpeed: 315, consumption: "11.5L/100km", drive: "AWD", seats: 4, comfort: 82, performance: 97, reliability: 77, technology: 94, safety: 90, luxury: 92, popularity: 89 },
  { brand: "Mercedes-Benz", model: "EQS 580", year: 2024, category: "Sedan", price: 105000, engine: "Dual Motor Electric", fuel: "Electric", hp: 536, torque: 858, accel: 4.1, topSpeed: 210, consumption: "18.5kWh/100km", drive: "AWD", seats: 5, comfort: 97, performance: 88, reliability: 82, technology: 99, safety: 96, luxury: 96, popularity: 82 },
  { brand: "Mercedes-Benz", model: "AMG C63 S E Performance", year: 2024, category: "Sports Car", price: 84000, engine: "2.0L Turbo Hybrid I4", fuel: "Hybrid", hp: 671, torque: 1020, accel: 3.4, topSpeed: 280, consumption: "9.0L/100km", drive: "AWD", seats: 5, comfort: 84, performance: 96, reliability: 76, technology: 95, safety: 91, luxury: 88, popularity: 86 },
  { brand: "Mercedes-Benz", model: "CLA 250 Coupe", year: 2024, category: "Coupe", price: 45000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 221, torque: 350, accel: 6.0, topSpeed: 240, consumption: "7.2L/100km", drive: "FWD", seats: 5, comfort: 81, performance: 70, reliability: 80, technology: 88, safety: 89, luxury: 78, popularity: 75 },

  // ===================== PORSCHE =====================
  { brand: "Porsche", model: "911 Carrera", year: 2024, category: "Sports Car", price: 118000, engine: "3.0L Twin-Turbo Flat-6", fuel: "Petrol", hp: 379, torque: 450, accel: 4.0, topSpeed: 293, consumption: "9.6L/100km", drive: "RWD", seats: 4, comfort: 82, performance: 92, reliability: 88, technology: 90, safety: 91, luxury: 90, popularity: 93 },
  { brand: "Porsche", model: "911 Turbo S", year: 2024, category: "Supercar", price: 231000, engine: "3.8L Twin-Turbo Flat-6", fuel: "Petrol", hp: 640, torque: 800, accel: 2.7, topSpeed: 330, consumption: "11.5L/100km", drive: "AWD", seats: 4, comfort: 85, performance: 99, reliability: 87, technology: 93, safety: 93, luxury: 94, popularity: 95 },
  { brand: "Porsche", model: "718 Cayman", year: 2024, category: "Sports Car", price: 68000, engine: "2.0L Turbo Flat-4", fuel: "Petrol", hp: 300, torque: 380, accel: 4.9, topSpeed: 275, consumption: "8.5L/100km", drive: "RWD", seats: 2, comfort: 76, performance: 88, reliability: 86, technology: 85, safety: 87, luxury: 82, popularity: 82 },
  { brand: "Porsche", model: "Cayenne", year: 2024, category: "SUV", price: 79000, engine: "3.0L Turbo V6", fuel: "Petrol", hp: 348, torque: 500, accel: 5.6, topSpeed: 245, consumption: "10.5L/100km", drive: "AWD", seats: 5, comfort: 89, performance: 82, reliability: 82, technology: 91, safety: 93, luxury: 89, popularity: 85 },
  { brand: "Porsche", model: "Taycan", year: 2024, category: "Sedan", price: 99000, engine: "Dual Motor Electric", fuel: "Electric", hp: 469, torque: 645, accel: 4.0, topSpeed: 230, consumption: "20kWh/100km", drive: "AWD", seats: 4, comfort: 88, performance: 93, reliability: 83, technology: 97, safety: 93, luxury: 91, popularity: 87 },

  // ===================== FERRARI =====================
  { brand: "Ferrari", model: "296 GTB", year: 2024, category: "Supercar", price: 322000, engine: "3.0L Twin-Turbo V6 Hybrid", fuel: "Hybrid", hp: 819, torque: 740, accel: 2.9, topSpeed: 330, consumption: "14.0L/100km", drive: "RWD", seats: 2, comfort: 78, performance: 99, reliability: 75, technology: 95, safety: 88, luxury: 96, popularity: 92 },
  { brand: "Ferrari", model: "SF90 Stradale", year: 2024, category: "Supercar", price: 524000, engine: "4.0L Twin-Turbo V8 Hybrid", fuel: "Hybrid", hp: 986, torque: 800, accel: 2.5, topSpeed: 340, consumption: "14.5L/100km", drive: "AWD", seats: 2, comfort: 76, performance: 100, reliability: 74, technology: 97, safety: 88, luxury: 97, popularity: 91 },
  { brand: "Ferrari", model: "Roma", year: 2024, category: "Coupe", price: 247000, engine: "3.9L Twin-Turbo V8", fuel: "Petrol", hp: 611, torque: 760, accel: 3.4, topSpeed: 320, consumption: "12.5L/100km", drive: "RWD", seats: 4, comfort: 84, performance: 95, reliability: 76, technology: 92, safety: 89, luxury: 96, popularity: 85 },

  // ===================== LAMBORGHINI =====================
  { brand: "Lamborghini", model: "Huracan EVO", year: 2024, category: "Supercar", price: 261000, engine: "5.2L V10", fuel: "Petrol", hp: 631, torque: 600, accel: 2.9, topSpeed: 325, consumption: "14.7L/100km", drive: "AWD", seats: 2, comfort: 74, performance: 97, reliability: 74, technology: 90, safety: 87, luxury: 95, popularity: 90 },
  { brand: "Lamborghini", model: "Revuelto", year: 2024, category: "Supercar", price: 608000, engine: "6.5L V12 Hybrid", fuel: "Hybrid", hp: 1001, torque: 725, accel: 2.5, topSpeed: 350, consumption: "16.0L/100km", drive: "AWD", seats: 2, comfort: 77, performance: 100, reliability: 73, technology: 96, safety: 88, luxury: 98, popularity: 89 },
  { brand: "Lamborghini", model: "Urus", year: 2024, category: "SUV", price: 233000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 641, torque: 850, accel: 3.3, topSpeed: 305, consumption: "14.1L/100km", drive: "AWD", seats: 5, comfort: 87, performance: 94, reliability: 76, technology: 91, safety: 90, luxury: 96, popularity: 91 },

  // ===================== MCLAREN =====================
  { brand: "McLaren", model: "Artura", year: 2024, category: "Supercar", price: 237000, engine: "3.0L Twin-Turbo V6 Hybrid", fuel: "Hybrid", hp: 671, torque: 720, accel: 3.0, topSpeed: 330, consumption: "13.0L/100km", drive: "RWD", seats: 2, comfort: 76, performance: 97, reliability: 74, technology: 93, safety: 87, luxury: 94, popularity: 84 },
  { brand: "McLaren", model: "720S", year: 2024, category: "Supercar", price: 315000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 710, torque: 770, accel: 2.7, topSpeed: 341, consumption: "13.9L/100km", drive: "RWD", seats: 2, comfort: 74, performance: 99, reliability: 73, technology: 91, safety: 86, luxury: 95, popularity: 87 },

  // ===================== ASTON MARTIN =====================
  { brand: "Aston Martin", model: "Vantage", year: 2024, category: "Sports Car", price: 152000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 656, torque: 800, accel: 3.4, topSpeed: 325, consumption: "12.8L/100km", drive: "RWD", seats: 2, comfort: 80, performance: 95, reliability: 75, technology: 88, safety: 87, luxury: 94, popularity: 82 },
  { brand: "Aston Martin", model: "DBX707", year: 2024, category: "SUV", price: 236000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 697, torque: 900, accel: 3.3, topSpeed: 310, consumption: "13.5L/100km", drive: "AWD", seats: 5, comfort: 88, performance: 93, reliability: 75, technology: 89, safety: 90, luxury: 95, popularity: 83 },

  // ===================== BENTLEY =====================
  { brand: "Bentley", model: "Continental GT", year: 2024, category: "Coupe", price: 232000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 542, torque: 770, accel: 3.7, topSpeed: 318, consumption: "12.0L/100km", drive: "AWD", seats: 4, comfort: 94, performance: 91, reliability: 79, technology: 92, safety: 92, luxury: 98, popularity: 84 },
  { brand: "Bentley", model: "Bentayga", year: 2024, category: "SUV", price: 204000, engine: "4.0L Twin-Turbo V8", fuel: "Petrol", hp: 542, torque: 770, accel: 4.4, topSpeed: 290, consumption: "12.5L/100km", drive: "AWD", seats: 5, comfort: 95, performance: 87, reliability: 78, technology: 91, safety: 92, luxury: 98, popularity: 81 },

  // ===================== ROLLS-ROYCE =====================
  { brand: "Rolls-Royce", model: "Ghost", year: 2024, category: "Sedan", price: 350000, engine: "6.75L Twin-Turbo V12", fuel: "Petrol", hp: 563, torque: 850, accel: 4.8, topSpeed: 250, consumption: "14.6L/100km", drive: "AWD", seats: 5, comfort: 100, performance: 84, reliability: 82, technology: 93, safety: 95, luxury: 100, popularity: 86 },
  { brand: "Rolls-Royce", model: "Cullinan", year: 2024, category: "SUV", price: 405000, engine: "6.75L Twin-Turbo V12", fuel: "Petrol", hp: 563, torque: 850, accel: 4.9, topSpeed: 250, consumption: "15.5L/100km", drive: "AWD", seats: 5, comfort: 99, performance: 83, reliability: 81, technology: 92, safety: 95, luxury: 100, popularity: 88 },

  // ===================== BUGATTI / KOENIGSEGG / PAGANI =====================
  { brand: "Bugatti", model: "Chiron", year: 2023, category: "Supercar", price: 3300000, engine: "8.0L Quad-Turbo W16", fuel: "Petrol", hp: 1479, torque: 1600, accel: 2.4, topSpeed: 420, consumption: "22.5L/100km", drive: "AWD", seats: 2, comfort: 88, performance: 100, reliability: 78, technology: 96, safety: 90, luxury: 100, popularity: 96 },
  { brand: "Koenigsegg", model: "Jesko", year: 2024, category: "Supercar", price: 3400000, engine: "5.0L Twin-Turbo V8", fuel: "Petrol", hp: 1600, torque: 1500, accel: 2.5, topSpeed: 480, consumption: "23.0L/100km", drive: "RWD", seats: 2, comfort: 75, performance: 100, reliability: 72, technology: 97, safety: 86, luxury: 99, popularity: 92 },
  { brand: "Pagani", model: "Huayra", year: 2023, category: "Supercar", price: 2600000, engine: "6.0L Twin-Turbo V12", fuel: "Petrol", hp: 764, torque: 1000, accel: 2.8, topSpeed: 383, consumption: "18.0L/100km", drive: "RWD", seats: 2, comfort: 80, performance: 98, reliability: 74, technology: 92, safety: 85, luxury: 100, popularity: 88 },

  // ===================== TOYOTA =====================
  { brand: "Toyota", model: "Corolla", year: 2024, category: "Sedan", price: 23000, engine: "2.0L I4", fuel: "Petrol", hp: 169, torque: 200, accel: 8.9, topSpeed: 200, consumption: "6.0L/100km", drive: "FWD", seats: 5, comfort: 76, performance: 52, reliability: 96, technology: 78, safety: 89, luxury: 55, popularity: 88 },
  { brand: "Toyota", model: "Camry", year: 2024, category: "Sedan", price: 28000, engine: "2.5L Hybrid I4", fuel: "Hybrid", hp: 225, torque: 221, accel: 7.5, topSpeed: 210, consumption: "4.6L/100km", drive: "FWD", seats: 5, comfort: 84, performance: 62, reliability: 95, technology: 82, safety: 91, luxury: 68, popularity: 85 },
  { brand: "Toyota", model: "RAV4", year: 2024, category: "SUV", price: 31000, engine: "2.5L Hybrid I4", fuel: "Hybrid", hp: 219, torque: 221, accel: 7.9, topSpeed: 180, consumption: "5.1L/100km", drive: "AWD", seats: 5, comfort: 80, performance: 60, reliability: 95, technology: 80, safety: 92, luxury: 62, popularity: 90 },
  { brand: "Toyota", model: "Supra", year: 2024, category: "Sports Car", price: 56000, engine: "3.0L Turbo I6", fuel: "Petrol", hp: 382, torque: 500, accel: 3.9, topSpeed: 250, consumption: "9.6L/100km", drive: "RWD", seats: 2, comfort: 75, performance: 90, reliability: 88, technology: 84, safety: 86, luxury: 78, popularity: 87 },
  { brand: "Toyota", model: "Land Cruiser", year: 2024, category: "SUV", price: 58000, engine: "3.3L Twin-Turbo Diesel V6", fuel: "Diesel", hp: 305, torque: 700, accel: 8.0, topSpeed: 210, consumption: "8.9L/100km", drive: "AWD", seats: 7, comfort: 85, performance: 65, reliability: 97, technology: 80, safety: 92, luxury: 76, popularity: 86 },
  { brand: "Toyota", model: "GR86", year: 2024, category: "Sports Car", price: 30000, engine: "2.4L Flat-4", fuel: "Petrol", hp: 228, torque: 250, accel: 6.1, topSpeed: 226, consumption: "8.5L/100km", drive: "RWD", seats: 4, comfort: 70, performance: 78, reliability: 90, technology: 74, safety: 84, luxury: 60, popularity: 79 },

  // ===================== HONDA =====================
  { brand: "Honda", model: "Civic", year: 2024, category: "Sedan", price: 24000, engine: "1.5L Turbo I4", fuel: "Petrol", hp: 180, torque: 240, accel: 7.5, topSpeed: 200, consumption: "6.5L/100km", drive: "FWD", seats: 5, comfort: 78, performance: 58, reliability: 94, technology: 80, safety: 90, luxury: 58, popularity: 84 },
  { brand: "Honda", model: "Accord", year: 2024, category: "Sedan", price: 29000, engine: "1.5L Turbo Hybrid I4", fuel: "Hybrid", hp: 204, torque: 247, accel: 7.1, topSpeed: 210, consumption: "5.4L/100km", drive: "FWD", seats: 5, comfort: 83, performance: 62, reliability: 93, technology: 83, safety: 91, luxury: 65, popularity: 82 },
  { brand: "Honda", model: "CR-V", year: 2024, category: "SUV", price: 32000, engine: "1.5L Turbo Hybrid I4", fuel: "Hybrid", hp: 204, torque: 247, accel: 7.7, topSpeed: 190, consumption: "5.6L/100km", drive: "AWD", seats: 5, comfort: 81, performance: 58, reliability: 94, technology: 81, safety: 92, luxury: 64, popularity: 85 },
  { brand: "Honda", model: "Civic Type R", year: 2024, category: "Hatchback", price: 45000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 315, torque: 420, accel: 5.4, topSpeed: 275, consumption: "8.9L/100km", drive: "FWD", seats: 5, comfort: 74, performance: 88, reliability: 89, technology: 84, safety: 88, luxury: 68, popularity: 88 },

  // ===================== NISSAN =====================
  { brand: "Nissan", model: "Altima", year: 2024, category: "Sedan", price: 26000, engine: "2.5L I4", fuel: "Petrol", hp: 188, torque: 244, accel: 8.1, topSpeed: 200, consumption: "7.2L/100km", drive: "FWD", seats: 5, comfort: 78, performance: 55, reliability: 86, technology: 78, safety: 87, luxury: 58, popularity: 74 },
  { brand: "Nissan", model: "Rogue", year: 2024, category: "SUV", price: 30000, engine: "1.5L Turbo I3", fuel: "Petrol", hp: 201, torque: 225, accel: 7.9, topSpeed: 190, consumption: "7.6L/100km", drive: "AWD", seats: 5, comfort: 79, performance: 55, reliability: 85, technology: 79, safety: 88, luxury: 60, popularity: 78 },
  { brand: "Nissan", model: "GT-R", year: 2024, category: "Sports Car", price: 118000, engine: "3.8L Twin-Turbo V6", fuel: "Petrol", hp: 565, torque: 633, accel: 2.9, topSpeed: 315, consumption: "12.8L/100km", drive: "AWD", seats: 4, comfort: 76, performance: 96, reliability: 84, technology: 87, safety: 87, luxury: 82, popularity: 91 },
  { brand: "Nissan", model: "Leaf", year: 2024, category: "Hatchback", price: 29000, engine: "Electric Motor", fuel: "Electric", hp: 214, torque: 340, accel: 6.9, topSpeed: 160, consumption: "17kWh/100km", drive: "FWD", seats: 5, comfort: 74, performance: 60, reliability: 88, technology: 82, safety: 86, luxury: 56, popularity: 70 },

  // ===================== MAZDA =====================
  { brand: "Mazda", model: "Mazda3", year: 2024, category: "Hatchback", price: 24000, engine: "2.5L I4", fuel: "Petrol", hp: 191, torque: 258, accel: 7.7, topSpeed: 200, consumption: "7.0L/100km", drive: "FWD", seats: 5, comfort: 80, performance: 60, reliability: 91, technology: 80, safety: 90, luxury: 65, popularity: 76 },
  { brand: "Mazda", model: "CX-5", year: 2024, category: "SUV", price: 30000, engine: "2.5L Turbo I4", fuel: "Petrol", hp: 256, torque: 434, accel: 6.9, topSpeed: 205, consumption: "8.7L/100km", drive: "AWD", seats: 5, comfort: 83, performance: 68, reliability: 91, technology: 82, safety: 91, luxury: 72, popularity: 82 },
  { brand: "Mazda", model: "MX-5 Miata", year: 2024, category: "Convertible", price: 29000, engine: "2.0L I4", fuel: "Petrol", hp: 181, torque: 205, accel: 6.5, topSpeed: 215, consumption: "7.5L/100km", drive: "RWD", seats: 2, comfort: 68, performance: 72, reliability: 90, technology: 74, safety: 83, luxury: 68, popularity: 80 },

  // ===================== LEXUS =====================
  { brand: "Lexus", model: "IS 350", year: 2024, category: "Sedan", price: 45000, engine: "3.5L V6", fuel: "Petrol", hp: 311, torque: 380, accel: 5.6, topSpeed: 230, consumption: "9.8L/100km", drive: "RWD", seats: 5, comfort: 84, performance: 78, reliability: 93, technology: 84, safety: 90, luxury: 82, popularity: 78 },
  { brand: "Lexus", model: "RX 350", year: 2024, category: "SUV", price: 50000, engine: "2.4L Turbo I4", fuel: "Petrol", hp: 275, torque: 430, accel: 7.2, topSpeed: 200, consumption: "9.5L/100km", drive: "AWD", seats: 5, comfort: 89, performance: 68, reliability: 94, technology: 87, safety: 92, luxury: 85, popularity: 83 },
  { brand: "Lexus", model: "LX 600", year: 2024, category: "SUV", price: 89000, engine: "3.4L Twin-Turbo V6", fuel: "Petrol", hp: 409, torque: 650, accel: 6.7, topSpeed: 210, consumption: "12.5L/100km", drive: "AWD", seats: 7, comfort: 92, performance: 74, reliability: 93, technology: 88, safety: 93, luxury: 92, popularity: 79 },
  { brand: "Lexus", model: "LC500", year: 2024, category: "Coupe", price: 98000, engine: "5.0L V8", fuel: "Petrol", hp: 471, torque: 540, accel: 4.4, topSpeed: 270, consumption: "11.8L/100km", drive: "RWD", seats: 4, comfort: 87, performance: 90, reliability: 90, technology: 88, safety: 90, luxury: 92, popularity: 84 },

  // ===================== SUBARU =====================
  { brand: "Subaru", model: "Impreza", year: 2024, category: "Hatchback", price: 23000, engine: "2.0L Flat-4", fuel: "Petrol", hp: 152, torque: 145, accel: 9.0, topSpeed: 195, consumption: "7.3L/100km", drive: "AWD", seats: 5, comfort: 75, performance: 50, reliability: 91, technology: 76, safety: 90, luxury: 55, popularity: 70 },
  { brand: "Subaru", model: "WRX STI", year: 2024, category: "Sports Car", price: 42000, engine: "2.5L Turbo Flat-4", fuel: "Petrol", hp: 310, torque: 393, accel: 4.9, topSpeed: 255, consumption: "10.5L/100km", drive: "AWD", seats: 5, comfort: 72, performance: 88, reliability: 87, technology: 79, safety: 88, luxury: 66, popularity: 85 },
  { brand: "Subaru", model: "Outback", year: 2024, category: "Wagon", price: 31000, engine: "2.4L Turbo Flat-4", fuel: "Petrol", hp: 260, torque: 375, accel: 6.5, topSpeed: 200, consumption: "8.9L/100km", drive: "AWD", seats: 5, comfort: 84, performance: 65, reliability: 90, technology: 80, safety: 93, luxury: 70, popularity: 79 },

  // ===================== FORD =====================
  { brand: "Ford", model: "Focus", year: 2023, category: "Hatchback", price: 22000, engine: "1.5L Turbo I3", fuel: "Petrol", hp: 155, torque: 240, accel: 8.6, topSpeed: 200, consumption: "6.5L/100km", drive: "FWD", seats: 5, comfort: 76, performance: 55, reliability: 84, technology: 76, safety: 87, luxury: 55, popularity: 68 },
  { brand: "Ford", model: "Mustang GT", year: 2024, category: "Sports Car", price: 48000, engine: "5.0L V8", fuel: "Petrol", hp: 486, torque: 570, accel: 4.3, topSpeed: 250, consumption: "12.5L/100km", drive: "RWD", seats: 4, comfort: 76, performance: 89, reliability: 84, technology: 80, safety: 85, luxury: 74, popularity: 92 },
  { brand: "Ford", model: "Explorer", year: 2024, category: "SUV", price: 40000, engine: "2.3L Turbo I4", fuel: "Petrol", hp: 300, torque: 420, accel: 6.9, topSpeed: 200, consumption: "10.2L/100km", drive: "AWD", seats: 7, comfort: 82, performance: 66, reliability: 82, technology: 82, safety: 90, luxury: 72, popularity: 80 },
  { brand: "Ford", model: "F-150 Raptor", year: 2024, category: "Pickup", price: 78000, engine: "3.5L Twin-Turbo V6", fuel: "Petrol", hp: 450, torque: 690, accel: 5.1, topSpeed: 190, consumption: "14.5L/100km", drive: "AWD", seats: 5, comfort: 82, performance: 84, reliability: 83, technology: 85, safety: 88, luxury: 78, popularity: 89 },
  { brand: "Ford", model: "Bronco", year: 2024, category: "SUV", price: 45000, engine: "2.7L Twin-Turbo V6", fuel: "Petrol", hp: 330, torque: 563, accel: 6.3, topSpeed: 180, consumption: "11.8L/100km", drive: "AWD", seats: 5, comfort: 77, performance: 72, reliability: 81, technology: 80, safety: 87, luxury: 70, popularity: 83 },
  { brand: "Ford", model: "Mustang Mach-E", year: 2024, category: "SUV", price: 46000, engine: "Dual Motor Electric", fuel: "Electric", hp: 480, torque: 860, accel: 3.7, topSpeed: 200, consumption: "19kWh/100km", drive: "AWD", seats: 5, comfort: 83, performance: 86, reliability: 80, technology: 89, safety: 89, luxury: 78, popularity: 81 },

  // ===================== CHEVROLET =====================
  { brand: "Chevrolet", model: "Corvette Stingray", year: 2024, category: "Sports Car", price: 68000, engine: "6.2L V8", fuel: "Petrol", hp: 495, torque: 637, accel: 2.9, topSpeed: 312, consumption: "12.5L/100km", drive: "RWD", seats: 2, comfort: 78, performance: 95, reliability: 85, technology: 84, safety: 87, luxury: 82, popularity: 93 },
  { brand: "Chevrolet", model: "Camaro SS", year: 2024, category: "Coupe", price: 47000, engine: "6.2L V8", fuel: "Petrol", hp: 455, torque: 617, accel: 4.0, topSpeed: 290, consumption: "12.8L/100km", drive: "RWD", seats: 4, comfort: 74, performance: 88, reliability: 82, technology: 78, safety: 84, luxury: 72, popularity: 85 },
  { brand: "Chevrolet", model: "Tahoe", year: 2024, category: "SUV", price: 57000, engine: "5.3L V8", fuel: "Petrol", hp: 355, torque: 519, accel: 6.7, topSpeed: 180, consumption: "13.5L/100km", drive: "AWD", seats: 8, comfort: 85, performance: 65, reliability: 80, technology: 83, safety: 88, luxury: 78, popularity: 78 },
  { brand: "Chevrolet", model: "Bolt EV", year: 2024, category: "Hatchback", price: 27000, engine: "Electric Motor", fuel: "Electric", hp: 200, torque: 360, accel: 6.5, topSpeed: 150, consumption: "16kWh/100km", drive: "FWD", seats: 5, comfort: 73, performance: 58, reliability: 82, technology: 80, safety: 85, luxury: 55, popularity: 68 },

  // ===================== DODGE =====================
  { brand: "Dodge", model: "Charger", year: 2023, category: "Sedan", price: 35000, engine: "3.6L V6", fuel: "Petrol", hp: 292, torque: 353, accel: 6.3, topSpeed: 230, consumption: "10.5L/100km", drive: "RWD", seats: 5, comfort: 78, performance: 68, reliability: 79, technology: 76, safety: 85, luxury: 68, popularity: 79 },
  { brand: "Dodge", model: "Challenger Hellcat", year: 2023, category: "Coupe", price: 72000, engine: "6.2L Supercharged V8", fuel: "Petrol", hp: 717, torque: 881, accel: 3.6, topSpeed: 326, consumption: "16.5L/100km", drive: "RWD", seats: 4, comfort: 74, performance: 96, reliability: 76, technology: 78, safety: 84, luxury: 78, popularity: 90 },

  // ===================== TESLA =====================
  { brand: "Tesla", model: "Model 3", year: 2024, category: "Sedan", price: 42000, engine: "Dual Motor Electric", fuel: "Electric", hp: 346, torque: 493, accel: 4.2, topSpeed: 233, consumption: "14.9kWh/100km", drive: "AWD", seats: 5, comfort: 82, performance: 84, reliability: 84, technology: 97, safety: 96, luxury: 76, popularity: 94 },
  { brand: "Tesla", model: "Model Y", year: 2024, category: "SUV", price: 47000, engine: "Dual Motor Electric", fuel: "Electric", hp: 384, torque: 493, accel: 4.8, topSpeed: 217, consumption: "15.6kWh/100km", drive: "AWD", seats: 5, comfort: 83, performance: 82, reliability: 83, technology: 97, safety: 96, luxury: 78, popularity: 96 },
  { brand: "Tesla", model: "Model S Plaid", year: 2024, category: "Sedan", price: 90000, engine: "Tri Motor Electric", fuel: "Electric", hp: 1020, torque: 1420, accel: 2.1, topSpeed: 322, consumption: "18.6kWh/100km", drive: "AWD", seats: 5, comfort: 88, performance: 99, reliability: 82, technology: 99, safety: 97, luxury: 88, popularity: 92 },
  { brand: "Tesla", model: "Cybertruck", year: 2024, category: "Pickup", price: 80000, engine: "Tri Motor Electric", fuel: "Electric", hp: 845, torque: 1050, accel: 2.6, topSpeed: 209, consumption: "24kWh/100km", drive: "AWD", seats: 6, comfort: 80, performance: 90, reliability: 74, technology: 98, safety: 92, luxury: 80, popularity: 90 },

  // ===================== VOLKSWAGEN =====================
  { brand: "Volkswagen", model: "Golf GTI", year: 2024, category: "Hatchback", price: 32000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 241, torque: 400, accel: 5.9, topSpeed: 250, consumption: "7.8L/100km", drive: "FWD", seats: 5, comfort: 81, performance: 78, reliability: 85, technology: 84, safety: 89, luxury: 72, popularity: 86 },
  { brand: "Volkswagen", model: "Tiguan", year: 2024, category: "SUV", price: 34000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 184, torque: 280, accel: 8.0, topSpeed: 200, consumption: "8.2L/100km", drive: "AWD", seats: 5, comfort: 80, performance: 56, reliability: 82, technology: 82, safety: 90, luxury: 68, popularity: 78 },
  { brand: "Volkswagen", model: "ID.4", year: 2024, category: "SUV", price: 41000, engine: "Electric Motor", fuel: "Electric", hp: 282, torque: 402, accel: 5.7, topSpeed: 180, consumption: "17.5kWh/100km", drive: "AWD", seats: 5, comfort: 82, performance: 66, reliability: 80, technology: 87, safety: 90, luxury: 72, popularity: 76 },
  { brand: "Volkswagen", model: "Passat", year: 2023, category: "Sedan", price: 27000, engine: "2.0L Turbo Diesel I4", fuel: "Diesel", hp: 190, torque: 400, accel: 7.9, topSpeed: 220, consumption: "5.5L/100km", drive: "FWD", seats: 5, comfort: 82, performance: 60, reliability: 84, technology: 80, safety: 89, luxury: 70, popularity: 72 },

  // ===================== VOLVO =====================
  { brand: "Volvo", model: "XC40", year: 2024, category: "SUV", price: 39000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 247, torque: 359, accel: 6.4, topSpeed: 200, consumption: "8.5L/100km", drive: "AWD", seats: 5, comfort: 84, performance: 65, reliability: 85, technology: 86, safety: 95, luxury: 78, popularity: 79 },
  { brand: "Volvo", model: "XC60", year: 2024, category: "SUV", price: 48000, engine: "2.0L Turbo Hybrid I4", fuel: "Hybrid", hp: 455, torque: 709, accel: 4.7, topSpeed: 180, consumption: "6.5L/100km", drive: "AWD", seats: 5, comfort: 88, performance: 78, reliability: 84, technology: 90, safety: 97, luxury: 84, popularity: 82 },
  { brand: "Volvo", model: "XC90", year: 2024, category: "SUV", price: 62000, engine: "2.0L Turbo Hybrid I4", fuel: "Hybrid", hp: 455, torque: 709, accel: 5.3, topSpeed: 180, consumption: "7.0L/100km", drive: "AWD", seats: 7, comfort: 92, performance: 76, reliability: 83, technology: 91, safety: 98, luxury: 88, popularity: 83 },
  { brand: "Volvo", model: "EX30", year: 2024, category: "SUV", price: 36000, engine: "Dual Motor Electric", fuel: "Electric", hp: 422, torque: 543, accel: 3.6, topSpeed: 180, consumption: "16.7kWh/100km", drive: "AWD", seats: 5, comfort: 80, performance: 85, reliability: 82, technology: 89, safety: 96, luxury: 76, popularity: 80 },

  // ===================== HYUNDAI =====================
  { brand: "Hyundai", model: "Elantra", year: 2024, category: "Sedan", price: 22000, engine: "2.0L I4", fuel: "Petrol", hp: 147, torque: 179, accel: 9.0, topSpeed: 195, consumption: "6.8L/100km", drive: "FWD", seats: 5, comfort: 76, performance: 48, reliability: 88, technology: 80, safety: 88, luxury: 55, popularity: 74 },
  { brand: "Hyundai", model: "Tucson", year: 2024, category: "SUV", price: 29000, engine: "2.5L I4", fuel: "Petrol", hp: 187, torque: 241, accel: 8.2, topSpeed: 195, consumption: "8.0L/100km", drive: "AWD", seats: 5, comfort: 80, performance: 55, reliability: 87, technology: 84, safety: 90, luxury: 65, popularity: 81 },
  { brand: "Hyundai", model: "Ioniq 5", year: 2024, category: "SUV", price: 44000, engine: "Dual Motor Electric", fuel: "Electric", hp: 320, torque: 605, accel: 5.0, topSpeed: 185, consumption: "18kWh/100km", drive: "AWD", seats: 5, comfort: 85, performance: 78, reliability: 84, technology: 93, safety: 93, luxury: 78, popularity: 88 },
  { brand: "Hyundai", model: "Santa Fe", year: 2024, category: "SUV", price: 34000, engine: "2.5L Turbo I4", fuel: "Petrol", hp: 277, torque: 421, accel: 6.8, topSpeed: 200, consumption: "9.5L/100km", drive: "AWD", seats: 7, comfort: 83, performance: 62, reliability: 86, technology: 85, safety: 91, luxury: 70, popularity: 78 },

  // ===================== KIA =====================
  { brand: "Kia", model: "Sportage", year: 2024, category: "SUV", price: 28000, engine: "2.5L I4", fuel: "Petrol", hp: 187, torque: 241, accel: 8.3, topSpeed: 195, consumption: "8.1L/100km", drive: "AWD", seats: 5, comfort: 79, performance: 54, reliability: 86, technology: 83, safety: 90, luxury: 64, popularity: 79 },
  { brand: "Kia", model: "Sorento", year: 2024, category: "SUV", price: 35000, engine: "2.5L Turbo I4", fuel: "Petrol", hp: 281, torque: 420, accel: 6.5, topSpeed: 205, consumption: "9.2L/100km", drive: "AWD", seats: 7, comfort: 84, performance: 65, reliability: 86, technology: 86, safety: 92, luxury: 72, popularity: 78 },
  { brand: "Kia", model: "EV6 GT", year: 2024, category: "SUV", price: 62000, engine: "Dual Motor Electric", fuel: "Electric", hp: 576, torque: 740, accel: 3.5, topSpeed: 260, consumption: "19kWh/100km", drive: "AWD", seats: 5, comfort: 85, performance: 92, reliability: 83, technology: 94, safety: 92, luxury: 80, popularity: 85 },
  { brand: "Kia", model: "Stinger GT", year: 2023, category: "Sports Car", price: 52000, engine: "3.3L Twin-Turbo V6", fuel: "Petrol", hp: 368, torque: 510, accel: 4.7, topSpeed: 270, consumption: "10.8L/100km", drive: "AWD", seats: 5, comfort: 82, performance: 85, reliability: 83, technology: 84, safety: 88, luxury: 80, popularity: 82 },

  // ===================== PEUGEOT =====================
  { brand: "Peugeot", model: "208", year: 2024, category: "Hatchback", price: 22000, engine: "1.2L Turbo I3", fuel: "Petrol", hp: 130, torque: 230, accel: 8.7, topSpeed: 202, consumption: "5.5L/100km", drive: "FWD", seats: 5, comfort: 76, performance: 50, reliability: 80, technology: 82, safety: 87, luxury: 62, popularity: 70 },
  { brand: "Peugeot", model: "308", year: 2024, category: "Hatchback", price: 27000, engine: "1.5L Turbo Diesel I4", fuel: "Diesel", hp: 130, torque: 300, accel: 9.8, topSpeed: 200, consumption: "4.3L/100km", drive: "FWD", seats: 5, comfort: 80, performance: 50, reliability: 81, technology: 84, safety: 89, luxury: 68, popularity: 71 },
  { brand: "Peugeot", model: "3008", year: 2024, category: "SUV", price: 34000, engine: "1.6L Turbo Hybrid I4", fuel: "Hybrid", hp: 225, torque: 360, accel: 7.6, topSpeed: 220, consumption: "5.8L/100km", drive: "FWD", seats: 5, comfort: 83, performance: 62, reliability: 82, technology: 86, safety: 90, luxury: 74, popularity: 75 },

  // ===================== RENAULT =====================
  { brand: "Renault", model: "Clio", year: 2024, category: "Hatchback", price: 20000, engine: "1.0L Turbo I3", fuel: "Petrol", hp: 100, torque: 160, accel: 10.6, topSpeed: 188, consumption: "5.3L/100km", drive: "FWD", seats: 5, comfort: 74, performance: 42, reliability: 80, technology: 78, safety: 85, luxury: 55, popularity: 68 },
  { brand: "Renault", model: "Megane E-Tech", year: 2024, category: "Hatchback", price: 38000, engine: "Electric Motor", fuel: "Electric", hp: 218, torque: 300, accel: 7.4, topSpeed: 160, consumption: "16kWh/100km", drive: "FWD", seats: 5, comfort: 80, performance: 60, reliability: 81, technology: 87, safety: 89, luxury: 70, popularity: 71 },

  // ===================== CITROEN =====================
  { brand: "Citroën", model: "C5 Aircross", year: 2024, category: "SUV", price: 31000, engine: "2.0L Turbo Diesel I4", fuel: "Diesel", hp: 178, torque: 400, accel: 9.1, topSpeed: 200, consumption: "5.5L/100km", drive: "FWD", seats: 5, comfort: 85, performance: 50, reliability: 79, technology: 80, safety: 88, luxury: 70, popularity: 68 },

  // ===================== LAND ROVER =====================
  { brand: "Land Rover", model: "Range Rover", year: 2024, category: "SUV", price: 105000, engine: "3.0L Turbo Diesel I6", fuel: "Diesel", hp: 350, torque: 700, accel: 6.1, topSpeed: 225, consumption: "8.2L/100km", drive: "AWD", seats: 5, comfort: 97, performance: 78, reliability: 74, technology: 92, safety: 93, luxury: 97, popularity: 87 },
  { brand: "Land Rover", model: "Defender", year: 2024, category: "SUV", price: 62000, engine: "3.0L Turbo Diesel I6", fuel: "Diesel", hp: 300, torque: 650, accel: 7.1, topSpeed: 195, consumption: "8.8L/100km", drive: "AWD", seats: 5, comfort: 84, performance: 68, reliability: 75, technology: 87, safety: 90, luxury: 82, popularity: 85 },
  { brand: "Land Rover", model: "Range Rover Sport", year: 2024, category: "SUV", price: 88000, engine: "3.0L Turbo I6 Hybrid", fuel: "Hybrid", hp: 434, torque: 620, accel: 5.6, topSpeed: 225, consumption: "8.9L/100km", drive: "AWD", seats: 5, comfort: 92, performance: 84, reliability: 75, technology: 91, safety: 92, luxury: 92, popularity: 84 },

  // ===================== JEEP =====================
  { brand: "Jeep", model: "Wrangler", year: 2024, category: "SUV", price: 38000, engine: "3.6L V6", fuel: "Petrol", hp: 285, torque: 353, accel: 7.4, topSpeed: 160, consumption: "11.8L/100km", drive: "AWD", seats: 5, comfort: 70, performance: 58, reliability: 78, technology: 74, safety: 82, luxury: 62, popularity: 82 },
  { brand: "Jeep", model: "Grand Cherokee", year: 2024, category: "SUV", price: 42000, engine: "3.0L Turbo Diesel V6", fuel: "Diesel", hp: 260, torque: 570, accel: 7.5, topSpeed: 200, consumption: "7.5L/100km", drive: "AWD", seats: 5, comfort: 84, performance: 62, reliability: 78, technology: 84, safety: 89, luxury: 76, popularity: 79 },

  // ===================== MASERATI =====================
  { brand: "Maserati", model: "Ghibli", year: 2023, category: "Sedan", price: 85000, engine: "3.0L Twin-Turbo V6", fuel: "Petrol", hp: 424, torque: 580, accel: 4.7, topSpeed: 267, consumption: "11.0L/100km", drive: "AWD", seats: 5, comfort: 85, performance: 84, reliability: 74, technology: 85, safety: 88, luxury: 90, popularity: 78 },
  { brand: "Maserati", model: "MC20", year: 2024, category: "Supercar", price: 216000, engine: "3.0L Twin-Turbo V6", fuel: "Petrol", hp: 621, torque: 730, accel: 2.9, topSpeed: 325, consumption: "12.8L/100km", drive: "RWD", seats: 2, comfort: 78, performance: 96, reliability: 73, technology: 90, safety: 87, luxury: 94, popularity: 85 },

  // ===================== ALFA ROMEO =====================
  { brand: "Alfa Romeo", model: "Giulia Quadrifoglio", year: 2024, category: "Sports Car", price: 79000, engine: "2.9L Twin-Turbo V6", fuel: "Petrol", hp: 505, torque: 600, accel: 3.9, topSpeed: 307, consumption: "10.8L/100km", drive: "RWD", seats: 5, comfort: 81, performance: 93, reliability: 74, technology: 84, safety: 88, luxury: 84, popularity: 84 },
  { brand: "Alfa Romeo", model: "Stelvio", year: 2024, category: "SUV", price: 52000, engine: "2.0L Turbo I4", fuel: "Petrol", hp: 280, torque: 405, accel: 5.4, topSpeed: 230, consumption: "9.3L/100km", drive: "AWD", seats: 5, comfort: 82, performance: 80, reliability: 74, technology: 83, safety: 89, luxury: 82, popularity: 80 },

  // ===================== CADILLAC =====================
  { brand: "Cadillac", model: "Escalade", year: 2024, category: "SUV", price: 87000, engine: "6.2L V8", fuel: "Petrol", hp: 420, torque: 460, accel: 6.0, topSpeed: 210, consumption: "13.8L/100km", drive: "AWD", seats: 7, comfort: 93, performance: 74, reliability: 77, technology: 90, safety: 92, luxury: 94, popularity: 86 },
  { brand: "Cadillac", model: "CT5-V Blackwing", year: 2024, category: "Sports Car", price: 96000, engine: "6.2L Supercharged V8", fuel: "Petrol", hp: 668, torque: 893, accel: 3.4, topSpeed: 320, consumption: "13.5L/100km", drive: "RWD", seats: 5, comfort: 82, performance: 96, reliability: 78, technology: 87, safety: 89, luxury: 86, popularity: 83 },

  // ===================== GENESIS =====================
  { brand: "Genesis", model: "G70", year: 2024, category: "Sedan", price: 42000, engine: "3.3L Twin-Turbo V6", fuel: "Petrol", hp: 365, torque: 376, accel: 4.5, topSpeed: 240, consumption: "10.5L/100km", drive: "AWD", seats: 5, comfort: 83, performance: 84, reliability: 86, technology: 88, safety: 91, luxury: 82, popularity: 80 },
  { brand: "Genesis", model: "G80", year: 2024, category: "Sedan", price: 55000, engine: "3.5L Twin-Turbo V6", fuel: "Petrol", hp: 375, torque: 391, accel: 5.3, topSpeed: 240, consumption: "10.8L/100km", drive: "AWD", seats: 5, comfort: 90, performance: 78, reliability: 87, technology: 91, safety: 93, luxury: 90, popularity: 79 },
  { brand: "Genesis", model: "GV80", year: 2024, category: "SUV", price: 58000, engine: "3.5L Twin-Turbo V6", fuel: "Petrol", hp: 375, torque: 391, accel: 5.8, topSpeed: 240, consumption: "11.5L/100km", drive: "AWD", seats: 7, comfort: 91, performance: 76, reliability: 86, technology: 92, safety: 94, luxury: 91, popularity: 81 },

  // ===================== RIVIAN =====================
  { brand: "Rivian", model: "R1T", year: 2024, category: "Pickup", price: 74000, engine: "Quad Motor Electric", fuel: "Electric", hp: 835, torque: 1231, accel: 3.0, topSpeed: 180, consumption: "25kWh/100km", drive: "AWD", seats: 5, comfort: 85, performance: 90, reliability: 78, technology: 95, safety: 92, luxury: 84, popularity: 84 },

  // ===================== BYD =====================
  { brand: "BYD", model: "Han EV", year: 2024, category: "Sedan", price: 38000, engine: "Dual Motor Electric", fuel: "Electric", hp: 517, torque: 700, accel: 3.9, topSpeed: 185, consumption: "16kWh/100km", drive: "AWD", seats: 5, comfort: 84, performance: 82, reliability: 82, technology: 92, safety: 90, luxury: 80, popularity: 77 },
  { brand: "BYD", model: "Seal", year: 2024, category: "Sedan", price: 35000, engine: "Dual Motor Electric", fuel: "Electric", hp: 523, torque: 670, accel: 3.8, topSpeed: 180, consumption: "15.9kWh/100km", drive: "AWD", seats: 5, comfort: 82, performance: 83, reliability: 81, technology: 91, safety: 89, luxury: 76, popularity: 78 },

  // ===================== LOTUS =====================
  { brand: "Lotus", model: "Emira", year: 2024, category: "Sports Car", price: 96000, engine: "3.5L Supercharged V6", fuel: "Petrol", hp: 400, torque: 420, accel: 4.2, topSpeed: 290, consumption: "10.9L/100km", drive: "RWD", seats: 2, comfort: 72, performance: 90, reliability: 78, technology: 82, safety: 84, luxury: 84, popularity: 81 },

  // ===================== EXTRA BUDGET / AFFORDABLE PICKS =====================
  { brand: "Kia", model: "Rio", year: 2023, category: "Hatchback", price: 18000, engine: "1.6L I4", fuel: "Petrol", hp: 120, torque: 154, accel: 10.0, topSpeed: 185, consumption: "6.2L/100km", drive: "FWD", seats: 5, comfort: 70, performance: 42, reliability: 85, technology: 74, safety: 85, luxury: 48, popularity: 65 },
  { brand: "Hyundai", model: "Venue", year: 2024, category: "SUV", price: 20000, engine: "1.6L I4", fuel: "Petrol", hp: 121, torque: 150, accel: 10.5, topSpeed: 175, consumption: "6.9L/100km", drive: "FWD", seats: 5, comfort: 72, performance: 40, reliability: 86, technology: 76, safety: 86, luxury: 48, popularity: 66 },
  { brand: "Toyota", model: "Yaris", year: 2024, category: "Hatchback", price: 19000, engine: "1.5L I3", fuel: "Petrol", hp: 114, torque: 145, accel: 9.7, topSpeed: 180, consumption: "5.5L/100km", drive: "FWD", seats: 5, comfort: 72, performance: 40, reliability: 96, technology: 74, safety: 87, luxury: 48, popularity: 69 },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildDescription(v: RawVehicle): string {
  const speedNote =
    v.accel <= 3.2
      ? "hypercar-grade launch control"
      : v.accel <= 4.5
        ? "blistering acceleration"
        : v.accel <= 6.5
          ? "confident, spirited performance"
          : "smooth, everyday-friendly power delivery";
  const fuelNote =
    v.fuel === "Electric"
      ? "an all-electric powertrain built for instant torque and a silent, tech-forward driving experience"
      : v.fuel === "Hybrid"
        ? "a hybridized powertrain that blends efficiency with an extra shot of performance"
        : v.fuel === "Diesel"
          ? "a torque-rich diesel engine tuned for long-range efficiency"
          : "a responsive petrol engine tuned for a rewarding driving character";
  const segmentNote =
    v.price >= 200000
      ? "sitting at the pinnacle of automotive engineering and exclusivity"
      : v.price >= 90000
        ? "positioned firmly in the luxury and high-performance segment"
        : v.price >= 45000
          ? "offering a premium ownership experience at an attainable price"
          : "delivering exceptional value without compromising on quality";
  return `The ${v.year} ${v.brand} ${v.model} is a ${v.category.toLowerCase()} powered by ${v.engine}, producing ${v.hp} hp and ${v.torque} Nm of torque through ${fuelNote}. It sprints from 0-100 km/h in ${v.accel}s and reaches a top speed of ${v.topSpeed} km/h, showcasing ${speedNote}. ${segmentNote}, the ${v.model} pairs its performance credentials with a comfort rating of ${v.comfort}/100 and a technology rating of ${v.technology}/100, making it a compelling choice for drivers who want data-backed confidence in their next car.`;
}

function buildProsAndCons(v: RawVehicle): { pros: string[]; cons: string[] } {
  const pros: string[] = [];
  const cons: string[] = [];

  if (v.performance >= 92) pros.push("Blistering, track-ready performance");
  else if (v.performance >= 80) pros.push("Strong, engaging performance");
  if (v.comfort >= 90) pros.push("Exceptional ride comfort");
  else if (v.comfort >= 82) pros.push("Comfortable, relaxed cabin");
  if (v.reliability >= 90) pros.push("Outstanding reliability record");
  if (v.technology >= 92) pros.push("Cutting-edge technology suite");
  if (v.safety >= 92) pros.push("Top-tier safety systems");
  if (v.luxury >= 90) pros.push("Premium, luxurious feel");
  if (v.accel <= 3.5) pros.push("Supercar-grade acceleration");
  if (v.price <= 30000) pros.push("Excellent value for money");
  if (v.fuel === "Electric") pros.push("Zero tailpipe emissions with instant torque");
  if (v.fuel === "Hybrid") pros.push("Efficient hybrid powertrain");
  if (v.seats >= 7) pros.push("Spacious, family-friendly seating");
  if (pros.length === 0) pros.push("Well-balanced all-round package");

  if (v.reliability < 78) cons.push("Below-average reliability for its class");
  if (v.comfort < 76) cons.push("Firm, performance-biased ride");
  if (v.price >= 120000) cons.push("Very high purchase price");
  if (v.fuel === "Petrol" && parseFloat(v.consumption) >= 12) cons.push("Thirsty fuel consumption");
  if (v.seats <= 2) cons.push("Limited practicality with only 2 seats");
  if (v.technology < 80) cons.push("Infotainment tech trails class leaders");
  if (v.safety < 86) cons.push("Fewer advanced driver-assistance features");
  if (cons.length === 0) cons.push("Premium positioning means fewer budget trims");

  return { pros: pros.slice(0, 4), cons: cons.slice(0, 3) };
}

export const vehicles: Vehicle[] = raw.map((r) => {
  const overall = Math.round(
    (r.comfort + r.performance + r.reliability + r.technology + r.safety + r.luxury) / 6,
  );
  const { pros, cons } = buildProsAndCons(r);
  const slug = slugify(`${r.brand}-${r.model}-${r.year}`);
  return {
    ...r,
    id: slug,
    slug,
    searchQuery: `${r.brand} ${r.model}`,
    fullName: `${r.brand} ${r.model}`,
    overall,
    description: buildDescription(r),
    pros,
    cons,
    priority: PRIORITY_BRANDS.has(r.brand),
  };
});

export function getAllVehicles(): Vehicle[] {
  return vehicles;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getVehiclesByBrand(brand: string): Vehicle[] {
  return vehicles.filter((v) => v.brand.toLowerCase() === brand.toLowerCase());
}

export function getSimilarVehicles(vehicle: Vehicle, count = 4): Vehicle[] {
  return vehicles
    .filter((v) => v.id !== vehicle.id)
    .map((v) => {
      const priceDiff = Math.abs(v.price - vehicle.price) / vehicle.price;
      const sameCategory = v.category === vehicle.category ? 1 : 0;
      const sameBrand = v.brand === vehicle.brand ? 0.5 : 0;
      const score = sameCategory * 2 + sameBrand - priceDiff;
      return { v, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.v);
}

export function googleImagesUrl(query: string): string {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}

export const categories: Category[] = [
  "Sedan",
  "SUV",
  "Coupe",
  "Hatchback",
  "Supercar",
  "Sports Car",
  "Wagon",
  "Pickup",
  "Convertible",
];

export const fuelTypes: FuelType[] = ["Petrol", "Diesel", "Hybrid", "Electric"];

export const allBrandNames: string[] = Array.from(new Set(vehicles.map((v) => v.brand))).sort();
