import type { SubmitEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { registrarUsuario } from "../services/usuarioService";

export const Registro = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setCargando(true);

    try {
      await registrarUsuario({
        nombre,
        email,
        password,
      });

      await Swal.fire({
        icon: "success",
        title: `¡Bienvenido, ${nombre}!`,
        text: "Tu usuario fue registrado correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al registrar el usuario");
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

              <h1 className="text-center mb-4">
                Crear cuenta
              </h1>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Nombre */}
                <div className="mb-3">
                  <label
                    htmlFor="nombre"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(event) =>
                      setNombre(event.target.value)
                    }
                    required
                  />
                </div>

                {/* Email */}
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

                {/* Contraseña */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Contraseña
                  </label>

                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando
                    ? "Registrando..."
                    : "Registrarse"}
                </button>

              </form>

              <div className="text-center mt-3">
                <Link to="/login">
                  ¿Ya tenés una cuenta? Iniciá sesión
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};