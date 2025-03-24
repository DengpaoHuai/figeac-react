import { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import DemoComponent from "./components/DemoComponent";

const waitFor = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

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

function App() {
  const config = {
    title: "Hello World",
    content: "toto",
  };
  const [planets, setPlanets] = useState<Planet[]>([]);

  /* fetch("https://swapi.dev/api/planets")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setPlanets(data.results);
    });*/
  const [count, setCounter] = useState(5);

  useEffect(() => {
    waitFor(2000).then(() => {
      fetch("https://swapi.dev/api/planets")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPlanets(data.results);
        });
    });
  }, [count]);

  return (
    <>
      {/*
        <p>{count}</p>
      <button onClick={() => setCounter(count + 1)}>Increment</button>
      <DemoComponent content={config}>
        <h3>un peu de texte</h3>
      </DemoComponent>
  */}
      {planets.map((planet) => {
        return <p key={planet.url}>{planet.name}</p>;
      })}
    </>
  );
}

export default App;
