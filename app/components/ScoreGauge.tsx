import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const [progress, setProgress] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    useEffect(() => {
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

    const percentage = progress / 100;

    const getGradient = () => {
        if (score > 70) return ["#4ade80", "#22c55e"]; // green
        if (score > 49) return ["#facc15", "#eab308"]; // yellow
        return ["#f87171", "#ef4444"]; // red
    };

    const [startColor, endColor] = getGradient();

    const getLabel = () => {
        if (score > 70) return "Strong";
        if (score > 49) return "Good Start";
        return "Needs Work";
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-40 h-20">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    <defs>
                        <linearGradient
                            id="gaugeGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor={startColor} />
                            <stop offset="100%" stopColor={endColor} />
                        </linearGradient>
                    </defs>

                    {/* Background arc */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />

                    {/* Foreground arc */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                        style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
                    />
                </svg>

                {/* Score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                    <div className="text-xl font-semibold pt-4">
                        {Math.round(progress)}/100
                    </div>
                    <div className="text-sm text-gray-500">{getLabel()}</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;
