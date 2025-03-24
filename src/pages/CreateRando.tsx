import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const randoSchema = z.object({
  name: z.string().min(3, "la bonne erreur").max(12, "l'autre bonne erreur"),
  km: z.coerce.number(),
  type: z.enum(["rando", "trail", "marche"]),
});

type Rando = z.infer<typeof randoSchema>;

const CreateRando = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(randoSchema),
  });

  const navigate = useNavigate();

  const onSubmitMaisPAsVraimentonSubmit = (data: Rando) => {
    console.log(data);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitMaisPAsVraimentonSubmit)}>
        <input type="text" placeholder="name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
        <select {...register("type")}>
          <option value="rando">Rando</option>
          <option value="trail">Trail</option>
          <option value="marche">Marche</option>
        </select>
        <input type="number" placeholder="km" {...register("km")} />
        {errors.km && <p>km is required</p>}
        <button>Submit</button>
      </form>
    </>
  );
};

export default CreateRando;
