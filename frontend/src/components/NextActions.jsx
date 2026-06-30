import { ArrowRight } from "lucide-react";

export function NextActions({ moves }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Recommended</p>
          <h2>Priority actions</h2>
        </div>
        <div className="panelBadge panelBadge-gold">{moves.length} moves</div>
      </div>

      <div className="actionList">
        {moves.map((move, index) => (
          <article className="actionItem" key={move}>
            <div className="actionNum">{index + 1}</div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <p className="actionText">{move}</p>
              <ArrowRight size={14} style={{ color: "var(--text-3)", flexShrink: 0, marginTop: 8 }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
