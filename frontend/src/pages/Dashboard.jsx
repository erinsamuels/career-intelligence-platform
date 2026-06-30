import { CareerGraph } from "../components/CareerGraph";
import { CompanyTargets } from "../components/CompanyTargets";
import { ConnectionTargets } from "../components/ConnectionTargets";
import { InsightPanel } from "../components/InsightPanel";
import { NextActions } from "../components/NextActions";
import { NodeDetails } from "../components/NodeDetails";
import { PathDNA } from "../components/PathDNA";
import { PathScore } from "../components/PathScore";
import { ResumeGap } from "../components/ResumeGap";
import { Simulator } from "../components/Simulator";
import { TargetSelector } from "../components/TargetSelector";

export function Dashboard({
  activeMoves,
  activeNode,
  activeNodeId,
  onChangeTarget,
  onSelectNode,
  onToggleMove,
  pathScore,
  selectedMoves,
  target,
  targets,
}) {
  return (
    <div className="dashboard">

      {/* Hero */}
      <section className="panel dashHero">
        <div className="dashHeroContent">
          <p className="eyebrow">Target path</p>
          <h2 className="dashHeroTitle">
            Your path to{" "}
            <em>{target.role}</em>{" "}
            at {target.company}
          </h2>
          <p className="dashHeroSummary">{target.summary}</p>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              borderRadius: "var(--r-full)", padding: "6px 13px",
              background: "var(--gold-glow)", border: "1px solid var(--border-gold)",
              fontSize: "0.78rem", fontWeight: 800, color: "var(--gold)",
            }}>
              {pathScore}/100 path score
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              borderRadius: "var(--r-full)", padding: "6px 13px",
              background: "var(--s2)", border: "1px solid var(--border)",
              fontSize: "0.78rem", fontWeight: 700, color: "var(--text-2)",
            }}>
              {target.nodes.length} steps mapped
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              borderRadius: "var(--r-full)", padding: "6px 13px",
              background: "var(--sage-glow)", border: "1px solid var(--border-sage)",
              fontSize: "0.78rem", fontWeight: 700, color: "var(--sage-lt)",
            }}>
              {target.companies.length} target companies
            </div>
          </div>
        </div>

        <TargetSelector
          onChangeTarget={onChangeTarget}
          target={target}
          targets={targets}
        />
      </section>

      {/* Primary grid: graph (wide) + score (narrow) */}
      <div className="dashGrid">
        <CareerGraph
          activeNodeId={activeNodeId}
          nodes={target.nodes}
          onSelectNode={onSelectNode}
        />

        <PathScore
          activeMoves={activeMoves}
          pathScore={pathScore}
          target={target}
        />

        <NodeDetails node={activeNode} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <NextActions moves={target.nextMoves} />
          <PathDNA target={target} />
        </div>
      </div>

      {/* Insights — full width */}
      <InsightPanel target={target} activeNode={activeNode} pathScore={pathScore} />

      {/* Resume gap — full width */}
      <ResumeGap gap={target.resumeGap} />

      {/* Companies */}
      <CompanyTargets companies={target.companies} />

      {/* Connections */}
      <ConnectionTargets connections={target.connections} />

      {/* Simulator — full width */}
      <Simulator selectedMoves={selectedMoves} onToggleMove={onToggleMove} />

    </div>
  );
}
