import "./App.css";
import useFetch from "./hooks/useFetch";

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

function App() {
  const {
    data: planets,
    isLoading,
    error,
  } = useFetch<PlanetResponse>("https://swapi.dev/api/planets/");
  const { data: people, isLoading: isLoadingPeople } = useFetch<PeopleResponse>(
    "https://swapi.dev/api/people/"
  );

  return (
    <>
      <h2>Star Wars planets</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {planets?.results.map((planet) => {
        return <p key={planet.url}>{planet.name}</p>;
      })}
      <h2>Star Wars people</h2>
      {isLoadingPeople && <p>Loading...</p>}
      {people?.results.map((person) => {
        return <p key={person.name}>{person.name}</p>;
      })}
    </>
  );
}

export default App;
