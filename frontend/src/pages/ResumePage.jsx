import { AlertCircle, CheckCircle2, ArrowRight, FileText } from "lucide-react";

export function ResumePage({ target }) {
  const { resumeGap } = target;

  return (
    <div className="resumePage">

      {/* Readiness hero */}
      <section className="panel" style={{ marginBottom: 16 }}>
        <div className="panelHeader">
          <div className="panelHeaderLeft">
            <p className="eyebrow">Resume analysis</p>
            <h2>How strong is your story?</h2>
          </div>
          <div className="panelBadge panelBadge-gold">{resumeGap.readiness}% ready</div>
        </div>

        <div className="resumeScoreBar">
          <div>
            <div className="resumeScoreNum">{resumeGap.readiness}%</div>
            <div className="resumeScoreLabel">Resume readiness</div>
          </div>
          <div style={{ flex: 1, padding: "0 16px" }}>
            <div className="resumeScoreTrack">
              <div
                className="resumeScoreTrackFill"
                style={{ width: `${resumeGap.readiness}%` }}
              />
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginTop: 6, fontSize: "0.68rem",
              color: "var(--text-3)", fontWeight: 600
            }}>
              <span>Early stage</span>
              <span>Interview ready</span>
            </div>
          </div>
        </div>

        <div className="focusBox">
          <div className="focusBoxLabel">
            <FileText size={11} style={{ display: "inline", marginRight: 4 }} />
            Focus area
          </div>
          <p className="focusBoxText">{resumeGap.focus}</p>
        </div>
      </section>

      {/* Two-column: Keywords + Upgrades */}
      <div className="resumeTwoCols">

        {/* Keywords */}
        <section className="panel">
          <div className="panelHeader">
            <div className="panelHeaderLeft">
              <p className="eyebrow">Keywords</p>
              <h2>What's missing</h2>
            </div>
          </div>

          <div className="detailSection">
            <div className="detailSectionTitle" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <AlertCircle size={12} style={{ color: "#FB923C" }} />
              Add these keywords
            </div>
            <div className="resumeKeywords" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {resumeGap.missingKeywords.map((kw) => (
                <span key={kw} style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  borderRadius: "var(--r-full)",
                  background: "rgba(251,146,60,0.08)",
                  border: "1px solid rgba(251,146,60,0.22)",
                  color: "#FB923C",
                  fontSize: "0.75rem", fontWeight: 700,
                  padding: "5px 11px",
                }}>
                  <AlertCircle size={11} />
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {resumeGap.presentKeywords && (
            <div className="detailSection">
              <div className="detailSectionTitle" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <CheckCircle2 size={12} style={{ color: "var(--green)" }} />
                Already present
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {resumeGap.presentKeywords.map((kw) => (
                  <span key={kw} style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    borderRadius: "var(--r-full)",
                    background: "rgba(74,222,128,0.07)",
                    border: "1px solid rgba(74,222,128,0.18)",
                    color: "var(--green)",
                    fontSize: "0.75rem", fontWeight: 700,
                    padding: "5px 11px",
                  }}>
                    <CheckCircle2 size={11} />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Bullet rewrites */}
        <section className="panel">
          <div className="panelHeader">
            <div className="panelHeaderLeft">
              <p className="eyebrow">Rewrites</p>
              <h2>Stronger bullets</h2>
            </div>
          </div>

          <div className="bulletList">
            {resumeGap.bulletUpgrades.map((bullet, i) => (
              <div key={i} className="bulletCard">
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{
                    fontSize: "0.62rem", fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "#FB923C"
                  }}>Before</span>
                </div>
                <p className="bulletBefore">{bullet.before}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "4px 0 2px" }}>
                  <ArrowRight size={12} style={{ color: "var(--sage-lt)" }} />
                  <span style={{
                    fontSize: "0.62rem", fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "var(--sage-lt)"
                  }}>After</span>
                </div>
                <p className="bulletAfter">{bullet.after}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tips */}
      <section className="panel" style={{ marginTop: 16 }}>
        <div className="panelHeader">
          <div className="panelHeaderLeft">
            <p className="eyebrow">Coaching</p>
            <h2>How to frame your story</h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            {
              title: "Lead with impact",
              body: "Every bullet should start with what you improved, not what your responsibilities were. Numbers first.",
            },
            {
              title: "Name the constraint",
              body: "Employers care about what you solved *under pressure*. Mention tight timelines, limited resources, or cross-team complexity.",
            },
            {
              title: "Use industry language",
              body: `${target.company} recruiters scan for specific terms. Use "${resumeGap.missingKeywords.slice(0,2).join('" and "')}" explicitly.`,
            },
          ].map((tip) => (
            <div key={tip.title} style={{
              borderRadius: "var(--r-lg)",
              padding: "16px",
              background: "var(--s1)",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                fontSize: "0.82rem", fontWeight: 800,
                color: "var(--text)", marginBottom: 6,
                letterSpacing: "-0.01em"
              }}>
                {tip.title}
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-2)", lineHeight: 1.58 }}>
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
