import { useState } from "react";
import { Bookmark, ArrowUpRight } from "lucide-react";

function jobsUrl(company) {
  const q = encodeURIComponent(`${company.name} ${company.roleType}`);
  return `https://www.linkedin.com/jobs/search/?keywords=${q}&location=United%20States`;
}

export function CompanyTargets({ companies }) {
  const [bookmarked, setBookmarked] = useState(new Set());

  function toggleBookmark(name) {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Target companies</p>
          <h2>Where to aim next</h2>
        </div>
        <div className="panelBadge">{companies.length} targets</div>
      </div>

      <div className="companyGrid">
        {companies.map((company) => {
          const saved = bookmarked.has(company.name);
          return (
            <article className="companyCard" key={company.name}>
              <div className="companyLogo">
                {company.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="companyName">{company.name}</div>
                <p className="companyFit">{company.fit}</p>
              </div>

              {company.matchScore && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    flex: 1, height: 5, borderRadius: "var(--r-full)",
                    background: "var(--s2)", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", width: `${company.matchScore}%`,
                      borderRadius: "inherit",
                      background: "linear-gradient(90deg, var(--sage), var(--gold))",
                      transformOrigin: "left",
                      animation: "barFill 1.2s var(--ease) 0.4s both",
                    }} />
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--gold)", whiteSpace: "nowrap" }}>
                    {company.matchScore}% fit
                  </span>
                </div>
              )}

              <div className="companyMeta">
                <div className="companyMetaLabel">Role types</div>
                <div className="companyMetaVal">{company.roleType}</div>
              </div>

              <div className="companyMeta">
                <div className="companyMetaLabel">Intro angle</div>
                <div className="companyMetaVal">{company.introAngle}</div>
              </div>

              <div className="companyActions">
                <a
                  className="companyActionsBtn"
                  href={jobsUrl(company)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowUpRight size={13} />
                  View roles
                </a>
                <button
                  className={`companyActionsBtn ${saved ? "bookmarked" : ""}`}
                  onClick={() => toggleBookmark(company.name)}
                >
                  <Bookmark size={13} />
                  {saved ? "Saved" : "Save"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
