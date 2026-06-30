import { Download, Bell, Settings } from "lucide-react";

const pageConfig = {
  "dashboard":  { eyebrow: "Overview",      title: "Career command center" },
  "career-map": { eyebrow: "Journey",        title: "Your career map"       },
  "resume":     { eyebrow: "Resume",         title: "Resume intelligence"   },
  "network":    { eyebrow: "Connections",    title: "Network strategy"      },
  "companies":  { eyebrow: "Target companies", title: "Company research"    },
};

export function Header({ page, target }) {
  const config = pageConfig[page] ?? pageConfig["dashboard"];

  return (
    <header className="header">
      <div className="headerLeft">
        <p className="eyebrow">{config.eyebrow}</p>
        <h1>{config.title}</h1>
      </div>

      <div className="headerRight">
        <button className="headerBtn headerBtn-ghost" type="button">
          <Bell size={15} />
        </button>
        <button className="headerBtn headerBtn-ghost" type="button">
          <Settings size={15} />
        </button>
        <button className="headerBtn headerBtn-primary" type="button">
          <Download size={14} />
          Export plan
        </button>
      </div>
    </header>
  );
}
