import {
  LayoutDashboard,
  Map,
  FileText,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { id: "dashboard",  label: "Dashboard",   icon: LayoutDashboard },
  { id: "career-map", label: "Career Map",  icon: Map             },
  { id: "resume",     label: "Resume",      icon: FileText        },
  { id: "network",    label: "Network",     icon: Users           },
  { id: "companies",  label: "Companies",   icon: Building2       },
];

export function Sidebar({ page, onNavigate, target, pathScore }) {
  const initials = "ES";

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="brand">
        <div className="brandIcon">PF</div>
        <div>
          <div className="brandName">PathForge</div>
          <div className="brandTagline">Career Intelligence</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="navSection">
        <div className="navLabel">Navigation</div>
        <div className="navList">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`navItem ${page === id ? "active" : ""}`}
              onClick={() => onNavigate(id)}
              type="button"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="navDivider" />

      {/* Current Mission */}
      <div className="sidebarMission">
        <div className="sidebarMissionLabel">Active mission</div>
        <div className="sidebarMissionTitle">{target.title}</div>
        <div className="sidebarMissionScore">
          <div className="sidebarMissionScoreBar">
            <span style={{ width: `${pathScore}%` }} />
          </div>
          <div className="sidebarMissionScoreVal">{pathScore}</div>
        </div>
      </div>

      {/* Profile */}
      <div className="sidebarProfile">
        <div className="sidebarAvatar">{initials}</div>
        <div>
          <div className="sidebarProfileName">Erin Samuels</div>
          <div className="sidebarProfileRole">{target.currentRole}</div>
        </div>
        <TrendingUp size={14} style={{ marginLeft: "auto", color: "var(--sage)", opacity: 0.8 }} />
      </div>
    </aside>
  );
}
