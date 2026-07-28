import { getVehiclesByBrand } from "./vehicles";

export interface Brand {
  name: string;
  slug: string;
  country: string;
  founded: number;
  logoText: string;
  tagline: string;
  description: string;
  philosophy: string;
  priority: boolean;
  accent: "red" | "blue" | "gold" | "white";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawBrands: Omit<Brand, "slug" | "logoText">[] = [
  {
    name: "Audi",
    country: "Germany",
    founded: 1909,
    tagline: "Vorsprung durch Technik",
    description:
      "Audi is a pillar of German engineering, blending quattro all-wheel-drive mastery, minimalist design, and cutting-edge digital cockpits across every segment it touches.",
    philosophy:
      "Audi's philosophy centers on progress through technology — every generation pushes forward in lightweight construction, electrification, and driver-assistance innovation while keeping design purity at the core.",
    priority: true,
    accent: "red",
  },
  {
    name: "BMW",
    country: "Germany",
    founded: 1916,
    tagline: "Sheer Driving Pleasure",
    description:
      "BMW is the benchmark for driver-focused engineering, famous for its straight-six engines, perfect 50:50 weight balance, and the legendary M performance division.",
    philosophy:
      "BMW engineers every car around the driver, obsessing over chassis dynamics, steering feel, and power delivery so that every trip — commute or canyon run — feels rewarding.",
    priority: true,
    accent: "blue",
  },
  {
    name: "Mercedes-Benz",
    country: "Germany",
    founded: 1926,
    tagline: "The Best or Nothing",
    description:
      "Mercedes-Benz invented the automobile and continues to define luxury motoring, from the flagship S-Class to the hand-built AMG performance icons and the G-Class off-road legend.",
    philosophy:
      "Mercedes-Benz pursues uncompromising quality, safety leadership, and opulent comfort, pairing three-pointed-star prestige with class-leading innovation in every era.",
    priority: true,
    accent: "gold",
  },
  { name: "Porsche", country: "Germany", founded: 1931, tagline: "There is no substitute", description: "Porsche has spent decades perfecting the sports car formula, from the rear-engined 911 to the electric Taycan, all built with motorsport-grade precision.", philosophy: "Every Porsche is engineered to be usable daily yet capable on a track, balancing everyday practicality with motorsport DNA.", priority: false, accent: "white" },
  { name: "Ferrari", country: "Italy", founded: 1939, tagline: "The prancing horse", description: "Ferrari builds some of the most desirable performance cars on earth, marrying Formula 1-derived technology with unmistakable Italian styling.", philosophy: "Ferrari chases pure emotion — every model is designed to deliver a visceral, race-inspired driving experience.", priority: false, accent: "red" },
  { name: "Lamborghini", country: "Italy", founded: 1963, tagline: "Expect the unexpected", description: "Lamborghini creates dramatic, naturally aspirated and hybrid supercars with sharp angular design and theatrical presence.", philosophy: "Lamborghini's philosophy is bold, uncompromising design paired with extreme performance and unmistakable road presence.", priority: false, accent: "gold" },
  { name: "McLaren", country: "United Kingdom", founded: 1963, tagline: "Track-bred performance", description: "McLaren applies Formula 1 engineering to road-going supercars, focusing on lightweight carbon construction and razor-sharp handling.", philosophy: "McLaren believes performance should come from engineering purity, not just raw power — lightness and aerodynamics come first.", priority: false, accent: "blue" },
  { name: "Aston Martin", country: "United Kingdom", founded: 1913, tagline: "Power, Beauty, Soul", description: "Aston Martin crafts handsome British grand tourers and sports cars that blend racing heritage with bespoke luxury craftsmanship.", philosophy: "Aston Martin balances emotional design with usable performance, favoring elegance alongside outright speed.", priority: false, accent: "gold" },
  { name: "Bentley", country: "United Kingdom", founded: 1919, tagline: "Extraordinary journeys", description: "Bentley hand-builds ultra-luxury grand tourers and SUVs with handcrafted leather interiors and effortless twin-turbo power.", philosophy: "Bentley believes in effortless performance wrapped in handcrafted British luxury.", priority: false, accent: "gold" },
  { name: "Rolls-Royce", country: "United Kingdom", founded: 1904, tagline: "The best car in the world", description: "Rolls-Royce is the pinnacle of automotive luxury, offering bespoke coachbuilding and a magic-carpet ride unmatched in the industry.", philosophy: "Rolls-Royce exists to deliver serene, silent, and utterly bespoke transportation for those who demand the very best.", priority: false, accent: "gold" },
  { name: "Bugatti", country: "France", founded: 1909, tagline: "Art, Forme, Technique", description: "Bugatti builds some of the fastest and most exclusive hypercars ever made, blending art with extreme engineering.", philosophy: "Bugatti pursues the absolute limits of speed and craftsmanship without compromise.", priority: false, accent: "blue" },
  { name: "Koenigsegg", country: "Sweden", founded: 1994, tagline: "Never Stop Exploring", description: "Koenigsegg is an independent Swedish hypercar maker pushing the boundaries of top speed, weight reduction, and mechanical innovation.", philosophy: "Koenigsegg innovates relentlessly, engineering entirely new mechanical solutions rather than following convention.", priority: false, accent: "gold" },
  { name: "Pagani", country: "Italy", founded: 1992, tagline: "Art and science", description: "Pagani builds hand-crafted carbon-titanium hypercars treated as rolling works of art, with obsessive attention to detail.", philosophy: "Pagani fuses art, science, and engineering into hypercars, treating every component as a design statement.", priority: false, accent: "gold" },
  { name: "Toyota", country: "Japan", founded: 1937, tagline: "Let's Go Places", description: "Toyota is the world's most trusted mainstream brand, known for bulletproof reliability, hybrid leadership, and everyday value.", philosophy: "Toyota's philosophy of Kaizen — continuous improvement — drives relentless refinement of reliability and efficiency.", priority: false, accent: "white" },
  { name: "Honda", country: "Japan", founded: 1948, tagline: "The Power of Dreams", description: "Honda blends efficient, high-revving engineering with class-leading reliability across everything from the Civic to the Type R.", philosophy: "Honda engineers chase efficiency and joyful engine performance in equal measure.", priority: false, accent: "red" },
  { name: "Nissan", country: "Japan", founded: 1933, tagline: "Innovation that excites", description: "Nissan spans everyday crossovers to the legendary GT-R supercar-slayer, with deep motorsport and EV pioneering heritage.", philosophy: "Nissan pursues innovation for everyone, from mainstream EVs to halo performance icons.", priority: false, accent: "red" },
  { name: "Mazda", country: "Japan", founded: 1920, tagline: "Feel Alive", description: "Mazda focuses on driver engagement, elegant Kodo design, and the timeless MX-5 roadster formula.", philosophy: "Mazda's Jinba-Ittai philosophy means horse and rider — car and driver — should feel as one.", priority: false, accent: "red" },
  { name: "Lexus", country: "Japan", founded: 1989, tagline: "Experience Amazing", description: "Lexus is Toyota's luxury arm, delivering serene comfort, meticulous craftsmanship, and exceptional dependability.", philosophy: "Lexus pursues Takumi craftsmanship — obsessive artisanal quality in every detail.", priority: false, accent: "gold" },
  { name: "Subaru", country: "Japan", founded: 1953, tagline: "Confidence in Motion", description: "Subaru is famous for standard all-wheel drive, boxer engines, and rally-bred performance models like the WRX STI.", philosophy: "Subaru builds confidence into every model through symmetrical all-wheel drive and safety-first engineering.", priority: false, accent: "blue" },
  { name: "Ford", country: "United States", founded: 1903, tagline: "Built Ford Tough", description: "Ford spans muscle-car icons like the Mustang to rugged trucks and pioneering EVs like the Mach-E and F-150 Lightning.", philosophy: "Ford champions accessible performance and toughness, putting capability within reach of everyday drivers.", priority: false, accent: "blue" },
  { name: "Chevrolet", country: "United States", founded: 1911, tagline: "Find New Roads", description: "Chevrolet delivers American muscle and value, headlined by the mid-engine Corvette and the Camaro SS.", philosophy: "Chevrolet believes in giving drivers big performance and capability at an approachable price.", priority: false, accent: "gold" },
  { name: "Dodge", country: "United States", founded: 1900, tagline: "Domestic. Not Domesticated.", description: "Dodge builds unapologetic muscle cars packing supercharged V8 power and aggressive attitude.", philosophy: "Dodge exists purely for raw, thunderous American performance.", priority: false, accent: "red" },
  { name: "Tesla", country: "United States", founded: 2003, tagline: "Accelerating sustainable transport", description: "Tesla pioneered the mass-market EV, leading in range, software, and over-the-air innovation across its entire lineup.", philosophy: "Tesla's mission is to accelerate the world's transition to sustainable energy through software-defined vehicles.", priority: false, accent: "red" },
  { name: "Volkswagen", country: "Germany", founded: 1937, tagline: "Das Auto", description: "Volkswagen is the people's car company, offering the beloved Golf GTI alongside its growing ID electric family.", philosophy: "Volkswagen believes great engineering and design should be accessible to everyone.", priority: false, accent: "blue" },
  { name: "Volvo", country: "Sweden", founded: 1927, tagline: "For life", description: "Volvo is synonymous with safety innovation, Scandinavian design, and a fast-electrifying SUV lineup.", philosophy: "Volvo's core philosophy is that safety and human-centric design come before everything else.", priority: false, accent: "blue" },
  { name: "Hyundai", country: "South Korea", founded: 1967, tagline: "New Thinking, New Possibilities", description: "Hyundai has rapidly become a design and EV leader, from the value-packed Elantra to the fast-charging Ioniq 5.", philosophy: "Hyundai combines bold design with rapid innovation to challenge legacy automakers.", priority: false, accent: "blue" },
  { name: "Kia", country: "South Korea", founded: 1944, tagline: "Movement that inspires", description: "Kia has transformed into a design and performance powerhouse, spanning the EV6 GT to the Stinger sports sedan.", philosophy: "Kia designs cars to inspire movement — emotionally and physically — through bold style and technology.", priority: false, accent: "red" },
  { name: "Peugeot", country: "France", founded: 1810, tagline: "Motion & Emotion", description: "Peugeot blends French flair, efficient turbo and hybrid powertrains, and distinctive interior design.", philosophy: "Peugeot pursues motion and emotion, believing driving should stir the senses even in everyday cars.", priority: false, accent: "blue" },
  { name: "Renault", country: "France", founded: 1899, tagline: "Passion for life", description: "Renault offers efficient, characterful European hatchbacks and pioneering affordable EVs.", philosophy: "Renault champions accessible, characterful mobility for everyday European drivers.", priority: false, accent: "gold" },
  { name: "Citroën", country: "France", founded: 1919, tagline: "Inspired by You", description: "Citroën is known for supreme ride comfort and quirky, comfort-first design philosophy.", philosophy: "Citroën prioritizes comfort above all, engineering suspension and seating for a magic-carpet ride.", priority: false, accent: "red" },
  { name: "Land Rover", country: "United Kingdom", founded: 1948, tagline: "Above and Beyond", description: "Land Rover builds the world's most capable luxury off-roaders, from the rugged Defender to the opulent Range Rover.", philosophy: "Land Rover believes true luxury means going anywhere, in total comfort, without compromise.", priority: false, accent: "white" },
  { name: "Jeep", country: "United States", founded: 1943, tagline: "Go Anywhere. Do Anything.", description: "Jeep is the original off-road icon, with the Wrangler and Grand Cherokee built for genuine trail capability.", philosophy: "Jeep's philosophy is uncompromising off-road freedom for everyone.", priority: false, accent: "gold" },
  { name: "Maserati", country: "Italy", founded: 1914, tagline: "Luxury. Performance. Style.", description: "Maserati blends Italian glamour with race-bred engines, exemplified by the MC20 supercar and Ghibli sedan.", philosophy: "Maserati believes true luxury cars must also sound and drive like a work of art.", priority: false, accent: "blue" },
  { name: "Alfa Romeo", country: "Italy", founded: 1910, tagline: "La meccanica delle emozioni", description: "Alfa Romeo builds emotionally charged Italian sports sedans and SUVs like the Giulia Quadrifoglio.", philosophy: "Alfa Romeo's mechanics of emotion philosophy puts driving passion above all else.", priority: false, accent: "red" },
  { name: "Cadillac", country: "United States", founded: 1902, tagline: "Dare Greatly", description: "Cadillac has revived its performance credibility with the Blackwing line while offering commanding luxury SUVs like the Escalade.", philosophy: "Cadillac dares to blend bold American luxury with genuine performance credibility.", priority: false, accent: "gold" },
  { name: "Genesis", country: "South Korea", founded: 2015, tagline: "Human-centered luxury", description: "Genesis is Hyundai's luxury marque, offering value-driven refinement, striking design, and generous warranties.", philosophy: "Genesis focuses on human-centered luxury, prioritizing comfort, design, and genuine care for owners.", priority: false, accent: "gold" },
  { name: "Rivian", country: "United States", founded: 2009, tagline: "Keep the world adventurous forever", description: "Rivian builds adventure-ready electric trucks and SUVs engineered for both off-road capability and daily usability.", philosophy: "Rivian exists to keep the world adventurous while transitioning to sustainable transportation.", priority: false, accent: "blue" },
  { name: "BYD", country: "China", founded: 1995, tagline: "Build Your Dreams", description: "BYD is one of the world's largest EV makers, offering advanced battery technology at competitive prices.", philosophy: "BYD believes cutting-edge EV technology should scale to reach drivers everywhere.", priority: false, accent: "red" },
  { name: "Lotus", country: "United Kingdom", founded: 1952, tagline: "For the Drivers", description: "Lotus has always chased lightweight purity, delivering razor-sharp handling from the Elise to the modern Emira.", philosophy: "Lotus's founder famously said 'simplify, then add lightness' — a mantra still core to every model.", priority: false, accent: "gold" },
];

export const brands: Brand[] = rawBrands.map((b) => ({
  ...b,
  slug: slugify(b.name),
  logoText: b.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase(),
}));

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandVehicleCount(name: string): number {
  return getVehiclesByBrand(name).length;
}

export const priorityBrands = brands.filter((b) => b.priority);
