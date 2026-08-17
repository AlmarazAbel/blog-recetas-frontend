import type { Receta } from "../types/receta";

const API_URL = "http://localhost:3000/api/recetas";

export const obtenerRecetas = async (): Promise<Receta[]> => {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("Error al obtener las recetas");
  }

  const recetas: Receta[] = await respuesta.json();

  return recetas;
};