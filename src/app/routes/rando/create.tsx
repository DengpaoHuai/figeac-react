import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import useRando from "../../../stores/useRandoStore";
import { Rando, randoSchema } from "../../../features/rando/api/get-rando";
import { InputText } from "primereact/inputtext";
import CustomInputText from "../../../components/ui/CustomInputText/CustomInputText";
import useCustomForm from "../../../hooks/useCustomForm";

const CreateRando = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCustomForm<Omit<Rando, "_id">>({
    resolver: zodResolver(randoSchema.omit({ _id: true })),
    defaultValues: {
      name: "",
      km: 5,
      type: "rando" as const,
    },
  });

  const navigate = useNavigate();

  const { createRandoButPasPareilQueDansLeService } = useRando();

  const onSubmitMaisPAsVraimentonSubmit = (data: Omit<Rando, "_id">) => {
    console.log(data);
    createRandoButPasPareilQueDansLeService(data)
      .then(() => {
        navigate("/rando");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="app">
      <main className="main-content container">
        <div className="form-container">
          <h1 className="page-title">Créer une Randonnée</h1>

          <div className="card">
            <form onSubmit={handleSubmit(onSubmitMaisPAsVraimentonSubmit)}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nom de la randonnée
                </label>
                <CustomInputText
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  Annuler
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

export default CreateRando;
