import { useEffect, useState } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const [progress, setProgress] = useState(0);

  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  useEffect(() => {
    // Animate progress
    let frame: number;
    let current = 0;
    const step = () => {
      current += (score - current) * 0.1; // easing
      if (Math.abs(current - score) < 0.5) current = score;
      setProgress(current);
      if (current !== score) frame = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const strokeDashoffset = circumference * (1 - progress / 100);

  const getGradient = () => {
    if (score > 70) return ["#4ade80", "#22c55e"]; // green
    if (score > 49) return ["#facc15", "#eab308"]; // yellow
    return ["#f87171", "#ef4444"]; // red
  };

  const [startColor, endColor] = getGradient();

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
        />
      </svg>

      {/* Centered score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold text-sm">{`${Math.round(progress)}/100`}</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
