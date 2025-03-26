import { Link } from "react-router";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type PlanetResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

export type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
};

export type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: People[];
};

function PlanetList() {
  const {
    data: planets,
    isLoading,
    error,
  } = useFetch<PlanetResponse>("https://swapi.dev/api/planets/");
  const { data: people, isLoading: isLoadingPeople } = useFetch<PeopleResponse>(
    "https://swapi.dev/api/people/"
  );

  useEffect(() => {
    const scrollEvent = (e: Event) => {
      console.log("scroll", e);
    };
    addEventListener("scroll", scrollEvent);

    return () => {
      console.log("unmounted");
      removeEventListener("scroll", scrollEvent);
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <nav className="nav-links">
            <Link to="/" className="nav-link active">
              Planètes
            </Link>
            <Link to="/demo" className="nav-link">
              Démo
            </Link>
            <Link to="/create-rando" className="nav-link">
              Créer Rando
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content container">
        <h1 className="page-title">Planètes de Star Wars</h1>

        {isLoading && <div className="loading">Chargement des planètes...</div>}

        {error && (
          <div
            className="card"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "var(--danger-color)",
            }}
          >
            <p className="error-message">{error.message}</p>
          </div>
        )}

        {!isLoading && !error && planets && (
          <div className="planet-grid">
            {planets.results.map((planet) => (
              <div key={planet.url} className="planet-card">
                <h3 className="planet-name">{planet.name}</h3>
                <div className="planet-info">
                  <div className="info-item">
                    <span className="info-label">Climat : </span>
                    {planet.climate}
                  </div>
                  <div className="info-item">
                    <span className="info-label">Terrain : </span>
                    {planet.terrain}
                  </div>
                  <div className="info-item">
                    <span className="info-label">Diamètre : </span>
                    {planet.diameter} km
                  </div>
                  <div className="info-item">
                    <span className="info-label">Population : </span>
                    {planet.population !== "unknown"
                      ? parseInt(planet.population).toLocaleString()
                      : "Inconnue"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="page-title" style={{ marginTop: "3rem" }}>
          Personnages de Star Wars
        </h2>

        {isLoadingPeople && (
          <div className="loading">Chargement des personnages...</div>
        )}

        {!isLoadingPeople && people && (
          <div className="grid">
            {people.results.map((person) => (
              <div key={person.name} className="card card-hover">
                <h3 className="card-title">{person.name}</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="info-label">Taille : </span>
                    {person.height} cm
                  </div>
                  <div>
                    <span className="info-label">Poids : </span>
                    {person.mass} kg
                  </div>
                  <div>
                    <span className="info-label">Couleur de cheveux : </span>
                    {person.hair_color}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <p className="footer-copyright">© 2023 Star Wars Explorer</p>
        </div>
      </footer>
    </div>
  );
}

export default PlanetList;
