import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../lib/http-client";
import { Rando } from "./get-rando";

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const deleteRando = async (id: string) => {
  await waitFor(2000);
  // throw new Error("");

  const response = await httpClient.delete(`/rando/${id}`);
  return response.data;
};

const useDeleteRando = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
};

export default useDeleteRando;
