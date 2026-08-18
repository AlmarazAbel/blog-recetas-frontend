import type { SubmitEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { crearReceta } from "../services/recetaService";
import type { CrearRecetaData } from "../types/receta";

const CrearReceta = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preparacion, setPreparacion] = useState("");
  const [tiempoPreparacion, setTiempoPreparacion] = useState("");
  const [dificultad, setDificultad] = useState<
    "facil" | "media" | "dificil"
  >("facil");
  const [imagen, setImagen] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setCargando(true);

    try {
      const datos: CrearRecetaData = {
        titulo,
        descripcion,
        ingredientes: ingredientes
          .split("\n")
          .map((ingrediente) => ingrediente.trim())
          .filter((ingrediente) => ingrediente !== ""),
        preparacion,
        tiempoPreparacion: Number(tiempoPreparacion),
        dificultad,
        imagen,
      };

      await crearReceta(datos);

      navigate("/recetas");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al crear la receta");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">

          <div className="card shadow">
            <div className="card-body p-4">

              <h1 className="text-center mb-4 text-primary">
                Crear receta
              </h1>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Título */}
                <div className="mb-3">
                  <label
                    htmlFor="titulo"
                    className="form-label"
                  >
                    Título
                  </label>

                  <input
                    id="titulo"
                    type="text"
                    className="form-control"
                    value={titulo}
                    onChange={(event) =>
                      setTitulo(event.target.value)
                    }
                    required
                  />
                </div>

                {/* Descripción */}
                <div className="mb-3">
                  <label
                    htmlFor="descripcion"
                    className="form-label"
                  >
                    Descripción
                  </label>

                  <textarea
                    id="descripcion"
                    className="form-control"
                    rows={3}
                    value={descripcion}
                    onChange={(event) =>
                      setDescripcion(event.target.value)
                    }
                    required
                  />
                </div>

                {/* Ingredientes */}
                <div className="mb-3">
                  <label
                    htmlFor="ingredientes"
                    className="form-label"
                  >
                    Ingredientes
                  </label>

                  <textarea
                    id="ingredientes"
                    className="form-control"
                    rows={6}
                    placeholder={`Ejemplo:
500 g de harina
2 huevos
1 taza de leche
1 cucharada de azúcar`}
                    value={ingredientes}
                    onChange={(event) =>
                      setIngredientes(event.target.value)
                    }
                    required
                  />

                  <div className="form-text">
                    Escribí un ingrediente por línea.
                  </div>
                </div>

                {/* Preparación */}
                <div className="mb-3">
                  <label
                    htmlFor="preparacion"
                    className="form-label"
                  >
                    Preparación
                  </label>

                  <textarea
                    id="preparacion"
                    className="form-control"
                    rows={6}
                    value={preparacion}
                    onChange={(event) =>
                      setPreparacion(event.target.value)
                    }
                    required
                  />
                </div>

                {/* Tiempo */}
                <div className="mb-3">
                  <label
                    htmlFor="tiempoPreparacion"
                    className="form-label"
                  >
                    Tiempo de preparación (minutos)
                  </label>

                  <input
                    id="tiempoPreparacion"
                    type="number"
                    min="1"
                    className="form-control"
                    value={tiempoPreparacion}
                    onChange={(event) =>
                      setTiempoPreparacion(event.target.value)
                    }
                    required
                  />
                </div>

                {/* Dificultad */}
                <div className="mb-3">
                  <label
                    htmlFor="dificultad"
                    className="form-label"
                  >
                    Dificultad
                  </label>

                  <select
                    id="dificultad"
                    className="form-select"
                    value={dificultad}
                    onChange={(event) =>
                      setDificultad(
                        event.target.value as
                          | "facil"
                          | "media"
                          | "dificil"
                      )
                    }
                  >
                    <option value="facil">
                      Fácil
                    </option>

                    <option value="media">
                      Media
                    </option>

                    <option value="dificil">
                      Difícil
                    </option>
                  </select>
                </div>

                {/* Imagen */}
                <div className="mb-4">
                  <label
                    htmlFor="imagen"
                    className="form-label"
                  >
                    URL de la imagen
                  </label>

                  <input
                    id="imagen"
                    type="url"
                    className="form-control"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={imagen}
                    onChange={(event) =>
                      setImagen(event.target.value)
                    }
                  />
                </div>

                {/* Botones */}
                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1"
                    disabled={cargando}
                  >
                    {cargando
                      ? "Guardando..."
                      : "Crear receta"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/recetas")}
                    disabled={cargando}
                  >
                    Cancelar
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CrearReceta;