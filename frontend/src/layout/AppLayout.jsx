import {
  LayoutDashboard, Map, FileText, Users, Building2,
} from "lucide-react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const mobileNav = [
  { id: "dashboard",  label: "Home",     icon: LayoutDashboard },
  { id: "career-map", label: "Map",      icon: Map             },
  { id: "resume",     label: "Resume",   icon: FileText        },
  { id: "network",    label: "Network",  icon: Users           },
  { id: "companies",  label: "Companies", icon: Building2      },
];

export function AppLayout({ children, page, onNavigate, target, pathScore }) {
  return (
    <>
      <main className="app">
        <Sidebar page={page} onNavigate={onNavigate} target={target} pathScore={pathScore} />
        <section className="workspace">
          <Header page={page} onNavigate={onNavigate} target={target} pathScore={pathScore} />
          {children}
        </section>
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobileNav" aria-label="Mobile navigation">
        <ul className="mobileNavList">
          {mobileNav.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                className={`mobileNavBtn ${page === id ? "active" : ""}`}
                onClick={() => onNavigate(id)}
                type="button"
              >
                <Icon size={20} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
