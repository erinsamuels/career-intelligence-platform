import { Building2, ExternalLink, TrendingUp } from "lucide-react";

export function CompaniesPage({ target, targets }) {
  // Collect all unique companies across all targets
  const allCompanies = [];
  const seen = new Set();
  targets.forEach((t) => {
    t.companies.forEach((c) => {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        allCompanies.push({ ...c, sourceTarget: t.title });
      }
    });
  });

  const primaryCompanies = target.companies;

  return (
    <div className="companiesPage">

      {/* Hero */}
      <section className="panel" style={{ marginBottom: 16 }}>
        <div className="panelHeader">
          <div className="panelHeaderLeft">
            <p className="eyebrow">Target companies</p>
            <h2>Companies on your radar</h2>
          </div>
          <div className="panelBadge">{allCompanies.length} companies</div>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.65, maxWidth: 620 }}>
          These companies are ranked by alignment with your current background.
          Focus on the highest-match targets first, and use the intro angles to make
          your outreach more relevant and specific.
        </p>
      </section>

      {/* Primary targets — large cards */}
      <section style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 3 }}>Best match for your path</div>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
              Primary targets
            </h3>
          </div>
        </div>

        <div className="companiesHeroGrid">
          {primaryCompanies.map((company, i) => (
            <article
              className="companyHeroCard"
              key={company.name}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div className="companyHeroLogo">
                  {company.name.slice(0, 2).toUpperCase()}
                </div>
                {i === 0 && (
                  <div style={{
                    borderRadius: "var(--r-full)", padding: "4px 10px",
                    background: "var(--gold-glow)", border: "1px solid var(--border-gold)",
                    color: "var(--gold)", fontSize: "0.68rem", fontWeight: 800,
                  }}>
                    Top pick
                  </div>
                )}
              </div>

              <div>
                <div className="companyHeroName">{company.name}</div>
                <p className="companyHeroFit">{company.fit}</p>
              </div>

              {company.matchScore && (
                <div className="companyMatchBar">
                  <div className="companyMatchBarLabel">
                    <span>Match strength</span>
                    <strong>{company.matchScore}%</strong>
                  </div>
                  <div style={{
                    height: 6, borderRadius: "var(--r-full)",
                    background: "var(--s2)", overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%", width: `${company.matchScore}%`,
                      borderRadius: "inherit",
                      background: "linear-gradient(90deg, var(--sage), var(--gold))",
                      transformOrigin: "left",
                      animation: `barFill 1.2s var(--ease) ${0.3 + i * 0.1}s both`,
                    }} />
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gap: 8 }}>
                <div style={{
                  borderRadius: "var(--r-md)", padding: "10px 12px",
                  background: "var(--s1)", border: "1px solid var(--border)",
                }}>
                  <div className="companyMetaLabel" style={{
                    fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "0.12em", color: "var(--gold)", marginBottom: 4
                  }}>Role types</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.45 }}>
                    {company.roleType}
                  </div>
                </div>

                <div style={{
                  borderRadius: "var(--r-md)", padding: "10px 12px",
                  background: "var(--s1)", border: "1px solid var(--border)",
                }}>
                  <div style={{
                    fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "0.12em", color: "var(--sage-lt)", marginBottom: 4
                  }}>Intro angle</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-2)", lineHeight: 1.45 }}>
                    {company.introAngle}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All companies across all paths */}
      <section className="panel">
        <div className="panelHeader">
          <div className="panelHeaderLeft">
            <p className="eyebrow">Full radar</p>
            <h2>All companies across your paths</h2>
          </div>
          <div className="panelBadge">{allCompanies.length} total</div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {allCompanies.map((company, i) => (
            <div key={`${company.name}-${i}`} style={{
              display: "grid",
              gridTemplateColumns: "44px minmax(0,1fr) auto",
              gap: 14,
              alignItems: "center",
              borderRadius: "var(--r-lg)",
              padding: "14px 16px",
              background: "var(--s1)",
              border: "1px solid var(--border)",
              transition: "all 0.2s ease",
              cursor: "pointer",
              animation: `fadeUp 0.4s var(--ease) ${i * 0.05}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-gold)";
              e.currentTarget.style.background = "rgba(247,216,157,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--s1)";
            }}
            >
              <div style={{
                display: "grid", placeItems: "center",
                width: 44, height: 44, borderRadius: "var(--r-md)",
                background: "linear-gradient(135deg, var(--gold), var(--gold-dk))",
                color: "var(--text-inv)", fontWeight: 900, fontSize: "0.8rem"
              }}>
                {company.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>
                  {company.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>
                  {company.fit}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {company.matchScore && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    borderRadius: "var(--r-full)", padding: "4px 10px",
                    background: "var(--gold-glow)", border: "1px solid var(--border-gold)",
                    color: "var(--gold)", fontSize: "0.72rem", fontWeight: 800,
                  }}>
                    <TrendingUp size={11} />
                    {company.matchScore}%
                  </div>
                )}
                <ExternalLink size={14} style={{ color: "var(--text-3)" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
