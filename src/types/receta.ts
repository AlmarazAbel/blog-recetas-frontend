export interface UsuarioReceta {
  _id: string;
  nombre: string;
  email: string;
}

export interface Receta {
  _id: string;
  titulo: string;
  descripcion: string;
  ingredientes: string[];
  preparacion: string;
  tiempoPreparacion: number;
  dificultad: "facil" | "media" | "dificil";
  imagen: string;
  usuario: UsuarioReceta;
  createdAt: string;
  updatedAt: string;
}
export interface CrearRecetaData {
  titulo: string;
  descripcion: string;
  ingredientes: string[];
  preparacion: string;
  tiempoPreparacion: number;
  dificultad: "facil" | "media" | "dificil";
  imagen: string;
}