import { Link, useNavigate } from "react-router-dom";
import { estaAutenticado, cerrarSesion } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const autenticado = estaAutenticado();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Blog de Recetas
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Inicio
          </Link>

          <Link className="nav-link" to="/recetas">
            Recetas
          </Link>

          {!autenticado ? (
            <Link className="nav-link" to="/login">
              Iniciar sesión
            </Link>
          ) : (
            <button
              className="nav-link btn btn-link"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;