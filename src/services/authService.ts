export const obtenerToken = (): string | null => {
  return localStorage.getItem("token");
};

export const estaAutenticado = (): boolean => {
  return obtenerToken() !== null;
};

export const cerrarSesion = (): void => {
  localStorage.removeItem("token");
};