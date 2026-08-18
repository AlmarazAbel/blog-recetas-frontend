import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;