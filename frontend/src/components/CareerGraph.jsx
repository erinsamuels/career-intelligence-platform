import { useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

const NODE_POSITIONS = [
  { x: 12, y: 72 },
  { x: 34, y: 44 },
  { x: 60, y: 62 },
  { x: 85, y: 24 },
];

function curvePath(p1, p2) {
  const cx1 = p1.x + (p2.x - p1.x) * 0.42;
  const cy1 = p1.y;
  const cx2 = p1.x + (p2.x - p1.x) * 0.58;
  const cy2 = p2.y;
  return `M ${p1.x} ${p1.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
}

function elevationArea(positions) {
  const pts = positions.map((p) => `${p.x},${p.y}`).join(" L ");
  return `M ${positions[0].x},${positions[0].y} L ${pts} L ${positions[positions.length - 1].x},100 L ${positions[0].x},100 Z`;
}

export function CareerGraph({ activeNodeId, nodes, onSelectNode, target }) {
  const pathRefs = useRef([]);
  const [ripplingNode, setRipplingNode] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const positions = NODE_POSITIONS.slice(0, nodes.length);
  const activeIndex = nodes.findIndex((n) => n.id === activeNodeId);

  // SVG path drawing animation — retriggers on target change or expand toggle
  useEffect(() => {
    const frameIds = [];
    pathRefs.current.forEach((path, i) => {
      if (!path) return;
      const len = path.getTotalLength();
      path.style.transition = "none";
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          path.style.transition = `stroke-dashoffset ${0.65 + i * 0.18}s cubic-bezier(0.16,1,0.3,1) ${0.06 + i * 0.16}s`;
          path.style.strokeDashoffset = "0";
        });
      });
      frameIds.push(id);
    });
    return () => frameIds.forEach((id) => cancelAnimationFrame(id));
  }, [target?.id, expanded]);

  // Escape key to close fullscreen
  useEffect(() => {
    if (!expanded) return;
    const handler = (e) => { if (e.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  function handleNodeClick(nodeId) {
    onSelectNode(nodeId);
    setRipplingNode(nodeId);
    setTimeout(() => setRipplingNode(null), 700);
  }

  const panelHeader = (
    <div className="panelHeader">
      <div className="panelHeaderLeft">
        <p className="eyebrow">Career graph</p>
        <h2>Your route map</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="panelBadge">
          Step {activeIndex + 1} of {nodes.length}
        </div>
        {!expanded && (
          <button className="graphExpandBtn" onClick={() => setExpanded(true)}>
            <Maximize2 size={11} />
            Expand
          </button>
        )}
      </div>
    </div>
  );

  const graphBody = (
    <div className={`careerGraphWrap${expanded ? " careerGraphFull" : ""}`}>
      <svg
        className="graphSvg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(58,112,72,0.14)" />
            <stop offset="100%" stopColor="rgba(58,112,72,0)"    />
          </linearGradient>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--sage)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.78" />
          </linearGradient>
        </defs>

        {/* Terrain elevation fill */}
        <path d={elevationArea(positions)} fill="url(#elevGrad)" />

        {/* Glow halo behind main paths */}
        {positions.slice(0, -1).map((pos, i) => (
          <path
            key={`glow-${i}`}
            d={curvePath(pos, positions[i + 1])}
            fill="none"
            stroke="rgba(201,138,28,0.10)"
            strokeWidth="9"
            strokeLinecap="round"
            style={{ filter: "blur(5px)" }}
          />
        ))}

        {/* Shortcut "fast path" — dashed */}
        {positions.length >= 4 && (
          <path
            d={curvePath(positions[1], positions[3])}
            fill="none"
            stroke="rgba(58,112,72,0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
        )}

        {/* Main journey paths — animated via refs */}
        {positions.slice(0, -1).map((pos, i) => (
          <path
            key={`path-${i}`}
            ref={(el) => { pathRefs.current[i] = el; }}
            d={curvePath(pos, positions[i + 1])}
            stroke="url(#pathGrad)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* Subtle grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <line
            key={y}
            x1="0" y1={y} x2="100" y2={y}
            stroke="rgba(20,42,26,0.04)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Interactive nodes */}
      {nodes.map((node, index) => {
        const pos = positions[index];
        if (!pos) return null;
        const isActive = node.id === activeNodeId;
        const isRippling = node.id === ripplingNode;

        return (
          <button
            key={node.id}
            type="button"
            className={`graphNode ${node.type} ${isActive ? "active" : ""} ${isRippling ? "ripple" : ""}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${0.08 + index * 0.1}s`,
            }}
            onClick={() => handleNodeClick(node.id)}
          >
            <div className="graphNodeStep">{index + 1}</div>
            <div className="graphNodeLabel">{node.label}</div>
            <div className="graphNodeSub">{node.title}</div>
            <div className="graphNodeTimeframe">{node.timeframe}</div>
          </button>
        );
      })}
    </div>
  );

  if (expanded) {
    return (
      <div className="graphOverlay">
        <div className="graphOverlayHeader">
          <div>
            <p className="eyebrow">Career graph</p>
            <h2 style={{
              fontSize: "1.15rem", fontWeight: 800,
              letterSpacing: "-0.03em", color: "var(--text)",
            }}>
              Explore your route — click a node to focus
            </h2>
          </div>
          <button className="graphCloseBtn" onClick={() => setExpanded(false)}>
            <X size={15} />
            Close
          </button>
        </div>
        <div className="graphOverlayBody">
          {graphBody}
        </div>
      </div>
    );
  }

  return (
    <section className="panel">
      {panelHeader}
      {graphBody}
    </section>
  );
}
