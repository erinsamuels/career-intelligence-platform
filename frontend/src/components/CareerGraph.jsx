import { useEffect, useState } from "react";

// Positions as percentages: suggest a rising path (elevation gain)
const NODE_POSITIONS = [
  { x: 12, y: 72 },  // Start — low ground
  { x: 34, y: 44 },  // Rise — mid elevation
  { x: 60, y: 62 },  // Dip — then climb
  { x: 85, y: 24 },  // Summit — highest point
];

// Generate a smooth cubic bezier path between two points
function curvePath(p1, p2) {
  const cx1 = p1.x + (p2.x - p1.x) * 0.42;
  const cy1 = p1.y;
  const cx2 = p1.x + (p2.x - p1.x) * 0.58;
  const cy2 = p2.y;
  return `M ${p1.x} ${p1.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
}

// Elevation fill polygon (horizon-style shading under main path)
function elevationArea(positions) {
  const pts = positions.map((p) => `${p.x},${p.y}`).join(" L ");
  return `M ${positions[0].x},${positions[0].y} L ${pts} L ${positions[positions.length - 1].x},100 L ${positions[0].x},100 Z`;
}

export function CareerGraph({ activeNodeId, nodes, onSelectNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(id);
  }, []);

  const positions = NODE_POSITIONS.slice(0, nodes.length);

  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Career graph</p>
          <h2>Your route map</h2>
        </div>
        <div className="panelBadge">Select a node</div>
      </div>

      <div className="careerGraphWrap">
        {/* SVG backdrop — terrain lines + paths */}
        <svg
          className="graphSvg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(117,163,123,0.08)" />
              <stop offset="100%" stopColor="rgba(117,163,123,0)"    />
            </linearGradient>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="var(--sage)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.7"  />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Elevation shading */}
          <path
            className="graphElevationBg"
            d={elevationArea(positions)}
            fill="url(#elevGrad)"
          />

          {/* Glow pass (blurred path behind main path) */}
          {positions.slice(0, -1).map((pos, i) => (
            <path
              key={`glow-${i}`}
              d={curvePath(pos, positions[i + 1])}
              className="graphPathGlow"
              style={{
                opacity: mounted ? 0.6 : 0,
                transition: `opacity 0.8s ease ${0.3 + i * 0.15}s`,
              }}
            />
          ))}

          {/* Alt "fast path" — dashed shortcut */}
          {positions.length >= 4 && (
            <path
              d={curvePath(positions[1], positions[3])}
              className="graphPathAlt"
              style={{
                opacity: mounted ? 0.5 : 0,
                transition: "opacity 0.8s ease 0.8s",
              }}
            />
          )}

          {/* Main journey path */}
          {positions.slice(0, -1).map((pos, i) => (
            <path
              key={`path-${i}`}
              d={curvePath(pos, positions[i + 1])}
              stroke="url(#pathGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.6s ease ${0.2 + i * 0.15}s`,
              }}
            />
          ))}

          {/* Horizontal terrain lines (subtle) */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0" y1={y} x2="100" y2={y}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Interactive nodes */}
        {nodes.map((node, index) => {
          const pos = positions[index];
          if (!pos) return null;
          const isActive = node.id === activeNodeId;

          return (
            <button
              key={node.id}
              type="button"
              className={`graphNode ${node.type} ${isActive ? "active" : ""}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                animationDelay: `${0.1 + index * 0.1}s`,
              }}
              onClick={() => onSelectNode(node.id)}
            >
              <div className="graphNodeStep">{index + 1}</div>
              <div className="graphNodeLabel">{node.label}</div>
              <div className="graphNodeSub">{node.title}</div>
              <div className="graphNodeTimeframe">{node.timeframe}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
