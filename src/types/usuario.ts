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

export interface RegistroData {
  nombre: string;
  email: string;
  password: string;
}

export interface RegistroResponse {
  mensaje: string;
  usuario: {
    nombre: string;
    email: string;
  };
}
export interface VerificarEmailData {
  email: string;
  codigo: string;
}

export interface VerificarEmailResponse {
  mensaje: string;
}