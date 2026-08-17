import { Link } from "react-router-dom";

const Navbar = () => {
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

          <Link className="nav-link" to="/login">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
