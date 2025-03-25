import { create } from "zustand";
import { type Rando } from "../schemas/rando.schema";
import { createRando, getRando } from "../services/rando.service";
import { useEffect } from "react";

type RandoStore = {
  randos: Rando[];
  setRandos: (newRandos: Rando[]) => void;
  deleteRandoById: (id: string) => void;
  createRandoButPasPareilQueDansLeService: (
    rando: Omit<Rando, "_id">
  ) => Promise<void>;
};

const useRandoStore = create<RandoStore>((set) => ({
  randos: [],
  setRandos: (newRandos) => set({ randos: newRandos }),
  deleteRandoById: (id) =>
    set((state) => ({
      randos: state.randos.filter((rando) => rando._id !== id),
    })),
  createRandoButPasPareilQueDansLeService: async (rando) => {
    const newRando = await createRando(rando);
    set((state) => ({ randos: [...state.randos, newRando] }));
  },
}));

const useRando = () => {
  const setRandos = useRandoStore((state) => state.setRandos);
  const randos = useRandoStore((state) => state.randos);

  useEffect(() => {
    if (randos.length === 0) {
      getRando().then((rando) => {
        setRandos(rando);
      });
    }
  }, []);

  return useRandoStore();
};

export default useRando;
