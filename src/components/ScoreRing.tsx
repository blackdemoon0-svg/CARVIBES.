"use client";

interface ScoreRingProps {
  value: number; // 0-100
  label: string;
  size?: number;
  color?: string;
}

export default function ScoreRing({ value, label, size = 92, color = "#ff2d3d" }: ScoreRingProps) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: size, height: size }} className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="cv-ring-circle"
            style={
              {
                "--cv-dash-start": circumference,
                "--cv-dash-end": offset,
              } as React.CSSProperties
            }
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-lg font-700 text-white">{Math.round(value)}</span>
        </div>
      </div>
      <span className="text-center text-[11px] font-600 uppercase tracking-wider text-white/50">
        {label}
      </span>
    </div>
  );
}
