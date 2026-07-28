interface StatBarProps {
  label: string;
  value: number; // 0-100
  displayValue?: string;
  color?: string;
}

export default function StatBar({ label, value, displayValue, color = "#ff2d3d" }: StatBarProps) {
  const pct = Math.max(2, Math.min(100, value));
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-600 text-white/60">{label}</span>
        <span className="font-700 text-white">{displayValue ?? `${Math.round(value)}/100`}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="cv-grow-bar h-full rounded-full"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.5))` }}
        />
      </div>
    </div>
  );
}
