import { Fragment } from "react";
import { Link } from "react-router";
import { useModal } from "../../../contexts/ModalContextProvider";
import useRandos from "../api/get-rando";
import useDeleteRando from "../api/delete-rando";

const ListRando = () => {
  const { data: randos } = useRandos({
    staleTime: 1000 * 60 * 5,
  });
  const { open } = useModal();
  const mutation = useDeleteRando();

  return (
    <div>
      <button onClick={() => open("titre", "description")}>
        Ouvrir la modal
      </button>
      <h1>Liste des randonnées</h1>
      <Link to="/rando/create">Créer une randonnée</Link>
      <ul>
        {randos?.map((rando) => (
          <Fragment key={rando._id}>
            <li>{rando.name}</li>
            <button onClick={() => mutation.mutateAsync(rando._id)}>
              Supprimer
            </button>
            <Link to={`/rando/${rando._id}`}>Détail</Link>
            <Link to={`/rando/${rando._id}/edit`}>Editer</Link>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ListRando;
