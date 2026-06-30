export function NodeDetails({ node }) {
  return (
    <section className="panel nodeDetailsPanel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Selected step</p>
          <h2>{node.label}</h2>
        </div>
        <div className={`panelBadge ${node.type === "goal" ? "panelBadge-gold" : ""}`}>
          {node.type}
        </div>
      </div>

      <div className="nodeHeroRow">
        <div>
          <div className="nodeTitle">{node.title}</div>
          <p className="nodeDesc">{node.detail}</p>
        </div>

        <div className="nodeMatchBox">
          <div className="nodeMatchNum">{node.match}%</div>
          <div className="nodeMatchSub">step fit</div>
        </div>
      </div>

      <div className="detailSection">
        <div className="detailSectionTitle">Skills gained</div>
        <div className="pillRow">
          {node.skills.map((skill) => (
            <span className="pill" key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="detailSection">
        <div className="detailSectionTitle">Common exits</div>
        <div className="pillRow">
          {node.exits.map((exit) => (
            <span className="pill pillMuted" key={exit}>{exit}</span>
          ))}
        </div>
      </div>

      <div className="nodeAction">
        <div className="nodeActionLabel">Next action</div>
        <p className="nodeActionText">{node.action}</p>
      </div>
    </section>
  );
}
