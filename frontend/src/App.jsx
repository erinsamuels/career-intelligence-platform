import "./App.css";

function App() {
  return (
    <main className="app">
      <nav className="nav">
        <div className="brand">
          <span className="logo">🧭</span>
          <span>Path</span>
          <strong>Forge</strong>
        </div>

        <div className="navLinks">
          <a>Dashboard</a>
          <a>Simulator</a>
          <a>Insights</a>
          <a>Network</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">Career Navigation System</p>
          <h1>Navigate your career. Not just your next job.</h1>
          <p className="subtitle">
            Upload your resume, choose your destination, and discover the
            proven career paths that can get you there.
          </p>

          <div className="actions">
            <button className="primaryButton">Analyze My Career</button>
            <button className="secondaryButton">Explore Paths</button>
          </div>
        </div>

        <div className="panel">
          <label>Dream Company</label>
          <select>
            <option>Rivian</option>
            <option>Tesla</option>
            <option>Lucid</option>
            <option>SpaceX</option>
            <option>Apple</option>
            <option>BorgWarner</option>
          </select>

          <label>Upload Resume</label>
          <div className="uploadBox">Choose File — PDF, DOCX, or TXT</div>

          <div className="scorePreview">
            <span>Trajectory Preview</span>
            <strong>88</strong>
            <p>Strong early EV manufacturing alignment</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;