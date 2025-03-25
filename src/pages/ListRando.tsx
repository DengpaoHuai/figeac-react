import { Fragment, useEffect, useState } from "react";
import { deleteRando, getRando } from "../services/rando.service";
import { Rando } from "../schemas/rando.schema";
import { Link } from "react-router";

const ListRando = () => {
  /*const { data, refetch } = useFetch<Rando[]>(
    "https://crudcrud.com/api/4eb34a5b8dfa4d73b34a7f19dbb6bf93/rando"
  );*/
  const [rando, setRando] = useState<Rando[]>([]);

  useEffect(() => {
    getRando().then((rando) => {
      setRando(rando);
    });
  }, []);

  const deleteRandoItem = (id: string) => {
    deleteRando(id).then(() => {
      setRando(rando.filter((rando) => rando._id !== id));
    });
  };

  return (
    <div>
      <h1>Liste des randonnées</h1>
      <Link to="/create_rando">Créer une randonnée</Link>
      <ul>
        {rando.map((rando) => (
          <Fragment key={rando._id}>
            <li>{rando.name}</li>
            <button onClick={() => deleteRandoItem(rando._id)}>
              Supprimer
            </button>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ListRando;
