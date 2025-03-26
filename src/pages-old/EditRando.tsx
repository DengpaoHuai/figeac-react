import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRando, updateRando } from "../services/rando.service";
import { Rando, randoSchema } from "../schemas/rando.schema";
import { useNavigate, useNavigation, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EditRando = () => {
  const { id } = useParams<{ id: string }>();

  const { data: randos, isLoading } = useQuery<Rando[]>({
    queryKey: ["randos"],
    queryFn: getRando,
  });

  const rando = randos?.find((rando) => rando._id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Rando, "_id">>({
    resolver: zodResolver(randoSchema.omit({ _id: true })),
    defaultValues: {
      name: rando?.name,
      km: rando?.km,
      type: rando?.type,
    },
  });

  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit = async (data: Omit<Rando, "_id">) => {
    await mutation.mutateAsync(data);

    navigation("/rando");
  };

  const mutation = useMutation({
    mutationFn: (data: Omit<Rando, "_id">) => updateRando(id!, data),
    onSuccess: (data, variable) => {
      console.log(data);
      console.log(variable);
      queryClient.setQueryData(["randos"], (old: Rando[]) => {
        return old.map((rando) => {
          console.log(rando);

          if (rando._id === id) {
            return {
              ...variable,
              _id: id,
            };
          }
          return rando;
        });
      });
    },
  });

  return (
    <div className="app">
      <main className="main-content container">
        <div className="form-container">
          <h1 className="page-title">Créer une Randonnée</h1>

          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nom de la randonnée
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nom de la randonnée"
                  {...register("name")}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="type" className="form-label">
                  Type de randonnée
                </label>
                <select id="type" {...register("type")}>
                  <option value="rando">Randonnée</option>
                  <option value="trail">Trail</option>
                  <option value="marche">Marche</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="km" className="form-label">
                  Distance (km)
                </label>
                <input
                  id="km"
                  type="number"
                  placeholder="Distance en km"
                  {...register("km")}
                  className={errors.km ? "error" : ""}
                />
                {errors.km && (
                  <p className="error-message">
                    {errors.km.message || "La distance est requise"}
                  </p>
                )}
              </div>

              <div className="flex" style={{ gap: "1rem", marginTop: "2rem" }}>
                <button type="submit" className="btn btn-success">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <p className="footer-copyright">© 2023 Star Wars Explorer</p>
        </div>
      </footer>
    </div>
  );
};

export default EditRando;
