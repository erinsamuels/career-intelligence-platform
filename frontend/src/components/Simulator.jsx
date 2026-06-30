import { simulatorMoves } from "../data/pathData";
import { Check, TrendingUp } from "lucide-react";

export function Simulator({ selectedMoves, onToggleMove }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Simulator</p>
          <h2>Test a career move</h2>
        </div>
        <div className="panelBadge">
          <TrendingUp size={11} />
          Updates path score
        </div>
      </div>

      <div className="simGrid">
        {simulatorMoves.map((move) => {
          const selected = selectedMoves.includes(move.id);

          return (
            <button
              className={`simCard ${selected ? "active" : ""}`}
              key={move.id}
              onClick={() => onToggleMove(move.id)}
              type="button"
            >
              <div className="simCheckmark">
                <Check size={12} />
              </div>

              <div>
                <div className="simCardTitle">{move.title}</div>
                <p className="simCardDesc">{move.detail}</p>
              </div>

              <div className="simCardImpact">
                <TrendingUp size={13} />
                +{move.impact} score
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
