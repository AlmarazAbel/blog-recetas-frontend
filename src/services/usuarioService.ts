import type { LoginData, LoginResponse } from "../types/usuario";

const API_URL = "http://localhost:3000/api/usuarios";

export const iniciarSesion = async (
  datos: LoginData
): Promise<LoginResponse> => {
  const respuesta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const datosRespuesta = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datosRespuesta.mensaje || "Error al iniciar sesión");
  }

  return datosRespuesta;
};