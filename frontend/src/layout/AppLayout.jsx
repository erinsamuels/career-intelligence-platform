import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout({ children, page, onNavigate, target, pathScore }) {
  return (
    <main className="app">
      <Sidebar page={page} onNavigate={onNavigate} target={target} pathScore={pathScore} />
      <section className="workspace">
        <Header page={page} onNavigate={onNavigate} target={target} />
        {children}
      </section>
    </main>
  );
}
