import type { Receta } from "../types/receta";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  receta: Receta;
}

const RecipeCard = ({ receta }: RecipeCardProps) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        {receta.imagen && (
          <img
            src={receta.imagen}
            className="card-img-top"
            alt={receta.titulo}
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{receta.titulo}</h5>

          <p className="card-text">{receta.descripcion}</p>

          <p className="mb-1">
            <strong>Tiempo:</strong> {receta.tiempoPreparacion} minutos
          </p>

          <p className="mb-1">
            <strong>Dificultad:</strong> {receta.dificultad}
          </p>

          <p className="text-muted mb-0">Por: {receta.usuario.nombre}</p>
          <Link to={`/recetas/${receta._id}`} className="btn btn-primary mt-3">
            Ver receta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
