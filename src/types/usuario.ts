export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
}