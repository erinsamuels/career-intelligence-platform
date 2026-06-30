import { useState } from "react";
import { CareerGraph } from "../components/CareerGraph";
import { NodeDetails } from "../components/NodeDetails";
import { PathScore } from "../components/PathScore";

export function CareerMapPage({
  activeMoves,
  activeNode,
  activeNodeId,
  onSelectNode,
  pathScore,
  target,
  targets,
  onChangeTarget,
}) {
  const [compareTarget, setCompareTarget] = useState(null);

  const otherTargets = targets.filter((t) => t.id !== target.id);

  return (
    <div className="careerMapPage">

      {/* Hero */}
      <section className="panel" style={{ marginBottom: 16 }}>
        <div className="careerMapHero">
          <p className="eyebrow">Journey visualization</p>
          <h2 className="careerMapHeroTitle">
            From where you are<br />to where you want to be
          </h2>
          <p className="careerMapHeroSub">
            Every step in this map is drawn from real career trajectories. Select a node
            to explore what happens at each stage, what skills you gain, and what doors open.
          </p>
        </div>

        {/* Path comparison pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
          <button
            onClick={() => { setCompareTarget(null); onChangeTarget(target.id); }}
            style={{
              borderRadius: "var(--r-full)",
              padding: "7px 14px",
              fontSize: "0.78rem",
              fontWeight: 700,
              border: "1px solid var(--border-gold)",
              background: "var(--gold-glow)",
              color: "var(--gold)",
              cursor: "pointer",
            }}
          >
            {target.title}
          </button>
          {otherTargets.map((t) => (
            <button
              key={t.id}
              onClick={() => onChangeTarget(t.id)}
              style={{
                borderRadius: "var(--r-full)",
                padding: "7px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                border: "1px solid var(--border)",
                background: "var(--s1)",
                color: "var(--text-2)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {t.title}
            </button>
          ))}
        </div>
      </section>

      {/* Full-width graph */}
      <CareerGraph
        activeNodeId={activeNodeId}
        nodes={target.nodes}
        onSelectNode={onSelectNode}
      />

      {/* Node + Score row */}
      <div className="dashGrid" style={{ marginTop: 16 }}>
        <NodeDetails node={activeNode} />
        <PathScore
          activeMoves={activeMoves}
          pathScore={pathScore}
          target={target}
        />
      </div>

      {/* Full journey timeline */}
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="panelHeader">
          <div className="panelHeaderLeft">
            <p className="eyebrow">Step by step</p>
            <h2>Full journey breakdown</h2>
          </div>
          <div className="panelBadge">{target.nodes.length} milestones</div>
        </div>

        <div className="journeyTimeline">
          <div className="journeyLine" />
          {target.nodes.map((node, i) => (
            <div
              key={node.id}
              className="journeyNode"
              onClick={() => onSelectNode(node.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={`journeyDot ${node.type}`} />

              <div className="journeyCard" style={{
                borderColor: node.id === activeNodeId ? "var(--border-gold)" : undefined,
                background: node.id === activeNodeId ? "rgba(247,216,157,0.04)" : undefined,
              }}>
                <div className="journeyCardHeader">
                  <div>
                    <div className="journeyCardTitle">{node.label} — {node.title}</div>
                    <div className="journeyCardSub">{node.timeframe}</div>
                  </div>
                  <div className="journeyMatchBadge">{node.match}% fit</div>
                </div>

                <p className="journeyCardDesc">{node.detail}</p>

                {/* Skills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {node.skills.map((skill) => (
                    <span key={skill} className="pill" style={{ fontSize: "0.72rem" }}>{skill}</span>
                  ))}
                </div>

                {/* Action */}
                <div className="nodeAction" style={{ marginTop: 12 }}>
                  <div className="nodeActionLabel">Next action</div>
                  <p className="nodeActionText">{node.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
