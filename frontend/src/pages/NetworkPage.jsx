import { Search, MessageSquare, Users, Target, TrendingUp } from "lucide-react";

export function NetworkPage({ target }) {
  const { connections } = target;

  return (
    <div className="networkPage">

      {/* Stats row */}
      <div className="networkStat">
        <div className="networkStatCard">
          <div className="networkStatNum">{connections.length}</div>
          <div className="networkStatLabel">Target archetypes</div>
        </div>
        <div className="networkStatCard">
          <div className="networkStatNum" style={{ color: "var(--gold)" }}>1st</div>
          <div className="networkStatLabel">Priority: warm intro</div>
        </div>
        <div className="networkStatCard">
          <div className="networkStatNum" style={{ color: "var(--sage-lt)" }}>15 min</div>
          <div className="networkStatLabel">Ideal call length</div>
        </div>
      </div>

      {/* Strategy hero */}
      <section className="panel" style={{ marginBottom: 16 }}>
        <div className="panelHeader">
          <div className="panelHeaderLeft">
            <p className="eyebrow">Networking strategy</p>
            <h2>Build a warm path to {target.company}</h2>
          </div>
        </div>

        <div style={{
          padding: "16px 18px",
          borderRadius: "var(--r-lg)",
          background: "var(--gold-glow)",
          border: "1px solid var(--border-gold)",
          fontSize: "0.88rem",
          color: "var(--text-2)",
          lineHeight: 1.65
        }}>
          Your goal is not to find a job posting — it is to get a genuine conversation with someone
          already inside your target. One good conversation with the right person is worth ten applications.
          The archetypes below are ranked by warmth and relevance to your specific background.
        </div>

        {/* Outreach principles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 16 }}>
          {[
            { icon: Target, label: "Be specific", body: "Name exactly why you're reaching out to them — not just anyone." },
            { icon: Users,  label: "Give first",  body: "Ask for a 15-minute conversation, not a favor, a referral, or a job." },
            { icon: TrendingUp, label: "Follow up", body: "One follow-up after 7 days is professional. Beyond that, move on." },
          ].map(({ icon: Icon, label, body }) => (
            <div key={label} style={{
              borderRadius: "var(--r-lg)", padding: "14px 16px",
              background: "var(--s1)", border: "1px solid var(--border)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                <Icon size={14} style={{ color: "var(--sage-lt)" }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text)" }}>{label}</span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.55 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Connection archetypes */}
      <section className="panel">
        <div className="panelHeader">
          <div className="panelHeaderLeft">
            <p className="eyebrow">Target archetypes</p>
            <h2>Who to find, and how to reach them</h2>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          {connections.map((connection, i) => (
            <article key={connection.type} style={{
              borderRadius: "var(--r-lg)",
              padding: "20px",
              background: "var(--s1)",
              border: "1px solid var(--border)",
              display: "grid",
              gap: 14,
              animation: `fadeUp 0.4s var(--ease) ${i * 0.08}s both`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    display: "grid", placeItems: "center",
                    width: 44, height: 44, borderRadius: "var(--r-md)",
                    background: "var(--sage-glow)", border: "1px solid var(--border-sage)",
                    color: "var(--sage-lt)", fontWeight: 900, fontSize: "0.82rem", flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text)", marginBottom: 3, letterSpacing: "-0.02em" }}>
                      {connection.type}
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.5 }}>
                      {connection.reason}
                    </p>
                  </div>
                </div>
                <div style={{
                  borderRadius: "var(--r-full)", padding: "4px 10px",
                  background: i === 0 ? "var(--gold-glow)" : "var(--s2)",
                  border: `1px solid ${i === 0 ? "var(--border-gold)" : "var(--border)"}`,
                  color: i === 0 ? "var(--gold)" : "var(--text-3)",
                  fontSize: "0.68rem", fontWeight: 800, whiteSpace: "nowrap",
                }}>
                  {i === 0 ? "Priority" : `#${i + 1}`}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{
                  borderRadius: "var(--r-md)", padding: "10px 12px",
                  background: "var(--s1)", border: "1px solid var(--border)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                    <Search size={10} style={{ color: "var(--sage-lt)" }} />
                    <span style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--sage-lt)" }}>
                      Search phrase
                    </span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.45 }}>{connection.search}</p>
                </div>

                <div style={{
                  borderRadius: "var(--r-md)", padding: "10px 12px",
                  background: "rgba(117,163,123,0.06)", border: "1px solid var(--border-sage)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                    <MessageSquare size={10} style={{ color: "var(--sage-lt)" }} />
                    <span style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--sage-lt)" }}>
                      Message angle
                    </span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.45 }}>{connection.message}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
