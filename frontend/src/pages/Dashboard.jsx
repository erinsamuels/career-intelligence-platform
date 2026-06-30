import { CareerGraph } from "../components/CareerGraph";
import { CompanyTargets } from "../components/CompanyTargets";
import { ConnectionTargets } from "../components/ConnectionTargets";
import { NextActions } from "../components/NextActions";
import { NodeDetails } from "../components/NodeDetails";
import { PathScore } from "../components/PathScore";
import { ProfileSnapshot } from "../components/ProfileSnapshot";
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
          <ProfileSnapshot target={target} />
        </div>
      </div>

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
