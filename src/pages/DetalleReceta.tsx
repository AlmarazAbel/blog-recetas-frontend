import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Receta } from "../types/receta";
import { obtenerRecetaPorId } from "../services/recetaService";

const DetalleReceta = () => {
  const { id } = useParams<{ id: string }>();

  const [receta, setReceta] = useState<Receta | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarReceta = async () => {
      if (!id) {
        setError("Receta no encontrada");
        setCargando(false);
        return;
      }

      try {
        const datos = await obtenerRecetaPorId(id);
        setReceta(datos);
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar la receta");
      } finally {
        setCargando(false);
      }
    };

    cargarReceta();
  }, [id]);

  if (cargando) {
    return (
      <p className="text-center mt-5">
        Cargando receta...
      </p>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>

        <Link to="/recetas" className="btn btn-secondary">
          Volver a recetas
        </Link>
      </div>
    );
  }

  if (!receta) {
    return null;
  }

  return (
    <main className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {receta.imagen && (
            <img
              src={receta.imagen}
              alt={receta.titulo}
              className="img-fluid rounded mb-4"
            />
          )}

          <h1 className="mb-3">
            {receta.titulo}
          </h1>

          <p className="lead">
            {receta.descripcion}
          </p>

          <hr />

          <div className="mb-4">
            <p>
              <strong>Tiempo:</strong>{" "}
              {receta.tiempoPreparacion} minutos
            </p>

            <p>
              <strong>Dificultad:</strong>{" "}
              {receta.dificultad}
            </p>

            <p>
              <strong>Autor:</strong>{" "}
              {receta.usuario.nombre}
            </p>
          </div>

          <h2>Ingredientes</h2>

          <ul className="list-group mb-4">
            {receta.ingredientes.map((ingrediente, index) => (
              <li
                key={index}
                className="list-group-item"
              >
                {ingrediente}
              </li>
            ))}
          </ul>

          <h2>Preparación</h2>

          <p className="mt-3">
            {receta.preparacion}
          </p>

          <Link
            to="/recetas"
            className="btn btn-secondary mt-3"
          >
            Volver a recetas
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DetalleReceta;