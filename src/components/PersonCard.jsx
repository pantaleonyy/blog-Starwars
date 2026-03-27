import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext.jsx";

export const PersonCard = ({ id, name, gender, hair, eyeColor }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const favId = `people-${id}`;
  const isFavorite = favorites.includes(favId);

  const imageUrl =
    "https://globalplay.ar/wp-content/uploads/2024/07/bebe-yoda.jpg";

  return (
    <div
      className="card bg-dark border border-warning shadow-lg mx-2 my-3"
      style={{ width: "14rem" }}
    >
      <div className="bg-warning bg-gradient" style={{ height: "4px" }} />

      <img
        src={imageUrl}
        alt={name}
        className="card-img-top"
        style={{ objectFit: "cover", height: "200px" }}
      />

      <div className="card-body d-flex flex-column gap-1">
        <h5 className="card-title mb-1 text-warning">{name}</h5>

        <small className="text-muted text-uppercase">Personaje</small>

        <p className="card-text mb-1">
          <span className="fw-semibold text-light">Género:</span> {gender}
        </p>

        <p className="card-text mb-1">
          <span className="fw-semibold text-light">Cabello:</span> {hair}
        </p>

        <p className="card-text mb-2">
          <span className="fw-semibold text-light">Color de ojos:</span>{" "}
          {eyeColor}
        </p>

        <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2 mt-auto">
          <Link to={`/person/${id}`} className="btn btn-warning btn-sm">
            Más información
          </Link>

          <button
            type="button"
            onClick={() => toggleFavorite(favId)}
            className="btn btn-outline-light btn-sm border-0"
            title="Agregar/Quitar favorito"
          >
            <i
              className={
                isFavorite
                  ? "fa-solid fa-heart text-warning"
                  : "fa-regular fa-heart text-light"
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};