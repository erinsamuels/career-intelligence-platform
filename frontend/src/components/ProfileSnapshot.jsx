import { MapPin, Target, Briefcase } from "lucide-react";

export function ProfileSnapshot({ target }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Profile</p>
          <h2>Current story</h2>
        </div>
      </div>

      <div className="snapshotGrid">
        <div className="snapshotCard wide">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Briefcase size={13} style={{ color: "var(--sage-lt)" }} />
            <div className="snapshotLabel">Current position</div>
          </div>
          <div className="snapshotVal">{target.current}</div>
        </div>

        <div className="snapshotCard">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Target size={13} style={{ color: "var(--gold)" }} />
            <div className="snapshotLabel">Target company</div>
          </div>
          <div className="snapshotVal">{target.targetCompany}</div>
        </div>

        <div className="snapshotCard">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <MapPin size={13} style={{ color: "var(--sage-lt)" }} />
            <div className="snapshotLabel">Target function</div>
          </div>
          <div className="snapshotVal">{target.role}</div>
        </div>
      </div>
    </section>
  );
}
