import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { z } from "zod";

const randoSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(12, "Le nom ne doit pas dépasser 12 caractères"),
  km: z.coerce.number().min(1, "La distance doit être supérieure à 0"),
  type: z.enum(["rando", "trail", "marche"]),
});

type Rando = z.infer<typeof randoSchema>;

const CreateRando = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Rando>({
    resolver: zodResolver(randoSchema),
    defaultValues: {
      name: "",
      km: 5,
      type: "rando" as const,
    },
  });

  const navigate = useNavigate();

  const onSubmitMaisPAsVraimentonSubmit = (data: Rando) => {
    console.log(data);
    //fetch moi tout ça comme un grand vers crudcrud
    fetch("https://crudcrud.com/api/69696969696969696969696969696969/rando", {
      method: "POST",
      body: JSON.stringify(data),
    });
    navigate("/");
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Planètes
            </Link>
            <Link to="/demo" className="nav-link">
              Démo
            </Link>
            <Link to="/create-rando" className="nav-link active">
              Créer Rando
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content container">
        <div className="form-container">
          <h1 className="page-title">Créer une Randonnée</h1>

          <div className="card">
            <form onSubmit={handleSubmit(onSubmitMaisPAsVraimentonSubmit)}>
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
