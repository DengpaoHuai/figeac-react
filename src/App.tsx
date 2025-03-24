import { useEffect, useState } from "react";
import "./App.css";

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

type PlanetResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

function App() {
  const [planets, setPlanets] = useState<PlanetResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const fetchPlanets = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setPlanets(data);
  };

  useEffect(() => {
    fetchPlanets("https://swapi.dev/api/planets/");
  }, []);

  return (
    <>
      {planets.results.map((planet) => {
        return <p key={planet.url}>{planet.name}</p>;
      })}
      <button
        disabled={!planets.previous}
        onClick={() => fetchPlanets(planets.previous!)}
      >
        Previous
      </button>
      <button
        disabled={!planets.next}
        onClick={() => fetchPlanets(planets.next!)}
      >
        Next
      </button>
    </>
  );
}

export default App;
