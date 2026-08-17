export interface Usuario {
  id: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  token: string;
}