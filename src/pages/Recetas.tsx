import { useEffect, useState } from "react";
import type { Receta } from "../types/receta";
import { obtenerRecetas } from "../services/recetaService";
import RecipeCard from "../components/RecipeCard";

const Recetas = () => {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        const datos = await obtenerRecetas();
        setRecetas(datos);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar las recetas");
      } finally {
        setCargando(false);
      }
    };

    cargarRecetas();
  }, []);

  if (cargando) {
    return <p className="text-center mt-5">Cargando recetas...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <main className="container py-5">
      <h1 className="text-center mb-4 text-primary">
        Blog de Recetas
      </h1>

      <div className="row g-4">
        {recetas.map((receta) => (
          <RecipeCard
            key={receta._id}
            receta={receta}
          />
        ))}
      </div>
    </main>
  );
};

export default Recetas;