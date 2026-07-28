import { Category } from "@/data/vehicles";

// Abstract, premium technical "silhouette" graphic built with pure SVG so the site
// never depends on vehicle photography while still feeling visual and premium.
export default function VehicleSilhouette({
  category,
  accent = "#ff2d3d",
}: {
  category: Category;
  accent?: string;
}) {
  const isLow = ["Supercar", "Sports Car", "Coupe", "Convertible"].includes(category);
  const isTall = ["SUV", "Pickup"].includes(category);

  return (
    <svg viewBox="0 0 300 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`grad-${accent.replace("#", "")}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* grid baseline */}
      <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
      {/* body silhouette */}
      {isLow && (
        <path
          d="M10 80 L35 78 Q55 55 90 50 L170 47 Q210 47 235 60 L280 70 L290 80 Z"
          fill={`url(#grad-${accent.replace("#", "")})`}
          opacity="0.85"
        />
      )}
      {isTall && (
        <path
          d="M15 80 L20 55 Q30 40 55 38 L220 36 Q250 38 262 55 L272 80 Z"
          fill={`url(#grad-${accent.replace("#", "")})`}
          opacity="0.85"
        />
      )}
      {!isLow && !isTall && (
        <path
          d="M12 80 L22 60 Q40 44 70 42 L210 40 Q245 42 262 60 L280 80 Z"
          fill={`url(#grad-${accent.replace("#", "")})`}
          opacity="0.85"
        />
      )}
      {/* wheels */}
      <circle cx="70" cy="82" r="13" fill="#0d0f14" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="230" cy="82" r="13" fill="#0d0f14" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="70" cy="82" r="5" fill={accent} />
      <circle cx="230" cy="82" r="5" fill={accent} />
      {/* highlight lines */}
      <line x1="40" y1="65" x2="260" y2="65" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    </svg>
  );
}
