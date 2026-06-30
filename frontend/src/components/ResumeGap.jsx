import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ResumeGap({ gap }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Resume gap</p>
          <h2>Make the story clearer</h2>
        </div>
        <div className="panelBadge panelBadge-gold">{gap.readiness}% ready</div>
      </div>

      <div className="readinessRow">
        <div className="readinessBarWrap">
          <div className="readinessBarFill" style={{ width: `${gap.readiness}%` }} />
        </div>
        <span className="readinessPct">{gap.readiness}%</span>
      </div>

      <div className="focusBox">
        <div className="focusBoxLabel">Focus area</div>
        <p className="focusBoxText">{gap.focus}</p>
      </div>

      {/* Keywords split */}
      <div className="detailSection">
        <div className="detailSectionTitle">Missing keywords</div>
        <div className="resumeKeywords" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {gap.missingKeywords.map((kw) => (
            <span key={kw} className="keywordMissing" style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              borderRadius: "var(--r-full)",
              background: "rgba(251,146,60,0.08)",
              border: "1px solid rgba(251,146,60,0.22)",
              color: "#FB923C",
              fontSize: "0.74rem",
              fontWeight: 700,
              padding: "4px 10px",
            }}>
              <AlertCircle size={11} />
              {kw}
            </span>
          ))}
        </div>
      </div>

      {gap.presentKeywords && (
        <div className="detailSection">
          <div className="detailSectionTitle">Present keywords</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {gap.presentKeywords.map((kw) => (
              <span key={kw} style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                borderRadius: "var(--r-full)",
                background: "rgba(74,222,128,0.07)",
                border: "1px solid rgba(74,222,128,0.18)",
                color: "var(--green)",
                fontSize: "0.74rem",
                fontWeight: 700,
                padding: "4px 10px",
              }}>
                <CheckCircle2 size={11} />
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bullet upgrades */}
      <div className="detailSection">
        <div className="detailSectionTitle">Suggested rewrites</div>
        <div className="bulletList">
          {gap.bulletUpgrades.map((bullet, i) => (
            <div className="bulletCard" key={i}>
              <p className="bulletBefore">{bullet.before}</p>
              <p className="bulletAfter">{bullet.after}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
