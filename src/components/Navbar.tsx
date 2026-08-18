import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { usuario, estaAutenticado, cargando, cerrarSesion } = useAuth();

  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
  const resultado = await Swal.fire({
    title: "¿Cerrar sesión?",
    text: "Tu sesión se cerrará en este dispositivo.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });

  if (!resultado.isConfirmed) {
    return;
  }

  await cerrarSesion();

  await Swal.fire({
    icon: "success",
    title: "Sesión cerrada",
    text: "Hasta pronto 👋",
    timer: 1500,
    showConfirmButton: false,
  });

    navigate("/");
};

  if (cargando) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Blog de Recetas
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/recetas">
                Recetas
              </Link>
            </li>

            {estaAutenticado && (
              <li className="nav-item">
                <Link className="nav-link" to="/crear-receta">
                  Crear receta
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {estaAutenticado ? (
              <>
                <span className="navbar-text">Hola, {usuario?.nombre}</span>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleCerrarSesion}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Iniciar sesión
                </Link>

                <Link to="/registro" className="btn btn-outline-primary">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
