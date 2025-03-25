import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getRandoById } from "../services/rando.service";
import { Rando } from "../schemas/rando.schema";

const DetailRando = () => {
  const { id } = useParams<{ id: string }>();

  const [rando, setRando] = useState<Rando | null>(null);

  useEffect(() => {
    getRandoById(id!).then((rando) => {
      console.log(rando);
      setRando(rando);
    });
  }, [id]);

  return (
    <div>
      <h1>DetailRando</h1>
      <p>DetailRando {id}</p>
      <h2>
        {rando?.name} {rando?.km} {rando?.type}
      </h2>
    </div>
  );
};

export default DetailRando;
