import { Link } from "react-router";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";

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

const getPlanets = async (page: number) => {
  const response = await fetch("https://swapi.dev/api/planets/?page=" + page);
  const data = await response.json();
  return data;
};

function PlanetList() {
  const [page, setPage] = useState(1);
  const { data: planets } = useQuery({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(page),
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="app">
      <main className="main-content container">
        <h1 className="page-title">Planètes de Star Wars</h1>

        {planets && (
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
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Page précédente
        </Button>
        <Button onClick={() => setPage(page + 1)} disabled={!planets?.next}>
          Page suivante
        </Button>
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
