import { Link } from "react-router";

function DemoPage() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Planètes
            </Link>
            <Link to="/demo" className="nav-link active">
              Démo
            </Link>
            <Link to="/create-rando" className="nav-link">
              Créer Rando
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content container">
        <h1 className="page-title">Page de Démonstration</h1>

        <div className="card">
          <h2>Bienvenue sur la page de démonstration</h2>
          <p>
            Cette page démontre les capacités de design et de mise en page de
            notre application.
          </p>

          <div
            className="grid"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <div
              className="card card-hover"
              style={{ backgroundColor: "rgba(37, 99, 235, 0.1)" }}
            >
              <h3 className="card-title">Design Moderne</h3>
              <p>
                Notre interface utilise les standards modernes avec un design
                épuré et élégant.
              </p>
            </div>

            <div
              className="card card-hover"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
            >
              <h3 className="card-title">Expérience Utilisateur</h3>
              <p>
                L'interface est conçue pour une expérience utilisateur optimale
                et intuitive.
              </p>
            </div>

            <div
              className="card card-hover"
              style={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}
            >
              <h3 className="card-title">Développement React</h3>
              <p>
                Créé avec React et TypeScript pour des performances optimales.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button className="btn" onClick={() => alert("Action primaire!")}>
              Action Primaire
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => alert("Action secondaire!")}
            >
              Action Secondaire
            </button>
            <button
              className="btn btn-success"
              onClick={() => alert("Succès!")}
            >
              Succès
            </button>
            <button
              className="btn btn-danger"
              onClick={() => alert("Attention!")}
            >
              Danger
            </button>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <p className="footer-copyright">© 2023 Star Wars Explorer</p>
        </div>
      </footer>
    </div>
  );
}

export default DemoPage;
