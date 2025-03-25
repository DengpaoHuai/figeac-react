import { createContext, useContext, useEffect, useState } from "react";
import { Rando } from "../schemas/rando.schema";
import { createRando, deleteRando, getRando } from "../services/rando.service";

type RandoContextType = {
  randos: Rando[];
  updateRandos: (newRandos: Rando[]) => void;
  deleteRandoById: (id: string) => void;
  createRandoButPasPareilQueDansLeService: (
    rando: Omit<Rando, "_id">
  ) => Promise<void>;
};

export const RandoContext = createContext<RandoContextType>(
  null as unknown as RandoContextType
);

export const useRando = () => useContext(RandoContext);

export const RandoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [randos, setRandos] = useState<Rando[]>([]);

  useEffect(() => {
    getRando().then((rando) => {
      setRandos(rando);
    });
  }, []);

  const updateRandos = (newRandos: Rando[]) => {
    setRandos(newRandos);
  };

  const deleteRandoById = (id: string) => {
    deleteRando(id).then(() => {
      setRandos(randos.filter((rando) => rando._id !== id));
    });
  };

  const createRandoButPasPareilQueDansLeService = async (
    rando: Omit<Rando, "_id">
  ) => {
    const newRando = await createRando(rando);
    setRandos([...randos, newRando]);
  };

  return (
    <RandoContext.Provider
      value={{
        randos,
        updateRandos,
        deleteRandoById,
        createRandoButPasPareilQueDansLeService,
      }}
    >
      {children}
    </RandoContext.Provider>
  );
};
