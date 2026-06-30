import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";

const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;

export function PathScore({ activeMoves, pathScore, target }) {
  const [displayScore, setDisplayScore] = useState(target.score);
  const [animOffset, setAnimOffset]     = useState(CIRC);
  const frameRef = useRef(null);

  // Animate the ring and counter whenever pathScore changes
  useEffect(() => {
    // Start from empty then fill
    setAnimOffset(CIRC);
    setDisplayScore(target.score);

    const startTime  = performance.now();
    const duration   = 1200;
    const targetOffset = CIRC - (pathScore / 100) * CIRC;
    const startScore = target.score;
    const scoreDelta = pathScore - target.score;

    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out

      setAnimOffset(CIRC - eased * (CIRC - targetOffset));
      setDisplayScore(Math.round(startScore + eased * scoreDelta));

      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    }

    // Delay slightly so React finishes render before animation
    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, 80);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [pathScore, target.score]);

  const boost = pathScore - target.score;

  function scoreLabel(s) {
    if (s >= 85) return "Excellent trajectory";
    if (s >= 70) return "Strong trajectory";
    if (s >= 55) return "Developing trajectory";
    return "Early-stage trajectory";
  }

  return (
    <aside className="panel pathScorePanel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Path score</p>
          <h2>Match strength</h2>
        </div>
        {boost > 0 && (
          <div className="panelBadge panelBadge-sage">
            <TrendingUp size={11} />
            +{boost} projected
          </div>
        )}
      </div>

      {/* Animated ring */}
      <div className="scoreRingSection">
        <div className="scoreRingWrap">
          <svg
            viewBox="0 0 128 128"
            aria-hidden="true"
            style={{
              width: "100%", height: "100%",
              transform: "rotate(-90deg)",
            }}
          >
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#3A7048" />
                <stop offset="100%" stopColor="#C98A1C" />
              </linearGradient>
            </defs>

            {/* Track */}
            <circle
              cx="64" cy="64" r={RADIUS}
              fill="none"
              stroke="rgba(20,42,26,0.12)"
              strokeWidth="9"
            />

            {/* Progress arc */}
            <circle
              cx="64" cy="64" r={RADIUS}
              fill="none"
              stroke="url(#scoreGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={animOffset}
              style={{
                filter: "drop-shadow(0 0 8px rgba(201,138,28,0.40))",
                transition: "none",
              }}
            />

            {/* Boost ghost: shows remaining potential from 0 to full */}
            {boost > 0 && (
              <circle
                cx="64" cy="64" r={RADIUS}
                fill="none"
                stroke="rgba(58,112,72,0.25)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC - (target.score / 100) * CIRC}
              />
            )}
          </svg>

          <div className="scoreCenter">
            <span className="scoreNum">{displayScore}</span>
            <span className="scoreDenom">/ 100</span>
          </div>
        </div>

        <p className="scoreLabel">{scoreLabel(pathScore)}</p>

        {boost > 0 && (
          <div className="scoreBoostPill">
            <TrendingUp size={11} />
            Simulated projection
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="metricsGrid">
        {target.metrics.map((metric, i) => (
          <div className="metric" key={metric.label}>
            <div className="metricRow">
              <span className="metricName">{metric.label}</span>
              <span className="metricVal">{metric.value}%</span>
            </div>
            <div className="bar">
              <div
                className="barFill"
                style={{
                  width: `${metric.value}%`,
                  animationDelay: `${0.25 + i * 0.07}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Active move pills */}
      {activeMoves.length > 0 && (
        <div className="boostPills">
          {activeMoves.map((move) => (
            <span className="boostPill" key={move.id}>
              +{move.impact} {move.title}
            </span>
          ))}
        </div>
      )}
    </aside>
  );
}
