import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { RandoContext } from "../contexts/RandoContextProvider";

const ListRando = () => {
  const { randos, deleteRandoById } = useContext(RandoContext);

  return (
    <div>
      <h1>Liste des randonnées</h1>
      <Link to="/rando/create">Créer une randonnée</Link>
      <ul>
        {randos.map((rando) => (
          <Fragment key={rando._id}>
            <li>{rando.name}</li>
            <button onClick={() => deleteRandoById(rando._id)}>
              Supprimer
            </button>
            <Link to={`/rando/${rando._id}`}>Détail</Link>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ListRando;
