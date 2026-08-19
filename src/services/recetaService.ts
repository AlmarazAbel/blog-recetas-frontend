import type { CrearRecetaData, Receta } from "../types/receta";

const API_URL = "http://localhost:3000/api/recetas";

export const obtenerRecetas = async (): Promise<Receta[]> => {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("Error al obtener las recetas");
  }

  const recetas: Receta[] = await respuesta.json();

  return recetas;
};
export const obtenerRecetaPorId = async (id: string): Promise<Receta> => {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener la receta");
  }

  const receta: Receta = await respuesta.json();

  return receta;
};

export const crearReceta = async (datos: CrearRecetaData): Promise<Receta> => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const datosRespuesta = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datosRespuesta.mensaje || "Error al crear la receta");
  }

  return datosRespuesta;
};
export const actualizarReceta = async (
  id: string,
  datos: CrearRecetaData
): Promise<Receta> => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const datosRespuesta = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datosRespuesta.mensaje || "Error al actualizar la receta"
    );
  }

  return datosRespuesta.receta;
};
export const eliminarReceta = async (id: string): Promise<void> => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const datosRespuesta = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datosRespuesta.mensaje || "Error al eliminar la receta"
    );
  }
};