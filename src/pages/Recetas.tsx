import { useEffect, useState } from "react";
import type { Receta } from "../types/receta";
import { obtenerRecetas } from "../services/recetaService";
import RecipeCard from "../components/RecipeCard";

const Recetas = () => {
  const recetasPorPagina = 6;

  const [paginaActual, setPaginaActual] = useState(1);
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const indiceUltimaReceta = paginaActual * recetasPorPagina;

  const indicePrimeraReceta =
    indiceUltimaReceta - recetasPorPagina;

  const recetasPagina = recetas.slice(
    indicePrimeraReceta,
    indiceUltimaReceta
  );

  const totalPaginas = Math.ceil(
    recetas.length / recetasPorPagina
  );

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

  useEffect(() => {
    if (paginaActual > totalPaginas && totalPaginas > 0) {
      setPaginaActual(totalPaginas);
    }
  }, [paginaActual, totalPaginas]);

  if (cargando) {
    return (
      <p className="text-center mt-5">
        Cargando recetas...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-danger text-center mt-5">
        {error}
      </p>
    );
  }

  return (
    <main className="container py-5">

      <h1 className="text-center mb-4 text-primary">
        Blog de Recetas
      </h1>

      <div className="row g-4">
        {recetasPagina.map((receta) => (
          <RecipeCard
            key={receta._id}
            receta={receta}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <nav
          aria-label="Paginación de recetas"
          className="mt-5"
        >
          <ul className="pagination justify-content-center">

            {/* Anterior */}
            <li
              className={`page-item ${
                paginaActual === 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setPaginaActual(paginaActual - 1)
                }
                disabled={paginaActual === 1}
              >
                Anterior
              </button>
            </li>

            {/* Números */}
            {Array.from(
              { length: totalPaginas },
              (_, index) => index + 1
            ).map((numeroPagina) => (
              <li
                key={numeroPagina}
                className={`page-item ${
                  paginaActual === numeroPagina
                    ? "active"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPaginaActual(numeroPagina)
                  }
                >
                  {numeroPagina}
                </button>
              </li>
            ))}

            {/* Siguiente */}
            <li
              className={`page-item ${
                paginaActual === totalPaginas
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setPaginaActual(paginaActual + 1)
                }
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </button>
            </li>

          </ul>
        </nav>
      )}

    </main>
  );
};

export default Recetas;