import { createContext, useEffect, useState } from "react";
import { Rando } from "../schemas/rando.schema";
import { deleteRando, getRando } from "../services/rando.service";

type RandoContextType = {
  randos: Rando[];
  updateRandos: (newRandos: Rando[]) => void;
  deleteRandoById: (id: string) => void;
};

export const RandoContext = createContext<RandoContextType>(
  null as unknown as RandoContextType
);

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

  return (
    <RandoContext.Provider
      value={{
        randos,
        updateRandos,
        deleteRandoById,
      }}
    >
      {children}
    </RandoContext.Provider>
  );
};
