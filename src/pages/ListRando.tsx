import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteRando, getRando } from "../services/rando.service";
import { Rando } from "../schemas/rando.schema";

const ListRando = () => {
  const { data: randos } = useQuery({
    queryKey: ["randos"],
    queryFn: getRando,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteRando(id),
    onMutate: async (id) => {
      const previousData = queryClient.getQueryData(["randos"]);

      queryClient.setQueryData(["randos"], (old: Rando[]) => {
        return old.filter((rando: Rando) => rando._id !== id);
      });

      return { previousData };
    },
    onError: (error, varr, context) => {
      console.error(error);
      queryClient.setQueryData(["randos"], context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["randos"],
      });
    },
  });

  return (
    <div>
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
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ListRando;
