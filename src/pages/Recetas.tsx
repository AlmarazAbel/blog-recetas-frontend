import { useEffect, useState } from "react";
import type { Receta } from "../types/receta";
import { obtenerRecetas } from "../services/recetaService";

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
      <h1 className="text-center mb-4 text-primary">Blog de Recetas</h1>

      <div className="row g-4">
        {recetas.map((receta) => (
          <div className="col-md-6 col-lg-4" key={receta._id}>
            <div className="card h-100 shadow-sm">
              {receta.imagen && (
                <img
                  src={receta.imagen}
                  className="card-img-top"
                  alt={receta.titulo}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{receta.titulo}</h5>

                <p className="card-text">
                  {receta.descripcion}
                </p>

                <p className="mb-1">
                  <strong>Tiempo:</strong>{" "}
                  {receta.tiempoPreparacion} minutos
                </p>

                <p className="mb-1">
                  <strong>Dificultad:</strong>{" "}
                  {receta.dificultad}
                </p>

                <p className="text-muted mb-0">
                  Por: {receta.usuario.nombre}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Recetas;