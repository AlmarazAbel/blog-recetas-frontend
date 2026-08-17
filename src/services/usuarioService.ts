import type { LoginData, LoginResponse,Usuario } from "../types/usuario";

const API_URL = "http://localhost:3000/api/usuarios";

export const iniciarSesion = async (
  datos: LoginData
): Promise<LoginResponse> => {
  const respuesta = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
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

export const obtenerUsuarioActual = async (): Promise<Usuario> => {
    const respuesta = await fetch(
        `${API_URL}/me`,
        {
            credentials: "include",
        }
    );

    if (!respuesta.ok) {
        throw new Error(
            "No hay una sesión activa"
        );
    }

    return await respuesta.json();
};
export const cerrarSesion = async (): Promise<void> => {
  const respuesta = await fetch(
    `${API_URL}/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!respuesta.ok) {
    throw new Error("Error al cerrar sesión");
  }
};