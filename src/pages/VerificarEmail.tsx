import type { SubmitEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { verificarEmail } from "../services/usuarioService";

const VerificarEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
//pasar el mail registrado desde el formulario anterior sin obligar al usuario a escribirlo de nuevo.
  const emailDesdeRegistro = location.state?.email || "";

  const [email, setEmail] = useState(emailDesdeRegistro);
  const [codigo, setCodigo] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setCargando(true);

    try {
      await verificarEmail({
        email,
        codigo,
      });

      await Swal.fire({
        icon: "success",
        title: "¡Email verificado!",
        text: "Tu cuenta fue verificada correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/login");

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al verificar el email");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">

          <div className="card shadow">
            <div className="card-body p-4">

              <h1 className="text-center mb-3">
                Verificar email
              </h1>

              <p className="text-center text-muted">
                Te enviamos un código de 6 dígitos a tu correo.
              </p>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="codigo"
                    className="form-label"
                  >
                    Código de verificación
                  </label>

                  <input
                    id="codigo"
                    type="text"
                    className="form-control text-center"
                    value={codigo}
                    onChange={(event) =>
                      setCodigo(event.target.value)
                    }
                    maxLength={6}
                    inputMode="numeric"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando
                    ? "Verificando..."
                    : "Verificar email"}
                </button>

              </form>

              <div className="text-center mt-3">
                <Link to="/login">
                  Volver al login
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default VerificarEmail;