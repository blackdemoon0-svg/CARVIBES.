export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  trending: boolean;
  featured: boolean;
  readTime: number;
}

export const newsCategories = [
  "New Launches",
  "Electric Vehicles",
  "Technology",
  "Performance",
  "Luxury",
  "Motorsports",
  "Industry",
  "Rankings",
];

export const newsArticles: NewsArticle[] = [
  {
    slug: "10-most-exciting-sports-cars",
    title: "10 Most Exciting Sports Cars You Can Buy Right Now",
    category: "Performance",
    date: "2026-01-14",
    author: "CarVibes Editorial",
    excerpt:
      "From the Porsche 911 Turbo S to the BMW M3 Competition, these are the sports cars delivering the most thrills per dollar in 2026.",
    content: [
      "Sports cars remain the purest expression of automotive passion, and 2026's crop is arguably the strongest generation yet. Hybrid assistance, active aerodynamics, and lighter chassis construction have pushed lap times down while keeping the analog feel enthusiasts crave.",
      "Topping the list is the Porsche 911 Turbo S, a car that manages to be both a daily driver and a 330 km/h missile. Just behind it, the BMW M3 Competition proves that a four-door sedan can still out-drive most two-seaters thanks to its adaptive M differential and twin-turbo inline-six.",
      "Audi's RS6 Avant continues to be the enthusiast's secret weapon — a wagon that can out-accelerate most supercars off the line while swallowing a week's worth of luggage. Mercedes-AMG's GT 63 S rounds out the German trio with its hybridized V8 and genuine four-seat usability.",
      "Japanese engineering is represented by the Nissan GT-R and Toyota Supra, both proving that all-wheel drive and turbocharged inline engines can still deliver an emotional, communicative driving experience without European price tags.",
      "Whichever you choose, 2026 confirms that the sports car is far from dead — it's simply gotten smarter, faster, and more capable than ever before.",
    ],
    trending: true,
    featured: true,
    readTime: 6,
  },
  {
    slug: "future-of-electric-performance-cars",
    title: "The Future of Electric Performance Cars",
    category: "Electric Vehicles",
    date: "2026-01-10",
    author: "CarVibes Editorial",
    excerpt:
      "Electric powertrains are no longer a compromise for performance enthusiasts. Here's how brands like Porsche, Tesla, and Audi are redefining speed.",
    content: [
      "For years, skeptics argued that electrification would drain the soul from performance cars. The Porsche Taycan, Tesla Model S Plaid, and Audi e-tron GT have quietly dismantled that argument with devastating acceleration and genuine chassis communication.",
      "The Tesla Model S Plaid's tri-motor setup produces over 1,000 horsepower and can hit 100 km/h in nearly the time it takes to read this sentence — 2.1 seconds. Meanwhile, Porsche has proven that a two-speed rear transaxle can deliver repeatable, track-day-ready launch after launch without thermal fade.",
      "What's changing next is the sound and feel. Manufacturers are experimenting with synthesized soundtracks and torque-vectoring software that mimics the rotational inertia of a combustion engine, aiming to preserve emotional feedback while keeping zero-emission drivetrains.",
      "Battery chemistry improvements are also allowing for repeated hard driving without the power taper that plagued early EVs, meaning a whole generation of electric M cars, RS models, and AMGs is already in motion.",
      "The next decade of performance motoring won't be defined by cylinder count — it will be defined by software, torque distribution, and battery innovation.",
    ],
    trending: true,
    featured: false,
    readTime: 5,
  },
  {
    slug: "top-10-most-reliable-cars",
    title: "Top 10 Most Reliable Cars You Can Buy Today",
    category: "Rankings",
    date: "2026-01-05",
    author: "CarVibes Editorial",
    excerpt:
      "Toyota, Lexus, and Honda continue to dominate long-term reliability data. Here's our breakdown of the most dependable vehicles on sale.",
    content: [
      "Reliability remains one of the most important factors for everyday buyers, and our data confirms that Japanese manufacturers continue to lead the pack. The Toyota Corolla, Toyota Land Cruiser, and Lexus LX all post reliability scores above 93/100 in our database.",
      "What separates these vehicles isn't flashy technology — it's proven, conservatively engineered mechanicals, extensive real-world testing, and slower adoption of unproven tech.",
      "Honda's Civic and Accord continue the trend, offering dependable ownership with lower long-term maintenance costs than most European rivals.",
      "Interestingly, several premium brands are closing the reliability gap. The Porsche 911 and Genesis G80 both post reliability scores above 86/100, proving that performance and luxury no longer have to come at the cost of dependability.",
      "For buyers prioritizing peace of mind above all else, this list is the definitive starting point.",
    ],
    trending: false,
    featured: false,
    readTime: 4,
  },
  {
    slug: "new-supercars-changing-the-industry",
    title: "New Supercars Changing the Industry",
    category: "New Launches",
    date: "2025-12-28",
    author: "CarVibes Editorial",
    excerpt:
      "The Lamborghini Revuelto, Ferrari SF90 Stradale, and McLaren Artura are proving hybrid powertrains can push supercars further than ever.",
    content: [
      "The supercar segment is undergoing its biggest transformation since the introduction of forced induction. Lamborghini's Revuelto pairs a screaming naturally-aspirated V12 with three electric motors to produce over 1,000 horsepower, while remaining more efficient than its predecessor.",
      "Ferrari's SF90 Stradale takes a similar approach, combining a twin-turbo V8 with hybrid assistance for a combined output nearing 1,000 hp and genuine all-wheel-drive traction out of corners.",
      "McLaren's Artura demonstrates that hybrid supercars don't need to be heavier or less involving — its lightweight carbon tub keeps weight competitive with purely combustion-powered rivals.",
      "These launches signal a broader shift: hybridization is no longer just about efficiency, it's becoming the key to unlocking even higher performance ceilings than pure combustion ever allowed.",
    ],
    trending: true,
    featured: false,
    readTime: 5,
  },
  {
    slug: "best-luxury-suvs",
    title: "Best Luxury SUVs for Every Kind of Buyer",
    category: "Luxury",
    date: "2025-12-20",
    author: "CarVibes Editorial",
    excerpt:
      "From the Range Rover to the Rolls-Royce Cullinan, we break down the best luxury SUVs across every price point.",
    content: [
      "The luxury SUV segment has become the beating heart of nearly every premium automaker's lineup. The Range Rover remains the benchmark for effortless, opulent capability, while the Bentley Bentayga and Rolls-Royce Cullinan push the ceiling on bespoke luxury.",
      "For buyers seeking a sportier edge, the Mercedes-AMG-tuned G63 and Lamborghini Urus prove that luxury SUVs can also be genuinely thrilling to drive, with sub-4-second 0-100 km/h times.",
      "German rivals BMW X7 and Audi Q8 continue to offer some of the best balance of technology, comfort, and value in the segment, while the Genesis GV80 undercuts them all on price without sacrificing perceived quality.",
      "Whichever segment you shop in, 2026's luxury SUVs prove that three rows of seating no longer means compromising on prestige or performance.",
    ],
    trending: false,
    featured: false,
    readTime: 5,
  },
  {
    slug: "cars-that-could-become-future-classics",
    title: "Cars That Could Become Future Classics",
    category: "Industry",
    date: "2025-12-12",
    author: "CarVibes Editorial",
    excerpt:
      "Some of today's cars will be tomorrow's icons. We highlight the models most likely to appreciate in value and cultural significance.",
    content: [
      "Every era produces a handful of cars that transcend their original purpose to become icons. The Porsche 911 Turbo S continues a five-decade lineage that has never lost its collector appeal, and current examples are widely tipped to follow that trend.",
      "The BMW M5's move to a hybridized twin-turbo V8 marks the end of an era for combustion-only super-sedans, a milestone likely to make well-kept examples highly sought after.",
      "Meanwhile, the Toyota GR86 and Mazda MX-5 Miata keep the lightweight, analog sports car dream alive at an attainable price — historically, these are exactly the kind of cars that become future classics.",
      "Electric icons like the Tesla Model S Plaid and Porsche Taycan may also earn historical significance as the vehicles that proved EVs could be genuinely thrilling to drive.",
    ],
    trending: false,
    featured: false,
    readTime: 4,
  },
  {
    slug: "audi-bmw-mercedes-rivalry",
    title: "Inside the Audi vs BMW vs Mercedes-Benz Rivalry",
    category: "Industry",
    date: "2025-12-02",
    author: "CarVibes Editorial",
    excerpt:
      "The three German giants have battled for luxury supremacy for decades. We break down how each brand differentiates itself in 2026.",
    content: [
      "Few rivalries in the automotive world run as deep as the one between Audi, BMW, and Mercedes-Benz. Each brand has carved out a distinct identity: Audi leans on quattro all-wheel-drive traction and minimalist, tech-forward cabins; BMW obsesses over steering feel and rear-wheel-drive balance; Mercedes-Benz prioritizes opulence, comfort, and safety leadership.",
      "In the sedan wars, the Audi A6, BMW 5 Series, and Mercedes E-Class remain locked in an arms race of cabin technology, with each generation leapfrogging the last in display size and driver-assistance sophistication.",
      "Performance sub-brands tell a similar story — Audi Sport's RS models favor outright grip and usability, BMW M continues to chase the purest driver's-car feel, while Mercedes-AMG blends hybrid power with everyday comfort.",
      "There is no single winner in this rivalry — the real winner is the buyer, who gets three completely different flavors of German excellence to choose from.",
    ],
    trending: true,
    featured: false,
    readTime: 6,
  },
  {
    slug: "motorsports-roundup-2026",
    title: "Motorsports Roundup: What to Watch in 2026",
    category: "Motorsports",
    date: "2025-11-20",
    author: "CarVibes Editorial",
    excerpt:
      "From Formula 1's new regulations to endurance racing's hybrid hypercar era, here's what's shaping motorsport this year.",
    content: [
      "2026 marks a pivotal year in motorsport as Formula 1 introduces new power unit regulations emphasizing electrical power and sustainable fuels, forcing manufacturers to rethink hybrid deployment strategies.",
      "In endurance racing, hypercar-class prototypes from Ferrari, Porsche, and BMW continue to battle at Le Mans, with technology increasingly trickling down into road-going halo models.",
      "Rallying and touring car series continue to serve as proving grounds for all-wheel-drive and turbocharging technology that eventually reaches models like the Subaru WRX STI and Toyota GR Supra.",
      "Motorsport remains automotive's ultimate research lab — nearly every performance feature on today's road cars traces its roots back to the track.",
    ],
    trending: false,
    featured: false,
    readTime: 4,
  },
  {
    slug: "affordable-cars-worth-buying",
    title: "Affordable Cars That Still Feel Premium",
    category: "Industry",
    date: "2025-11-10",
    author: "CarVibes Editorial",
    excerpt:
      "You don't need a six-figure budget to feel like you're driving something special. These affordable cars punch well above their price.",
    content: [
      "Budget-conscious buyers no longer need to sacrifice quality. The Toyota Corolla and Honda Civic continue to deliver exceptional reliability and refinement well below $25,000.",
      "For buyers wanting a bit more excitement, the Volkswagen Golf GTI and Mazda3 offer genuinely engaging driving dynamics without the insurance costs of a full-blown sports car.",
      "Electric shoppers can also find real value — the Chevrolet Bolt EV and Nissan Leaf provide genuine around-town EV ownership at a fraction of luxury EV pricing.",
      "Affordable no longer means basic — 2026's budget-friendly options come loaded with driver-assistance tech, upscale interiors, and strong resale value.",
    ],
    trending: false,
    featured: false,
    readTime: 4,
  },
  {
    slug: "rise-of-chinese-ev-brands",
    title: "The Rise of Chinese EV Brands Like BYD",
    category: "Electric Vehicles",
    date: "2025-10-29",
    author: "CarVibes Editorial",
    excerpt:
      "BYD and other Chinese manufacturers are rapidly expanding globally with competitive pricing and advanced battery technology.",
    content: [
      "BYD has emerged as one of the largest EV manufacturers in the world, leveraging vertically integrated battery production to offer aggressive pricing without sacrificing range or technology.",
      "Models like the BYD Seal and Han EV pack sophisticated blade battery technology, offering strong range and rapid charging at prices well below many Western rivals.",
      "Legacy automakers are responding by accelerating their own EV roadmaps, but the pace of Chinese innovation has fundamentally reshaped the competitive landscape.",
      "Expect the next few years to bring even more competition, ultimately benefiting consumers with better technology at lower prices.",
    ],
    trending: true,
    featured: false,
    readTime: 4,
  },
  {
    slug: "g-class-icon-status",
    title: "Why the Mercedes G-Class Refuses to Go Out of Style",
    category: "Luxury",
    date: "2025-10-15",
    author: "CarVibes Editorial",
    excerpt:
      "Four decades after its debut, the G-Class remains one of the most desirable SUVs in the world. Here's why.",
    content: [
      "The Mercedes-Benz G-Class has barely changed its boxy silhouette since 1979, yet it remains one of the most sought-after luxury SUVs on the planet.",
      "Its enduring appeal comes from a rare combination: genuine off-road capability with three locking differentials, paired with hand-built AMG V8 power in G63 guise.",
      "Celebrity culture and streetwear crossover appeal have only cemented its status as a symbol of arrival, while its resale values remain some of the strongest in the industry.",
      "As Mercedes introduces an electric G-Class variant, the question on everyone's mind is whether the icon can maintain its charm in the EV era — early signs suggest it will.",
    ],
    trending: false,
    featured: false,
    readTime: 3,
  },
  {
    slug: "bmw-m-division-history",
    title: "The Evolution of BMW's M Division",
    category: "Performance",
    date: "2025-09-30",
    author: "CarVibes Editorial",
    excerpt:
      "From the M1 supercar to the hybrid M5, we trace how BMW's performance division has evolved over five decades.",
    content: [
      "BMW M began in 1972 as a motorsport skunkworks, eventually producing the mid-engine M1 supercar before shifting focus to road-going high-performance versions of BMW's core lineup.",
      "The E30 M3 cemented M's reputation with its homologation-special roots, while the E39 M5 introduced the idea of a super-sedan with a hand-built V8.",
      "Today's M3 Competition and M5 continue that legacy with twin-turbocharging and, most recently, hybrid assistance — the new M5 produces more power than any M car in history.",
      "Through every era, M's mission has stayed consistent: take BMW's best-driving platforms and sharpen them into the ultimate expression of driving pleasure.",
    ],
    trending: false,
    featured: false,
    readTime: 5,
  },
  {
    slug: "audi-electric-lineup-expansion",
    title: "Audi's Electric Lineup Is Expanding Fast",
    category: "Electric Vehicles",
    date: "2025-09-18",
    author: "CarVibes Editorial",
    excerpt:
      "The e-tron GT is just the beginning — Audi is rapidly electrifying its entire range, from compact SUVs to RS performance models.",
    content: [
      "Audi's e-tron GT proved the brand could build an EV with genuine sports-car credentials, sharing its platform with the Porsche Taycan while adding Audi's own design language.",
      "The Q8 e-tron and upcoming Q6 e-tron extend that formula to SUVs, offering quattro all-wheel-drive traction with zero emissions.",
      "Audi Sport has also confirmed electric RS models are coming, promising to preserve the brand's performance credibility as the lineup transitions away from combustion.",
      "With over a dozen electrified models planned by the end of the decade, Audi is positioning itself as one of the most aggressive legacy brands in the EV transition.",
    ],
    trending: false,
    featured: false,
    readTime: 4,
  },
  {
    slug: "best-daily-drivers-2026",
    title: "Best Daily Drivers of 2026",
    category: "Rankings",
    date: "2025-09-02",
    author: "CarVibes Editorial",
    excerpt:
      "Comfort, reliability, and safety come together in these standout daily drivers for commuters and families alike.",
    content: [
      "Not every great car needs to be a supercar. Daily drivers succeed by balancing comfort, safety, reliability, and running costs — and 2026's best examples do this brilliantly.",
      "The Toyota Camry and Honda Accord continue to set the standard for stress-free ownership, while the Volvo XC60 leads the pack in safety technology.",
      "For buyers wanting an upscale daily experience, the Genesis G80 and Lexus RX offer near-luxury comfort without the ownership costs typically associated with European rivals.",
      "Whatever your budget, this list proves that everyday cars have never been better equipped, safer, or more comfortable.",
    ],
    trending: false,
    featured: false,
    readTime: 4,
  },
];

export function getArticleBySlug(slug: string) {
  return newsArticles.find((a) => a.slug === slug);
}
