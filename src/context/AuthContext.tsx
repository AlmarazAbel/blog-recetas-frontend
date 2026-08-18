import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  obtenerUsuarioActual,
  cerrarSesion as cerrarSesionAPI,
} from "../services/usuarioService";

import type { Usuario } from "../types/usuario";

interface AuthContextType {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  cargando: boolean;
cargarUsuario: () => Promise<Usuario | null>;
  cerrarSesion: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [cargando, setCargando] = useState(true);

  // Verificar sesión al cargar la aplicación
  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const usuarioActual = await obtenerUsuarioActual();

        setUsuario(usuarioActual);
      } catch {
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };

    verificarSesion();
  }, []);

  // Cargar usuario después del login
const cargarUsuario = async (): Promise<Usuario | null> => {
  try {
    const usuarioActual = await obtenerUsuarioActual();

    setUsuario(usuarioActual);

    return usuarioActual;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
};
  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      await cerrarSesionAPI();
      setUsuario(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const estaAutenticado = usuario !== null;

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado,
        cargando,
        cargarUsuario,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
};
