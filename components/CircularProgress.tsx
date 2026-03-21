"use client";

export function CircularProgress({ 
  value, 
  max, 
  size, 
  strokeWidth, 
  children, 
  color = "#10B981", 
  trackColor = "#E5E7EB",
  useGradient = false
}: {
  value: number;
  max: number;
  size: number;
  strokeWidth: number;
  children?: React.ReactNode;
  color?: string;
  trackColor?: string;
  useGradient?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {useGradient && (
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#84CC16" />
            </linearGradient>
          </defs>
        )}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius} 
          stroke={trackColor} 
          strokeWidth={strokeWidth} 
          fill="none" 
        />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke={useGradient ? "url(#progressGradient)" : color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
